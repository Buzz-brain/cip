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
import logoImg from "@assets/cip-logo.svg";
import helpIcon from "@assets/help.svg";
import connectWalletOrange from "@assets/connect-wallet.-orange.svg";
// import cotiWalletIcon from "@assets/coti-wallet.svg";
import metamask from "@assets/metamask.svg";
import trustWallet from "@assets/trust-wallet.svg";
import phantom from "@assets/phantom.svg";
// import ledger from "@assets/ledger.svg";
import arrowForward from "@assets/arrow-forward.svg";

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
  // {
  //   id: "walletconnect",
  //   name: "WalletConnect",
  //   description: "Connect mobile wallets via QR or deep link",
  //   category: "Mobile",
  //   icon: connectWalletOrange,
  // },
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
    const { open: openWeb3Modal } = useWeb3Modal();

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
      const shouldRequireSetup = role.toLowerCase() === "user" && isFullyRegistered !== true;
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
      <header className="w-full h-[65px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#392f28]">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Logo" />
          <div className="[font-family:'Manrope',Helvetica] font-bold text-white text-[17.6px] leading-[22px]">
            CIP
          </div>
        </div>

        <nav className="flex items-center gap-[35px]">
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

        <div className="flex items-center gap-4">
          <Button className="h-10 px-4 bg-[#ff6600] hover:bg-[#ff7700] [font-family:'Manrope',Helvetica] font-bold text-white text-sm leading-[21px] rounded-lg gap-2">
            <img src={helpIcon} alt="Icon" />
            Help Center
          </Button>
        </div>
      </header>

      <section className="w-full flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-full bg-[#ff660033] flex items-center justify-center flex-shrink-0 mt-1">
            <img src={connectWalletOrange} alt="Icon" />
          </div>

          <h1 className="text-5xl font-bold text-white text-center [font-family:'Manrope',Helvetica]">
            Connect your Wallet
          </h1>

          <p className="text-center text-gray-400 max-w-2xl [font-family:'Manrope',Helvetica] text-base leading-relaxed">
            Select a provider to securely access your inheritance dashboard and
            manage your digital legacy across chains.
          </p>
        </div>

        {isConnectingWallet && (
          <div className="bg-[#332b22] border border-[#ff6600]/30 rounded-lg p-4 mb-6 flex items-center gap-3 max-w-md mx-auto">
            <div className="w-5 h-5 border-2 border-[#ff6600] border-t-transparent rounded-full animate-spin"></div>
            <div className="text-[#ff6600] font-semibold text-base [font-family:'Manrope',Helvetica]">
              Connecting wallet and signing message...
            </div>
          </div>
        )}



        <div className="grid grid-cols-3 gap-6 max-w-5xl mb-8">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              disabled={isConnectingWallet}
              onClick={() => handleWalletSelect(wallet.id)}
              className="group relative p-6 rounded-2xl bg-[#2d2420] border border-[#3d3530] hover:border-[#ff6600] hover:bg-[#332b22] transition-all duration-200 cursor-pointer flex flex-col items-start gap-3 min-h-[200px] min-w-[280px]"
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

              <img
                className="w-16 h-16 rounded-lg bg-white text-2xl"
                src={wallet.icon}
                alt={wallet.name}
              />

              <h3 className="text-lg font-bold text-white text-left [font-family:'Manrope',Helvetica]">
                {wallet.name}
              </h3>

              <p className="text-sm text-gray-400 text-left [font-family:'Manrope',Helvetica]">
                {wallet.description}
              </p>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={() => navigate("/wallet-recovery")}
            className="h-12 px-8 bg-[#ff6600] hover:bg-[#ff7700] [font-family:'Manrope',Helvetica] font-bold text-white text-base leading-[21px] rounded-lg gap-2"
          >
            <img src={helpIcon} alt="Icon" />
            Forgot Access
          </Button>
          <div className="flex gap-1 justify-between items-center">
            <p className="text-gray-400 [font-family:'Manrope',Helvetica] text-sm">
              New here?
            </p>
            <p className="text-[#ff6600] [font-family:'Manrope',Helvetica] text-sm">
              Learn how to create a wallet
            </p>
            <p>
              <a
                href="#create"
                className="text-[#ff6600] hover:text-[#ff7700] test-sm transition-colors"
              ></a>
            </p>
            <img src={arrowForward} className="w-3" alt="" />
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-8 [font-family:'Manrope',Helvetica] leading-relaxed">
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
