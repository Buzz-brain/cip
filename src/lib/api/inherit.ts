// src/lib/api/inherit.ts
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
import { extractErrorMessage } from '../utils';

export async function activateProofOfLife(token: string): Promise<any> {
  const url = `${BACKEND_API_URL}/inherit/proof-of-life`;
  console.log('[inherit.activateProofOfLife] POST', url);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: null,
  });

  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => `Error (Status: ${res.status})`);
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}
// Note: backend exposes POST /inherit/proof-of-life for activation/confirmation.

export async function getProofOfLifeTypes(): Promise<string[]> {
  const res = await fetch(`${BACKEND_API_URL}/inherit/proof-of-life-types`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || 'Failed to fetch proof-of-life types');
    throw new Error(msg || 'Failed to fetch proof-of-life types');
  }
  return res.json();
}

export async function getActiveProofPlan(token?: string): Promise<any | null> {
  // Fetch user's plans and attempt to find an inactivity proof-of-life plan
  const url = `${BACKEND_API_URL}/inherit/view-inheritances`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    console.warn('getActiveProofPlan: failed to fetch plans', res.status);
    return null;
  }
  const json = await res.json().catch(() => null);
  const items = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
  if (!items.length) return null;
  // Prefer plans that include proof_of_life or have inactivity_period_days
  const found = items.find((p: any) => p.proof_of_life || p.inactivity_period_days || p.plan_type === 'inactivity') || items[0];
  return found;
}

export async function cancelInheritance(planId: number, token?: string): Promise<any> {
  const url = `${BACKEND_API_URL}/inherit/cancel-inheritance/${planId}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `HTTP ${res.status}`);
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json().catch(() => null);
}

export async function editInheritance(payload: any, token?: string): Promise<any> {
  const url = `${BACKEND_API_URL}/inherit/edit-inheritance`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `HTTP ${res.status}`);
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json().catch(() => null);
}
