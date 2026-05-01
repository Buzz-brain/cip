// src/components/ConnectWalletButton.tsx
// Multi-wallet connection component using Web3Modal v2

import React, { useState, useEffect } from "react";
import { Wallet, LogOut, AlertCircle } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { normalizeWalletAddress } from "../lib/utils";
import { getDashboardRoute } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { verifyMessage, BrowserProvider } from "ethers";
import { ensureArbitrumSepolia } from "../lib/wallet/walletUtils";
import { toast } from "react-toastify";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";

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
  const { user, isAuthenticated, loading, error, getNonce, loginWithWallet, logout, clearError, fetchUserInfo } = useAuth();
  const navigate = useNavigate();
  const { open: openWeb3Modal } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle connection and login
  const handleConnectAndLogin = async () => {
    try {
      console.log('[ConnectWalletButton] handleConnectAndLogin called');
      clearError();
      setIsConnectingWallet(true);

      if (!address) {
        toast.error("No wallet address found");
        console.error('[ConnectWalletButton] No wallet address found');
        return;
      }

      if (!walletProvider) {
        toast.error("Wallet provider not available");
        console.error('[ConnectWalletButton] Wallet provider not available');
        return;
      }

      // Detect which wallet provider is being used
      const walletName = (walletProvider as any)?.provider?.isMetaMask
        ? 'MetaMask'
        : (walletProvider as any)?.provider?.isTrustWallet
        ? 'Trust Wallet'
        : (walletProvider as any)?.provider?.isCoinbaseWallet
        ? 'Coinbase Wallet'
        : (walletProvider as any)?.isMetaMask
        ? 'MetaMask'
        : (walletProvider as any)?.isTrustWallet
        ? 'Trust Wallet'
        : (walletProvider as any)?.isCoinbaseWallet
        ? 'Coinbase Wallet'
        : 'Unknown Wallet';

      console.log('[ConnectWalletButton] 🎯 WALLET SELECTED:', walletName);
      console.log('[ConnectWalletButton] Provider details:', {
        hasIsMetaMask: !!(walletProvider as any)?.isMetaMask,
        hasIsTrustWallet: !!(walletProvider as any)?.isTrustWallet,
        hasIsCoinbaseWallet: !!(walletProvider as any)?.isCoinbaseWallet,
        providerName: (walletProvider as any)?.name,
      });

      // Ensure wallet is on Arbitrum Sepolia before proceeding
      try {
        await ensureArbitrumSepolia(walletProvider);
      } catch (switchErr) {
        toast.error('Please approve network switch to Arbitrum Sepolia in your wallet.');
        setIsConnectingWallet(false);
        return;
      }

      const account = normalizeWalletAddress(address);
      console.log('[ConnectWalletButton] Connected account:', account);

      // Step 1: Get nonce for this account
      const nonce = await getNonce(account);
      console.log('[ConnectWalletButton] Nonce to sign:', nonce);

      // Step 2: Sign the message using Web3Modal provider
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      console.log('[ConnectWalletButton] Signer obtained from wallet:', walletName);
      
      let signature = await signer.signMessage(nonce);
      console.log('[ConnectWalletButton] ✅ Signature received from:', walletName);
      console.log('[ConnectWalletButton] Signature:', signature);

      // Step 3: Remove 0x prefix if present
      if (signature.startsWith('0x')) {
        signature = signature.slice(2);
        console.log('[ConnectWalletButton] Stripped 0x from signature');
      }

      // Step 4: Client-side recovery check
      try {
        const recoveredAddress = verifyMessage(nonce, '0x' + signature);
        console.log('[ConnectWalletButton] ✅ Signature verified - Recovered address:', recoveredAddress);

        if (recoveredAddress.toLowerCase() !== account.toLowerCase()) {
          console.warn('[ConnectWalletButton] WARNING: Recovered address does not match account!');
          throw new Error('Signature verification failed');
        }
      } catch (recoveryError) {
        console.error('[ConnectWalletButton] Signature recovery failed:', recoveryError);
        throw new Error('Failed to verify signature');
      }

      // Step 5: Send signature to backend for authentication
      const loginResponse = await loginWithWallet(account, '0x' + signature, nonce);
      console.log('[ConnectWalletButton] Login response:', loginResponse);

      // Step 6: Fetch user info to update context
      if (loginResponse?.token) {
        await fetchUserInfo();
        const dashboardRoute = getDashboardRoute(user?.userInfo?.role);
        console.log('[ConnectWalletButton] Navigating to dashboard:', dashboardRoute);
        navigate(dashboardRoute);
        toast.success('Successfully connected and logged in!');
        if (onLoginSuccess) onLoginSuccess();
      } else {
        console.warn('[ConnectWalletButton] Login response did not contain token');
      }
    } catch (err) {
      console.error('[ConnectWalletButton] Connection/login error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      toast.error(errorMessage);
    } finally {
      setIsConnectingWallet(false);
      console.log('[ConnectWalletButton] Connection process finished');
    }
  };

  // Auto-login when wallet connects (includes WalletConnect)
  useEffect(() => {
    const attemptAutoLogin = async () => {
      if (!isConnected) {
        console.log('[ConnectWalletButton] ❌ Wallet is not connected or disconnected');
        return;
      }

      if (!address) {
        console.log('[ConnectWalletButton] ❌ Connected but no address available yet');
        return;
      }

      if (!walletProvider) {
        console.log('[ConnectWalletButton] ⏳ Waiting for wallet provider to be ready');
        return;
      }

      if (isAuthenticated || isConnectingWallet) {
        console.log('[ConnectWalletButton] Skipping auto-login: already authenticated or in-progress');
        return;
      }

      console.log('[ConnectWalletButton] 🔌 Wallet detected as connected:', address);
      console.log('[ConnectWalletButton] Provider available, ensuring network and triggering auto-login');

      try {
        // Ensure wallet is on Arbitrum Sepolia (prompts wallet to switch/add if needed)
        await ensureArbitrumSepolia(walletProvider);
      } catch (err) {
        console.warn('[ConnectWalletButton] User declined or failed network switch:', err);
        toast.error('Please switch your wallet to Arbitrum Sepolia to continue.');
        return;
      }

      // Proceed with the existing connect-and-login flow
      handleConnectAndLogin();
    };

    attemptAutoLogin();
  }, [isConnected, address, walletProvider, isAuthenticated, isConnectingWallet]);

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
        console.log('[ConnectWalletButton] 🔓 Opening Web3Modal to select wallet...');
        openWeb3Modal();
      }}
      disabled={loading || isConnectingWallet}
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
        {loading || isConnectingWallet ? "Connecting..." : "Connect Wallet"}
      </span>
    </button>
  );
};
