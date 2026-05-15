import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { arbitrumSepolia, arbitrum } from '@reown/appkit/networks';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  // [sanitized] console.warn removed
}

const metadata = {
  name: 'CIP - Crypto Inheritance Protocol',
  description: 'Secure your digital legacy with CIP',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://xcip.name.ng',
  icons: ['https://avatar.vercel.sh/cip'],
};

const ethersAdapter = new EthersAdapter();

// Initialize AppKit — just importing this file initializes AppKit globally
export const appKit = createAppKit({
  adapters: [ethersAdapter],
  networks: [arbitrumSepolia, arbitrum],
  defaultNetwork: arbitrumSepolia,
  projectId: projectId || '',
  metadata,
  features: {
    analytics: true,
    onramp: false,
    swaps: false,
    email: false,
    socials: false,
  },
  enableEIP6963: true,
  enableCoinbase: false,
});

export function initWeb3Modal() {
}
