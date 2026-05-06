import React from 'react';
import { Card, CardContent } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { usePlans } from '../../../lib/hooks/usePlans';
import { useAuth } from '../../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../../lib/hooks/useSubscription';
import sharpCheckSolid from '@assets/sharp-check-solid.svg';
import sharpUncheckSolid from '@assets/sharp-uncheck-solid.svg';
import { SkeletonCard } from '@components/ui/skeleton-card';
import { toast } from 'react-toastify';
import ConfirmPaymentModal from '@components/ui/ConfirmPaymentModal';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const XCIP_HEADER_VALUE = import.meta.env.VITE_XCIP_HEADER;

export const AvailablePlans = ({ onSubscribe }: { onSubscribe?: () => void }) => {
  const { plans: backendPlans, loading: plansLoading } = usePlans();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { refresh: refreshSubscription } = useSubscription();
  const [subscribing, setSubscribing] = React.useState<Record<string, boolean>>({});
  const [convertingEth, setConvertingEth] = React.useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalPlan, setModalPlan] = React.useState<any>(null);
  const [modalUsdPrice, setModalUsdPrice] = React.useState<number | null>(null);
  const [modalEthAmount, setModalEthAmount] = React.useState<string | null>(null);
  const [modalLoading, setModalLoading] = React.useState(false);

  const performPayment = async (plan: any, amountEth: string) => {
    const key = String(plan.id);
    setModalLoading(true);
    setSubscribing((s) => ({ ...s, [key]: true }));
    try {
      if (!window.ethereum) throw new Error('No web3 provider found. Connect a wallet.');
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      const { BrowserProvider, parseEther } = await import('ethers');
      const provider = new BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();

      const toAddress = '0xd9B9C4e5B0d9D3BEAAbcD21a803A2E8a3D47e1bF';
      const value = parseEther(amountEth);

      // GAS ESTIMATION
      let gasLimit: bigint;
      try {
        const estimated = await provider.estimateGas({ to: toAddress, value });
        gasLimit = (estimated * 130n) / 100n;
      } catch (e) {
        gasLimit = 100_000n;
      }

      // Fee overrides
      let feeOverrides: { maxFeePerGas?: bigint; maxPriorityFeePerGas?: bigint } = {};
      try {
        const feeData = await provider.getFeeData();
        if (feeData.maxFeePerGas) feeOverrides.maxFeePerGas = (feeData.maxFeePerGas * 125n) / 100n;
        if (feeData.maxPriorityFeePerGas) feeOverrides.maxPriorityFeePerGas = (feeData.maxPriorityFeePerGas * 125n) / 100n;
      } catch (e) {
        console.warn('[performPayment] fee data error', e);
      }

      const tx = await signer.sendTransaction({ to: toAddress, value, gasLimit, ...feeOverrides });
      const receipt = await tx.wait();
      if (!receipt || receipt.status !== 1) throw new Error('On-chain payment failed or was reverted.');
      const txHash = tx.hash;

      // notify backend
      const body = { tx_hash: txHash, pricing_id: plan.id, months: 1 };
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
      if (res.ok) {
        toast.success('Subscription successful.');
        // Refresh subscription status immediately
        await refreshSubscription();
        if (typeof onSubscribe === 'function') onSubscribe();
        navigate('/owner-dashboard/select-assets');
      } else {
        throw new Error(text || `Status ${res.status}`);
      }
    } catch (err: any) {
      toast.error(err?.message ?? String(err));
    } finally {
      setModalLoading(false);
      setModalOpen(false);
      setModalPlan(null);
      setModalUsdPrice(null);
      setModalEthAmount(null);
      setSubscribing((s) => ({ ...s, [String(plan.id)]: false }));
    }
  };

  const handleSubscribe = async (plan: any) => {
    if (!plan?.id) {
      toast.info('Plan details unavailable.');
      return;
    }

    const key = String(plan.id);
    try {
      const role = (user?.userInfo?.role ?? (user as any)?.role ?? '').toString();
      if (role && role.toLowerCase() !== 'user') {
        toast.error(`You're signed in as ${role}. Only owners can subscribe.`);
        return;
      }

      if (subscribing[key] || convertingEth[key]) return;

    // --- Convert USD price to ETH ---
    setConvertingEth((s) => ({ ...s, [key]: true }));
    toast.info('Calculating ETH amount from current exchange rate...');

    // Extract USD price from plan
    let usdPrice = 0;
    if (typeof plan.price === 'number') {
      usdPrice = plan.price;
    } else if (typeof plan.price === 'string') {
      usdPrice = parseFloat(plan.price.replace(/[^0-9.]/g, ''));
    }

    if (isNaN(usdPrice) || usdPrice < 0) {
      throw new Error('Invalid plan price');
    }

    // Convert USD to ETH
    const { convertUsdToEth } = await import('../../../lib/wallet/ethPrice');
    let amountEth: string;
    if (usdPrice === 0) {
      amountEth = '0';
      toast.info('Free plan - no payment required.');
      // directly call backend for free tier
      const body = { tx_hash: '', pricing_id: plan.id, months: 1 };
      const res = await fetch(`${BACKEND_API_URL}/auth/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
          ...(XCIP_HEADER_VALUE ? { 'xcip-header': XCIP_HEADER_VALUE } : {}),
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast.success('Subscription successful.');
        // Refresh subscription status immediately so sidebar reflects new status
        await refreshSubscription();
        if (typeof onSubscribe === 'function') onSubscribe();
        navigate('/owner-dashboard/select-assets');
      } else {
        const text = await res.text();
        throw new Error(`Subscription failed: ${text || res.status}`);
      }
    } else {
      amountEth = await convertUsdToEth(usdPrice);
      toast.dismiss();
      // open modal for confirmation
      setModalPlan(plan);
      setModalUsdPrice(usdPrice);
      setModalEthAmount(amountEth);
      setModalOpen(true);
      // stop here; performPayment will continue when modal confirmed
      setConvertingEth((s) => ({ ...s, [key]: false }));
      return;
    }
  } catch (err: any) {
    toast.error(err?.message ?? String(err));
  } finally {
    setSubscribing((s) => ({ ...s, [key]: false }));
    setConvertingEth((s) => ({ ...s, [key]: false }));
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
  const formatPrice = (p: any) => {
    if (p === undefined || p === null) return 'Custom';
    const num = typeof p === 'number' ? p : parseFloat(String(p).replace(/[^0-9.\-]/g, ''));
    if (isNaN(num)) return String(p);
    if (Number.isInteger(num)) return `$${num}`;
    // keep up to 2 decimals but trim unnecessary trailing zeros (e.g., 1.7 -> 1.7, 1.70 -> 1.7)
    const fixed = parseFloat(num.toFixed(2));
    return `$${fixed.toString()}`;
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {backendPlans.slice().sort((a: any, b: any) => Number(a.id) - Number(b.id)).map((plan: any, idx: number) => {
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
                  <span className="font-bold text-white text-2xl">{formatPrice(plan.price)}</span>
                  <span className="font-bold text-[#b8a494] text-sm">/mo</span>
                </div>
                <p className="text-sm text-[#b8a494]">{plan.description ?? (plan.name ? `${plan.name.charAt(0).toUpperCase()}${plan.name.slice(1)} Plan` : '')}</p>
              </div>

              <Button
                className={`${plan.highlighted ? 'bg-[#ff6600]' : 'bg-[#554233]'} w-full font-bold`}
                onClick={() => handleSubscribe(plan)}
                disabled={!!(plan.id && (subscribing[String(plan.id)] || convertingEth[String(plan.id)]))}
              >
                {convertingEth[String(plan.id)] ? 'Converting...' : subscribing[String(plan.id)] ? 'Processing...' : (plan.buttonText ?? 'Choose')}
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
    {modalOpen && modalPlan && (
      <ConfirmPaymentModal
        open={modalOpen}
        title={`Subscribe to ${modalPlan?.name ?? 'plan'}`}
        planName={modalPlan?.name}
        usdAmount={modalUsdPrice ?? undefined}
        ethAmount={modalEthAmount ?? undefined}
        loading={modalLoading}
        onConfirm={() => performPayment(modalPlan, modalEthAmount ?? '0')}
        onClose={() => setModalOpen(false)}
      />
    )}
    </>
  );
};

export default AvailablePlans;
