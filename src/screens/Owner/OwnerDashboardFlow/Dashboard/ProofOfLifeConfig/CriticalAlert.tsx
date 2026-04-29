import { useState, useEffect } from "react";
import { Info, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import thumbprintIcon from "@assets/thumbprint.svg";

export type CriticalAlertProps = {
  open?: boolean;
  onClose?: () => void;
};

export const CriticalAlert = (props?: CriticalAlertProps): JSX.Element | null => {
  const navigate = useNavigate();
  if (props && props.open === false) return null;
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 23,
    minutes: 59,
    seconds: 59,
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
    <div className="flex flex-col w-full min-h-screen bg-[#221010] text-white [font-family:'Manrope',Helvetica] ">
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
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-300 text-sm font-semibold"
          >
            My Plans
          </a>
          <div className="w-9 h-9 bg-gray-400 rounded-full"></div>
        </nav>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-73px)] mt-20 px-8">
        <div className="w-full max-w-2xl">
          <div className="border-2 border-[#EC13134D] rounded-xl bg-[#221010]">

            <div className="text-center bg-[#EC131333] rounded-t-xl border-b border-[#EC13134D] py-4">
              <p className="text-red-500 text-sm font-bold flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Action Required: Final Notice
                <AlertTriangle className="w-4 h-4" />
              </p>
            </div>

            <div className="p-12 pb-3">
              <h1 className="text-4xl font-bold text-center mb-4 leading-tight">
                <span className="text-[#EC1313]">CRITICAL ALERT:</span>
                <br />
                Plan Execution Imminent
              </h1>

              <p className="text-gray-400 text-center mb-8 text-md">
                You have missed{" "}
                <span className="text-white font-semibold">
                  3 consecutive Proof-of-Life checks
                </span>
                .
              </p>

              <div className="mb-10">
                <p className="text-[#EC1313] text-center mb-4 font-semibold text-sm flex items-center justify-center gap-2">
                  Time Remaining to Halt Execution
                </p>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-4xl flex items-center justify-center h-20 border border-[#EC131333] bg-[#00000066] rounded-lg font-bold mb-2">
                      {String(timeRemaining.days).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-[#CFBABA] tracking-wider">
                      Days
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl flex items-center justify-center h-20 border border-[#EC131333] bg-[#00000066] rounded-lg font-bold mb-2">
                      {String(timeRemaining.hours).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-[#CFBABA] tracking-wider">
                      Hours
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl flex items-center text-[#EC1313] justify-center h-20 border border-[#EC131333] bg-[#00000066] rounded-lg font-bold mb-2">
                      {String(timeRemaining.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-[#CFBABA] tracking-wider">
                      Mins
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl flex items-center text-[#EC1313] justify-center h-20 border border-[#EC131333] bg-[#00000066] rounded-lg font-bold mb-2">
                      {String(timeRemaining.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-[#CFBABA] tracking-wider">
                      Secs
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (props?.onClose) props.onClose(); else navigate("/owner-dashboard");
                }}
                className="w-full bg-[#EC1313] hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition mb-4 flex items-center justify-center gap-2"
              >
                                <img src={thumbprintIcon} className="w-5 h-5" alt="Thumbprint" />
                
                I AM ALIVE - CANCEL EXECUTION
              </button>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="bg-transparent border border-[#CFBABA33] hover:border-gray-600 text-[#CFBABA] py-3 rounded-lg font-medium transition">
                  Get Urgent Support
                </button>
                <button 
                  onClick={() => navigate("/view-plan-history")}
                  className="bg-transparent border border-[#CFBABA33] hover:border-gray-600 text-[#CFBABA] py-3 rounded-lg font-medium transition"
                >
                  View Plan Details
                </button>
              </div>

            </div>



            
          </div>
          <div className=" p-6 text-left">
              <p className="text-sm leading-relaxed flex items-start gap-3">
                <Info className="text-[#EC1313] w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-[#CFBABA]">
                  Failure to respond within the timeframe above will result in
                  the permanent transfer of assets to your designated
                  beneficiaries via Smart Contract execution. This action cannot
                  be undone once the timer reaches zero.
                </span>
              </p>
            </div>
        </div>
      </main>
    </div>
  );
}
