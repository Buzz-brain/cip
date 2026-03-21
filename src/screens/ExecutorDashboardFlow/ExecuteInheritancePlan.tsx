// import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export const ExecuteInheritancePlan = (): JSX.Element => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1410] text-white">
      <header className="border-b border-[#3a3430] bg-[#1a1410] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-sm text-gray-400">CIP</span>
        </div>
        <div className="text-xs text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
          Mainnet Connected
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <span>Plans</span>
          <span>›</span>
          <span>#CIP-2849</span>
          <span>›</span>
          <span className="text-white">Execution</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Execute Inheritance Plan #CIP-2849
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Execute the final transfer of assets. Please review all legal
            documents and tax implications before proceeding. This action
            generates an irreversible MPC signature on the blockchain.
          </p>
          <button className="mt-4 bg-[#2a2420] border border-[#3a3430] hover:bg-[#3a3430] px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <span>📄</span>
            View Legal Docs
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Total Asset Value */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Asset Value</span>
              <button className="text-gray-400 hover:text-white">📋</button>
            </div>
            <div className="text-3xl font-bold mb-2">$4,250,000</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">+12.4% since audit</span>
            </div>
          </div>

          {/* Estimated Tax Liability */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">
                Estimated Tax Liability
              </span>
              <button className="text-gray-400 hover:text-white">📋</button>
            </div>
            <div className="text-3xl font-bold mb-2">$845,000</div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-400">
                Verified by TaxCore
              </span>
            </div>
          </div>

          {/* Network Gas Fee */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Network Gas Fee</span>
              <button className="text-gray-400 hover:text-white">📋</button>
            </div>
            <div className="text-3xl font-bold mb-2">~0.04 ETH</div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-400">
                High network congestion
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Execution Decision */}
          <div className="col-span-2">
            <div className="bg-orange-500 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Execution Decision</h2>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm font-medium">
                  Ready for Signing
                </span>
              </div>
              <p className="text-orange-100 mb-6">
                Your signature is required to release the assets.
              </p>

              <div className="bg-orange-600/30 border border-orange-400/50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      I verify that I have reviewed the{" "}
                      <span className="font-bold">Death Certificate</span> and
                      assume full legal responsibility for this execution. I
                      understand this will trigger a taxable event.
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white hover:bg-gray-100 text-[#1a1410] py-3 rounded-xl font-bold text-lg mb-3 flex items-center justify-center gap-2">
                <span>✓</span>
                Approve & Generate Signature
              </button>
              <p className="text-xs text-orange-100 text-center">
                Secured by Multi-Party Computation (MPC)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-4">Or Reject Plan</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Reason for Rejection
                    </label>
                    <input
                      type="text"
                      placeholder="Yoo, some reasons here"
                      className="w-full bg-[#2a2420] border border-[#3a3430] rounded-lg px-4 py-2 text-sm placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Action Type
                    </label>
                    <select className="w-full bg-[#2a2420] border border-[#3a3430] rounded-lg px-4 py-2 text-sm">
                      <option>Initiate Mediator Review</option>
                      <option>Escalate to Court</option>
                      <option>Request Extension</option>
                    </select>
                  </div>
                </div>

                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium">
                  Reject Execution
                </button>
              </div>
            </div>
          </div>

          {/* Plan Status Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6">Plan Status</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Oct 12, 2023</span>
                    <span className="text-sm font-medium">Plan Created</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Oct 15, 2023</span>
                    <span className="text-sm font-medium">Assets Staked</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Nov 07, 2023</span>
                    <span className="text-sm font-medium">
                      Proof of Death Verified
                    </span>
                  </div>
                </div>
                <div className="border-t border-[#3a3430] pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-yellow-400">Today</span>
                    <span className="text-sm font-medium text-yellow-400">
                      Awaiting Execution
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Beneficiaries</h3>
              <p className="text-xs text-gray-400 mb-4">
                3 Verified wallets ready to receive assets.
              </p>
              <div className="flex -space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-[#1a1410]"></div>
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full border-2 border-[#1a1410]"></div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-[#1a1410]"></div>
              </div>
              <button className="w-full mt-4 bg-[#3a3430] hover:bg-[#4a4430] px-4 py-2 rounded-lg text-sm">
                View All
              </button>
            </div>
          </div>
        </div>

        {/* Dispute State */}
        <div className="mt-8 bg-red-500/10 border-2 border-red-500/30 rounded-xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Dispute Active</h2>
              <p className="text-gray-300 mb-4">
                This plan has been flagged for Beneficiary Conflict. Assets are
                currently frozen on-chain. The mediator panel has been activated
                and all parties notified.
              </p>
              <div className="flex items-center gap-3">
                <button className="bg-[#3a3430] hover:bg-[#4a4430] px-6 py-2 rounded-lg text-sm font-medium">
                  Contact Mediator
                </button>
                <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-sm font-medium">
                  View Evidence Log
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
