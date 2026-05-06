// src/context/AuthContext.tsx
// Authentication context for managing user state and auth actions globally

import React, { createContext, useState, useCallback, ReactNode, useEffect } from "react";
import * as authAPI from "../lib/api/auth";

const STORAGE_KEY = "cip_auth_user";

export interface User {
  publicKey: string;
  token: string;
  userInfo?: any; // Extended with user info from backend
  name?: string;
  email?: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  loginWithWallet: (publicKey: string, signature: string, message: string) => Promise<User>;
  loginAsAdmin?: (token: string, info?: { email?: string; full_name?: string }) => Promise<User>;
  getNonce: (publicKey: string) => Promise<string>;
  logout: () => void;
  clearError: () => void;
  updateUserInfo: (data: { full_name?: string; email?: string; country?: string; preferred_chain?: string }) => Promise<void>;
  fetchUserInfo: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsInitialized(true);
  }, []);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [user, isInitialized]);

  // Get nonce for wallet signing
  const getNonce = useCallback(async (publicKey: string): Promise<string> => {
    try {
      setError(null);
      const nonce = await authAPI.getNonce(publicKey);
      return nonce;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to get nonce";
      setError(message);
      throw err;
    }
  }, []);

  // Login as admin with token
  const loginAsAdmin = useCallback(async (token: string, info?: { email?: string; full_name?: string }) => {
    try {
      setLoading(true);
      setError(null);
      const newUser: User = { publicKey: "", token, userInfo: info || {}, role: "admin", name: info?.full_name, email: info?.email };
      setUser(newUser);
      return newUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Admin login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Login with wallet signature
  const loginWithWallet = useCallback(
    async (publicKey: string, signature: string, message: string) => {
      try {
        setLoading(true);
        setError(null);
      const loginResponse = await authAPI.login({ publicKey, signature, message });

      // API returns a token string
      const token = loginResponse as string;
      if (!token || typeof token !== "string") {
        throw new Error("Login failed: invalid auth token");
      }

        const newUser: User = { publicKey, token };
        // Optionally fetch user info after login
        try {
          const userInfo = await authAPI.getUserInfo(token);
          newUser.userInfo = userInfo;
          // map common fields if present
          newUser.name = userInfo?.full_name || userInfo?.name || newUser.name;
          newUser.email = userInfo?.email || newUser.email;
        } catch (err) {
          console.warn("Failed to fetch user info after login:", err);
        }

        // Debug: log user object right before persisting
        try { console.log('[AuthContext] loginWithWallet - setting user', { publicKey, token, userInfo: newUser.userInfo }); } catch {}
        setUser(newUser);
        return newUser;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Fetch user info
  const fetchUserInfo = useCallback(async () => {
    if (!user?.token) {
      setError("No authentication token found");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const userInfo = await authAPI.getUserInfo(user.token);
      // Debug: log fetched userInfo
      try { console.log('[AuthContext] fetchUserInfo - fetched', userInfo); } catch {}
      setUser((prev) =>
        prev
          ? { ...prev, userInfo, name: userInfo?.full_name || userInfo?.name || prev.name, email: userInfo?.email || prev.email }
          : null,
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch user info";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  // Update user account info
  const updateUserInfo = useCallback(
    async (data: { full_name?: string; email?: string; country?: string; preferred_chain?: string }) => {
      if (!user?.token) {
        setError("No authentication token found");
        return;
      }
      try {
        setLoading(true);
        setError(null);
        await authAPI.updateAccountInfo(user.token, data);
        // Refresh user info after update
        await fetchUserInfo();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to update account info";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.token, fetchUserInfo],
  );

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    loginWithWallet,
    loginAsAdmin,
    getNonce,
    logout,
    clearError,
    updateUserInfo,
    fetchUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
