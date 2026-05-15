import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/useAuth';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export function useSubscription() {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    // If user object already contains subscription info, use it
    try {
      setError(null);
      setLoading(true);
      // Check common userInfo fields first
      const ui = (user as any)?.userInfo;
      if (ui) {
        if (typeof ui.full_reg === 'boolean' && typeof ui.is_subscribed !== 'boolean') {
          // nothing
        }
        if (typeof ui.is_subscribed === 'boolean') {
          setIsSubscribed(Boolean(ui.is_subscribed));
          return;
        }
        if (typeof ui.subscribed === 'boolean') {
          setIsSubscribed(Boolean(ui.subscribed));
          return;
        }
      }

      // Fallback: try dashboard endpoint which includes all_subscriptions
      if (!user?.token) {
        setIsSubscribed(false);
        return;
      }

      try {
        const dashRes = await fetch(`${BACKEND_API_URL}/inherit/dashboard`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (dashRes.ok) {
          const dashJson = await dashRes.json().catch(() => null);
          if (dashJson && Array.isArray(dashJson.all_subscriptions)) {
            const hasActive = dashJson.all_subscriptions.some((s: any) => s && (s.is_active === true || s.active === true));
            setIsSubscribed(Boolean(hasActive));
            return;
          }
        }
      } catch (e) {
        // ignore and fall back to subscription-status endpoint
      }

      // Final fallback: call /auth/subscription-status
      const res = await fetch(`${BACKEND_API_URL}/auth/subscription-status`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        setIsSubscribed(false);
        return;
      }

      const json = await res.json().catch(() => null);
      if (!json) {
        setIsSubscribed(false);
        return;
      }

      const subscribed = json.subscribed ?? json.active ?? json.is_subscribed ?? false;
      setIsSubscribed(Boolean(subscribed));
    } catch (err: any) {
      setError(err?.message ?? String(err));
      setIsSubscribed(false);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // run on mount and whenever user changes
    refresh();
  }, [refresh]);

  return { isSubscribed, loading, error, refresh };
}
