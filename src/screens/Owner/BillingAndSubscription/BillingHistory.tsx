import { ChevronRight } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { Header } from "./Header";
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import { getSubscriptionHistory } from '../../../lib/api/auth';
import { usePlans } from '../../../lib/hooks/usePlans';

interface BillingPageProps {
  onManagePayment?: () => void;
}

const fallbackPricingNameMap: Record<number, string> = {
  1: 'Genesis',
  2: 'Guardian',
  3: 'Sovereign',
  4: 'Protocol',
};

function formatTs(iso?: string) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString();
  } catch (e) {
    return iso;
  }
}

export const BillingHistory = ({ onManagePayment }: BillingPageProps): JSX.Element => {
  const { user } = useAuth();
  const { plans: backendPlans } = usePlans();

  // Build pricing id -> display name map from backend plans when available
  const pricingNameMap: Record<number, string> = (backendPlans && backendPlans.length > 0)
    ? backendPlans.reduce((acc: Record<number,string>, p: any) => {
        acc[Number(p.id)] = String(p.name ?? p.title ?? `Plan ${p.id}`);
        return acc;
      }, {})
    : fallbackPricingNameMap;
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!user?.token) return;
      setLoading(true);
      try {
        const data = await getSubscriptionHistory(user.token);
        if (!mounted) return;
        // sort by start_date desc
        const sorted = Array.isArray(data) ? data.slice().sort((a,b) => (new Date(b.start_date).getTime() - new Date(a.start_date).getTime())) : [];
        setSubscriptions(sorted);
      } catch (err) {
        console.error('Failed to load subscription history', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [user?.token]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221710] text-white [font-family:'Manrope',Helvetica]">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-3xl font-semibold mb-2">Billing History</p>
            <p className="text-[#AFA89C]">Track your subscription payments and download invoices.</p>
          </div>
          <button className="bg-[#483223] text-sm hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition">
            <Wallet className="w-4 h-4" />
            Manage Payment Methods
          </button>
        </div>

        <div className="bg-[#483223] rounded-xl border border-[#674D32] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#674D32] bg-[#32261A]">
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Date</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Description</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">ID</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Ends</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#674D32]">
                {loading && (
                  <tr><td colSpan={5} className="p-6 text-center text-[#B8AA94]">Loading...</td></tr>
                )}
                {!loading && subscriptions.length === 0 && (
                  <tr><td colSpan={5} className="p-6 text-center text-[#B8AA94]">No subscription history found.</td></tr>
                )}
                {subscriptions.map((sub, idx) => (
                  <tr key={sub.id ?? idx} className="hover:bg-neutral-900/50 transition">
                    <td className="px-6 py-4 text-white text-sm">{formatTs(sub.start_date)}</td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">{pricingNameMap[sub.pricing_id] ?? `Plan ${sub.pricing_id}`}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 text-sm font-mono">{sub.id}</td>
                    <td className="px-6 py-4 text-white text-sm">{formatTs(sub.end_date)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sub.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${sub.is_active ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        {sub.is_active ? 'Active' : 'Ended'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-[#32261A] border-t border-[#674D32] flex items-center justify-between">
            <span className="text-[#B8AA94] text-sm">Showing {Math.min(subscriptions.length, 1)} to {subscriptions.length} of {subscriptions.length} results</span>
            <div className="flex items-center gap-2">
              <button className="text-neutral-400 hover:text-white">
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button className="w-8 h-8 bg-orange-500 text-white rounded text-sm font-medium">1</button>
              <button className="w-8 h-8 text-white rounded text-sm hover:bg-neutral-600">2</button>
              <button className="w-8 h-8 text-white rounded text-sm hover:bg-neutral-600">3</button>
              <button className="text-neutral-400 hover:text-white">...</button>
              <button className="text-neutral-400 hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onManagePayment}
        className="fixed top-6 right-6 bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition border border-neutral-700"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        Manage Payment Methods
      </button>
    </div>
  );
}
