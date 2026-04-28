import { useState, useEffect } from 'react';
import { Header } from "./Header";
import { Info } from "lucide-react";


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
    <div className="flex flex-col w-full min-h-screen bg-[#221810] text-white [font-family:'Manrope',Helvetica]">
      <Header />


      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-73px)] mt-20 mb-20">

        <div className="w-full max-w-2xl">
          <div className="border border-[#3A2E22] rounded-lg bg-[#2A2218] p-10">
            <div className="mt-5">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-[#EC7F131A] rounded-full flex items-center justify-center">
                  <Info className="w-7 h-7 text-[#EC7F13]" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white text-center mb-4">
                Grace Period Active
              </h1>
              <p className="text-[#C9AD92] px-20 mb-5 font-medium">
                We were unable to process your recent renewal payment for the Premium Cross-Chain Plan.
              </p>

            </div>



            <div className="mb-6">
              <div className="p-6 flex flex-col justify-center items-center">
                <p className="text-[#EC7F13] text-center mb-8 font-semibold gap-2">
                  Time Remaining until Service Suspension
                </p>

                <div className="flex justify-between w-[400px] text-[#EC7F13]">

                  <div className="text-center">
                    <div className="text-4xl flex items-center justify-center h-24 w-24 border border-[#3A2E22] bg-[#221910] rounded-lg font-bold text-[#EC7F13] mb-2">
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-[#9D8D7F]">Days</div>
                  </div>

                  <div className="flex items-center text-5xl h-24 w-[20px] justify-center text-[#9D8D7F]">
                    :
                  </div>

                  <div className="text-center">
                    <div className="text-4xl flex items-center justify-center h-24 w-24 border border-[#3A2E22] bg-[#221910] rounded-lg font-bold mb-2">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-[#9D8D7F]">Hours</div>
                  </div>

                  <div className="flex items-center text-5xl h-24 w-[20px] justify-center text-[#9D8D7F]">
                    :
                  </div>

                  <div className="text-center">
                    <div className="text-4xl flex items-center justify-center h-24 w-24 border border-[#3A2E22] bg-[#221910] rounded-lg font-bold mb-2">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-[#9D8D7F]">Mins</div>
                  </div>




                </div>
              </div>

            </div>

            <div className="mb-8">
              <div className="flex items-start gap-3 p-3 bg-[#221910] rounded-lg border border-[#3A2E22]">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full ml-1.5"></div>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold mb-0.5">Inheritance Plan Paused</div>
                  <div className="text-[#9D8D7F] text-xs leading-relaxed">Assets will not be distributed if a trigger event occurs during downtime.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#221910] mb-5 rounded-lg border border-[#3A2E22]">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold mb-0.5">Validators Deactivated</div>
                  <div className="text-[#9D8D7F] text-xs leading-relaxed">Cross-chain verification nodes will be taken offline.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#7F1D1D1A] rounded-lg border border-stone-700/50">
                <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <div className="flex justify-between w-full">
                  <div>

                    <div className="text-[#FECACA] text-sm font-semibold mb-0.5">Failed Method</div>
                    <div className="text-white text-xs mb-2">Visa ending in •••• 4242</div>
                  </div>
                  <div className="text-[#F87171] text-xs font-semibold">Expired</div>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#EC7F13] hover:bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200 mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Renew Now
            </button>

            <button className="w-full bg-transparent hover:bg-stone-800 text-white py-3 rounded-lg font-medium transition-colors duration-200 border border-[#3A2E22] hover:border-stone-600">
              Update Payment Method
            </button>

            <div className="text-center mt-6">
              <p className="text-[#9D8D7F] text-xs">
                Contact support if you think this is an error
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
