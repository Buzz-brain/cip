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
  
  // Mobile and session-specific
  /sessionStorage/i,
  /pairing/i,
  /session/i,
  
  // Web3Modal related
  /web3modal/i,
  /w3m/i,
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
 */
function clearStorage(storage: Storage): { keysCleared: string[]; errors: string[] } {
  const keysCleared: string[] = [];
  const errors: string[] = [];

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
      if (WC_STORAGE_PATTERNS.some(pattern => pattern.test(key))) {
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
 * Call this:
 * - Before attempting a fresh WalletConnect connection
 * - When WalletConnect fails with "Connection declined"
 * - On page load in mobile browsers
 * - When detecting return from external wallet app
 */
export async function cleanupWalletConnect(): Promise<CleanupResult> {
  const result: CleanupResult = {
    keysCleared: [],
    sessionsDisconnected: 0,
    errors: [],
  };

  console.log('[WalletConnectCleanup] Starting comprehensive cleanup...');

  try {
    // Clean localStorage
    const localStorageResult = clearStorage(window.localStorage);
    result.keysCleared.push(...localStorageResult.keysCleared);
    result.errors.push(...localStorageResult.errors);
    console.log('[WalletConnectCleanup] localStorage cleared:', localStorageResult.keysCleared.length, 'keys');

    // Clean sessionStorage
    const sessionStorageResult = clearStorage(window.sessionStorage);
    result.keysCleared.push(...sessionStorageResult.keysCleared);
    result.errors.push(...sessionStorageResult.errors);
    console.log('[WalletConnectCleanup] sessionStorage cleared:', sessionStorageResult.keysCleared.length, 'keys');

    // Clean IndexedDB
    const indexedDBResult = await clearIndexedDB();
    result.keysCleared.push(...indexedDBResult.cleared.map(name => `IndexedDB: ${name}`));
    result.errors.push(...indexedDBResult.errors);
    console.log('[WalletConnectCleanup] IndexedDB cleaned:', indexedDBResult.cleared.length, 'databases');

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
      console.log('[WalletConnectCleanup] ✅ Cleanup completed successfully. Cleared', result.keysCleared.length, 'entries');
    } else {
      console.warn('[WalletConnectCleanup] Cleanup completed with warnings:', result.errors);
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
 */
export async function prepareMobileWalletConnect(): Promise<void> {
  // Only on mobile
  if (typeof window === 'undefined') return;

  const isMobile = /android|webos|iphone|ipad|ipot|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  );

  if (!isMobile) {
    console.log('[WalletConnectCleanup] Desktop detected, skipping mobile-specific prep');
    return;
  }

  console.log('[WalletConnectCleanup] Mobile detected - running pre-connection cleanup');

  // Clean up before attempting connection
  const cleanupResult = await cleanupWalletConnect();

  // Log what was cleaned
  if (cleanupResult.keysCleared.length > 0) {
    console.log('[WalletConnectCleanup] Cleaned', cleanupResult.keysCleared.length, 'stale entries before connection attempt');
  }

  if (cleanupResult.errors.length > 0) {
    console.warn('[WalletConnectCleanup] Non-fatal warnings during cleanup:', cleanupResult.errors);
  }

  // Small delay to let storage settle
  await new Promise(resolve => setTimeout(resolve, 100));
}
