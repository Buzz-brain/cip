// src/lib/wallet/walletUtils.ts
// Utility functions for wallet operations with Web3Modal provider support

import { BrowserProvider } from "ethers";

// Helper function to detect wallet name
function detectWalletName(provider: any): string {
  if (!provider) return 'Unknown Wallet';
  
  return provider.isMetaMask
    ? 'MetaMask'
    : provider.isTrustWallet
    ? 'Trust Wallet'
    : provider.isCoinbaseWallet
    ? 'Coinbase Wallet'
    : 'Unknown Wallet';
}

// EIP-6963 provider discovery state
type DiscoveredWallet = {
  rdns?: string;
  provider: any;
  metadata?: any;
};

const discoveredWallets: DiscoveredWallet[] = [];
let discoveryInitialized = false;

export function initEip6963Discovery() {
  if (discoveryInitialized) return;
  discoveryInitialized = true;
  console.log('[WalletUtils] Initializing EIP-6963 discovery...');

  // Listen for wallets announcing themselves
  window.addEventListener('eip6963:announceProvider', (ev: Event) => {
    try {
      const custom = ev as CustomEvent;
      const detail = custom.detail || {};
      const provider = detail.provider || detail;
      const metadata = detail.metadata || {};

      // Try multiple places for identifiers
      let rdns = detail.rdns || metadata.rdns || provider?.rdns || metadata.name || provider?.name;

      // Fallback to provider flags when rdns is not present
      const isMetaMask = !!(provider?.isMetaMask || metadata?.isMetaMask);
      const isTrustWallet = !!(provider?.isTrustWallet || metadata?.isTrustWallet);
      const isCoinbaseWallet = !!(provider?.isCoinbaseWallet || metadata?.isCoinbaseWallet);

      if (!rdns) {
        if (isMetaMask) rdns = 'io.metamask';
        else if (isTrustWallet) rdns = 'com.trustwallet.app';
        else if (isCoinbaseWallet) rdns = 'com.coinbase.wallet';
      }

      console.log('[WalletUtils] eip6963:announceProvider received', {
        rdns,
        metadata,
        providerSummary: {
          isMetaMask,
          isTrustWallet,
          isCoinbaseWallet,
          providerName: provider?.name || metadata?.name,
        },
      });

      // Avoid duplicates by provider reference or rdns
      const exists = discoveredWallets.find((w) => w.provider === provider || (w.rdns && rdns && w.rdns === rdns));
      if (!exists) discoveredWallets.push({ rdns, provider, metadata });
    } catch (e) {
      console.warn('[WalletUtils] Failed to handle announceProvider', e);
    }
  });

  // Request providers to announce themselves
  try {
    window.dispatchEvent(new CustomEvent('eip6963:requestProvider'));
    console.log('[WalletUtils] eip6963:requestProvider dispatched');
  } catch (e) {
    console.warn('[WalletUtils] Failed to dispatch eip6963:requestProvider', e);
  }
}

export function getDiscoveredWallets() {
  return discoveredWallets;
}

export function getWalletProviderByRdns(rdns: string) {
  if (!rdns) return null;
  const key = rdns.toLowerCase();

  // Direct exact matches
  const foundExact = discoveredWallets.find((w) => {
    const candidates = [w.rdns, w.metadata?.rdns, w.metadata?.name, w.metadata?.id, w.provider?.name].filter(Boolean).map((s) => String(s).toLowerCase());
    return candidates.includes(key);
  });
  if (foundExact) return foundExact.provider;

  // Known rdns aliases mapping
  const aliasMap: Record<string, string[]> = {
    'io.metamask': ['metamask', 'io.metamask', 'meta', 'metamask browser'],
    'com.trustwallet.app': ['trust', 'trustwallet', 'com.trustwallet.app'],
    'com.coinbase.wallet': ['coinbase', 'coinbase wallet', 'com.coinbase.wallet'],
  };

  // If user passed a short name like 'metamask', try to match by contains
  for (const w of discoveredWallets) {
    const candidates = [w.rdns, w.metadata?.rdns, w.metadata?.name, w.metadata?.id, w.provider?.name]
      .filter(Boolean)
      .map((s) => String(s).toLowerCase());
    if (candidates.some((c) => c.includes(key))) return w.provider;

    // check flags on provider
    const p = w.provider;
    if (key.includes('meta') && (p?.isMetaMask || w.metadata?.isMetaMask)) return p;
    if (key.includes('trust') && (p?.isTrustWallet || w.metadata?.isTrustWallet)) return p;
    if (key.includes('coinbase') && (p?.isCoinbaseWallet || w.metadata?.isCoinbaseWallet)) return p;
  }

  // Try alias map
  for (const aliasKey of Object.keys(aliasMap)) {
    if (aliasKey === key || aliasMap[aliasKey].some((a) => a === key)) {
      const found = discoveredWallets.find((w) => {
        const candidates = [w.rdns, w.metadata?.rdns, w.metadata?.name, w.metadata?.id, w.provider?.name].filter(Boolean).map((s) => String(s).toLowerCase());
        return candidates.includes(aliasKey) || candidates.some((c) => aliasMap[aliasKey].includes(c));
      });
      if (found) return found.provider;
    }
  }

  return null;
}

export async function waitForWalletProvider(rdns: string, timeout = 3000) {
  // Ensure discovery is initiated
  initEip6963Discovery();
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const p = getWalletProviderByRdns(rdns);
    if (p) return p;
    // wait 100ms
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 100));
  }
  return null;
}

export async function getPublicKey(provider?: any): Promise<string> {
  // Use provided provider, fallback to window.ethereum
  const ethereumProvider = provider || window.ethereum;
  
  if (!ethereumProvider) {
    throw new Error("Wallet not detected. Please install a Web3 wallet extension.");
  }
  console.log('[WalletUtils] 🔍 Getting public key from wallet...');
  
  const accounts = await ethereumProvider.request({ method: "eth_accounts" });
  if (!accounts || accounts.length === 0) {
    throw new Error("No wallet account found. Please connect your wallet.");
  }
  
  console.log('[WalletUtils] ✅ Public key retrieved:', accounts[0]);
  return accounts[0];
}

export async function requestWalletConnection(provider?: any): Promise<string> {
  // Use provided provider, fallback to window.ethereum
  const ethereumProvider = provider || window.ethereum;
  
  if (!ethereumProvider) {
    throw new Error("Wallet not detected. Please install a Web3 wallet extension.");
  }
  
  // Detect which wallet provider is responding
  const walletName = detectWalletName(ethereumProvider);
  
  console.log('[WalletUtils] 🎯 WALLET PROVIDER DETECTED:', walletName);
  console.log('[WalletUtils] Provider flags:', {
    isMetaMask: ethereumProvider.isMetaMask,
    isTrustWallet: ethereumProvider.isTrustWallet,
    isCoinbaseWallet: ethereumProvider.isCoinbaseWallet,
    providerName: ethereumProvider.name,
    providerChainId: ethereumProvider.chainId,
  });
  
  // Always prompt user to select account
  const accounts = await ethereumProvider.request({ method: "eth_requestAccounts" });
  if (!accounts || accounts.length === 0) {
    throw new Error("Failed to connect wallet.");
  }
  // Log the selected account for debugging
  console.log("[WalletUtils] ✅ eth_requestAccounts returned:", accounts);
  console.log("[WalletUtils] Selected account from " + walletName + ":", accounts[0]);
  return accounts[0];
}

export async function signMessage(message: string, account: string, provider?: any): Promise<string> {
  // Use provided provider, fallback to window.ethereum
  const ethereumProvider = provider || window.ethereum;

  if (!ethereumProvider) {
    throw new Error("Wallet not detected.");
  }

  // Detect wallet provider
  const walletName = detectWalletName(ethereumProvider);

  console.log('[WalletUtils] 📝 Attempting to sign with:', walletName);
  console.log('[WalletUtils] Account to sign with:', account);

  // Use ethers BrowserProvider and signer.signMessage only. Backend must verify signatures.
  try {
    const browserProvider = new BrowserProvider(ethereumProvider);
    const signer = await browserProvider.getSigner(account);

    console.log('[WalletUtils] ✅ Using ethers signer for account:', await signer.getAddress());
    console.log('[WalletUtils] ✅ Signing message with ' + walletName + ':', message);

    const signature = await signer.signMessage(message);
    console.log('[WalletUtils] 🔁 Method: ethers.signer.signMessage ->', signature);

    // Return the raw signature. Backend should perform verification (EOA recovery or EIP-1271 for contract wallets).
    return signature;
  } catch (err) {
    console.error('[WalletUtils] ✖️ signer.signMessage failed:', err);
    throw new Error('Failed to sign message with wallet signer.');
  }
}

export async function getCurrentChainId(provider?: any): Promise<string> {
  // Use provided provider, fallback to window.ethereum
  const ethereumProvider = provider || window.ethereum;
  
  if (!ethereumProvider) {
    throw new Error("Wallet not detected.");
  }
  return await ethereumProvider.request({ method: "eth_chainId" });
}

export async function switchToEthereumMainnet(provider?: any): Promise<void> {
  // Use provided provider, fallback to window.ethereum
  const ethereumProvider = provider || window.ethereum;
  
  if (!ethereumProvider) {
    throw new Error("Wallet not detected.");
  }

  const ETHEREUM_MAINNET_CHAIN_ID = "0x1"; // Chain ID 1 in hex

  try {
    await ethereumProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ETHEREUM_MAINNET_CHAIN_ID }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await ethereumProvider.request({
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

const ARBITRUM_MAINNET_CHAIN_ID = "0xa4b1"; // 42161 in hex
const ARBITRUM_SEPOLIA_CHAIN_ID = "0x66eee"; // 421614 in hex

export async function switchToArbitrumMainnet(provider?: any): Promise<void> {
  // Use provided provider, fallback to window.ethereum
  const ethereumProvider = provider || window.ethereum;
  
  if (!ethereumProvider) {
    throw new Error("Wallet not detected.");
  }

  try {
    await ethereumProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ARBITRUM_MAINNET_CHAIN_ID }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await ethereumProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ARBITRUM_MAINNET_CHAIN_ID,
              chainName: "Arbitrum One",
              nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://arb1.arbitrum.io/rpc"],
              blockExplorerUrls: ["https://arbiscan.io/"],
            },
          ],
        });
      } catch (addError) {
        throw new Error("Failed to add Arbitrum Mainnet to wallet.");
      }
    } else {
      throw new Error("Failed to switch to Arbitrum Mainnet.");
    }
  }
}

export async function switchToArbitrumSepolia(provider?: any): Promise<void> {
  // Use provided provider, fallback to window.ethereum
  const ethereumProvider = provider || window.ethereum;
  
  if (!ethereumProvider) {
    throw new Error("Wallet not detected.");
  }

  try {
    await ethereumProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ARBITRUM_SEPOLIA_CHAIN_ID }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await ethereumProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ARBITRUM_SEPOLIA_CHAIN_ID,
              chainName: "Arbitrum Sepolia",
              nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
              blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
            },
          ],
        });
      } catch (addError) {
        throw new Error("Failed to add Arbitrum Sepolia to wallet.");
      }
    } else {
      throw new Error("Failed to switch to Arbitrum Sepolia.");
    }
  }
}

export async function ensureArbitrumMainnet(provider?: any): Promise<void> {
  const currentChainId = await getCurrentChainId(provider);

  if (currentChainId !== ARBITRUM_MAINNET_CHAIN_ID) {
    console.log("Switching to Arbitrum Mainnet...");
    await switchToArbitrumMainnet(provider);
    console.log("Successfully switched to Arbitrum Mainnet");
  }
}

export async function ensureArbitrumSepolia(provider?: any): Promise<void> {
  const currentChainId = await getCurrentChainId(provider);

  if (currentChainId !== ARBITRUM_SEPOLIA_CHAIN_ID) {
    console.log("Switching to Arbitrum Sepolia...");
    await switchToArbitrumSepolia(provider);
    console.log("Successfully switched to Arbitrum Sepolia");
  }
}

export async function ensureEthereumNetwork(provider?: any): Promise<void> {
  const currentChainId = await getCurrentChainId(provider);
  const ETHEREUM_MAINNET_CHAIN_ID = "0x1";

  if (currentChainId !== ETHEREUM_MAINNET_CHAIN_ID) {
    console.log("Switching to Ethereum mainnet...");
    await switchToEthereumMainnet(provider);
    console.log("Successfully switched to Ethereum mainnet");
  }
}
