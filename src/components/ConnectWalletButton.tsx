// src/components/ConnectWalletButton.tsx
// Reusable wallet connection and login component for navbars and pages

import React, { useState } from "react";
import { Wallet, LogOut, AlertCircle } from "lucide-react";
import { useAuth } from "../context/useAuth";
import * as walletUtils from "../lib/wallet/walletUtils";

interface ConnectWalletButtonProps {
  variant?: "default" | "outline" | "ghost";
  showAddress?: boolean;
  compact?: boolean;
  onLoginSuccess?: () => void;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  variant = "default",
  showAddress = true,
  compact = false,
  onLoginSuccess,
}) => {
  const { user, isAuthenticated, loading, error, getNonce, loginWithWallet, logout, clearError } = useAuth();
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleConnectAndLogin = async () => {
    try {
      clearError();
      setIsConnectingWallet(true);

      // Step 1: Ensure user is on Ethereum mainnet
      setIsSwitchingNetwork(true);
      await walletUtils.ensureEthereumNetwork();
      setIsSwitchingNetwork(false);

      // Step 2: Connect wallet
      const account = await walletUtils.requestWalletConnection();

      // Step 3: Get nonce
      const nonce = await getNonce(account);

      // Step 4: Sign the raw nonce (not formatted)
      let signature = await walletUtils.signMessage(nonce, account);

      // Step 5: Remove 0x prefix from signature if present (backend could expectR without prefix)
      signature = signature.startsWith("0x") ? signature.slice(2) : signature;

      // Step 6: Login with raw nonce as message
      await loginWithWallet(account, signature, nonce);

      // Callback
      onLoginSuccess?.();
    } catch (err) {
      console.error("Wallet connection and login failed:", err);
    } finally {
      setIsConnectingWallet(false);
      setIsSwitchingNetwork(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const baseStyles =
    "relative inline-flex items-center gap-2 rounded-lg font-bold text-sm transition-all";

  const variantStyles = {
    default: "bg-[#ff6600] hover:bg-[#ff6600]/90 text-white px-4 py-2",
    outline: "border border-[#ff6600] bg-transparent hover:bg-[#ff6600]/10 text-[#ff6600] px-4 py-2",
    ghost: "bg-transparent hover:bg-gray-100/10 text-gray-400 hover:text-white px-3 py-2",
  };

  // Not authenticated - show connect wallet button
  if (!isAuthenticated) {
    return (
      <div className="relative">
        {error && (
          <div className="absolute bottom-full mb-2 bg-red-900/30 border border-red-600 rounded-lg p-2 whitespace-nowrap text-xs text-red-300 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </div>
        )}
        <button
          onClick={handleConnectAndLogin}
          disabled={isConnectingWallet || loading}
          className={`${baseStyles} ${variantStyles[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Wallet className="w-4 h-4" />
          <span>
            {isSwitchingNetwork
              ? "Switching to Ethereum..."
              : isConnectingWallet
              ? "Connecting..."
              : loading
              ? "Signing..."
              : compact
              ? "Connect"
              : "Connect Wallet"}
          </span>
        </button>
      </div>
    );
  }

  // Authenticated - show user info and logout
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${baseStyles} ${variantStyles[variant]}`}
      >
        <Wallet className="w-4 h-4" />
        <span>
          {compact
            ? user?.publicKey?.slice(-4)
            : showAddress
              ? `${user?.publicKey?.slice(0, 6)}...${user?.publicKey?.slice(-4)}`
              : "Wallet"}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-zinc-700">
            <p className="text-xs text-gray-400">Connected Account</p>
            <p className="text-sm text-white font-mono break-all">{user?.publicKey}</p>
          </div>

          {user?.userInfo && (
            <div className="p-3 border-b border-zinc-700">
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-sm text-white">{user.userInfo.full_name || "Not set"}</p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
