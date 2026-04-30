import { useNavigate } from "react-router-dom";
import {
  FolderOpen,
  DollarSign,
  AlertTriangle,
  Activity,
  FileText,
  Upload,
  FileCheck,
  CheckCircle,
  Circle,
  AlertCircle,
  Clock,
} from "lucide-react";
import ExecutorSidebar from "../../components/ui/ExecutorSidebar";

export const ExecutorDashboard = (): JSX.Element => {
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/executor-dashboard' },
    { id: 'plans', label: 'Plans', href: '/executor-dashboard/executor-inheritance-plan' },
    { id: 'compliance', label: 'Compliance', href: '/executor-dashboard/compliance' },
    { id: 'history', label: 'History', href: '/executor-dashboard/executor-audit-log' },
    { id: 'mpc', label: 'MPC', href: '/executor-dashboard/mpc-share-management' },
  ];

  return (
    <div className="min-h-screen bg-[#1a1410] text-white flex">
      <ExecutorSidebar items={sidebarItems} />
      <div className="flex-1">
        <header className="border-b border-[#3a3430] bg-[#1a1410]">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-white font-semibold">CIP Protocol</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Ask CIP AI
              </button>
              <button className="w-8 h-8 bg-[#2a2420] rounded-lg flex items-center justify-center">
                <span className="text-orange-500">🔔</span>
              </button>
              <button className="text-gray-400 text-xs bg-[#2a2420] px-3 py-1 rounded">
                Hi, Jamie
              </button>
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Executor Dashboard</h1>
              <p className="text-gray-400">
                Manage your assigned inheritance plans, verify documents, and
                handle MPC approvals.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#1a3a2a] px-3 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-400 text-sm">System Operational</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <h2 className="text-xl font-semibold">Action Required</h2>
                </div>
                <span className="text-xs text-gray-400 bg-[#2a2420] px-3 py-1 rounded-full">3 Pending</span>
              </div>

              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#3a3430] text-sm text-gray-400">
                      <th className="text-left p-4 font-medium">Owner Name</th>
                      <th className="text-left p-4 font-medium">Plan Type</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Assets</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#3a3430] hover:bg-[#3a3430] cursor-pointer">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#3a3430] rounded-full flex items-center justify-center text-sm">JD</div>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-xs text-gray-400">Plan #402</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">Smart Will</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">
                          <Circle className="w-2 h-2 fill-current" />
                          Triggered
                        </span>
                      </td>
                      <td className="p-4 text-sm">⚪⚪ 2 BTC, 3 ETH</td>
                      <td className="p-4">
                        <button onClick={() => navigate("/executor-dashboard/mpc-share-management")} className="text-orange-400 text-sm hover:text-orange-300">Manage</button>
                      </td>
                    </tr>

                    <tr className="border-b border-[#3a3430] hover:bg-[#3a3430] cursor-pointer">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#3a3430] rounded-full flex items-center justify-center text-sm">JS</div>
                          <div>
                            <div className="font-medium">Jane Smith</div>
                            <div className="text-xs text-gray-400">Plan #881</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">Direct Trust</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">
                          <Circle className="w-2 h-2 fill-current" />
                          Pending
                        </span>
                      </td>
                      <td className="p-4 text-sm">💵 50k USDC</td>
                      <td className="p-4">
                        <button className="text-orange-400 text-sm hover:text-orange-300">Manage</button>
                      </td>
                    </tr>

                    <tr className="border-b border-[#3a3430] hover:bg-[#3a3430] cursor-pointer">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#3a3430] rounded-full flex items-center justify-center text-sm">RF</div>
                          <div>
                            <div className="font-medium">Robert Fox</div>
                            <div className="text-xs text-gray-400">Plan #215</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">Crypto Will</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                          <Circle className="w-2 h-2 fill-current" />
                          Active
                        </span>
                      </td>
                      <td className="p-4 text-sm">💼 Mixed Portfolio</td>
                      <td className="p-4">
                        <button className="text-orange-400 text-sm hover:text-orange-300">Manage</button>
                      </td>
                    </tr>

                    <tr className="hover:bg-[#3a3430] cursor-pointer">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#3a3430] rounded-full flex items-center justify-center text-sm">AL</div>
                          <div>
                            <div className="font-medium">Ada Lovelace</div>
                            <div className="text-xs text-gray-400">Plan #101</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">Smart Will</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </span>
                      </td>
                      <td className="p-4 text-sm">✓ Distributed</td>
                      <td className="p-4">
                        <button className="text-gray-400 text-sm hover:text-gray-300">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
                <h3 className="font-semibold mb-2">Compliance Health</h3>
                <p className="text-sm text-gray-400">Executor verification and document status at a glance.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Compliance Health</h3>
                <button className="text-orange-400 text-xs hover:text-orange-300">
                  View Report
                </button>
              </div>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#3a3430"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#a855f7"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56 * 0.85} ${2 * Math.PI * 56 * 0.15}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">85%</span>
                    <span className="text-xs text-gray-400">Healthy</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Executor ID Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Documents Submitted</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-300">Tax Summary Incomplete</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">MPC Nodes Ready</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#3a2820] to-[#2a2420] border border-[#4a3830] rounded-xl p-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Need legal guidance?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  CIP AI can help you understand local inheritance laws and tax
                  implications for your active plans.
                </p>
                <button className="text-orange-400 text-sm hover:text-orange-300 flex items-center gap-1">
                  Start Chat →
                </button>
              </div>
            </div>

            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
              <h3 className="font-semibold mb-4">Activity Log</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">2 hours ago</div>
                  <div className="text-sm">
                    Plan #402 status changed to{" "}
                    <span className="text-orange-400">Triggered</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Yesterday</div>
                  <div className="text-sm">
                    Uploaded Death Certificate for Plan #101
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">2 days ago</div>
                  <div className="text-sm">
                    Verified identity with KYC provider
                  </div>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  </div>
  );
};
