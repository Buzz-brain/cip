import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { Button } from "@components/ui/button";
import { toast } from "react-toastify";
import * as walletUtils from "../../lib/wallet/walletUtils";
import { initEip6963Discovery, getWalletProviderByRdns, waitForWalletProvider } from "../../lib/wallet/walletUtils";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { normalizeWalletAddress, getDashboardRoute } from "../../lib/utils";
import { verifyMessage } from "ethers";
import * as authAPI from "../../lib/api/auth";
import logoImg from "@assets/cip-logo-full.png";
import helpIcon from "@assets/help.svg";
import connectWalletOrange from "@assets/connect-wallet.-orange.svg";
// import cotiWalletIcon from "@assets/coti-wallet.svg";
import metamask from "@assets/metamask.svg";
import trustWallet from "@assets/trust-wallet.svg";
import phantom from "@assets/phantom.svg";
// import ledger from "@assets/ledger.svg";
// import arrowForward from "@assets/arrow-forward.svg";
import { Link } from "react-router-dom";


const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#core-capabilities" },
  { label: "Security", href: "#security" },
];

const wallets = [
  // {
  //   id: "coti",
  //   name: "COTI Wallet",
  //   description: "Native Protocol Support",
  //   icon: cotiWalletIcon,
  //   badge: "Recommended",
  // },
  {
    id: "metamask",
    name: "MetaMask",
    description: "Ethereum & L2s",
    category: "EVM",
    icon: metamask,
  },
  {
    id: "trust",
    name: "Trust Wallet",
    description: "Broad Asset Support",
    category: "Multi-chain",
    icon: trustWallet,
  },
  {
    id: "phantom",
    name: "Phantom",
    description: "Solana & Bitcoin",
    category: "Solana",
    icon: phantom,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect mobile wallets via QR or deep link",
    category: "Mobile",
    icon: connectWalletOrange,
  },
    // {
    //   id: "coinbase",
    //   name: "Coinbase Wallet",
    //   description: "Exchange Connected",
    //   icon: coinbaseWallet,
    // },
  // {
  //   id: "ledger",
  //   name: "Ledger",
  //   description: "Cold Storage",
  //   category: "Hardware",
  //   icon: ledger,
  // },
];

export const ConnectWallet = (): JSX.Element => {
  const { getNonce, loginWithWallet, fetchUserInfo, user } = useAuth();
  const navigate = useNavigate();
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const { open: openWeb3Modal } = useWeb3Modal();

  const handleNavigation = (href: string) => {
    if (href === "/") {
      navigate("/");
    } else if (href === "/#core-capabilities") {
      navigate("/", { replace: false });
      // Scroll after navigation completes
      setTimeout(() => {
        const element = document.getElementById("core-capabilities");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleWalletSelect = async (walletId: string) => {
    setIsConnectingWallet(true);

    try {
      // Ensure we discover available injected providers (EIP-6963)
      initEip6963Discovery();

      // If user selected WalletConnect, open the Web3Modal (WalletConnect) flow
      if (walletId === 'walletconnect') {
        try {
          openWeb3Modal();
        } finally {
          setIsConnectingWallet(false);
        }
        return;
      }

      // Map walletId to expected rdns identifiers
      const rdnsMap: Record<string, string> = {
        metamask: "io.metamask",
        trust: "com.trustwallet.app",
        coinbase: "com.coinbase.wallet",
      };

      const rdns = rdnsMap[walletId];
      let provider = null as any;

      if (rdns) {
        // Try to get provider immediately
        provider = getWalletProviderByRdns(rdns);
        if (!provider) {
          // Wait briefly for announcements
          provider = await waitForWalletProvider(rdns, 2000);
        }
      }

      // (handled above for walletconnect)

      if (!provider) {
        const walletObj = wallets.find((w) => w.id === walletId);
        const displayName = walletObj?.name ?? walletId;
        // Show a single, clear toast suggesting fallback to WalletConnect
        toast.error(`${displayName} not detected. Install the extension or use WalletConnect.`);
        // Do not throw here to avoid duplicate toasts from the outer catch
        return;
      }

      console.log('[ConnectWallet] Using discovered provider for', walletId, provider);

      // Always sign through the discovered provider
      let account = await walletUtils.requestWalletConnection(provider);
      // Normalize wallet address to lowercase for consistency
      account = normalizeWalletAddress(account);
      const nonce = await getNonce(account);
      let signature = await walletUtils.signMessage(nonce, account, provider);

      // Log signature and message details for debugging
      console.log('[ConnectWallet] Signing details:', {
        account,
        nonce,
        signature,
        signatureLength: signature ? signature.length : 0,
        providerSummary: {
          name: provider?.name || provider?.constructor?.name,
          isMetaMask: !!provider?.isMetaMask,
          isTrustWallet: !!provider?.isTrustWallet,
          isCoinbaseWallet: !!provider?.isCoinbaseWallet,
        },
      });

      // Client-side recovery check to detect mismatches before backend call
      try {
        const recovered = verifyMessage(nonce, signature);
        console.log('[ConnectWallet] Recovered address from signature:', recovered);
        if (recovered.toLowerCase() !== account.toLowerCase()) {
          console.warn('[ConnectWallet] ⚠️ Recovered address does not match connected account');
        }
      } catch (recErr) {
        console.error('[ConnectWallet] Failed to recover address from signature:', recErr);
      }

      const returnedUser = await loginWithWallet(account, signature, nonce);
      console.log('[ConnectWallet] login returnedUser', returnedUser, 'context user before fetch:', user);
      // If login didn't include userInfo, fetch it directly using the returned token
      let finalUserInfo = returnedUser?.userInfo ?? null;
      if (!finalUserInfo && returnedUser?.token) {
        try {
          finalUserInfo = await authAPI.getUserInfo(returnedUser.token);
        } catch (e) {
          // fallback: try context fetch
          try {
            await fetchUserInfo();
          } catch {}
          finalUserInfo = returnedUser?.userInfo ?? null;
        }
      }
      const finalUser = { ...(returnedUser || user), userInfo: finalUserInfo || returnedUser?.userInfo || user?.userInfo };
      const role = ((finalUser?.userInfo?.role ?? (finalUser as any)?.role) || "").toString();
      const isFullyRegistered = finalUser?.userInfo?.full_reg;
      const isSetup = finalUser?.userInfo?.is_setup;
      // Require profile setup when the account is a standard `user` and registration/setup flags are incomplete.
      // Also treat missing role as needing setup if registration flags are incomplete (new users).
      const roleLower = role.toLowerCase();
      const likelyUser = roleLower === "user" || roleLower === "";
      const shouldRequireSetup = likelyUser && (isFullyRegistered !== true || isSetup === false);
      console.log('[ConnectWallet] finalUser for redirect', { role, isFullyRegistered, shouldRequireSetup, userInfo: finalUser.userInfo });
      if (shouldRequireSetup) {
        navigate("/profile-setup");
      } else {
        navigate(getDashboardRoute(role));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to connect wallet";
      console.error("ConnectWallet: failed:", err);
      toast.error(errorMessage);
    } finally {
      setIsConnectingWallet(false);
    }
  };

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

        {isConnectingWallet && (
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
                disabled={isConnectingWallet}
                onClick={() => handleWalletSelect(wallet.id)}
                className="group relative p-4 sm:p-6 rounded-2xl bg-[#2d2420] border border-[#3d3530] hover:border-[#ff6600] hover:bg-[#332b22] transition-all duration-200 cursor-pointer flex flex-col items-start gap-3 min-h-[140px] sm:min-h-[200px] w-full"
              >
              {/* {wallet.badge && (
                <span className="absolute top-4 right-4 text-[13px] px-3 py-1 rounded-full bg-[#ff660033] border-[#f6b13b33] text-[#ff6600] [font-family:'Manrope',Helvetica]">
                  {wallet.badge}
                </span>
              )} */}

              {wallet.category && (
                <span className="absolute top-4 right-4 text-[13px] px-3 py-1 rounded-full bg-[#554233] text-gray-300 font-medium [font-family:'Manrope',Helvetica]">
                  {wallet.category}
                </span>
              )}

                <img className="w-12 h-12 sm:w-16 sm:h-16 rounded-md bg-white" src={wallet.icon} alt={wallet.name} />

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
            onClick={() => navigate("/connect-wallet")}
            className="w-full h-12 px-6 bg-[#ff6600] hover:bg-[#ff7700] [font-family:'Manrope',Helvetica] font-bold text-white text-base leading-[21px] rounded-lg gap-2 flex items-center justify-center"
          >
            <img src={helpIcon} alt="Icon" className="w-4 h-4 mr-2" />
            Forgot Access
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 items-center text-center">
            <p className="text-gray-400 [font-family:'Manrope',Helvetica] text-sm">New here?</p>
            <a className="text-[#ff6600] [font-family:'Manrope',Helvetica] text-sm hover:text-[#ff7700]">Learn how to create a wallet</a>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-8 [font-family:'Manrope',Helvetica] leading-relaxed max-w-md">
          By connecting your wallet, you agree to our{" "}
          <a
            href="#tos"
            className="text-gray-400 hover:text-gray-300 underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#privacy"
            className="text-gray-400 hover:text-gray-300 underline"
          >
            Privacy Policy.
          </a>
        </p>
      </section>
    </div>
  );
};
