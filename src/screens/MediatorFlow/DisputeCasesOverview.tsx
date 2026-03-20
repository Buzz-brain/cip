import {
  Search,
  Plus,
  ChevronDown,
  Bell,
  User,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface DisputeCasesOverviewProps {
  onLogout?: () => void;
  onCreateCase?: () => void;
}

const casesData = [
  {
    id: "#8821",
    name: "Estate of J. Doe",
    executor: "Executor: 0x4a...8B2",
    chain: "Ethereum",
    chainColor: "from-blue-500 to-blue-600",
    value: "$1,250,000",
    status: "Voting Open",
    statusColor: "bg-orange-500/20 text-orange-400",
    time: "48h",
    avatar: "JD",
  },
  {
    id: "#8815",
    name: "Estate of A. Smith",
    executor: "Executor: 0x9f...3C1",
    chain: "Polygon",
    chainColor: "from-purple-500 to-purple-600",
    value: "$45,200",
    status: "Pending Review",
    statusColor: "bg-orange-500/20 text-orange-400",
    time: "5 Days",
    avatar: "AS",
  },
  {
    id: "#8792",
    name: "Trust of K. Nakamoto",
    executor: "Executor: 0x1a...F99",
    chain: "BNB Chain",
    chainColor: "from-yellow-500 to-yellow-600",
    value: "$12,850,000",
    status: "Voting Open",
    statusColor: "bg-orange-500/20 text-orange-400",
    time: "12h",
    avatar: "KN",
  },
  {
    id: "#8650",
    name: "Estate of B. Lovelace",
    executor: "Executor: 0x2b...D22",
    chain: "Ethereum",
    chainColor: "from-blue-500 to-blue-600",
    value: "$890,000",
    status: "Resolved",
    statusColor: "bg-green-500/20 text-green-400",
    time: "-",
    avatar: "BL",
  },
  {
    id: "#8601",
    name: "Estate of M. Turing",
    executor: "Executor: 0x7c...A11",
    chain: "Gnosis",
    chainColor: "from-green-500 to-green-600",
    value: "$2,100,000",
    status: "Pending Review",
    statusColor: "bg-orange-500/20 text-orange-400",
    time: "6 Days",
    avatar: "MT",
  },
];

export const DisputeCasesOverview = ({
  onLogout = () => {},
  onCreateCase = () => {},
}: DisputeCasesOverviewProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

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
            <button
              onClick={onLogout}
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all"
            >
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
                <TrendingUp className="w-3 h-3" />
                +23.4% this week
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Dispute Cases Overview
            </h1>
            <p className="text-gray-400">
              Manage and resolve inheritance disputes across multiple chains.
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by Case ID, Owner, or Mediator..."
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <button
              onClick={onCreateCase}
              className="ml-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create New Case
            </button>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-800/30">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Case ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Owner Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Chain
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Value (USD)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Time Remaining
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {casesData.map((caseItem, index) => (
                    <tr
                      key={index}
                      className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span className="text-gray-300 font-medium flex items-center gap-2">
                          <span>🔐</span>
                          {caseItem.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${caseItem.chainColor} flex items-center justify-center text-white text-xs font-bold`}
                          >
                            {caseItem.avatar.substring(0, 1)}
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {caseItem.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {caseItem.executor}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          <span className="text-gray-300 text-sm">
                            {caseItem.chain}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">
                          {caseItem.value}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${caseItem.statusColor}`}
                        >
                          {caseItem.status === "Resolved" ? "✓" : "⏳"}{" "}
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          {caseItem.status !== "Resolved" && <span>⏱</span>}
                          <span className="text-sm">{caseItem.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-800/30">
              <p className="text-sm text-gray-400">Showing 1-5 of 24 cases</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors text-sm">
                  Previous
                </button>
                <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
