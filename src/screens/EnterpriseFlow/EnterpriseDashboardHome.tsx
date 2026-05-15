import { useEffect, useState } from 'react';
// import AdminLayout from '../../Administrative/AdminLayout';
import { Card, CardContent } from '@components/ui/card';
import { useAuth } from '../../context/useAuth';
import { viewEnterpriseDashboard } from '../../lib/api/enterprise';
import { SkeletonCard } from '../../components/ui/skeleton-card';
import { toast } from 'react-toastify';

export default function EnterpriseDashboardHome(): JSX.Element {
  const { user } = useAuth();
  const token = user?.token;
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await viewEnterpriseDashboard(token).catch(() => null);
        const items = res && res.data && Array.isArray(res.data.plans) ? res.data.plans : [];
        setPlans(items);
      } catch (err: any) {
        toast.error(err?.message || 'Failed to fetch enterprise dashboard');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
            <div className="text-sm text-gray-400">Total Plans</div>
            <div className="text-white text-2xl font-semibold mt-2">{plans.length}</div>
          </div>
          <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
            <div className="text-sm text-gray-400">Active Plans</div>
            <div className="text-white text-2xl font-semibold mt-2">{plans.filter(p => !p.is_cancelled && p.is_funded).length}</div>
          </div>
          <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
            <div className="text-sm text-gray-400">Cancelled</div>
            <div className="text-white text-2xl font-semibold mt-2">{plans.filter(p => !!p.is_cancelled).length}</div>
          </div>
        </div>

        <Card className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
          <CardContent>
            <h3 className="text-white font-semibold mb-3">Recent Plans</h3>
            {plans.length === 0 ? (
              <div className="text-gray-400">No plans</div>
            ) : (
              <div className="space-y-3">
                {plans.slice(0, 8).map((p:any) => (
                  <div key={p.id} className="p-3 bg-[#13100d] border border-[#2a2520] rounded flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{p.name || `Plan #${p.id}`}</div>
                      <div className="text-xs text-gray-400">{p.crypto_asset || '—'} • {p.is_cancelled ? 'Cancelled' : (p.is_funded ? 'Funded' : 'Unfunded')}</div>
                    </div>
                    <div className="text-sm text-gray-300">{p.amount ?? '—'}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
