import { useNavigate, useLocation } from "react-router-dom";
import shieldCheckOrangeIcon from "@assets/shield-check-orange.svg";
import fingerprintIcon from "@assets/fingerprint.svg";
import hourGlassIcon from "@assets/hour-glass.svg";
import leafLetterIcon from "@assets/leaf-letter.svg";
import handTouchIcon from "@assets/hand-touch.svg";
import messageCheckBorderIcon from "@assets/message-check-border.svg";
import paperEditIcon from "@assets/paper-edit.svg";
import alarmBuzzIcon from "@assets/alarm-buzz.svg";
import { Button } from "@components/ui/button";
import { useState } from "react";
import { usePlan } from "../../../context/usePlan";

export const ConfirmInactivityOraclePlan = (): JSX.Element => {
  const navigate = useNavigate();
  const { getProtectorPayload, submitPlan, plan } = usePlan();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const { inactivityPeriod, daysValue, selectedMethods, gracePeriod } = location.state || {};

  const inactivityDays = (() => {
    if (daysValue) return Number(daysValue);
    if (typeof plan?.inactivityPeriodDays === 'number') return plan.inactivityPeriodDays;
    if (inactivityPeriod === '90') return 90;
    if (inactivityPeriod === '180') return 180;
    if (inactivityPeriod === '12months') return 365;
    return 365;
  })();

  const displayedGrace = (() => {
    if (typeof gracePeriod === 'number') return gracePeriod;
    if (gracePeriod == null && typeof plan?.gracePeriod === 'number') return plan.gracePeriod;
    return gracePeriod ?? plan?.gracePeriod ?? 14;
  })();

  const chosenMethods = (() => {
    if (Array.isArray(selectedMethods) && selectedMethods.length > 0) return selectedMethods;
    if (typeof plan?.proofOfLifeMethod === 'string' && plan.proofOfLifeMethod.length > 0) return plan.proofOfLifeMethod.split(',').map((s) => s.trim()).filter(Boolean);
    return [] as string[];
  })();

  const fmtDays = (d?: number) => {
    if (d == null) return '';
    if (d >= 365) return `${Math.floor(d / 30)} Months`;
    if (d % 30 === 0 && d >= 30) return `${Math.floor(d / 30)} Months`;
    return `${d} Days`;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const payload = getProtectorPayload();
      console.log('[ConfirmInactivityOraclePlan] Protector payload:', payload);

      const res = await submitPlan();
      console.log('[ConfirmInactivityOraclePlan] submitPlan response:', res);

      navigate('/plan-activated', {
        state: {
          plan_id_to_fund: res?.plan_id_to_fund ?? res?.id ?? res?.plan_id,
          trx_hex: res?.trx_hex ?? res?.transaction_hex ?? null,
          backendMessage: res?.message ?? res?.detail ?? null,
          protectedDataAddress: plan?.protectedDataAddress,
        },
      });
    } catch (err) {
      console.error('[ConfirmInactivityOraclePlan] error:', err);
      // keep UI simple — could show toast later
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-4 text-white [font-family:'Manrope',Helvetica]">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Confirm Inactivity Oracle Plan
        </h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
          Confirm the creation of your Inactivity Oracle plan with selected
          inactivity period. Proof-of-Life methods, and grace period.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
            Step 5 of 5: Review & Sign
          </span>
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
            100% Completed
          </span>
        </div>

        <div className="w-full h-2 bg-[#54493B] rounded-full overflow-hidden">
          <div className="h-full w-[100%] bg-[#ff6600]"></div>
        </div>
      </div>

      <div className="flex gap-8 mb-8">
        <div className="w-[65%]">
          <div className=" flex-1 border border-[#54493B] rounded-xl bg-[#27221C] mb-8">
            <div>
              <div className="flex items-center justify-between p-5">
                <h2 className="text-white font-bold text-lg">
                  Plan Execution Flow
                </h2>
              </div>
            </div>
          </div>

          <div className=" flex-1 border border-[#54493B] rounded-xl bg-[#27221C] mb-8">
            <div>
              <div className="flex items-center justify-between p-5">
                <h2 className="text-white font-bold text-lg">
                  Configuration Summary
                </h2>
                <a
                  href="#"
                  className="text-orange-500 hover:text-orange-400 text-sm font-semibold"
                >
                  Edit
                </a>
              </div>

              <div>
                <div className="flex border-b border-t border-[#54493B] p-4 items-center gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-12 rounded-lg bg-[#393128] flex items-center justify-center flex-shrink-0">
                      <img
                        src={hourGlassIcon}
                        className="w-5 h-5"
                        alt="Hourglass"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold">
                          Inactivity Threshold
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Time before trigger
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto text-white font-semibold">
                    {fmtDays(inactivityDays) || '—'}
                  </div>
                </div>

                <div className="flex border-b border-[#54493B] p-4 items-center gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-12 rounded-lg bg-[#393128] flex items-center justify-center flex-shrink-0">
                      <img
                        src={alarmBuzzIcon}
                        className="w-5 h-5"
                        alt="Hourglass"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold">Grace Period</h3>
                      </div>
                      <p className="text-gray-400 text-sm">Cancel window</p>
                    </div>
                  </div>
                  <div className="ml-auto text-white font-semibold">
                    {displayedGrace ? `${displayedGrace} Days` : '—'}
                  </div>
                </div>

                <div className="flex p-4 items-center gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-12 rounded-lg bg-[#393128] flex items-center justify-center flex-shrink-0">
                      <img src={fingerprintIcon} alt="Fingerprint" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold">
                          Proof-of-Life Methods
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Ways to reset the timer
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-4">
                  {chosenMethods.length === 0 ? (
                    <div className="text-gray-400 text-sm">No methods selected.</div>
                  ) : (
                    chosenMethods.map((m, i) => {
                      const isPrimary = i === 0;
                      const title = m === 'wallet' || m === 'wallet_signature' ? 'Wallet Signature' : m === 'app' || m === 'app_login' ? 'App Login' : m === 'email' ? 'Email/SMS' : m;
                      const icon = m === 'wallet' || m === 'wallet_signature' ? leafLetterIcon : m === 'app' || m === 'app_login' ? handTouchIcon : messageCheckBorderIcon;
                      return (
                        <div key={m} className="w-full rounded-lg bg-[#181311] p-3 border border-[#54493B] flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[#FF66001A] flex items-center justify-center">
                              <img src={icon} className="w-4 h-4" alt={title} />
                            </div>
                            <div>
                              <div className="text-white font-semibold">{title}</div>
                              <div className="text-gray-400 text-xs">{isPrimary ? 'Primary' : 'Secondary'}</div>
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm">{isPrimary ? (plan?.ownerWallet ?? '').slice(0,6) + '...' + (plan?.ownerWallet ?? '').slice(-4) : ''}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[35%] border-2 border-[#FF660033] rounded-2xl p-6 bg-[#FF66001A]">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={shieldCheckOrangeIcon}
              className="w-5 h-5"
              alt="Hourglass"
            />
            <h2 className="text-[#FF6600] font-bold text-lg">
              Secure Transaction
            </h2>
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            Ready to Deploy?
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            You are about to finalize your Inactivity Oracle. This requires an
            on-chain transaction to set your parameters immutably.
          </p>

          {/* <div className="border border-[#54493B] rounded-xl p-4 bg-[#181311]">
            <div className="flex gap-4">
              <div className="flex-1 text-xs font-normal">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-300">Network</h3>

                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-white">Ethereum Mainnet</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-300">Est. Gas Fee</h3>
                  <h3 className="text-white">0.004 ETH ($12.40)</h3>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-300">Contract Type</h3>
                  <h3 className="text-white">Standard Oracle</h3>
                </div>
              </div>
            </div>
          </div> */}

          <Button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="inline-flex w-full mt-8 items-center gap-2 px-7 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-lg [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
          >
            <img src={paperEditIcon} alt="Icon" />
            {isSubmitting ? 'Signing…' : 'Sign & Create Plan'}
          </Button>

          <p className="text-gray-400 text-sm mb-6 mt-4 leading-relaxed">
            By signing, you agree to the protocol Terms of Service and confirm
            you have backed up your keys.
          </p>
        </div>
      </div>

      <footer className="flex mt-12 items-center justify-start pt-8 pb-12 px-0 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-[#54483b]">
        <div className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
          <Button
            className="px-6 py-6 rounded-lg border border-solid border-[#54483b] bg-transparent hover:bg-transparent [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
            onClick={handleBack}
          >
            &larr; &nbsp; Back
          </Button>
        </div>
      </footer>
    </main>
  );
};
