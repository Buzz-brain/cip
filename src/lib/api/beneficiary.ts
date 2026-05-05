const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "https://xcip.name.ng";

export async function getBeneficiaryInheritances(token?: string): Promise<{ plans: any[]; beneficiaries: any[] } | null> {
  const url = `${BACKEND_API_URL}/bf/inheritances`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    const txt = await res.text().catch(() => '');
    throw new Error(`getBeneficiaryInheritances failed: ${res.status} ${txt}`);
  }
  const json = await res.json().catch(() => null);
  if (!json) return null;

  // Preferred envelope: { status, data: { plans: [...], beneficiary: [...] } }
  if (json.data) {
    const plans = Array.isArray(json.data.plans) ? json.data.plans : Array.isArray(json.data) ? json.data : [];
    const beneficiaries = Array.isArray(json.data.beneficiary) ? json.data.beneficiary : Array.isArray(json.data.beneficiaries) ? json.data.beneficiaries : [];
    return { plans, beneficiaries };
  }

  // Fallbacks: top-level arrays
  const plans = Array.isArray(json) ? json : Array.isArray((json as any).plans) ? (json as any).plans : [];
  const beneficiaries = Array.isArray((json as any).beneficiary) ? (json as any).beneficiary : Array.isArray((json as any).beneficiaries) ? (json as any).beneficiaries : [];
  return { plans, beneficiaries };
}

export async function getBeneficiaryInheritanceById(token: string | undefined, id: number): Promise<{ plan: any; beneficiary: any } | null> {
  if (!token) throw new Error('Not authenticated');
  const url = `${BACKEND_API_URL}/bf/inheritances/${id}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    const txt = await res.text().catch(() => '');
    throw new Error(`getBeneficiaryInheritanceById failed: ${res.status} ${txt}`);
  }
  const json = await res.json().catch(() => null);
  if (!json) return null;
  // Expect envelope: { status, data: { beneficiary: {...}, plan: {...} } }
  if (json.data) {
    const plan = json.data.plan ?? json.data.plans ?? json.data;
    const beneficiary = json.data.beneficiary ?? json.data.beneficiaries ?? null;
    return { plan, beneficiary };
  }
  // Fallback: try top-level fields
  const plan = (json as any).plan ?? (json as any).plans ?? json;
  const beneficiary = (json as any).beneficiary ?? null;
  return { plan, beneficiary };
}

export async function getBeneficiaryDashboard(token?: string): Promise<{ beneficiary_wallet?: string; total_plans_benefit?: number; total_amount?: number } | null> {
  const url = `${BACKEND_API_URL}/bf/dashboard`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    const txt = await res.text().catch(() => '');
    throw new Error(`getBeneficiaryDashboard failed: ${res.status} ${txt}`);
  }
  const json = await res.json().catch(() => null);
  if (!json) return null;

  // Prefer envelope: { status, data: { ... } }
  const payload = json.data ?? json;
  return {
    beneficiary_wallet: payload?.beneficiary_wallet,
    total_plans_benefit: typeof payload?.total_plans_benefit === 'number' ? payload.total_plans_benefit : (payload?.total_plans ?? null),
    total_amount: typeof payload?.total_amount === 'number' ? payload.total_amount : (payload?.totalAmount ?? null),
  };
}

export async function nominateMediator(token: string, planId: number, body: { full_name: string; email: string; wallet: string; dispute_id?: number }): Promise<any> {
  if (!token) throw new Error('Not authenticated');
  const url = `${BACKEND_API_URL}/bf/nominate-mediator/${planId}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`nominateMediator failed: ${res.status} ${txt}`);
  }
  const json = await res.json().catch(() => null);
  return json;
}

export default {
  getBeneficiaryInheritances,
  getBeneficiaryInheritanceById,
  getBeneficiaryDashboard,
  nominateMediator,
};
