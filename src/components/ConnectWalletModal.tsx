import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Button } from "@components/ui/button";
import { toast } from "react-toastify";
import * as walletUtils from "../lib/wallet/walletUtils";
import { initEip6963Discovery, waitForWalletProvider, signMessage, ensureArbitrumSepoliaWithFallback } from "../lib/wallet/walletUtils";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { normalizeWalletAddress, getDashboardRoute } from "../lib/utils";
import { verifyMessage } from "ethers";
import * as authAPI from "../lib/api/auth";
import { useWalletConnectLifecycle } from "../hooks/useWalletConnectLifecycle";
import connectWalletOrange from "@assets/connect-wallet-orange.svg";
import walletConnect from "@assets/walletconnect-logo.svg";
import metamask from "@assets/metamask-icon.svg";
import trustWallet from "@assets/trust-wallet-icon.svg";
import helpIcon from "@assets/help.svg";
import { logDebug } from "../lib/debugLogger";

const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Ethereum & L2s",
    category: "EVM",
    icon: metamask,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect mobile wallets via QR or deep link",
    category: "Mobile",
    icon: walletConnect,
  },
  {
    id: "trust",
    name: "Trust Wallet",
    description: "Broad Asset Support",
    category: "Multi-chain",
    icon: trustWallet,
  },
];

function normalizeErrorMessage(err: unknown): string {
  const errStr = err instanceof Error ? err.message : String(err);
  if (/rejected|cancelled|user denied|user declined/i.test(errStr)) return 'Connection cancelled. Please try again.';
  if (/already pending|duplicate request|already connecting/i.test(errStr)) return 'Connection already in progress. Please wait.';
  if (/stale|expired|outdated/i.test(errStr)) return 'Session expired. Please refresh and try again.';
  if (/connection declined|declined/i.test(errStr)) return 'Connection declined by wallet. Please try again.';
  if (/not found|not detected|not installed/i.test(errStr)) {
    const walletName = errStr.includes('MetaMask') ? 'MetaMask' : errStr.includes('Trust') ? 'Trust Wallet' : 'Wallet';
    return `${walletName} not detected. Install the extension or use WalletConnect.`;
  }
  return errStr || 'Connection failed. Please try again.';
}

function resolvePostLoginRoute(userInfo: any, role: string): string {
  const roleLower = (role || '').toLowerCase();
  const likelyUser = roleLower === 'user' || roleLower === '';
  const isFullyRegistered = userInfo?.full_reg;
  const shouldRequireSetup = likelyUser && isFullyRegistered !== true;
  return shouldRequireSetup ? '/profile-setup' : getDashboardRoute(role);
}

interface ConnectWalletModalProps {
  onClose?: () => void;
}

export const ConnectWalletModal = ({ onClose }: ConnectWalletModalProps): JSX.Element => {
  const { getNonce, loginWithWallet, fetchUserInfo } = useAuth();
  const navigate = useNavigate();
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const { walletProvider } = useAppKitProvider('eip155');
  const { address: wcAddress, isConnected: wcIsConnected } = useAppKitAccount();

  const toastGuard = useRef(new Set<string>());
  const injectedLoginTriggered = useRef(false);
  const walletConnectLoginAttempted = useRef(false);

  const showToastOnce = useCallback((message: string, type: 'error' | 'success' | 'info' = 'error') => {
    const key = `${type}:${message}`;
    if (toastGuard.current.has(key)) return;
    toastGuard.current.add(key);
    if (type === 'error') toast.error(message);
    else if (type === 'success') toast.success(message);
    else toast.info(message);
    setTimeout(() => toastGuard.current.delete(key), 3000);
  }, []);

  const {
    isConnecting: wcIsConnecting,
    openWalletConnectModal,
    isModalOpen,
  } = useWalletConnectLifecycle({
    onConnected: (address: string) => {
      console.log('[ConnectWalletModal] WalletConnect connected to:', address);
    },
    onFailed: (error: string) => {
      console.error('[ConnectWalletModal] WalletConnect failed:', error);
      showToastOnce(error, 'error');
    },
    onCancelled: () => {
      console.log('[ConnectWalletModal] WalletConnect cancelled by user');
      setIsConnectingWallet(false);
    },
  });

  const handleWalletSelect = async (walletId: string) => {
    if (walletId === 'walletconnect') {
      setIsConnectingWallet(true);
      walletConnectLoginAttempted.current = true;
      try {
        await openWalletConnectModal();
      } catch (err) {
        showToastOnce(normalizeErrorMessage(err), 'error');
      } finally {
        setIsConnectingWallet(false);
      }
      return;
    }

    setIsConnectingWallet(true);

    try {
      initEip6963Discovery();

      const rdnsMap: Record<string, string> = {
        metamask: 'io.metamask',
        trust: 'com.trustwallet.app',
        coinbase: 'com.coinbase.wallet',
      };

      const rdns = rdnsMap[walletId];
      let provider: any = null;

      if (rdns) {
        provider = walletUtils.getWalletProviderByRdns(rdns);
        if (!provider) provider = await waitForWalletProvider(rdns, 2000);
      }

      if (!provider) {
        const displayName = wallets.find((w) => w.id === walletId)?.name ?? walletId;
        showToastOnce(`${displayName} not detected. Install the extension or use WalletConnect.`, 'error');
        setIsConnectingWallet(false);
        return;
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) throw new Error('No accounts returned from wallet');

      const account = normalizeWalletAddress(accounts[0]);
      console.log('[ConnectWalletModal] Account connected:', account);

      await ensureArbitrumSepoliaWithFallback(provider);
      const nonce = await getNonce(account);
      const signature = await walletUtils.signMessage(nonce, account, provider);

      try {
        const recovered = verifyMessage(nonce, signature);
        if (recovered.toLowerCase() !== account.toLowerCase()) {
          console.warn('[ConnectWalletModal] ⚠️ Recovered address mismatch');
        }
      } catch (recErr) {
        console.error('[ConnectWalletModal] Recovery check failed:', recErr);
      }

      const returnedUser = await loginWithWallet(account, signature, nonce);

      let finalUserInfo = returnedUser?.userInfo ?? null;
      if (!finalUserInfo && returnedUser?.token) {
        try {
          finalUserInfo = await authAPI.getUserInfo(returnedUser.token);
        } catch {
          try { await fetchUserInfo(); } catch {}
          finalUserInfo = returnedUser?.userInfo ?? null;
        }
      }

      const role = ((returnedUser?.userInfo?.role ?? (returnedUser as any)?.role) || '').toString();
      const route = resolvePostLoginRoute(finalUserInfo, role);
      console.log('[ConnectWalletModal] Login successful, redirecting to:', route);
      onClose?.();
      navigate(route);
    } catch (err) {
      console.error('[ConnectWalletModal] Error:', err);
      showToastOnce(normalizeErrorMessage(err), 'error');
    } finally {
      setIsConnectingWallet(false);
    }
  };

  // Handle WalletConnect account connection
  const loginWithWalletConnectAccount = useCallback(async () => {
    if (!wcAddress || !walletProvider) return;
    if (walletConnectLoginAttempted.current) return;

    walletConnectLoginAttempted.current = true;
    console.log('[ConnectWalletModal] WalletConnect login starting');

    try {
      await ensureArbitrumSepoliaWithFallback(walletProvider);
      const nonce = await getNonce(wcAddress);
      const signature = await walletUtils.signMessage(nonce, wcAddress, walletProvider);

      const returnedUser = await loginWithWallet(wcAddress, signature, nonce);

      let finalUserInfo = returnedUser?.userInfo ?? null;
      if (!finalUserInfo && returnedUser?.token) {
        try {
          finalUserInfo = await authAPI.getUserInfo(returnedUser.token);
        } catch {
          try { await fetchUserInfo(); } catch {}
          finalUserInfo = returnedUser?.userInfo ?? null;
        }
      }

      const role = ((returnedUser?.userInfo?.role ?? (returnedUser as any)?.role) || '').toString();
      const route = resolvePostLoginRoute(finalUserInfo, role);
      console.log('[ConnectWalletModal] WalletConnect login successful, redirecting to:', route);
      onClose?.();
      navigate(route);
    } catch (err) {
      console.error('[ConnectWalletModal] WalletConnect login error:', err);
      showToastOnce(normalizeErrorMessage(err), 'error');
      walletConnectLoginAttempted.current = false;
      setIsConnectingWallet(false);
    }
  }, [wcAddress, walletProvider, getNonce, loginWithWallet, fetchUserInfo, navigate, onClose, showToastOnce]);

  useEffect(() => {
    if (wcIsConnected && wcAddress && walletProvider) {
      loginWithWalletConnectAccount();
    }
  }, [wcIsConnected, wcAddress, walletProvider, loginWithWalletConnectAccount]);

  const isAnyConnecting = isConnectingWallet || wcIsConnecting;

  return (
    <div className="flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:py-10 w-full max-h-[82vh] overflow-y-auto scrollbar-thin-custom pr-2">
      <div className="flex flex-col items-center gap-2 md:gap-4 mb-4 md:mb-8 lg:mb-12 w-full">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#ff660033] flex items-center justify-center flex-shrink-0 mt-1">
          <img
            src={connectWalletOrange}
            alt="Icon"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
          />
        </div>
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white text-center leading-tight">
          Connect your Wallet
        </h1>
        <p className="text-center text-gray-400 max-w-xl sm:max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
          Select a provider to securely access your inheritance dashboard and
          manage your digital legacy across chains.
        </p>
      </div>

      {isAnyConnecting && (
        <div className="bg-[#332b22] border border-[#ff6600]/30 rounded-lg p-2 mb-3 md:mb-6 flex items-center gap-2 md:gap-3 max-w-md mx-auto w-full sm:w-auto">
          <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-[#ff6600] border-t-transparent rounded-full animate-spin" />
          <div className="text-[#ff6600] font-semibold text-xs sm:text-sm md:text-base">
            Connecting wallet and signing message...
          </div>
        </div>
      )}

      <div className="w-full mb-4 md:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              disabled={isAnyConnecting}
              onClick={() => handleWalletSelect(wallet.id)}
              className="group relative p-3 sm:p-4 md:p-6 rounded-2xl bg-[#2d2420] border border-[#3d3530] hover:border-[#ff6600] hover:bg-[#332b22] transition-all duration-200 cursor-pointer flex flex-col items-start gap-2 md:gap-3 min-h-[100px] sm:min-h-[120px] md:min-h-[180px] w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {wallet.category && (
                <span className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[11px] sm:text-[13px] px-2 sm:px-3 py-1 rounded-full bg-[#554233] text-gray-300 font-medium">
                  {wallet.category}
                </span>
              )}
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-[#1a1715] p-1 md:p-2"
                src={wallet.icon}
                alt={wallet.name}
              />
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white text-left">
                {wallet.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 text-left leading-snug">
                {wallet.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 md:gap-4 w-full max-w-md">
        <Button
          onClick={() => navigate("/recovery")}
          className="w-full h-10 md:h-12 px-4 md:px-6 bg-[#ff6600] hover:bg-[#ff7700] font-bold text-white text-sm md:text-base leading-[21px] rounded-lg gap-2 flex items-center justify-center"
        >
          <img src={helpIcon} alt="Icon" className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
          Forgot Access
        </Button>
        <div className="flex flex-col sm:flex-row gap-1 md:gap-2 items-center text-center">
          <p className="text-gray-400 text-xs md:text-sm">New here?</p>
          <a className="text-[#ff6600] text-xs md:text-sm hover:text-[#ff7700]">
            Learn how to create a wallet
          </a>
        </div>
      </div>

      <p className="text-center text-gray-500 text-[11px] md:text-xs mt-3 md:mt-6 lg:mt-8 leading-relaxed max-w-md px-1">
        By connecting your wallet, you agree to our{" "}
        <a
          href="#tos"
          className="text-gray-400 hover:text-gray-300 underline"
        >
          Terms of Service
        </a>
        {" "}and{" "}
        <a
          href="#privacy"
          className="text-gray-400 hover:text-gray-300 underline"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default ConnectWalletModal;
