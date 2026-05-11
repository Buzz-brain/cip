/**
 * WalletConnect Session & Storage Cleanup Utility
 * 
 * Safely clears all stale WalletConnect session data, localStorage entries,
 * and deep-link cache to prevent "Connection declined" errors on mobile.
 * 
 * This is critical for mobile browsers switching between tabs/apps and returning.
 */

export interface CleanupResult {
  keysCleared: string[];
  sessionsDisconnected: number;
  errors: string[];
}

/**
 * WalletConnect-related storage keys patterns to clean
 * Covers v2 and v3 formats
 */
const WC_STORAGE_PATTERNS = [
  // Core WalletConnect session keys
  /^walletconnect/i,
  /^wc@/i,
  /^WALLETCONNECT/i,
  
  // Deep-link and choice storage
  /DEEPLINK/i,
  /deeplink/i,
  
  // Web3Modal related
  /web3modal/i,
  /w3m/i,
];

/**
 * AGGRESSIVE cleanup patterns - only used on retry/failure
 * Includes patterns that might interfere with active sessions
 */
const WC_AGGRESSIVE_PATTERNS = [
  ...WC_STORAGE_PATTERNS,
  // Mobile and session-specific - ONLY on aggressive cleanup
  /sessionStorage/i,
  /pairing/i,
  /session/i,
];

/**
 * Full list of explicit WalletConnect keys to remove
 */
const EXPLICIT_WC_KEYS = [
  'walletconnect',
  'WALLETCONNECT_DEEPLINK_CHOICE',
  'wc@2:client',
  'wc@2:core',
  'wc@2:core:0.3//pairing',
  'wc@2:client:0.3//session',
  'wc_qrcode_modal_history',
  'wc_deeplink_choice',
];

/**
 * Clears a specific storage object (localStorage or sessionStorage)
 * @param storage Storage object to clear
 * @param aggressive If true, use broader patterns (only on retry/failure)
 */
function clearStorage(storage: Storage, aggressive: boolean = false): { keysCleared: string[]; errors: string[] } {
  const keysCleared: string[] = [];
  const errors: string[] = [];
  const patterns = aggressive ? WC_AGGRESSIVE_PATTERNS : WC_STORAGE_PATTERNS;

  try {
    const keysToRemove = new Set<string>();

    // Scan for explicit keys and pattern matches
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (!key) continue;

      // Check explicit keys
      if (EXPLICIT_WC_KEYS.some(k => key === k || key.includes(k))) {
        keysToRemove.add(key);
      }

      // Check pattern matches
      if (patterns.some(pattern => pattern.test(key))) {
        keysToRemove.add(key);
      }
    }

    // Remove identified keys
    keysToRemove.forEach(key => {
      try {
        storage.removeItem(key);
        keysCleared.push(key);
      } catch (err) {
        errors.push(`Failed to remove key '${key}': ${err instanceof Error ? err.message : String(err)}`);
      }
    });
  } catch (err) {
    errors.push(`Storage scan error: ${err instanceof Error ? err.message : String(err)}`);
  }

  return { keysCleared, errors };
}

/**
 * Clears IndexedDB entries for WalletConnect
 * IndexedDB is used for persistent session storage by some wallet SDKs
 */
async function clearIndexedDB(): Promise<{ cleared: string[]; errors: string[] }> {
  const cleared: string[] = [];
  const errors: string[] = [];

  try {
    const dbs = await indexedDB.databases();
    
    for (const db of dbs) {
      if (!db.name) continue;
      
      // Check if database name matches WalletConnect patterns
      if (!/walletconnect|wc@|web3modal|w3m/i.test(db.name)) continue;

      try {
        indexedDB.deleteDatabase(db.name);
        cleared.push(db.name);
      } catch (err) {
        errors.push(`Failed to delete IndexedDB '${db.name}': ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  } catch (err) {
    // indexedDB.databases() may not be supported in older browsers
    if (!(err instanceof TypeError)) {
      errors.push(`IndexedDB cleanup error: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return { cleared, errors };
}

/**
 * Main WalletConnect cleanup function
 * 
 * @param aggressive If true, uses broader cleanup patterns (only on retry/failure)
 * 
 * Call this:
 * - Before attempting a fresh WalletConnect connection (aggressive=false, default)
 * - When WalletConnect fails with "Connection declined" (aggressive=true recommended)
 * - On page load in mobile browsers (aggressive=false)
 * - When detecting return from external wallet app (aggressive=true recommended)
 */
export async function cleanupWalletConnect(aggressive: boolean = false): Promise<CleanupResult> {
  const result: CleanupResult = {
    keysCleared: [],
    sessionsDisconnected: 0,
    errors: [],
  };

  const cleanupMode = aggressive ? 'AGGRESSIVE' : 'CONSERVATIVE';
  console.log(`[WalletConnectCleanup] Starting ${cleanupMode} cleanup...`);

  try {
    // Clean localStorage
    const localStorageResult = clearStorage(window.localStorage, aggressive);
    result.keysCleared.push(...localStorageResult.keysCleared);
    result.errors.push(...localStorageResult.errors);
    console.log(`[WalletConnectCleanup] localStorage cleared (${cleanupMode}):`, localStorageResult.keysCleared.length, 'keys');
    if (localStorageResult.keysCleared.length > 0 && aggressive) {
      console.log('[WalletConnectCleanup] Cleared keys:', localStorageResult.keysCleared.slice(0, 5).join(', ') + (localStorageResult.keysCleared.length > 5 ? '...' : ''));
    }

    // Clean sessionStorage
    const sessionStorageResult = clearStorage(window.sessionStorage, aggressive);
    result.keysCleared.push(...sessionStorageResult.keysCleared);
    result.errors.push(...sessionStorageResult.errors);
    console.log(`[WalletConnectCleanup] sessionStorage cleared (${cleanupMode}):`, sessionStorageResult.keysCleared.length, 'keys');

    // Clean IndexedDB
    const indexedDBResult = await clearIndexedDB();
    result.keysCleared.push(...indexedDBResult.cleared.map(name => `IndexedDB: ${name}`));
    result.errors.push(...indexedDBResult.errors);
    console.log(`[WalletConnectCleanup] IndexedDB cleaned (${cleanupMode}):`, indexedDBResult.cleared.length, 'databases');

    // Attempt to clear any stale WalletConnect SDK state
    try {
      if ((window as any).walletConnectManager) {
        delete (window as any).walletConnectManager;
        console.log('[WalletConnectCleanup] Cleared window.walletConnectManager');
      }
    } catch (err) {
      // Ignore
    }

    if (result.errors.length === 0) {
      console.log(`[WalletConnectCleanup] ✅ ${cleanupMode} cleanup completed successfully. Cleared`, result.keysCleared.length, 'entries');
    } else {
      console.warn(`[WalletConnectCleanup] ${cleanupMode} cleanup completed with warnings:`, result.errors);
    }
  } catch (err) {
    result.errors.push(`Cleanup failed: ${err instanceof Error ? err.message : String(err)}`);
    console.error('[WalletConnectCleanup] Fatal error:', err);
  }

  return result;
}

/**
 * Detects if we're likely returning from a wallet deep-link on mobile
 * Useful for triggering cleanup and reconnect logic
 */
export function detectMobileWalletReturn(): boolean {
  if (typeof window === 'undefined') return false;

  // Check if document was hidden and is now visible (indicates app switch)
  if (document.hidden === false && typeof (window as any).__walletReturnDetected !== 'undefined') {
    return true;
  }

  // Check if user agent suggests mobile
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  return isMobile;
}

/**
 * Sets up a listener for when the user returns to the page from a wallet app
 * Triggers cleanup to ensure stale sessions don't block reconnection
 */
export function setupMobileReturnListener(onReturn: () => void): () => void {
  const handleVisibilityChange = () => {
    if (!document.hidden) {
      console.log('[WalletConnectCleanup] Page became visible - user may be returning from wallet app');
      // Small delay to ensure state is consistent
      setTimeout(onReturn, 100);
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}

/**
 * Mobile-specific cleanup with automatic retry logic
 * Call before opening WalletConnect modal on mobile
 * 
 * @param aggressive If true, uses aggressive cleanup patterns (for retries/failures)
 */
export async function prepareMobileWalletConnect(aggressive: boolean = false): Promise<void> {
  // Only on mobile
  if (typeof window === 'undefined') return;

  const isMobile = /android|webos|iphone|ipad|ipot|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  );

  if (!isMobile) {
    console.log('[WalletConnectCleanup] Desktop detected, skipping mobile-specific prep');
    return;
  }

  const mode = aggressive ? 'AGGRESSIVE' : 'CONSERVATIVE';
  console.log(`[WalletConnectCleanup] Mobile detected - running ${mode} pre-connection cleanup`);

  // Clean up before attempting connection
  const cleanupResult = await cleanupWalletConnect(aggressive);

  // Log what was cleaned
  if (cleanupResult.keysCleared.length > 0) {
    console.log(`[WalletConnectCleanup] Cleaned ${cleanupResult.keysCleared.length} stale entries before connection attempt (${mode} mode)`);
  }

  if (cleanupResult.errors.length > 0) {
    console.warn('[WalletConnectCleanup] Non-fatal warnings during cleanup:', cleanupResult.errors);
  }

  // Small delay to let storage settle
  await new Promise(resolve => setTimeout(resolve, 100));
}
