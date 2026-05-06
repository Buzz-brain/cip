import { FileText as FileTextIcon, CircleCheck as CheckCircleIcon, Download as DownloadIcon, Lock as LockIcon, Home as HomeIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { getBeneficiaryInheritanceById, nominateMediator } from "../../lib/api/beneficiary";
import { getAllDisputes } from "../../lib/api/dispute";
import NominateMediatorModal from "../../components/ui/NominateMediatorModal";
import { toast } from "react-toastify";
import BeneficiaryLayout from "./BeneficiaryLayout";

export const BeneficiaryDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [planDetail, setPlanDetail] = useState<{ plan: any; beneficiary: any } | null>(null);
  const [nominateOpen, setNominateOpen] = useState(false);
  const [nominateLoading, setNominateLoading] = useState(false);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [disputeId, setDisputeId] = useState<number | null>(null);

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

  const assetSymbol = planDetail?.plan?.crypto_asset ? String(planDetail.plan.crypto_asset).toUpperCase() : undefined;
  const assetDisplayName = assetSymbol ? (assetNameMap[assetSymbol] ?? assetSymbol) : undefined;
  const assetsIncludedCount = planDetail?.plan?.crypto_asset ? 1 : 0;
  const isMPC = !!planDetail?.plan?.plan_type && String(planDetail.plan.plan_type).toLowerCase().includes('mpc');
  const hasLegalDocs = Array.isArray(planDetail?.plan?.legal_docs) && planDetail?.plan?.legal_docs.length > 0;
  const hasDispute = !!planDetail?.plan?.is_disputed;

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

  const heartbeatStatus = (plan: any) => {
    if (!plan) return { label: '—', sub: '' };
    const last = plan.last_active_at ? new Date(Number(plan.last_active_at) * 1000) : null;
    if (!last) return { label: 'No Activity', sub: 'Owner has not checked in' };
    const ms = Date.now() - last.getTime();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    if (days <= 2) return { label: 'Heartbeat Active', sub: `Last check-in: ${days} day(s) ago` };
    if (days <= 30) return { label: 'Delayed Check-ins', sub: `Last check-in: ${days} day(s) ago` };
    return { label: 'Missed Checks', sub: `Last check-in: ${days} day(s) ago` };
  };

  useEffect(() => {
    let mounted = true;

    const stateAny: any = (location && (location.state as any)) || {};
    const navPlan = stateAny.plan ?? stateAny;

    async function fetchPlan(id?: number) {
      if (!user?.token) return;
      if (!id) return;
      setLoading(true);
      try {
        const res = await getBeneficiaryInheritanceById(user.token, Number(id));
        if (!mounted) return;
        setPlanDetail(res);
        
        // Fetch disputes for this plan
        fetchDisputesForPlan(user.token, res?.plan?.id);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load plan details');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    async function fetchDisputesForPlan(token: string, planId?: number) {
      if (!token || !planId) return;
      try {
        const allDisputes = await getAllDisputes(token);
        if (!mounted) return;
        setDisputes(allDisputes);
        
        // Find dispute for this plan
        const matchingDispute = allDisputes.find(d => d.plan_id === planId);
        if (matchingDispute) {
          setDisputeId(matchingDispute.id);
          console.log(`[BeneficiaryDetails] Found dispute ${matchingDispute.id} for plan ${planId}`);
        } else {
          setDisputeId(null);
          console.log(`[BeneficiaryDetails] No dispute found for plan ${planId}`);
        }
      } catch (err) {
        console.error('[BeneficiaryDetails] Failed to fetch disputes:', err);
      }
    }

    if (navPlan && typeof navPlan === 'object' && (navPlan.plan || navPlan.beneficiary || navPlan.id)) {
      if (navPlan.plan && navPlan.beneficiary) {
        setPlanDetail({ plan: navPlan.plan, beneficiary: navPlan.beneficiary });
        if (user?.token) fetchDisputesForPlan(user.token, navPlan.plan.id);
      } else if (navPlan.id && navPlan.beneficiary) {
        setPlanDetail({ plan: navPlan, beneficiary: navPlan.beneficiary });
        if (user?.token) fetchDisputesForPlan(user.token, navPlan.id);
      } else if (navPlan.id) {
        fetchPlan(navPlan.id);
      } else if (navPlan.plan_id) {
        fetchPlan(navPlan.plan_id);
      }
      return () => { mounted = false; };
    }

    const params = new URLSearchParams(location.search);
    const planId = params.get('plan_id') || params.get('id');
    if (planId) fetchPlan(Number(planId));

    return () => { mounted = false; };
  }, [location, user?.token]);

  return (
    <BeneficiaryLayout>
      <main className="flex-1 bg-[#0d0501] overflow-auto [font-family:'Manrope',Helvetica]">
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
                <button onClick={() => navigate("/overview")} className="hover:text-white transition-colors">
                  <HomeIcon className="w-4 h-4" />
                </button>
                <span className="text-sm">/</span>
                <span className="text-sm">Beneficiary Plans</span>
                <span className="text-sm">/</span>
                <span className="text-sm font-bold text-white">{`Plan #${planDetail?.plan?.id ?? planDetail?.plan?.contract_plan_id ?? '—'} Details`}</span>
              </div>
            </header>

            <div className="p-4 flex flex-col gap-8">
              <section className="flex flex-col gap-4">
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-3xl">
                        {planDetail?.plan ? `Estate Plan #${planDetail.plan.id ?? planDetail.plan.contract_plan_id}` : 'Estate Plan'}
                      </h1>
                      <span className="bg-[#2ccd2c] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-3 py-1 rounded-full">
                        {planDetail?.plan ? (planDetail.plan.is_released ? 'RELEASED' : planDetail.plan.is_funded ? 'ACTIVE MONITORING' : 'PENDING') : 'LOADING'}
                      </span>
                      <div className="ml-4">
                        <div title={!hasDispute ? 'A dispute must be raised before nominating a mediator' : 'Nominate a mediator for this dispute'}>
                          <Button 
                            onClick={() => hasDispute && setNominateOpen(true)} 
                            disabled={!hasDispute}
                            className={`text-white text-sm px-3 py-1 ${hasDispute ? 'bg-[#3b82f6] hover:bg-[#3b82f6]/90' : 'bg-[#6b7280] cursor-not-allowed opacity-60'}`}
                          >
                            Nominate Mediator
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      {planDetail?.plan?.owner_wallet ? `${planDetail.plan.owner_wallet}` : '—'} • Last Updated: {planDetail?.plan?.last_active_at ? new Date(Number(planDetail.plan.last_active_at) * 1000).toLocaleString() : '—'}
                    </p>
                  </div>
                </div>
              </section>

              {planDetail?.beneficiary && (
                <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#2ccd2c] flex items-center justify-center text-black font-bold">{getInitials(planDetail.beneficiary.name)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white">{planDetail.beneficiary.name}</p>
                          <p className="text-[#8b7b64] text-xs">{planDetail.beneficiary.relationship ?? 'Beneficiary'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#bdb09a] text-xs">Allocation</p>
                          <p className="font-bold text-white">{planDetail.beneficiary.allocation_percentage ?? '—'}%</p>
                        </div>
                      </div>
                      <p className="text-[#8b7b64] text-xs mt-2">Wallet: {planDetail.beneficiary.wallet ? `${planDetail.beneficiary.wallet.slice(0,6)}...${planDetail.beneficiary.wallet.slice(-6)}` : '—'}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <NominateMediatorModal
                open={nominateOpen}
                planId={planDetail?.plan?.id ?? planDetail?.plan?.contract_plan_id ?? null}
                loading={nominateLoading}
                onClose={() => setNominateOpen(false)}
                onSubmit={async (payload) => {
                  if (!user?.token || !planDetail?.plan) {
                    toast.error('Not authenticated or missing plan');
                    return;
                  }
                  if (!disputeId) {
                    toast.error('No active dispute found for this plan');
                    return;
                  }
                  setNominateLoading(true);
                  try {
                    const pid = Number(planDetail.plan.id ?? planDetail.plan.contract_plan_id);
                    // Include dispute_id in the payload
                    await nominateMediator(user.token, pid, { ...payload, dispute_id: disputeId });
                    toast.success('Mediator nominated successfully');
                    setNominateOpen(false);
                  } catch (err: any) {
                    const errMsg = err?.message ?? 'Failed to nominate mediator';
                    console.error('[BeneficiaryDetails] nomination error:', errMsg);
                    
                    // Specific error handling for common issues
                    if (errMsg.includes('must raise a dispute')) {
                      toast.error('⚠️ You must raise a dispute before you can nominate a mediator');
                    } else {
                      toast.error(errMsg);
                    }
                  } finally {
                    setNominateLoading(false);
                  }
                }}
              />

              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
                  <p className="text-xs text-[#8b7664]">📦 Assets Included</p>
                  <p className="font-bold text-white mt-1">{assetsIncludedCount ? `${assetsIncludedCount} Item${assetsIncludedCount > 1 ? 's' : ''}` : '—'}</p>
                  <p className="text-xs text-[#8b7664] mt-1">Multi-chain assets</p>
                </div>

                <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
                  <p className="text-xs text-[#8b7664]">📊 Tax Status</p>
                  <p className="font-bold text-white mt-1">{planDetail ? 'Pending' : '—'}</p>
                  <p className="text-xs text-[#8b7664] mt-1">Assessment upon execution</p>
                </div>

                <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
                  <p className="text-xs text-[#8b7664]">⏰ Trigger Type</p>
                  <p className="font-bold text-white mt-1">{triggerLabel(planDetail?.plan?.plan_type)}</p>
                  <p className="text-xs text-[#8b7664] mt-1">Inactivity Period: {planDetail?.plan?.inactivity_period_days ?? '—'} Days</p>
                </div>

                <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
                  <p className="text-xs text-[#8b7664]">❤️ Current Status</p>
                  <p className="font-bold text-white mt-1">{heartbeatStatus(planDetail?.plan).label}</p>
                  <p className="text-xs text-[#8b7664] mt-1">{heartbeatStatus(planDetail?.plan).sub}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 flex flex-col gap-4">
                  <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">Asset Allocation</h3>
                        <span className="flex items-center gap-1 text-[#2ccd2c] text-xs [font-family:'Manrope',Helvetica]"><LockIcon className="w-3 h-3" />Restricted View</span>
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
                    </CardContent>
                  </Card>

                  <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                        Plan Timeline
                      </h3>

                      <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-[#2ccd2c]" />
                            <div className="w-0.5 h-12 bg-[#392f28] mt-2" />
                          </div>
                          <div className="pb-4">
                            <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Plan Created</p>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">{planDetail?.plan ? `Created: ${formatTs(planDetail.plan.created_at)}` : '—'}</p>
                          </div>
                        </div>

                        {planDetail?.plan?.plan_type === 'inactivity' && (
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 rounded-full bg-[#2ccd2c]" />
                              <div className="w-0.5 h-12 bg-[#2ccd2c] mt-2" />
                            </div>
                            <div className="pb-4">
                              <div className="flex items-center gap-2">
                                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Inactivity Monitoring</p>
                                <span className="bg-[#2ccd2c] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-1 rounded">ACTIVE</span>
                              </div>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">Oracle checks wallet activity periodically.</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-2">Inactivity period: {planDetail.plan.inactivity_period_days ?? '—'} days</p>
                            </div>
                          </div>
                        )}

                        {planDetail?.plan?.grace_period != null && (
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 rounded-full bg-[#8b7b64]" />
                              <div className="w-0.5 h-12 bg-[#392f28] mt-2" />
                            </div>
                            <div className="pb-4">
                              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Grace Period</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">{planDetail.plan.grace_period} days allowed for owner to cancel trigger.</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#2ccd2c] text-xs mt-2">Pending</p>
                            </div>
                          </div>
                        )}

                        {planDetail?.plan?.should_release && (
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 rounded-full bg-[#8b7b64]" />
                              <div className="w-0.5 h-12 bg-[#392f28] mt-2" />
                            </div>
                            <div className="pb-4">
                              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">MPC Authorization</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">Designated signers must approve asset release.</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#2ccd2c] text-xs mt-2">{planDetail.plan.is_released ? 'Completed' : 'Pending'}</p>
                            </div>
                          </div>
                        )}

                        {planDetail?.plan?.is_released && (
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 rounded-full bg-[#8b7b64]" />
                            </div>
                            <div className="pb-4">
                              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Distribution Executed</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">Assets transferred to beneficiary wallets.</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-2">Released at {formatTs(planDetail.plan.release_timestamp)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col gap-4">
                  <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
                        Legal Documents
                      </h3>

                      <div className="flex flex-col gap-3">
                        {hasLegalDocs ? (
                          planDetail!.plan!.legal_docs.map((doc: any, idx: number) => (
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
                          ))
                        ) : (
                          <div className="p-4 text-[#8b7b64]">No legal documents uploaded yet.</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </BeneficiaryLayout>
  );
};

export default BeneficiaryDetails;
