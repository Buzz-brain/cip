import React, { useState, useEffect } from "react";
import { Button } from "@components/ui/button";
import { toast } from "react-toastify";
import { fundPlanOnChain } from "../../lib/wallet/fundPlan";
import { extractErrorMessage } from "../../lib/utils";
import { BrowserProvider } from "ethers";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

interface Props {
  open: boolean;
  onClose: () => void;
  contractPlanId: number | string;
  defaultAmount?: string;
  userToken?: string | null;
  ownerWallet?: string | null;
}

const FundPlanModal: React.FC<Props> = ({ open, onClose, contractPlanId, defaultAmount = "0.0", userToken = null, ownerWallet = null }) => {
  const [amount, setAmount] = useState<string>(defaultAmount);
  const [status, setStatus] = useState<"idle" | "signing" | "pending" | "success" | "error">("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [backendNotifyFailed, setBackendNotifyFailed] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      setAmount(defaultAmount);
      setStatus("idle");
      setTxHash(null);
      setError(null);
      setBackendNotifyFailed(false);
    }
  }, [open, defaultAmount]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  console.log('[FundPlanModal] render', { open, contractPlanId, defaultAmount });

  if (!open) return null;

  const handleConfirm = async () => {
    console.log('[FundPlanModal] handleConfirm start', { contractPlanId, amount });
    setError(null);
    // Validate amount before attempting any wallet operations
    const validate = (val: string) => {
      const v = (val || '').toString().trim().replace(/,/g, '');
      if (!v) return 'Please enter an amount in ETH.';
      const n = Number(v);
      if (Number.isNaN(n)) return 'Amount must be a valid number.';
      if (n <= 0) return 'Amount must be greater than 0.';
      return null;
    };

    const amtErr = validate(amount);
    if (amtErr) {
      setError(amtErr);
      console.warn('[FundPlanModal] validation failed', { amount, amtErr });
      return;
    }
    if (!window.ethereum) {
      setError("No web3 provider found. Connect a wallet.");
      console.error('[FundPlanModal] no window.ethereum');
      return;
    }

    try {
      console.log('[FundPlanModal] requesting accounts');
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      setError("Wallet connection required.");
      console.error('[FundPlanModal] eth_requestAccounts failed', err);
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const signerAddr = await signer.getAddress().catch((e) => { console.warn('[FundPlanModal] getAddress failed', e); return null; });
      console.log('[FundPlanModal] provider and signer ready', { signerAddr });
      setStatus("signing");

      // If ownerWallet prop provided, ensure connected signer matches expected owner
      if (ownerWallet && signerAddr && String(ownerWallet).toLowerCase() !== String(signerAddr).toLowerCase()) {
        const msg = 'Connected wallet does not match plan owner. Switch to the owner wallet to fund this plan.';
        setError(msg);
        console.warn('[FundPlanModal] owner mismatch', { ownerWallet, signerAddr });
        setStatus('error');
        return;
      }
      const planIdNum = Number(contractPlanId);
      const sanitizedAmount = amount.trim().replace(/,/g, '');
      console.log('[FundPlanModal] calling fundPlanOnChain', { planIdNum, sanitizedAmount });
      let hash: string;
      try {
        hash = await fundPlanOnChain(planIdNum, sanitizedAmount, signer);
      } catch (e: any) {
        const msg = e?.message || String(e);
        // Parse common errors to friendly UX messages
        if (msg.includes('invalid FixedNumber') || msg.includes('INVALID_ARGUMENT') || msg.includes('parseEther')) {
          setError('Invalid amount format. Use a plain number like 0.1');
        } else if (msg.includes('Not owner') || (e?.revert && String(e.revert?.args || '').includes('Not owner'))) {
          setError('You are not the on-chain owner of this plan. Switch to the owner wallet or verify the plan registration.');
        } else if (msg.includes('Internal JSON-RPC error') || msg.includes('Internal JSON-RPC')) {
          setError('Wallet RPC error — try again or check your wallet network/settings.');
        } else {
          setError(msg);
        }
        setStatus('error');
        console.error('[FundPlanModal] fundPlanOnChain threw', e);
        return;
      }
      console.log('[FundPlanModal] fundPlanOnChain returned', { hash });
      setTxHash(hash);
      setStatus("pending");

      // Notify backend
      try {
        console.log('[FundPlanModal] notifying backend', { contract_plan_id: planIdNum, tx_hash: hash });
        const resp = await fetch(`${BACKEND_API_URL}/inherit/fund-inheritance`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}),
          },
          body: JSON.stringify({ contract_plan_id: planIdNum, tx_hash: hash }),
        });
        console.log('[FundPlanModal] backend responded', { status: resp.status });
        if (!resp.ok) {
          const errorMsg = await extractErrorMessage(resp);
          throw new Error(errorMsg);
        }
        setStatus("success");
        toast.success("Plan funded and backend notified.");
      } catch (e: any) {
        setStatus("error");
        setError(e?.message || String(e));
        setBackendNotifyFailed(true);
        console.error('[FundPlanModal] backend notify failed', e);
        toast.error("Funding succeeded on-chain, but backend notify failed. Use Retry button to resend.");
      }
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || String(err));
      console.error('[FundPlanModal] fund flow error', err);
    }
  };

  const handleRetryBackend = async () => {
    console.log('[FundPlanModal] handleRetryBackend start', { contractPlanId, txHash });
    if (!txHash) {
      setError("No transaction hash stored. Please fund again.");
      return;
    }
    setError(null);
    setStatus("pending");
    try {
      console.log('[FundPlanModal] retrying backend notify', { contract_plan_id: Number(contractPlanId), tx_hash: txHash });
      const resp = await fetch(`${BACKEND_API_URL}/inherit/fund-inheritance`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}),
        },
        body: JSON.stringify({ contract_plan_id: Number(contractPlanId), tx_hash: txHash }),
      });
      console.log('[FundPlanModal] backend responded', { status: resp.status });
      if (!resp.ok) {
        const errorMsg = await extractErrorMessage(resp);
        throw new Error(errorMsg);
      }
      setStatus("success");
      setBackendNotifyFailed(false);
      toast.success("Backend notified successfully!");
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || String(e));
      console.error('[FundPlanModal] retry backend notify failed', e);
      toast.error("Retry failed. Check backend response and try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#1f1915] border border-[#3a2f1e] rounded-lg w-[90%] max-w-lg p-6 z-70">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-white font-bold">Fund Plan</h3>
          <button className="text-[#b8a494]" onClick={onClose}>Close</button>
        </div>

        <div className="text-sm text-[#d1c3b4] space-y-4">
          <div>
            <div className="text-xs text-[#8b7664]">Contract Plan ID</div>
            <div className="font-mono text-white">{contractPlanId}</div>
          </div>

          <div>
            <div className="text-xs text-[#8b7664]">Amount (ETH)</div>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 0.05"
              inputMode="decimal"
              className="w-full bg-[#221a15] border border-[#2f241c] rounded px-3 py-2 text-white"
            />
            {/* Inline validation hint */}
            {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
            {!error && <div className="text-xs text-[#8b7664] mt-1">Enter the amount in ETH to send to the contract.</div>}
          </div>

          <div className="text-xs text-[#8b7664]">Warning</div>
          <div className="text-sm text-[#e7c8b0]">Funding a plan is irreversible on-chain. Ensure the amount and plan are correct before confirming.</div>

          {/* txHash is shown above; error is shown inline near input */}
          {txHash && <div className="text-sm text-[#b8a494]">Transaction: <a className="text-[#ff6600]" href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noreferrer">{txHash}</a></div>}

          <div className="flex gap-2 mt-4">
            <Button onClick={onClose} className="bg-[#393028]">Cancel</Button>
            {backendNotifyFailed && status === "error" ? (
              <Button
                onClick={handleRetryBackend}
                className="bg-[#ff9933]"
                disabled={status === "pending" || !txHash}
              >
                {status === "pending" ? "Retrying..." : "Retry Send to Backend"}
              </Button>
            ) : (
              <Button
                onClick={handleConfirm}
                className="bg-[#ff6600]"
                disabled={status === "signing" || status === "pending" || Boolean(error) || amount.toString().trim() === ''}
              >
                {status === "signing" ? "Waiting for signature..." : status === "pending" ? "Pending..." : "Confirm & Fund"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundPlanModal;
