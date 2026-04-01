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
