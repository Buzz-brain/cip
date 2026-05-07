import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/useAuth';
import { usePlan } from '../../../context/usePlan';
import { extractErrorMessage } from '../../../lib/utils';
import FundPlanModal from '@components/ui/FundPlanModal';
import useActivityLogs from '../../../lib/hooks/useActivityLogs';
import { SkeletonCard } from '@components/ui/skeleton-card';
import { Copy } from "lucide-react";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const formatTs = (ts?: number | null) => {
  if (!ts) return '—';
  try {
    const d = new Date(Number(ts) * 1000);
    return d.toLocaleString();
  } catch (e) {
    return String(ts);
  }
};

const shouldShowField = (planType: string | undefined, fieldName: string): boolean => {
  const hiddenFieldsByType: Record<string, Set<string>> = {
    timelock: new Set(['proof_of_life', 'grace_period', 'inactivity_period_days', 'last_active_at']),
    health_oracle: new Set(['proof_of_life', 'grace_period', 'release_timestamp', 'inactivity_period_days', 'last_active_at']),
    inactivity: new Set(['release_timestamp']),
  };

  const planTypeKey = (planType || '').toLowerCase();
  const hiddenFields = hiddenFieldsByType[planTypeKey] || new Set();
  return !hiddenFields.has(fieldName);
};

export const PlanDetail: React.FC = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<any | null>(null);
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [fundPlanContractId, setFundPlanContractId] = useState<number | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { logs, loading: logsLoading, error: logsError } = useActivityLogs(user?.token);
  const planCtx = usePlan();

  const fetchDetail = async () => {
    if (!planId) return;
    setLoading(true);
    try {
      const idNum = Number(planId);
      const res = await fetch(`${BACKEND_API_URL}/inherit/view-a-inheritances/${idNum}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        }
      });
      if (!res.ok) {
        const m = await extractErrorMessage(res);
        throw new Error(m || 'Failed to fetch plan');
      }
      const j = await res.json();
      setDetail(j?.data ?? null);
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      toast.error(`Error loading plan: ${m}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [planId, user?.token]);

  // Subscribe to plan updates (e.g., funded) and refetch when this plan is updated
  useEffect(() => {
    const onUpdated = (detail?: any) => {
      try {
        const payload = detail && (detail as any).detail !== undefined ? (detail as any).detail : detail;
        const first = Array.isArray(payload) && payload.length > 0 ? payload[0] : payload;
        const updatedId = first ? String(first.id ?? first.contract_plan_id ?? first.plan?.id ?? '') : '';
        const currentId = String(planId ?? '');
        if (updatedId && currentId && (updatedId === currentId || String(Number(updatedId)) === String(Number(currentId)))) {
          fetchDetail();
        }
      } catch (e) {
        // ignore
      }
    };
    if (planCtx?.subscribePlansUpdated) {
      const unsub = planCtx.subscribePlansUpdated(onUpdated);
      return () => unsub();
    }
    // fallback: listen to window event
    window.addEventListener('plans:updated', onUpdated as any);
    return () => window.removeEventListener('plans:updated', onUpdated as any);
  }, [planId, user?.token, planCtx]);

  // Auto-open fund modal if ?action=fund is in the URL and plan details are loaded
  useEffect(() => {
    if (searchParams.get('action') === 'fund' && detail?.plan && !fundModalOpen) {
      const cid = Number(detail.plan.contract_plan_id ?? detail.plan.id ?? 0);
      if (cid) {
        setFundPlanContractId(cid);
        setFundModalOpen(true);
        // Remove the action param from URL to avoid re-opening on re-renders
        navigate(`/owner-dashboard/plans/${planId}`, { replace: true });
      }
    }
  }, [detail, searchParams, fundModalOpen, planId, navigate]);

  const handleDelete = () => {
    setConfirmDeleteOpen(true);
  };

  const performDelete = async () => {
    if (!detail?.plan?.id && !detail?.plan?.contract_plan_id) {
      toast.error('Cannot determine plan id for deletion');
      return;
    }
    const planIdNum = Number(detail?.plan?.id ?? detail?.plan?.contract_plan_id ?? 0);
    setDeleting(true);
    try {
      const resp = await fetch(`${BACKEND_API_URL}/inherit/delete-inheritances/${planIdNum}`, {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        }
      });
      if (!resp.ok) {
        let errorMessage = `Error deleting plan (Status: ${resp.status})`;
        try {
          const errorData = await resp.json();
          if (errorData?.detail) {
            errorMessage = errorData.detail;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
        } catch {
          // If JSON parsing fails, try to get plain text
          try {
            const text = await resp.text();
            if (text) errorMessage = text;
          } catch {}
        }
        throw new Error(errorMessage);
      }
      toast.success('Plan deleted successfully');
      setConfirmDeleteOpen(false);
      // Navigate back to plans list immediately (before emitting update to avoid 404 fetch)
      navigate('/owner-dashboard/plans');
      // Notify other parts of the app that plans changed
      try {
        planCtx?.emitPlansUpdated?.({ id: planIdNum, deleted: true });
      } catch (e) {
        // ignore
      }
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      toast.error(m);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <button onClick={() => navigate(-1)} className="text-sm text-[#B9B09D] mb-2">← Back</button>
          <h1 className="text-white text-3xl font-extrabold">{detail?.plan?.name ?? 'Plan Details'}</h1>
          <div className="mt-2 text-sm text-[#B9B09D]">Plan {detail?.plan?.id ?? detail?.plan?.contract_plan_id ?? '—'}</div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {detail?.plan?.plan_type && <Badge className="text-xs font-bold px-3 py-2 bg-[#2b241d] text-[#d1c3b4]">{detail.plan.plan_type}</Badge>}
          {detail?.plan?.is_funded ? <Badge className="text-xs font-bold px-3 py-2 bg-green-700 text-white">Funded</Badge> : <Badge className="text-xs font-bold px-3 py-2 bg-yellow-600 text-white">Unfunded</Badge>}
          <div className="flex gap-2">
            {!detail?.plan?.is_funded && (user?.publicKey && String(user.publicKey).toLowerCase() === String(detail?.plan?.owner_wallet).toLowerCase()) && (
              <button className="px-4 py-2 rounded bg-[#ff6600] text-white" onClick={() => {
                const cid = Number(detail?.plan?.contract_plan_id ?? detail?.plan?.id ?? 0);
                setFundPlanContractId(cid);
                setFundModalOpen(true);
              }}>Fund Plan</button>
            )}

            {(user?.publicKey && String(user.publicKey).toLowerCase() === String(detail?.plan?.owner_wallet).toLowerCase()) && (
              <button className="px-4 py-2 rounded bg-red-700 text-white" onClick={handleDelete}>Delete</button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left summary */}
        <Card className="bg-[#15120f] border-[#2e281f]">
          <CardContent className="p-6">
            {loading ? (
              <SkeletonCard />
            ) : !detail ? (
              <div className="text-[#b8a494]">No plan details found</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-[#8b7664]">Amount</div>
                  <div className="text-3xl font-bold text-white">{detail.plan?.amount ?? '—'}</div>
                  <div className="text-sm text-[#b8a494] mt-1">Asset: {detail.plan?.crypto_asset ?? '—'}</div>
                </div>

                <div>
                  <div className="text-xs text-[#8b7664]">Owner Wallet</div>
                  <div className="text-white break-all font-mono text-sm flex items-center gap-2">
                    <span>{detail.plan?.owner_wallet ?? '—'}</span>
                    {detail.plan?.owner_wallet && (
                      <button className="text-xs text-[#b8a494] px-2 py-1 border border-[#2f241c] rounded" onClick={async () => { try { await navigator.clipboard.writeText(detail.plan.owner_wallet); toast.success('Copied owner wallet'); } catch (e) { toast.error('Copy failed'); } }}>
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#8b7664]">Contract Address</div>
                  <div className="text-white break-all font-mono text-sm flex items-center gap-2">
                    <span>{detail.plan?.contract_address ?? '—'}</span>
                    {detail.plan?.contract_address && (
                      <button className="text-xs text-[#b8a494] px-2 py-1 border border-[#2f241c] rounded" onClick={async () => { try { await navigator.clipboard.writeText(detail.plan.contract_address); toast.success('Copied contract address'); } catch (e) { toast.error('Copy failed'); } }}>                    
                      <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {shouldShowField(detail.plan?.plan_type, 'release_timestamp') && (
                  <div>
                    <div className="text-xs text-[#8b7664]">Release At</div>
                    <div className="text-white">{formatTs(detail.plan?.release_timestamp)}</div>
                  </div>
                )}

                <div>
                  <div className="text-xs text-[#8b7664]">Created</div>
                  <div className="text-white">{formatTs(detail.plan?.created_at)}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right details (span 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="space-y-4">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
          <>
          <Card className="bg-[#1f1915] border-[#3a2f1e]">
            <CardContent className="p-6">
              <div className="text-sm text-[#d1c3b4] space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#8b7664]">Plan ID</div>
                    <div className="font-mono text-white">{detail?.plan?.id ?? detail?.plan?.contract_plan_id ?? '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#8b7664]">Plan Type</div>
                    <div className="text-white">{detail?.plan?.plan_type ?? '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#8b7664]">Contract Plan ID</div>
                    <div className="text-white">{detail?.plan?.contract_plan_id ?? '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#8b7664]">Is Released</div>
                    <div className="text-white">{detail?.plan?.is_released ? 'Yes' : 'No'}</div>
                  </div>
                </div>

                {shouldShowField(detail?.plan?.plan_type, 'grace_period') && (
                  <div>
                    <div className="text-xs text-[#8b7664]">Grace Period</div>
                    <div className="text-white">{detail?.plan?.grace_period ?? '—'}</div>
                  </div>
                )}

                {detail?.plan?.plan_type === 'health_oracle' && (
                  <div>
                    <div className="text-xs text-[#8b7664]">Oracle Source</div>
                    <div className="text-white">{detail?.plan?.oracle_source ?? '—'}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#13100d] border-[#2a241c]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-[#8b7664]">Beneficiaries</div>
                  <div className="text-sm text-[#d1c3b4]">Allocation and contact information</div>
                </div>
              </div>

              <div className="space-y-3">
                {fundModalOpen && fundPlanContractId !== null && (
                  <FundPlanModal
                    open={fundModalOpen}
                    onClose={() => { setFundModalOpen(false); setFundPlanContractId(null); }}
                    contractPlanId={fundPlanContractId}
                    planDbId={detail?.plan?.id ?? null}
                    defaultAmount={String(detail?.plan?.amount ?? '')}
                    userToken={user?.token ?? null}
                    ownerWallet={detail?.plan?.owner_wallet ?? null}
                  />
                )}

                {Array.isArray(detail?.beneficiaries) && detail.beneficiaries.length > 0 ? (
                  detail.beneficiaries.map((b: any) => (
                    <div key={b.id} className="p-4 bg-[#1b1612] border border-[#2a231c] rounded flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold">{(b.name || b.wallet || '—').slice(0,2).toUpperCase()}</div>
                        <div>
                          <div className="text-white font-medium">{b.name || b.wallet}</div>
                          <div className="text-xs text-[#8b7664]">{b.relationship ? `${b.relationship} • ` : ''}{b.email ?? b.wallet}</div>
                        </div>
                      </div>
                      <div className="text-sm text-[#b8a494]">{b.allocation_percentage ? `${b.allocation_percentage}%` : '—'}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-[#b8a494]">No beneficiaries found</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity logs */}
          <Card className="bg-[#0f0d0b] border-[#241f18]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-[#8b7664]">Activity</div>
                  <div className="text-sm text-[#d1c3b4]">Recent actions for this plan</div>
                </div>
                <div className="text-xs text-[#8b7664]">{logsLoading ? 'Loading...' : ''}</div>
              </div>

              <div className="space-y-2">
                {logsLoading && <div className="text-[#b8a494]">Loading activity...</div>}
                {!logsLoading && logsError && <div className="text-[#b8a494]">Error loading activity</div>}
                {!logsLoading && !logsError && Array.isArray(logs) && logs.filter((l: any) => String(l.plan_id ?? l.inherit_id ?? l.inheritance_id ?? l.id ?? '') === String(detail?.plan?.id ?? detail?.plan?.contract_plan_id ?? '')).slice(0,12).map((item: any, idx: number) => {
                  const ts = item.timestamp ?? item.created_at ?? item.createdAt ?? item.time ?? null;
                  const when = ts ? (Number(ts) > 1e12 ? new Date(Number(ts)).toLocaleString() : new Date(Number(ts) * 1000).toLocaleString()) : '';
                  const msg = item.message ?? item.msg ?? item.event ?? JSON.stringify(item);
                  return (
                    <div key={idx} className="p-3 bg-[#171412] border border-[#241f18] rounded text-xs text-[#d1c3b4]">
                      <div className="text-sm text-white">{msg}</div>
                      <div className="text-[#8b7664] text-xs mt-1">{when}</div>
                    </div>
                  );
                })}
                {!logsLoading && Array.isArray(logs) && logs.filter((l: any) => String(l.plan_id ?? l.inherit_id ?? l.inheritance_id ?? l.id ?? '') === String(detail?.plan?.id ?? detail?.plan?.contract_plan_id ?? '')).length === 0 && (
                  <div className="text-[#b8a494]">No activity logs</div>
                )}
              </div>
            </CardContent>
          </Card>
          </>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirmDeleteOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-[10000]" onClick={() => { if (!deleting) { setConfirmDeleteOpen(false); } }} />
          <div className="relative bg-[#1f1915] border border-[#3a2f1e] rounded-lg w-[90%] max-w-md p-6 z-[10001]">
            <h3 className="text-white font-bold mb-2">Confirm Delete</h3>
            <div className="text-sm text-[#d1c3b4] mb-4">Are you sure you want to delete this inheritance plan? This action cannot be undone.</div>
            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 rounded bg-[#393028] text-white" onClick={() => { if (!deleting) { setConfirmDeleteOpen(false); } }}>Cancel</button>
              <button className="px-4 py-2 rounded bg-red-700 text-white" onClick={() => performDelete()} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanDetail;
