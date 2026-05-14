/**
 * useMobileWalletRecovery Hook
 * 
 * Handles mobile wallet recovery when user returns from MetaMask in-app browser.
 * Preserves connection state across app suspend/resume cycles.
 */

import { useCallback, useEffect, useRef } from 'react';

export interface PendingWalletState {
  account: string;
  nonce: string;
  signature?: string;
  method: 'injected' | 'walletconnect';
  timestamp: number;
}

export interface ReloadResumeState {
  account: string;
  nonce: string;
  method: 'injected' | 'walletconnect';
  timestamp: number;
  reloadCount: number;
}

const PENDING_STATE_KEY = 'cip_pending_wallet_state';
const RELOAD_RESUME_KEY = 'cip_reload_resume_state';
const RETURN_FROM_WALLET_KEY = 'cip_wallet_return_time';

/**
 * Save pending wallet state before opening wallet (e.g., before sign request)
 */
export function savePendingWalletState(state: PendingWalletState): void {
  try {
    sessionStorage.setItem(PENDING_STATE_KEY, JSON.stringify(state));
    console.log('[MobileWalletRecovery] 💾 Saved pending wallet state:', state.account);
  } catch (err) {
    console.error('[MobileWalletRecovery] Failed to save pending state:', err);
  }
}

/**
 * Retrieve pending wallet state (e.g., after returning from wallet)
 */
export function getPendingWalletState(): PendingWalletState | null {
  try {
    const stored = sessionStorage.getItem(PENDING_STATE_KEY);
    if (!stored) return null;
    
    const state = JSON.parse(stored) as PendingWalletState;
    
    // Check if state is stale (older than 10 minutes)
    if (Date.now() - state.timestamp > 10 * 60 * 1000) {
      console.log('[MobileWalletRecovery] ⏰ Pending state is stale, discarding');
      clearPendingWalletState();
      return null;
    }
    
    console.log('[MobileWalletRecovery] 📖 Retrieved pending wallet state:', state.account);
    return state;
  } catch (err) {
    console.error('[MobileWalletRecovery] Failed to retrieve pending state:', err);
    return null;
  }
}

/**
 * Clear pending wallet state
 */
export function clearPendingWalletState(): void {
  try {
    sessionStorage.removeItem(PENDING_STATE_KEY);
    sessionStorage.removeItem(RETURN_FROM_WALLET_KEY);
    sessionStorage.removeItem(RELOAD_RESUME_KEY);
    console.log('[MobileWalletRecovery] 🗑️ Cleared pending wallet state');
  } catch (err) {
    console.error('[MobileWalletRecovery] Failed to clear pending state:', err);
  }
}

/**
 * Save reload resume state (used when page reloads during wallet signing)
 * This allows us to auto-resume the login flow after reload
 */
export function saveReloadResumeState(state: ReloadResumeState): void {
  try {
    sessionStorage.setItem(RELOAD_RESUME_KEY, JSON.stringify(state));
    console.log('[MobileWalletRecovery] 💾 Saved reload resume state:', state.account);
  } catch (err) {
    console.error('[MobileWalletRecovery] Failed to save reload resume state:', err);
  }
}

/**
 * Get reload resume state (after page reload)
 */
export function getReloadResumeState(): ReloadResumeState | null {
  try {
    const stored = sessionStorage.getItem(RELOAD_RESUME_KEY);
    if (!stored) return null;
    
    const state = JSON.parse(stored) as ReloadResumeState;
    
    // Check if state is stale (older than 10 minutes)
    if (Date.now() - state.timestamp > 10 * 60 * 1000) {
      console.log('[MobileWalletRecovery] ⏰ Reload resume state is stale, discarding');
      clearPendingWalletState();
      return null;
    }
    
    console.log('[MobileWalletRecovery] 📖 Retrieved reload resume state:', state.account, '(reload #' + state.reloadCount + ')');
    return state;
  } catch (err) {
    console.error('[MobileWalletRecovery] Failed to retrieve reload resume state:', err);
    return null;
  }
}

/**
 * Clear reload resume state
 */
export function clearReloadResumeState(): void {
  try {
    sessionStorage.removeItem(RELOAD_RESUME_KEY);
    console.log('[MobileWalletRecovery] 🗑️ Cleared reload resume state');
  } catch (err) {
    console.error('[MobileWalletRecovery] Failed to clear reload resume state:', err);
  }
}

/**
 * Hook to detect when user returns from mobile wallet app
 * Useful for triggering recovery logic
 */
export function useMobileWalletReturn(onReturn: () => void): void {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page regained focus - user likely returned from wallet app
        console.log('[MobileWalletRecovery] 🔄 Page regained focus, detecting wallet return');
        
        // Record return time
        try {
          sessionStorage.setItem(RETURN_FROM_WALLET_KEY, Date.now().toString());
        } catch (err) {
          console.warn('[MobileWalletRecovery] Failed to record return time:', err);
        }
        
        onReturn();
      }
    };

    const handleFocus = () => {
      console.log('[MobileWalletRecovery] 👁️ Window focus event');
      onReturn();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [onReturn]);
}

/**
 * Hook to auto-resume wallet connection if user returns from MetaMask
 * Call this in your ConnectWallet component
 */
export function useAutoResumeWalletConnection(
  isConnected: boolean,
  wcAddress: string | undefined,
  onResumeDetected: () => void
): void {
  const lastAddressRef = useRef<string | undefined>(undefined);
  const resumeAttemptedRef = useRef(false);

  useMobileWalletReturn(() => {
    console.log('[MobileWalletRecovery] Wallet return detected, checking for resume...');
    
    // Check if wallet is now connected after return
    if (isConnected && wcAddress && wcAddress !== lastAddressRef.current) {
      console.log('[MobileWalletRecovery] ✅ Wallet connected after return:', wcAddress);
      lastAddressRef.current = wcAddress;
      
      // Trigger resume
      onResumeDetected();
    }
    
    // Check if there's a pending state to resume
    const pendingState = getPendingWalletState();
    if (pendingState && !resumeAttemptedRef.current) {
      console.log('[MobileWalletRecovery] Found pending wallet state, triggering resume');
      resumeAttemptedRef.current = true;
      onResumeDetected();
    }
  });

  // Reset resume attempt flag when connected state changes significantly
  useEffect(() => {
    if (!isConnected && !wcAddress) {
      resumeAttemptedRef.current = false;
    }
  }, [isConnected, wcAddress]);
}

/**
 * Hook to detect page reload and check for resume state
 * Returns the reload resume state if found, null otherwise
 */
export function useReloadResumeDetection(): ReloadResumeState | null {
  const detectedRef = useRef(false);
  const stateRef = useRef<ReloadResumeState | null>(null);

  useEffect(() => {
    if (detectedRef.current) return; // Only run once
    detectedRef.current = true;
    
    const resumeState = getReloadResumeState();
    if (resumeState) {
      console.log('[MobileWalletRecovery] 🔄 Page reloaded! Detected resume state:', resumeState.account);
      stateRef.current = resumeState;
      // Increment reload count so we can track how many times we've reloaded
      resumeState.reloadCount += 1;
      if (resumeState.reloadCount > 3) {
        console.log('[MobileWalletRecovery] ⚠️ Too many reloads, clearing resume state');
        clearReloadResumeState();
      } else {
        saveReloadResumeState(resumeState);
      }
    }
  }, []);

  return stateRef.current;
}
