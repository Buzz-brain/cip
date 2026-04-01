// src/lib/wallet/walletUtils.ts
// Utility functions for wallet operations (assuming MetaMask or similar Web3 wallet)

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
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  if (!accounts || accounts.length === 0) {
    throw new Error("Failed to connect wallet.");
  }
  return accounts[0];
}

export async function signMessage(message: string, account: string): Promise<string> {
  if (!window.ethereum) {
    throw new Error("Wallet not detected.");
  }
  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [message, account],
  });
  return signature;
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
