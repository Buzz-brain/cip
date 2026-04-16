import { IExecDataProtector } from "@iexec/dataprotector";
import { ethers } from "ethers";

// Environment validation function for runtime safety
function assertEnv(name: string, value?: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Validate and set environment variables at runtime
const IAPP_ADDRESS = assertEnv("VITE_IEXEC_APP_ADDRESS", import.meta.env.VITE_IEXEC_APP_ADDRESS);

export interface InheritancePlanData {
  owner_wallet: string;
  owner_name: string;
  crypto_asset: string;
  amount: string;
  beneficiary_1_name: string;
  beneficiary_1_relationship: string;
  beneficiary_1_wallet: string;
  beneficiary_1_allocation: string;
  beneficiary_count: string;
  plan_type: "timelock" | "inactivity" | "health_oracle";
  release_timestamp?: string;
  is_active?: string;
  inactivity_period_days?: string;
  health_oracle_address?: string;
  [key: string]: string | undefined;
}

let dataProtectorInstance: IExecDataProtector | null = null;
let dataProtectorChainId: number | null = null;

const DATA_PROTECTOR_NETWORK_CONFIG: Record<number, {
  subgraphUrl: string;
  dataprotectorContractAddress: string;
  ipfsGateway: string;
  ipfsNode: string;
  defaultWorkerpool: string;
}> = {
  134: {
    subgraphUrl: "https://thegraph.iex.ec/subgraphs/name/bellecour/dataprotector-v2",
    dataprotectorContractAddress: "0x3a4ab33f3d605e75b6d00a32a0fa55c3628f6a59",
    ipfsGateway: "https://ipfs-gateway.v8-bellecour.iex.ec",
    ipfsNode: "https://ipfs-upload.v8-bellecour.iex.ec",
    defaultWorkerpool: "prod-v8-bellecour.main.pools.iexec.eth",
  },
  42161: {
    subgraphUrl: "https://thegraph.arbitrum.iex.ec/api/subgraphs/id/Ep5zs5zVr4tDiVuQJepUu51e5eWYJpka624X4DMBxe3u",
    dataprotectorContractAddress: "0xF08f91F7646FDb95a4E24977b8Db91318252A667",
    ipfsGateway: "https://ipfs-gateway.arbitrum-mainnet.iex.ec",
    ipfsNode: "https://ipfs-upload.arbitrum-mainnet.iex.ec",
    defaultWorkerpool: "0x2C06263943180Cc024dAFfeEe15612DB6e5fD248",
  },
  421614: {
    subgraphUrl: "https://thegraph.arbitrum-sepolia-testnet.iex.ec/api/subgraphs/id/5YjRPLtjS6GH6bB4yY55Qg4HzwtRGQ8TaHtGf9UBWWd",
    dataprotectorContractAddress: "0x168eAF6C33a77E3caD9db892452f51a5D91df621",
    ipfsGateway: "https://ipfs-gateway.arbitrum-sepolia-testnet.iex.ec",
    ipfsNode: "https://ipfs-upload.arbitrum-sepolia-testnet.iex.ec",
    defaultWorkerpool: "0xB967057a21dc6A66A29721d96b8Aa7454B7c383F",
  },
};

function getWeb3Provider(provider?: any): any {
  if (provider) {
    return provider;
  }

  if (typeof window !== "undefined" && (window as any).ethereum) {
    return (window as any).ethereum;
  }

  throw new Error("Web3 provider not found. Please connect a wallet before using DataProtector.");
}

async function getChainId(provider: any): Promise<number> {
  const web3Provider = getWeb3Provider(provider);
  const chainIdHex = await web3Provider.request({ method: "eth_chainId" });
  return typeof chainIdHex === "string" ? parseInt(chainIdHex, 16) : Number(chainIdHex);
}

function getNetworkConfig(chainId: number) {
  const config = DATA_PROTECTOR_NETWORK_CONFIG[chainId];
  if (!config) {
    throw new Error(
      `Unsupported chainId ${chainId}. Please connect MetaMask to Bellecour (134), Arbitrum Mainnet (42161), or Arbitrum Sepolia (421614). Mainnet (chainId 1) is not currently configured by this SDK integration.`,
    );
  }
  return config;
}

export async function initDataProtector(provider?: any): Promise<IExecDataProtector> {
  // Runtime validation: ensure critical config is available
  if (!IAPP_ADDRESS) {
    throw new Error("Missing iExec configuration: VITE_IEXEC_APP_ADDRESS must be set");
  }

  // Validate address format
  if (!ethers.isAddress(IAPP_ADDRESS)) {
    throw new Error("Invalid iExec app address format: VITE_IEXEC_APP_ADDRESS must be a valid Ethereum address");
  }

  // Validate that address is not zero address
  if (IAPP_ADDRESS === ethers.ZeroAddress) {
    throw new Error("Invalid iExec app address: VITE_IEXEC_APP_ADDRESS cannot be the zero address");
  }

  const web3Provider = getWeb3Provider(provider);
  const chainId = await getChainId(web3Provider);

  // Explicit network guard: enforce supported networks
  if (![134, 42161, 421614].includes(chainId)) {
    throw new Error(
      `Unsupported network for iExec DataProtector. Chain ID ${chainId} is not supported. ` +
      `Please connect to: Bellecour (134), Arbitrum Mainnet (42161), or Arbitrum Sepolia (421614).`
    );
  }

  if (dataProtectorInstance && dataProtectorChainId === chainId) {
    return dataProtectorInstance;
  }

  const networkConfig = getNetworkConfig(chainId);

  dataProtectorInstance = new IExecDataProtector(web3Provider, {
    subgraphUrl: networkConfig.subgraphUrl,
    dataprotectorContractAddress: networkConfig.dataprotectorContractAddress,
    ipfsGateway: networkConfig.ipfsGateway,
    ipfsNode: networkConfig.ipfsNode,
    allowExperimentalNetworks: chainId === 421614,
  });
  dataProtectorChainId = chainId;
  return dataProtectorInstance;
}

function sanitizePlanData(plan: InheritancePlanData) {
  return Object.fromEntries(
    Object.entries(plan).filter(([, value]) => value !== undefined && value !== ""),
  ) as Record<string, string>;
}

export async function protectInheritancePlan(
  plan: InheritancePlanData,
  name: string,
  _provider?: any,
) {
  const core = (await initDataProtector(_provider)).core;
  const sanitized = sanitizePlanData(plan);
  // Debug: log payload
  console.log('[DataProtector] Payload to protect:', sanitized);
  console.log('[DataProtector] Name:', name);
  try {
    const result = await core.protectData({
      data: sanitized,
      name,
    });
    // Debug: log result
    console.log('[DataProtector] protectData result:', result);
    return result;
  } catch (err) {
    // Debug: log error
    console.error('[DataProtector] protectData error:', err);
    throw err;
  }
}

export async function grantIAppAccess(
  protectedDataAddress: string,
  authorizedUser: string,
  numberOfAccess = 1000,
  _provider?: any,
) {
  const core = (await initDataProtector(_provider)).core;
  const web3Provider = getWeb3Provider(_provider);
  const browserProvider = new ethers.BrowserProvider(web3Provider);
  const signer = await browserProvider.getSigner();
  const signerAddress = await signer.getAddress();

  // Validation
  if (!ethers.isAddress(protectedDataAddress)) {
    throw new Error("Invalid protectedData address");
  }
  if (!authorizedUser) {
    throw new Error("Authorized user not provided");
  }
  if (!ethers.isAddress(authorizedUser)) {
    throw new Error("Invalid owner wallet address");
  }
  if (signerAddress.toLowerCase() !== authorizedUser.toLowerCase()) {
    throw new Error("Connected wallet does not match the owner wallet. Please switch to the owner wallet before granting access.");
  }
  if (!ethers.isAddress(IAPP_ADDRESS)) {
    throw new Error("Invalid iApp address");
  }
  // Defensive: ensure we never grant public access
  if (authorizedUser.toLowerCase() === ethers.ZeroAddress.toLowerCase()) {
    throw new Error("Refusing to grant public access - owner wallet cannot be zero address");
  }

  const params = {
    protectedData: protectedDataAddress,
    authorizedApp: IAPP_ADDRESS,
    authorizedUser,
    numberOfAccess,
  };
  console.log('[DataProtector] grantAccess params:', params);
  return core.grantAccess(params);
}

export async function revokeIAppAccess(
  protectedDataAddress: string,
  _provider?: any,
) {
  // TODO: Complete revoke implementation once SDK provides revokeOneAccess
  // Current required steps:
  // 1. fetchGrantedAccess to get specific access grant ID
  // 2. Call dataProtector.revokeOneAccess with grant ID
  // This stub prevents accidental use of incomplete revoke logic
  console.log('[DataProtector] Revoke access not yet implemented for:', protectedDataAddress);
  throw new Error("Revoke functionality is not yet implemented. Please contact backend team.");
}

export async function getProtectedDataDetails(
  protectedDataAddress: string,
  _provider?: any,
) {
  const core = (await initDataProtector(_provider)).core;
  return core.getProtectedData({
    protectedDataAddress,
  });
}

export async function getGrantedAccess(
  protectedDataAddress: string,
  _provider?: any,
) {
  const core = (await initDataProtector(_provider)).core;
  // Type assertion for SDK version compatibility: handles both 'protectedData' and 'protectedDataAddress' parameter names
  return core.getGrantedAccess({
    protectedData: protectedDataAddress,
  } as any);
}

export { IAPP_ADDRESS };