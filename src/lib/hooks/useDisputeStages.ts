import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { resolveDispute as apiResolveDispute } from '../api/mediator';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const useDisputeStages = () => {
  const { user } = useAuth();
  const [stages, setStages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.token) return;

    const fetchStages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BACKEND_API_URL}/dis/dispute-stages`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch dispute stages: ${res.status}`);
        }

        const data = await res.json();
        setStages(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err?.message ?? 'Error fetching dispute stages');
        setStages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, [user?.token]);

  return { stages, loading, error };
};

export const useResolveDispute = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveDispute = async (disputeId: number, resolutionNote: string) => {
    if (!user?.token) {
      setError('User not authenticated');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiResolveDispute(user.token, disputeId, resolutionNote);
      return data;
    } catch (err: any) {
      const message = err?.message ?? 'Error resolving dispute';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { resolveDispute, loading, error };
};
