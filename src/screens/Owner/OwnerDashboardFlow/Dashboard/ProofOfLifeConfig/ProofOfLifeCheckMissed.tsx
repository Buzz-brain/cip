import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import hourGlassUpIcon from "@assets/hour-glass-up.svg";
import lockIcon from "@assets/lock.svg";
import thumbprintIcon from "@assets/thumbprint.svg";

export type ProofOfLifeMissedProps = {
  open?: boolean;
  onClose?: () => void;
};

export const ProofOfLifeCheckMissed = (props?: ProofOfLifeMissedProps): JSX.Element | null => {
    const navigate = useNavigate();
  
    if (props && props.open === false) return null;
  
    const onConfirmLife = () => {
      if (props?.onClose) return props.onClose();
      navigate("/critical-alert");
    };
  
  const [timeRemaining, setTimeRemaining] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810] text-white [font-family:'Manrope',Helvetica]">
      
      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
          <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
            CIP&nbsp;&nbsp;Protocol
          </span>
        </div>
        <nav className="flex items-center gap-8">
          <div className="px-3 py-1.5 bg-[#2A241C] border border-[#2A241C] flex items-center rounded text-white text-sm">
            <HelpCircle className="w-4 h-4 inline-block mr-1" />
            <span>Support</span>
          </div>
          <div className="px-3 py-1.5 bg-yellow-600/20 border border-yellow-600/40 rounded text-yellow-500 text-sm">
            0x4a...8f92 Connected
          </div>
        </nav>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-73px)] mt-20">

        <div className="w-full max-w-2xl">
          <div className="border border-[#F2930D] rounded-lg bg-[#F2930D1A]">

            <div className="mt-10 border-b border-[#F2930D33]">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-amber-600/30 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-amber-500" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-center mb-2">
                Proof-of-Life Check Missed
              </h1>
              <p className="text-[#A0A0A0] text-center mb-8 font-medium">
                Critical Attention Required
              </p>

            </div>




            <div className="bg-[#181511] p-8 rounded-lg">
              <div className="px-10 mb-7">

                <p className="text-white text-left font-bold leading-relaxed mb-4">
                  You've missed{" "}
                  <span className="text-[#F2930D] font-semibold">
                    2 check-ins
                  </span>
                  . To prevent the activation of your Cross-Chain Inheritance
                  Protocol, please verify your status immediately.
                </p>
                <p className="text-[#888888] text-left text-sm">
                  Your inheritance plan will enter{" "}
                  <span className="text-white font-semibold">
                    pre-execution review
                  </span>{" "}
                  automatically if the timer reaches zero.
                </p>

              </div>


              <div className="mb-8">
                <div className=" bg-[#221D16] border border-[#393228] rounded-lg p-6">
                  <p className="text-[#A0A0A0] text-center mb-8 font-semibold flex items-center justify-center gap-2">
                    <img src={hourGlassUpIcon} className="w-4 h-4" alt="" />
                    Time Remaining Before Pre-Execution
                  </p>

                  <div className="grid grid-cols-7 gap-3">

                    <div className="text-center">
                      <div className="text-4xl flex items-center justify-center h-20 border border-[#393228] bg-[#2A241C] rounded-lg font-bold text-[#F2930D] mb-2">
                        {String(timeRemaining.days).padStart(2, "0")}
                      </div>
                      <div className="text-xs font-semibold text-[#888888]">Days</div>
                    </div>

                    <div className="flex items-center text-5xl justify-center text-[#9CA3AF]">
                      :
                    </div>

                    <div className="text-center">
                      <div className="text-4xl flex items-center justify-center h-20 border border-[#393228] bg-[#2A241C] rounded-lg font-bold mb-2">
                        {String(timeRemaining.hours).padStart(2, "0")}
                      </div>
                      <div className="text-xs font-semibold text-[#888888]">Hours</div>
                    </div>

                    <div className="flex items-center text-5xl justify-center text-[#9CA3AF]">
                      :
                    </div>

                    <div className="text-center">
                      <div className="text-4xl flex items-center justify-center h-20 border border-[#393228] bg-[#2A241C] rounded-lg font-bold mb-2">
                        {String(timeRemaining.minutes).padStart(2, "0")}
                      </div>
                      <div className="text-xs font-semibold text-[#888888]">Mins</div>
                    </div>

                    <div className="flex items-center text-5xl justify-center text-[#9CA3AF]">
                      :
                    </div>

                    <div className="text-center">
                      <div className="text-4xl flex items-center justify-center h-20 border border-[#393228] bg-[#2A241C] rounded-lg font-bold mb-2">
                        {String(timeRemaining.seconds).padStart(2, "0")}
                      </div>
                      <div className="text-xs font-semibold text-[#888888]">Secs</div>
                    </div>
                  </div>
                </div>

              </div>

              <button
                onClick={onConfirmLife}
                className="w-full bg-[#F2930D] hover:bg-[#F2930D] text-white py-4 rounded-lg font-bold transition mb-6 flex items-center justify-center gap-2"
              >
                <img src={thumbprintIcon} className="w-5 h-5" alt="Thumbprint" />

                Confirm I'm Alive
              </button>

              <div className="text-xs text-gray-300 text-center mt-6 flex items-center justify-between gap-4">
                <div className="flex gap-1 items-center">
                  <img src={lockIcon} className="w-3 h-3" alt="Lock" />
                  <span>Secured by Multi-sig Protocol</span>
                </div>
                <span>
                  Something is wrong? Contact Support
                </span>
              </div>

            </div>
          </div>

          <p className="text-center text-gray-600 text-xs mt-8 mb-20 [font-family:'Manrope',Helvetica]">
            CIP Protocol ID: #B82-591-A • Status:{" "}
            <span className="text-[#F2930D]">
              AWAITING CONFIRMATION
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
