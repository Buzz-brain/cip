import React from 'react';
import { Card, CardContent } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { usePlans } from '../../../lib/hooks/usePlans';
import { useAuth } from '../../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import sharpCheckSolid from '@assets/sharp-check-solid.svg';
import sharpUncheckSolid from '@assets/sharp-uncheck-solid.svg';
import { SkeletonCard } from '@components/ui/skeleton-card';
import { toast } from 'react-toastify';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const XCIP_HEADER_VALUE = import.meta.env.VITE_XCIP_HEADER;

export const AvailablePlans = ({ onSubscribe }: { onSubscribe?: () => void }) => {
  const { plans: backendPlans, loading: plansLoading } = usePlans();
  const { user } = useAuth();
  const navigate = useNavigate();
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
          ...(XCIP_HEADER_VALUE ? { 'xcip-header': XCIP_HEADER_VALUE } : {}),
        },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      let data: any = null;
      try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }

      if (res.ok) {
        toast.success('Subscription successful.');
        if (typeof onSubscribe === 'function') onSubscribe();
        navigate('/owner-dashboard/select-assets');
      } else {
        toast.error(`Subscription failed: ${text || res.status}`);
      }
    } catch (err: any) {
      toast.error(err?.message ?? String(err));
    } finally {
      setSubscribing((s) => ({ ...s, [key]: false }));
    }
  };

  if (plansLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={`skeleton-${i}`} />
      ))}
    </div>
  );
  if (!backendPlans || backendPlans.length === 0) return <div className="p-6">No plans available.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {backendPlans.map((plan: any, idx: number) => {
        const displayBadge = plan.badge ?? (idx === 2 ? 'Recommended' : undefined);
        return (
          <Card key={plan.id} className={`${plan.highlighted ? 'bg-[#32241a] border-2 border-[#ff6600]' : 'relative bg-[#32241a] border-[#554233]'}`}>
            {displayBadge && (
              <div className="absolute top-0 right-0 w-[85%] bg-[#ff6600] rounded-l-full rounded-tr-full px-3 py-1 flex justify-start">
                <span className="font-bold text-white text-xs">{displayBadge}</span>
              </div>
            )}
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-white text-lg">{(() => {
                    const n = (plan.name ?? `Plan #${plan.id}`).toString();
                    return `${n.charAt(0).toUpperCase()}${n.slice(1)}`;
                  })()}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-white text-2xl">{plan.price !== undefined && plan.price !== null ? (typeof plan.price === 'number' ? `$${plan.price.toFixed(0)}` : `$${plan.price}`) : 'Custom'}</span>
                  <span className="font-bold text-[#b8a494] text-sm">/mo</span>
                </div>
                <p className="text-sm text-[#b8a494]">{plan.description ?? (plan.name ? `${plan.name.charAt(0).toUpperCase()}${plan.name.slice(1)} Plan` : '')}</p>
              </div>

              <Button
                className={`${plan.highlighted ? 'bg-[#ff6600]' : 'bg-[#554233]'} w-full font-bold`}
                onClick={() => handleSubscribe(plan)}
                disabled={!!(plan.id && subscribing[String(plan.id)])}
              >
                {subscribing[String(plan.id)] ? 'Processing...' : (plan.buttonText ?? 'Choose')}
              </Button>

              <Separator className="bg-[#554233]" />

              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <img src={sharpCheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="[font-family:'Manrope',Helvetica] text-sm font-medium text-slate-200">{`Included Plans: ${plan.plans ?? '—'}`}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img src={sharpCheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="[font-family:'Manrope',Helvetica] text-sm font-medium text-slate-200">{`Triggers: ${plan.triggers ?? '—'}`}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img src={sharpCheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="[font-family:'Manrope',Helvetica] text-sm font-medium text-slate-200">{`Supported Chains: ${plan.supported_chain ?? '—'}`}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img src={plan.storage ? sharpCheckSolid : sharpUncheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className={`[font-family:'Manrope',Helvetica] text-sm ${plan.storage ? 'font-medium text-slate-200' : 'font-normal text-[#8b7964]'}`}>{plan.storage ? 'Storage Included' : 'No Storage'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img src={plan.taxcore ? sharpCheckSolid : sharpUncheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className={`[font-family:'Manrope',Helvetica] text-sm ${plan.taxcore ? 'font-medium text-slate-200' : 'font-normal text-[#8b7964]'}`}>{plan.taxcore ? 'TaxCore Enabled' : 'No TaxCore'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img src={plan.secret_ai ? sharpCheckSolid : sharpUncheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className={`[font-family:'Manrope',Helvetica] text-sm ${plan.secret_ai ? 'font-medium text-slate-200' : 'font-normal text-[#8b7964]'}`}>{plan.secret_ai ? 'Secret AI features' : 'No Secret AI'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <img src={sharpCheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="[font-family:'Manrope',Helvetica] text-sm font-medium text-slate-200">{`Plan edits allowed: ${plan.plan_edit ?? '—'}`}</span>
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
