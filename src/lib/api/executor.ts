const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "https://xcip.name.ng";

export async function getExecutorInheritances(token?: string): Promise<{ plans: any[]; beneficiaries: any[] } | null> {
  const url = `${BACKEND_API_URL}/exec/inheritances-plan`;
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
    throw new Error(`getExecutorInheritances failed: ${res.status} ${txt}`);
  }
  const json = await res.json().catch(() => null);
  if (!json) return null;

  // Preferred envelopes:
  // { data: { plans: [...] } }
  // or { plan: {...}, beneficiaries: [...] }
  if (json.data) {
    const plans = Array.isArray(json.data.plans) ? json.data.plans : Array.isArray(json.data) ? json.data : [];
    const beneficiaries = Array.isArray(json.data.beneficiaries) ? json.data.beneficiaries : Array.isArray(json.data.beneficiary) ? json.data.beneficiary : [];
    return { plans, beneficiaries };
  }

  if (json.plan) {
    const plans = Array.isArray(json.plan) ? json.plan : [json.plan];
    const beneficiaries = Array.isArray(json.beneficiaries) ? json.beneficiaries : Array.isArray(json.beneficiary) ? json.beneficiary : [];
    return { plans, beneficiaries };
  }

  const plans = Array.isArray(json) ? json : Array.isArray((json as any).plans) ? (json as any).plans : [];
  const beneficiaries = Array.isArray((json as any).beneficiaries) ? (json as any).beneficiaries : Array.isArray((json as any).beneficiary) ? (json as any).beneficiary : [];
  return { plans, beneficiaries };
}

export async function getExecutorInheritanceById(token?: string, id?: number): Promise<any | null> {
  if (!id) return null;
  const url = `${BACKEND_API_URL}/exec/inheritances-plan/${id}`;
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
    throw new Error(`getExecutorInheritanceById failed: ${res.status} ${txt}`);
  }
  const json = await res.json().catch(() => null);
  if (!json) return null;
  return json.data ?? json;
}

export async function postExecutePlan(token: string | undefined, id: number, file?: File): Promise<any> {
  if (!token) throw new Error('Not authenticated');
  const url = `${BACKEND_API_URL}/exec/excute-a-plan/${id}`;
  const form = new FormData();
  if (file) form.append('file', file);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: form,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`postExecutePlan failed: ${res.status} ${txt}`);
  }
  const json = await res.json().catch(() => null);
  return json;
}

export default {
  getExecutorInheritances,
  getExecutorInheritanceById,
  postExecutePlan,
};
