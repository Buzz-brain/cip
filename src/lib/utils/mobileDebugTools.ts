/**
 * Mobile Debug Tools - Eruda Integration
 * 
 * Conditionally loads Eruda for mobile debugging in development environments.
 * Helps debug WalletConnect issues, network requests, and browser storage on real mobile devices.
 * 
 * Features:
 * - Auto-loads in development mode (import.meta.env.DEV)
 * - Can be force-enabled via ?debug=true query parameter
 * - Does not affect production builds
 * - Loads asynchronously without blocking app rendering
 * - Appears as a small floating button in bottom-right corner
 */

declare global {
  interface Window {
    eruda?: {
      init: () => void;
      show: () => void;
      hide: () => void;
      destroy: () => void;
    };
  }
}

/**
 * Check if we should enable mobile debugging tools
 * Returns true if:
 * 1. App is in DEV mode, OR
 * 2. URL contains ?debug=true query parameter
 */
function shouldEnableMobileDebug(): boolean {
  // Always enable in development
  if (import.meta.env.DEV) {
    return true;
  }

  // Check for ?debug=true in production (e.g., for staging)
  const params = new URLSearchParams(window.location.search);
  const debugParam = params.get('debug');
  return debugParam === 'true';
}

/**
 * Dynamically load Eruda from CDN and initialize it
 * This function is async and non-blocking
 */
async function loadErudaFromCDN(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Prevent loading Eruda twice
    if (window.eruda) {
      console.log('[Eruda] Already loaded');
      resolve();
      return;
    }

    console.log('[Eruda] Loading from CDN...');

    // Create script element for Eruda
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    script.async = true;

    script.onload = () => {
      console.log('[Eruda] Script loaded, initializing...');
      if (window.eruda) {
        try {
          window.eruda.init();
          console.log('[Eruda] ✅ Initialized successfully');
          console.log('[Eruda] Debug panel available - look for floating button in bottom-right');
          resolve();
        } catch (err) {
          console.error('[Eruda] Initialization failed:', err);
          reject(err);
        }
      } else {
        console.warn('[Eruda] Script loaded but window.eruda not available');
        reject(new Error('Eruda not available on window'));
      }
    };

    script.onerror = () => {
      console.error('[Eruda] Failed to load script from CDN');
      reject(new Error('Failed to load Eruda CDN script'));
    };

    // Add script to document head
    document.head.appendChild(script);

    // Timeout safety - resolve after 5 seconds even if loading takes longer
    setTimeout(() => {
      if (!window.eruda) {
        console.warn('[Eruda] Loading timeout - script may still be loading');
      }
    }, 5000);
  });
}

/**
 * Initialize mobile debug tools (Eruda)
 * Call this early in your app initialization, but after DOM is ready
 * 
 * This function is safe to call unconditionally - it checks internally
 * if debugging should be enabled.
 */
export async function initMobileDebugTools(): Promise<void> {
  // Only in browser environment
  if (typeof window === 'undefined') {
    return;
  }

  // Check if debugging is enabled
  if (!shouldEnableMobileDebug()) {
    console.log('[Mobile Debug] Disabled (production mode and no ?debug=true)');
    return;
  }

  console.log('[Mobile Debug] ✅ Enabled - loading debugging tools...');

  try {
    // Load Eruda from CDN
    await loadErudaFromCDN();
    
    console.log('[Mobile Debug] Ready for debugging');
    console.log('[Mobile Debug] Tips:');
    console.log('  - Check "Console" tab for WalletConnect logs');
    console.log('  - Check "Storage" tab for WalletConnect session data');
    console.log('  - Check "Network" tab for deep-link requests');
    console.log('  - Check "Elements" tab to inspect modal structure');
  } catch (err) {
    console.warn('[Mobile Debug] Failed to load debugging tools:', err);
    // Non-blocking - app continues to work
  }
}

/**
 * Show the Eruda debug panel (if loaded)
 * Useful if you want to programmatically show it after initialization
 */
export function showMobileDebugPanel(): void {
  if (window.eruda?.show) {
    window.eruda.show();
    console.log('[Eruda] Debug panel shown');
  }
}

/**
 * Hide the Eruda debug panel (if loaded)
 */
export function hideMobileDebugPanel(): void {
  if (window.eruda?.hide) {
    window.eruda.hide();
    console.log('[Eruda] Debug panel hidden');
  }
}

/**
 * Destroy/cleanup Eruda (if loaded)
 * Call this if you need to completely remove Eruda
 */
export function destroyMobileDebugTools(): void {
  if (window.eruda?.destroy) {
    window.eruda.destroy();
    console.log('[Eruda] Destroyed');
  }
}
