import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const useDisputeReasons = () => {
  const { user } = useAuth();
  const [reasons, setReasons] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.token) return;

    const fetchReasons = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BACKEND_API_URL}/dis/reason-for-disputes`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch dispute reasons: ${res.status}`);
        }

        const data = await res.json();
        setReasons(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err?.message ?? 'Error fetching dispute reasons');
        setReasons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReasons();
  }, [user?.token]);

  return { reasons, loading, error };
};
