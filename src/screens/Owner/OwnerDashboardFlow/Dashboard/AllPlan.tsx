import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../../../../context/useAuth";
import { usePlan } from "../../../../context/usePlan";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../../lib/utils";
import FundPlanModal from "../../../../components/ui/FundPlanModal";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

interface Props {
  showValues: boolean;
}

const chainIconFor = (chain?: string) => {
  if (!chain) return "🔗";
  switch (chain.toLowerCase()) {
    case "eth":
    case "ethereum":
      return "💎";
    case "btc":
    case "bitcoin":
      return "₿";
    case "polygon":
      return "⭕";
    default:
      return "🔗";
  }
};

export const AllPlan: React.FC<Props> = ({ showValues }) => {
  const { user } = useAuth();
  const planCtx = usePlan();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanDetail, setSelectedPlanDetail] = useState<any | null>(null);
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [fundPlanContractId, setFundPlanContractId] = useState<number | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeletePlan, setPendingDeletePlan] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedPlanId, setHighlightedPlanId] = useState<string | null>(null);
  const highlightTimerRef = React.useRef<number | null>(null);

  const formatTs = (ts?: number | null) => {
    if (!ts) return "—";
    try {
      // backend returns seconds
      const d = new Date(Number(ts) * 1000);
      return d.toLocaleString();
    } catch (e) {
      return String(ts);
    }
  };

  // extract fetchPlans so other handlers (delete, refresh) can call it
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API_URL}/inherit/view-inheritances`, {
        method: "GET",
        headers: {
          accept: "application/json",
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
      });
      if (!res.ok) {
        const errorMsg = await extractErrorMessage(res);
        toast.error(`Failed to load plans: ${errorMsg}`);
        setPlans([]);
        return;
      }
      const json = await res.json();
      const items = Array.isArray(json?.data) ? json.data : [];
      const mapped = items.map((it: any) => {
        const isFunded = !!it.is_funded;
        const isReleased = !!it.is_released;
        const releaseTs = it.release_timestamp ? Number(it.release_timestamp) : null;
        let triggerHours = 0;
        if (releaseTs) {
          const ms = releaseTs * 1000 - Date.now();
          triggerHours = Math.max(0, Math.ceil(ms / (1000 * 60 * 60)));
        }
        return {
          id: String(it.id ?? it.contract_plan_id ?? "-"),
          name: it.plan_type ? it.plan_type : `Plan #${it.id}`,
          chainName: it.crypto_asset ?? "-",
          chainIcon: chainIconFor(it.crypto_asset),
          beneficiary: { name: it.owner_wallet ?? "—", avatar: (it.owner_wallet || "—").slice(2, 4).toUpperCase() },
          beneficiariesPreview: [],
          assets: it.amount ? String(it.amount) : "—",
          assetsDetail: it.crypto_asset ?? "—",
          status: isReleased ? "Triggered" : isFunded ? "Active" : "Pending",
          statusColor: isReleased ? "bg-red-500" : isFunded ? "bg-green-500" : "bg-yellow-500",
          triggerDays: triggerHours || 0,
          raw: it,
        };
      });
      setPlans(mapped);
      // Fetch single inheritance details for each plan to populate beneficiaries preview (non-blocking)
      (async () => {
        try {
          const detailed = await Promise.all(
            mapped.map(async (p: any) => {
              const idNum = p.raw?.id ?? p.raw?.contract_plan_id;
              if (!idNum) return { id: p.id, beneficiariesPreview: [] };
              try {
                const r = await fetch(`${BACKEND_API_URL}/inherit/view-a-inheritances/${idNum}`, {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
                  },
                });
                if (!r.ok) return { id: p.id, beneficiariesPreview: [] };
                const j = await r.json();
                const bens = Array.isArray(j?.data?.beneficiaries) ? j.data.beneficiaries : [];
                return { id: p.id, beneficiariesPreview: bens };
              } catch (e) {
                return { id: p.id, beneficiariesPreview: [] };
              }
            })
          );
          // merge previews back into state
          setPlans((prev) => prev.map((pp: any) => {
            const found = detailed.find((d: any) => String(d.id) === String(pp.id));
            return found ? { ...pp, beneficiariesPreview: found.beneficiariesPreview } : pp;
          }));
        } catch (e) {
          // ignore preview fetch errors
        }
      })();
    } catch (err) {
      const m = err instanceof Error ? err.message : String(err);
      toast.error(`Error loading plans: ${m}`);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();

    const onConfirmed = async (detail?: any) => {
      // refresh plans when proof-of-life confirmation occurs
      try {
        await fetchPlans();
      } catch (e) {
        // ignore
      }
      // highlight the updated plan if detail provided
      try {
        const payload = detail && (detail as any).detail !== undefined ? (detail as any).detail : detail;
        const first = Array.isArray(payload) && payload.length > 0 ? payload[0] : payload;
        const confirmedId = first ? String(first.id ?? first.contract_plan_id ?? first.contract_plan_id ?? "") : "";
        if (confirmedId) {
          setHighlightedPlanId(String(confirmedId));
          if (highlightTimerRef.current) {
            window.clearTimeout(highlightTimerRef.current);
          }
          highlightTimerRef.current = window.setTimeout(() => {
            setHighlightedPlanId(null);
            highlightTimerRef.current = null;
          }, 6000);
        }
      } catch (e) {
        // ignore
      }
    };
    if (planCtx?.subscribePlansUpdated) {
      const unsubscribe = planCtx.subscribePlansUpdated(onConfirmed);
      return () => unsubscribe();
    }
    // fallback to window event for compatibility
    window.addEventListener('proofOfLife:confirmed', onConfirmed);
    return () => {
      window.removeEventListener('proofOfLife:confirmed', onConfirmed);
    };
  }, [user?.token]);

  // Delete a plan via backend API
  const handleDelete = async (planObj: any) => {
    const planIdNum = Number(planObj?.plan?.id ?? planObj?.plan?.contract_plan_id ?? 0);
    if (!planIdNum) {
      toast.error('Cannot determine plan id for deletion');
      return;
    }
    // open custom confirm modal
    setPendingDeletePlan(planObj);
    setConfirmDeleteOpen(true);
  };

  const performDelete = async () => {
    if (!pendingDeletePlan) return;
    const planIdNum = Number(pendingDeletePlan?.plan?.id ?? pendingDeletePlan?.plan?.contract_plan_id ?? 0);
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
      setModalOpen(false);
      setSelectedPlanDetail(null);
      setConfirmDeleteOpen(false);
      setPendingDeletePlan(null);
      // refresh plans
      await fetchPlans();
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      toast.error(m);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = plans.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      String(p.id).toLowerCase().includes(q) ||
      String(p.name).toLowerCase().includes(q) ||
      String(p.beneficiary?.name || "").toLowerCase().includes(q)
    );
  });

  return (
    <Card className="bg-[#261D18] border-[#393028]">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-lg bg-[#393028] border border-[#FF660080] text-white [font-family:'Noto_Sans',Helvetica] font-medium text-sm">
            All Plans
          </button>
          {[
            "Active",
            "Pending",
            "Triggered",
          ].map((status) => (
            <button key={status} className="px-4 py-2 rounded-lg text-[#B9B09D] hover:bg-[#2a1f10] [font-family:'Noto_Sans',Helvetica] text-sm">
              {status}
            </button>
          ))}

          <div className="ml-auto relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#B9B09D]" />
            <input
              type="text"
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#2D241C] border border-[#393028] rounded-lg pl-10 pr-4 py-2 text-[#b8a494] placeholder-[#706758] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
            />
          </div>
        </div>
        {/* Plan details modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => { setModalOpen(false); setSelectedPlanDetail(null); }} />
            <div className="relative bg-[#1f1915] border border-[#3a2f1e] rounded-lg w-[90%] max-w-2xl p-6 z-60">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-white font-bold">Plan Details</h3>
                <button className="text-[#b8a494]" onClick={() => { setModalOpen(false); setSelectedPlanDetail(null); }}>Close</button>
              </div>
              <div className="max-h-[72vh] overflow-auto pr-2 scrollbar-thin-custom">
                {!selectedPlanDetail ? (
                  <div className="text-[#b8a494]">Loading...</div>
                ) : (
                  <div className="space-y-4 text-sm text-[#d1c3b4]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-[#8b7664]">Plan ID</div>
                        <div className="font-mono text-white">{selectedPlanDetail.plan?.id ?? selectedPlanDetail.plan?.contract_plan_id}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Type</div>
                        <div className="text-white">{selectedPlanDetail.plan?.plan_type}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Owner Wallet</div>
                        <div className="text-white">{selectedPlanDetail.plan?.owner_wallet}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Asset</div>
                        <div className="text-white">{selectedPlanDetail.plan?.crypto_asset}</div>
                      </div>

                      <div>
                        <div className="text-xs text-[#8b7664]">Contract Plan ID</div>
                        <div className="text-white">{selectedPlanDetail.plan?.contract_plan_id ?? '—'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Proof of Life</div>
                        <div className="text-white">{selectedPlanDetail.plan?.proof_of_life ?? '—'}</div>
                      </div>

                      <div>
                        <div className="text-xs text-[#8b7664]">Contract Address</div>
                        <div className="text-white">{selectedPlanDetail.plan?.contract_address ?? '—'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Grace Period</div>
                        <div className="text-white">{selectedPlanDetail.plan?.grace_period ?? '—'}</div>
                      </div>

                      <div>
                        <div className="text-xs text-[#8b7664]">Oracle Source</div>
                        <div className="text-white">{selectedPlanDetail.plan?.oracle_source ?? '—'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Amount</div>
                        <div className="text-white">{selectedPlanDetail.plan?.amount ?? '—'}</div>
                      </div>

                      <div>
                        <div className="text-xs text-[#8b7664]">Is Funded</div>
                        <div className="text-white">{selectedPlanDetail.plan?.is_funded ? 'Yes' : 'No'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Should Release</div>
                        <div className="text-white">{selectedPlanDetail.plan?.should_release ? 'Yes' : 'No'}</div>
                      </div>

                      <div>
                        <div className="text-xs text-[#8b7664]">Release Timestamp</div>
                        <div className="text-white">{formatTs(selectedPlanDetail.plan?.release_timestamp)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Is Released</div>
                        <div className="text-white">{selectedPlanDetail.plan?.is_released ? 'Yes' : 'No'}</div>
                      </div>

                      <div>
                        <div className="text-xs text-[#8b7664]">Inactivity Period (days)</div>
                        <div className="text-white">{selectedPlanDetail.plan?.inactivity_period_days ?? '—'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Created At</div>
                        <div className="text-white">{formatTs(selectedPlanDetail.plan?.created_at)}</div>
                      </div>

                      <div>
                        <div className="text-xs text-[#8b7664]">Last Active</div>
                        <div className="text-white">{formatTs(selectedPlanDetail.plan?.last_active_at)}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {!selectedPlanDetail.plan?.is_funded && (user?.publicKey && String(user.publicKey).toLowerCase() === String(selectedPlanDetail.plan?.owner_wallet).toLowerCase()) && (
                        <button className="px-4 py-2 rounded bg-[#ff6600] text-white" onClick={() => {
                          const cid = Number(selectedPlanDetail.plan?.contract_plan_id ?? selectedPlanDetail.plan?.id ?? 0);
                          console.log('[AllPlan] opening FundPlanModal', { contractPlanId: cid, user: user?.publicKey });
                          setFundPlanContractId(cid);
                          setFundModalOpen(true);
                        }}>Fund Plan</button>
                      )}
                      {/* Owner-only Delete button */}
                      {(user?.publicKey && String(user.publicKey).toLowerCase() === String(selectedPlanDetail.plan?.owner_wallet).toLowerCase()) && (
                        <button
                          className="px-4 py-2 rounded bg-red-700 text-white"
                          onClick={() => handleDelete(selectedPlanDetail)}
                        >
                          Delete Inheritance
                        </button>
                      )}
                      <button className="px-4 py-2 rounded bg-[#393028] text-white" onClick={() => { setModalOpen(false); setSelectedPlanDetail(null); }}>Close</button>
                    </div>

                    <div>
                      <div className="text-xs text-[#8b7664]">Beneficiaries</div>
                      <div className="mt-2 space-y-2">
                          {fundModalOpen && fundPlanContractId !== null && (
                          <FundPlanModal
                            open={fundModalOpen}
                            onClose={() => { setFundModalOpen(false); setFundPlanContractId(null); }}
                            contractPlanId={fundPlanContractId}
                            defaultAmount={String(selectedPlanDetail?.plan?.amount ?? '')}
                            userToken={user?.token ?? null}
                            ownerWallet={selectedPlanDetail?.plan?.owner_wallet ?? null}
                          />
                        )}

                        {Array.isArray(selectedPlanDetail.beneficiaries) && selectedPlanDetail.beneficiaries.length > 0 ? (
                          selectedPlanDetail.beneficiaries.map((b: any) => (
                            <div key={b.id} className="p-3 bg-[#231b16] border border-[#2f241c] rounded">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-white font-medium">{b.name || b.wallet}</div>
                                  <div className="text-xs text-[#8b7664]">{b.relationship ? `${b.relationship} • ` : ''}{b.email ?? b.wallet}</div>
                                  <div className="text-xs text-[#8b7664]">Wallet: {b.wallet}</div>
                                </div>
                                <div className="text-sm text-[#b8a494]">{b.allocation_percentage ? `${b.allocation_percentage}%` : '—'}</div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-[#b8a494]">No beneficiaries found</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Custom confirm delete modal (global) */}
        {confirmDeleteOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 z-[10000]" onClick={() => { if (!deleting) { setConfirmDeleteOpen(false); setPendingDeletePlan(null); } }} />
            <div className="relative bg-[#1f1915] border border-[#3a2f1e] rounded-lg w-[90%] max-w-md p-6 z-[10001]">
              <h3 className="text-white font-bold mb-2">Confirm Delete</h3>
              <div className="text-sm text-[#d1c3b4] mb-4">Are you sure you want to delete this inheritance plan? This action cannot be undone.</div>
              <div className="flex gap-2 justify-end">
                <button className="px-4 py-2 rounded bg-[#393028] text-white" onClick={() => { if (!deleting) { setConfirmDeleteOpen(false); setPendingDeletePlan(null); } }}>Cancel</button>
                <button className="px-4 py-2 rounded bg-red-700 text-white" onClick={() => performDelete()} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete'}</button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a2f1e]">
                <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-medium text-[#B9B09D] text-xs uppercase tracking-wider">Plan ID & Chain</th>
                <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-medium text-[#B9B09D] text-xs uppercase tracking-wider">Beneficiary</th>
                <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-medium text-[#B9B09D] text-xs uppercase tracking-wider">Assets</th>
                <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-medium text-[#B9B09D] text-xs uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-medium text-[#B9B09D] text-xs uppercase tracking-wider">Trig</th>
              </tr>
            </thead>
            <tbody>
              {(loading ? Array.from({ length: 3 }).map((_, i) => (
                <tr key={`s-${i}`} className="border-b border-[#393028]">
                  <td className="py-4 px-4"><div className="h-6 bg-[#2f241c] rounded w-32" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#2f241c] rounded w-24" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#2f241c] rounded w-16" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#2f241c] rounded w-12" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#2f241c] rounded w-8" /></td>
                </tr>
              )) : filtered.map((plan) => (
                <tr key={plan.id} className={`border-b border-[#393028] hover:bg-[#0d0b08] transition-colors cursor-pointer ${plan.id === highlightedPlanId ? 'ring-2 ring-green-400/40 bg-green-900/5' : ''}`} onClick={async () => {
                  const idNum = plan.raw?.id ?? plan.raw?.contract_plan_id;
                  if (!idNum) {
                    toast.error('Cannot load plan details');
                    return;
                  }
                  setModalOpen(true);
                  setSelectedPlanDetail(null);
                  try {
                    const r = await fetch(`${BACKEND_API_URL}/inherit/view-a-inheritances/${idNum}`, {
                      method: 'GET',
                      headers: {
                        accept: 'application/json',
                        ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
                      }
                    });
                    if (!r.ok) {
                      const errorMsg = await extractErrorMessage(r);
                      toast.error(`Failed to load plan details: ${errorMsg}`);
                      setSelectedPlanDetail(null);
                      return;
                    }
                    const j = await r.json();
                    setSelectedPlanDetail(j?.data ?? null);
                  } catch (err) {
                    const m = err instanceof Error ? err.message : String(err);
                    toast.error(`Error loading plan details: ${m}`);
                    setSelectedPlanDetail(null);
                  }
                }}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#332619] rounded-lg flex items-center justify-center text-lg">{plan.chainIcon}</div>
                      <div>
                        <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">{plan.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">#{plan.id} • {plan.chainName}</div>
                          {plan.id === highlightedPlanId && (
                            <Badge className="ml-2 bg-green-600 text-white text-xs">Updated</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{plan.beneficiary.avatar}</div>
                      <span className="[font-family:'Noto_Sans',Helvetica] text-white text-sm">{(plan.beneficiariesPreview && plan.beneficiariesPreview.length > 0) ? (plan.beneficiariesPreview[0].name || plan.beneficiariesPreview[0].wallet) : plan.beneficiary.name}</span>
                      {plan.beneficiariesPreview && plan.beneficiariesPreview.length > 1 && (
                        <span className="ml-2 text-xs text-[#8b7664]">+{plan.beneficiariesPreview.length - 1} more</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="[font-family:'Space_Grotesk',Helvetica] text-white text-sm">{showValues ? plan.assets : "••••••"}</div>
                      <div className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-xs">{plan.assetsDetail}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={`${plan.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : plan.status === "Pending" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"} [font-family:'Noto_Sans',Helvetica] font-bold text-xs`}>{plan.status === "Active" ? "● Active" : plan.status === "Pending" ? "● Pending" : "● Triggered"}</Badge>
                  </td>
                  <td className="py-4 px-4"><span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">{plan.triggerDays}h</span></td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">Showing {filtered.length > 0 ? `1-${filtered.length}` : '0'} of {plans.length} plans</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded border border-[#B9B09D] hover:bg-[#2a1f10] flex items-center justify-center"><ChevronLeft className="w-4 h-4 text-[#B9B09D]" /></button>
            <button className="w-8 h-8 rounded border border-[#B9B09D] hover:bg-[#2a1f10] flex items-center justify-center"><ChevronRight className="w-4 h-4 text-[#B9B09D]" /></button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllPlan;
