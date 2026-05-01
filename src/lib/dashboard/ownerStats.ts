// src/lib/dashboard/ownerStats.ts
// Aggregation helpers for Owner Dashboard statistics

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

type OwnerStats = {
  totalValueSecured: number; // in native units (e.g., USD if backend returns fiat, or token amount if token)
  totalValueSecuredFormatted: string;
  totalPlansCount?: number;
  activePlansCount: number;
  nextTriggerDays?: number | null; // days until next trigger check, null if unknown
  nextTriggerPlanId?: string | null;
  // New fields from /inherit/dashboard
  userTotalInheritance?: number | null;
  userTotalInheritanceFormatted?: string | null;
  globalTotalInheritance?: number | null;
  globalTotalInheritanceFormatted?: string | null;
  latestSubscription?: {
    pricing_id?: number | null;
    name?: string | null;
    duration_months?: number | null;
    is_active?: boolean | null;
    start_date?: string | null;
    end_date?: string | null;
  } | null;
  // deprecated/networkStatus repurposed as subscription status previously; keep for legacy
  networkStatus: "Healthy" | "Degraded" | "Unknown";
};

async function fetchInheritancePlans(token?: string): Promise<any[]> {
  const url = `${BACKEND_API_URL}/inherit/view-inheritances`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    console.warn('[ownerStats] Failed to fetch inheritance plans', res.status);
    return [];
  }
  const json = await res.json().catch(() => null);
  if (!json) return [];
  // backend may return { data: [...] } or an array
  const items = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
  return items;
}

async function fetchDashboardEndpoint(token?: string): Promise<any | null> {
  const url = `${BACKEND_API_URL}/inherit/dashboard`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      return null;
    }
    const json = await res.json().catch(() => null);
    return json;
  } catch (e) {
    return null;
  }
}

async function fetchPlansList(token?: string): Promise<Record<number, any>> {
  const url = `${BACKEND_API_URL}/auth/plans`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) return {};
    const json = await res.json().catch(() => null);
    const arr = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    const map: Record<number, any> = {};
    for (const p of arr) {
      if (p?.id != null) map[Number(p.id)] = p;
    }
    return map;
  } catch (e) {
    return {};
  }
}

function computeNextTriggerFromPlans(plans: any[]): { nextTriggerDays: number | null; nextTriggerPlanId: string | null } {
  let nextTriggerDays: number | null = null;
  let nextTriggerPlanId: string | null = null;
  const now = Date.now();
  for (const p of plans) {
    const release = p.release_timestamp ?? p.next_trigger_date ?? p.next_trigger_timestamp ?? p.release_at;
    if (release != null) {
      let ts: number = NaN;
      if (typeof release === 'number') ts = release * 1000;
      else if (typeof release === 'string' && /^\d+$/.test(release)) ts = Number(release) * 1000;
      else ts = Date.parse(String(release));
      if (!Number.isNaN(ts)) {
        const days = Math.ceil((ts - now) / (1000 * 60 * 60 * 24));
        if (days >= 0 && (nextTriggerDays === null || days < (nextTriggerDays ?? Infinity))) {
          nextTriggerDays = days;
          nextTriggerPlanId = p.id ?? p.plan_id ?? p.plan_number ?? null;
        }
      }
    } else if (p.inactivity_period_days) {
      const last = p.last_active_at ?? p.last_proof_date ?? p.last_check ?? p.updated_at ?? null;
      if (last != null) {
        let lastTs = NaN;
        if (typeof last === 'number') lastTs = Number(last) * 1000;
        else lastTs = Date.parse(String(last));
        if (!Number.isNaN(lastTs)) {
          const daysUntil = Number(p.inactivity_period_days) - Math.ceil((now - lastTs) / (1000 * 60 * 60 * 24));
          if (daysUntil >= 0 && (nextTriggerDays === null || daysUntil < (nextTriggerDays ?? Infinity))) {
            nextTriggerDays = daysUntil;
            nextTriggerPlanId = p.id ?? p.plan_id ?? null;
          }
        }
      }
    }
  }
  return { nextTriggerDays, nextTriggerPlanId };
}

function parseAmount(value: any): number {
  if (value == null) return 0;
  // Try to coerce strings like "142500.00" or numeric
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : Number(value);
  return Number.isFinite(num) ? num : 0;
}

export async function getOwnerDashboardStats(token?: string): Promise<OwnerStats> {
  // Prefer dedicated dashboard endpoint when available
  const dashboard = await fetchDashboardEndpoint(token);
  if (dashboard) {
    try {
      const plansList = Array.isArray(dashboard.plans) ? dashboard.plans : [];
      const totalsByAsset: Record<string, number> = {};
      for (const p of plansList) {
        try {
          if (!p) continue;
          const asset = (p.crypto_asset || 'UNKNOWN').toString();
          const amt = parseAmount(p.amount);
          if (amt > 0) totalsByAsset[asset] = (totalsByAsset[asset] || 0) + amt;
        } catch (e) {
          // ignore
        }
      }

      const activePlansCount = plansList.filter((p: any) => p && (p.active === true || p.active === 'true')).length;
      const totalPlansCount = plansList.length;

      const assetParts: string[] = [];
      for (const asset of Object.keys(totalsByAsset)) {
        const amt = totalsByAsset[asset];
        const formattedAmt = Number(amt).toLocaleString(undefined, { maximumFractionDigits: 6 });
        assetParts.push(`${formattedAmt} ${asset}`);
      }
      const formatted = assetParts.length ? assetParts.join(', ') : '$0.00';

      // Determine latest subscription from all_subscriptions
      const subs = Array.isArray(dashboard.all_subscriptions) ? dashboard.all_subscriptions : [];
      let latestSub: any = null;
      if (subs.length) {
        // prefer active subscriptions, otherwise most recent start_date
        const active = subs.filter((s: any) => s?.is_active === true);
        if (active.length) {
          latestSub = active.sort((a: any, b: any) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())[0];
        } else {
          latestSub = subs.sort((a: any, b: any) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())[0];
        }
      }

      // Map pricing id to plan name using /auth/plans
      const plansMap = await fetchPlansList(token);
      let latestSubscriptionMapped = null;
      if (latestSub) {
        const pid = Number(latestSub.pricing_id);
        const planInfo = plansMap[pid] ?? null;
        latestSubscriptionMapped = {
          pricing_id: pid,
          name: planInfo?.name ?? null,
          duration_months: latestSub.duration_months ?? null,
          is_active: latestSub.is_active ?? null,
          start_date: latestSub.start_date ?? null,
          end_date: latestSub.end_date ?? null,
        };
      }

      // compute next trigger using view-inheritances (more detailed)
      try {
        const inheritances = await fetchInheritancePlans(token);
        const next = computeNextTriggerFromPlans(inheritances);
        if (next.nextTriggerDays !== null) {
          // prefer computed next trigger
          return {
            totalValueSecured: Object.values(totalsByAsset).reduce((a, b) => a + b, 0),
            totalValueSecuredFormatted: formatted,
            activePlansCount,
            nextTriggerDays: next.nextTriggerDays,
            nextTriggerPlanId: next.nextTriggerPlanId,
            userTotalInheritance: typeof dashboard.user_total_inheritance === 'number' ? dashboard.user_total_inheritance : parseAmount(dashboard.user_total_inheritance),
            userTotalInheritanceFormatted: typeof dashboard.user_total_inheritance === 'number' ? Number(dashboard.user_total_inheritance).toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' ETH' : null,
            globalTotalInheritance: typeof dashboard.global_total_inheritance === 'number' ? dashboard.global_total_inheritance : parseAmount(dashboard.global_total_inheritance),
            globalTotalInheritanceFormatted: typeof dashboard.global_total_inheritance === 'number' ? Number(dashboard.global_total_inheritance).toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' ETH' : null,
            latestSubscription: latestSubscriptionMapped,
            totalPlansCount,
            networkStatus: 'Healthy',
          } as OwnerStats;
        }

      } catch (e) {
        // ignore and fall through to return without next trigger
      }

      return {
        totalValueSecured: Object.values(totalsByAsset).reduce((a, b) => a + b, 0),
        totalValueSecuredFormatted: formatted,
        totalPlansCount,
        activePlansCount,
        nextTriggerDays: null,
        nextTriggerPlanId: null,
        userTotalInheritance: typeof dashboard.user_total_inheritance === 'number' ? dashboard.user_total_inheritance : parseAmount(dashboard.user_total_inheritance),
        userTotalInheritanceFormatted: typeof dashboard.user_total_inheritance === 'number' ? Number(dashboard.user_total_inheritance).toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' ETH' : null,
        globalTotalInheritance: typeof dashboard.global_total_inheritance === 'number' ? dashboard.global_total_inheritance : parseAmount(dashboard.global_total_inheritance),
        globalTotalInheritanceFormatted: typeof dashboard.global_total_inheritance === 'number' ? Number(dashboard.global_total_inheritance).toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' ETH' : null,
        latestSubscription: latestSubscriptionMapped,
        networkStatus: 'Healthy',
      } as OwnerStats;
    } catch (e) {
      // fallthrough to legacy aggregation
    }
  }

  const plans = await fetchInheritancePlans(token);

  // Compute total value secured grouped by crypto asset (sum only funded plans)
  const totalsByAsset: Record<string, number> = {};
  for (const p of plans) {
    try {
      if (!p || !p.is_funded) continue; // only consider funded plans
      const asset = (p.crypto_asset || 'UNKNOWN').toString();
      const amt = parseAmount(p.amount);
      totalsByAsset[asset] = (totalsByAsset[asset] || 0) + amt;
    } catch (e) {
      // ignore malformed plan
    }
  }

  // Count active plans as funded plans
  const activePlansCount = plans.filter((p: any) => p && (p.is_funded === true || p.is_funded === 'true')).length;

  // Determine next trigger check: prefer explicit next_trigger_date / release_timestamp, else derive from proof_of_life/inactivity
  let nextTriggerDays: number | null = null;
  let nextTriggerPlanId: string | null = null;
  const now = Date.now();

  for (const p of plans) {
    const release = p.release_timestamp ?? p.next_trigger_date ?? p.next_trigger_timestamp ?? p.release_at;
    if (release != null) {
      // release may be epoch seconds (number) or numeric string, or ISO string
      let ts: number = NaN;
      if (typeof release === 'number') ts = release * 1000;
      else if (typeof release === 'string' && /^\d+$/.test(release)) ts = Number(release) * 1000;
      else ts = Date.parse(String(release));

      if (!Number.isNaN(ts)) {
        const days = Math.ceil((ts - now) / (1000 * 60 * 60 * 24));
        if (days >= 0 && (nextTriggerDays === null || days < (nextTriggerDays ?? Infinity))) {
          nextTriggerDays = days;
          nextTriggerPlanId = p.id ?? p.plan_id ?? p.plan_number ?? null;
        }
      }
    } else if (p.inactivity_period_days) {
      const last = p.last_active_at ?? p.last_proof_date ?? p.last_check ?? p.updated_at ?? null;
      if (last != null) {
        let lastTs = NaN;
        if (typeof last === 'number') lastTs = Number(last) * 1000;
        else lastTs = Date.parse(String(last));
        if (!Number.isNaN(lastTs)) {
          const daysUntil = Number(p.inactivity_period_days) - Math.ceil((now - lastTs) / (1000 * 60 * 60 * 24));
          if (daysUntil >= 0 && (nextTriggerDays === null || daysUntil < (nextTriggerDays ?? Infinity))) {
            nextTriggerDays = daysUntil;
            nextTriggerPlanId = p.id ?? p.plan_id ?? null;
          }
        }
      }
    }
  }

  // Network status: backend does not expose a dedicated health endpoint in this deployment.
  // For the dashboard UX we treat network status as Healthy by default.
  const networkStatus: OwnerStats['networkStatus'] = 'Healthy';

  // Build a human-readable formatted total: list amounts per asset (no fiat conversion)
  const assetParts: string[] = [];
  for (const asset of Object.keys(totalsByAsset)) {
    // show up to 6 significant decimals for small token amounts
    const amt = totalsByAsset[asset];
    const formattedAmt = Number(amt).toLocaleString(undefined, { maximumFractionDigits: 6 });
    assetParts.push(`${formattedAmt} ${asset}`);
  }
  const formatted = assetParts.length ? assetParts.join(', ') : '$0.00';

  return {
    totalValueSecured: Object.values(totalsByAsset).reduce((a, b) => a + b, 0),
    totalValueSecuredFormatted: formatted,
    totalPlansCount: plans.length,
    activePlansCount,
    nextTriggerDays: nextTriggerDays === null ? null : Math.max(0, nextTriggerDays),
    nextTriggerPlanId,
    networkStatus,
  };
}

export default getOwnerDashboardStats;
