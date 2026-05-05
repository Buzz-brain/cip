import { FileText as FileTextIcon, CircleCheck as CheckCircleIcon, Download as DownloadIcon, Lock as LockIcon, Home as HomeIcon } from "lucide-react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { getExecutorInheritanceById, postExecutePlan } from '../../lib/api/executor';
import { toast } from 'react-toastify';

export const ExecuteInheritancePlan = (): JSX.Element => {
  const params = useParams();
  const planId = params?.planId ?? '';
  const { user } = useAuth();
  const [payload, setPayload] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const formatTs = (ts?: number | null) => {
    if (!ts) return '—';
    try {
      return new Date(Number(ts) * 1000).toLocaleString();
    } catch (e) {
      return String(ts);
    }
  };
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    const initials = parts.slice(0, 2).map(p => p[0]?.toUpperCase() ?? '').join('');
    return initials || 'U';
  };
  const assetNameMap: Record<string, string> = {
    ETH: 'Ethereum',
    BTC: 'Bitcoin',
    USDC: 'USDC',
    SOL: 'Solana',
    USDT: 'USDT',
  };

  useEffect(() => {
    let mounted = true;
    const id = Number(planId);
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const res = await getExecutorInheritanceById(user?.token, id);
        if (!mounted) return;
        setPayload(res ?? null);
      } catch (err) {
        console.warn('Failed to fetch executor plan', err);
        toast.error('Failed to load plan details');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [planId, user?.token]);

  const plan = payload?.plan ?? payload;
  const beneficiaries = payload?.beneficiaries ?? payload?.beneficiary ?? [];
  const assetSymbol = plan?.crypto_asset ? String(plan.crypto_asset).toUpperCase() : undefined;
  const assetDisplayName = assetSymbol ? (assetNameMap[assetSymbol] ?? assetSymbol) : undefined;
  const assetsIncludedCount = plan?.crypto_asset ? 1 : 0;
  const isMPC = !!plan?.plan_type && String(plan.plan_type).toLowerCase().includes('mpc');
  const hasLegalDocs = Array.isArray(plan?.legal_docs) && plan.legal_docs.length > 0;

  const triggerLabel = (type?: string) => {
    if (!type) return '—';
    switch (type.toLowerCase()) {
      case 'health_oracle':
        return "Health Oracle (Dead Man's Switch)";
      case 'inactivity':
        return 'Inactivity Monitor';
      case 'time_lock':
      case 'timelock':
        return 'Time Lock';
      default:
        return type.replace('_', ' ');
    }
  };

  const heartbeatStatus = (planObj: any) => {
    if (!planObj) return { label: '—', sub: '' };
    const last = planObj.last_active_at ? new Date(Number(planObj.last_active_at) * 1000) : null;
    if (!last) return { label: 'No Activity', sub: 'Owner has not checked in' };
    const ms = Date.now() - last.getTime();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    if (days <= 2) return { label: 'Heartbeat Active', sub: `Last check-in: ${days} day(s) ago` };
    if (days <= 30) return { label: 'Delayed Check-ins', sub: `Last check-in: ${days} day(s) ago` };
    return { label: 'Missed Checks', sub: `Last check-in: ${days} day(s) ago` };
  };

  return (
    <main className="flex-1 bg-[#0d0501] overflow-auto [font-family:'Manrope',Helvetica] p-4">
      {loading && (
        <div className="p-4">
          <div className="mb-4">
            <div className="h-8 w-1/3 bg-[#181511] rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-1">
              <div className="grid grid-cols-1 gap-4">
                <div className="w-full">
                  <div className="animate-pulse">
                    <div className="h-48 bg-[#181511] rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-24 bg-[#181511] rounded-lg animate-pulse" />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 h-64 bg-[#181511] rounded-lg animate-pulse" />
              <div className="h-64 bg-[#181511] rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          <header className="flex items-center justify-between px-4 py-4 bg-[#0d0501]">
            <div className="flex items-center gap-2 text-[#8b7b64]">
              <button onClick={() => {}} className="hover:text-white transition-colors">
                <HomeIcon className="w-4 h-4" />
              </button>
              <span className="text-sm">/</span>
              <span className="text-sm">Plans</span>
              <span className="text-sm">/</span>
              <span className="text-sm font-bold text-white">{`Plan #${plan?.id ?? plan?.contract_plan_id ?? '—'} Details`}</span>
            </div>
          </header>

          <div className="p-4 flex flex-col gap-8">
            <section className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-3xl">
                      {plan?.name ? String(plan.name) : (plan?.contract_plan_id ?? plan?.id ? `Plan #${plan.contract_plan_id ?? plan.id}` : '')}
                    </h1>
                    {(plan?.is_released === true || plan?.is_funded === true || plan?.status) && (
                      <span className="bg-[#F97316] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-3 py-1 rounded-full">
                        {plan?.is_released === true ? 'RELEASED' : plan?.is_funded === true ? 'FUNDED' : String(plan.status)}
                      </span>
                    )}
                  </div>
                  {(plan?.owner_wallet || plan?.last_active_at) && (
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      {plan?.owner_wallet ? `${plan.owner_wallet}` : ''}{plan?.owner_wallet && plan?.last_active_at ? ' • ' : ''}{plan?.last_active_at ? new Date(Number(plan.last_active_at) * 1000).toLocaleString() : ''}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {beneficiaries && beneficiaries.length > 0 && (
              <div className="bg-[#181511] border border-[#392f28] rounded-xl">
                <div className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F97316] flex items-center justify-center text-black font-bold">{getInitials(beneficiaries[0].name)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">{beneficiaries[0].name}</p>
                        <p className="text-[#8b7b64] text-xs">{beneficiaries[0].relationship ?? 'Beneficiary'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#bdb09a] text-xs">Allocation</p>
                        <p className="font-bold text-white">{beneficiaries[0].allocation_percentage ?? '—'}%</p>
                      </div>
                    </div>
                    <p className="text-[#8b7b64] text-xs mt-2">Wallet: {beneficiaries[0].wallet ? `${beneficiaries[0].wallet.slice(0,6)}...${beneficiaries[0].wallet.slice(-6)}` : '—'}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
                <p className="text-xs text-[#8b7664]">📦 Assets Included</p>
                {assetSymbol ? (
                  <>
                    <p className="font-bold text-white mt-1">{assetDisplayName ?? assetSymbol}</p>
                    {plan?.amount != null && <p className="text-xs text-[#8b7664] mt-1">Amount: {plan.amount} {assetSymbol}</p>}
                  </>
                ) : (
                  <p className="font-bold text-white mt-1">—</p>
                )}
                {plan?.assets_description && <p className="text-xs text-[#8b7664] mt-1">{plan.assets_description}</p>}
              </div>

              <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
                <p className="text-xs text-[#8b7664]">📊 Tax Status</p>
                <p className="font-bold text-white mt-1">{plan?.tax_status ?? '—'}</p>
                {plan?.tax_note && <p className="text-xs text-[#8b7664] mt-1">{plan.tax_note}</p>}
              </div>

              {(plan?.plan_type || plan?.inactivity_period_days != null) && (
                <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
                  <p className="text-xs text-[#8b7664]">⏰ Trigger Type</p>
                  <p className="font-bold text-white mt-1">{plan?.plan_type ? triggerLabel(plan.plan_type) : '—'}</p>
                  {plan?.inactivity_period_days != null && <p className="text-xs text-[#8b7664] mt-1">Inactivity Period: {plan.inactivity_period_days} Days</p>}
                </div>
              )}

              {(plan?.last_active_at) && (
                <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
                  <p className="text-xs text-[#8b7664]">❤️ Current Status</p>
                  <p className="font-bold text-white mt-1">{heartbeatStatus(plan).label}</p>
                  <p className="text-xs text-[#8b7664] mt-1">{heartbeatStatus(plan).sub}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 flex flex-col gap-4">
                <div className="bg-[#181511] border border-[#392f28] rounded-xl">
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">Asset Allocation</h3>
                      <span className="flex items-center gap-1 text-[#F97316] text-xs [font-family:'Manrope',Helvetica]"><LockIcon className="w-3 h-3" />Restricted View</span>
                    </div>

                    <div className="flex flex-col gap-4">
                      {assetSymbol ? (
                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#627eea] flex items-center justify-center text-white font-bold text-sm">
                              {assetSymbol === 'BTC' ? '₿' : assetSymbol === 'ETH' ? 'Ξ' : assetSymbol?.[0] ?? assetSymbol}
                            </div>
                            <div>
                              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">{assetDisplayName}</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">{assetSymbol}</p>
                            </div>
                          </div>
                          <span className="[font-family:'Manrope',Helvetica] font-bold text-[#627eea] text-sm">{assetSymbol === 'BTC' ? 'Bitcoin Network' : assetSymbol === 'ETH' ? 'Ethereum Mainnet' : 'Network'}</span>
                        </div>
                      ) : (
                        <div className="py-6 text-[#8b7b64]">No asset information available.</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-[#181511] border border-[#392f28] rounded-xl">
                  <div className="p-6 flex flex-col gap-4">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">Plan Timeline</h3>

                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-[#F97316]" />
                          <div className="w-0.5 h-12 bg-[#392f28] mt-2" />
                        </div>
                        <div className="pb-4">
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Plan Created</p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">{plan ? `Created: ${formatTs(plan.created_at)}` : '—'}</p>
                        </div>
                      </div>

                      {plan?.plan_type === 'inactivity' && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-[#F97316]" />
                            <div className="w-0.5 h-12 bg-[#F97316] mt-2" />
                          </div>
                          <div className="pb-4">
                            <div className="flex items-center gap-2">
                              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Inactivity Monitoring</p>
                              <span className="bg-[#F97316] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-1 rounded">ACTIVE</span>
                            </div>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">Oracle checks wallet activity periodically.</p>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-2">Inactivity period: {plan.inactivity_period_days ?? '—'} days</p>
                          </div>
                        </div>
                      )}

                      {plan?.grace_period != null && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-[#8b7b64]" />
                            <div className="w-0.5 h-12 bg-[#392f28] mt-2" />
                          </div>
                          <div className="pb-4">
                            <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Grace Period</p>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">{plan.grace_period} days allowed for owner to cancel trigger.</p>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#F97316] text-xs mt-2">Pending</p>
                          </div>
                        </div>
                      )}

                      {plan?.should_release && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-[#8b7b64]" />
                            <div className="w-0.5 h-12 bg-[#392f28] mt-2" />
                          </div>
                          <div className="pb-4">
                            <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">MPC Authorization</p>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">Designated signers must approve asset release.</p>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#F97316] text-xs mt-2">{plan.is_released ? 'Completed' : 'Pending'}</p>
                          </div>
                        </div>
                      )}

                      {plan?.is_released && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-[#8b7b64]" />
                          </div>
                          <div className="pb-4">
                            <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Distribution Executed</p>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">Assets transferred to beneficiary wallets.</p>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-2">Released at {formatTs(plan.release_timestamp)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {hasLegalDocs && (
                <div className="flex flex-col gap-4">
                  <div className="bg-[#181511] border border-[#392f28] rounded-xl">
                    <div className="p-6 flex flex-col gap-4">
                      <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">Legal Documents</h3>

                      <div className="flex flex-col gap-3">
                        {plan!.legal_docs.map((doc: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-[#27221c] rounded-lg hover:bg-[#2d251f] transition-colors cursor-pointer">
                            <div className="flex items-center gap-3 flex-1">
                              <FileTextIcon className="w-5 h-5 text-[#8b7b64]" />
                              <div>
                                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">{doc.name ?? doc.title ?? `Document ${idx + 1}`}</p>
                                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">{doc.updated_at ? `Updated ${formatTs(doc.updated_at)}` : (doc.updated_at_display ?? '')}</p>
                              </div>
                            </div>
                            <DownloadIcon className="w-4 h-4 text-[#8b7b64] hover:text-white" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
};
