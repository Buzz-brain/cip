import { Clock, Bell, Send } from "lucide-react";


export const SetInactivityGracePeriod = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#1a1410] text-white">
      <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold">I</span>
          </div>
          <span className="text-sm font-semibold">Inheritance Protocol</span>
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
            Set Inactivity Grace Period
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
            The grace period is a safety buffer that starts after your
            inactivity threshold is reached. During this time, you will receive
            urgent notifications to confirm you are alive before the plan
            executes.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400 text-sm font-medium">
              Step 4 of 5: Grace Period
            </span>
            <span className="text-orange-500 font-semibold text-sm ml-auto">
              80% Completed
            </span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-600 h-full rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>

        <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900/50 mb-8">
          <h2 className="text-white font-bold text-lg mb-12">How it works</h2>

          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-700 via-gray-600 to-transparent"></div>

            <div className="flex flex-col items-center relative z-10 flex-1">
              <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center bg-gray-900 mb-4">
                <Clock className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Phase 1</h3>
              <p className="text-gray-400 text-xs text-center">
                Inactivity Timer
              </p>
              <p className="text-gray-500 text-xs mt-2">e.g. 1 Year</p>
            </div>

            <div className="flex flex-col items-center relative z-10 flex-1">
              <div className="w-16 h-16 rounded-full border-2 border-orange-600 flex items-center justify-center bg-orange-600/20 mb-4">
                <Bell className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Phase 2</h3>
              <p className="text-orange-500 text-xs text-center font-semibold">
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
              <h3 className="text-white font-bold text-sm mb-1">Phase 3</h3>
              <p className="text-gray-400 text-xs text-center">
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
              <button className="border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition bg-gray-900/50">
                <div className="text-3xl font-bold text-white mb-2">3</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>

              <button className="border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition bg-gray-900/50">
                <div className="text-3xl font-bold text-white mb-2">7</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>

              <button className="border-2 border-orange-600 rounded-xl p-6 text-center transition bg-orange-600/5 relative">
                <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Recommended
                </div>
                <div className="text-3xl font-bold text-white mb-2">14</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition bg-gray-900/50">
                <div className="text-3xl font-bold text-white mb-2">30</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>

              <button className="border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition bg-gray-900/50">
                <div className="text-3xl font-bold text-white mb-2">60</div>
                <p className="text-gray-400 text-sm">Days</p>
              </button>

              <button className="border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition bg-gray-900/50">
                <div className="text-gray-500 text-sm font-medium mb-2">
                  ---
                </div>
                <p className="text-gray-400 text-sm">Custom</p>
              </button>
            </div>
          </div>

          <div className="border border-yellow-900/50 bg-yellow-900/10 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="text-yellow-600 text-xl mt-0.5">⚠</div>
              <h4 className="text-white font-bold">Important Note</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              If you do not confirm your life within this 14-day grace period,
              the Smart Contract will become executable by your beneficiaries.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Inactivity Threshold</span>
                <span className="text-white font-semibold">12 Months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Grace Period</span>
                <span className="text-orange-500 font-semibold">+ 14 Days</span>
              </div>
              <div className="border-t border-gray-700 pt-3 mt-3 flex items-center justify-between">
                <span className="text-gray-400">Total Time</span>
                <span className="text-white font-semibold">
                  ~ 12 Mo. 14 Days
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-12">
          <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition">
            Back
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition flex items-center gap-2">
            Continue
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
