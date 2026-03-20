import { AlertTriangle, Upload, Lock } from "lucide-react";

export const OwnerDisputePlanExecution = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center">
            <span className="text-sm font-bold">I</span>
          </div>
          <span className="font-semibold">Inheritance Protocol</span>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-gray-300 hover:text-white text-sm">
            Dashboard
          </a>
          <a href="#" className="text-gray-300 hover:text-white text-sm">
            My Plans
          </a>
          <a href="#" className="text-gray-300 hover:text-white text-sm">
            Executor Tasks
          </a>
          <a href="#" className="text-gray-300 hover:text-white text-sm">
            Settings
          </a>
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300" />
          <div className="w-9 h-9 bg-yellow-600 rounded-full flex items-center justify-center text-sm font-bold">
            P
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h1 className="text-4xl font-bold mb-2">Dispute Plan Execution</h1>
            <p className="text-gray-400 mb-8">Plan ID: #4928-ETH</p>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-6">Reason for Dispute</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <button className="border-2 border-cyan-500/50 bg-cyan-500/10 rounded-lg p-6 text-left hover:border-cyan-500 transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyan-400 text-lg">↗</span>
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold mb-1">Owner is still alive</h3>
                  <p className="text-gray-400 text-sm">
                    Proof of life required.
                  </p>
                </button>

                <button className="border-2 border-gray-700 bg-transparent rounded-lg p-6 text-left hover:border-gray-600 transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-purple-400 text-lg">⬚</span>
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold mb-1">Incorrect Assets</h3>
                  <p className="text-gray-400 text-sm">
                    Missing or wrong tokens listed.
                  </p>
                </button>

                <button className="border-2 border-gray-700 bg-transparent rounded-lg p-6 text-left hover:border-gray-600 transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-orange-400 text-lg">⚡</span>
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold mb-1">Wrong Executor</h3>
                  <p className="text-gray-400 text-sm">
                    Executor acting in bad faith.
                  </p>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="border-2 border-gray-700 bg-transparent rounded-lg p-6 text-left hover:border-gray-600 transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-red-400 text-lg">M</span>
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold mb-1">Family Disagreement</h3>
                  <p className="text-gray-400 text-sm">
                    Will contests or other disputes.
                  </p>
                </button>

                <button className="border-2 border-gray-700 bg-transparent rounded-lg p-6 text-left hover:border-gray-600 transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-lg">⋯</span>
                    <div className="w-4 h-4 border-2 border-gray-600 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold mb-1">Other Legal Reason</h3>
                  <p className="text-gray-400 text-sm">
                    Please specify in description.
                  </p>
                </button>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Dispute Details</h2>
              <p className="text-gray-400 text-sm mb-3">
                Provide a detailed explanation of your claim
              </p>
              <textarea
                className="w-full bg-gray-900/50 border border-green-700/50 rounded-lg p-6 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-600 resize-none h-32"
                placeholder="Enter your dispute details..."
              ></textarea>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-6">Evidence Upload</h2>
              <div className="border-2 border-dashed border-green-700/50 rounded-lg p-16 text-center bg-green-950/10 hover:bg-green-950/20 transition cursor-pointer">
                <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <p className="text-white font-medium mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  SVG, PNG, JPG, PDF or MP3 (max. 10MB)
                </p>
                <button className="bg-transparent border border-green-700 hover:border-green-600 text-green-500 px-6 py-2 rounded-lg text-sm font-medium transition">
                  Select Files
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <Lock className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    death_certificate_v1.pdf
                  </p>
                  <p className="text-xs text-gray-600">
                    2.4 MB • Uploaded 2 days ago
                  </p>
                </div>
                <button className="text-gray-400 hover:text-red-500 text-lg">
                  ✕
                </button>
              </div>
            </section>

            <section className="bg-green-950/20 border border-green-700/50 rounded-lg p-6 mb-8">
              <p className="text-gray-300 text-sm text-center">
                By submitting this dispute, you initiate an on-chain arbitration
                process.
                <br />
                You will be required to sign a transaction.{" "}
                <span className="text-gray-400">Gas fees apply.</span>
              </p>
            </section>

            <div className="flex items-center justify-between">
              <button className="text-gray-300 hover:text-gray-400 font-medium transition">
                Cancel
              </button>
              <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition">
                <Lock className="w-4 h-4" />
                Sign & Submit Dispute
              </button>
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-orange-950/30 border border-orange-700/50 rounded-lg p-6 sticky top-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-orange-400 mb-1">
                    Escrow Freeze Imminent
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Initiating a dispute will immediately pause asset
                    distribution. Assets will be locked in the smart contract
                    until resolution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Bell(props: any) {
  return (
    <svg
      className={`${props.className || "w-6 h-6"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}
