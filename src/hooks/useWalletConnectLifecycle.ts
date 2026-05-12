/**
 * useWalletConnectLifecycle Hook - ENHANCED FOR MOBILE STABILITY
 * 
 * Manages WalletConnect connection lifecycle with:
 * - Global connection lock (prevents simultaneous attempts)
 * - Hard session reset before connection
 * - Relayer failure detection & exponential backoff
 * - Mobile app switching support
 * - Safe error handling with proper cleanup
 */

import { useCallback, useRef, useEffect, useState } from 'react';
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { toast } from 'react-toastify';
import { cleanupWalletConnect, detectMobileWalletReturn } from '../lib/wallet/walletConnectCleanup';
import { walletConnectLock } from '../lib/wallet/walletConnectLock';
import { hardDisconnectWeb3Modal, clearAllWalletConnectState } from '../lib/wallet/walletConnectDisconnect';

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
 * Also detects relayer failures and other critical errors
 */
function normalizeWCError(err: unknown): { message: string; isRelayerError: boolean; isCritical: boolean } {
  const errStr = err instanceof Error ? err.message : String(err);

  // Relayer errors - these need special handling
  if (/relayer|relay|connection timeout|no response/i.test(errStr)) {
    return {
      message: 'WalletConnect relay unreachable. Try a VPN, or use MetaMask / Trust Wallet directly.',
      isRelayerError: true,
      isCritical: true,
    };
  }

  // User cancelled
  if (/cancelled|rejected|user rejected|user denied/i.test(errStr)) {
    return {
      message: 'Connection cancelled. Please try again.',
      isRelayerError: false,
      isCritical: false,
    };
  }

  // Already pending - should never happen with our lock
  if (/already pending|duplicate request|connection already|already connecting/i.test(errStr)) {
    return {
      message: 'Connection already in progress. Please wait.',
      isRelayerError: false,
      isCritical: true,
    };
  }

  // Stale pairing
  if (/stale|expired|outdated|no pairing/i.test(errStr)) {
    return {
      message: 'Session expired. Please try reconnecting.',
      isRelayerError: false,
      isCritical: false,
    };
  }

  // Connection declined
  if (/connection declined|declined|not allowed|rejected by peer/i.test(errStr)) {
    return {
      message: 'Connection declined. Try again or use another wallet.',
      isRelayerError: false,
      isCritical: false,
    };
  }

  // Modal closed
  if (/modal closed|user closed|closed|aborted/i.test(errStr)) {
    return {
      message: 'Connection closed. Please try again.',
      isRelayerError: false,
      isCritical: false,
    };
  }

  // Provider unavailable
  if (/no provider|provider not found|unavailable|not detected/i.test(errStr)) {
    return {
      message: 'Wallet provider unavailable. Install a Web3 wallet.',
      isRelayerError: false,
      isCritical: false,
    };
  }

  // Default
  return {
    message: 'Connection failed. Please try again.',
    isRelayerError: false,
    isCritical: false,
  };
}

/**
 * Main WalletConnect lifecycle hook - MOBILE STABLE VERSION
 */
export function useWalletConnectLifecycle(
  options: WalletConnectLifecycleOptions = {}
): UseWalletConnectLifecycleReturn {
  const { open: openWeb3Modal, close: closeWeb3Modal } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { address: wcAddress, isConnected: wcIsConnected } = useWeb3ModalAccount();

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
   * Opens WalletConnect modal with global connection lock
   * This ensures ONLY ONE connection attempt happens at a time
   */
  const openWalletConnectModal = useCallback(async () => {
    const sessionId = walletConnectLock.getSessionId();
    console.log(`[useWalletConnectLifecycle] openWalletConnectModal called (session: ${sessionId})`);

    // Try to acquire connection lock
    if (!walletConnectLock.tryAcquire()) {
      const lockState = walletConnectLock.getState();
      console.warn(`[useWalletConnectLifecycle] Lock not available. State: ${lockState.state}`);

      if (lockState.state === 'error') {
        const backoffSec = Math.ceil((lockState.lastErrorTime ? 60000 - (Date.now() - lockState.lastErrorTime) : 10000) / 1000);
        showToastOnce(`Please wait ${backoffSec}s before retrying...`, 'info');
      }
      return;
    }

    setIsConnecting(true);

    try {
      console.log('[useWalletConnectLifecycle] Lock acquired - opening modal');

      // HARD DISCONNECT: Ensure absolutely NO stale state
      console.log('[useWalletConnectLifecycle] Performing hard disconnect...');
      await clearAllWalletConnectState();
      await new Promise(r => setTimeout(r, 200)); // Let state settle

      // Mobile-specific pre-connection cleanup
      if (detectMobileWalletReturn()) {
        console.log('[useWalletConnectLifecycle] Mobile return detected - running preparation');
        await cleanupWalletConnect(false); // Conservative on first attempt
      }

      // Open Web3Modal - loading state persists until connection succeeds/fails
      console.log('[useWalletConnectLifecycle] Opening Web3Modal');
      openWeb3Modal();
      setIsModalOpen(true);

      console.log('[useWalletConnectLifecycle] Modal opened - waiting for connection...');
    } catch (err) {
      console.error('[useWalletConnectLifecycle] Error opening modal:', err);
      const { message } = normalizeWCError(err);
      walletConnectLock.markError(err instanceof Error ? err : new Error(String(err)));
      showToastOnce(message, 'error');
      setIsConnecting(false);
    }
  }, [openWeb3Modal, showToastOnce]);

  /**
   * Resets WalletConnect connection completely
   * Cleans up and unlocks for next attempt
   */
  const resetConnection = useCallback(async () => {
    console.log('[useWalletConnectLifecycle] Resetting connection...');

    try {
      // Hard disconnect Web3Modal
      await hardDisconnectWeb3Modal();

      // Clear all state
      await clearAllWalletConnectState();

      // Close modal if open
      try {
        await closeWeb3Modal?.();
      } catch (err) {
        console.warn('[useWalletConnectLifecycle] closeWeb3Modal failed:', err instanceof Error ? err.message : err);
      }
    } catch (err) {
      console.warn('[useWalletConnectLifecycle] Reset error (non-fatal):', err instanceof Error ? err.message : err);
    }

    // Reset UI state
    setIsConnecting(false);
    setIsModalOpen(false);
    wcLoginGuard.current = false;

    // Unlock connection lock
    walletConnectLock.completeDisconnect();

    console.log('[useWalletConnectLifecycle] ✅ Reset complete');

    // Small delay for state consistency
    await new Promise(r => setTimeout(r, 100));
  }, [closeWeb3Modal]);

  /**
   * Listen for successful WalletConnect connection
   * Fires only once when connection succeeds
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

    // Mark connection as successful in lock
    walletConnectLock.markConnected();

    setIsConnecting(false);
    setIsModalOpen(false);

    // Fire callback
    options.onConnected?.(wcAddress);
  }, [wcIsConnected, wcAddress, walletProvider, options]);

  /**
   * Monitor for stuck/failed modal state
   * If modal is open but relay fails or times out, force reset
   */
  useEffect(() => {
    if (!isModalOpen || isConnecting === false) return;

    const checkInterval = setInterval(() => {
      // Check if modal element still exists and is visible
      const modalElement = document.querySelector('w3m-modal');
      const isModalDOMOpen = modalElement?.hasAttribute('open');
      
      // Check console for relay errors (WebSocket failures)
      const windowAny = window as any;
      const walletConnectErrors = (windowAny.__wc_errors || []).filter(
        (err: string) => /relay|websocket|connection failed/i.test(err)
      );
      
      // If modal is open but relay has errors, close and reset
      if (isModalDOMOpen && walletConnectErrors.length > 0) {
        console.log('[useWalletConnectLifecycle] ⚠️ Relay error detected while modal open - forcing reset');
        clearInterval(checkInterval);
        
        // Force close modal and reset everything
        try {
          closeWeb3Modal?.();
        } catch (e) {
          console.warn('[useWalletConnectLifecycle] Error closing modal:', e);
        }
        
        setIsModalOpen(false);
        setIsConnecting(false);
        walletConnectLock.completeDisconnect();
        
        showToastOnce('WalletConnect relay unreachable. Try a VPN, or use MetaMask / Trust Wallet directly.', 'error');
        options.onFailed?.('Relay error detected');
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(checkInterval);
  }, [isModalOpen, isConnecting, closeWeb3Modal, showToastOnce, options]);

  /**
   * Listen for modal closure / connection failure
   * Detects when modal is closed without connecting (user cancelled)
   */
  useEffect(() => {
    // Modal was opened but is now closed (modal element removed from DOM)
    if (isModalOpen) {
      // Check if Web3Modal has closed by looking for the modal DOM element
      const modalElement = document.querySelector('w3m-modal');
      const isModalVisible = modalElement?.hasAttribute('open');
      
      // If modal is not visible/open anymore, user likely closed it
      if (!isModalVisible) {
        console.log('[useWalletConnectLifecycle] Modal closed by user (not connected)');
        setIsModalOpen(false);
        
        // Only call cancelled if we were trying to connect (no connection yet)
        if (!wcIsConnected || !wcAddress) {
          showToastOnce('Connection cancelled.', 'info');
          options.onCancelled?.();
        }

        // Reset lock to allow next attempt
        if (!walletConnectLock.isIdle()) {
          console.log('[useWalletConnectLifecycle] Resetting lock due to modal closure');
          walletConnectLock.completeDisconnect();
        }
        
        // Reset connecting flag
        setIsConnecting(false);
      }
    }
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
        
        if (!walletConnectLock.isIdle()) {
          walletConnectLock.completeDisconnect();
        }
      }
    }, 60000); // 60 second timeout

    return () => clearTimeout(timeout);
  }, [isModalOpen, wcIsConnected, showToastOnce]);

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
