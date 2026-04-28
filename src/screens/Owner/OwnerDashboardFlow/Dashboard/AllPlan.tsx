import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../../../../context/useAuth";
import { toast } from "react-toastify";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "https://xcip.name.ng";

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
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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
          const text = await res.text();
          toast.error(`Failed to load plans: ${res.status} ${text}`);
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
    fetchPlans();
  }, [user?.token]);

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
                <tr key={plan.id} className="border-b border-[#393028] hover:bg-[#0d0b08] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#332619] rounded-lg flex items-center justify-center text-lg">{plan.chainIcon}</div>
                      <div>
                        <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">{plan.name}</div>
                        <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">#{plan.id} • {plan.chainName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{plan.beneficiary.avatar}</div>
                      <span className="[font-family:'Noto_Sans',Helvetica] text-white text-sm">{plan.beneficiary.name}</span>
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
