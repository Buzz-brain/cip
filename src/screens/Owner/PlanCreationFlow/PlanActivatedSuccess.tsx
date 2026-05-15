import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import shieldCheckOrangeIcon from "@assets/shield-check-orange.svg";
import { toast } from "react-toastify";

const Confetti: React.FC = () => {
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
    color: ['#FF6600', '#FFC589', '#FFE4B5', '#FF8C00'][Math.floor(Math.random() * 4)],
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            background: p.color,
            borderRadius: '50%',
            animation: `fall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export const PlanActivatedSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [planIdToFund, setPlanIdToFund] = useState<number | null>(null);
  const [trxHex, setTrxHex] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  const [contractPlanId, setContractPlanId] = useState<number | null>(null);

  useEffect(() => {
    const planId = searchParams.get('planId');
    const contractId = searchParams.get('contractPlanId');
    const trx = searchParams.get('trx');
    setPlanIdToFund(planId ? Number(planId) : null);
    setContractPlanId(contractId ? Number(contractId) : null);
    setTrxHex(trx && trx.length > 0 ? trx : null);
    setTimeout(() => setShowConfetti(false), 2500);
  }, [searchParams]);
  
  // Refs for copying plans details (optional, kept for potential features)
  const stateRef = React.useRef<{ planId: number | null; trx: string | null }>({ planId: null, trx: null });
  React.useEffect(() => {
    stateRef.current = { planId: planIdToFund, trx: trxHex };
  }, [planIdToFund, trxHex]);
  

  const copy = async (text: string, success = "Copied") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(success);
    } catch (e) {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="min-h-[72vh] flex items-center justify-center bg-gradient-to-b from-[#080706] to-[#0f0d0b] py-12">
      {showConfetti && <Confetti />}
      <div className="w-full max-w-4xl bg-[#0f0d0b] border border-[#2b2419] rounded-2xl p-8 shadow-2xl">
        <div className="flex items-start gap-6">
          <div className="relative w-36 h-36 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 opacity-10 filter blur-2xl animate-pulse" />
            <div className="absolute -inset-2 rounded-full border-2 border-orange-400/20 animate-ping" />
            <div className="relative w-full h-full rounded-full bg-[#2c1f17] flex items-center justify-center border border-[#3b2e23]">
              <img
                src={shieldCheckOrangeIcon}
                alt="success"
                className="w-20 h-20 drop-shadow-lg"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Plan Activated Successfully
            </h1>
            <p className="mt-2 text-sm text-[#cdb89a]">
              Your inheritance plan has been created successfully. Save the
              details below and fund the plan to enable asset transfers.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  if (planIdToFund) {
                    navigate(`/owner-dashboard/plans/${planIdToFund}`);
                  }
                }}
                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-black font-semibold rounded-md shadow hover:scale-105 transform"
              >
                Open Plan
              </button>
              <button
                onClick={() => navigate("/owner-dashboard/plans")}
                className="px-4 py-2 border border-[#3b2e23] text-[#d1c3b4] rounded-md hover:bg-[#1b1714]"
              >
                All Plans
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#12100e] border border-[#2a241b] rounded-lg p-5 flex flex-col">
            <div className="text-xs text-[#9b855f]">Contract Plan ID to Fund</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="text-2xl font-bold text-white truncate">
                {contractPlanId ? String(contractPlanId) : "—"}
              </div>
              {contractPlanId != null && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copy(String(contractPlanId), "Contract Plan ID copied")}
                    className="text-[#d1c3b4] hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 text-xs text-[#b59b7d]">Next step</div>
            <div className="mt-1 text-sm text-[#d1c3b4]">
              Fund this plan on-chain to enable distribution to beneficiaries.
            </div>

            {planIdToFund != null && (
              <button
                onClick={() => {
                  if (planIdToFund) {
                    navigate(`/owner-dashboard/plans/${planIdToFund}?action=fund`);
                  }
                }}
                className="mt-4 w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded"
              >
                Fund Now
              </button>
            )}
          </div>

          <div className="bg-[#12100e] border border-[#2a241b] rounded-lg p-5 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-[#9b855f]">Transaction</div>
                <div className="text-sm text-[#d1c3b4]">
                  {trxHex
                    ? "Deployment transaction created"
                    : "No on-chain transaction available"}
                </div>
              </div>
              {trxHex && <div className="text-xs text-[#9b855f]">Hash</div>}
            </div>

            {trxHex && (
              <div className="mt-3 flex flex-col gap-4">
                <div className="flex gap-4">
                  <pre className="text-xs text-[#e6d9c6] break-words text-wrap max-w-xs bg-[#0b0a09] p-2 rounded">
                    {trxHex}
                  </pre>

                  <button
                    onClick={() => copy(trxHex, "Transaction hex copied")}
                    className="text-[#d1c3b4] hover:text-white flex items-center gap- 2"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    className="text-sm text-[#d1c3b4] hover:underline ml-auto"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://sepolia.arbiscan.io/tx/${trxHex}`}
                  >
                    View on Arbiscan →
                  </a>
                </div>
              </div>
            )}

            <div className="mt-4 text-xs text-[#b59b7d]">Status</div>
            <div className="mt-1 text-sm text-green-400 font-semibold">
              SUCCESS
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/owner-dashboard")}
            className="px-4 py-2 bg-transparent border border-[#4a3a2b] text-[#d1c3b4] rounded"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
