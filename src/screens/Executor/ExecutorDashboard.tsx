import { FolderOpen, DollarSign, CheckCircle } from "lucide-react";
import AssignedInheritancePlans from "./ExecutorDashboardFlow/AssignedInheritancePlans";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import useActivityLogs from "../../lib/hooks/useActivityLogs";
import { formatWhen } from "../../components/ActivityLogs/ActivityLogs";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const ExecutorDashboard = (): JSX.Element => {
  const { user } = useAuth();
  const [totalPlans, setTotalPlans] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | string | null>(null);
  const { logs, loading: logsLoading } = useActivityLogs(user?.token);

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      if (!user?.token) return;
      try {
        const res = await fetch(`${BACKEND_API_URL}/exec/dashboard`, {
          method: "GET",
          headers: {
            accept: "application/json",
            ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch executor stats");
        const data = await res.json();
        if (!mounted) return;
        setTotalPlans(typeof data.total_plans === 'number' ? data.total_plans : null);
        setTotalAmount(typeof data.total_amount === 'number' ? data.total_amount : (data.total_amount ?? null));
      } catch (err) {
        console.error('Failed to load executor dashboard stats', err);
      }
    }

    fetchStats();
    return () => { mounted = false; };
  }, [user?.token]);

  return (
    <main className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{`Welcome, ${user?.name ?? user?.email ?? (user?.publicKey ? `${user.publicKey.slice(0,6)}...${user.publicKey.slice(-4)}` : 'User')}`}</h1>
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

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-5">
          <div className="flex items-start justify-start mb-4">
            <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{totalPlans ?? '-'}</div>
          <div className="text-gray-400 text-sm">Total Plans Managed</div>
        </div>

        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-5">
          <div className="flex items-start justify-start mb-4">
            <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{typeof totalAmount === 'number' ? `$${totalAmount}` : (totalAmount ?? '~$0')}</div>
          <div className="text-gray-400 text-sm">Assets Under Management</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div>
            <AssignedInheritancePlans />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <h3 className="font-semibold mb-4">Activity Log</h3>
            <div className="space-y-4">
              {logsLoading ? (
                <div className="text-gray-400 text-sm text-center py-8">Loading activity...</div>
              ) : (!Array.isArray(logs) || logs.length === 0) ? (
                <div className="text-gray-400 text-sm text-center py-8">No activity log</div>
              ) : (
                // show latest 3 logs
                [...logs]
                  .sort((a: any, b: any) => Number(b.timestamp ?? b.created_at ?? b.time ?? 0) - Number(a.timestamp ?? a.created_at ?? a.time ?? 0))
                  .slice(0, 3)
                  .map((it: any, idx: number) => (
                    <div key={idx} className="p-3 bg-[#241C16] rounded border border-[#392f28]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">{it.title ?? it.message ?? it.event ?? it.msg ?? 'Activity'}</div>
                          {(it.body || it.details || it.data) && (
                            <div className="text-gray-400 text-sm mt-1">{it.body ?? it.details ?? JSON.stringify(it.data)}</div>
                          )}
                          <div className="text-xs text-[#b8a494] mt-2">{String(it.user ?? it.actor ?? '')} • <span className="ml-1">Plan: {String(it.plan_id ?? it.inherit_id ?? it.inheritance_id ?? '—')}</span></div>
                        </div>
                        <div className="text-xs text-[#8b7664] whitespace-nowrap">{formatWhen(it.timestamp ?? it.created_at ?? it.time)}</div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
