import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ChevronRight,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Search,
} from "lucide-react";

export const ExecutorPlanXp = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1410] text-white">
      <header className="border-b border-[#3a3430] bg-[#1a1410]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-white font-semibold">CIP Protocol</span>
            </div>
            <div className="flex items-center gap-2 bg-[#2a2420] rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search plans, assets..."
                className="bg-transparent text-sm outline-none w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-white text-sm"
            >
              Dashboard
            </button>
            <button className="text-white text-sm">Plans</button>
            <button className="text-gray-400 hover:text-white text-sm">
              Governance
            </button>
            <button className="w-8 h-8 bg-[#2a2420] rounded-lg flex items-center justify-center">
              <span className="text-orange-500">🔔</span>
            </button>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <span>📊 Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span>Plan #XP-9921</span>
        </div>

        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">
                Plan #XP-9921: Estate of Jonathan Doe
              </h1>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm">
                Active
              </span>
            </div>
            <p className="text-gray-400">
              Manage assets, verify legal documents, and execute distribution
              protocols for the verified estate.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#2a2420] border border-[#3a3430] px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[#3a3430]">
              📄 Docs
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              🔑 Execute Transfer
            </button>
          </div>
        </div>

        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center flex-1">
              <div className="flex flex-col items-center relative z-10">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-orange-400 font-medium">
                  Triggered
                </span>
              </div>
              <div
                className="h-0.5 bg-orange-500 flex-1 mx-2 relative"
                style={{ top: "-16px" }}
              ></div>
            </div>

            <div className="flex items-center flex-1">
              <div className="flex flex-col items-center relative z-10">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-orange-400 font-medium">
                  Verified
                </span>
              </div>
              <div
                className="h-0.5 bg-[#3a3430] flex-1 mx-2 relative"
                style={{ top: "-16px" }}
              ></div>
            </div>

            <div className="flex items-center flex-1">
              <div className="flex flex-col items-center relative z-10">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-lg">💰</span>
                </div>
                <span className="text-sm text-orange-400 font-medium">
                  Tax Review
                </span>
              </div>
              <div
                className="h-0.5 bg-[#3a3430] flex-1 mx-2 relative"
                style={{ top: "-16px" }}
              ></div>
            </div>

            <div className="flex items-center">
              <div className="flex flex-col items-center relative z-10">
                <div className="w-12 h-12 bg-[#3a3430] rounded-full flex items-center justify-center mb-2">
                  <span className="text-gray-500 text-lg">📦</span>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  Distribution
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-[#2a2420] border border-orange-500/30 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-orange-400 text-xl mt-1">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-400 mb-1">
                    Volatility Warning Detected
                  </h3>
                  <p className="text-sm text-gray-300">
                    Solana (SOL) has dropped 18% in the last 7 days. Consider
                    initiating a stablecoin conversion before final
                    distribution.
                  </p>
                </div>
                <button className="bg-[#3a3430] hover:bg-[#4a4430] px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                  Review Actions
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Asset Breakdown</h2>
                <button className="bg-[#2a2420] border border-[#3a3430] px-4 py-2 rounded-lg text-sm hover:bg-[#3a3430]">
                  CSV Export
                </button>
              </div>

              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#3a3430] text-sm text-gray-400">
                      <th className="text-left p-4 font-medium">Asset</th>
                      <th className="text-left p-4 font-medium">Chain</th>
                      <th className="text-left p-4 font-medium">Balance</th>
                      <th className="text-left p-4 font-medium">Value (USD)</th>
                      <th className="text-left p-4 font-medium">7d Change</th>
                      <th className="text-left p-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#3a3430] hover:bg-[#3a3430]">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">Ξ</span>
                          </div>
                          <div>
                            <div className="font-medium">Ethereum</div>
                            <div className="text-xs text-gray-400">ETH</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-[#3a3430] px-2 py-1 rounded text-xs">
                          Ethereum Mainnet
                        </span>
                      </td>
                      <td className="p-4 text-sm">14.50 ETH</td>
                      <td className="p-4 text-sm font-medium">$28,400.00</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-green-400 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          +2.4%
                        </div>
                      </td>
                      <td className="p-4">
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-[#3a3430] hover:bg-[#3a3430]">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">◎</span>
                          </div>
                          <div>
                            <div className="font-medium">Solana</div>
                            <div className="text-xs text-gray-400">SOL</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-[#3a3430] px-2 py-1 rounded text-xs">
                          Solana
                        </span>
                      </td>
                      <td className="p-4 text-sm">450.00 SOL</td>
                      <td className="p-4 text-sm font-medium">$9,000.00</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-red-400 text-sm">
                          <TrendingDown className="w-4 h-4" />
                          -18.2%
                        </div>
                      </td>
                      <td className="p-4">
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#3a3430]">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">$</span>
                          </div>
                          <div>
                            <div className="font-medium">USD Coin</div>
                            <div className="text-xs text-gray-400">USDC</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-[#3a3430] px-2 py-1 rounded text-xs">
                          Polygon
                        </span>
                      </td>
                      <td className="p-4 text-sm">52,000.00 USDC</td>
                      <td className="p-4 text-sm font-medium">$52,000.00</td>
                      <td className="p-4">
                        <span className="text-gray-400 text-sm">0.0%</span>
                      </td>
                      <td className="p-4">
                        <button className="text-gray-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="border-t border-[#3a3430] p-4 flex items-center justify-between bg-[#2a2420]">
                  <span className="font-semibold">Total Portfolio Value</span>
                  <span className="text-2xl font-bold">$89,400.00</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Owner Information</h3>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#3a3430] rounded-full flex items-center justify-center">
                  <span className="text-gray-400">JD</span>
                </div>
                <div>
                  <div className="font-semibold">Jonathan Doe</div>
                  <div className="text-xs text-gray-400">
                    Estate ID: #ES1-002
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#3a3430] rounded-lg flex items-center justify-center">
                    <span>🔗</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">
                      Connected Wallet
                    </div>
                    <div className="text-sm font-mono">0x7fC...9A21</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#3a3430] rounded-lg flex items-center justify-center">
                    <span>⚠️</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Status</div>
                    <div className="text-sm text-red-400">
                      Inactive (92 Days)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#3a3430] rounded-lg flex items-center justify-center">
                    <span>🕐</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">
                      Last Activity
                    </div>
                    <div className="text-sm">Oct 12, 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
