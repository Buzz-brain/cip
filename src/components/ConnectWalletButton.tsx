// src/components/ConnectWalletButton.tsx
// Multi-wallet connection component using Web3Modal v2

import React, { useState } from "react";
import { Wallet, LogOut, AlertCircle } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";
import { useAppKit } from "@reown/appkit/react";

interface ConnectWalletButtonProps {
  variant?: "default" | "outline" | "ghost";
  showAddress?: boolean;
  compact?: boolean;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  variant = "default",
  showAddress = true,
  compact = false,
}) => {
  const { user, isAuthenticated, loading, error, logout } = useAuth();
  const { open } = useAppKit();

  const [showDropdown, setShowDropdown] = useState(false);



  const handleLogout = async () => {
    try {
      console.log('[ConnectWalletButton] Logging out...');
      await logout();
      setShowDropdown(false);
      toast.success('Logged out successfully');
      console.log('[ConnectWalletButton] Logout successful');
    } catch (err) {
      console.error('[ConnectWalletButton] Logout error:', err);
      toast.error('Failed to logout');
    }
  };

  // Render based on authentication state
  if (isAuthenticated) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            variant === "ghost"
              ? "hover:bg-gray-700"
              : "bg-orange-600 hover:bg-orange-700 text-white"
          }`}
        >
          <Wallet className="w-4 h-4" />
          {showAddress && !compact && (
            <span className="text-sm">
              {user?.publicKey
                ? `${user.publicKey.substring(0, 6)}...${user.publicKey.substring(
                    user.publicKey.length - 4
                  )}`
                : "Connected"}
            </span>
          )}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-[#2a2420] border border-[#3a3430] rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-[#3a3430]">
              <p className="text-xs text-[#8b7664]">Connected Account</p>
              <p className="text-sm text-white font-mono break-all">{user?.publicKey}</p>
            </div>

            {user?.userInfo && (
              <div className="p-3 border-b border-[#3a3430]">
                <p className="text-xs text-[#8b7664]">Name</p>
                <p className="text-sm text-white">{user.userInfo.full_name || "Not set"}</p>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 hover:bg-[#3a3430] flex items-center gap-2 text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        console.log('[ConnectWalletButton] 🔓 Opening AppKit wallet selector...');
        open?.({ view: 'Connect' });
      }}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        variant === "outline"
          ? "border border-orange-600 text-orange-600 hover:bg-orange-600/10"
          : variant === "ghost"
          ? "text-gray-300 hover:text-white hover:bg-gray-700"
          : "bg-orange-600 hover:bg-orange-700 text-white"
      }`}
    >
      {error && <AlertCircle className="w-4 h-4" />}
      <Wallet className="w-4 h-4" />
      <span className={compact ? "hidden" : ""}>
        {loading ? "Connecting..." : "Connect Wallet"}
      </span>
    </button>
  );
};
