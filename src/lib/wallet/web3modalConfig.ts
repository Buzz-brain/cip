// src/lib/wallet/web3modalConfig.ts
// Web3Modal v2 configuration for multi-wallet support

import { createWeb3Modal, useWeb3Modal } from '@web3modal/ethers/react';

// Get your project ID from https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

const chains = [
  {
    chainId: 421614,
    name: 'Arbitrum Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.arbiscan.io',
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
  },
  {
    chainId: 42161,
    name: 'Arbitrum One',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
  },
];

export const initWeb3Modal = () => {
  console.log('[Web3Modal] Initializing Web3Modal configuration...');
  
  if (!projectId || projectId === 'YOUR_PROJECT_ID') {
    console.warn(
      '[Web3Modal] ⚠️ VITE_WALLETCONNECT_PROJECT_ID not set. Please set it in your .env file. Get one at https://cloud.walletconnect.com'
    );
  } else {
    console.log('[Web3Modal] ✅ Project ID configured:', projectId.substring(0, 10) + '...');
  }

  // cast to any because some options like multiInjectedProviderDiscovery
  // may not be present in the current type definitions
  createWeb3Modal(({
    ethersConfig: {
      metadata: {
        name: 'CIP - Crypto Inheritance Protocol',
        description: 'Secure your digital legacy with CIP',
        url: window.location.origin,
        icons: ['https://avatar.vercel.sh/cip'],
      },
    },
    chains,
    projectId,
    enableAnalytics: true,
    enableOnramp: false,
    enableSwaps: false,
    multiInjectedProviderDiscovery: true,
  } as any));
  
  console.log('[Web3Modal] ✅ Web3Modal initialized with EIP-6963 support (multiInjectedProviderDiscovery: true)');
};

export { useWeb3Modal };
