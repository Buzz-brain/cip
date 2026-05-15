import { ethers } from 'ethers';
import { IExecDataProtectorCore } from '@iexec/dataprotector';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const ARBITRUM_SEPOLIA_RPC = 'https://sepolia-rollup.arbitrum.io/rpc';
const ARBITRUM_SEPOLIA_CHAIN_ID = 421614;

// const appAddress = "0xBd53166C8873969536d41E64DC9E69EC468baFf1";
const appAddress = "0x720Adc75c3f5941e772aec1818Dc288484100bf6";

async function grantAccess(protectedDataAddress, authorizedUserAddress) {
  // Check if private key is provided
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.error('Please set PRIVATE_KEY environment variable');
    process.exit(1);
  }

  // Setup provider and signer
  const provider = new ethers.JsonRpcProvider(ARBITRUM_SEPOLIA_RPC);
  const signer = new ethers.Wallet(privateKey, provider);

  // Check if on correct network
  const network = await provider.getNetwork();
  if (network.chainId !== BigInt(ARBITRUM_SEPOLIA_CHAIN_ID)) {
    console.error('Not connected to Arbitrum Sepolia');
    process.exit(1);
  }

  // Initialize DataProtector
  const dataProtector = new IExecDataProtectorCore(signer);
  const authorizedUser = authorizedUserAddress || (await signer.getAddress());

  try {
    const result = await dataProtector.grantAccess({
      protectedData: protectedDataAddress,
      authorizedApp: appAddress,
      authorizedUser,
      numberOfAccess: 1000,
    });

    console.log('Grant Access Result:', result);
  } catch (err) {
    console.error("Grant access failed:", err);
  }
}

// Get protectedData address and optional authorized user address from command line args
const [protectedDataAddress, authorizedUserAddress] = process.argv.slice(2);
if (!protectedDataAddress) {
  console.error('Usage: node scripts/grantAccess.js <protectedDataAddress> [authorizedUserAddress]');
  process.exit(1);
}

grantAccess(protectedDataAddress, authorizedUserAddress).catch(console.error);