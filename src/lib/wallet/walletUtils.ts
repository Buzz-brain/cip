// src/lib/wallet/walletUtils.ts
// Utility functions for wallet operations (assuming MetaMask or similar Web3 wallet)

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

import { BrowserProvider } from "ethers";

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function getPublicKey(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("Wallet not detected. Please install a Web3 wallet extension.");
  }
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (!accounts || accounts.length === 0) {
    throw new Error("No wallet account found. Please connect your wallet.");
  }
  return accounts[0];
}

export async function requestWalletConnection(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("Wallet not detected. Please install a Web3 wallet extension.");
  }
  // Always prompt user to select account
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  if (!accounts || accounts.length === 0) {
    throw new Error("Failed to connect wallet.");
  }
  // Log the selected account for debugging
  console.log("[WalletUtils] eth_requestAccounts returned:", accounts);
  return accounts[0];
}

export async function signMessage(message: string, account: string): Promise<string> {
  if (!window.ethereum) {
    throw new Error("Wallet not detected.");
  }

  try {
    // Use ethers.js BrowserProvider for proper account handling
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(account); // Explicitly get signer for the account

    console.log("[WalletUtils] Using ethers signer for account:", await signer.getAddress());
    console.log("[WalletUtils] Signing message:", message);

    // Use signMessage which handles the Ethereum prefix automatically
    const signature = await signer.signMessage(message);

    console.log("[WalletUtils] Signature result:", signature);
    return signature;
  } catch (ethersError) {
    console.warn("[WalletUtils] ethers signing failed, falling back to direct RPC:", ethersError);

    // Fallback to direct RPC call
    console.log("[WalletUtils] Signing message:", message, "with account:", account);

    // Double-check the currently selected account
    const currentAccounts = await window.ethereum.request({ method: "eth_accounts" });
    console.log("[WalletUtils] Current accounts in wallet:", currentAccounts);

    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, account],
    });
    console.log("[WalletUtils] Signature result:", signature);
    return signature;
  }
}

export async function getCurrentChainId(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("Wallet not detected.");
  }
  return await window.ethereum.request({ method: "eth_chainId" });
}

export async function switchToEthereumMainnet(): Promise<void> {
  if (!window.ethereum) {
    throw new Error("Wallet not detected.");
  }

  const ETHEREUM_MAINNET_CHAIN_ID = "0x1"; // Chain ID 1 in hex

  try {
    // Try to switch to Ethereum mainnet
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ETHEREUM_MAINNET_CHAIN_ID }],
    });
  } catch (switchError: any) {
    // If the network is not added to MetaMask, add it
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ETHEREUM_MAINNET_CHAIN_ID,
              chainName: "Ethereum Mainnet",
              nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://mainnet.infura.io/v3/"],
              blockExplorerUrls: ["https://etherscan.io/"],
            },
          ],
        });
      } catch (addError) {
        throw new Error("Failed to add Ethereum network to wallet.");
      }
    } else {
      throw new Error("Failed to switch to Ethereum network.");
    }
  }
}

export async function ensureEthereumNetwork(): Promise<void> {
  const currentChainId = await getCurrentChainId();
  const ETHEREUM_MAINNET_CHAIN_ID = "0x1";

  if (currentChainId !== ETHEREUM_MAINNET_CHAIN_ID) {
    console.log("Switching to Ethereum mainnet...");
    await switchToEthereumMainnet();
    console.log("Successfully switched to Ethereum mainnet");
  }
}
