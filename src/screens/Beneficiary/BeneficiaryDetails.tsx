import { FileText as FileTextIcon, CircleCheck as CheckCircleIcon, Download as DownloadIcon, Lock as LockIcon, Chrome as HomeIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { getBeneficiaryInheritanceById } from "../../lib/api/beneficiary";
import { toast } from "react-toastify";
import BeneficiaryLayout from "./BeneficiaryLayout";

export const BeneficiaryDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [planDetail, setPlanDetail] = useState<{ plan: any; beneficiary: any } | null>(null);

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

    // If navigation state provided, use it directly when possible
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
      } catch (err) {
        console.error(err);
        toast.error('Failed to load plan details');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    // If navPlan already contains {plan, beneficiary}, use it
    if (navPlan && typeof navPlan === 'object' && (navPlan.plan || navPlan.beneficiary || navPlan.id)) {
      // navPlan may be the plan object or the full envelope
      if (navPlan.plan && navPlan.beneficiary) {
        setPlanDetail({ plan: navPlan.plan, beneficiary: navPlan.beneficiary });
      } else if (navPlan.id && navPlan.beneficiary) {
        setPlanDetail({ plan: navPlan, beneficiary: navPlan.beneficiary });
      } else if (navPlan.id) {
        // we only have plan proto — fetch full detail to get beneficiary
        fetchPlan(navPlan.id);
      } else if (navPlan.plan_id) {
        fetchPlan(navPlan.plan_id);
      }
      return () => { mounted = false; };
    }

    // No nav state, try search param '?plan_id=123'
    const params = new URLSearchParams(location.search);
    const planId = params.get('plan_id') || params.get('id');
    if (planId) fetchPlan(Number(planId));

    return () => { mounted = false; };
  }, [location, user?.token]);

  return (
    <BeneficiaryLayout>
      <main className="flex-1 bg-[#0d0501] overflow-auto [font-family:'Manrope',Helvetica]">
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
                </div>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                  {planDetail?.plan?.owner_wallet ? `${planDetail.plan.owner_wallet}` : '—'} • Last Updated: {planDetail?.plan?.last_active_at ? new Date(Number(planDetail.plan.last_active_at) * 1000).toLocaleString() : '—'}
                </p>
              </div>

              {/* <div className="flex items-center gap-3">
                <Button className="flex items-center gap-2 bg-transparent border border-[#392f28] text-white hover:bg-[#27221c] [font-family:'Manrope',Helvetica] font-bold text-sm px-4 py-2">
                  <DownloadIcon className="w-4 h-4" />
                  Export PDF
                </Button>
                <Button className="flex items-center gap-2 bg-transparent border border-[#392f28] text-white hover:bg-[#27221c] [font-family:'Manrope',Helvetica] font-bold text-sm px-4 py-2">
                  History
                </Button>
              </div> */}
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

          {/* Summary tiles placed below beneficiary details */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
              <p className="text-xs text-[#8b7664]">📦 Assets Included</p>
              <p className="font-bold text-white mt-1">{assetsIncludedCount ? `${assetsIncludedCount} Item${assetsIncludedCount > 1 ? 's' : ''}` : '4 Items'}</p>
              <p className="text-xs text-[#8b7664] mt-1">Multi-chain assets</p>
            </div>

            <div className="p-4 bg-[#181511] border border-[#392f28] rounded-lg">
              <p className="text-xs text-[#8b7664]">📊 Tax Status</p>
              <p className="font-bold text-white mt-1">Pending</p>
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
                    <span className="flex items-center gap-1 text-[#ff9500] text-xs [font-family:'Manrope',Helvetica]"><LockIcon className="w-3 h-3" />Restricted View</span>
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
                      <>
                        <div className="flex items-center justify-between py-3 border-b border-[#392f28]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#ff9500] flex items-center justify-center text-white font-bold text-sm">₿</div>
                            <div>
                              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Bitcoin</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">BTC</p>
                            </div>
                          </div>
                          <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff9500] text-sm">Bitcoin Network</span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-[#392f28]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#627eea] flex items-center justify-center text-white font-bold text-sm">Ξ</div>
                            <div>
                              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Ethereum</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">ETH</p>
                            </div>
                          </div>
                          <span className="[font-family:'Manrope',Helvetica] font-bold text-[#627eea] text-sm">Ethereum Mainnet</span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-[#392f28]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#2ccd2c] flex items-center justify-center text-white font-bold text-sm">U</div>
                            <div>
                              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">USDC</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">Stablecoin</p>
                            </div>
                          </div>
                          <span className="[font-family:'Manrope',Helvetica] font-bold text-[#a78bfa] text-sm">Polygon</span>
                        </div>

                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#627eea] flex items-center justify-center text-white font-bold text-xs">🦍</div>
                            <div>
                              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">Bored Ape #8822</p>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">NFT</p>
                            </div>
                          </div>
                          <span className="[font-family:'Manrope',Helvetica] font-bold text-[#627eea] text-sm">Ethereum Mainnet</span>
                        </div>
                      </>
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
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#ff9500] text-xs mt-2">Pending</p>
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
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#ff9500] text-xs mt-2">{planDetail.plan.is_released ? 'Completed' : 'Pending'}</p>
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
              
              {isMPC && (
                <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
                      MPC Approvals
                    </h3>

                    <div className="flex flex-col items-center gap-3 py-4">
                      <div className="relative w-32 h-32">
                        <svg
                          className="w-full h-full transform -rotate-90"
                          viewBox="0 0 120 120"
                        >
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#392f28"
                            strokeWidth="8"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#2ccd2c"
                            strokeWidth="8"
                            strokeDasharray={`${(2 * 54 * 3.14159 * 66) / 100} ${2 * 54 * 3.14159}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
                            66%
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                            Approval
                          </p>
                        </div>
                      </div>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs text-center">
                        2/3 REQUIRED
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 p-3 bg-[#27221c] rounded-lg">
                        <CheckCircleIcon className="w-5 h-5 text-[#2ccd2c]" />
                        <div className="flex-1">
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                            Authorized Signer
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                            Signature verified
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-[#27221c] rounded-lg">
                        <CheckCircleIcon className="w-5 h-5 text-[#2ccd2c]" />
                        <div className="flex-1">
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                            Authorized Signer
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                            Signature verified
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-[#27221c] rounded-lg">
                        <div className="w-5 h-5 rounded-full border-2 border-[#ff9500] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#ff9500] text-xs font-bold">!</span>
                        </div>
                        <div className="flex-1">
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                            You (Beneficiary)
                          </p>
                          <span className="bg-[#2ccd2c] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-0.5 rounded inline-block mt-1">
                            Sign
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

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
      </main>
    </BeneficiaryLayout>
  );
};
