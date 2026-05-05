import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { SkeletonCard } from '@components/ui/skeleton-card';
import { useAuth } from '../../context/useAuth';
import { getBeneficiaryInheritances } from '../../lib/api/beneficiary';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const InheritancePlans = (): JSX.Element => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<any[] | null>([]);
  const [beneficiaries, setBeneficiaries] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const beneficiariesByPlan = useMemo(() => {
    const map = new Map<number, any[]>();
    if (!beneficiaries || !Array.isArray(beneficiaries)) return map;
    for (const b of beneficiaries) {
      const pid = Number(b.plan_id ?? b.planId ?? b.plan ?? 0);
      if (!map.has(pid)) map.set(pid, []);
      map.get(pid)!.push(b);
    }
    return map;
  }, [beneficiaries]);

  useEffect(() => {
    let mounted = true;
    if (!user?.token) {
      setPlans(null);
      setLoading(false);
      setLoaded(false);
      return () => { mounted = false; };
    }
    setLoading(true);
    setLoaded(false);
    (async () => {
      try {
        const res = await getBeneficiaryInheritances(user.token);
        if (!mounted) return;
        setPlans(res?.plans ?? []);
        setBeneficiaries(res?.beneficiaries ?? []);
        setLoaded(true);
      } catch (err: any) {
        console.warn('Failed to fetch inheritance plans', err);
        toast.error('Failed to load inheritance plans');
        setPlans(null);
        setBeneficiaries(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user?.token]);

  const onDetails = async (planId: number) => {
    // reuse existing details route
    // BeneficiaryDetails expects nav state to include `id` or a full `plan` object.
    navigate('/beneficiary-details', { state: { id: planId } });
  };

  const onRaiseDispute = (planId: number) => {
    navigate(`/beneficiary-dashboard/disputes/raise/${planId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[1,2,3].map(i => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
        <CardContent className="p-6">
          <p className="text-[#8b7b64]">No inheritance plans found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 transition-all duration-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      {plans.map((p: any) => {
        const planBeneficiaries = beneficiariesByPlan.get(Number(p.id)) ?? [];
        const created = p.created_at ? new Date(Number(p.created_at) * 1000) : null;
        const isFunded = Boolean(p.is_funded);
        return (
          <Card key={p.id} className="bg-[#0f0d0b] border border-[#3b332b] rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#1f1b16] to-[#2b261f] rounded-lg text-2xl">🏛️</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-lg mb-1">{p.plan_name ?? p.name ?? `Plan #${p.id}`}</h4>
                    <p className="text-[#bdb09a] text-sm">{(p.plan_type ?? '—').toString().replace('_', ' ').toUpperCase()}</p>
                    <p className="text-[#8b7b64] text-xs mt-1">Grantor: {p.grantor_name ?? p.owner_name ?? p.grantor ?? '—'}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`text-xs font-bold px-3 py-1 rounded-full ${isFunded ? 'bg-green-100 text-green-900' : 'bg-neutral-800 text-neutral-300'}`}>{isFunded ? 'Funded' : 'Unfunded'}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 py-4 border-y border-[#2d2720]">
                <div>
                  <p className="text-[#bdb09a] text-xs">Beneficiaries</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {planBeneficiaries.length === 0 && <span className="text-sm text-[#8b7b64]">No beneficiaries assigned</span>}
                    {planBeneficiaries.slice(0,3).map((b:any) => (
                      <div key={`${p.id}-${b.wallet}`} className="px-2 py-1 bg-[#15120f] border border-[#2f2922] rounded-full text-xs text-[#e9dfcc] flex items-center gap-2">
                        <span className="font-medium">{b.name}</span>
                        <span className="text-[#bdb09a]">{Math.round((b.allocation_percentage ?? b.allocation ?? 0) * 100) / 100}%</span>
                      </div>
                    ))}
                    {planBeneficiaries.length > 3 && <div className="px-2 py-1 bg-[#15120f] border border-[#2f2922] rounded-full text-xs text-[#bdb09a]">+{planBeneficiaries.length - 3} more</div>}
                  </div>
                </div>
                <div>
                  <p className="text-[#bdb09a] text-xs">Amount</p>
                  <p className="text-white text-sm font-bold mt-2">{p.amount ? `${p.amount} ${p.crypto_asset ?? ''}` : '—'}</p>
                  <p className="text-[#8b7b64] text-xs mt-4">Created: {created ? created.toLocaleDateString() : '—'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <p className="text-[#bdb09a] text-xs mb-2">Execution Status</p>
                  <div className="w-full bg-[#1b1916] rounded-full h-3 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-[#2ccd2c] to-[#1fa11f]`} style={{ width: p.is_released ? '100%' : '30%' }} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => onDetails(p.id)} className="text-[#2ccd2c] bg-transparent border border-[#2a2a2a]">Details</Button>
                  <Button onClick={() => onRaiseDispute(p.id)} className="bg-[#2ccd2c]">Raise Dispute</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InheritancePlans;
