// src/lib/dashboard/ownerStats.ts
// Aggregation helpers for Owner Dashboard statistics

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

type OwnerStats = {
  totalValueSecured: number; // in native units (e.g., USD if backend returns fiat, or token amount if token)
  totalValueSecuredFormatted: string;
  activePlansCount: number;
  nextTriggerDays?: number | null; // days until next trigger check, null if unknown
  nextTriggerPlanId?: string | null;
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

function parseAmount(value: any): number {
  if (value == null) return 0;
  // Try to coerce strings like "142500.00" or numeric
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : Number(value);
  return Number.isFinite(num) ? num : 0;
}

export async function getOwnerDashboardStats(token?: string): Promise<OwnerStats> {
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
    activePlansCount,
    nextTriggerDays: nextTriggerDays === null ? null : Math.max(0, nextTriggerDays),
    nextTriggerPlanId,
    networkStatus,
  };
}

export default getOwnerDashboardStats;
