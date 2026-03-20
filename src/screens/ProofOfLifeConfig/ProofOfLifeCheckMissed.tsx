import { useState, useEffect } from "react";
import { Wallet, AlertTriangle, Zap } from "lucide-react";

interface ProofOfLifeCheckMissedProps {
  onConfirmLife?: () => void;
}

export const ProofOfLifeCheckMissed = ({ onConfirmLife = () => {} }: ProofOfLifeCheckMissedProps): JSX.Element => {
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
    <div className="min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden">
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-amber-950/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-amber-950/20 rounded-full blur-3xl"></div>

      <header className="bg-[#1a1a1a] border-b border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">CIP Protocol</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Support
            </a>
            <div className="px-3 py-1.5 bg-yellow-600/20 border border-yellow-600/40 rounded text-yellow-500 text-xs font-mono">
              0x4a...8f92 Connected
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-73px)] px-8">
        <div className="w-full max-w-2xl">
          <div className="border-2 border-amber-700/50 rounded-lg p-12 bg-gradient-to-b from-amber-950/30 to-transparent">
            <div className="flex justify-center mb-8">
              <div className="w-14 h-14 bg-amber-600/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-amber-500" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-center mb-2">
              Proof-of-Life Check Missed
            </h1>
            <p className="text-amber-500/80 text-center mb-8 font-medium">
              Critical Attention Required
            </p>

            <div className="bg-[#2a2a2a] rounded-lg p-8 mb-8">
              <p className="text-gray-300 text-center leading-relaxed mb-4">
                You've missed{" "}
                <span className="text-yellow-400 font-semibold">
                  2 check-ins
                </span>
                . To prevent the activation of your Cross-Chain Inheritance
                Protocol, please verify your status immediately.
              </p>
              <p className="text-gray-500 text-center text-sm">
                Your inheritance plan will enter{" "}
                <span className="text-yellow-400 font-semibold">
                  pre-execution review
                </span>{" "}
                automatically if the timer reaches zero.
              </p>
            </div>

            <div className="mb-8">
              <p className="text-amber-500 text-center mb-4 font-semibold flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Time Remaining Before Pre-Execution
              </p>
              <div className="grid grid-cols-4 gap-3 bg-[#1a1a1a] rounded-lg p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-500 mb-2">
                    {String(timeRemaining.days).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500">Days</div>
                </div>
                <div className="flex items-center justify-center text-gray-500">
                  :
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {String(timeRemaining.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500">Hours</div>
                </div>
                <div className="flex items-center justify-center text-gray-500">
                  :
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {String(timeRemaining.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500">Mins</div>
                </div>
                <div className="flex items-center justify-center text-gray-500">
                  :
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {String(timeRemaining.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500">Secs</div>
                </div>
              </div>
            </div>

            <button
              onClick={onConfirmLife}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-bold transition mb-6 flex items-center justify-center gap-2"
            >
              <span>📱</span>
              Confirm I'm Alive
            </button>

            <div className="flex gap-4 text-sm">
              <button className="flex-1 bg-transparent border border-gray-700 hover:border-gray-600 text-gray-300 py-3 rounded-lg font-medium transition">
                Something is wrong? Contact Support
              </button>
            </div>

            <p className="text-xs text-gray-600 text-center mt-6 flex items-center justify-center gap-4">
              <span>🔒 Secured by Multi-sig Protocol</span>
            </p>
          </div>

          <p className="text-center text-gray-600 text-xs mt-8">
            CIP Protocol ID: #B82-591-A • Status:{" "}
            <span className="text-amber-500 font-semibold">
              AWAITING CONFIRMATION
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
