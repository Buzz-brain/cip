import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TriangleAlert as AlertTriangle, Download } from "lucide-react";
import { toast } from "react-toastify";
import { usePlan } from "../../../context/usePlan";
import { mapPlanTypeToDataProtectorType } from "../../../context/PlanContext";
import { ensureArbitrumSepolia } from "../../../lib/wallet/walletUtils";
import calculatorWhiteIcon from "@assets/calculator-white.svg";
import fingerprintIcon from "@assets/fingerprint.svg";
import flagOrangeIcon from "@assets/flag-orange.svg";
import { InheritancePlanData } from "../../../lib/api/dataProtector";

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
        if (healthState.acceptedDocs) setPlanField('acceptedDocs', healthState.acceptedDocs);
        if (healthState.jurisdiction) setPlanField('jurisdiction', healthState.jurisdiction);
      }

      const inactivityState = incoming?.inactivityState;
      if (inactivityState) {
        console.log('[ReviewPlan] merging incoming inactivityState into plan:', inactivityState);
        if (typeof inactivityState.inactivityDays === 'number') setPlanField('inactivityPeriodDays', inactivityState.inactivityDays);
        if (Array.isArray(inactivityState.chosenMethods)) setPlanField('proofOfLifeMethod', inactivityState.chosenMethods.join(','));
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

      const payload = getProtectorPayload() as InheritancePlanData;
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

      const protectedDataAddress = undefined; // placeholder while DataProtector is skipped

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
        navigate("/plan-activated", {
          state: {
            referenceId: submitResponse?.id || submitResponse?.plan_id || "#CIP-8354-JD",
            plan_id_to_fund: submitResponse?.plan_id_to_fund ?? submitResponse?.plan_id ?? submitResponse?.id,
            trx_hex: submitResponse?.trx_hex ?? submitResponse?.transaction_hex ?? null,
            backendMessage: submitResponse?.message ?? submitResponse?.detail ?? null,
            triggerMechanism: payload.plan_type || "Inactivity Monitor (12 Months)",
            assetsIncluded: `${payload.crypto_asset} ${payload.amount}`,
            mainBeneficiary: payload.beneficiary_1_wallet || payload.owner_wallet,
            securityLevel: "AES-256 ENCRYPTED",
            protectedDataAddress: submitResponse?.protected_data_address ?? protectedDataAddress,
          },
        });
      }
    } catch (error) {
      let message = "Failed to protect or submit the inheritance plan.";
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
      console.error("DataProtector error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="font-family:'Manrope',Helvetica] flex flex-col w-full px-4 py-4 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <div className="text-orange-600 font-semibold text-sm mb-3 flex gap-3 items-center">
          <img src={flagOrangeIcon} alt="" />
          <span>STEP 4 OF 4</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 ">
          Review & Confirm Plan
        </h1>
        <p className="text-gray-400 text-lg">
          Finalize your multi-chain inheritance protocol configuration and
          review estimated tax implications provided by TaxCore.
        </p>
      </div>

      <div className="flex items-center mb-6 gap-3">
        <h2 className="text-white font-semibold text-xl">TaxCore Analysis</h2>
        <span className="text-orange-600 bg-[#FF660033] border border-[#FF660033] px-3 py-1 rounded text-xs font-semibold">
          BETA
        </span>
      </div>

      <div className="font-family:'Manrope',Helvetica] flex gap-8">
        <div className="bg-[#27241C] rounded-lg p-8 border border-[#3B352D] mb-8">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-col mb-5">
                <label className="text-gray-400 text-sm mb-3">
                  Country of Residence
                </label>
                <select className="bg-[#211C16] border border-[#3B352D] text-white rounded px-4 py-3 focus:border-orange-600 focus:outline-none">
                  <option>United States</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="text-gray-400 text-sm">
                  Beneficiary Countries
                </label>

                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-[#FF6600] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    Germany
                    <span className="ml-1">×</span>
                  </span>
                  <span className="bg-[#FF6600] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    France
                    <span className="ml-1">×</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Add country..."
                    className="bg-gray-800 border border-gray-700 text-gray-400 rounded px-3 py-1 text-sm focus:border-[#FF6600] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button className="w-full bg-[#FF6600] hover:bg-orange-700 transition-colors text-white font-semibold py-3 rounded-lg mb-6 flex items-center justify-center gap-2">
              <img src={calculatorWhiteIcon} alt="" />
              Recalculate Liability
            </button>
          </div>
        </div>

        <div className="bg-[#27241C] rounded-lg p-8 border border-[#3B352D] mb-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-4">
                Total Estimated Liability
              </label>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-4xl font-bold">
                  $14,250.00
                </span>
                <span className="text-gray-400 text-sm">USD</span>
              </div>
              <span className="text-green-500 text-sm mt-2">
                ↓ Potential savings found via structure optimization
              </span>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-500 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Tax Forms (PDF)</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8"></div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="text-sm text-gray-400 mb-2">
              LIABILITY BREAKDOWN
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">US Estate Tax</span>
                <span className="text-white">$10,450.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Beneficiary Tax (FR)</span>
                <span className="text-white">$3,800.00</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F973161A] border border-[#F9731633] rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-200">
              <strong>Disclaimer:</strong> These figures are estimates only
              based on current market rates and tax laws. This tool does not
              constitute professional tax advice. Please consult with a
              certified tax professional before finalizing.
            </div>
          </div>
        </div>
      </div>

      <div className="font-family:'Manrope',Helvetica] flex justify-between items-center mb-6 mt-6 gap-3">
        <h2 className="text-xl font-bold text-white">
          Plan Configuration Summary
        </h2>
        <p className="text-orange-600 text-sm">Edit Configuration</p>
      </div>

      <div className="flex justify-between gap-8">
        <div className="bg-[#27241C] w-full rounded-lg p-8 border border-[#3B352D] mb-8">
          <div className="flex flex-col">
            <div className="flex justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">
                Asset Breakdown
              </h3>
              <p className="text-gray-400 text-sm">3 Assets Protected</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Asset</span>
                <span className="text-gray-300">Amount</span>
                <p className="text-gray-300">Value (USD)</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300 font-bold">
                  Ethereum <br />{" "}
                  <span className="text-gray-400 text-xs font-normal ">
                    Optimism Network{" "}
                  </span>
                </span>
                <span className="text-gray-300">12.5 ETH</span>
                <p className="text-gray-400 text-xs">$38,250.00</p>
              </div>

              <div className="flex items-center justify-between text-sm mt-4">
                <span className="text-gray-300 font-bold">
                  USDC <br />{" "}
                  <span className="text-gray-400 text-xs font-normal ">
                    Polygon{" "}
                  </span>
                </span>
                <span className="text-gray-300">50,000 USDC</span>
                <p className="text-gray-400 text-xs">$50,000.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#27241C] w-full rounded-lg p-8 border border-[#3B352D] mb-8">
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-4">
              Beneficiary Allocation
            </h3>
            <div className="text-gray-400 text-sm mb-4">Total: 100%</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-gray-300 text-sm">
                    Sarah Jenkins (Daughter)
                  </span>
                </div>
                <span className="text-orange-600 font-semibold">60%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-gray-300 text-sm">
                    Michael Jenkins (Son)
                  </span>
                </div>
                <span className="text-orange-600 font-semibold">40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        <div className="bg-[#27241C] rounded-lg p-4 border border-[#3B352D]">
          <div className="text-gray-400 text-xs font-semibold mb-2">
            TRIGGER TYPE
          </div>
          <div className="text-white font-semibold">Dead Man's Switch</div>
          <div className="text-gray-400 text-xs mt-1">
            12 months inactivity
          </div>
        </div>
        <div className="bg-[#27241C] rounded-lg p-4 border border-[#3B352D]">
          <div className="text-gray-400 text-xs font-semibold mb-2">
            MPC SECURITY
          </div>
          <div className="text-white font-semibold">3 of 5 Signers</div>
          <div className="text-gray-400 text-xs mt-1">Multi-Party Comp</div>
        </div>
        <div className="bg-[#27241C] rounded-lg p-4 border border-[#3B352D]">
          <div className="text-gray-400 text-xs font-semibold mb-2">
            EST. GAS FEES
          </div>
          <div className="text-white font-semibold">~0.004 ETH</div>
          <div className="text-gray-400 text-xs mt-1">$12.50 USD</div>
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
