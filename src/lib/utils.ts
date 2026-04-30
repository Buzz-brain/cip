import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getAddress } from "ethers";
import { toast } from "react-toastify";

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
    // Provide user feedback and rethrow for callers to handle
    toast.error("Invalid wallet address. Please provide a valid Ethereum address.");
    throw err;
  }
}

// Extract user-friendly error message from backend response
// Tries to parse JSON and extract 'detail' field, falls back to plain text
export async function extractErrorMessage(response: Response): Promise<string> {
  const defaultMsg = `Error (Status: ${response.status})`;
  try {
    const data = await response.json();
    if (data?.detail) return String(data.detail);
    if (typeof data === 'string') return data;
    return defaultMsg;
  } catch {
    try {
      const text = await response.text();
      return text || defaultMsg;
    } catch {
      return defaultMsg;
    }
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
