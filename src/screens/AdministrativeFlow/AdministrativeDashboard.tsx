import { useEffect, useState } from "react";
import { Users, FolderKanban, HardDrive, Ticket } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/useAuth";
import { getDashboard, viewUsers, viewExecutors, viewMediators, viewAdmins } from "../../lib/api/admin";

export default function AdministrativeDashboard() {
  const { user } = useAuth();
  const token = user?.token;

  const [stats, setStats] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [executors, setExecutors] = useState<any[]>([]);
  const [mediators, setMediators] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [dashData, usersData, execsData, medsData, admsData] = await Promise.all([
          getDashboard(token).catch(() => []),
          viewUsers(token).catch(() => []),
          viewExecutors(token).catch(() => []),
          viewMediators(token).catch(() => []),
          viewAdmins(token).catch(() => []),
        ]);
        setStats(Array.isArray(dashData) ? dashData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setExecutors(Array.isArray(execsData) ? execsData : []);
        setMediators(Array.isArray(medsData) ? medsData : []);
        setAdmins(Array.isArray(admsData) ? admsData : []);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const totalUsers = stats.find((s: any) => s.stat_type === "total_users");
  const plansCreated = stats.find((s: any) => s.stat_type === "plans_created");
  const storageUsed = stats.find((s: any) => s.stat_type === "storage_used");
  const pendingTickets = stats.find((s: any) => s.stat_type === "pending_tickets");

  if (loading) return <AdminLayout title="Admin Dashboard"><div className="text-gray-400">Loading...</div></AdminLayout>;

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          <StatCard icon={<Users className="w-5 h-5" />} title="Total Active Users" value={(users.length || totalUsers?.value || 0).toString()} change={totalUsers?.change_percent || 0} />
          <StatCard icon={<FolderKanban className="w-5 h-5" />} title="Plans Created" value={plansCreated?.value?.toLocaleString?.() || "0"} change={plansCreated?.change_percent || 0} />
          <StatCard icon={<HardDrive className="w-5 h-5" />} title="Storage Used" value={`${storageUsed?.value || 0} ${storageUsed?.additional_info || ""}`} change={storageUsed?.change_percent || 0} />
          <StatCard icon={<Ticket className="w-5 h-5" />} title="Pending Tickets" value={pendingTickets?.value?.toString?.() || "0"} change={0} changeLabel={pendingTickets?.additional_info} />
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1 bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">Users</h3>
            <div className="text-gray-400 text-sm mb-4">{users.length} users</div>
            <a href="/administrative/users" className="text-orange-500 hover:text-orange-400">Manage users →</a>
          </div>
          <div className="col-span-1 bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">Executors</h3>
            <div className="text-gray-400 text-sm mb-4">{executors.length} executors</div>
            <a href="/administrative/executors" className="text-orange-500 hover:text-orange-400">Manage executors →</a>
          </div>
          <div className="col-span-1 bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">Mediators</h3>
            <div className="text-gray-400 text-sm mb-4">{mediators.length} mediators</div>
            <a href="/administrative/mediators" className="text-orange-500 hover:text-orange-400">Manage mediators →</a>
          </div>
          <div className="col-span-1 bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">Admins</h3>
            <div className="text-gray-400 text-sm mb-4">{admins.length} admins</div>
            <a href="/administrative/admins" className="text-orange-500 hover:text-orange-400">Manage admins →</a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

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
