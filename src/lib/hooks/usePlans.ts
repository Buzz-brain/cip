import { useEffect, useState, useCallback } from "react";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export type BackendPlan = {
  price: number;
  supported_chain: number;
  id: number;
  plans: number;
  triggers: number;
  plan_edit: number;
  storage: boolean;
  name: string;
  taxcore: boolean;
  secret_ai: boolean;
};

export const usePlans = () => {
  const [plans, setPlans] = useState<BackendPlan[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_API_URL}/auth/plans`, { headers: { accept: "application/json" } });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to load plans: ${res.status} ${text}`);
      }
      const json = await res.json();
      if (json && Array.isArray(json.data)) {
        setPlans(json.data as BackendPlan[]);
      } else {
        setPlans([]);
      }
    } catch (err: any) {
      setError(err?.message || String(err));
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { plans, loading, error, refresh: fetchPlans };
};
