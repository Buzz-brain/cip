// import { useNavigate } from "react-router-dom";
import { AlertTriangle, Cloud, Trash2 } from "lucide-react";

export const ExecutorDisputePlan = (): JSX.Element => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1410] text-white">
      <header className="border-b border-[#3a3430] bg-[#1a1410] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-semibold">Inheritance Protocol</span>
        </div>
        <nav className="flex items-center gap-8">
          <button className="text-gray-400 hover:text-white text-sm">
            Dashboard
          </button>
          <button className="text-gray-400 hover:text-white text-sm">
            My Plans
          </button>
          <button className="text-gray-400 hover:text-white text-sm">
            Executor Tasks
          </button>
          <button className="text-gray-400 hover:text-white text-sm">
            Settings
          </button>
          <button className="text-gray-400 hover:text-white">
            <span>🔔</span>
          </button>
          <button className="text-gray-400 hover:text-white">
            <span>⚙️</span>
          </button>
          <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
        </nav>
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dispute Plan Execution</h1>
          <p className="text-gray-400 text-sm">Plan ID: #4928-ETH</p>
        </div>

        {/* Escrow Freeze Alert */}
        <div className="bg-orange-900/30 border border-orange-500/40 rounded-xl p-4 mb-8 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold mb-1">Escrow Freeze Imminent</h3>
            <p className="text-sm text-gray-300">
              Initiating a dispute will immediately pause asset distribution.
              Assets will be locked in the smart contract until resolution.
            </p>
          </div>
        </div>

        <div className="bg-[#1a2420] border border-[#2a4430] rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-8">Reason for Dispute</h2>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Owner is still alive */}
            <button className="bg-[#1a3a2a] border-2 border-[#2a5a3a] hover:border-green-500 rounded-xl p-6 text-left transition">
              <div className="w-8 h-8 bg-[#2a4430] rounded-lg flex items-center justify-center mb-3">
                <span>📊</span>
              </div>
              <div className="text-white font-medium mb-2">
                Owner is still alive
              </div>
              <p className="text-sm text-gray-400">Proof of life required.</p>
            </button>

            {/* Incorrect Assets */}
            <button className="bg-[#1a3a2a] border-2 border-[#2a5a3a] hover:border-green-500 rounded-xl p-6 text-left transition">
              <div className="w-8 h-8 bg-[#2a4430] rounded-lg flex items-center justify-center mb-3">
                <span>📦</span>
              </div>
              <div className="text-white font-medium mb-2">
                Incorrect Assets
              </div>
              <p className="text-sm text-gray-400">
                Missing or wrong tokens listed.
              </p>
            </button>

            {/* Wrong Executor */}
            <button className="bg-[#1a3a2a] border-2 border-[#2a5a3a] hover:border-green-500 rounded-xl p-6 text-left transition">
              <div className="w-8 h-8 bg-[#2a4430] rounded-lg flex items-center justify-center mb-3">
                <span>⚠️</span>
              </div>
              <div className="text-white font-medium mb-2">Wrong Executor</div>
              <p className="text-sm text-gray-400">
                Executor acting in bad faith.
              </p>
            </button>

            {/* Family Disagreement */}
            <button className="bg-[#1a3a2a] border-2 border-[#2a5a3a] hover:border-green-500 rounded-xl p-6 text-left transition">
              <div className="w-8 h-8 bg-[#2a4430] rounded-lg flex items-center justify-center mb-3">
                <span>👨‍👩‍👧‍👦</span>
              </div>
              <div className="text-white font-medium mb-2">
                Family Disagreement
              </div>
              <p className="text-sm text-gray-400">
                Will contests or other disputes.
              </p>
            </button>

            {/* Other Legal Reason */}
            <button className="bg-[#1a3a2a] border-2 border-[#2a5a3a] hover:border-green-500 rounded-xl p-6 text-left transition">
              <div className="w-8 h-8 bg-[#2a4430] rounded-lg flex items-center justify-center mb-3">
                <span>⋯</span>
              </div>
              <div className="text-white font-medium mb-2">
                Other Legal Reason
              </div>
              <p className="text-sm text-gray-400">
                Please specify in description.
              </p>
            </button>
          </div>

          {/* Dispute Details */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Dispute Details</h3>
            <p className="text-sm text-gray-400 mb-4">
              Provide a detailed explanation of your claim
            </p>
            <textarea
              placeholder="Describe the dispute..."
              className="w-full bg-[#2a3a2a] border border-[#3a5a3a] rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-green-500 min-h-40"
            ></textarea>
          </div>

          {/* Evidence Upload */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Evidence Upload</h3>
            <div className="border-2 border-dashed border-[#3a5a3a] hover:border-green-500 rounded-xl p-12 text-center transition cursor-pointer">
              <Cloud className="w-8 h-8 text-gray-500 mx-auto mb-3" />
              <p className="text-white font-medium mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400 mb-4">
                SVG, PNG, JPG, PDF or MP3 (max. 10MB)
              </p>
              <button className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-500/30">
                Select Files
              </button>
            </div>

            {/* Uploaded File */}
            <div className="mt-4 bg-[#2a3a2a] border border-[#3a5a3a] rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-sm font-medium">
                    death_certificate_v1.pdf
                  </div>
                  <div className="text-xs text-gray-400">
                    2.4 MB • Uploaded 2h ago
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Agreement & Submit */}
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-4">
                By submitting this dispute, you relieve an on-chain arbitration
                process. You will be required to sign a transaction.{" "}
                <span className="text-red-400">Gas fees apply.</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-[#2a2420] hover:bg-[#3a3430] border border-[#3a3430] px-6 py-3 rounded-lg font-medium">
                Cancel
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                <span>✓</span>
                Sign & Submit Dispute
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
