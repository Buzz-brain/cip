import 'dotenv/config';
import { JsonRpcProvider, Contract, formatEther } from 'ethers';

const RPC_URL = process.env.RPC_URL || process.env.VITE_RPC_URL || 'https://cloudflare-eth.com';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || process.env.VITE_CONTRACT_ADDRESS || '0x6d26f1De09Ed69Cffe82cEf0a77D42C3A3CcD734';

const CONTRACT_ABI = [
  'function nextPlanId() view returns (uint256)',
  // Adjust signature names/types if your contract differs
  'function getPlan(uint256) view returns (address owner, uint256 balance, bool exists)'
];

async function main() {
  console.log('Using RPC URL:', RPC_URL);
  console.log('Using contract address:', CONTRACT_ADDRESS);

  const provider = new JsonRpcProvider(RPC_URL);
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const nextId = await contract.nextPlanId();
    console.log('Total plans created:', nextId.toString());
  } catch (e) {
    console.error('Failed to read nextPlanId:', e?.message || e);
  }

  const planId = process.argv[2] ? Number(process.argv[2]) : 22;
  try {
    const plan = await contract.getPlan(planId);
    // plan may be an array or an object depending on ABI
    const owner = plan.owner ?? plan[0];
    const balanceRaw = plan.balance ?? plan[1];
    const exists = plan.exists ?? plan[2];
    console.log(`Plan ${planId}:`, {
      owner,
      balance: typeof balanceRaw !== 'undefined' ? formatEther(balanceRaw) : null,
      exists: typeof exists !== 'undefined' ? !!exists : null,
    });
  } catch (e) {
    console.error(`Failed to read plan ${planId}:`, e?.message || e);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
