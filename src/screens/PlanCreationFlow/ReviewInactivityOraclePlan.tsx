import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import timerWhiteIcon from "@assets/timer-white.svg";
import hourGlassUpIcon from "@assets/hour-glass-up.svg";
import leafLetterIcon from "@assets/leaf-letter.svg";
import handTouchIcon from "@assets/hand-touch.svg";
import { Button } from "../../components/ui/button";


export const ReviewInactivityOraclePlan = (): JSX.Element => {
      const navigate = useNavigate();
  
      const handleBack = () => {
        navigate("/set-inactivity-grace-period");
      };
  
      const handleContinue = () => {
        navigate("/confirm-inactivity-oracle-plan");
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

            <div className="text-5xl font-bold text-white mb-2">6 Months</div>
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
              14 Days
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
              href="#"
              className="text-orange-500 hover:text-orange-400 text-sm font-semibold"
            >
              Edit Methods
            </a>
          </div>

          <div className="space-y-4">
            <div className="border border-[#54493B] rounded-xl p-6 bg-[#181311]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-14 rounded-lg bg-orange-600/20 flex items-center justify-center flex-shrink-0">
                  <img src={leafLetterIcon} alt="Leaf Letter" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-bold">Wallet Signature</h3>
                    <span className="bg-green-600/20 text-green-400 text-xs font-semibold px-2 py-1 rounded">
                      Primary
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Active transaction or message signature from connected
                    wallet (0x12...89a)
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-[#54493B] rounded-xl p-6 bg-[#181311]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-14 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <img src={handTouchIcon} alt="Hand Touch" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-bold">
                      App Login + Confirmation
                    </h3>
                    <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded">
                      Secondary
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Manual login to the dashboard and clicking the "I'm Alive"
                    button
                  </p>
                </div>
              </div>
            </div>
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
    </div>
  );
}
