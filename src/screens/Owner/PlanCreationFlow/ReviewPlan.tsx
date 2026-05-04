import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { usePlan } from "../../../context/usePlan";
import { mapPlanTypeToDataProtectorType } from "../../../context/PlanContext";
import { ensureArbitrumSepolia } from "../../../lib/wallet/walletUtils";
import fingerprintIcon from "@assets/fingerprint.svg";
// Using backend create-inheritance directly; DataProtector flow removed.

export const ReviewPlan = (): JSX.Element => {
  const navigate = useNavigate();
  const { plan, getProtectorPayload, submitPlan } = usePlan();
  const location = useLocation();
  const { setPlanField } = usePlan();
  const [isSaving, setIsSaving] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // If navigated here with health-specific state, merge into plan
    try {
      const incoming: any = (location && (location as any).state) || {};
      const healthState = incoming?.healthState;
      if (healthState) {
        console.log('[ReviewPlan] merging incoming healthState into plan:', healthState);
        if (healthState.executorName) setPlanField('executorName', healthState.executorName);
        if (healthState.executorEmail) setPlanField('executorEmail', healthState.executorEmail);
        if (healthState.executorWallet) setPlanField('executorWallet', healthState.executorWallet);

      }

      const inactivityState = incoming?.inactivityState;
      if (inactivityState) {
        console.log('[ReviewPlan] merging incoming inactivityState into plan:', inactivityState);
        if (typeof inactivityState.inactivityDays === 'number') setPlanField('inactivityPeriodDays', inactivityState.inactivityDays);
        if (Array.isArray(inactivityState.chosenMethods)) {
          // ensure we persist backend canonical ids (map frontend-friendly ids if present)
          const mapping: Record<string, string> = {
            wallet: 'wallet_signature',
            app: 'app_login',
            email: 'email',
            biometric: 'biometric',
            wallet_signature: 'wallet_signature',
            app_login: 'app_login',
            email_sms: 'email',
            faceid: 'biometric',
            touchid: 'biometric',
          };
          const normalized = inactivityState.chosenMethods.map((m: string) => mapping[m] ?? m);
          setPlanField('proofOfLifeMethod', normalized.join(','));
        }
        if (typeof inactivityState.displayedGrace === 'number') setPlanField('gracePeriod', inactivityState.displayedGrace);
      }
    } catch (err) {
      console.warn('[ReviewPlan] failed to merge incoming state', err);
    }
    return () => {
      // abort any in-flight submit if component unmounts
      abortControllerRef.current?.abort();
    };
  }, []);

  // Fetch ETH price and compute USD equivalent for plan amount when applicable
  const [assetUsdFormatted, setAssetUsdFormatted] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    const fetchPrice = async () => {
      try {
        if (!plan?.cryptoAsset || !plan?.amount) {
          setAssetUsdFormatted(null);
          return;
        }
        const symbol = String(plan.cryptoAsset).toLowerCase();
        // Only support ETH for now
        if (symbol !== 'eth' && symbol !== 'eth') {
          setAssetUsdFormatted(null);
          return;
        }
        const amount = parseFloat(String(plan.amount).replace(/[,\s]/g, ''));
        if (isNaN(amount)) {
          setAssetUsdFormatted(null);
          return;
        }
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        if (!res.ok) return;
        const data = await res.json();
        const price = data?.ethereum?.usd;
        if (mounted && price) {
          const usd = amount * Number(price);
          setAssetUsdFormatted(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(usd));
        }
      } catch (err) {
        console.error('[ReviewPlan] fetchPrice error', err);
      }
    };
    fetchPrice();
    return () => { mounted = false; };
  }, [plan?.cryptoAsset, plan?.amount]);

  const handleBack = () => {
    navigate("/philanthropy-plan");
  };

  const handleConfirmSign = async () => {
    setIsSaving(true);
    try {
      // Basic validation from plan context
      if (!plan) throw new Error("No plan data available.");
      if (!plan.ownerWallet && !plan.ownerName) throw new Error("Owner wallet must be connected.");
      // crypto asset is validated from the protector payload (getProtectorPayload may provide a default)
      if (!plan.planType) throw new Error("Please select a plan type.");
      if (!plan.beneficiaries || plan.beneficiaries.length === 0) throw new Error("Add at least one beneficiary.");

      await ensureArbitrumSepolia();

      const payload = getProtectorPayload();
      console.log("[ReviewPlan] Payload:", payload);

      if (!payload.crypto_asset) {
        throw new Error("Please select at least one crypto asset to protect.");
      }
      if (!payload.owner_wallet) {
        throw new Error("Owner wallet is required to protect the inheritance plan.");
      }

      // Build backend payload preview (same shape as submitPlan) for logging
      const backendPreview = {
        crypto_asset: plan.cryptoAsset || "",
        plan_type: payload.plan_type || mapPlanTypeToDataProtectorType(plan.planType),
        beneficiaries: plan.beneficiaries.map((b) => ({
          name: b.name,
          relationship: b.relationship,
          email: b.email || "",
          wallet: b.walletAddress,
          allocation_percentage: b.allocation,
        })),
        executor: [
          {
            full_name: plan.ownerName || "",
            email: undefined,
            wallet: plan.ownerWallet || payload.owner_wallet,
          },
        ],
        release_timestamp: typeof plan.releaseTimestamp === 'number' ? plan.releaseTimestamp : undefined,
      };
      console.log('[ReviewPlan] Backend payload preview:', backendPreview);

      // Submit to backend create-inheritance endpoint (abortable)
      abortControllerRef.current = new AbortController();
      let submitResponse: any = null;
      try {
        submitResponse = await submitPlan({ signal: abortControllerRef.current.signal });
        console.log("[ReviewPlan] submitPlan response:", submitResponse);
        toast.success("Inheritance plan submitted successfully.");
      } catch (submitErr) {
        if ((submitErr as any).name === "AbortError") {
          toast.info("Plan submission aborted.");
        } else {
          console.error("[ReviewPlan] submitPlan error:", submitErr);
          throw submitErr;
        }
      } finally {
        abortControllerRef.current = null;
      }

      // Navigate only if submission succeeded
      if (submitResponse) {
        // Extract both IDs from backend response
        const responseData = submitResponse?.data || submitResponse || {};
        const planId = responseData?.id ?? responseData['id:'] ?? submitResponse?.id ?? '';  // database plan ID for navigation (handle backend's "id:" typo)
        const contractPlanId = responseData?.contract_plan_id ?? '';  // contract plan ID for display
        const trx = responseData?.trx_hex ?? responseData?.transaction_hex ?? responseData?.trx ?? '';

        navigate(
          `/owner-dashboard/plan-activated?planId=${planId}&contractPlanId=${contractPlanId}&trx=${trx}`
        );
      }
    } catch (error) {
      let message = "Failed to submit the inheritance plan.";
      if (error instanceof Error) {
        // Try to extract backend error detail if present
        const match = error.message.match(/\{.*\}/);
        if (match) {
          try {
            const errObj = JSON.parse(match[0]);
            if (errObj.detail) {
              message = typeof errObj.detail === 'string' ? errObj.detail : JSON.stringify(errObj.detail);
            } else {
              message = error.message;
            }
          } catch {
            message = error.message;
          }
        } else {
          message = error.message;
        }
      }
      toast.error(message);
      console.error("[ReviewPlan] submit error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="font-family:'Manrope',Helvetica] flex flex-col w-full px-4 py-4 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white mb-4 ">
          Review & Confirm Plan
        </h1>
        <p className="text-gray-400 text-lg">
          Finalize your multi-chain inheritance protocol configuration and
          review estimated tax implications provided by TaxCore.
        </p>
      </div>

      <div className="font-family:'Manrope',Helvetica] flex justify-between items-center mb-6 gap-3">
        <h2 className="text-xl font-bold text-white">
          Plan Configuration Summary
        </h2>
        {/* <p className="text-orange-600 text-sm">Edit Configuration</p> */}
      </div>

      <div className="flex justify-between gap-8">
        <div className="bg-[#27241C] w-full rounded-lg p-8 border border-[#3B352D] mb-8">
          <div className="flex flex-col">
            <div className="flex justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">
                Asset Breakdown
              </h3>
              <p className="text-gray-400 text-sm">{plan.assets?.length || 1} Asset{(plan.assets?.length || 1) !== 1 ? 's' : ''} Protected</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Asset</span>
                <span className="text-gray-300">Amount</span>
                <p className="text-gray-300">Value (USD)</p>
              </div>

              {plan.cryptoAsset && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-bold">
                    {plan.cryptoAsset}
                  </span>
                  <span className="text-gray-300">{plan.amount || '-'}</span>
                  <p className="text-gray-400 text-xs">{assetUsdFormatted ?? '-'}</p>
                </div>
              )}
              {!plan.cryptoAsset && (
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>No assets selected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#27241C] w-full rounded-lg p-8 border border-[#3B352D] mb-8">
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-4">
              Beneficiary Allocation
            </h3>
            <div className="text-gray-400 text-sm mb-4">Total: {plan.beneficiaries?.reduce((sum, b) => sum + b.allocation, 0) || 0}%</div>
            <div className="space-y-3">
              {plan.beneficiaries && plan.beneficiaries.length > 0 ? (
                plan.beneficiaries.map((beneficiary, index) => {
                  const colors = ['bg-purple-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-green-500', 'bg-pink-500'];
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                        <span className="text-gray-300 text-sm">
                          {beneficiary.name} {beneficiary.relationship ? `(${beneficiary.relationship})` : ''}
                        </span>
                      </div>
                      <span className="text-orange-600 font-semibold">{beneficiary.allocation}%</span>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <span>No beneficiaries added</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        <div className="bg-[#27241C] rounded-lg p-4 border border-[#3B352D]">
          <div className="text-gray-400 text-xs font-semibold mb-2">
            TRIGGER TYPE
          </div>
          <div className="text-white font-semibold">
            {plan.planType === 'timelock' ? 'Time-Lock Trigger' : 
             plan.planType === 'inactivity' ? 'Dead Man\'s Switch' :
             plan.planType === 'health_oracle' ? 'Health Oracle' :
             plan.planType || 'Not Set'}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {plan.planType === 'timelock' && plan.releaseTimestamp ? 
              `Unlocks: ${new Date(plan.releaseTimestamp * 1000).toLocaleDateString()}` :
             plan.planType === 'inactivity' && plan.inactivityPeriodDays ? 
              `${plan.inactivityPeriodDays} months inactivity` :
             plan.planType === 'health_oracle' ? 'Verified proof of life' :
             'Configuration pending'}
          </div>
        </div>
        <div className="bg-[#27241C] rounded-lg p-4 border border-[#3B352D]">
          <div className="text-gray-400 text-xs font-semibold mb-2">
            MPC SECURITY
          </div>
          <div className="text-white font-semibold">0 of 0 Signers</div>
          <div className="text-gray-400 text-xs mt-1">Multi-Party Comp</div>
        </div>
        <div className="bg-[#27241C] rounded-lg p-4 border border-[#3B352D]">
          <div className="text-gray-400 text-xs font-semibold mb-2">
            EST. GAS FEES
          </div>
          <div className="text-white font-semibold">~0.000 ETH</div>
          <div className="text-gray-400 text-xs mt-1">$00.00 USD</div>
        </div>
        <div className="bg-[#27241C] rounded-lg p-4 border border-[#3B352D]">
          <div className="text-gray-400 text-xs font-semibold mb-2">
            PRIMARY NETWORK
          </div>
          <div className="text-white font-semibold">Arbitrum One</div>
          <div className="text-gray-400 text-xs mt-1">L2 Scaling</div>
        </div>
      </div>

      <div className="bg-[#211C16E6] rounded-lg p-5 border border-[#3B352D] mb-8">
        <div className="flex justify-between items-center">
          <div>
            {/* <Checkbox
                // checked={isConfirmed}
                // onCheckedChange={setIsConfirmed}
                className="mt-1"
              /> */}
            <p className="text-gray-400 text-sm mt-1">
              I have reviewed the plan and accepted the{" "}
              <span className="text-[#FF6600]">Terms of Service.</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="px-8 py-3 text-white border  border-[#3B352D] rounded-lg hover:bg-gray-900 transition-colors font-semibold"
            >
              Back
            </button>

            <button
              onClick={handleConfirmSign}
              disabled={isSaving}
              aria-busy={isSaving}
              className={`px-8 py-3 bg-orange-600 text-white rounded-lg transition-colors font-semibold flex items-center gap-2 ${isSaving ? 'opacity-60 cursor-not-allowed' : 'hover:bg-orange-700'}`}
            >
              {isSaving ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                  <path d="M4 12a8 8 0 018-8" />
                </svg>
              ) : (
                <img src={fingerprintIcon} alt="" />
              )}
              {isSaving ? 'Saving…' : 'Confirm & Sign Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
