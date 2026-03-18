import { useState, useEffect } from 'react';

interface GracePeriodActivePageProps {
  onConfirm?: () => void;
}

export const GracePeriodActive = (_props: GracePeriodActivePageProps): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-stone-950">
      <nav className="bg-stone-950 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 border-2 border-white rounded"></div>
            </div>
            <span className="text-white font-semibold text-base">CIP Protocol</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-stone-400 hover:text-white transition text-sm">Dashboard</a>
            <a href="#" className="text-stone-400 hover:text-white transition text-sm">Assets</a>
            <a href="#" className="text-stone-400 hover:text-white transition text-sm">Settings</a>
            <button className="w-10 h-10 bg-stone-700 rounded-full flex-shrink-0"></button>
          </div>
        </div>
      </nav>

      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-stone-900 rounded-2xl border border-stone-800 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-stone-800 rounded-full flex items-center justify-center border border-stone-700">
              <svg className="w-7 h-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4v2m0 4v2M12 3a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-white text-4xl font-bold mb-4 tracking-tight">Grace Period Active</h1>
            <p className="text-stone-400 text-base leading-relaxed">
              We were unable to process your recent renewal payment for the Premium Cross-Chain Plan.
            </p>
          </div>

          <div className="bg-stone-800 rounded-xl border border-stone-700 p-6 mb-8">
            <div className="text-orange-500 text-sm font-semibold mb-6 text-center">
              Time Remaining until Service Suspension
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center">
                <div className="bg-stone-900 rounded-lg px-4 py-3 mb-2 border border-stone-700 min-w-[70px]">
                  <div className="text-orange-500 text-4xl font-bold text-center">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                </div>
                <span className="text-stone-500 text-xs font-medium">Days</span>
              </div>

              <div className="text-stone-500 text-3xl font-light">:</div>

              <div className="flex flex-col items-center">
                <div className="bg-stone-900 rounded-lg px-4 py-3 mb-2 border border-stone-700 min-w-[70px]">
                  <div className="text-orange-500 text-4xl font-bold text-center">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                </div>
                <span className="text-stone-500 text-xs font-medium">Hours</span>
              </div>

              <div className="text-stone-500 text-3xl font-light">:</div>

              <div className="flex flex-col items-center">
                <div className="bg-stone-900 rounded-lg px-4 py-3 mb-2 border border-stone-700 min-w-[70px]">
                  <div className="text-orange-500 text-4xl font-bold text-center">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                </div>
                <span className="text-stone-500 text-xs font-medium">Minutes</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-3 bg-stone-800/50 rounded-lg border border-stone-700/50">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full ml-1.5"></div>
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-0.5">Inheritance Plan Paused</div>
                <div className="text-stone-400 text-xs leading-relaxed">Assets will not be distributed if a trigger event occurs during downtime.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-stone-800/50 rounded-lg border border-stone-700/50">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-0.5">Validators Deactivated</div>
                <div className="text-stone-400 text-xs leading-relaxed">Cross-chain verification nodes will be taken offline.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-stone-800/50 rounded-lg border border-stone-700/50">
              <svg className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <div className="flex-1">
                <div className="text-white text-sm font-semibold mb-0.5">Failed Method</div>
                <div className="text-stone-400 text-xs mb-2">Visa ending in •••• 4242</div>
                <div className="text-red-500 text-xs font-semibold">Expired</div>
              </div>
            </div>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200 mb-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Renew Now
          </button>

          <button className="w-full bg-transparent hover:bg-stone-800 text-white py-3 rounded-lg font-medium transition-colors duration-200 border border-stone-700 hover:border-stone-600">
            Update Payment Method
          </button>

          <div className="text-center mt-6">
            <p className="text-stone-500 text-xs">
              Contact support if you think this is an error
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
