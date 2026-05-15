/**
 * useWalletConnectLifecycle Hook - APPKIT VERSION
 * 
 * Manages WalletConnect connection lifecycle with:
 * - AppKit modal control
 * - Connection state monitoring
 * - Mobile wallet return detection
 * - Error handling with user-friendly messages
 */

import { useCallback, useRef, useEffect, useState } from 'react';
import { useAppKit, useAppKitAccount, useAppKitProvider, useDisconnect } from '@reown/appkit/react';
import { toast } from 'react-toastify';

interface WalletConnectLifecycleOptions {
  onConnected?: (address: string) => void;
  onFailed?: (error: string) => void;
  onCancelled?: () => void;
}

interface UseWalletConnectLifecycleReturn {
  isConnecting: boolean;
  openWalletConnectModal: () => Promise<void>;
  resetConnection: () => Promise<void>;
  isModalOpen: boolean;
}

/**
 * Normalizes WalletConnect error messages to user-friendly strings
 */
function normalizeWCError(err: unknown): string {
  const errStr = err instanceof Error ? err.message : String(err);

  // Relayer errors
  if (/relayer|relay|connection timeout|no response/i.test(errStr)) {
    return 'WalletConnect relay unreachable. Try a VPN, or use MetaMask / Trust Wallet directly.';
  }

  // User cancelled
  if (/cancelled|rejected|user rejected|user denied|user closed/i.test(errStr)) {
    return 'Connection cancelled. Please try again.';
  }

  // Already pending
  if (/already pending|duplicate request|already connecting/i.test(errStr)) {
    return 'Connection already in progress. Please wait.';
  }

  // Stale session
  if (/stale|expired|outdated|no pairing/i.test(errStr)) {
    return 'Session expired. Please try reconnecting.';
  }

  // Connection declined
  if (/declined|not allowed|rejected by peer/i.test(errStr)) {
    return 'Connection declined. Try again or use another wallet.';
  }

  // Modal closed
  if (/modal closed|closed|aborted/i.test(errStr)) {
    return 'Connection closed. Please try again.';
  }

  // Provider unavailable
  if (/no provider|not found|unavailable|not detected/i.test(errStr)) {
    return 'Wallet provider unavailable. Install a Web3 wallet.';
  }

  // Default
  return 'Connection failed. Please try again.';
}

/**
 * Main WalletConnect lifecycle hook - APPKIT VERSION
 */
export function useWalletConnectLifecycle(
  options: WalletConnectLifecycleOptions = {}
): UseWalletConnectLifecycleReturn {
  const { open, close } = useAppKit();
  const { address: wcAddress, isConnected: wcIsConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const { disconnect } = useDisconnect();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Guard refs to prevent duplicate logic execution
  const wcLoginGuard = useRef(false);
  const toastGuard = useRef(new Set<string>());

  /**
   * Shows a toast only once per unique message
   */
  const showToastOnce = useCallback((message: string, type: 'error' | 'success' | 'info' = 'error') => {
    const key = `${type}:${message}`;
    if (toastGuard.current.has(key)) return;
    toastGuard.current.add(key);

    if (type === 'error') toast.error(message);
    else if (type === 'success') toast.success(message);
    else toast.info(message);

    // Clear after 3 seconds to allow re-showing
    setTimeout(() => toastGuard.current.delete(key), 3000);
  }, []);

  /**
   * Opens AppKit modal for wallet connection
   */
  const openWalletConnectModal = useCallback(async () => {
    console.log('[useWalletConnectLifecycle] Opening AppKit modal');

    setIsConnecting(true);

    try {
      // Open AppKit modal - it handles connection internally
      open?.({ view: 'Connect' });
      setIsModalOpen(true);

      console.log('[useWalletConnectLifecycle] Modal opened - waiting for connection...');
    } catch (err) {
      console.error('[useWalletConnectLifecycle] Error opening modal:', err);
      const message = normalizeWCError(err);
      showToastOnce(message, 'error');
      setIsConnecting(false);
      setIsModalOpen(false);
    }
  }, [open, showToastOnce]);

  /**
   * Resets WalletConnect connection completely
   */
  const resetConnection = useCallback(async () => {
    console.log('[useWalletConnectLifecycle] Resetting connection...');

    try {
      // Disconnect if connected
      if (wcIsConnected) {
        await disconnect?.();
      }

      // Close modal if open
      try {
        close?.();
      } catch (err) {
        console.warn('[useWalletConnectLifecycle] closeModal failed:', err instanceof Error ? err.message : err);
      }
    } catch (err) {
      console.warn('[useWalletConnectLifecycle] Reset error (non-fatal):', err instanceof Error ? err.message : err);
    }

    // Reset UI state
    setIsConnecting(false);
    setIsModalOpen(false);
    wcLoginGuard.current = false;

    console.log('[useWalletConnectLifecycle] ✅ Reset complete');

    // Small delay for state consistency
    await new Promise(r => setTimeout(r, 100));
  }, [wcIsConnected, disconnect, close]);

  /**
   * Listen for successful connection
   */
  useEffect(() => {
    if (!wcIsConnected || !wcAddress || !walletProvider) {
      return;
    }

    if (wcLoginGuard.current) {
      console.log('[useWalletConnectLifecycle] Login already triggered, skipping duplicate');
      return;
    }

    wcLoginGuard.current = true;
    console.log('[useWalletConnectLifecycle] ✅ Connected:', wcAddress);

    setIsConnecting(false);
    setIsModalOpen(false);

    // Fire callback
    options.onConnected?.(wcAddress);
  }, [wcIsConnected, wcAddress, walletProvider, options]);

  /**
   * Listen for modal closure / connection cancellation
   * Detects when modal closes without connecting
   */
  useEffect(() => {
    if (!isModalOpen) return;

    // Check if AppKit modal is still open via DOM
    const checkInterval = setInterval(() => {
      const modalElement = document.querySelector('w3m-modal');
      const isModalVisible = modalElement?.hasAttribute('open');

      // If modal is not visible anymore, user closed it
      if (!isModalVisible && wcLoginGuard.current === false) {
        console.log('[useWalletConnectLifecycle] Modal closed by user (not connected)');
        clearInterval(checkInterval);
        setIsModalOpen(false);

        // Only call cancelled if we were trying to connect (no connection yet)
        if (!wcIsConnected || !wcAddress) {
          showToastOnce('Connection cancelled.', 'info');
          options.onCancelled?.();
        }

        // Reset connecting flag
        setIsConnecting(false);
      }
    }, 500);

    return () => clearInterval(checkInterval);
  }, [isModalOpen, wcIsConnected, wcAddress, showToastOnce, options]);

  /**
   * Fallback: If modal has been open for too long (>60s) without connection,
   * assume user abandoned the attempt
   */
  useEffect(() => {
    if (!isModalOpen) return;

    const timeout = setTimeout(() => {
      // If modal is still open but no connection after 60 seconds
      if (isModalOpen && !wcIsConnected) {
        console.log('[useWalletConnectLifecycle] Modal timeout - no connection after 60s');
        setIsModalOpen(false);
        setIsConnecting(false);
        showToastOnce('Connection timeout - please try again.', 'error');
        
        try {
          close?.();
        } catch (e) {
          console.warn('[useWalletConnectLifecycle] Error closing modal on timeout:', e);
        }
      }
    }, 60000); // 60 second timeout

    return () => clearTimeout(timeout);
  }, [isModalOpen, wcIsConnected, close, showToastOnce]);

  return {
    isConnecting,
    openWalletConnectModal,
    resetConnection,
    isModalOpen,
  };
}

/**
 * Hook to detect when user returns from wallet app on mobile
 * Useful for triggering cleanup/reconnect logic
 */
export function useMobileWalletReturn(onReturn: () => void): void {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('[useMobileWalletReturn] Page regained focus');
        onReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onReturn]);
}
