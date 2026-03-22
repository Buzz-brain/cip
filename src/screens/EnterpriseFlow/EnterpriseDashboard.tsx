import {
  Grid3x3 as Grid3X3,
  Users,
  BookOpen,
  Lock,
  Search,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface EnterpriseDashboardProps {
  onNavigateToClients?: () => void;
  onLogout?: () => void;
  onNavigateToAccessControl?: () => void;
  onNavigateToAuditLogs?: () => void;
}

export const EnterpriseDashboard = ({
  onNavigateToClients = () => {},
  onNavigateToAccessControl = () => {},
  onNavigateToAuditLogs = () => {},
}: EnterpriseDashboardProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <aside className="w-48 bg-slate-950 text-white p-6 flex flex-col border-r border-slate-800">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">CIP</span>
          </div>
          <div>
            <p className="font-bold text-sm">CIP B2B</p>
            <p className="text-xs text-slate-400">TrustWallet</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="flex items-center gap-2 px-3 py-2 text-slate-400 text-sm hover:text-white transition">
            <Grid3X3 className="w-4 h-4" />
            <span>Dashboard</span>
          </div>
          <button
            onClick={onNavigateToClients}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm"
          >
            <Users className="w-4 h-4" />
            <span>Client Management</span>
          </button>
          <button
            onClick={() => {}}
            className="w-full flex items-center gap-2 px-3 py-2 text-orange-500 bg-orange-500/10 rounded text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            <span>Inheritance Plans</span>
          </button>
          <button
            onClick={onNavigateToAccessControl}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm"
          >
            <Lock className="w-4 h-4" />
            <span>Access Control</span>
          </button>
          <button
            onClick={onNavigateToAuditLogs}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Audit Logs</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <Grid3X3 className="w-4 h-4" />
            <span>API & Developer</span>
          </button>
        </nav>

        <div className="border-t border-slate-800 pt-4 mt-4">
          <p className="text-xs text-slate-500 px-3 mb-3 font-semibold">
            Systems
          </p>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Protocol Active</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs">Nodes Synced (12/12)</span>
          </button>
        </div>

        <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <Users className="w-4 h-4" />
            <span>Support</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-slate-900 flex flex-col">
        <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search global database..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
            <Settings className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
            <div className="flex items-center gap-2 pl-4 border-l border-slate-700">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                T
              </div>
              <div className="text-sm">
                <p className="text-white font-medium">Thomas K.</p>
                <p className="text-slate-400 text-xs">Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
              <span>Enterprise</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Inheritance Plans</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Inheritance Plans
            </h1>
            <p className="text-slate-400 text-sm">
              Manage and monitor inheritance protocols across all client
              entities. View status, assets, and trigger schedules.
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search by Plan ID, Owner Name..."
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-medium transition">
              <span>Export CSV</span>
            </button>
          </div>

          <div className="text-slate-400 text-sm mb-4">
            Showing 1-10 of 1,248
          </div>

          <div className="bg-slate-800 rounded border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Plan ID
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Owner Name (Client Entity)
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Plan Type
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Assets Allocated
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Next Trigger Date
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-orange-600 rounded text-white flex items-center justify-center text-xs">
                        □
                      </div>
                      <span className="font-mono text-orange-400">
                        #PL-9928
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">Acme Corp</p>
                      <p className="text-slate-500 text-xs">Corp. Treasury</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">
                    Dead Man's Switch
                  </td>
                  <td className="py-4 px-6 text-orange-400 font-medium">
                    $5,240,000.00
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Oct 12, 2024</td>
                  <td className="py-4 px-6 text-orange-400 hover:text-orange-300 cursor-pointer font-medium">
                    Details
                  </td>
                </tr>

                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-slate-600 rounded text-white flex items-center justify-center text-xs">
                        □
                      </div>
                      <span className="font-mono text-slate-400">#PL-3321</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">Globex Inc.</p>
                      <p className="text-slate-500 text-xs">Family Office</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">
                    Time-Locked Trust
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-medium">
                    $1,150,000.00
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-orange-400 text-xs">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      Triggered
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Action Req.</td>
                  <td className="py-4 px-6 text-orange-400 hover:text-orange-300 cursor-pointer font-medium">
                    Details
                  </td>
                </tr>

                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-red-700 rounded text-white flex items-center justify-center text-xs">
                        ◆
                      </div>
                      <span className="font-mono text-red-400">#PL-8812</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">Stark Ind.</p>
                      <p className="text-slate-500 text-xs">Executive Branch</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">
                    Multi-Sig Transfer
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-medium">
                    $12,500,000.00
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-red-400 text-xs">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      In Dispute
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Paused</td>
                  <td className="py-4 px-6 text-orange-400 hover:text-orange-300 cursor-pointer font-medium">
                    Resolve
                  </td>
                </tr>

                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-600 rounded text-white flex items-center justify-center text-xs">
                        ✓
                      </div>
                      <span className="font-mono text-slate-400">#PL-4492</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">Wayne Ltd.</p>
                      <p className="text-slate-500 text-xs">Private Trust</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">
                    Standard Inheritance
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-medium">
                    $850,000.00
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-orange-400 text-xs">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      Completed
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Executed</td>
                  <td className="py-4 px-6 text-orange-400 hover:text-orange-300 cursor-pointer font-medium">
                    Receipt
                  </td>
                </tr>

                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-orange-600 rounded text-white flex items-center justify-center text-xs">
                        □
                      </div>
                      <span className="font-mono text-orange-400">
                        #PL-7731
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">Acme Corp</p>
                      <p className="text-slate-500 text-xs">
                        Subsidiary Holdings
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">
                    Dead Man's Switch
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-medium">
                    $2,200,000.00
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Dec 01, 2024</td>
                  <td className="py-4 px-6 text-orange-400 hover:text-orange-300 cursor-pointer font-medium">
                    Details
                  </td>
                </tr>

                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-orange-600 rounded text-white flex items-center justify-center text-xs">
                        □
                      </div>
                      <span className="font-mono text-orange-400">
                        #PL-1029
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">Cyberdyne Sys</p>
                      <p className="text-slate-500 text-xs">Research Grant</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">Smart Will</td>
                  <td className="py-4 px-6 text-slate-400 font-medium">
                    $15,000,000.00
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">Jan 15, 2025</td>
                  <td className="py-4 px-6 text-orange-400 hover:text-orange-300 cursor-pointer font-medium">
                    Details
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 px-6 py-4 text-sm text-slate-400">
            <span>Displaying 10 of 1248 plans</span>
            <div>
              <span>Rows per page: </span>
              <select className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-300">
                <option>6</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
