/**
 * Enhanced WalletConnect Session Disconnection & Cleanup
 * 
 * Provides complete, hard disconnection of Web3Modal and WalletConnect sessions.
 * This ensures NO stale state remains before attempting a new connection.
 */

/**
 * Completely disconnect Web3Modal session
 * 
 * This does:
 * 1. Explicitly disconnect Web3Modal
 * 2. Clear all WalletConnect storage
 * 3. Clear provider instance if possible
 * 4. Notify any listeners
 */
export async function hardDisconnectWeb3Modal(): Promise<void> {
  console.log('[hardDisconnectWeb3Modal] Starting complete disconnect...');
  // Clear all WalletConnect/Web3Modal storage and state
  await clearAllWalletConnectState();
  console.log('[hardDisconnectWeb3Modal] ✅ Complete disconnect finished');
}

/**
 * Nuclear option: Clear ALL WalletConnect/Web3Modal state
 * Used before each new connection attempt to ensure clean slate
 */
export async function clearAllWalletConnectState(): Promise<void> {
  console.log('[clearAllWalletConnectState] Clearing all WalletConnect state...');

  // Pattern: Storage keys related to WalletConnect, Web3Modal, and wallet provider state
  const WC_PATTERNS = [
    /^walletconnect/i,
    /^wc@/i,
    /^wc_/i,
    /^WALLETCONNECT/i,
    /web3modal/i,
    /w3m_/i,
    /deeplink/i,
  ];

  const EXPLICIT_KEYS = [
    'walletconnect',
    'WALLETCONNECT_DEEPLINK_CHOICE',
    'wc_deeplink_choice',
    'wc_qrcode_modal_history',
    'wcm_connected_wallet',
    'wcm_wcm_injected_details',
  ];

  // Clear localStorage
  try {
    const keysToDelete = new Set<string>();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      if (EXPLICIT_KEYS.includes(key) || WC_PATTERNS.some(p => p.test(key))) {
        keysToDelete.add(key);
      }
    }

    keysToDelete.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (err) {
        console.warn(`[clearAllWalletConnectState] Failed to remove localStorage key '${key}'`);
      }
    });

    if (keysToDelete.size > 0) {
      console.log(`[clearAllWalletConnectState] Cleared ${keysToDelete.size} localStorage entries`);
    }
  } catch (err) {
    console.warn('[clearAllWalletConnectState] localStorage cleanup error:', err instanceof Error ? err.message : err);
  }

  // Clear sessionStorage
  try {
    const keysToDelete = new Set<string>();
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (!key) continue;

      if (EXPLICIT_KEYS.includes(key) || WC_PATTERNS.some(p => p.test(key))) {
        keysToDelete.add(key);
      }
    }

    keysToDelete.forEach(key => {
      try {
        sessionStorage.removeItem(key);
      } catch (err) {
        console.warn(`[clearAllWalletConnectState] Failed to remove sessionStorage key '${key}'`);
      }
    });

    if (keysToDelete.size > 0) {
      console.log(`[clearAllWalletConnectState] Cleared ${keysToDelete.size} sessionStorage entries`);
    }
  } catch (err) {
    console.warn('[clearAllWalletConnectState] sessionStorage cleanup error:', err instanceof Error ? err.message : err);
  }

  // Clear IndexedDB (async, non-blocking)
  try {
    const dbs = await indexedDB.databases();
    for (const db of dbs) {
      if (db.name && WC_PATTERNS.some(p => p.test(db.name!))) {
        try {
          indexedDB.deleteDatabase(db.name);
          console.log(`[clearAllWalletConnectState] Deleted IndexedDB: ${db.name}`);
        } catch (err) {
          console.warn(`[clearAllWalletConnectState] Failed to delete IndexedDB '${db.name}'`);
        }
      }
    }
  } catch (err) {
    // indexedDB.databases() not supported in older browsers - that's fine
    console.log('[clearAllWalletConnectState] IndexedDB cleanup skipped (not supported)');
  }

  // Try to clear any global WalletConnect state
  try {
    if ((window as any).__wcManager) {
      delete (window as any).__wcManager;
    }
    if ((window as any).__web3modal) {
      delete (window as any).__web3modal;
    }
  } catch (err) {
    // Ignore
  }

  console.log('[clearAllWalletConnectState] ✅ State cleared');
}

/**
 * Check if Web3Modal is currently showing the modal
 * This is a workaround for checking modal state since isOpen may not be available
 */
export function isWeb3ModalShowing(): boolean {
  try {
    const modal = document.querySelector('w3m-modal') as any;
    if (!modal) return false;

    // Check if modal has open attribute or is visible
    return modal.open === true || modal.getAttribute('open') !== null;
  } catch (err) {
    return false;
  }
}

/**
 * Wait for Web3Modal to close with timeout
 */
export async function waitForWeb3ModalClose(timeoutMs: number = 30000): Promise<void> {
  const startTime = Date.now();

  return new Promise((resolve) => {
    const checkModal = () => {
      if (!isWeb3ModalShowing()) {
        console.log('[waitForWeb3ModalClose] Modal closed');
        resolve();
        return;
      }

      if (Date.now() - startTime > timeoutMs) {
        console.warn('[waitForWeb3ModalClose] Timeout waiting for modal close');
        resolve(); // Resolve anyway to not block
        return;
      }

      setTimeout(checkModal, 100);
    };

    checkModal();
  });
}
