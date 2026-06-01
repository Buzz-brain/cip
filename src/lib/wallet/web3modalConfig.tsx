import React, { ReactNode } from 'react';
import { AppKitProvider } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { arbitrum } from '@reown/appkit/networks';

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

// Export pre-configured AppKitProvider wrapper component
export function AppKitProviderComponent({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <AppKitProvider
      adapters={[ethersAdapter]}
      networks={[arbitrum]}
      defaultNetwork={arbitrum}
      projectId={projectId || ''}
      metadata={metadata}
      features={{
        analytics: true,
        onramp: false,
        swaps: false,
        email: false,
        socials: false,
      }}
      enableEIP6963={true}
      enableCoinbase={false}
    >
      {children}
    </AppKitProvider>
  );
}

export function initWeb3Modal() {
}
