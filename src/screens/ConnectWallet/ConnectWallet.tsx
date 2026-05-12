import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { Button } from "@components/ui/button";
import { toast } from "react-toastify";
import * as walletUtils from "../../lib/wallet/walletUtils";
import { initEip6963Discovery, waitForWalletProvider, signMessage, ensureArbitrumSepoliaWithFallback } from "../../lib/wallet/walletUtils";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { normalizeWalletAddress, getDashboardRoute } from "../../lib/utils";
import { verifyMessage } from "ethers";
import * as authAPI from "../../lib/api/auth";
import { useWalletConnectLifecycle } from "../../hooks/useWalletConnectLifecycle";
import logoImg from "@assets/cip-logo-full.png";
import helpIcon from "@assets/help.svg";
import connectWalletOrange from "@assets/connect-wallet-orange.svg";
import walletConnect from "@assets/walletconnect-logo.svg";
import metamask from "@assets/metamask-icon.svg";
import trustWallet from "@assets/trust-wallet-icon.svg";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#core-capabilities" },
  { label: "Security", href: "#security" },
];

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

// Resolves the correct route after login based on user info
function resolvePostLoginRoute(userInfo: any, role: string): string {
  const roleLower = (role || '').toLowerCase();
  const likelyUser = roleLower === 'user' || roleLower === '';
  const isFullyRegistered = userInfo?.full_reg;
  const shouldRequireSetup = likelyUser && isFullyRegistered !== true;
  return shouldRequireSetup ? '/profile-setup' : getDashboardRoute(role);
}

export const ConnectWallet = (): JSX.Element => {
  const { getNonce, loginWithWallet, fetchUserInfo, user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const { walletProvider } = useAppKitProvider('eip155');
  const { address: wcAddress, isConnected: wcIsConnected } = useAppKitAccount();

  const toastGuard = useRef(new Set<string>());
  const injectedLoginTriggered = useRef(false);
  const walletConnectLoginAttempted = useRef(false);

  const {
    isConnecting: wcIsConnecting,
    openWalletConnectModal,
    isModalOpen,
  } = useWalletConnectLifecycle({
    onConnected: (address: string) => {
      console.log('[ConnectWallet] WalletConnect connected to:', address);
    },
    onFailed: (error: string) => {
      console.error('[ConnectWallet] WalletConnect failed:', error);
      showToastOnce(error, 'error');
    },
    onCancelled: () => {
      console.log('[ConnectWallet] WalletConnect cancelled by user');
      setIsConnectingWallet(false);
    },
  });

  // If user is already authenticated on mount, redirect to dashboard
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      const role = user?.userInfo?.role ?? '';
      const isFullyRegistered = user?.userInfo?.full_reg;
      const roleLower = role.toLowerCase();
      const likelyUser = roleLower === 'user' || roleLower === '';
      const shouldRequireSetup = likelyUser && isFullyRegistered !== true;

      console.log('[ConnectWallet] 🔄 User already authenticated from localStorage, redirecting...', { role, shouldRequireSetup });

      if (shouldRequireSetup) {
        navigate('/profile-setup', { replace: true });
      } else {
        navigate(getDashboardRoute(role), { replace: true });
      }
    }
  }, [loading, isAuthenticated, user, navigate]);

  useEffect(() => {
    injectedLoginTriggered.current = false;
    walletConnectLoginAttempted.current = false;
    console.log('[ConnectWallet] ✅ Page mounted - reset flags for fresh login');
  }, []);

  const showToastOnce = useCallback((message: string, type: 'error' | 'success' | 'info' = 'error') => {
    const key = `${type}:${message}`;
    if (toastGuard.current.has(key)) return;
    toastGuard.current.add(key);
    if (type === 'error') toast.error(message);
    else if (type === 'success') toast.success(message);
    else toast.info(message);
    setTimeout(() => toastGuard.current.delete(key), 3000);
  }, []);

  const handleNavigation = (href: string) => {
    if (href === '/') {
      navigate('/');
    } else if (href === '/#core-capabilities') {
      navigate('/', { replace: false });
      setTimeout(() => {
        document.getElementById('core-capabilities')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // ─── WalletConnect login ───────────────────────────────────────────────────
  const loginWithWalletConnectAccount = useCallback(async () => {
    if (!wcAddress || !walletProvider || injectedLoginTriggered.current) return;

    injectedLoginTriggered.current = true;
    setIsConnectingWallet(true);

    try {
      console.log('[ConnectWallet] Logging in with WalletConnect account:', wcAddress);

      const account = normalizeWalletAddress(wcAddress);
      await ensureArbitrumSepoliaWithFallback(walletProvider);
      const nonce = await getNonce(account);
      const signature = await signMessage(nonce, account, walletProvider);

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
      console.log('[ConnectWallet] Login successful, redirecting to:', route);
      navigate(route);
    } catch (err) {
      const errorMessage = normalizeErrorMessage(err);
      console.error('[ConnectWallet] WalletConnect login failed:', err);
      showToastOnce(errorMessage, 'error');
    } finally {
      setIsConnectingWallet(false);
      injectedLoginTriggered.current = false;
      walletConnectLoginAttempted.current = false;
    }
  }, [wcAddress, walletProvider, getNonce, loginWithWallet, fetchUserInfo, navigate, showToastOnce]);

  // Trigger WalletConnect login only after user explicitly clicked WalletConnect
  useEffect(() => {
    if (!wcIsConnected || !wcAddress || !walletProvider || !walletConnectLoginAttempted.current) return;
    loginWithWalletConnectAccount();
  }, [wcIsConnected, wcAddress, walletProvider, loginWithWalletConnectAccount]);

  useEffect(() => {
    if (isModalOpen) {
      console.log('[ConnectWallet] WalletConnect modal is open');
    }
  }, [isModalOpen]);

  // ─── Injected wallet login (MetaMask, Trust) ───────────────────────────────
  const handleWalletSelect = async (walletId: string) => {
    setIsConnectingWallet(true);

    try {
      initEip6963Discovery();

      // WalletConnect path
      if (walletId === 'walletconnect') {
        console.log('[ConnectWallet] Opening WalletConnect...');
        walletConnectLoginAttempted.current = true;
        try {
          await openWalletConnectModal();
          setIsConnectingWallet(false);
        } catch (err) {
          console.error('[ConnectWallet] WalletConnect open error:', err);
          showToastOnce(normalizeErrorMessage(err), 'error');
          setIsConnectingWallet(false);
        }
        return;
      }

      // Injected wallet path
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

      console.log('[ConnectWallet] Using discovered provider for:', walletId);

      let account = await walletUtils.requestWalletConnection(provider);
      account = normalizeWalletAddress(account);

      await ensureArbitrumSepoliaWithFallback(provider);
      const nonce = await getNonce(account);
      const signature = await walletUtils.signMessage(nonce, account, provider);

      console.log('[ConnectWallet] Signing details:', {
        account,
        nonce,
        signatureLength: signature ? signature.length : 0,
      });

      // Client-side recovery check (non-blocking)
      try {
        const recovered = verifyMessage(nonce, signature);
        if (recovered.toLowerCase() !== account.toLowerCase()) {
          console.warn('[ConnectWallet] ⚠️ Recovered address mismatch');
        }
      } catch (recErr) {
        console.error('[ConnectWallet] Recovery check failed:', recErr);
      }

      const returnedUser = await loginWithWallet(account, signature, nonce);

      let finalUserInfo = returnedUser?.userInfo ?? null;
      if (!finalUserInfo && returnedUser?.token) {
        try {
          finalUserInfo = await authAPI.getUserInfo(returnedUser.token);
        } catch (e) {
          try { await fetchUserInfo(); } catch {}
          finalUserInfo = returnedUser?.userInfo ?? null;
        }
      }

      const role = ((returnedUser?.userInfo?.role ?? (returnedUser as any)?.role) || '').toString();
      const route = resolvePostLoginRoute(finalUserInfo, role);
      console.log('[ConnectWallet] Login successful, redirecting to:', route);
      navigate(route);

    } catch (err) {
      const errorMessage = normalizeErrorMessage(err);
      console.error('[ConnectWallet] Wallet select failed:', err);
      showToastOnce(errorMessage, 'error');
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const isAnyConnecting = isConnectingWallet || wcIsConnecting;

  // Show loading screen while auth is initializing (on mount or if already authenticated)
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#221810] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#ff6600] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#221810] flex flex-col">
      <header className="w-full h-[65px] flex items-center justify-between px-4 sm:px-10 bg-[#0d0501] border-b border-[#392f28]">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={logoImg} className="h-[45px] object-cover" alt="Logo" />
          </Link>
        </div>
        <nav className="hidden sm:flex items-center gap-[20px]">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.href)}
              className="[font-family:'Manrope',Helvetica] font-medium text-white text-sm leading-[21px] whitespace-nowrap hover:text-[#ff6600] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <section className="w-full flex-1 flex flex-col items-center justify-start px-4 sm:px-8 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-4 mb-8 sm:mb-12">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ff660033] flex items-center justify-center flex-shrink-0 mt-1">
            <img src={connectWalletOrange} alt="Icon" className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center [font-family:'Manrope',Helvetica] leading-tight">
            Connect your Wallet
          </h1>
          <p className="text-center text-gray-400 max-w-xl sm:max-w-2xl [font-family:'Manrope',Helvetica] text-sm sm:text-base leading-relaxed">
            Select a provider to securely access your inheritance dashboard and manage your digital legacy across chains.
          </p>
        </div>

        {isAnyConnecting && (
          <div className="bg-[#332b22] border border-[#ff6600]/30 rounded-lg p-3 mb-6 flex items-center gap-3 max-w-md mx-auto w-full sm:w-auto">
            <div className="w-5 h-5 border-2 border-[#ff6600] border-t-transparent rounded-full animate-spin" />
            <div className="text-[#ff6600] font-semibold text-sm sm:text-base [font-family:'Manrope',Helvetica]">
              Connecting wallet and signing message...
            </div>
          </div>
        )}

        <div className="w-full max-w-4xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                disabled={isAnyConnecting}
                onClick={() => handleWalletSelect(wallet.id)}
                className="group relative p-4 sm:p-6 rounded-2xl bg-[#2d2420] border border-[#3d3530] hover:border-[#ff6600] hover:bg-[#332b22] transition-all duration-200 cursor-pointer flex flex-col items-start gap-3 min-h-[140px] sm:min-h-[200px] w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {wallet.category && (
                  <span className="absolute top-4 right-4 text-[13px] px-3 py-1 rounded-full bg-[#554233] text-gray-300 font-medium [font-family:'Manrope',Helvetica]">
                    {wallet.category}
                  </span>
                )}
                <img
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1a1715] p-2"
                  src={wallet.icon}
                  alt={wallet.name}
                />
                <h3 className="text-base sm:text-lg font-bold text-white text-left [font-family:'Manrope',Helvetica]">
                  {wallet.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 text-left [font-family:'Manrope',Helvetica]">
                  {wallet.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <Button
            onClick={() => navigate('/connect-wallet')}
            className="w-full h-12 px-6 bg-[#ff6600] hover:bg-[#ff7700] [font-family:'Manrope',Helvetica] font-bold text-white text-base leading-[21px] rounded-lg gap-2 flex items-center justify-center"
          >
            <img src={helpIcon} alt="Icon" className="w-4 h-4 mr-2" />
            Forgot Access
          </Button>
          <div className="flex flex-col sm:flex-row gap-2 items-center text-center">
            <p className="text-gray-400 [font-family:'Manrope',Helvetica] text-sm">New here?</p>
            <a className="text-[#ff6600] [font-family:'Manrope',Helvetica] text-sm hover:text-[#ff7700]">
              Learn how to create a wallet
            </a>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-8 [font-family:'Manrope',Helvetica] leading-relaxed max-w-md">
          By connecting your wallet, you agree to our{" "}
          <a href="#tos" className="text-gray-400 hover:text-gray-300 underline">Terms of Service</a>{" "}
          and{" "}
          <a href="#privacy" className="text-gray-400 hover:text-gray-300 underline">Privacy Policy.</a>
        </p>
      </section>
    </div>
  );
};