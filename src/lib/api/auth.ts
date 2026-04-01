// src/lib/api/auth.ts
// Authentication API utility functions for CIP Portal

const BASE_URL = "https://xcip.name.ng";

export async function getNonce(publicKey: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/nonce?public_key=${encodeURIComponent(publicKey)}`, {
    method: "POST",
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to get nonce");
  const data = await res.json();
  // The API returns {nonce: string}, so extract the nonce value
  return data.nonce || data;
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
  const res = await fetch(`${BASE_URL}/auth/login?${params.toString()}`, {
    method: "POST",
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function getUserInfo(token: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/auth/user-info`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user info");
  return res.json();
}

export async function updateAccountInfo(
  token: string,
  data: { full_name?: string; country?: string; preferred_chain?: string }
): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/account-info-update`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update account info");
  return res.json();
}
