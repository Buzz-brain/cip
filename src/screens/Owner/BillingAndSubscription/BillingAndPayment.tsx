import { Download, CreditCard, Wallet, Link as LinkIcon, FileText, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import { usePlans } from '../../../lib/hooks/usePlans';
import AvailablePlans from './AvailablePlans';
import { SkeletonCard } from '@components/ui/skeleton-card';
// import checkOrangeCircle from "@assets/check-orange-circle.svg"


interface BillingPaymentPageProps {
  onUpgrade?: () => void;
}

export const BillingAndPayment = ({ onUpgrade }: BillingPaymentPageProps): JSX.Element => {
  const { user } = useAuth();
  const walletAddress = user?.publicKey || '0x0000...0000';
  const displayAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  const { plans: backendPlans } = usePlans();

  const [dashLoading, setDashLoading] = useState(false);
  const [dashboard, setDashboard] = useState<any | null>(null);
  const [dashError, setDashError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchDashboard() {
      setDashLoading(true);
      setDashError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/inherit/dashboard`, {
          headers: { Accept: 'application/json', ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}) },
        });
        if (!mounted) return;
        if (!res.ok) {
          setDashboard(null);
          setDashError(`Failed to load dashboard: ${res.status}`);
          return;
        }
        const json = await res.json().catch(() => null);
        setDashboard(json ?? null);
      } catch (err: any) {
        if (!mounted) return;
        setDashError(err?.message ?? String(err));
      } finally {
        if (!mounted) return;
        setDashLoading(false);
      }
    }
    fetchDashboard();
    return () => { mounted = false; };
  }, [user?.token]);
  
  return (
    <div className="flex flex-col w-full min-h-screen text-white [font-family:'Manrope',Helvetica]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-semibold mb-2">Billing & Payments</p>
              <p className="text-[#AFA89C]">
                Manage your subscription tier, payment methods, and view
                transaction history for your inheritance vaults.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-[#33261A] rounded-xl border border-[#B5927B]">
              <div className="flex items-start p-6 justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-white text-xl font-semibold">
                      Current Plan:{" "}
                      {(() => {
                        const subs = Array.isArray(dashboard?.all_subscriptions)
                          ? dashboard.all_subscriptions
                          : [];
                        const active =
                          subs.find((s: any) => s?.is_active === true) ?? null;
                        if (active && backendPlans) {
                          const planInfo = backendPlans.find(
                            (p: any) =>
                              Number(p.id) === Number(active.pricing_id),
                          );
                          const name = planInfo?.name ?? `Plan #${active.pricing_id}`;
                          return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
                        }
                        return "None";
                      })()}
                    </h2>
                    {(() => {
                      const subs = Array.isArray(dashboard?.all_subscriptions)
                        ? dashboard.all_subscriptions
                        : [];
                      const active =
                        subs.find((s: any) => s?.is_active === true) ?? null;
                      if (active)
                        return (
                          <span className="bg-green-500/20 text-green-400 px-2.5 py-1 rounded text-xs font-medium">
                            Active
                          </span>
                        );
                      return (
                        <span className="bg-gray-700/20 text-gray-300 px-2.5 py-1 rounded text-xs font-medium">
                          Inactive
                        </span>
                      );
                    })()}
                  </div>
                  <p className="text-[#AFA89C] text-sm">
                    Next billing date:{" "}
                    {(() => {
                      const subs = Array.isArray(dashboard?.all_subscriptions)
                        ? dashboard.all_subscriptions
                        : [];
                      const active =
                        subs.find((s: any) => s?.is_active === true) ??
                        subs.sort(
                          (a: any, b: any) =>
                            new Date(b.start_date).getTime() -
                            new Date(a.start_date).getTime(),
                        )[0];
                      if (active && active.end_date)
                        return new Date(active.end_date).toLocaleString();
                      return "—";
                    })()}
                  </p>
                </div>
                {/* <div className="flex gap-3">
                  <button className="text-white hover:text-white px-4 py-2 rounded-lg border border-[#63574B] hover:border-neutral-500 transition">
                    Cancel Plan
                  </button>
                  <button
                    onClick={onUpgrade}
                    className="bg-[#FF6600] hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition"
                  >
                    Upgrade Plan
                  </button>
                </div> */}
              </div>

              <div className="grid grid-cols-3">
                <div className="border-t border-[#514437] border-r p-5">
                  <div className="w-10 h-10 bg-[#8A591E4D] rounded-full flex items-center justify-center mb-3">
                    <svg
                      className="w-8 h-8 text-[#FF6600]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <div className="text-[#AFA89C] text-sm mb-1">Plan Cost</div>
                  <div className="text-white text-2xl font-semibold">
                    {(() => {
                      const subs = Array.isArray(dashboard?.all_subscriptions) ? dashboard.all_subscriptions : [];
                      const active = subs.find((s: any) => s?.is_active === true) ?? null;
                      if (active && backendPlans) {
                        const planInfo = backendPlans.find((p: any) => Number(p.id) === Number(active.pricing_id));
                        if (planInfo && typeof planInfo.price === 'number') return planInfo.price.toFixed(2);
                      }
                      return "—";
                    })()} 
                    <span className="text-[#AFA89C] text-base font-normal">/ mo</span>
                  </div>
                </div>

                <div className="border-t border-[#514437] border-r p-5">
                  <div className="w-10 h-10 bg-[#581C874D] rounded-full flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-[#9333EA]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div className="text-[#AFA89C] text-sm mb-1">Renewal Type</div>
                  <div className="text-white text-lg font-medium">Auto-Renewal</div>
                </div>

                <div className="border-t border-[#514437] p-5">
                  <div className="w-10 h-10 bg-[#7C2D124D] rounded-full flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-[#EA580C]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="text-[#AFA89C] text-sm mb-1">Security Level</div>
                  <div className="text-white text-lg font-medium">Multi-Sig</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#8A5D1E33] border border-[#AF531E] rounded-xl px-4 py-5">
              <div className="flex items-start gap-3">
                <div className="text-orange-500 mt-0.5">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium mb-1">
                    Upcoming Charge
                  </div>
                  <div className="text-[#AFA89C] text-sm">
                    {(() => {
                      const subs = Array.isArray(dashboard?.all_subscriptions)
                        ? dashboard.all_subscriptions
                        : [];
                      const active = subs.find((s: any) => s?.is_active === true) ?? null;
                      if (active && backendPlans) {
                        const planInfo = backendPlans.find((p: any) => Number(p.id) === Number(active.pricing_id));
                        const when = active?.end_date ? new Date(active.end_date).toLocaleString() : '—';
                        const amt = planInfo && typeof planInfo.price === 'number' ? `$${planInfo.price.toFixed(2)}` : '—';
                        return `Your next payment of ${amt} will be processed on ${when}`;
                      }
                      return 'Your next payment will be processed on —';
                    })()}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#33261A] rounded-xl px-6 py-4 border border-[#B5927B]">
              <h3 className="text-white font-semibold mb-3">
                Need help with billing?
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left flex items-center gap-3 text-neutral-400 hover:text-white transition">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Billing FAQ</span>
                </button>
                <button className="w-full text-left flex items-center gap-3 text-neutral-400 hover:text-white transition">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Available Plans Section (merged pricing) */}
        <div className="max-w-7xl mx-auto py-10">
          <h2 className="text-white text-xl font-semibold mb-4">
            Available Plans
          </h2>
          <AvailablePlans
            onSubscribe={() => {
              /* TODO: refresh billing info if needed */
            }}
          />
        </div>
        
        <div className="bg-[#33261A] rounded-xl p-6 border border-[#B5927B]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-lg font-semibold">
              Billing History
            </h3>
          </div>

          {dashLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={`billing-skel-${i}`} />
              ))}
            </div>
          ) : !dashboard ||
            !Array.isArray(dashboard.all_subscriptions) ||
            dashboard.all_subscriptions.length === 0 ? (
            <div className="py-12 text-center text-[#AFA89C]">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">
                No billing history available at this time.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {Array.isArray(dashboard?.all_subscriptions)
                ? [...dashboard.all_subscriptions]
                    .sort((a: any, b: any) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
                    .map((sub: any) => (
                      <div key={sub.id} className="bg-[#2d241a] p-4 rounded">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-semibold">
                              {(() => {
                                const planInfo = backendPlans?.find(
                                  (p: any) => Number(p.id) === Number(sub.pricing_id),
                                );
                                const name = planInfo?.name ?? `Plan #${sub.pricing_id}`;
                                return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
                              })()}
                            </div>
                            <div className="text-sm text-[#AFA89C]">
                              {sub.start_date ? new Date(sub.start_date).toLocaleString() : "—"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-[#AFA89C]">
                              {sub.is_active ? (
                                <span className="text-green-300">Active</span>
                              ) : (
                                <span className="text-gray-400">Ended</span>
                              )}
                            </div>
                            <div className="text-sm text-[#AFA89C]">
                              Ends: {sub.end_date ? new Date(sub.end_date).toLocaleString() : "—"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
