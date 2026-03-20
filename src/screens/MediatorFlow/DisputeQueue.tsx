import { Search, ChevronLeft, Bell, User, Lock, Zap } from "lucide-react";
import { useState } from "react";

interface DisputeQueueProps {
  onBackToCase?: () => void;
}

export const DisputeQueue = ({ onBackToCase = () => {} }: DisputeQueueProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

  const decisionOptions = [
    {
      id: 1,
      title: "Approve Execution",
      description: "Proceed with inheritance",
      icon: "✓",
      color: "bg-green-500/20 border-green-500/50 text-green-400",
      action: "Approve Execution",
    },
    {
      id: 2,
      title: "Pause Execution",
      description: "Freeze funds, request info",
      icon: "⏸",
      color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
      action: "Pause Execution",
    },
    {
      id: 3,
      title: "Reject Action",
      description: "Invalidate executor action",
      icon: "✕",
      color: "bg-red-500/20 border-red-500/50 text-red-400",
      action: "Reject Action",
    },
    {
      id: 4,
      title: "Escalate Dispute",
      description: "Send to arbitration/DAO",
      icon: "⚖",
      color: "bg-purple-500/20 border-purple-500/50 text-purple-400",
      action: "Escalate Dispute",
    },
    {
      id: 5,
      title: "Dismiss Dispute",
      description: "Close case without action",
      icon: "✖",
      color: "bg-gray-500/20 border-gray-500/50 text-gray-400",
      action: "Dismiss Dispute",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-amber-900/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-900/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      <header className="relative z-20 bg-zinc-900/50 backdrop-blur-xl border-b border-zinc-800 sticky top-0">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white text-lg font-semibold">
              CIP Mediation
            </span>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Global search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <nav className="flex items-center gap-6 mr-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium"
            >
              Cases
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Governance
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1">
              <span className="text-orange-400 text-xs font-medium">
                0x4a...8B2
              </span>
            </div>
            <button className="relative p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
            <button className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex">
        <aside className="w-48 bg-zinc-900/50 backdrop-blur-xl border-r border-zinc-800 p-6">
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Dispute Queue
            </h3>
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-500 font-medium transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  📁
                </span>
                All Cases
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  👤
                </span>
                <span className="flex-1 text-left">My Assigned</span>
                <span className="text-xs bg-zinc-800 px-2 py-1 rounded">3</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  ⏳
                </span>
                Pending Review
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  🗳
                </span>
                Voting Open
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  ✓
                </span>
                Resolved
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Analytics
            </h3>
            <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
              <p className="text-xs text-gray-400 mb-1">Total Value Secured</p>
              <p className="text-2xl font-bold text-white mb-2">$42.8M</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span>↗</span>
                +23.4% this week
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <button
            onClick={onBackToCase}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back to Case</span>
          </button>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span>⚠</span>
                  Dispute Context
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">
                      Dispute Reason: Incorrect Asset Distribution
                    </h3>
                    <p className="text-sm text-gray-400">
                      The beneficiary claims that the executor initiated a
                      distribution of 500 ETH to an unknown wallet address
                      (0x99...22) which is not listed in the original
                      inheritance plan. The executor claims this is a required
                      tax payment wallet, but no documentation was provided
                      prior to the transaction initiation.
                    </p>
                  </div>

                  <div className="border-t border-zinc-700 pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-white mb-3">
                      Evidence Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                        <span className="text-lg">📄</span>
                        <div>
                          <p className="text-sm text-white">
                            Original Will.pdf
                          </p>
                          <p className="text-xs text-gray-500">
                            Uploaded by Beneficiary • 2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                        <span className="text-lg">🔗</span>
                        <div>
                          <p className="text-sm text-white">
                            Etherscan Transaction #0×22...99
                          </p>
                          <p className="text-xs text-gray-500">
                            Linked by Beneficiary • 2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                        <span className="text-lg">📋</span>
                        <div>
                          <p className="text-sm text-white">
                            Executor Rebuttal Statement
                          </p>
                          <p className="text-xs text-gray-500">
                            Posted by Executor • 1 day ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">
                    Case Activity
                  </h2>
                  <a
                    href="#"
                    className="text-orange-500 hover:text-orange-400 transition-colors text-sm"
                  >
                    View Full Log
                  </a>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Today, 10:23 AM
                    </p>
                    <p className="text-sm text-gray-300">
                      Mediator{" "}
                      <span className="text-orange-400 font-medium">
                        @CryptoLawyer
                      </span>{" "}
                      requested additional tax documentation from the Executor.
                    </p>
                  </div>
                  <div className="border-t border-zinc-700 pt-3">
                    <p className="text-xs text-gray-500 mb-1">
                      Yesterday, 04:15 PM
                    </p>
                    <p className="text-sm text-gray-300">
                      Beneficiary{" "}
                      <span className="text-green-400 font-medium">
                        @AliceDoe
                      </span>{" "}
                      submitted new evidence "Etherscan Transaction #0×22...99".
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/30 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Escrow State
                </h3>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-20 h-20 rounded-full border-4 border-orange-500/30 flex items-center justify-center mb-4">
                    <Lock className="w-10 h-10 text-orange-400" />
                  </div>
                  <p className="text-sm font-bold text-orange-400">FROZEN</p>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Funds are currently locked in the smart contract pending
                    mediator resolution.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                  Your Decision
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Cast your vote to resolve this dispute. This action is
                  recorded on-chain.
                </p>

                <div className="space-y-2">
                  {decisionOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`w-full text-left p-3 border rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/10 ${option.color}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{option.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{option.title}</p>
                          <p className="text-xs opacity-75">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Current Vote Tally
                </h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300">Approve</span>
                      <span className="text-sm text-gray-400">60%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-green-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
