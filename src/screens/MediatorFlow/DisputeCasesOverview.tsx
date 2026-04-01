import {
  Search,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import gavelGreyBorderIcon from "@assets/gavel-gray-border.svg";

const casesData = [
  {
    id: "#8821",
    name: "Estate of J. Doe",
    executor: "Executor: 0x4a...8B2",
    chain: "Ethereum",
    chainColor: "bg-[#D4691133]",
    chainBorderColor: "border-[#D9770633]",
    value: "$1,250,000",
    status: "Open",
    statusColor: "bg-[#D473111A] text-orange-400",
    time: "48h",
    avatar: "JD",
  },
  {
    id: "#8815",
    name: "Estate of A. Smith",
    executor: "Executor: 0x9f...3C1",
    chain: "Polygon",
    chainColor: "bg-[#D4691133]",
    chainBorderColor: "border-[#D9770633]",
    value: "$45,200",
    status: "Pending",
    statusColor: "bg-[#D473111A] text-orange-400",
    time: "5 Days",
    avatar: "AS",
  },
  {
    id: "#8792",
    name: "Trust of K. Nakamoto",
    executor: "Executor: 0x1a...F99",
    chain: "BNB Chain",
    chainColor: "bg-[#16A34A33]",
    chainBorderColor: "border-[#16A34A33]",

    value: "$12,850,000",
    status: "Open",
    statusColor: "bg-[#D473111A] text-orange-400",
    time: "12h",
    avatar: "KN",
  },
  {
    id: "#8650",
    name: "Estate of B. Lovelace",
    executor: "Executor: 0x2b...D22",
    chain: "Ethereum",
    chainColor: "bg-[#39312833]",
    chainBorderColor: "border-[#39312833]",
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
    chainColor: "bg-[#D4691133]",
    chainBorderColor: "border-[#D9770633]",
    value: "$2,100,000",
    status: "Pending",
    statusColor: "bg-[#D473111A] text-orange-400",
    time: "6 Days",
    avatar: "MT",
  },
];

export const DisputeCasesOverview = (): JSX.Element => {
  const navigate = useNavigate();

  const onCreateCase = () => {
    navigate("/mediator-all-cases");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221710] text-white [font-family:'Manrope',Helvetica]">
      
      <Header />

      <div className="relative z-10 flex">
        <Sidebar />

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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#B9AB9D] tracking-wider">
                      Case ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#B9AB9D] tracking-wider">
                      Owner Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#B9AB9D] tracking-wider">
                      Chain
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#B9AB9D] tracking-wider">
                      Value (USD)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#B9AB9D] tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#B9AB9D] tracking-wider">
                      Time Remaining
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#B9AB9D] tracking-wider">
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
                          <img src={gavelGreyBorderIcon} className="w-4 h-4" alt="GavelIcon" />
                          {caseItem.id}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${caseItem.chainColor} border ${caseItem.chainBorderColor} flex items-center justify-center text-white text-xs font-bold`}
                          >
                            {caseItem.avatar.substring(0, 2)}
                          </div>

                          <div className="flex flex-col">
                            <p className="text-white text-sm font-medium">
                              {caseItem.name}
                            </p>
                            <p className="text-xs text-[#B9AB9D]">
                              {caseItem.executor}
                            </p>
                          </div>

                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          <span className="text-[#B9AB9D] text-sm">
                            {caseItem.chain}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#B9AB9D] font-medium">
                          {caseItem.value}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${caseItem.statusColor}`}>
                          {caseItem.status === "Resolved" ?
                            "✓" :
                            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mx-1" />
                          } {" "}
                          {caseItem.status}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[#B9AB9D]">
                          {caseItem.status !== "Resolved" && <span>⏱</span>}
                          <span className="text-sm">{caseItem.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#B9AB9D] hover:text-white transition-colors">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-800/30">
              <p className="text-sm text-gray-300">Showing 1-5 of 24 cases</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-gray-300 border border-[#393128] rounded-lg hover:text-white transition-colors text-sm">
                  Previous
                </button>
                <button className="px-3 py-1 text-gray-300 border border-[#393128] rounded-lg hover:text-white transition-colors text-sm">
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
