declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.css';
declare module '*.mp4';

declare module 'react-toastify/dist/ReactToastify.css';

// Vite environment variables
interface ImportMetaEnv {
  readonly VITE_IEXEC_APP_ADDRESS: string;
  readonly VITE_BACKEND_WALLET: string;
  readonly VITE_BACKEND_API_URL: string;
  readonly VITE_XCIP_HEADER: string;
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Web3 wallet declarations
interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
  isMetaMask?: boolean;
  chainId?: string;
  networkVersion?: string;
  selectedAddress?: string;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
