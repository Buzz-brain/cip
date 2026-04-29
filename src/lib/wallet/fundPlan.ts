import { parseEther, Contract, type Signer } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract";

export async function fundPlanOnChain(planId: number, amountEth: string, signer: Signer): Promise<string> {
  console.log('[fundPlanOnChain] start', { planId, amountEth, contractAddress: CONTRACT_ADDRESS });
  let signerAddress: string | null = null;
  try {
    signerAddress = await signer.getAddress();
  } catch (e) {
    console.warn('[fundPlanOnChain] could not get signer address', e);
  }
  console.log('[fundPlanOnChain] signer', signerAddress);
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const value = parseEther(String(amountEth));
  console.log('[fundPlanOnChain] calling contract.fundPlan', { planId, value: value.toString() });
  const tx = await contract.fundPlan(planId, { value });
  console.log('[fundPlanOnChain] tx sent', { hash: tx.hash });
  const receipt = await tx.wait();
  console.log('[fundPlanOnChain] tx mined', { transactionHash: receipt.transactionHash, status: receipt.status });
  return receipt.transactionHash;
}
