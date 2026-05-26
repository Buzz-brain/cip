import { useState, useEffect, useCallback } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { useNavigate } from "react-router-dom";
import { AllPlan } from "./AllPlan";
import { ProofOfLifeCheck } from "./ProofOfLifeConfig/ProofOfLifeCheck";
import { ProofOfLifeCheckMissed } from "./ProofOfLifeConfig/ProofOfLifeCheckMissed";
import { CriticalAlert } from "./ProofOfLifeConfig/CriticalAlert";
import { getActiveProofPlan } from "../../../../lib/api/inherit";
import SubscriptionModal from "@components/SubscriptionModal";
import { useAuth } from "../../../../context/useAuth";
import getOwnerDashboardStats from "../../../../lib/dashboard/ownerStats";
import { usePlan } from "../../../../context/usePlan";
import { Plus, Eye, EyeOff } from "lucide-react";
import useActivityLogs from '../../../../lib/hooks/useActivityLogs';
import ActivityListSkeleton from '@components/ActivityLogs/ActivityListSkeleton';
import { calculateProofOfLifeStatus, supportsProofOfLife } from "../../../../lib/utils/proofOfLife";

export const OwnerDashboard = (): JSX.Element => {
  const [showValues, setShowValues] = useState(true);
  const [showPoLModal, setShowPoLModal] = useState(false);
  const [modalType, setModalType] = useState<"check" | "missed" | "critical">("check");
  const [polStatus, setPolStatus] = useState<null | "active" | "missed" | "critical">(null);
  const [polLoading, setPolLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState<any | null>(null);
  const [polPlan, setPolPlan] = useState<any | null>(null);
  const [polTimeRemaining, setPolTimeRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [polDeadlineTs, setPolDeadlineTs] = useState<number | null>(null);
  const [missedCheckCount, setMissedCheckCount] = useState(0);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const s = await getOwnerDashboardStats(auth?.user?.token);
      setStats(s);
    } catch (e) {
      // [sanitized] console.warn removed
    } finally {
      setStatsLoading(false);
    }
  }, [auth?.user?.token]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const fetchPlan = useCallback(async () => {
    try {
      setPolLoading(true);
      const plan = await getActiveProofPlan(auth?.user?.token);
      if (!plan || !supportsProofOfLife(plan.plan_type)) {
        setPolStatus(null);
        setPolPlan(null);
        setPolLoading(false);
        return;
      }

      // Use the shared utility function for all proof-of-life calculations
      const polData = calculateProofOfLifeStatus(plan);
      
      setPolPlan(plan);
      setPolStatus(polData.status);
      setPolTimeRemaining(polData.timeRemaining);
      setPolDeadlineTs(polData.deadlineTs);
      setMissedCheckCount(plan.missed_checks || 0);
      setPolLoading(false);
    } catch (err) {
      // [sanitized] console.warn removed
      setPolStatus(null);
      setPolPlan(null);
      setPolLoading(false);
    }
  }, [auth?.user?.token]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  // Subscribe to plan updates and refresh stats and proof-of-life when plans change
  const planCtx = usePlan();
  useEffect(() => {
    const onUpdated = async (_detail?: any) => {
      try {
        await fetchStats();
      } catch (e) {}
      try {
        await fetchPlan();
      } catch (e) {}
    };
    if (planCtx?.subscribePlansUpdated) {
      const unsub = planCtx.subscribePlansUpdated(onUpdated);
      return () => unsub();
    }
    // fallback to window event
    window.addEventListener('plans:updated', onUpdated as any);
    return () => window.removeEventListener('plans:updated', onUpdated as any);
  }, [fetchStats, fetchPlan, planCtx]);
//   const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-4 sm:p-8 space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-white text-4xl mb-2">
            Welcome back,{" "}
            {auth.user?.userInfo?.full_name
              ? auth.user.userInfo.full_name
              : auth.user?.userInfo?.email
              ? auth.user.userInfo.email
              : auth.user?.publicKey
              ? auth.user.publicKey.slice(0, 6) +
                "..." +
                auth.user.publicKey.slice(-4)
              : "User"}
          </h1>
          <p className="text-[#B9B09D]">
            Manage your active inheritance plans and monitor asset security.
          </p>
        </div>

        <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowValues(!showValues)}
            className="px-5 py-3 rounded-lg bg-[#393028] hover:bg-[#3a2f1e] text-[#FFFFFF] hover:text-white transition-colors flex items-center gap-2 font-medium text-md"
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
          <Button
            onClick={() => {
              if (statsLoading) return;
              const hasActiveSubscription = !!(
                stats?.latestSubscription?.is_active === true
              );
              if (hasActiveSubscription) {
                navigate("/owner-dashboard/select-assets");
                return;
              }
              setShowSubscribeModal(true);
            }}
            disabled={statsLoading}
            className="w-full sm:w-auto px-5 py-3 sm:py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 text-md gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Plan
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#2D241C] border-[#393028]">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#B9B09D] text-sm">
                Total Value Secured
              </span>
            </div>
            {statsLoading || stats == null ? (
              <div className="space-y-2">
                <div className="h-8 w-40 bg-[#3a2f1e] rounded animate-pulse" />
                <div className="h-4 w-20 bg-[#3a2f1e] rounded animate-pulse mt-2" />
              </div>
            ) : (
              <div className="space-y-1 flex gap-2 items-end">
                <div className="font-bold text-white text-2xl">
                  {showValues
                    ? stats?.userTotalInheritanceFormatted ??
                      stats?.totalValueSecuredFormatted ??
                      "$0.00"
                    : "••••••"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#2D241C] border-[#393028]">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#B9B09D] text-sm">
                All Inheritance Plans
              </span>
            </div>
            {statsLoading || stats == null ? (
              <div className="space-y-2">
                <div className="h-8 w-12 bg-[#3a2f1e] rounded animate-pulse" />
                <div className="h-4 w-24 bg-[#3a2f1e] rounded animate-pulse mt-2" />
              </div>
            ) : (
              <div className="space-y-1 flex items-start gap-2">
                <div className="font-bold text-white text-2xl">
                  {showValues
                    ? Number(
                        stats?.totalPlansCount ??
                          stats?.plansCount ??
                          stats?.globalTotalInheritance ??
                          0,
                      )
                    : "••••"}
                </div>
                <Badge className="bg-green-500/10 text-green-300 border-green-500/20 text-sm px-2">
                  {`${stats?.activePlansCount ?? 0} active`}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#2D241C] border-[#393028]">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#B9B09D] text-sm">
                Next Trigger Check
              </span>
            </div>
            {statsLoading || stats == null ? (
              <div className="space-y-2">
                <div className="h-8 w-28 bg-[#3a2f1e] rounded animate-pulse" />
                <div className="h-4 w-20 bg-[#3a2f1e] rounded animate-pulse mt-2" />
              </div>
            ) : (
              <div className="space-y-1 gap-2 items-end">
                <div className="font-bold text-white text-2xl">
                  {stats == null || stats.nextTriggerDays == null
                    ? "—"
                    : `${stats.nextTriggerDays} Days`}
                </div>
                <div className="text-[#EAB308] text-sm">
                  {stats?.nextTriggerPlanId
                    ? `Plan #${String(stats.nextTriggerPlanId).padStart(
                        4,
                        "0",
                      )}`
                    : "—"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#2D241C] border-[#393028]">
          <CardContent
            className="p-6 space-y-2 cursor-pointer hover:opacity-95"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/owner-dashboard/billing-and-payments")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                navigate("/owner-dashboard/billing-and-payments");
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[#B9B09D] text-sm">
                Subscription
              </span>
            </div>
            {statsLoading || stats == null ? (
              <div className="space-y-2">
                <div className="h-6 w-6 bg-[#3a2f1e] rounded-full animate-pulse inline-block mr-3" />
                <div className="h-4 w-24 bg-[#3a2f1e] rounded animate-pulse inline-block" />
              </div>
            ) : (
              <div className="space-y-1">
                <div className="font-bold text-white text-2xl">
                  {(() => {
                    const name =
                      stats?.latestSubscription?.name ??
                      (stats?.latestSubscription?.pricing_id
                        ? `Plan #${stats.latestSubscription.pricing_id}`
                        : null);
                    if (!name) return "No subscription";
                    return (
                      String(name).charAt(0).toUpperCase() +
                      String(name).slice(1)
                    );
                  })()}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    className={`${
                      stats?.latestSubscription?.is_active
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-gray-700/20 text-gray-300 border-gray-600/30"
                    } text-xs`}
                  >
                    {stats?.latestSubscription?.is_active
                      ? "ACTIVE"
                      : "INACTIVE"}
                  </Badge>
                  {stats?.latestSubscription?.duration_months && (
                    <div className="text-[#B9B09D] text-sm">{`${
                      stats.latestSubscription.duration_months
                    } month${
                      stats.latestSubscription.duration_months > 1 ? "s" : ""
                    }`}</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Plans Table Section */}
      <AllPlan showValues={showValues} />

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <SubscriptionModal
          open={showSubscribeModal}
          onClose={() => setShowSubscribeModal(false)}
        />
      )}

      {/* Proof of Life Section */}
      <Card className="bg-gradient-to-b from-[#2B1E15] to-[#916547] border-[#554433]">
        <CardContent className="p-6 space-y-4">
          {polLoading ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-6 bg-[#3a2f1e] rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-[#3a2f1e] rounded w-64 animate-pulse"></div>
                </div>
                <div className="h-6 bg-[#3a2f1e] rounded w-20 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-[#3a2f1e] rounded w-40 animate-pulse"></div>
                  <div className="h-4 bg-[#3a2f1e] rounded w-12 animate-pulse"></div>
                </div>
                <div className="w-full bg-[#393028] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#3a2f1e] h-full rounded-full w-1/3 animate-pulse"></div>
                </div>
                <div className="h-3 bg-[#3a2f1e] rounded w-40 ml-auto animate-pulse"></div>
              </div>
              <div className="h-10 bg-[#3a2f1e] rounded animate-pulse"></div>
            </div>
          ) : polStatus === null ? (
            <div className="text-center py-8">
              <p className="text-[#B9B09D]">
                No active proof-of-life plan. Create a plan to activate.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg">
                    Proof of Life
                  </h3>
                  <p className="text-[#B9B09D] text-sm mt-1">
                    {polStatus === null
                      ? "No active proof-of-life plan. Create a plan to activate."
                      : polStatus === "active"
                      ? "Your heartbeat status is active. Next confirmation required via wallet signature."
                      : polStatus === "missed"
                      ? "Proof-of-life check missed. Immediate action required."
                      : "Critical: Please confirm your status immediately."}
                  </p>
                </div>
                {polStatus && (
                  <Badge
                    className={`${
                      polStatus === "active"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : polStatus === "missed"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    } text-xs`}
                  >
                    <div className="flex items-center gap-1 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          polStatus === "active"
                            ? "bg-[#22C55E]"
                            : polStatus === "missed"
                            ? "bg-[#EAB308]"
                            : "bg-[#EF4444]"
                        }`}
                      ></div>
                      <p>
                        {polStatus === "active"
                          ? "ONLINE"
                          : polStatus === "missed"
                          ? "MISSED"
                          : "CRITICAL"}
                      </p>
                    </div>
                  </Badge>
                )}
              </div>

              {polStatus && (
                <div className="space-y-3">
                  {(() => {
                    const baseTs =
                      (polPlan?.last_active_at ?? polPlan?.created_at ?? 0) *
                      1000;
                    const progressPct =
                      polPlan && baseTs
                        ? Math.min(
                            100,
                            Math.max(
                              0,
                              Math.round(
                                ((Date.now() - baseTs) /
                                  (Number(
                                    polPlan.inactivity_period_days ?? 30,
                                  ) *
                                    86400000)) *
                                  100,
                              ),
                            ),
                          )
                        : 0;
                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-[#b8a494] text-sm">
                            Heartbeat Progress
                          </span>
                          <span className="font-bold text-white text-sm">
                            {progressPct}%
                          </span>
                        </div>
                        <div className="w-full bg-[#393028] rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              polStatus === "active"
                                ? "bg-[#FF6600]"
                                : polStatus === "missed"
                                ? "bg-[#EAB308]"
                                : "bg-[#EF4444]"
                            }`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </>
                    );
                  })()}
                  <div className="text-right text-[#B9B09D] text-xs">
                    {polStatus === "active"
                      ? polPlan
                        ? `Next check in ${Number(
                            polPlan.inactivity_period_days ?? 30,
                          )} day${
                            Number(polPlan.inactivity_period_days ?? 30) !== 1
                              ? "s"
                              : ""
                          }`
                        : "No active plan"
                      : polStatus === "missed"
                      ? "Action required immediately"
                      : "Critical - action needed now"}
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
                className="w-full bg-[#393028] hover:bg-[#393028] text-white mt-4"
              >
                Confirm Now
              </Button>
            </>
          )}
          {showPoLModal && modalType === "check" && polDeadlineTs !== null && (
            <ProofOfLifeCheck
              open
              onClose={() => setShowPoLModal(false)}
              plan={polPlan}
              deadlineTs={polDeadlineTs ?? undefined}
            />
          )}
          {showPoLModal && modalType === "missed" && (
            <ProofOfLifeCheckMissed
              open
              onClose={() => setShowPoLModal(false)}
              timeRemaining={polTimeRemaining || undefined}
              missedCheckCount={missedCheckCount}
            />
          )}
          {showPoLModal && modalType === "critical" && (
            <CriticalAlert open onClose={() => setShowPoLModal(false)} />
          )}
        </CardContent>
      </Card>

      {/* Recent Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white text-lg">
            Recent Activity
          </h2>
          <button
            onClick={() => navigate('/owner-dashboard/activity-logs')}
            className="font-bold text-[#ff6600] hover:text-[#ff6600]/80 text-sm"
          >
            View All
          </button>
        </div>
        <RecentActivityBlock />
      </div>
    </div>
  );
};

const RecentActivityBlock: React.FC = () => {
  const auth = useAuth();
  const { logs, loading } = useActivityLogs(auth?.user?.token);

  if (loading) return <ActivityListSkeleton count={3} />;

  const items = Array.isArray(logs) ? logs.slice().sort((a: any, b: any) => {
    const ta = Number(a.timestamp ?? a.created_at ?? a.time ?? 0);
    const tb = Number(b.timestamp ?? b.created_at ?? b.time ?? 0);
    return tb - ta;
  }).slice(0, 3) : [];

  if (!items || items.length === 0) {
    return (
      <Card className="bg-[#2D241C] border-[#393028]">
        <CardContent className="p-8 flex items-center justify-center">
          <p className="text-[#B9B09D] text-sm">No recent activity</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((activity: any) => (
        <Card key={activity.id ?? activity._id ?? JSON.stringify(activity)} className="bg-[#2D241C] border-[#393028] hover:border-[#554433] transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-white text-sm">{String(activity.message ?? activity.title ?? activity.event ?? activity.msg ?? 'Activity')}</h4>
              <p className="text-[#B9B09D] text-xs mt-1">{String(activity.body ?? activity.details ?? activity.data ?? '')}</p>
            </div>
            <span className="text-[#B9B09D] text-xs flex-shrink-0">{new Date(Number(activity.timestamp ?? activity.created_at ?? activity.time ?? 0) * (Number(String(activity.timestamp ?? activity.created_at ?? activity.time ?? 0)) < 1e12 ? 1000 : 1)).toLocaleString()}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
