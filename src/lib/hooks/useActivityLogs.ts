import { useCallback, useEffect, useState } from 'react';
import { getActivityLogs } from '../api/auth';

export default function useActivityLogs(token?: string) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActivityLogs(token);
      setLogs(data ?? []);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch activity logs');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, error, refresh: fetchLogs };
}
