// src/components/ConnectWalletButton.tsx
// Reusable wallet connection and login component for navbars and pages

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

import React, { useState } from "react";
import { Wallet, LogOut, AlertCircle } from "lucide-react";
import { useAuth } from "../context/useAuth";
import * as walletUtils from "../lib/wallet/walletUtils";
import { normalizeWalletAddress } from "../lib/utils";
import { verifyMessage } from "ethers";
import { toast } from "react-toastify";

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

      // Step 2: Prompt wallet connection and always use the returned account
      let account = await walletUtils.requestWalletConnection();
      // Normalize wallet address to lowercase for consistency
      account = normalizeWalletAddress(account);
      console.log("[Wallet] Selected account from wallet:", account);

      // Verify this is actually the active account in MetaMask
      if (window.ethereum && window.ethereum.selectedAddress) {
        const selectedAddress = window.ethereum.selectedAddress;
        console.log("[Wallet] MetaMask selectedAddress:", selectedAddress);
        if (selectedAddress.toLowerCase() !== account.toLowerCase()) {
          console.warn("[Wallet] WARNING: MetaMask selectedAddress differs from requested account!");
          console.warn("[Wallet] Using requested account:", account);
          console.warn("[Wallet] MetaMask selectedAddress:", selectedAddress);
        }
      }

      // Additional check: ensure ethers can get the correct signer
      try {
        const ethers = await import("ethers");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(account);
        const signerAddress = await signer.getAddress();
        console.log("[Wallet] Ethers signer address:", signerAddress);
        if (signerAddress.toLowerCase() !== account.toLowerCase()) {
          console.warn("[Wallet] WARNING: Ethers signer address differs from requested account!");
        }
      } catch (ethersCheckError) {
        console.warn("[Wallet] Could not verify ethers signer:", ethersCheckError);
      }

      // Step 3: Get nonce for this account
      const nonce = await getNonce(account);
      console.log("[Wallet] Nonce to sign:", nonce);

      // Step 4: Sign the raw nonce (no formatting)
      let signature = await walletUtils.signMessage(nonce, account);
      console.log("[Wallet] Signature from personal_sign:", signature);

      // Step 5: Remove 0x prefix from signature if present (backend could expect without prefix)
      signature = signature.startsWith("0x") ? signature.slice(2) : signature;

      // Client-side recovery check: try to recover address from signature before sending
      try {
        let recoveredAddress: string | null = null;

        // Use ethers verifyMessage for reliable recovery
        try {
          recoveredAddress = verifyMessage(nonce, '0x' + signature);
          console.log('[Wallet] Using ethers verifyMessage recovery');
        } catch (e) {
          console.warn('[Wallet] ethers verifyMessage failed:', e);
        }

        // Fallback: try provider-level recovery if available
        if (!recoveredAddress && window.ethereum && typeof window.ethereum.request === 'function') {
          try {
            // Some providers implement personal_ecRecover
            // params: [message, signature]
            // signature must include 0x prefix
            const rec = await window.ethereum.request({
              method: 'personal_ecRecover',
              params: [nonce, '0x' + signature],
            });
            if (rec) {
              recoveredAddress = rec;
              console.log('[Wallet] Using provider personal_ecRecover');
            }
          } catch (err) {
            console.warn('[Wallet] Provider recovery failed:', err);
          }
        }

        console.log('[Wallet] Recovered address from signature:', recoveredAddress);
        if (recoveredAddress && recoveredAddress.toLowerCase() !== account.toLowerCase()) {
          console.warn('[Wallet] CRITICAL: Recovered address does not match connected account!');
          console.warn('[Wallet] Expected account:', account);
          console.warn('[Wallet] Recovered address:', recoveredAddress);
          console.warn('[Wallet] Nonce used:', nonce);
          console.warn('[Wallet] Signature used for recovery:', '0x' + signature);

          // Try manual verification with different approaches
          try {
            // Check if the signature is valid for the expected account
            const expectedSigner = verifyMessage(nonce, '0x' + signature);
            console.warn('[Wallet] Manual verification result:', expectedSigner);

            // If they don't match, this indicates the signature is from a different account
            if (expectedSigner.toLowerCase() !== account.toLowerCase()) {
              console.error('[Wallet] SIGNATURE VERIFICATION FAILED: Signature is not from the expected account!');
              console.error('[Wallet] This usually means:');
              console.error('[Wallet] 1. MetaMask signed with a different account');
              console.error('[Wallet] 2. The user switched accounts during signing');
              console.error('[Wallet] 3. There\'s a bug in account selection');

              // Stop the process and show error to user
              throw new Error('Signature verification failed. Please ensure you\'re using the correct MetaMask account and try again.');
            }
          } catch (manualErr) {
            console.error('[Wallet] Manual verification failed:', manualErr);
            throw new Error('Unable to verify signature. Please try again.');
          }
        } else if (recoveredAddress) {
          console.log('[Wallet] ✓ Signature verification successful');
        }
      } catch (err) {
        console.warn('[Wallet] Client-side signature recovery failed:', err);
      }

      // Step 6: Login with raw nonce as message
      await loginWithWallet(account, signature, nonce);

      // Show success toast
      toast.success("Wallet connected successfully!");

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
