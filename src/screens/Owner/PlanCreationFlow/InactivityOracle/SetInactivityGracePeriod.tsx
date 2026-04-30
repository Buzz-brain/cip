import { Clock, Bell, Send } from "lucide-react";
import { Button } from "@components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { usePlan } from "../../../../context/usePlan";



export const SetInactivityGracePeriod = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { inactivityPeriod, daysValue, selectedMethods } = location.state || {};
  const { plan, setPlanField } = usePlan();
  const [selectedGrace, setSelectedGrace] = useState<number | null>(plan?.gracePeriod ?? 14);
  const [customGrace, setCustomGrace] = useState<string>(String(plan?.gracePeriod ?? ""));
  const [touched, setTouched] = useState<boolean>(false);

  const inactivityDays = (() => {
    if (daysValue) return Number(daysValue);
    if (typeof plan?.inactivityPeriodDays === 'number') return plan.inactivityPeriodDays;
    return undefined;
  })();

  const formatTotalTime = (inactivity?: number | undefined, grace?: number | null) => {
    const inDays = inactivity ?? 0;
    const gr = grace ?? 0;
    const total = inDays + gr;
    if (inDays >= 365) {
      const months = Math.floor(inDays / 30);
      const remDays = inDays % 30 + gr;
      return `~ ${months} Mo. ${remDays} Days`;
    }
    if (total >= 30) {
      const months = Math.floor(total / 30);
      const remDays = total % 30;
      return `~ ${months} Mo. ${remDays} Days`;
    }
    return `${total} Days`;
  };

  const handleBack = () => {
    navigate("/choose-proof-of-life");
  };

  const handleContinue = () => {
    // Persist and log chosen grace period then pass state forward
    setPlanField('gracePeriod', selectedGrace);
    console.log('[SetInactivityGracePeriod] selectedGrace:', selectedGrace, 'inactivityPeriod:', inactivityPeriod, 'selectedMethods:', selectedMethods);
    navigate("/review-inactivity-oracle-plan", {
      state: {
        inactivityPeriod,
        daysValue,
        selectedMethods,
        gracePeriod: selectedGrace,
      },
    });
  };
  return (
    <main className="max-w-5xl mx-auto px-4 py-4 text-white [font-family:'Manrope',Helvetica]">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Set Inactivity Grace Period</h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
          The grace period is a safety buffer that starts after your
          inactivity threshold is reached. During this time, you will receive
          urgent notifications to confirm you are alive before the plan
          executes.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
            Step 5 of 5: Grace Period
          </span>
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
            100% Completed
          </span>
        </div>

        <div className="w-full h-2 bg-[#54493B] rounded-full overflow-hidden">
          <div className="h-full w-[100%] bg-[#ff6600]"></div>
        </div>
      </div>

      <div className="border border-[#393128] rounded-2xl p-8 bg-[#27221C] mb-8">
        <h2 className="text-white font-bold text-lg mb-12">How it works</h2>

        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-700 via-gray-600 to-transparent"></div>

          <div className="flex flex-col items-center relative z-10 flex-1">
            <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center bg-gray-900 mb-4">
              <Clock className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-gray-400 font-bold text-sm mb-1">Phase 1</h3>
            <p className="text-white text-md text-center font-semibold">
              Inactivity Timer
            </p>
            <p className="text-gray-500 text-xs mt-2">e.g. 1 Year</p>
          </div>

          <div className="flex flex-col items-center relative z-10 flex-1">
            <div className="w-16 h-16 rounded-full border-2 border-orange-600 flex items-center justify-center bg-orange-600/20 mb-4">
              <Bell className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-gray-400 font-bold text-sm mb-1">Phase 2</h3>
            <p className="text-white text-md text-center font-semibold">
              Grace Period
            </p>
            <p className="text-orange-400 text-xs mt-2">
              Final Confirmation Window
            </p>
          </div>

          <div className="flex flex-col items-center relative z-10 flex-1">
            <div className="w-16 h-16 rounded-full border-2 border-red-700 flex items-center justify-center bg-red-700/20 mb-4">
              <Send className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-gray-400 font-bold text-sm mb-1">Phase 3</h3>
            <p className="text-white text-md text-center font-semibold">
              Plan Execution
            </p>
            <p className="text-gray-500 text-xs mt-2">Assets Transferred</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h3 className="text-white font-bold text-lg mb-6">
            Select Duration
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <button
              aria-pressed={selectedGrace === 3}
              onClick={() => { setTouched(true); setSelectedGrace(3); setPlanField('gracePeriod', 3); console.log('[SetInactivityGracePeriod] selectedGrace: 3'); }}
              className={`rounded-xl p-6 text-center transition ${selectedGrace===3 ? 'border-1 border-orange-600 ring-2 ring-orange-400 bg-[#2a1f17]' : 'border border-[#54493B] hover:border-gray-700 bg-[#27221C]'}`}>
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <p className="text-gray-400 text-sm">Days</p>
            </button>

            <button
              aria-pressed={selectedGrace === 7}
              onClick={() => { setTouched(true); setSelectedGrace(7); setPlanField('gracePeriod', 7); console.log('[SetInactivityGracePeriod] selectedGrace: 7'); }}
              className={`rounded-xl p-6 text-center transition ${selectedGrace===7 ? 'border-1 border-orange-600 ring-2 ring-orange-400 bg-[#2a1f17]' : 'border border-[#54493B] hover:border-gray-700 bg-[#27221C]'}`}>
              <div className="text-3xl font-bold text-white mb-2">7</div>
              <p className="text-gray-400 text-sm">Days</p>
            </button>

            <button
              aria-pressed={selectedGrace === 14}
              onClick={() => { setTouched(true); setSelectedGrace(14); setPlanField('gracePeriod', 14); console.log('[SetInactivityGracePeriod] selectedGrace: 14'); }}
              className={`rounded-xl p-6 text-center transition relative ${selectedGrace===14 ? 'border-1 border-orange-600 ring-2 ring-orange-400 bg-[#2a1f17]' : (!touched ? 'border border-orange-600/40 bg-orange-600/5' : 'border border-[#54493B] hover:border-gray-700 bg-[#27221C]')}`}>
              <div className="absolute top-0 right-0 bg-orange-600 rounded-lg text-white text-xs font-normal px-2 py-1">
                Recommended
              </div>
              <div className="text-3xl font-bold text-white mb-2">14</div>
              <p className="text-gray-400 text-sm">Days</p>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              aria-pressed={selectedGrace === 30}
              onClick={() => { setTouched(true); setSelectedGrace(30); setPlanField('gracePeriod', 30); console.log('[SetInactivityGracePeriod] selectedGrace: 30'); }}
              className={`rounded-xl p-6 text-center transition ${selectedGrace===30 ? 'border-1 border-orange-600 ring-2 ring-orange-400 bg-[#2a1f17]' : 'border border-[#54493B] hover:border-gray-700 bg-[#27221C]'}`}>
              <div className="text-3xl font-bold text-white mb-2">30</div>
              <p className="text-gray-400 text-sm">Days</p>
            </button>

            <button
              aria-pressed={selectedGrace === 60}
              onClick={() => { setTouched(true); setSelectedGrace(60); setPlanField('gracePeriod', 60); console.log('[SetInactivityGracePeriod] selectedGrace: 60'); }}
              className={`rounded-xl p-6 text-center transition ${selectedGrace===60 ? 'border-1 border-orange-600 ring-2 ring-orange-400 bg-[#2a1f17]' : 'border border-[#54493B] hover:border-gray-700 bg-[#27221C]'}`}>
              <div className="text-3xl font-bold text-white mb-2">60</div>
              <p className="text-gray-400 text-sm">Days</p>
            </button>

            <button
              aria-pressed={selectedGrace === null}
              onClick={() => { setTouched(true); setSelectedGrace(null); setCustomGrace(''); setPlanField('gracePeriod', null); console.log('[SetInactivityGracePeriod] selectedGrace: custom'); }}
              className={`rounded-xl p-6 text-center transition ${selectedGrace===null ? 'border-1 border-orange-600 ring-2 ring-orange-400 bg-[#2a1f17]' : 'border border-[#54493B] hover:border-gray-700 bg-[#27221C]'}`}>
              <div className="text-gray-500 text-sm font-medium mb-2">
                ---
              </div>
              <p className="text-gray-400 text-sm">Custom</p>
            </button>
          </div>
          {selectedGrace === null && (
            <div className="mt-4">
              <label className="text-sm text-gray-400 mb-2 block">Enter custom days</label>
              <input
                type="number"
                value={customGrace}
                onChange={(e) => { setTouched(true); setCustomGrace(e.target.value); const n = Number(e.target.value); setSelectedGrace(Number.isNaN(n) ? null : n); setPlanField('gracePeriod', Number.isNaN(n) ? null : n); }}
                className="bg-[#181311] border border-[#80766B] text-white rounded px-3 py-2 focus:border-orange-600 focus:outline-none placeholder-white"
                placeholder="Days"
              />
            </div>
          )}
        </div>

          <div className="border border-[#54493B] bg-[#27221C] rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-yellow-600 text-xl mt-0.5">⚠</div>
            <h4 className="text-white font-bold">Important Note</h4>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            If you do not confirm your life within this 14-day grace period,
            the Smart Contract will become executable by your beneficiaries.
          </p>

          <div className="space-y-3 text-sm border-t border-[#63594B] pt-5 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Inactivity Threshold</span>
              <span className="text-white font-semibold">{inactivityDays ? (inactivityDays >= 365 ? Math.floor(inactivityDays/30) + ' Mo' : inactivityDays + ' Days') : '12 Months'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Grace Period</span>
              <span className="text-orange-500 font-semibold">{selectedGrace === null ? (customGrace ? `+ ${customGrace} Days` : '+ —') : `+ ${selectedGrace} Days`}</span>
            </div>
            <div className="border-t-2 border-[#63594B] border-dashed pt-3 mt-3 flex items-center justify-between">
              <span className="text-white font-semibold">Total Time</span>
              <span className="text-white font-semibold">{formatTotalTime(inactivityDays, selectedGrace)}</span>
            </div>
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
