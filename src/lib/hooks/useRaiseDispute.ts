import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { raiseDispute as apiRaiseDispute } from '../api/dispute';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

interface RaiseDisputeParams {
  planId: number;
  reason: string;
  description: string;
  file?: File;
}

export const useRaiseDispute = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const raiseDispute = async (params: RaiseDisputeParams) => {
    if (!user?.token) {
      setError('User not authenticated');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiRaiseDispute(user.token, params as any);
      return data;
    } catch (err: any) {
      const message = err?.message ?? 'Error raising dispute';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { raiseDispute, loading, error };
};
