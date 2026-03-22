import { Clock, AlertCircle } from "lucide-react";


export const ConfirmInactivityOraclePlan = (): JSX.Element => {
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
            Review Inactivity Oracle Plan
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
            Please review the configuration for your Inactivity Oracle. Ensure
            the timing and verification methods meet your security and
            convenience needs before finalizing.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400 text-sm font-medium">
              Step 4 of 5: Review Setup
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

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900/50">
            <div className="flex items-start gap-3 mb-6">
              <Clock className="w-6 h-6 text-gray-500 flex-shrink-0 mt-0.5" />
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
            <div className="flex items-start gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
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

        <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900/50 mb-8">
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
            <div className="border border-gray-800 rounded-xl p-6 bg-gray-800/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💳</span>
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

            <div className="border border-gray-800 rounded-xl p-6 bg-gray-800/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📱</span>
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

        <div className="flex items-center justify-between">
          <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition">
            Back
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition flex items-center gap-2">
            Confirm Plan
            <span>✓</span>
          </button>
        </div>
      </main>
    </div>
  );
}
