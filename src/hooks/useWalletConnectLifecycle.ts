/**
 * useWalletConnectLifecycle Hook
 * 
 * Manages WalletConnect connection lifecycle with:
 * - Duplicate request prevention
 * - Proper loading state management
 * - Disconnect handling
 * - Mobile reconnection support
 * - Error normalization
 */

import { useCallback, useRef, useEffect, useState } from 'react';
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { toast } from 'react-toastify';
import { cleanupWalletConnect, prepareMobileWalletConnect, detectMobileWalletReturn } from '../lib/wallet/walletConnectCleanup';

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

  // User cancelled
  if (/cancelled|rejected|user rejected/i.test(errStr)) {
    return 'Connection cancelled. Please try again.';
  }

  // Already pending
  if (/already pending|duplicate request|connection already|already connecting/i.test(errStr)) {
    return 'Connection already in progress. Please wait.';
  }

  // Stale pairing
  if (/stale|expired|outdated/i.test(errStr)) {
    return 'Session expired. Please try reconnecting.';
  }

  // Connection declined
  if (/connection declined|declined|not allowed/i.test(errStr)) {
    return 'Connection declined. Try again or use another wallet.';
  }

  // Modal closed
  if (/modal closed|user closed|closed|aborted/i.test(errStr)) {
    return 'Connection closed. Please try again.';
  }

  // Provider unavailable
  if (/no provider|provider not found|unavailable/i.test(errStr)) {
    return 'Wallet provider unavailable. Install a Web3 wallet.';
  }

  // Default
  return 'Connection failed. Please try again.';
}

/**
 * Main WalletConnect lifecycle hook
 */
export function useWalletConnectLifecycle(
  options: WalletConnectLifecycleOptions = {}
): UseWalletConnectLifecycleReturn {
  const { open: openWeb3Modal, close: closeWeb3Modal } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { address: wcAddress, isConnected: wcIsConnected } = useWeb3ModalAccount();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Guard refs to prevent duplicate requests
  const wcOpenGuard = useRef(false);
  const wcLoginGuard = useRef(false);
  const toastGuard = useRef(new Set<string>());

  /**
   * Shows a toast only once per unique message
   * Prevents duplicate toast storms
   */
  const showToastOnce = useCallback((message: string, type: 'error' | 'success' | 'info' = 'error') => {
    if (toastGuard.current.has(message)) return;
    toastGuard.current.add(message);
    
    if (type === 'error') toast.error(message);
    else if (type === 'success') toast.success(message);
    else toast.info(message);

    // Clear after 3 seconds to allow re-showing the same message later
    setTimeout(() => toastGuard.current.delete(message), 3000);
  }, []);

  /**
   * Opens WalletConnect modal with guards
   * Prevents multiple simultaneous modal opens
   */
  const openWalletConnectModal = useCallback(async () => {
    // Already opening/connected - prevent duplicate
    if (wcOpenGuard.current || isConnecting) {
      console.log('[useWalletConnectLifecycle] Duplicate modal open attempt blocked');
      return;
    }

    wcOpenGuard.current = true;
    setIsConnecting(true);

    try {
      console.log('[useWalletConnectLifecycle] Opening WalletConnect modal');

      // Mobile-specific cleanup before opening
      if (detectMobileWalletReturn()) {
        console.log('[useWalletConnectLifecycle] Mobile return detected - running cleanup');
        await prepareMobileWalletConnect();
      }

      // Open modal - loading state persists until connection completes or fails
      openWeb3Modal();
      setIsModalOpen(true);

      // Note: loading state will be cleared by the useEffect listener or error handler
      // DO NOT clear it here - that's the bug fix
    } catch (err) {
      console.error('[useWalletConnectLifecycle] Error opening modal:', err);
      setIsConnecting(false);
      showToastOnce(normalizeWCError(err));
    } finally {
      wcOpenGuard.current = false;
    }
  }, [isConnecting, openWeb3Modal, showToastOnce]);

  /**
   * Resets WalletConnect connection
   * Cleans up stale sessions and reconnect state
   */
  const resetConnection = useCallback(async () => {
    console.log('[useWalletConnectLifecycle] Resetting WalletConnect connection');

    // Reset login guard
    wcLoginGuard.current = false;

    // Clean up stale WalletConnect data
    try {
      await cleanupWalletConnect();
    } catch (err) {
      console.warn('[useWalletConnectLifecycle] Cleanup error (non-fatal):', err);
    }

    // Ensure modal is closed if web3modal exposes a close function
    try {
      await closeWeb3Modal?.();
    } catch (err) {
      console.warn('[useWalletConnectLifecycle] closeWeb3Modal() failed (non-fatal):', err);
    }

    // Clear loading state
    setIsConnecting(false);
    setIsModalOpen(false);

    // Small delay to let state settle
    await new Promise(resolve => setTimeout(resolve, 100));
  }, [closeWeb3Modal]);

  /**
   * Listen for successful WalletConnect connection
   * Fires only once when connection succeeds
   */
  useEffect(() => {
    if (!wcIsConnected || !wcAddress || !walletProvider) return;
    if (wcLoginGuard.current) return;

    wcLoginGuard.current = true;
    console.log('[useWalletConnectLifecycle] WalletConnect connected:', wcAddress);

    options.onConnected?.(wcAddress);
    setIsConnecting(false);
    setIsModalOpen(false);
  }, [wcIsConnected, wcAddress, walletProvider, options]);

  /**
   * Listen for modal closure
   * If modal closes without connection, reset state
   */
  useEffect(() => {
    // If the modal flag is set but there is no provider/connection and we're not actively connecting,
    // treat this as the user cancelling the flow and reset local modal state.
    if (isModalOpen && !isConnecting && !wcIsConnected && !walletProvider) {
      console.log('[useWalletConnectLifecycle] WalletConnect modal appears closed without connection');
      setIsModalOpen(false);
      showToastOnce('Connection cancelled.', 'info');
      options.onCancelled?.();
    }
  }, [isModalOpen, isConnecting, wcIsConnected, walletProvider, showToastOnce, options]);

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
      if (!document.hidden && detectMobileWalletReturn()) {
        console.log('[useMobileWalletReturn] User returned from wallet app');
        onReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onReturn]);
}
