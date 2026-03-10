import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import logoImg from "@assets/cip-logo.svg";
import helpIcon from "@assets/help.svg";
import connectWalletOrange from "@assets/connect-wallet.-orange.svg";
import cotiWalletIcon from "@assets/coti-wallet.svg";
import metamask from "@assets/metamask.svg";
import trustWallet from "@assets/trust-wallet.svg";
import phantom from "@assets/phantom.svg";
import coinbaseWallet from "@assets/coinbase-wallet.svg";
import ledger from "@assets/ledger.svg";
import arrowForward from "@assets/arrow-forward.svg";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
];

const wallets = [
  {
    id: "coti",
    name: "COTI Wallet",
    description: "Native Protocol Support",
    icon: cotiWalletIcon,
    badge: "Recommended",
  },
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
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Exchange Connected",
    icon: coinbaseWallet,
  },
  {
    id: "ledger",
    name: "Ledger",
    description: "Cold Storage",
    category: "Hardware",
    icon: ledger,
  },
];

export const ConnectWallet = (): JSX.Element => {
  const navigate = useNavigate();

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
            <a
              key={item.label}
              href={item.href}
              className="[font-family:'Manrope',Helvetica] font-medium text-white text-sm leading-[21px] whitespace-nowrap hover:text-[#ff6600] transition-colors"
            >
              {item.label}
            </a>
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

        <div className="grid grid-cols-3 gap-6 max-w-5xl mb-8">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => navigate("/profile-setup")}
              className="group relative p-6 rounded-2xl bg-[#2d2420] border border-[#3d3530] hover:border-[#ff6600] hover:bg-[#332b22] transition-all duration-200 cursor-pointer flex flex-col items-start gap-3 min-h-[200px] min-w-[280px]"
            >
              {wallet.badge && (
                <span className="absolute top-4 right-4 text-[13px] px-3 py-1 rounded-full bg-[#ff660033] border-[#f6b13b33] text-[#ff6600] [font-family:'Manrope',Helvetica]">
                  {wallet.badge}
                </span>
              )}

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
