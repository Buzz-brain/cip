import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Circle } from "lucide-react";
import { useAuth } from "../../../context/useAuth";
import { toast } from "react-toastify";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

interface ApiInheritancePlan {
  plan: {
    id: number;
    contract_plan_id: number;
    owner_wallet: string;
    owner_id: number;
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
        const ownerName = apiPlan.plan.owner_id ? `Owner #${apiPlan.plan.owner_id}` : "Unknown Owner";
        const status = apiPlan.plan.is_released ? "Released" : apiPlan.plan.is_funded ? "Funded" : "Pending";
        
        plansList = [{
          id: apiPlan.plan.id,
          owner_name: ownerName,
          plan_type: apiPlan.plan.plan_type,
          status: status,
          assets: apiPlan.beneficiaries.length > 0 ? `${apiPlan.beneficiaries.length} beneficiary(ies)` : "No beneficiaries",
          owner_initials: ownerName.split(" ").map(n => n[0]).join("").toUpperCase()
        }];
      } else if (Array.isArray(data?.data)) {
        // Multiple plans returned (for future compatibility)
        plansList = data.data.map((item: any) => ({
          id: item.plan?.id || item.id,
          owner_name: item.owner_name || `Owner #${item.owner_id}`,
          plan_type: item.plan_type,
          status: item.is_released ? "Released" : item.is_funded ? "Funded" : "Pending",
          assets: item.assets || "N/A",
          owner_initials: (item.owner_name || `Owner #${item.owner_id}`).split(" ").map((n: string) => n[0]).join("").toUpperCase()
        }));
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

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("triggered")) {
      return { bg: "bg-orange-500/20", text: "text-orange-400", label: "Triggered" };
    }
    if (lowerStatus.includes("pending")) {
      return { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Pending" };
    }
    if (lowerStatus.includes("active")) {
      return { bg: "bg-green-500/20", text: "text-green-400", label: "Active" };
    }
    if (lowerStatus.includes("completed")) {
      return { bg: "bg-gray-500/20", text: "text-gray-400", label: "Completed" };
    }
    return { bg: "bg-gray-500/20", text: "text-gray-400", label: status };
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-8 flex items-center justify-center">
        <div className="text-gray-400">Loading assigned inheritance plans...</div>
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
        {filteredPlans.length === 0 ? (
          <div className="p-8 flex items-center justify-center text-gray-400">
            No assigned inheritance plans found.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a3430] text-sm text-gray-400">
                <th className="text-left p-4 font-medium">Owner Name</th>
                <th className="text-left p-4 font-medium">Plan Type</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Assets</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan, idx) => {
                const statusInfo = getStatusColor(plan.status);
                const isLastRow = idx === filteredPlans.length - 1;
                return (
                  <tr
                    key={plan.id}
                    className={`${isLastRow ? "" : "border-b"} border-[#3a3430] hover:bg-[#3a3430] cursor-pointer`}
                    onClick={() => navigate(`/executor-dashboard/mpc-share-management/${plan.id}`)}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/executor-dashboard/mpc-share-management");
                        }}
                        className="text-orange-400 text-sm hover:text-orange-300"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssignedInheritancePlans;
