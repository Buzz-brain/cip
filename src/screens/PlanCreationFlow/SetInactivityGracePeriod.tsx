import { Clock, Bell, Send } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";



export const SetInactivityGracePeriod = (): JSX.Element => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate("/choose-proof-of-life");
    };

    const handleContinue = () => {
      navigate("/review-inactivity-oracle-plan");
    };
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810] text-white [font-family:'Manrope',Helvetica]">
      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
          <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
            Inheritance&nbsp;&nbsp;Protocol
          </span>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-300 text-sm font-semibold"
          >
            Create Plan
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            My Plans
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Settings
          </a>
          <div className="w-9 h-9 bg-gray-400 rounded-full"></div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">
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
              <button className="border border-[#54493B] rounded-xl p-6 text-center hover:border-gray-700 transition bg-[#27221C]">
                <div className="text-3xl font-bold text-white mb-2">3</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>

              <button className="border border-[#54493B] rounded-xl p-6 text-center hover:border-gray-700 transition bg-[#27221C]">
                <div className="text-3xl font-bold text-white mb-2">7</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>

              <button className="border-2 border-orange-600 rounded-xl p-6 text-center transition bg-orange-600/5 relative">
                <div className="absolute top-0 right-0 bg-orange-600 rounded-lg text-white text-xs font-normal px-2 py-1">
                  Recommended
                </div>
                <div className="text-3xl font-bold text-white mb-2">14</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="border border-[#54493B] rounded-xl p-6 text-center hover:border-gray-700 transition bg-[#27221C]">
                <div className="text-3xl font-bold text-white mb-2">30</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>

              <button className="border border-[#54493B] rounded-xl p-6 text-center hover:border-gray-700 transition bg-[#27221C]">
                <div className="text-3xl font-bold text-white mb-2">60</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>

              <button className="border border-[#54493B] rounded-xl p-6 text-center hover:border-gray-700 transition bg-[#27221C]">
                <div className="text-gray-500 text-sm font-medium mb-2">
                  ---
                </div>
                <p className="text-gray-400 text-sm">Custom</p>
              </button>
            </div>
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
                <span className="text-white font-semibold">12 Months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Grace Period</span>
                <span className="text-orange-500 font-semibold">+ 14 Days</span>
              </div>
              <div className="border-t-2 border-[#63594B] border-dashed pt-3 mt-3 flex items-center justify-between">
                <span className="text-white font-semibold">Total Time</span>
                <span className="text-white font-semibold">
                  ~ 12 Mo. 14 Days
                </span>
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
    </div>
  );
}
