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
  Calendar,
  Download,
  Info,
} from "lucide-react";

interface AuditLogsProps {
  onBackToDashboard?: () => void;
  onLogout?: () => void;
}

export const AuditLogs = ({
  onBackToDashboard = () => {},
}: AuditLogsProps): JSX.Element => {
  const auditLogs = [
    {
      timestamp: "Oct 24, 2023",
      time: "14:32:09 UTC",
      actor: "Thomas K.",
      role: "Admin",
      actionType: "Access Modified",
      actionColor: "orange",
      description: "Updated permissions for user Sarah M.",
      note: "Role: Viewer → Manager",
    },
    {
      timestamp: "Oct 24, 2023",
      time: "10:18:52 UTC",
      actor: "System",
      role: "Automated",
      actionType: "Plan Executed",
      actionColor: "green",
      description: "Automated execution of Plan # 9921",
      note: "Trigger: Dead Man's Switch (Timer Expired)",
    },
    {
      timestamp: "Oct 24, 2023",
      time: "11:05:43 UTC",
      actor: "Sarah M.",
      role: "Manager",
      actionType: "Document Uploaded",
      actionColor: "orange",
      description: "Uploaded compliance document for Globex Inc.",
      note: "File: Compliance_YYJ.pdf (2.4 MB)",
    },
    {
      timestamp: "Oct 23, 2023",
      time: "09:47:10 UTC",
      actor: "Thomas K.",
      role: "Admin",
      actionType: "Client Added",
      actionColor: "orange",
      description: "Onboarded new enterprise client: Wayne Enterprises",
      note: "ID: 4437.. 8819",
    },
    {
      timestamp: "Oct 23, 2023",
      time: "03:22:15 UTC",
      actor: "Unknown Actor",
      role: "External",
      actionType: "Failed Login",
      actionColor: "red",
      description: "Multiple failed login attempts detected",
      note: "IP: 192.168.1.45 • Reason: Bad Credentials",
    },
    {
      timestamp: "Oct 22, 2023",
      time: "16:45:00 UTC",
      actor: "David L.",
      role: "Auditor",
      actionType: "Report Generated",
      actionColor: "slate",
      description: "Generated monthly activity report",
      note: "Range: Sep 01 - Sep 30",
    },
    {
      timestamp: "Oct 22, 2023",
      time: "14:10:33 UTC",
      actor: "Thomas K.",
      role: "Admin",
      actionType: "Plan Created",
      actionColor: "orange",
      description: "Created new inheritance plan for Stark Ind.",
      note: "Assets: 4 Wallets • Beneficiaries: 3",
    },
  ];

  const getActorColor = (actor: string) => {
    if (actor === "Thomas K.") return "bg-orange-500";
    if (actor === "System") return "bg-orange-600";
    if (actor === "Sarah M.") return "bg-blue-500";
    if (actor === "David L.") return "bg-slate-600";
    if (actor === "Unknown Actor") return "bg-red-700";
    return "bg-slate-600";
  };

  const getActorInitial = (actor: string) => {
    return actor
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

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
          <button
            onClick={onBackToDashboard}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <Users className="w-4 h-4" />
            <span>Client Management</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Inheritance Plans</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <Lock className="w-4 h-4" />
            <span>Access Control</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-orange-500 bg-orange-500/10 rounded text-sm font-medium">
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
                placeholder="Search logs, events, or transaction IDs..."
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
              <span className="text-white">Audit Logs</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Audit Logs
                </h1>
                <p className="text-slate-400 text-sm">
                  A comprehensive, immutable record of all significant actions
                  and events within your enterprise account for full
                  traceability.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm font-medium transition border border-slate-600">
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
                <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm font-medium transition border border-slate-600">
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded text-slate-300 hover:text-white transition text-sm">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">
                Showing 1-20 of 1,284 logs
              </span>
              <button className="text-slate-400 hover:text-white transition">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="text-slate-400 hover:text-white transition">
                <ChevronRight className="w-5 h-5 transform rotate-180" />
              </button>
            </div>
          </div>

          <div className="space-y-px bg-slate-800 rounded border border-slate-700 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-800 border-b border-slate-700 sticky top-0">
              <div className="col-span-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">
                Timestamp
              </div>
              <div className="col-span-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">
                Actor
              </div>
              <div className="col-span-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">
                Action Type
              </div>
              <div className="col-span-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">
                Details / Description
              </div>
              <div className="col-span-2 text-right text-xs font-medium text-slate-400 uppercase tracking-wide">
                Actions
              </div>
            </div>

            {auditLogs.map((log, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-700 hover:bg-slate-700/50 transition items-start"
              >
                <div className="col-span-2">
                  <p className="text-slate-300 text-sm font-medium">
                    {log.timestamp}
                  </p>
                  <p className="text-slate-500 text-xs">{log.time}</p>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 ${getActorColor(log.actor)} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                    >
                      {getActorInitial(log.actor)}
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm font-medium">
                        {log.actor}
                      </p>
                      <p className="text-slate-500 text-xs">• {log.role}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${
                      log.actionColor === "orange"
                        ? "bg-orange-600 text-orange-100"
                        : log.actionColor === "green"
                          ? "bg-green-600 text-green-100"
                          : log.actionColor === "red"
                            ? "bg-red-600 text-red-100"
                            : "bg-slate-600 text-slate-100"
                    }`}
                  >
                    {log.actionType}
                  </span>
                </div>

                <div className="col-span-4">
                  <p className="text-slate-300 text-sm font-medium mb-1">
                    {log.description}
                  </p>
                  <p className="text-slate-500 text-xs">{log.note}</p>
                </div>

                <div className="col-span-2 flex justify-end">
                  <button className="text-slate-400 hover:text-white transition">
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
            <span>Displaying 20 of 1,284 audit logs</span>
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-300 text-xs">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
