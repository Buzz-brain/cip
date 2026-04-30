// import { useNavigate } from "react-router-dom";
import {
  Download,
  Play,
  FileText,
  Lock,
  Zap,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const ExecutorAuditLog = (): JSX.Element => {
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
            Plans
          </button>
          <button className="text-white text-sm">Audit Log</button>
          <button className="text-gray-400 hover:text-white text-sm">
            Settings
          </button>
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
        </nav>
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Executor Audit Log</h1>
            <p className="text-gray-400">
              Traceable history of all plan activities, verifications, and asset
              movements.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Log
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Plan Status</span>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold">Executing</div>
          </div>

          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Events</span>
              <span className="text-orange-400">📊</span>
            </div>
            <div className="text-3xl font-bold">42</div>
          </div>

          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Last Updated</span>
              <span className="text-orange-400">⏰</span>
            </div>
            <div className="text-3xl font-bold">2 mins ago</div>
          </div>
        </div>

        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
              <span>▶</span>
              All Events
            </button>
            <button className="flex items-center gap-2 bg-[#3a3430] hover:bg-[#4a4430] px-4 py-2 rounded-lg text-sm">
              <span>⚖️</span>
              Legal
            </button>
            <button className="flex items-center gap-2 bg-[#3a3430] hover:bg-[#4a4430] px-4 py-2 rounded-lg text-sm">
              <span>⚙️</span>
              Technical
            </button>
            <button className="flex items-center gap-2 bg-[#3a3430] hover:bg-[#4a4430] px-4 py-2 rounded-lg text-sm">
              <span>$</span>
              Financial
            </button>
            <input
              type="text"
              placeholder="Search hash or event..."
              className="flex-1 ml-auto bg-[#3a3430] border border-[#4a4430] rounded-lg px-4 py-2 text-sm placeholder-gray-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* Assets Released Event */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-green-400" />
                </div>
                <div className="w-0.5 h-24 bg-[#3a3430] mx-auto mt-2"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">
                      Assets Released to Beneficiary
                    </h3>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                      Confirmed
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    Today, 10:42 AM UTC
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Beneficiary</span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                      <span className="font-mono text-sm">0x71C...9A23</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Transaction Hash</span>
                    <button className="font-mono text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1">
                      0x88a...b1f4
                      <span>↗</span>
                    </button>
                  </div>
                </div>
                <button className="mt-4 text-orange-400 hover:text-orange-300 text-sm font-medium">
                  Show Details
                </button>
              </div>
            </div>
          </div>

          {/* Tax Summary Event */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500/20 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-400" />
                </div>
                <div className="w-0.5 h-24 bg-[#3a3430] mx-auto mt-2"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">Tax Summary Generated</h3>
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-medium">
                      Ready for Review
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    Today, 09:15 AM UTC
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-300 text-sm">
                    Inheritance tax calculation completed based on jurisdiction
                    Singapore . Document available for download.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-[#3a3430] px-3 py-2 rounded w-fit text-sm">
                  <FileText className="w-4 h-4" />
                  Tax_Summary_v1.pdf
                </div>
              </div>
            </div>
          </div>

          {/* MPC Signature Event */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500/20 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-400" />
                </div>
                <div className="w-0.5 h-24 bg-[#3a3430] mx-auto mt-2"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">
                      MPC Signature 2/3 Collected
                    </h3>
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-medium">
                      Pending
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    Today, 08:30 AM UTC
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">
                    Waiting for Executor C signature...
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-[#1a1410]"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-[#1a1410]"></div>
                    <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-[#1a1410]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Identity Verified Event */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-500/20 border-2 border-purple-500 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-purple-400" />
                </div>
                <div className="w-0.5 h-24 bg-[#3a3430] mx-auto mt-2"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">
                      Executor Identity Verified
                    </h3>
                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-medium">
                      Verified (ZK-Proof)
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    Yesterday, 14:20 PM UTC
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Method</span>
                    <span className="text-sm">Zero-Knowledge KYC</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Provider</span>
                    <span className="text-sm">Chainlink Identity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Oracle Event */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="w-0.5 h-16 bg-[#3a3430] mx-auto mt-2"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">
                      Health Oracle Triggered
                    </h3>
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
                      Confirmed
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">2 Days ago</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Inactivity threshold reached. Pulse check failed 3 times over
                  30 days.
                </p>
              </div>
            </div>
          </div>

          {/* Plan Created Event */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-600/50 border-2 border-gray-600 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Plan Created & Locked</h3>
                  <span className="text-gray-400 text-sm">1 Month ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
