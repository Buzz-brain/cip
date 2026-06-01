import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/useAuth';
import { usePlan } from '../../../context/usePlan';
import { extractErrorMessage, formatTimestampUtc } from '../../../lib/utils';
import FundPlanModal from '@components/ui/FundPlanModal';
import ConfirmModal from '../../../components/ui/ConfirmModal';
import { EditInheritanceModal } from '@components/ui/EditInheritanceModal';
import { SkeletonCard } from '@components/ui/skeleton-card';
import { Copy, Edit, X, Trash, PlusCircle, Home as HomeIcon } from "lucide-react";
import planTypeIcon from '../../../lib/icons/planTypeIcon';
import Tooltip from '@components/ui/Tooltip';
import Spinner from '@components/ui/Spinner';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const formatTs = (ts?: number | null) => {
  return formatTimestampUtc(ts);
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
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editBeneficiaries, setEditBeneficiaries] = useState<any[]>([]);
  const [cancelling, setCancelling] = useState(false);
  
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
        const isDeleted = Boolean(first && (first.deleted === true || payload?.deleted === true));
        if (updatedId && currentId && (updatedId === currentId || String(Number(updatedId)) === String(Number(currentId)))) {
          if (isDeleted) {
            // If the plan was deleted elsewhere, don't attempt to refetch the now-missing plan.
            return;
          }
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
      <div className="flex flex-col lg:flex-row items-start justify-between mb-6 gap-4">
        <div className="w-full lg:max-w-2xl">
          <div className="flex flex-col gap-2 mb-2">
            <header className="flex items-center gap-2 text-[#8b7b64]">
              <button onClick={() => navigate("/owner-dashboard")} className="hover:text-white transition-colors">
                <HomeIcon className="w-4 h-4" />
              </button>
              <span className="text-sm">/</span>
              <button onClick={() => navigate('/owner-dashboard/plans')} className="text-sm hover:text-white transition-colors">Owner Plans</button>
              <span className="text-sm">/</span>
              <span className="text-sm font-bold text-white">{detail?.plan ? `${detail.plan.name ?? `Plan #${detail.plan.id ?? detail.plan.contract_plan_id ?? '—'}`} Details` : 'Plan Details'}</span>
            </header>

            <div className="flex items-center gap-3">
              {planTypeIcon(detail?.plan?.plan_type, detail?.plan?.is_child_trust)}
              <h1 className="text-white text-2xl sm:text-3xl font-extrabold">{detail?.plan?.name ?? 'Plan Details'}</h1>
            </div>

            <div className="flex items-center gap-4 mt-1">
              <div className="text-sm text-[#B9B09D]">Plan {detail?.plan?.id ?? detail?.plan?.contract_plan_id ?? '—'}</div>
              <div className="flex items-center gap-2">
                {detail?.plan?.plan_type && <Badge className="text-xs font-bold px-3 py-1 bg-[#2b241d] mr-2 text-[#d1c3b4]">{detail.plan.plan_type}</Badge>}
                {detail?.plan?.is_child_trust && (
                  <Badge className="text-xs font-bold px-3 py-1 bg-[#0b3b2e] text-[#9fe8c9]">Child Trust</Badge>
                )}
                {detail?.plan?.is_cancelled ? (
                  <Badge className="text-xs font-bold px-3 py-1 bg-red-700 text-white">Cancelled</Badge>
                ) : detail?.plan?.is_funded ? (
                  <Badge className="text-xs font-bold px-3 py-1 bg-green-700 text-white">Funded</Badge>
                ) : (
                  <Badge className="text-xs font-bold px-3 py-1 bg-orange-600 text-white">Unfunded</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions row: placed below title/badges and above main details */}
      <div className="w-full mb-4 flex justify-end">
        <div className="flex items-center gap-2">
            {!detail?.plan?.is_funded && !detail?.plan?.is_cancelled && (user?.publicKey && String(user.publicKey).toLowerCase() === String(detail?.plan?.owner_wallet).toLowerCase()) && (
            <button className="px-4 py-2 rounded bg-[#ff6600] text-white font-medium shadow flex items-center transition transform hover:-translate-y-0.5 hover:scale-105" onClick={() => {
                const cid = Number(detail?.plan?.contract_plan_id ?? detail?.plan?.id ?? 0);
                setFundPlanContractId(cid);
                setFundModalOpen(true);
              }}>
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Fund Plan</span>
            </button>
            )}

          {(user?.publicKey && String(user.publicKey).toLowerCase() === String(detail?.plan?.owner_wallet).toLowerCase()) && (
            <div className="flex items-center gap-2">
              {!detail?.plan?.is_released && !detail?.plan?.is_cancelled && (
                <>
                  {!detail?.plan?.should_release && (
                    <Tooltip content="Edit beneficiaries" placement="top">
                      <button
                        aria-label="Edit beneficiaries"
                        title="Edit beneficiaries"
                        className="px-3 py-2 rounded border border-[#234ea8] text-[#cfe4ff] bg-transparent flex items-center gap-2 transition transform hover:-translate-y-0.5 hover:scale-105"
                        onClick={() => {
                          setEditBeneficiaries(Array.isArray(detail?.beneficiaries) ? detail.beneficiaries.map((b: any) => ({
                            id: b.id,
                            name: b.name || '',
                            relationship: b.relationship || '',
                            email: b.email || '',
                            wallet: b.wallet || b.wallet_address || '',
                            allocation_percentage: b.allocation_percentage ?? b.allocation ?? 0,
                          })) : []);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    </Tooltip>
                  )}

                  {!detail?.plan?.should_release && (
                    <Tooltip content={cancelling ? 'Cancelling…' : 'Cancel inheritance'} placement="top">
                      <button
                        aria-label="Cancel inheritance"
                        title="Cancel inheritance"
                        className="px-3 py-2 rounded border border-[#c37300] text-[#ffdcb3] bg-transparent flex items-center gap-2 transition transform hover:-translate-y-0.5 hover:scale-105"
                        onClick={() => {
                          if (!detail?.plan?.id && !detail?.plan?.contract_plan_id) { toast.error('Cannot determine plan id'); return; }
                          setConfirmCancelOpen(true);
                        }}
                        disabled={cancelling}
                      >
                        {cancelling ? (
                          <Spinner className="text-[#ffdcb3]" size={16} />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">{cancelling ? 'Cancelling' : 'Cancel'}</span>
                      </button>
                    </Tooltip>
                  )}

                  <Tooltip content="Delete inheritance" placement="top">
                    <button
                      aria-label="Delete inheritance"
                      title="Delete inheritance"
                      className="px-3 py-2 rounded border border-red-700 text-red-100 bg-transparent flex items-center gap-2 transition transform hover:-translate-y-0.5 hover:scale-105"
                      onClick={handleDelete}
                    >
                      <Trash className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </Tooltip>
                </>
              )}
            </div>
          )}
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
              <div className="space-y-6">
                <div>
                  <div className="text-xs text-[#8b7664]">Amount</div>
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl font-extrabold text-white">{detail.plan?.amount ?? '—'}</div>
                    <div className="text-sm text-[#b8a494]">{detail.plan?.crypto_asset ?? '—'}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#8b7664]">Owner Wallet</div>
                  <div className="text-white break-all font-mono text-sm flex items-center gap-2">
                    <span className="truncate">{detail.plan?.owner_wallet ?? '—'}</span>
                    {detail.plan?.owner_wallet && (
                      <button className="text-xs text-[#b8a494] px-2 py-1 border border-[#2f241c] rounded transition hover:bg-[#2a241b]" onClick={async () => { try { await navigator.clipboard.writeText(detail.plan.owner_wallet); toast.success('Copied owner wallet'); } catch (e) { toast.error('Copy failed'); } }}>
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#8b7664]">Contract Address</div>
                  <div className="text-white break-all font-mono text-sm flex items-center gap-2">
                    <span className="truncate">{detail.plan?.contract_address ?? '—'}</span>
                    {detail.plan?.contract_address && (
                      <button className="text-xs text-[#b8a494] px-2 py-1 border border-[#2f241c] rounded transition hover:bg-[#2a241b]" onClick={async () => { try { await navigator.clipboard.writeText(detail.plan.contract_address); toast.success('Copied contract address'); } catch (e) { toast.error('Copy failed'); } }}>                    
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {detail.plan?.protected_data && (
                  <div>
                    <div className="text-xs text-[#8b7664]">Protected Data</div>
                    <div className="text-white break-all font-mono text-sm">
                      <a 
                        href={`https://explorer.iex.ec/arbitrum-one/dataset/${detail.plan.protected_data}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#ff6600] hover:underline"
                      >
                        {detail.plan.protected_data}
                      </a>
                    </div>
                  </div>
                )}

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    {detail?.plan?.oracle_source ? (
                      <a
                        href={detail.plan.oracle_source}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={detail.plan.oracle_source}
                        className="text-[#ff6600] hover:underline break-all font-mono text-sm"
                      >
                        {detail.plan.oracle_source.length > 60 ? `${detail.plan.oracle_source.slice(0,60)}...` : detail.plan.oracle_source}
                      </a>
                    ) : (
                      <div className="text-white">—</div>
                    )}
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
                    onFundSuccess={() => {
                      try {
                        fetchDetail();
                      } catch (e) {
                        if (import.meta.env.DEV) console.warn('Auto-refetch after fund failed:', e);
                      }
                    }}
                  />
                )}

                {Array.isArray(detail?.beneficiaries) && detail.beneficiaries.length > 0 ? (
                  detail.beneficiaries.map((b: any) => {
                    const pct = Number(b.allocation_percentage ?? b.allocation ?? 0);
                    return (
                      <div key={b.id} className="p-4 bg-[#1b1612] border border-[#2a231c] rounded">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">{(b.name || b.wallet || '—').slice(0,2).toUpperCase()}</div>
                            <div>
                              <div className="text-white font-medium">{b.name || b.wallet}</div>
                              <div className="text-xs text-[#8b7664]">{b.relationship ? `${b.relationship} • ` : ''}{b.email ?? b.wallet}</div>
                            </div>
                          </div>

                          <div className="w-28 text-right">
                            <div className="text-sm text-[#b8a494] mb-2">{isNaN(pct) ? '—' : `${pct}%`}</div>
                            <div className="w-full h-2 bg-[#201912] rounded overflow-hidden">
                              <div className="h-2 bg-[#2ccd2c]" style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-[#b8a494]">No beneficiaries found</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity logs removed per request (backend lacks plan_id). */}
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

      {/* Cancel confirmation modal */}
      {confirmCancelOpen && (
        <ConfirmModal
          open={confirmCancelOpen}
          title="Cancel Inheritance"
          description="Are you sure you want to cancel this inheritance? This will stop automatic distributions but will not delete the plan." 
          confirmLabel="Yes, cancel"
          cancelLabel="Keep plan"
          loading={cancelling}
          onCancel={() => { if (!cancelling) setConfirmCancelOpen(false); }}
          onConfirm={async () => {
            setCancelling(true);
            try {
              const pid = Number(detail.plan.id ?? detail.plan.contract_plan_id ?? 0);
              if (planCtx?.cancelInheritance) {
                await planCtx.cancelInheritance(pid);
              } else {
                await fetch(`${BACKEND_API_URL}/inherit/cancel-inheritance/${pid}`, { method: 'PATCH', headers: { accept: 'application/json', ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}) } });
              }
              toast.success('Inheritance cancelled');
              setConfirmCancelOpen(false);
              await fetchDetail();
            } catch (e:any) {
              const m = e instanceof Error ? e.message : String(e);
              toast.error(`Cancel failed: ${m}`);
            } finally { setCancelling(false); }
          }}
        />
      )}

      {/* Edit inheritance modal - now using enhanced component */}
      <EditInheritanceModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        beneficiaries={editBeneficiaries}
        loading={editing}
        onSave={async (beneficiaries) => {
          if (!detail?.plan?.id) {
            toast.error('Cannot determine plan id');
            return;
          }
          setEditing(true);
          try {
            const payload = {
              id: Number(detail.plan.id ?? detail.plan.contract_plan_id ?? 0),
              beneficiaries: beneficiaries.map((b: any) => ({
                name: b.name,
                relationship: b.relationship,
                email: b.email,
                wallet: b.wallet,
                allocation_percentage: Number(b.allocation_percentage || 0),
              })),
            };
            if (planCtx?.editInheritance) {
              await planCtx.editInheritance(payload);
            } else {
              await fetch(`${BACKEND_API_URL}/inherit/edit-inheritance`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
                },
                body: JSON.stringify(payload),
              });
            }
            toast.success('Inheritance updated');
            setEditModalOpen(false);
            await fetchDetail();
          } catch (e: any) {
            const raw = e instanceof Error ? e.message : String(e);
            let cleaned = raw.replace(/^.*?:\s*/, '').replace(/^\d{3}\s*/, '').trim();
            try {
              const parsed = JSON.parse(cleaned);
              if (parsed && (parsed.detail || parsed.message)) cleaned = parsed.detail || parsed.message;
            } catch (_err) {
              // not JSON
            }
            const finalMsg = cleaned || raw || 'Update failed';
            toast.error(`Update failed: ${finalMsg}`);
          } finally {
            setEditing(false);
          }
        }}
      />
    </div>
  );
};

export default PlanDetail;
