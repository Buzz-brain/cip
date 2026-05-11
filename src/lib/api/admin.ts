// src/lib/api/admin.ts
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
import { extractErrorMessage } from '../utils';

export async function createAdmin(
  token: string | undefined,
  body: { email: string; user_name: string; password: string; full_name: string; secret_code: string }
): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/create-admin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(err);
  }

  return res.json();
}

export async function adminLogin(body: { email_or_username: string; password: string }): Promise<string> {
  const res = await fetch(`${BACKEND_API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(`Admin login failed: ${msg}`);
  }

  const data = await res.json();
  // Expecting either a token string or { token }
  if (typeof data === "string") return data;
  if (data && typeof data === "object" && "token" in data) return data.token;
  return JSON.stringify(data);
}

export async function getDashboard(token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/dashboard`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch admin dashboard");
  }

  return res.json();
}

export default { createAdmin, adminLogin, getDashboard };

export async function viewUsers(token?: string): Promise<any[]> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-users`, {
    method: "GET",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch users");
  }
  return res.json();
}

export async function viewExecutors(token?: string): Promise<any[]> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-executors`, {
    method: "GET",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch executors");
  }
  return res.json();
}

export async function viewMediators(token?: string): Promise<any[]> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-mediators`, {
    method: "GET",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch mediators");
  }
  return res.json();
}

export async function viewAdmins(token?: string): Promise<any[]> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-admins`, {
    method: "GET",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch admins");
  }
  return res.json();
}

export async function viewUser(userId: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-user/${userId}`, {
    method: "GET",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch user");
  }
  return res.json();
}

export async function viewUserInheritance(userId: number, planId: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-user/${userId}/inheritance/${planId}`, {
    method: "GET",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch user inheritance");
  }
  return res.json();
}

export async function viewExecutor(execId: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-executor/${execId}`, {
    method: "GET",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch executor");
  }
  return res.json();
}

export async function viewMediator(medId: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-mediator/${medId}`, {
    method: "GET",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch mediator");
  }
  return res.json();
}

export async function viewIexecJobs(token?: string): Promise<any[]> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-iexec-jobs`, {
    method: "GET",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to fetch iexec jobs");
  }
  return res.json();
}

export async function viewEnterprises(token?: string): Promise<any[]> {
  const res = await fetch(`${BACKEND_API_URL}/admin/view-enterprise`, {
    method: 'GET',
    headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || 'Failed to fetch enterprises');
  }
  return res.json();
}

export async function disapproveMediator(medId: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/disapprove-mediator/${medId}`, {
    method: "PATCH",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to disapprove mediator");
  }
  return res.json();
}

export async function approveMediator(medId: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/approve-mediator/${medId}?medi_id=${medId}`, {
    method: "PATCH",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to approve mediator");
  }
  return res.json();
}

export async function disapproveAdmin(adminIdd: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/disapprove-admin/${adminIdd}?admin_idd=${adminIdd}`, {
    method: "PATCH",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to disapprove admin");
  }
  return res.json();
}

export async function approveAdmin(adminIdd: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/approve-admin/${adminIdd}?admin_idd=${adminIdd}`, {
    method: "PATCH",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to approve admin");
  }
  return res.json();
}

export async function approveEnterprise(entrepId: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/approve-enterprise/${entrepId}`, {
    method: 'PATCH',
    headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || 'Failed to approve enterprise');
  }
  return res.json();
}

export async function disapproveAdminByEntrep(entrepId: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/disapprove-enterprise/${entrepId}`, {
    method: 'PATCH',
    headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || 'Failed to disapprove admin/enterprise');
  }
  return res.json();
}

export async function promoteAdmin(adminIdd: number, token?: string): Promise<any> {
  const res = await fetch(`${BACKEND_API_URL}/admin/promote-admin/${adminIdd}?admin_idd=${adminIdd}`, {
    method: "PATCH",
    headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) {
    const msg = await extractErrorMessage(res).catch(() => res.statusText || `Error (Status: ${res.status})`);
    throw new Error(msg || "Failed to promote admin");
  }
  return res.json();
}
