import { FolderOpen, DollarSign, CheckCircle } from "lucide-react";
import AssignedInheritancePlans from "./ExecutorDashboardFlow/AssignedInheritancePlans";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const ExecutorDashboard = (): JSX.Element => {
  const { user } = useAuth();
  const [totalPlans, setTotalPlans] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | string | null>(null);

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
            <div className="text-gray-400 text-sm text-center py-8">No activity log</div>

              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-3 bg-[#3a3430] rounded w-16 mb-2"></div>
                  <div className="h-4 bg-[#3a3430] rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
