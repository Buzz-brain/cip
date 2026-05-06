// src/context/useAuth.ts
// Custom hook for accessing auth context

import { useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

const noopAsync = async (..._args: any[]) => { throw new Error('Auth action unavailable'); };

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    // Provide a safe fallback to avoid crashing the app in case the provider is missing.
    // Log a clear warning to help debugging the root cause (provider ordering or duplicate contexts).
    // This prevents the uncaught error seen in ProtectedRoute and allows the app to render a redirect.
    // NOTE: This masks the underlying issue; investigate provider placement if this appears in production.
    // eslint-disable-next-line no-console
    console.warn('useAuth called without AuthProvider. Returning fallback context.');
    return {
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,
      loginWithWallet: noopAsync as any,
      loginAsAdmin: noopAsync as any,
      getNonce: noopAsync as any,
      logout: () => {},
      clearError: () => {},
      updateUserInfo: noopAsync as any,
      fetchUserInfo: noopAsync as any,
    } as AuthContextType;
  }
  return context;
};
