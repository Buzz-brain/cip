import React from 'react';
import { Card, CardContent } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { usePlans } from '../../../lib/hooks/usePlans';
import { useAuth } from '../../../context/useAuth';
import { toast } from 'react-toastify';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const AvailablePlans = ({ onSubscribe }: { onSubscribe?: () => void }) => {
  const { plans: backendPlans, loading: plansLoading } = usePlans();
  const { user } = useAuth();
  const [subscribing, setSubscribing] = React.useState<Record<string, boolean>>({});

  const handleSubscribe = async (plan: any) => {
    if (!plan?.id) {
      toast.info('Plan details unavailable.');
      return;
    }

    const role = (user?.userInfo?.role ?? (user as any)?.role ?? '').toString();
    if (role && role.toLowerCase() !== 'user') {
      toast.error(`You're signed in as ${role}. Only owners can subscribe.`);
      return;
    }

    const key = String(plan.id);
    if (subscribing[key]) return;
    setSubscribing((s) => ({ ...s, [key]: true }));

    try {
      const body = { pricing_id: plan.id, months: 1 };
      const res = await fetch(`${BACKEND_API_URL}/auth/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      let data: any = null;
      try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }

      if (res.ok) {
        toast.success('Subscription successful.');
        if (typeof onSubscribe === 'function') onSubscribe();
      } else {
        toast.error(`Subscription failed: ${text || res.status}`);
      }
    } catch (err: any) {
      toast.error(err?.message ?? String(err));
    } finally {
      setSubscribing((s) => ({ ...s, [key]: false }));
    }
  };

  if (plansLoading) return <div className="p-6">Loading plans...</div>;
  if (!backendPlans || backendPlans.length === 0) return <div className="p-6">No plans available.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {backendPlans.map((plan: any, idx: number) => {
        const displayBadge = plan.badge ?? (idx === 2 ? 'Recommended' : undefined);
        return (
          <Card key={plan.id} className={`${plan.highlighted ? 'bg-[#32241a] border-2 border-[#ff6600]' : 'bg-[#32241a] border-[#554233]'}`}>
            {displayBadge && (
              <div className="absolute top-0 right-0 w-[85%] bg-[#ff6600] rounded-l-full rounded-tr-full px-3 py-1 flex justify-start">
                <span className="font-bold text-white text-xs">{displayBadge}</span>
              </div>
            )}
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-white text-lg">{(plan.name ?? `Plan #${plan.id}`).toString()}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-white text-2xl">{plan.price ? `$${plan.price}` : 'Custom'}</span>
                  <span className="font-bold text-[#b8a494] text-sm">/mo</span>
                </div>
                <p className="text-sm text-[#b8a494]">{plan.description ?? ''}</p>
              </div>

              <Button
                className={`${plan.highlighted ? 'bg-[#ff6600]' : 'bg-[#554233]'} w-full font-bold`}
                onClick={() => handleSubscribe(plan)}
                disabled={!!(plan.id && subscribing[String(plan.id)])}
              >
                {subscribing[String(plan.id)] ? 'Processing...' : (plan.buttonText ?? 'Subscribe')}
              </Button>

              <Separator className="bg-[#554233]" />

              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-200">{`Triggers: ${plan.triggers ?? '—'}`}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-200">{`Plans allowed: ${plan.plans ?? '—'}`}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className={`text-sm ${plan.storage ? 'text-slate-200' : 'text-[#8b7964]'}`}>{plan.storage ? 'Storage Included' : 'No Storage'}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className={`text-sm ${plan.taxcore ? 'text-slate-200' : 'text-[#8b7964]'}`}>{plan.taxcore ? 'TaxCore Enabled' : 'No TaxCore'}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className={`text-sm ${plan.secret_ai ? 'text-slate-200' : 'text-[#8b7964]'}`}>{plan.secret_ai ? 'AI features' : 'No AI features'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AvailablePlans;
