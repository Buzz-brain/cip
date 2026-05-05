import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Circle, Upload } from "lucide-react";
import { useAuth } from "../../../context/useAuth";
import { toast } from "react-toastify";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

interface ApiInheritancePlan {
  plan: {
    id: number;
    contract_plan_id: number;
    owner_wallet: string;
    owner_id: number;
    name?: string | null;
    plan_type: string;
    is_funded: boolean;
    is_released: boolean;
    should_release: boolean;
    inactivity_period_days?: number;
    created_at: number;
    last_active_at: number;
  };
  beneficiaries: Array<{
    name: string;
    relationship: string;
    wallet: string;
    email: string;
    allocation_percentage: number;
  }>;
}

interface InheritancePlan {
  id: number;
  owner_name: string;
  plan_type: string;
  status: string;
  assets: string;
  owner_initials?: string;
}

const AssignedInheritancePlans: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plans, setPlans] = useState<InheritancePlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<InheritancePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanDetail, setSelectedPlanDetail] = useState<any | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPlans(plans);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredPlans(
        plans.filter(
          (p) =>
            p.owner_name.toLowerCase().includes(query) ||
            p.plan_type.toLowerCase().includes(query) ||
            String(p.id).includes(query)
        )
      );
    }
  }, [searchQuery, plans]);

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("released") || lowerStatus.includes("triggered")) {
      return { bg: "bg-red-500/20", text: "text-red-400", label: "Released" };
    }
    if (lowerStatus.includes("pending")) {
      return { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Pending" };
    }
    if (lowerStatus.includes("funded") || lowerStatus.includes("active")) {
      return { bg: "bg-green-500/20", text: "text-green-400", label: "Funded" };
    }
    if (lowerStatus.includes("completed")) {
      return { bg: "bg-gray-500/20", text: "text-gray-400", label: "Completed" };
    }
    return { bg: "bg-gray-500/20", text: "text-gray-400", label: status };
  };

  const shouldShowField = (planType: string | undefined, fieldName: string): boolean => {
    const hiddenFieldsByType: Record<string, Set<string>> = {
      timelock: new Set(["proof_of_life", "grace_period", "inactivity_period_days", "last_active_at"]),
      health_oracle: new Set(["proof_of_life", "grace_period", "release_timestamp", "inactivity_period_days", "last_active_at"]),
      inactivity: new Set(["release_timestamp"]),
    };

    const planTypeKey = (planType || "").toLowerCase();
    const hiddenFields = hiddenFieldsByType[planTypeKey] || new Set();
    return !hiddenFields.has(fieldName);
  };

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API_URL}/exec/inheritances-plan`, {
        method: "GET",
        headers: {
          accept: "application/json",
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch assigned plans");
      }
      const data = await res.json();
      
      // Transform API response to component format
      let plansList: InheritancePlan[] = [];
      if (data?.plan) {
        // Single plan returned from API
        const apiPlan: ApiInheritancePlan = data;
        const rawName = apiPlan.plan.name?.toString()?.trim();
        const displayName = rawName && rawName.length > 0 ? rawName : `Plan #${apiPlan.plan.id}`;
        const status = apiPlan.plan.is_released ? "Released" : apiPlan.plan.is_funded ? "Funded" : "Pending";

        plansList = [{
          id: apiPlan.plan.id,
          owner_name: displayName,
          plan_type: apiPlan.plan.plan_type,
          status: status,
          assets: apiPlan.beneficiaries.length > 0 ? `${apiPlan.beneficiaries.length} beneficiary(ies)` : "No beneficiaries",
          owner_initials: displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
        }];
      } else if (Array.isArray(data?.data)) {
        // Multiple plans returned (for future compatibility)
        plansList = data.data.map((item: any) => {
          const rawName = item.plan?.name?.toString()?.trim();
          const displayName = rawName && rawName.length > 0 ? rawName : `Plan #${item.plan?.id ?? item.id}`;
          return {
            id: item.plan?.id || item.id,
            owner_name: displayName,
            plan_type: item.plan?.plan_type || item.plan_type,
            status: item.plan?.is_released ? "Released" : item.plan?.is_funded ? "Funded" : item.is_funded ? "Funded" : "Pending",
            assets: item.beneficiaries?.length ? `${item.beneficiaries.length} beneficiary(ies)` : item.assets || "N/A",
            owner_initials: displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
          };
        });
      }
      
      setPlans(plansList);
      setFilteredPlans(plansList);
    } catch (err) {
      console.error("Error fetching assigned plans:", err);
      toast.error("Failed to load assigned inheritance plans");
      setPlans([]);
      setFilteredPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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

  const fetchPlanDetails = async (planId: number) => {
    setDetailLoading(true);
    try {
      const res = await fetch(`${BACKEND_API_URL}/exec/inheritances-plan/${planId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch plan details");
      }
      const data = await res.json();
      setSelectedPlanDetail(data?.data ?? data);
      setModalOpen(true);
    } catch (err) {
      console.error("Error fetching plan details:", err);
      toast.error("Failed to load plan details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const planId = selectedPlanDetail?.plan?.id ?? selectedPlanDetail?.id;
    if (!planId) {
      toast.error("Plan ID not found");
      return;
    }

    setFileUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BACKEND_API_URL}/exec/excute-a-plan/${planId}`, {
        method: "POST",
        headers: {
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload file");
      }

      toast.success("File uploaded successfully");
      // Reset file input
      e.target.value = "";
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error("Failed to upload file");
    } finally {
      setFileUploading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Assigned Inheritance Plans</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search plans..."
              value=""
              disabled
              className="bg-[#2a2420] border border-[#3a3430] rounded-lg px-4 py-2 text-sm w-64 text-white placeholder-gray-500 opacity-50"
            />
            <button disabled className="bg-[#2a2420] border border-[#3a3430] px-4 py-2 rounded-lg text-sm flex items-center gap-2 text-gray-400 opacity-50">
              ⚙️ Filter
            </button>
          </div>
        </div>

        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a3430] text-sm text-gray-400">
                <th className="text-left p-4 font-medium">Plan Name</th>
                <th className="text-left p-4 font-medium">Plan Type</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Assets</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Skeleton loading rows */}
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b border-[#3a3430]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#3a3430] rounded-full animate-pulse"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-[#3a3430] rounded w-24 animate-pulse"></div>
                        <div className="h-3 bg-[#3a3430] rounded w-16 animate-pulse"></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="h-4 bg-[#3a3430] rounded w-20 animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-6 bg-[#3a3430] rounded w-16 animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-4 bg-[#3a3430] rounded w-24 animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-4 bg-[#3a3430] rounded w-16 animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Assigned Inheritance Plans</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#2a2420] border border-[#3a3430] rounded-lg px-4 py-2 text-sm w-64 text-white placeholder-gray-500"
          />
          <button className="bg-[#2a2420] border border-[#3a3430] px-4 py-2 rounded-lg text-sm flex items-center gap-2 text-gray-400 hover:text-white">
            ⚙️ Filter
          </button>
        </div>
      </div>

      <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#3a3430] text-sm text-gray-400">
              <th className="text-left p-4 font-medium">Plan Name</th>
              <th className="text-left p-4 font-medium">Plan Type</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Assets</th>
              <th className="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  No assigned inheritance plans found.
                </td>
              </tr>
            ) : (
              filteredPlans.map((plan, idx) => {
                const statusInfo = getStatusColor(plan.status);
                const isLastRow = idx === filteredPlans.length - 1;
                return (
                  <tr
                    key={plan.id}
                    className={`${isLastRow ? "" : "border-b"} border-[#3a3430] hover:bg-[#3a3430] cursor-pointer`}
                    onClick={() => fetchPlanDetails(plan.id)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#3a3430] rounded-full flex items-center justify-center text-sm font-medium">
                          {getInitials(plan.owner_name)}
                        </div>
                        <div>
                          <div className="font-medium">{plan.owner_name}</div>
                          <div className="text-xs text-gray-400">Plan #{plan.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{plan.plan_type}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 ${statusInfo.bg} ${statusInfo.text} px-2 py-1 rounded text-xs`}>
                        {statusInfo.label === "Completed" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Circle className="w-2 h-2 fill-current" />
                        )}
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{plan.assets}</td>
                    <td className="p-4">
                      <button
                        className="text-orange-400 text-sm hover:text-orange-300"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
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
              {detailLoading || !selectedPlanDetail ? (
                <div className="text-[#b8a494]">{detailLoading ? 'Loading...' : 'No data'}</div>
              ) : (
                  <div className="space-y-4 text-sm text-[#d1c3b4]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-[#8b7664]">Plan ID</div>
                        <div className="font-mono text-white">{selectedPlanDetail.plan?.id ?? selectedPlanDetail.id}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Type</div>
                        <div className="text-white">{selectedPlanDetail.plan?.plan_type}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Owner Wallet</div>
                        <div className="text-white break-all font-mono text-xs">{selectedPlanDetail.plan?.owner_wallet}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8b7664]">Asset</div>
                        <div className="text-white">{selectedPlanDetail.plan?.crypto_asset || "—"}</div>
                      </div>

                      <div>
                        <div className="text-xs text-[#8b7664]">Contract Plan ID</div>
                        <div className="text-white">{selectedPlanDetail.plan?.contract_plan_id ?? '—'}</div>
                      </div>
                      {shouldShowField(selectedPlanDetail.plan?.plan_type, 'proof_of_life') && (
                      <div>
                        <div className="text-xs text-[#8b7664]">Proof of Life</div>
                        <div className="text-white">{selectedPlanDetail.plan?.proof_of_life ?? '—'}</div>
                      </div>
                      )}

                      <div>
                        <div className="text-xs text-[#8b7664]">Contract Address</div>
                        <div className="text-white break-all font-mono text-xs">{selectedPlanDetail.plan?.contract_address ?? '—'}</div>
                      </div>
                      {shouldShowField(selectedPlanDetail.plan?.plan_type, 'grace_period') && (
                      <div>
                        <div className="text-xs text-[#8b7664]">Grace Period</div>
                        <div className="text-white">{selectedPlanDetail.plan?.grace_period ?? '—'}</div>
                      </div>
                      )}

                      {selectedPlanDetail.plan?.plan_type === 'health_oracle' && (
                      <div>
                        <div className="text-xs text-[#8b7664]">Oracle Source</div>
                        {selectedPlanDetail.plan?.oracle_source ? (
                          <a 
                            href={selectedPlanDetail.plan.oracle_source} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline break-all text-xs font-mono"
                            title={selectedPlanDetail.plan.oracle_source}
                          >
                            {selectedPlanDetail.plan.oracle_source.slice(0, 40)}...
                          </a>
                        ) : (
                          <div className="text-white">—</div>
                        )}
                      </div>
                      )}
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

                      {shouldShowField(selectedPlanDetail.plan?.plan_type, 'release_timestamp') && (
                      <div>
                        <div className="text-xs text-[#8b7664]">Release Timestamp</div>
                        <div className="text-white">{formatTs(selectedPlanDetail.plan?.release_timestamp)}</div>
                      </div>
                      )}
                      <div>
                        <div className="text-xs text-[#8b7664]">Is Released</div>
                        <div className="text-white">{selectedPlanDetail.plan?.is_released ? 'Yes' : 'No'}</div>
                      </div>

                      {shouldShowField(selectedPlanDetail.plan?.plan_type, 'inactivity_period_days') && (
                      <div>
                        <div className="text-xs text-[#8b7664]">Inactivity Period (days)</div>
                        <div className="text-white">{selectedPlanDetail.plan?.inactivity_period_days ?? '—'}</div>
                      </div>
                      )}
                      <div>
                        <div className="text-xs text-[#8b7664]">Created At</div>
                        <div className="text-white">{formatTs(selectedPlanDetail.plan?.created_at)}</div>
                      </div>

                      {shouldShowField(selectedPlanDetail.plan?.plan_type, 'last_active_at') && (
                      <div>
                        <div className="text-xs text-[#8b7664]">Last Active</div>
                        <div className="text-white">{formatTs(selectedPlanDetail.plan?.last_active_at)}</div>
                      </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-6 mb-6">
                      {!selectedPlanDetail.plan?.oracle_source ? (
                        <label className="flex-1 px-4 py-3 rounded bg-orange-600 text-white cursor-pointer hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 font-medium">
                          <Upload className="w-4 h-4" />
                          {fileUploading ? "Uploading..." : "Upload File"}
                          <input
                            type="file"
                            onChange={handleFileUpload}
                            disabled={fileUploading}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="flex-1 px-4 py-3 rounded bg-green-600/20 border border-green-600/50 text-green-400 flex items-center justify-center gap-2 font-medium">
                          <CheckCircle className="w-4 h-4" />
                          File Uploaded
                        </div>
                      )}
                      <button className="px-4 py-2 rounded bg-[#393028] text-white hover:bg-[#4a3830]" onClick={() => { setModalOpen(false); setSelectedPlanDetail(null); }}>Close</button>
                    </div>

                    <div>
                      <div className="text-xs text-[#8b7664]">Beneficiaries</div>
                      <div className="mt-2 space-y-2">
                        {Array.isArray(selectedPlanDetail.beneficiaries) && selectedPlanDetail.beneficiaries.length > 0 ? (
                          selectedPlanDetail.beneficiaries.map((b: any, idx: number) => (
                            <div key={idx} className="p-3 bg-[#231b16] border border-[#2f241c] rounded">
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
    </div>
  );
};

export default AssignedInheritancePlans;
