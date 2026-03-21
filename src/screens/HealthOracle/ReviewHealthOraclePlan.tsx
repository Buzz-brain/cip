import { ChevronLeft, AlertCircle, CheckCircle2 } from "lucide-react";

export const ReviewHealthOraclePlan = (): JSX.Element => {
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
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
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

      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Review Health Oracle Plan</h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
            Please verify the details of your Health Oracle configuration below.
            Ensure the assigned executor and document requirements are correct
            before finalizing the smart contract.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400 text-sm font-medium">
              Step 4 of 5: Review
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

        <div className="border border-orange-900/40 bg-gray-900/50 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">
                Plan Execution Condition
              </h3>
              <p className="text-gray-400 text-sm">
                This plan will execute only after verified proof of death
                through the assigned executor and accepted documents.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900/50">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-800">
              <div className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center">
                <span className="text-lg">🔧</span>
              </div>
              <h2 className="text-white font-bold">Assigned Executor</h2>
            </div>

            <div className="text-center py-8">
              <div className="text-3xl font-bold text-gray-300 mb-2">LE</div>
              <h3 className="text-white font-semibold text-sm">
                Legal Executor Node
              </h3>
              <p className="text-gray-500 text-xs mt-2">Designated Fiduciary</p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <input
                type="text"
                placeholder="0x71C...9A23"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-gray-400 text-sm focus:outline-none focus:border-orange-600 placeholder-gray-600"
                readOnly
              />
            </div>

            <div className="flex items-center gap-4 mt-6 text-xs">
              <span className="text-green-500 font-semibold">✓ Verified</span>
              <span className="text-gray-500">KYC Checked</span>
            </div>
          </div>

          <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900/50">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-800">
              <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <h2 className="text-white font-bold">Verification Criteria</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-2">
                  Selected Jurisdiction
                </label>
                <button className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-left text-white text-sm focus:outline-none focus:border-orange-600 flex items-center justify-between hover:border-gray-700 transition">
                  <span className="flex items-center gap-2">
                    <span>⚖️</span>
                    United States (California)
                  </span>
                  <span className="text-gray-600">▼</span>
                </button>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-medium mb-3">
                  Chosen Accepted Documents
                </label>
                <div className="space-y-2">
                  <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg px-4 py-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-white text-sm font-medium">
                      State-Issued Death Certificate
                    </span>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg px-4 py-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-white text-sm font-medium">
                      Medical Examiner's Report
                    </span>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg px-4 py-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-white text-sm font-medium">
                      Attending Physician Statement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Selection
          </button>
          <div className="flex items-center gap-3">
            <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition">
              Save as Draft
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition flex items-center gap-2">
              Confirm & Deploy
              <span>🚀</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
