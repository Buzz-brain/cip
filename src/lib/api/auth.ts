// src/lib/api/auth.ts
// Authentication API utility functions for CIP Portal

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
import { extractErrorMessage } from '../utils';

export async function getNonce(publicKey: string): Promise<string> {
  const url = `${BACKEND_API_URL}/auth/nonce?public_key=${encodeURIComponent(publicKey)}`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Accept": "application/json" },
  });
  
  
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || 'Failed to get nonce');
    throw new Error(msg || 'Failed to get nonce');
  }
  
  const data = await res.json();
  
  // The API returns {nonce: string}, so extract the nonce value
  const nonce = data.nonce || data;
  
  return nonce;
}

export async function login({
  publicKey,
  signature,
  message,
}: {
  publicKey: string;
  signature: string;
  message: string;
}): Promise<string> {
  const params = new URLSearchParams({
    public_key: publicKey,
    signature,
    message,
  });
  
  const url = `${BACKEND_API_URL}/auth/login?${params.toString()}`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Accept": "application/json" },
  });
  
  
  if (!res.ok) {
    const userMessage = await extractErrorMessage(res).catch(() => res.statusText || 'Login failed');
    throw new Error(`Login failed: ${userMessage}`);
  }
  
  const result = await res.json();

  // Ensure consumers get the token string directly (backend returns { token, ... })
  if (result && typeof result === "object" && "token" in result) {
    return result.token;
  }

  // Fallback for unexpected response shape
  return result;
}

export async function getUserInfo(token: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/auth/user-info`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => 'Failed to fetch user info');
    throw new Error(msg || "Failed to fetch user info");
  }
  return res.json();
}

export async function updateAccountInfo(
  token: string,
  data: { full_name?: string; email?: string; country?: string; preferred_chain?: string }
): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/auth/account-info-update`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => 'Failed to update account info');
    throw new Error(msg || "Failed to update account info");
  }
  return res.json();
}

export async function getActivityLogs(token?: string): Promise<any[]> {
  const url = `${BACKEND_API_URL}/auth/activity-logs`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    return [];
  }
  const json = await res.json().catch(() => []);
  return Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);
}

export async function getSubscriptionHistory(token?: string): Promise<any[]> {
  const url = `${BACKEND_API_URL}/auth/subscription-history`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    return [];
  }
  const json = await res.json().catch(() => []);
  return Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);
}
