import { AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import timerWhiteIcon from "@assets/timer-white.svg";
import hourGlassUpIcon from "@assets/hour-glass-up.svg";
import leafLetterIcon from "@assets/leaf-letter.svg";
import handTouchIcon from "@assets/hand-touch.svg";
import { Button } from "@components/ui/button";
import { usePlan } from "../../../../context/usePlan";


export const ReviewInactivityOraclePlan = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { inactivityPeriod, daysValue, selectedMethods, gracePeriod } = location.state || {};
  const { plan } = usePlan();

  const inactivityDays = (() => {
    if (daysValue) return Number(daysValue);
    if (typeof plan?.inactivityPeriodDays === 'number') return plan.inactivityPeriodDays;
    // map shorthand inactivityPeriod ids if provided
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
    if (typeof plan?.proofOfLifeMethod === 'string' && plan.proofOfLifeMethod.length > 0) return plan.proofOfLifeMethod.split(',').map(s => s.trim()).filter(Boolean);
    return [] as string[];
  })();

  const fmtDays = (d?: number) => {
    if (!d && d !== 0) return '';
    if (d >= 365) return `${Math.floor(d / 30)} Months`;
    if (d % 30 === 0 && d >= 30) return `${Math.floor(d / 30)} Months`;
    return `${d} Days`;
  };

  const handleBack = () => {
    navigate("/set-inactivity-grace-period");
  };

  const handleContinue = () => {
    console.log('[ReviewInactivityOraclePlan] review values:', { inactivityPeriod, daysValue, selectedMethods, gracePeriod });
    navigate("/confirm-inactivity-oracle-plan");
  };

  return (
    <main className="max-w-5xl text-white  [font-family:'Manrope',Helvetica]  mx-auto px-4 py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Review Inactivity Oracle Plan
        </h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
          Please review the configuration for your Inactivity Oracle. Ensure
          the timing and verification methods meet your security and
          convenience needs before finalizing.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
            Step 4 of 5: Grace Period
          </span>
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
            80% Completed
          </span>
        </div>

        <div className="w-full h-2 bg-[#54493B] rounded-full overflow-hidden">
          <div className="h-full w-[80%] bg-[#ff6600]"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="border border-[#54493B] rounded-2xl p-8 bg-[#27221C]">
          <div className="flex items-center gap-3 mb-5">
            <div
              className={`w-10 h-12 bg-[#372F1F] rounded-lg flex items-center mb-2 justify-center`}
            >
              <img src={timerWhiteIcon} className="w-5 h-5" alt="Timer" />
            </div>

            <h2 className="text-white font-bold text-lg">
              Inactivity Period
            </h2>
          </div>

          <div className="text-5xl font-bold text-white mb-2">{fmtDays(inactivityDays)}</div>
          <p className="text-gray-400 text-sm leading-relaxed">
            The duration of silence before the protocol initiates the check-in
            process.
          </p>
        </div>

        <div className="border-2 border-orange-600/60 rounded-2xl p-8 bg-orange-600/5">
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-10 h-12 bg-[#FF66001A] rounded-lg flex items-center mb-2 justify-center`}
            >
              <img
                src={hourGlassUpIcon}
                className="w-5 h-5"
                alt="Hourglass"
              />
            </div>
            <h2 className="text-white font-bold text-lg">Grace Period</h2>
          </div>
          <div className="text-5xl font-bold text-orange-500 mb-2">
            {displayedGrace != null ? `${displayedGrace} Days` : '14 Days'}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Additional time allowed after the inactivity threshold to confirm
            Proof-of-Life.
          </p>
        </div>
      </div>

          <div className="border border-[#54493B] rounded-2xl p-8 bg-[#27221C] mb-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white font-bold text-lg">
            Selected Proof-of-Life Method(s)
          </h2>
              <a
                role="button"
                onClick={() => navigate('/choose-proof-of-life', { state: { inactivityPeriod, daysValue } })}
                className="text-orange-500 hover:text-orange-400 text-sm font-semibold cursor-pointer"
              >
                Edit Methods
              </a>
        </div>

            <div className="space-y-4">
              {chosenMethods.length === 0 && (
                <div className="text-gray-400 text-sm">No methods selected.</div>
              )}
              {chosenMethods.map((m, idx) => {
                const isPrimary = idx === 0;
                const title = m === 'wallet' || m === 'wallet_signature' ? 'Wallet Signature' : m === 'app' || m === 'app_login' ? 'App Login + Confirmation' : m === 'email' ? 'Email/SMS Confirmation' : m === 'biometric' ? 'Biometric Confirmation' : m;
                const desc = m === 'wallet' || m === 'wallet_signature' ? `Active transaction or message signature from connected wallet (${(plan?.ownerWallet || '').slice(0,6)}...${(plan?.ownerWallet || '').slice(-4)})` : m === 'app' || m === 'app_login' ? "Manual login to the dashboard and clicking the \"I'm Alive\" button" : 'Verification via external channel.';
                const icon = m === 'wallet' || m === 'wallet_signature' ? leafLetterIcon : m === 'app' || m === 'app_login' ? handTouchIcon : leafLetterIcon;

                return (
                  <div key={m} className="border border-[#54493B] rounded-xl p-6 bg-[#181311]">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-14 rounded-lg bg-orange-600/20 flex items-center justify-center flex-shrink-0">
                        <img src={icon} alt={title} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-bold">{title}</h3>
                          <span className={`${isPrimary ? 'bg-green-600/20 text-green-400' : 'bg-gray-700 text-gray-300'} text-xs font-semibold px-2 py-1 rounded`}>
                            {isPrimary ? 'Primary' : 'Secondary'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
      </div>

      <div className="border border-orange-900/40 bg-orange-900/10 rounded-2xl p-8 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-bold mb-2">Trigger Condition</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              This plan will trigger if Proof-of-Life is not confirmed within
              the defined inactivity period and subsequent grace period. The
              system will wait for a total of 6 Months + 14 Days without
              activity before executing the Inheritance Protocol.
            </p>
          </div>
        </div>
      </div>

      <footer className="flex mt-12 items-center justify-end pt-8 pb-12 px-0 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-[#54483b]">
        <div className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
          <Button
            className="px-6 py-6 rounded-lg border border-solid border-[#54483b] bg-transparent hover:bg-transparent [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            onClick={handleContinue}
            className="inline-flex items-center gap-2 px-7 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-lg [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
          >
            Continue
            <span>→</span>
          </Button>
        </div>
      </footer>
    </main>
  );
}
