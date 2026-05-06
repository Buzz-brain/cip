import { useEffect, useState } from "react";
import { Users, FolderKanban, HardDrive } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/useAuth";
import { getDashboard, viewUsers } from "../../lib/api/admin";

export default function AdministrativeDashboard() {
  const { user } = useAuth();
  const token = user?.token;

  
  const [users, setUsers] = useState<any[]>([]);
  const [totalUsersCount, setTotalUsersCount] = useState<number | null>(null);
  const [totalInheritanceCount, setTotalInheritanceCount] = useState<number | null>(null);
  const [totalIexecJobsCount, setTotalIexecJobsCount] = useState<number | null>(null);
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [dashData, usersData] = await Promise.all([
          getDashboard(token).catch(() => null),
          viewUsers(token).catch(() => []),
        ]);
        // dashboard may return { status, message, data: { total_users, total_inheritance, total_iexec_jobs, recent_jobs } }
        if (dashData && typeof dashData === "object") {
          const payload = dashData.data || dashData;
          setTotalUsersCount(payload?.total_users ?? null);
          setTotalInheritanceCount(payload?.total_inheritance ?? null);
          setTotalIexecJobsCount(payload?.total_iexec_jobs ?? null);
          setRecentJobs(Array.isArray(payload?.recent_jobs) ? payload.recent_jobs : []);
        } else {
          setTotalUsersCount(null);
          setTotalInheritanceCount(null);
          setTotalIexecJobsCount(null);
          setRecentJobs([]);
        }

        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // prefer backend totals when available
  const totalUsers = totalUsersCount ?? users.length;
  const plansCreated = totalInheritanceCount ?? 0;
  

  if (loading) return <AdminLayout title="Admin Dashboard"><div className="text-gray-400">Loading...</div></AdminLayout>;

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <StatCard icon={<Users className="w-5 h-5" />} title="Total Active Users" value={String(totalUsers ?? 0)} change={0} />
          <StatCard icon={<FolderKanban className="w-5 h-5" />} title="Plans Created" value={String(plansCreated ?? 0)} change={0} />
          <StatCard icon={<HardDrive className="w-5 h-5" />} title="iExec Jobs" value={String(totalIexecJobsCount ?? 0)} change={0} />
        </div>

        <div className="rounded-xl border border-[#2a2520] bg-[#1a1510] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-white font-semibold">Role & Access Control</h3>
              <p className="text-gray-400 text-sm mt-2">
                Manage all admin account roles from one page with fast sidebar navigation.
              </p>
            </div>
            <Link to="/administrative/role-access-control" className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
              Go to Role Access Control
            </Link>
          </div>
        </div>
        
        <div className="mt-6 bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Recent iExec Job Logs</h3>
          {recentJobs.length === 0 ? (
            <div className="text-gray-400">No recent jobs</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 text-xs border-b border-[#2a2520]">
                    <th className="py-2">Task ID</th>
                    <th className="py-2">Plan</th>
                    <th className="py-2">Trigger</th>
                    <th className="py-2">Processed</th>
                    <th className="py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentJobs.map((job:any) => (
                    <tr key={job.id} className="border-b border-[#2a2520]">
                      <td className="py-3 align-top text-white">{String(job.task_id).slice(0, 14)}... <div className="text-gray-400 text-xs">{String(job.task_id)}</div></td>
                      <td className="py-3 align-top text-white">{job.plan_name || job.plan_id}</td>
                      <td className="py-3 align-top text-gray-300">{job.trigger_type}</td>
                      <td className="py-3 align-top">{job.processed ? <span className="text-green-400">Yes</span> : <span className="text-yellow-400">No</span>}</td>
                      <td className="py-3 align-top text-gray-300">{job.created_at ? new Date(Number(job.created_at) * 1000).toLocaleString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
