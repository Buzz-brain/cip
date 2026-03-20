import { useState, useEffect } from "react";
import { Wallet, AlertTriangle } from "lucide-react";

export const CriticalAlert = (): JSX.Element => {
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
    <div className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

      <header className="bg-[#0f0f0f] border-b border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">CIP Protocol</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-white transition">
              Dashboard
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              My Plans
            </a>
            <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">A</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-73px)] px-8">
        <div className="w-full max-w-2xl">
          <div className="border-2 border-red-900/60 rounded-xl p-12 bg-gradient-to-b from-red-950/40 to-[#1a0a0a]">
            <div className="text-center mb-8">
              <p className="text-red-500 text-sm font-bold flex items-center justify-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4" />
                Action Required: Final Notice
                <AlertTriangle className="w-4 h-4" />
              </p>
            </div>

            <h1 className="text-5xl font-bold text-center mb-2 leading-tight">
              <span className="text-red-500">CRITICAL ALERT:</span>
              <br />
              Plan Execution Imminent
            </h1>

            <p className="text-gray-400 text-center mb-8 text-lg">
              You have missed{" "}
              <span className="text-red-400 font-bold">
                3 consecutive Proof-of-Life checks
              </span>
              .
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-8 mb-8 border border-red-900/30">
              <p className="text-amber-100 text-center leading-relaxed">
                Your inheritance plan will enter{" "}
                <span className="font-bold">automatic execution</span> and your
                assets will be transferred to your designated beneficiaries.
                This action cannot be stopped once initiated.
              </p>
            </div>

            <div className="mb-10">
              <p className="text-red-500 text-center mb-6 font-bold flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Time Remaining to Halt Execution
              </p>
              <div className="grid grid-cols-4 gap-4 bg-[#1a1a1a] rounded-lg p-8 border border-red-900/20">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">
                    {String(timeRemaining.days).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Days
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">
                    {String(timeRemaining.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Hours
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-500 mb-2">
                    {String(timeRemaining.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Mins
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-500 mb-2">
                    {String(timeRemaining.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Secs
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition mb-4 flex items-center justify-center gap-2">
              <span>⊗</span>I AM ALIVE - CANCEL EXECUTION
            </button>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="bg-transparent border border-gray-700 hover:border-gray-600 text-gray-300 py-3 rounded-lg font-medium transition">
                Get Urgent Support
              </button>
              <button className="bg-transparent border border-gray-700 hover:border-gray-600 text-gray-300 py-3 rounded-lg font-medium transition">
                View Plan Details
              </button>
            </div>

            <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-6 text-center">
              <p className="text-red-300 text-sm leading-relaxed flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  Failure to respond within the timeframe above will result in
                  the permanent transfer of assets to your designated
                  beneficiaries via Smart Contract execution. This action cannot
                  be undone once the timer reaches zero.
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
