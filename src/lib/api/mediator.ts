const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "https://xcip.name.ng";
import { extractErrorMessage } from '../utils';

export async function resolveDispute(token: string, disputeId: number, resolution_note: string): Promise<any> {
  if (!token) throw new Error('Not authenticated');
  const url = `${BACKEND_API_URL}/med/resolve-dispute/${disputeId}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resolution_note }),
  });

  if (!res.ok) {
    const err = await extractErrorMessage(res).catch(() => `Error (Status: ${res.status})`);
    throw new Error(err);
  }

  const json = await res.json().catch(() => null);
  return json;
}

export default { resolveDispute };
