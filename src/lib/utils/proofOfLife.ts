/**
 * Proof-of-life / Heartbeat utility functions
 * These utilities handle the calculation and display of inactivity-based plan status.
 * Only applicable to plans with plan_type === 'inactivity'.
 */

export interface ProofOfLifeStatus {
  status: "active" | "missed" | "critical" | null;
  label: string;
  sub: string;
  timeRemaining: { days: number; hours: number; minutes: number; seconds: number } | null;
  triggerTs: number | null;   // When inactivity period ends (use for "active" status countdown)
  deadlineTs: number | null;  // When grace period ends (use for "missed" status countdown)
}

export interface HeartbeatStatusDisplay {
  label: string;
  sub: string;
}

/**
 * Check if a plan type supports proof-of-life / heartbeat monitoring.
 * Currently only 'inactivity' plans use this feature.
 */
export const supportsProofOfLife = (planType?: string | null): boolean => {
  if (!planType) return false;
  return String(planType).toLowerCase() === 'inactivity';
};

/**
 * Calculate proof-of-life status for an inactivity-based plan.
 * 
 * @param plan - The plan object
 * @returns ProofOfLifeStatus with status, label, time remaining, etc.
 * 
 * Note: Only call this for plans where supportsProofOfLife(plan.plan_type) === true
 * and plan is funded and not cancelled.
 */
export const calculateProofOfLifeStatus = (plan: any): ProofOfLifeStatus => {
  // Defensive: if plan is missing or plan type doesn't support POL, return null status
  if (!plan || !supportsProofOfLife(plan.plan_type)) {
    return {
      status: null,
      label: "Proof of Life not applicable",
      sub: "This plan type does not require heartbeat checks",
      timeRemaining: null,
      deadlineTs: null,
    };
  }

  // Check if plan is funded - POL only applies to funded plans
  if (plan.is_funded !== true) {
    return {
      status: null,
      label: "Proof of Life not applicable",
      sub: "Plan must be funded to enable heartbeat checks",
      timeRemaining: null,
      deadlineTs: null,
    };
  }

  // Check if plan is cancelled - POL doesn't apply to cancelled plans
  if (plan.is_cancelled === true) {
    return {
      status: null,
      label: "Proof of Life not applicable",
      sub: "Plan has been cancelled",
      timeRemaining: null,
      deadlineTs: null,
    };
  }

  const now = Date.now();

  // Get base timestamp (when last check-in occurred)
  // Fallback chain: last_active_at > created_at > updated_at > 0 (epoch, indicates missing data)
  const baseTs = (plan.last_active_at || plan.created_at || plan.updated_at || 0) * 1000;

  // Get inactivity and grace periods with defensive defaults
  const inactivityDays = Math.max(1, Number(plan.inactivity_period_days || plan.inactivity_period || 30));
  const graceDays = Math.max(0, Number(plan.grace_period_days || plan.grace_period || 2));

  // Calculate key timestamps based on periods (not backend flags)
  const msDay = 24 * 60 * 60 * 1000;
  const triggerTs = baseTs + inactivityDays * msDay;      // When plan gets marked for release
  const deadlineTs = baseTs + (inactivityDays + graceDays) * msDay;  // When plan actually releases

  // Determine status based on current time vs calculated timestamps
  let status: "active" | "missed" | "critical";
  let timeRemaining: { days: number; hours: number; minutes: number; seconds: number };

  if (now < triggerTs) {
    // Haven't reached trigger time yet
    status = "active";
    const remainingMs = Math.max(0, triggerTs - now);
    timeRemaining = calculateTimeRemaining(remainingMs);
  } else if (now < deadlineTs) {
    // Trigger passed but grace period still active
    status = "missed";
    const remainingMs = Math.max(0, deadlineTs - now);
    timeRemaining = calculateTimeRemaining(remainingMs);
  } else {
    // Grace period expired - critical
    status = "critical";
    timeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Generate label and sub-label based on status
  const { label, sub } = getStatusDisplay(status, timeRemaining, plan.missed_checks || 0);

  return {
    status,
    label,
    sub,
    timeRemaining,
    triggerTs,
    deadlineTs,
  };
};

/**
 * Calculate time remaining from milliseconds.
 */
const calculateTimeRemaining = (ms: number) => ({
  days: Math.floor(ms / (1000 * 60 * 60 * 24)),
  hours: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  minutes: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
  seconds: Math.floor((ms % (1000 * 60)) / 1000),
});

/**
 * Get human-friendly status display (label and sub-label).
 */
const getStatusDisplay = (
  status: "active" | "missed" | "critical",
  timeRemaining: { days: number; hours: number; minutes: number; seconds: number },
  missedChecks: number,
): HeartbeatStatusDisplay => {
  switch (status) {
    case "active":
      return {
        label: "Heartbeat Active",
        sub: `${timeRemaining.days}d ${timeRemaining.hours}h remaining until check-in required`,
      };
    case "missed":
      return {
        label: "Missed Check-ins ⚠️",
        sub: `Grace period: ${timeRemaining.days}d ${timeRemaining.hours}h remaining. ${missedChecks || 0} check(s) missed.`,
      };
    case "critical":
      return {
        label: "Critical - Grace Period Expired 🚨",
        sub: `Plan may trigger automatically. Immediate action required.`,
      };
    default:
      return { label: "Unknown", sub: "" };
  }
};

/**
 * Get heartbeat status for beneficiary view (simpler display).
 * This is used in BeneficiaryDetails to show a brief heartbeat status.
 */
export const getHeartbeatStatus = (plan: any): HeartbeatStatusDisplay => {
  if (!plan || !supportsProofOfLife(plan.plan_type)) {
    return { label: "—", sub: "" };
  }

  // POL only applies to funded, non-cancelled plans
  if (plan.is_funded !== true || plan.is_cancelled === true) {
    return { label: "—", sub: "" };
  }

  const last = plan.last_active_at ? new Date(Number(plan.last_active_at) * 1000) : null;
  if (!last) {
    return { label: "No Activity", sub: "Owner has not checked in" };
  }

  const ms = Date.now() - last.getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (days <= 2) {
    return { label: "Heartbeat Active", sub: `Last check-in: ${days} day(s) ago` };
  }
  if (days <= 30) {
    return { label: "Delayed Check-ins", sub: `Last check-in: ${days} day(s) ago` };
  }
  return { label: "Missed Checks", sub: `Last check-in: ${days} day(s) ago` };
};
