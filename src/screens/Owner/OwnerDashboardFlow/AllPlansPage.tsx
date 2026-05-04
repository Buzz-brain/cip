import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../lib/utils";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

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

const getInitials = (name?: string): string => {
  if (!name || name === "—") return "—";
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0][0] + (parts[0][1] || "")).toUpperCase();
};

export const AllPlansPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"All Plans" | "Active" | "Pending" | "Triggered">("All Plans");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const tabs = ["All Plans", "Active", "Pending", "Triggered"] as const;

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
          name: it.name ?? `Plan #${it.id}`,
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
  }, [user?.token]);

  const navigate = useNavigate();

  const filtered = plans
    .filter((p) => {
      if (selectedFilter !== "All Plans" && p.status !== selectedFilter) {
        return false;
      }
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const beneficiaryNames = p.beneficiariesPreview?.map((b: any) => (b.name || b.wallet || "")).join(" ") || "";
      return (
        String(p.id).toLowerCase().includes(q) ||
        String(p.name).toLowerCase().includes(q) ||
        String(p.beneficiary?.name || "").toLowerCase().includes(q) ||
        beneficiaryNames.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      // Sort by creation date (newest first)
      const aCreated = Number(a.raw?.created_at ?? 0);
      const bCreated = Number(b.raw?.created_at ?? 0);
      return bCreated - aCreated;
    });

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [pageCount]);

  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-2xl font-bold">All Plans</h1>
        <div className="text-sm text-[#B9B09D]">{plans.length} total plans</div>
      </div>

      {/* Top filters */}
      <Card className="bg-[#231b16] border-[#393028] mb-6">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#B9B09D]" />
              <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="bg-[#2D241C] border border-[#393028] rounded-lg pl-10 pr-4 py-2 text-[#b8a494] placeholder-[#706758] text-sm w-full" placeholder="Search plans by id, name, beneficiary, wallet..." />
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <select value={selectedFilter} onChange={(e) => { setSelectedFilter(e.target.value as any); setCurrentPage(1); }} className="bg-[#2D241C] border border-[#393028] rounded-lg px-3 py-2 text-sm text-[#b8a494]">
              {tabs.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <select className="bg-[#2D241C] border border-[#393028] rounded-lg px-3 py-2 text-sm text-[#b8a494]">
              <option value="">All types</option>
              <option value="timelock">Time Lock</option>
              <option value="inactivity">Inactivity</option>
              <option value="health_oracle">Health Oracle</option>
            </select>

            <button onClick={() => { setSearchQuery(''); setSelectedFilter('All Plans'); setCurrentPage(1); }} className="px-3 py-2 bg-[#393028] text-white rounded">Reset</button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#261D18] border-[#393028]">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3a2f1e]">
                  <th className="text-left py-3 px-4 text-xs text-[#B9B09D]">Plan</th>
                  <th className="text-left py-3 px-4 text-xs text-[#B9B09D]">Beneficiary</th>
                  <th className="text-left py-3 px-4 text-xs text-[#B9B09D]">Assets</th>
                  <th className="text-left py-3 px-4 text-xs text-[#B9B09D]">Status</th>
                  <th className="text-left py-3 px-4 text-xs text-[#B9B09D]">Trig</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: pageSize }).map((_, i) => (
                    <tr key={`s-${i}`} className="border-b border-[#393028]">
                      <td className="py-4 px-4"><div className="h-6 bg-[#2f241c] rounded w-32" /></td>
                      <td className="py-4 px-4"><div className="h-4 bg-[#2f241c] rounded w-24" /></td>
                      <td className="py-4 px-4"><div className="h-4 bg-[#2f241c] rounded w-16" /></td>
                      <td className="py-4 px-4"><div className="h-4 bg-[#2f241c] rounded w-12" /></td>
                      <td className="py-4 px-4"><div className="h-4 bg-[#2f241c] rounded w-8" /></td>
                    </tr>
                  ))
                ) : paginated.length > 0 ? (
                  paginated.map((plan) => (
                    <tr key={plan.id} className="border-b border-[#393028] hover:bg-[#0d0b08] transition-colors cursor-pointer" onClick={() => {
                      const idNum = plan.raw?.id ?? plan.raw?.contract_plan_id ?? plan.id;
                      if (!idNum) {
                        toast.error('Cannot load plan details');
                        return;
                      }
                      navigate(`/owner-dashboard/plans/${idNum}`);
                    }}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#332619] rounded-lg flex items-center justify-center text-lg">{plan.chainIcon}</div>
                          <div>
                            <div className="font-bold text-white text-sm">{plan.name}</div>
                            <div className="text-[#8b7664] text-xs">#{plan.id} • {plan.chainName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{getInitials(plan.beneficiary?.name)}</div>
                          <span className="text-white text-sm">{plan.beneficiary?.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-white text-sm">{plan.assets}</div>
                          <div className="text-[#B9B09D] text-xs">{plan.assetsDetail}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${plan.status === "Active" ? "bg-green-500/20 text-green-400" : plan.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"} font-bold text-xs`}>{plan.status}</Badge>
                      </td>
                      <td className="py-4 px-4"><span className="text-[#8b7664] text-sm">{plan.triggerDays}h</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 px-4 text-center">
                      <p className="text-[#B9B09D]">No plans found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-[#B9B09D] text-sm">Showing {(filtered.length === 0) ? 0 : ((currentPage - 1) * pageSize + 1)} - {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} plans</span>
            <div className="flex items-center gap-4">
              <span className="text-[#B9B09D] text-xs">{currentPage} / {pageCount}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="w-8 h-8 rounded border border-[#B9B09D] hover:bg-[#2a1f10] flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-4 h-4 text-[#B9B09D]" />
                </button>
                <button onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))} className="w-8 h-8 rounded border border-[#B9B09D] hover:bg-[#2a1f10] flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4 text-[#B9B09D]" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllPlansPage;
