// src/lib/api/auth.ts
// Authentication API utility functions for CIP Portal

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export async function getNonce(publicKey: string): Promise<string> {
  const url = `${BACKEND_API_URL}/auth/nonce?public_key=${encodeURIComponent(publicKey)}`;
  console.log("   📡 Fetching nonce from:", url);
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Accept": "application/json" },
  });
  
  console.log("Nonce endpoint response status:", res.status);
  
  if (!res.ok) throw new Error("Failed to get nonce");
  
  const data = await res.json();
  console.log("Nonce response data:", data);
  
  // The API returns {nonce: string}, so extract the nonce value
  const nonce = data.nonce || data;
  // console.log("Extracted nonce:", nonce);
  
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
  console.log("   📡 Login endpoint URL:", url);
  console.log("   📊 Login request parameters:");
  console.log("      - public_key:", publicKey);
  console.log("      - signature (first 20 chars):", signature.substring(0, 20) + "...");
  console.log("      - signature (total length):", signature.length);
  console.log("      - message (nonce):", message);
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Accept": "application/json" },
  });
  
  console.log("   📊 Login endpoint response status:", res.status);
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.log("   ❌ Login failed. Error response:", errorData);

    // Normalize error message for the user
    let userMessage = "Login failed";
    if (errorData) {
      if (typeof errorData === 'string') userMessage = errorData;
      else if (errorData.detail) userMessage = String(errorData.detail);
      else if (errorData.message) userMessage = String(errorData.message);
      else if (errorData.error) userMessage = String(errorData.error);
      else if (errorData.errors && Array.isArray(errorData.errors)) userMessage = errorData.errors.join(', ');
      else userMessage = JSON.stringify(errorData);
    } else {
      userMessage = res.statusText || userMessage;
    }

    throw new Error(`Login failed: ${userMessage}`);
  }
  
  const result = await res.json();
  console.log("   ✅ Login response:", result);

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
    const errorData = await res.json().catch(() => null);
    console.error("auth.getUserInfo failed", res.status, errorData);
    throw new Error("Failed to fetch user info");
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
    const errorData = await res.json().catch(() => null);
    console.error("auth.updateAccountInfo failed", res.status, errorData);
    throw new Error("Failed to update account info");
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
    console.warn('auth.getActivityLogs: failed', res.status);
    return [];
  }
  const json = await res.json().catch(() => []);
  return Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);
}
