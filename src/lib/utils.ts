import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getAddress } from "ethers";
// toast should not be used for low-level normalization functions; callers decide UX

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Normalize an Ethereum/EVM wallet address to EIP-55 checksum format.
// Throws if the address is invalid.
export function normalizeWalletAddress(address: string): string {
  const trimmed = (address || "").trim();
  if (!trimmed) throw new Error("Empty address");
  try {
    return getAddress(trimmed);
  } catch (err) {
    // Rethrow and let the caller handle user-facing feedback (avoid toasts during typing)
    throw err;
  }
}

// Extract user-friendly error message from backend response
// Tries to parse JSON and extract 'detail' field, falls back to plain text
export async function extractErrorMessage(response: Response): Promise<string> {
  const defaultMsg = `Error (Status: ${response.status})`;

  // Try to parse JSON response and prefer explicit backend `detail` message when present
  try {
    const text = await response.text();

    // Attempt JSON parse first
    try {
      const data = text ? JSON.parse(text) : null;
      if (data && data.detail) return String(data.detail);
      if (typeof data === 'string' && data.length > 0) return data;
    } catch {
      // not JSON, fall through to plain text handling
    }

    // If plain text body exists, use it
    if (text && text.trim().length > 0) return text.trim();

    // Fallback messages for common status codes
    if (response.status === 401) return 'Not authenticated. Please connect your wallet or log in.';
    if (response.status === 403) return 'Access denied. Your account does not have permission.';

    return defaultMsg;
  } catch {
    // Final fallback
    if (response.status === 401) return 'Not authenticated. Please connect your wallet or log in.';
    if (response.status === 403) return 'Access denied. Your account does not have permission.';
    return defaultMsg;
  }
}

export function formatTimestampUtc(ts?: number | null): string {
  if (!ts) return '—';
  try {
    const d = new Date(Number(ts) * 1000);
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = months[d.getUTCMonth()];
    const day = d.getUTCDate();
    const year = d.getUTCFullYear();
    const hh = d.getUTCHours();
    const mm = String(d.getUTCMinutes()).padStart(2, '0');
    const ss = String(d.getUTCSeconds()).padStart(2, '0');
    const period = hh >= 12 ? 'PM' : 'AM';
    const hour12 = hh % 12 === 0 ? 12 : hh % 12;
    return `${month} ${day}, ${year} at ${hour12}:${mm}:${ss} ${period} UTC`;
  } catch (e) {
    return String(ts);
  }
}

// Map user role to dashboard route. Keeps routing logic in one place.
export function getDashboardRoute(role?: string | null): string {
  switch ((role || "").toLowerCase()) {
    case "executor":
      return "/executor-dashboard";
    case "administrative":
    case "admin":
    case "administrative_role":
      return "/administrative-dashboard";
    case "mediator":
    case "mediator_role":
      return "/mediator-dashboard";
    case "beneficiary":
      return "/beneficiary-dashboard";
    case "owner":
      return "/owner-dashboard";
    default:
      return "/owner-dashboard";
  }
}
