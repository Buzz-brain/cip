import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize wallet address to lowercase for consistent comparison across the system.
 * This prevents case-sensitivity issues where the same wallet in different cases
 * is treated as different users/beneficiaries/executors.
 */
export function normalizeWalletAddress(address: string | undefined): string {
  if (!address) return "";
  return String(address).toLowerCase().trim();
}
