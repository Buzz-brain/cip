const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "https://xcip.name.ng";

export interface RaiseDisputeParams {
  planId: number;
  reason: string;
  description: string;
  file?: File | null;
}

export async function raiseDispute(token: string, params: RaiseDisputeParams): Promise<any> {
  if (!token) throw new Error('Not authenticated');
  const url = `${BACKEND_API_URL}/dis/raise-dispute/${params.planId}`;
  const formData = new FormData();
  formData.append('reason', params.reason);
  formData.append('description', params.description);
  if (params.file) formData.append('file', params.file as any);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`raiseDispute failed: ${res.status} ${txt}`);
  }

  const json = await res.json().catch(() => null);
  return json;
}

export async function getAllDisputes(token: string): Promise<any[]> {
  if (!token) throw new Error('Not authenticated');
  const url = `${BACKEND_API_URL}/dis/view-all-disputes`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    console.error(`[getAllDisputes] failed: ${res.status} ${txt}`);
    return [];
  }

  const json = await res.json().catch(() => null);
  if (!json) return [];
  
  // Extract disputes from response structure
  // Response is typically: { status, disputes: { dispute: {...}, inheritance: [...] } }
  const disputes = json.disputes?.dispute ? [json.disputes.dispute] : [];
  return disputes;
}

export default { raiseDispute, getAllDisputes };
