import { parseEther, Contract, toUtf8String, type Signer } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract";

export async function fundPlanOnChain(
  planId: number,
  amountEth: string,
  signer: Signer,
): Promise<string> {
  console.log("[fundPlanOnChain] start", {
    planId,
    amountEth,
    contractAddress: CONTRACT_ADDRESS,
  });

  let signerAddress: string | null = null;
  try {
    signerAddress = await signer.getAddress();
  } catch (e) {
    console.warn("[fundPlanOnChain] could not get signer address", e);
  }
  console.log("[fundPlanOnChain] signer", signerAddress);

  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const value = parseEther(String(amountEth));

  // ── GAS ESTIMATION ────────────────────────────────────────────────────────
  let gasLimit: bigint;
  try {
    const estimated = await contract.fundPlan.estimateGas(planId, { value });
    gasLimit = (estimated * 130n) / 100n; // +30% buffer
    console.log(
      "[fundPlanOnChain] ✅ estimateGas succeeded",
      "\n  raw estimate :",
      estimated.toString(),
      "\n  with +30% buffer:",
      gasLimit.toString(),
      "\n  → MetaMask will NOT ask you to set gas manually",
    );
  } catch (e) {
    gasLimit = 300_000n;
    console.warn(
      "[fundPlanOnChain] ⚠️ estimateGas failed — using fallback gas limit",
      "\n  fallback gasLimit:",
      gasLimit.toString(),
      "\n  reason:",
      e,
    );
  }

  // ── PRE-FLIGHT LOG (proof the gasLimit is set BEFORE MetaMask opens) ──────
  console.log(
    "[fundPlanOnChain] 📤 sending tx with params:",
    "\n  planId    :",
    planId,
    "\n  value     :",
    value.toString(),
    "wei  (",
    amountEth,
    "ETH )",
    "\n  gasLimit  :",
    gasLimit.toString(),
    "\n  ⬆️ gasLimit is set in CODE — MetaMask will use this value automatically",
  );

  // ── FETCH FRESH FEE DATA AND ADD BUFFER ────────────────────────────────────
  const provider = signer.provider;
  let feeOverrides: { maxFeePerGas?: bigint; maxPriorityFeePerGas?: bigint } = {};

  try {
    if (provider) {
      const feeData = await provider.getFeeData();
      if (feeData.maxFeePerGas) {
        // +50% buffer over current maxFeePerGas to absorb block-to-block baseFee fluctuation
        let maxFee = (feeData.maxFeePerGas * 150n) / 100n;
        // Ensure minimum floor of 30 million wei to prevent rejection on Arbitrum Sepolia
        if (maxFee < 30000000n) {
          maxFee = 30000000n;
        }
        feeOverrides.maxFeePerGas = maxFee;
      }
      if (feeData.maxPriorityFeePerGas) {
        feeOverrides.maxPriorityFeePerGas = (feeData.maxPriorityFeePerGas * 150n) / 100n;
      }
      console.log('[fundPlanOnChain] fee data fetched', {
        maxFeePerGas: feeOverrides.maxFeePerGas?.toString(),
        maxPriorityFeePerGas: feeOverrides.maxPriorityFeePerGas?.toString(),
      });
    }
  } catch (feeErr) {
    console.warn('[fundPlanOnChain] could not fetch fee data, letting ethers decide', feeErr);
  }

  try {
    const tx = await contract.fundPlan(planId, { value, gasLimit, ...feeOverrides });

    console.log(
      "[fundPlanOnChain] ✅ tx sent — MetaMask signed without manual gas override",
      { hash: tx.hash },
    );

    const receipt = await tx.wait();
    console.log(
      "[fundPlanOnChain] ✅ tx mined",
      "\n  hash  :",
      tx.hash,
      "\n  status:",
      receipt?.status === 1 ? "SUCCESS" : "FAILED",
      "\n  gasUsed:",
      receipt?.gasUsed?.toString(),
    );

    return tx.hash;
  } catch (rawErr: any) {
    console.error('[fundPlanOnChain] Transaction error', rawErr);

    // Helper to extract revert reason from returned data
    const extractRevertReason = (data?: string): string | null => {
      try {
        if (!data) return null;
        // standard solidity revert encoding: 0x08c379a0 + offset + strLen + string
        if (data.startsWith('0x08c379a0')) {
          // strip selector and ABI padding
          const strData = data.slice(10); // remove 0x08c379a0
          // the revert reason starts after 64 bytes (offset) + 64 bytes (length) => skip first 128 chars (64 bytes)
          const reasonHex = '0x' + strData.slice(128);
          return toUtf8String(reasonHex);
        }
        // fallback: try direct utf8
        return toUtf8String(data);
      } catch (e) {
        return null;
      }
    };

    // User rejected signature
    if (rawErr?.code === 4001 || rawErr?.code === 'ACTION_REJECTED' || (rawErr?.message || '').toLowerCase().includes('user denied')) {
      throw new Error('Transaction rejected by user. You cancelled the signature.');
    }

    // Insufficient funds
    if ((rawErr?.code === 'INSUFFICIENT_FUNDS') || /insufficient funds/i.test(rawErr?.message || '')) {
      throw new Error('Insufficient funds in your wallet to cover the transfer and gas. Please top up your wallet and try again.');
    }

    // Call exception / revert
    if (rawErr?.code === 'CALL_EXCEPTION' || /revert/i.test(rawErr?.message || '')) {
      const data = rawErr?.data || rawErr?.error?.data || rawErr?.transaction?.data;
      const reason = extractRevertReason(data);
      if (reason) {
        // show decoded revert reason
        throw new Error(`Contract reverted: ${reason}`);
      }
      // No revert reason available — suggest increasing gas price
      throw new Error('Transaction may have reverted (no revert reason returned). Try increasing the gas fee (e.g. to 0.03 ETH or higher) before signing, or check contract state.');
    }

    // Unpredictable gas limit or estimation error
    if (rawErr?.code === 'UNPREDICTABLE_GAS_LIMIT' || /cannot estimate gas/i.test(rawErr?.message || '')) {
      throw new Error('Unable to estimate gas for this transaction. This may happen when the contract would revert. Try increasing the gas fee and ensure inputs are correct.');
    }

    // Replacement underpriced / nonce issues
    if (rawErr?.code === 'REPLACEMENT_UNDERPRICED' || /replacement transaction underpriced/i.test(rawErr?.message || '')) {
      throw new Error('Transaction replacement underpriced. Try increasing the gas price (priority fee) in your wallet and retry.');
    }

    // Generic network / provider errors
    if (/network error/i.test(rawErr?.message || '')) {
      throw new Error('Network error while sending transaction. Check your connection and try again.');
    }

    // Fallback: include raw message for debugging but present friendly text
    const friendly = rawErr?.message || String(rawErr);
    throw new Error(`Failed to send transaction: ${friendly}`);
  }
}