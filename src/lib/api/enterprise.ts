const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
import { extractErrorMessage } from '../utils';

export async function createEnterprise(body: any, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/enterprise/create-entrep`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || 'Failed to create enterprise');
  }

  return res.json();
}

export async function enterpriseLogin(body: { email: string; password: string }): Promise<string> {
  const res = await fetch(`${BACKEND_API_URL}/enterprise/login`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || 'Enterprise login failed');
  }

  const data = await res.json();
  if (typeof data === 'string') return data;
  if (data && typeof data === 'object' && 'token' in data) return data.token;
  return JSON.stringify(data);
}

export async function generateEnterpriseApiKey(token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/enterprise/generate-api-key/`, {
    method: 'PATCH',
    headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });

  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || 'Failed to generate API key');
  }

  return res.json();
}

export async function viewEnterpriseDashboard(token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/enterprise/dashboard`, {
    method: 'GET',
    headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });

  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || 'Failed to fetch enterprise dashboard');
  }

  return res.json();
}

export default { createEnterprise, enterpriseLogin, generateEnterpriseApiKey, viewEnterpriseDashboard };
