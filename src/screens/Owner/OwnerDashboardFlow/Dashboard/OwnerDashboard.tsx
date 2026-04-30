import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Link } from "react-router-dom";
import { AllPlan } from "./AllPlan";
import { ProofOfLifeCheck } from "./ProofOfLifeConfig/ProofOfLifeCheck";
import { ProofOfLifeCheckMissed } from "./ProofOfLifeConfig/ProofOfLifeCheckMissed";
import { CriticalAlert } from "./ProofOfLifeConfig/CriticalAlert";
import { getActiveProofPlan } from "../../../../lib/api/inherit";
import { useAuth } from "../../../../context/useAuth";
import { TrendingUp } from "lucide-react";
import { Plus, Eye, EyeOff } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  chainName: string;
  chainIcon: string;
  beneficiary: {
    name: string;
    avatar: string;
  };
  assets: string;
  assetsDetail: string;
  status: "Active" | "Pending" | "Triggered";
  statusColor: string;
  triggerDays: number;
}

interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  timestamp: string;
}

const plans: Plan[] = [
  {
    id: "0042",
    name: "Main Estate Fund",
    chainName: "Ethereum",
    chainIcon: "💎",
    beneficiary: { name: "alice.eth", avatar: "🔴" },
    assets: "$32,450.00",
    assetsDetail: "12.5 ETH, 4 NFTs",
    status: "Active",
    statusColor: "bg-green-500",
    triggerDays: 1,
  },
  {
    id: "0045",
    name: "DeFi Safety Net",
    chainName: "Polygon",
    chainIcon: "⭕",
    beneficiary: { name: "0x4f...a9", avatar: "🟠" },
    assets: "$4,500.00",
    assetsDetail: "4500 USDC",
    status: "Pending",
    statusColor: "bg-yellow-500",
    triggerDays: 1,
  },
  {
    id: "0018",
    name: "Cold Storage Vault",
    chainName: "Bitcoin",
    chainIcon: "₿",
    beneficiary: { name: "sarah.btc", avatar: "🟣" },
    assets: "$105,550.00",
    assetsDetail: "1.5 BTC",
    status: "Active",
    statusColor: "bg-green-500",
    triggerDays: 3,
  },
];

const activities: ActivityItem[] = [];

export const OwnerDashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [showValues, setShowValues] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPoLModal, setShowPoLModal] = useState(false);
  const [modalType, setModalType] = useState<"check" | "missed" | "critical">("check");
  const [polStatus, setPolStatus] = useState<null | "active" | "missed" | "critical">(null);
  const [polLoading, setPolLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    let mounted = true;
    async function fetchPlan() {
      try {
        const plan = await getActiveProofPlan(auth?.user?.token);
        if (!mounted) return;
        if (!plan) {
          setPolStatus(null);
          setPolLoading(false);
          return;
        }

        const now = Date.now();
        const baseTs = (plan.last_active_at || plan.created_at || plan.updated_at || 0) * 1000;
        const inactivityDays = Number(plan.inactivity_period_days || plan.inactivity_period || 30);
        const graceDays = Number(plan.grace_period_days || plan.grace_period || 2);

        const msDay = 24 * 60 * 60 * 1000;
        const inactivityTs = baseTs + inactivityDays * msDay;
        const expiryTs = baseTs + (inactivityDays + graceDays) * msDay;

        if (now <= inactivityTs) {
          setPolStatus("active");
        } else if (now <= expiryTs) {
          setPolStatus("missed");
          setModalType("missed");
          setShowPoLModal(true);
        } else {
          setPolStatus("critical");
          setModalType("critical");
          setShowPoLModal(true);
        }
        setPolLoading(false);
      } catch (err) {
        console.warn("Failed to fetch proof plan", err);
        setPolStatus(null);
        setPolLoading(false);
      }
    }
    fetchPlan();
    return () => {
      mounted = false;
    };
  }, [auth?.user?.token]);
//   const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-8 space-y-8">

      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl mb-2">
            Welcome back, {
              auth.user?.userInfo?.full_name 
                ? auth.user.userInfo.full_name 
                : auth.user?.userInfo?.email
                ? auth.user.userInfo.email
                : auth.user?.publicKey 
                ? auth.user.publicKey.slice(0, 6) + "..." + auth.user.publicKey.slice(-4)
                : "User"
            }
          </h1>
          <p className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D]">
            Manage your active inheritance plans and monitor asset security.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowValues(!showValues)}
            className="px-5 py-3 rounded-lg bg-[#393028] hover:bg-[#3a2f1e] text-[#FFFFFF] hover:text-white transition-colors flex items-center gap-2 [font-family:'Noto_Sans',Helvetica] font-medium text-md"
          >
            {showValues ? (
              <>
                <EyeOff className="w-4 h-4" />
                Hide Values
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Show Values
              </>
            )}
          </button>
          <Link to="/owner-dashboard/select-assets">
            <Button className="px-5 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 [font-family:'Noto_Sans',Helvetica] text-md gap-2">
              <Plus className="w-4 h-4" />
              Create New Plan
            </Button>
          </Link>
        </div>
      </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-[#2D241C] border-[#393028]">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">
                        Total Value Secured
                      </span>
                      {/* <div className="w-8 h-8 bg-[#ff66001a] rounded flex items-center justify-center">
                        🔒
                      </div> */}
                    </div>
                    <div className="space-y-1 flex gap-2 items-end">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                        {showValues ? "$142,500.00" : "••••••"}
                      </div>
                      <div className="flex bg-[#0BDA5B1A] px-1 items-center rounded-md w-[70px] gap-1">
                        <TrendingUp className="w-3 text-[#0BDA5B]" />
                        <span className="text-[#0BDA5B] text-xs"> +5.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2D241C] border-[#393028]">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">
                        Active Plans
                      </span>
                      {/* <div className="w-8 h-8 bg-[#135bec1a] rounded flex items-center justify-center">
                        📋
                      </div> */}
                    </div>
                    <div className="space-y-1 flex items-end gap-2">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                        3
                      </div>
                      <div className="text-[#B9B09D] text-sm">plans monitored</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2D241C] border-[#393028]">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">
                        Next Trigger Check
                      </span>
                      {/* <div className="w-8 h-8 bg-[#f6a83b1a] rounded flex items-center justify-center">
                        ⏱️
                      </div> */}
                    </div>
                    <div className="space-y-1 flex gap-2 items-end">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                        12 Days
                      </div>
                      <div className="text-[#EAB308] text-sm">Plan #0042</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2D241C] border-[#393028]">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">
                        Network Status
                      </span>
                      {/* <div className="w-8 h-8 bg-[#22c55e1a] rounded flex items-center justify-center">
                        📈
                      </div> */}
                    </div>
                    <div className="space-y-1">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl flex items-center gap-2">
                        <span className="w-4 h-4 bg-[#22C55E] rounded-full"></span>
                        Healthy
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Plans Table Section */}
              <AllPlan showValues={showValues} />

              {/* Proof of Life Section */}
              <Card className="bg-gradient-to-b from-[#2B1E15] to-[#916547] border-[#554433]">
                <CardContent className="p-6 space-y-4">
                  {polLoading ? (
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="h-6 bg-[#3a2f28] rounded w-48 animate-pulse"></div>
                          <div className="h-4 bg-[#3a2f28] rounded w-full animate-pulse"></div>
                        </div>
                        <div className="h-6 bg-[#3a2f28] rounded w-24 animate-pulse"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="h-4 bg-[#3a2f28] rounded w-32 animate-pulse"></div>
                          <div className="h-4 bg-[#3a2f28] rounded w-12 animate-pulse"></div>
                        </div>
                        <div className="w-full bg-[#3a2f28] rounded-full h-2 animate-pulse"></div>
                        <div className="h-3 bg-[#3a2f28] rounded w-40 animate-pulse"></div>
                      </div>
                      <div className="h-10 bg-[#3a2f28] rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                            Proof of Life
                          </h3>
                          <p className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm mt-1">
                            {polStatus === null ? "No active proof-of-life plan. Create a plan to activate." : polStatus === "active" ? "Your heartbeat status is active. Next confirmation required via wallet signature." : polStatus === "missed" ? "Proof-of-life check missed. Immediate action required." : "Critical: Please confirm your status immediately."}
                          </p>
                        </div>
                        {polStatus && (
                          <Badge className={`${polStatus === "active" ? "bg-green-500/20 text-green-400 border-green-500/30" : polStatus === "missed" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"} [font-family:'Noto_Sans',Helvetica] text-xs`}>
                            <div className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-1 text-xs">
                              <div className={`w-2 h-2 rounded-full animate-pulse ${ polStatus === "active" ? "bg-[#22C55E]" : polStatus === "missed" ? "bg-[#EAB308]" : "bg-[#EF4444]"}`}></div>
                              <p>{polStatus === "active" ? "ONLINE" : polStatus === "missed" ? "MISSED" : "CRITICAL"}</p>
                            </div>
                          </Badge>
                        )}
                      </div>

                      {polStatus && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-sm">
                              Heartbeat Progress
                            </span>
                            <span className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                              {polStatus === "active" ? "85%" : polStatus === "missed" ? "45%" : "10%"}
                            </span>
                          </div>
                          <div className="w-full bg-[#393028] rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${ polStatus === "active" ? "bg-[#FF6600]" : polStatus === "missed" ? "bg-[#EAB308]" : "bg-[#EF4444]"}`}
                              style={{ width: polStatus === "active" ? "85%" : polStatus === "missed" ? "45%" : "10%" }}
                            />
                          </div>
                          <div className="[font-family:'Noto_Sans',Helvetica] text-right text-[#B9B09D] text-xs">
                            {polStatus === "active" ? "Refreshes in 48 hours" : polStatus === "missed" ? "Action required immediately" : "Critical - action needed now"}
                          </div>
                        </div>
                      )}

                      <Button 
                        onClick={() => {
                          if (polStatus === "missed") setModalType("missed");
                          else if (polStatus === "critical") setModalType("critical");
                          else setModalType("check");
                          setShowPoLModal(true);
                        }}
                        className="w-full bg-[#393028] hover:bg-[#393028] text-white [font-family:'Noto_Sans',Helvetica] mt-4"
                        disabled={!polStatus}
                      >
                        {polStatus ? "Confirm Now" : "No Action Required"}
                      </Button>
                    </>
                  )}
                  {showPoLModal && modalType === "check" && (
                    <ProofOfLifeCheck open onClose={() => setShowPoLModal(false)} />
                  )}
                  {showPoLModal && modalType === "missed" && (
                    <ProofOfLifeCheckMissed open onClose={() => setShowPoLModal(false)} />
                  )}
                  {showPoLModal && modalType === "critical" && (
                    <CriticalAlert open onClose={() => setShowPoLModal(false)} />
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                    Recent Activity
                  </h2>
                  <a
                    href="#"
                    className="[font-family:'Noto_Sans',Helvetica] font-bold text-[#ff6600] hover:text-[#ff6600]/80 text-sm"
                  >
                    View All
                  </a>
                </div>

                <div className="space-y-2">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <Card
                        key={activity.id}
                        className="bg-[#2D241C] border-[#393028] hover:border-[#554433] transition-colors"
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-sm flex-shrink-0">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                              {activity.title}
                            </h4>
                            <p className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-xs mt-1">
                              {activity.description}
                            </p>
                          </div>
                          <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-xs flex-shrink-0">
                            {activity.timestamp}
                          </span>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="bg-[#2D241C] border-[#393028]">
                      <CardContent className="p-8 flex items-center justify-center">
                        <p className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">No recent activity</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
      </div>
  );
};
