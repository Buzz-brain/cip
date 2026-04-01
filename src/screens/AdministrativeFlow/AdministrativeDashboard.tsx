import { useEffect, useState } from "react";
import {
  Users,
  FolderKanban,
  HardDrive,
  Ticket,
  Circle,
  Clock,
  MoreVertical,
  Zap,
  Bell,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { ConnectWalletButton } from "../../components/ConnectWalletButton";
import { Link } from "react-router-dom";

export interface AnalyticsStat {
  id: string;
  stat_type: string;
  value: number;
  change_percent: number;
  additional_info?: string;
  date: string;
  created_at: string;
}

export interface UserRegistration {
  id: string;
  date: string;
  count: number;
  created_at: string;
}

export interface PlanDistribution {
  id: string;
  protocol: string;
  allocation: number;
  created_at: string;
}

export interface JobLog {
  id: string;
  job_id: string;
  timestamp: string;
  trigger_type: "Automated" | "Manual";
  status: "Success" | "Processing" | "Failed";
  created_at: string;
}

const sidebarMenuItems = [
  { icon: "📊", label: "Dashboard", id: "dashboard" },
  { icon: "➕", label: "Create Plan", id: "create-plan" },
  { icon: "👥", label: "Beneficiaries", id: "beneficiaries" },
  { icon: "🏛️", label: "Asset Registry", id: "asset-registry" },
];

const systemMenuItems = [
  { icon: "⚙️", label: "Settings", id: "settings" },
  { icon: "❓", label: "Support", id: "support" },
];

export const AdministrativeDashboard = (): JSX.Element => {
  const [stats, setStats] = useState<AnalyticsStat[]>([]);
  const [registrations, setRegistrations] = useState<UserRegistration[]>([]);
  const [distribution, setDistribution] = useState<PlanDistribution[]>([]);
  const [jobLogs, setJobLogs] = useState<JobLog[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const mockStats: AnalyticsStat[] = [
      {
        id: "s-total",
        stat_type: "total_users",
        value: 1245,
        change_percent: 12,
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        id: "s-plans",
        stat_type: "plans_created",
        value: 342,
        change_percent: 5,
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        id: "s-storage",
        stat_type: "storage_used",
        value: 128,
        change_percent: -2,
        additional_info: "GB",
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        id: "s-tickets",
        stat_type: "pending_tickets",
        value: 7,
        change_percent: 0,
        additional_info: "urgent",
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ];

    const mockRegistrations: UserRegistration[] = [
      {
        id: "r1",
        date: new Date().toISOString(),
        count: 8,
        created_at: new Date().toISOString(),
      },
      {
        id: "r2",
        date: new Date().toISOString(),
        count: 12,
        created_at: new Date().toISOString(),
      },
      {
        id: "r3",
        date: new Date().toISOString(),
        count: 6,
        created_at: new Date().toISOString(),
      },
      {
        id: "r4",
        date: new Date().toISOString(),
        count: 14,
        created_at: new Date().toISOString(),
      },
      {
        id: "r5",
        date: new Date().toISOString(),
        count: 10,
        created_at: new Date().toISOString(),
      },
    ];

    const mockDistribution: PlanDistribution[] = [
      {
        id: "d1",
        protocol: "Protocol A",
        allocation: 45,
        created_at: new Date().toISOString(),
      },
      {
        id: "d2",
        protocol: "Protocol B",
        allocation: 30,
        created_at: new Date().toISOString(),
      },
      {
        id: "d3",
        protocol: "Protocol C",
        allocation: 25,
        created_at: new Date().toISOString(),
      },
    ];

    const mockLogs: JobLog[] = [
      {
        id: "l1",
        job_id: "job_0x123",
        timestamp: new Date().toISOString(),
        trigger_type: "Automated",
        status: "Success",
        created_at: new Date().toISOString(),
      },
      {
        id: "l2",
        job_id: "job_0x124",
        timestamp: new Date().toISOString(),
        trigger_type: "Manual",
        status: "Processing",
        created_at: new Date().toISOString(),
      },
      {
        id: "l3",
        job_id: "job_0x125",
        timestamp: new Date().toISOString(),
        trigger_type: "Automated",
        status: "Failed",
        created_at: new Date().toISOString(),
      },
    ];

    setStats(mockStats);
    setRegistrations(mockRegistrations);
    setDistribution(mockDistribution);
    setJobLogs(mockLogs);
  }

  const totalUsers = stats.find((s) => s.stat_type === "total_users");
  const plansCreated = stats.find((s) => s.stat_type === "plans_created");
  const storageUsed = stats.find((s) => s.stat_type === "storage_used");
  const pendingTickets = stats.find((s) => s.stat_type === "pending_tickets");

  const totalRegistrations = registrations.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="flex min-h-screen bg-[#0f0c0a]">
      {/* Sidebar */}
      <div className="w-56 bg-[#1a1410] border-r border-[#3a2f1e] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#3a2f1e]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#ff6600] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🛡️</span>
            </div>
            <div>
              <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                CIP Protocol
              </div>
              <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                Secure Multi-Chain Legacy
              </div>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {sidebarMenuItems.map((item) => {
            let href = "#";
            if (item.id === "create-plan") href = "/create-plan";
            if (item.id === "asset-registry") href = "/asset-selection";

            return (
              <Link
                key={item.id}
                to={href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors block ${
                  item.id === "dashboard"
                    ? "bg-[#332619] text-white"
                    : "text-[#b8a494] hover:bg-[#2a1f10] hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* System Menu */}
        <div className="border-t border-[#3a2f1e] p-4 space-y-2">
          {systemMenuItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#8b7664] hover:bg-[#2a1f10] hover:text-white transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-[#3a2f1e] p-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2a1f10]">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xs truncate">
                alex.eth
              </div>
              <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                Online
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {/* Top Header */}
        <header className="bg-[#1a1410] border-b border-[#3a2f1e] px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#8b7664]">
              <span className="[font-family:'Noto_Sans',Helvetica] text-sm">
                Protocol
              </span>
              <span>&gt;</span>
              <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                Dashboard
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-[#332619] hover:bg-[#3a2f1e] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#ff6600]" />
              </button>
              <button className="relative w-10 h-10 rounded-full bg-[#332619] hover:bg-[#3a2f1e] flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#8b7664]" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <ConnectWalletButton variant="default" showAddress={true} compact={false} />
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Users className="w-5 h-5" />}
              title="Total Active Users"
              value={totalUsers?.value.toLocaleString() || "0"}
              change={totalUsers?.change_percent || 0}
            />
            <StatCard
              icon={<FolderKanban className="w-5 h-5" />}
              title="Plans Created"
              value={plansCreated?.value.toLocaleString() || "0"}
              change={plansCreated?.change_percent || 0}
            />
            <StatCard
              icon={<HardDrive className="w-5 h-5" />}
              title="Storage Used"
              value={`${storageUsed?.value || 0} ${storageUsed?.additional_info || ""}`}
              change={storageUsed?.change_percent || 0}
            />
            <StatCard
              icon={<Ticket className="w-5 h-5" />}
              title="Pending Tickets"
              value={pendingTickets?.value.toString() || "0"}
              change={0}
              changeLabel={pendingTickets?.additional_info}
            />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    New Registrations
                  </h3>
                  <p className="text-gray-400 text-sm">
                    User growth over the last 30 days
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-white text-2xl font-bold">
                    {totalRegistrations.toLocaleString()}
                  </div>
                  <div className="text-green-500 text-sm">
                    +15% vs last month
                  </div>
                </div>
              </div>
              <RegistrationChart data={registrations} />
            </div>

            <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-white font-semibold text-lg mb-1">
                  Plan Asset Distribution
                </h3>
                <p className="text-gray-400 text-sm">
                  Current allocation across protocols
                </p>
              </div>
              <DistributionChart data={distribution} />
            </div>
          </div>

          <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">
                Recent iExec Job Logs
              </h3>
              <button className="text-orange-500 text-sm hover:text-orange-400">
                View All Logs
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2520]">
                    <th className="text-left text-gray-400 text-sm font-medium pb-3">
                      Job ID
                    </th>
                    <th className="text-left text-gray-400 text-sm font-medium pb-3">
                      Timestamp
                    </th>
                    <th className="text-left text-gray-400 text-sm font-medium pb-3">
                      Trigger Type
                    </th>
                    <th className="text-left text-gray-400 text-sm font-medium pb-3">
                      Status
                    </th>
                    <th className="text-left text-gray-400 text-sm font-medium pb-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-[#2a2520] hover:bg-[#2a2520]/30"
                    >
                      <td className="py-4 text-white text-sm font-mono">
                        {log.job_id}
                      </td>
                      <td className="py-4 text-gray-400 text-sm">
                        {new Date(log.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZoneName: "short",
                        })}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          {log.trigger_type === "Automated" ? (
                            <Circle className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                          {log.trigger_type}
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            log.status === "Success"
                              ? "bg-green-500/10 text-green-500"
                              : log.status === "Processing"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {log.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="p-1 hover:bg-[#2a2520] rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function StatCard({
  icon,
  title,
  value,
  change,
  changeLabel,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
  changeLabel?: string;
}) {
  return (
    <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-[#2a2520] rounded-lg text-orange-500">
          {icon}
        </div>
        {changeLabel ? (
          <span className="text-red-500 text-xs font-medium">
            {changeLabel}
          </span>
        ) : change > 0 ? (
          <span className="text-green-500 text-xs font-medium">+{change}%</span>
        ) : null}
      </div>
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className="text-white text-2xl font-bold">{value}</div>
    </div>
  );
}

function RegistrationChart({ data }: { data: UserRegistration[] }) {
  const maxCount = Math.max(...data.map((d) => d.count));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.count / maxCount) * 80;
    return `${x},${y}`;
  });

  return (
    <div className="h-48 relative">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="#f97316"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function DistributionChart({ data }: { data: PlanDistribution[] }) {
  const maxAllocation = Math.max(...data.map((d) => d.allocation));

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">{item.protocol}</span>
            <span className="text-white text-sm font-medium">
              {item.allocation}%
            </span>
          </div>
          <div className="h-16 bg-[#2a2520] rounded overflow-hidden">
            <div
              className="h-full bg-orange-600 transition-all duration-500"
              style={{ width: `${(item.allocation / maxAllocation) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
