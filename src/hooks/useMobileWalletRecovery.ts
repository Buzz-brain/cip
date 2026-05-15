/**
 * useMobileWalletRecovery Hook
 * 
 * Handles mobile wallet recovery when user returns from MetaMask in-app browser.
 * Preserves connection state across app suspend/resume cycles.
 */

import { useEffect, useRef, useState } from 'react';

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
  } catch (err) {
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
      clearPendingWalletState();
      return null;
    }
    
    return state;
  } catch (err) {
    return null;
  }
}

/**
 * Clear pending wallet state (only PENDING_STATE_KEY and RETURN_FROM_WALLET_KEY)
 * Do NOT clear RELOAD_RESUME_KEY — that is managed independently by clearReloadResumeState()
 */
export function clearPendingWalletState(): void {
  try {
    sessionStorage.removeItem(PENDING_STATE_KEY);
    sessionStorage.removeItem(RETURN_FROM_WALLET_KEY);
  } catch (err) {
  }
}

/**
 * Save reload resume state (used when page reloads during wallet signing)
 */
export function saveReloadResumeState(state: ReloadResumeState): void {
  try {
    sessionStorage.setItem(RELOAD_RESUME_KEY, JSON.stringify(state));
  } catch (err) {
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
    if (Date.now() - state.timestamp > 10 * 60 * 1000) {
      clearPendingWalletState();
      return null;
    }
    return state;
  } catch (err) {
    return null;
  }
}

/**
 * Clear reload resume state
 */
export function clearReloadResumeState(): void {
  try {
    sessionStorage.removeItem(RELOAD_RESUME_KEY);
  } catch (err) {
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
        // Record return time
        try {
          sessionStorage.setItem(RETURN_FROM_WALLET_KEY, Date.now().toString());
        } catch (err) {
        }
        onReturn();
      }
    };

    const handleFocus = () => {
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
    // Check if wallet is now connected after return
    if (isConnected && wcAddress && wcAddress !== lastAddressRef.current) {
      lastAddressRef.current = wcAddress;
      
      // Trigger resume
      onResumeDetected();
    }
    
    // Check if there's a pending state to resume
    const pendingState = getPendingWalletState();
    if (pendingState && !resumeAttemptedRef.current) {
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
 * Call this on mount of your connection page to auto-resume after reload
 */
export function useReloadResumeDetection(): ReloadResumeState | null {
  const detectedRef = useRef(false);
  const [resumeState, setResumeState] = useState<ReloadResumeState | null>(null);

  useEffect(() => {
    if (detectedRef.current) return; // Only run once
    detectedRef.current = true;
    
    const state = getReloadResumeState();
    if (state) {
      // Increment reload count so we can track how many times we've reloaded
      state.reloadCount += 1;
      if (state.reloadCount > 3) {
        clearReloadResumeState();
      } else {
        saveReloadResumeState(state);
        setResumeState(state); // ✅ triggers re-render so ConnectWallet's useEffect sees the value
      }
    }
  }, []);

  return resumeState;
}
