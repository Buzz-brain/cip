import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export interface Dispute {
  id: number;
  plan_id: number;
  raised_by: string;
  reason: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export const useViewAllDisputes = () => {
  const { user } = useAuth();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDisputes = async () => {
    if (!user?.token) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_API_URL}/dis/view-all-disputes`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch disputes: ${res.status}`);
      }

      const data = await res.json();

      // Normalise a few possible backend envelopes:
      // 1) { status: '00', disputes: { dispute: {...} | [...] , inheritance: [...] } }
      // 2) { data: { disputes: [...] } }
      // 3) direct array response: [ ... ]
      let items: any[] = [];
      let inheritanceItems: any[] = [];

      if (Array.isArray(data)) {
        items = data;
      } else if (data?.disputes) {
        const d = data.disputes;
        // backend may return { dispute: {...} } or { dispute: [...] }
        if (Array.isArray(d?.dispute)) items = d.dispute;
        else if (d?.dispute) items = [d.dispute];
        else if (Array.isArray(d)) items = d;

        // backend may include an `inheritance` (plans) array alongside disputes
        if (Array.isArray(d?.inheritance)) inheritanceItems = d.inheritance;
        else if (d?.inheritance) inheritanceItems = [d.inheritance];
      } else if (data?.data?.disputes) {
        items = Array.isArray(data.data.disputes) ? data.data.disputes : [];
        if (Array.isArray(data.data.inheritance)) inheritanceItems = data.data.inheritance;
      } else if (Array.isArray(data?.data)) {
        items = data.data;
      }

      // Build a map of plan id -> plan object if inheritance info present
      const plansMap: Record<number, any> = {};
      for (const plan of inheritanceItems) {
        const pid = Number(plan.id ?? plan.plan_id ?? plan.contract_plan_id ?? 0);
        if (pid) plansMap[pid] = plan;
      }

      // Normalize each dispute to expected shape for UI list, attach plan when available
      const normalized = items.map((x: any) => {
        const pid = Number(x.plan_id ?? x.contract_plan_id ?? x.plan_id ?? 0);
        return {
          id: Number(x.id ?? x.dispute_id ?? 0),
          plan_id: pid,
          plan: plansMap[pid] ?? null,
          raised_by: x.raised_by ?? x.raised_by_id ?? null,
          reason: x.reason ?? x.reason_code ?? 'UNKNOWN',
          status: x.resolved === true ? 'resolved' : (x.stage ? x.stage.toLowerCase() : (x.status ?? 'pending')),
          created_at: x.created_at ? (typeof x.created_at === 'number' ? new Date(x.created_at * 1000).toISOString() : x.created_at) : (x.created_at ?? null),
          raw: x,
        };
      });

      setDisputes(normalized);
      // attach plans map to state by returning it from the hook
      // (we'll return it from the hook's return value)
      (setAnyPlans as any)(plansMap);
    } catch (err: any) {
      setError(err?.message ?? 'Error fetching disputes');
      setDisputes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, [user?.token]);

  // expose optional plansMap via closure variable
  const [anyPlans, setAnyPlans] = useState<Record<number, any> | null>(null);

  // Small hack: re-run fetch to populate anyPlans
  useEffect(() => {
    // no-op; anyPlans is set during fetchDisputes via setAnyPlans
  }, [anyPlans]);

  // Return disputes and plans map
  return { disputes, plansMap: anyPlans, loading, error, refetch: fetchDisputes };
};

export const useViewDispute = (disputeId: number | null) => {
  const { user } = useAuth();
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.token || !disputeId) return;

    const fetchDispute = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BACKEND_API_URL}/dis/view-a-dispute/${disputeId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch dispute: ${res.status}`);
        }

        const data = await res.json();

        // Normalize different backend envelopes to a single dispute object
        let raw: any = data;

        // Common envelope: { status: '00', disputes: { dispute: {...} } }
        if (data?.disputes) {
          const d = data.disputes;
          if (Array.isArray(d?.dispute)) raw = d.dispute[0];
          else if (d?.dispute) raw = d.dispute;
          else raw = d;
        } else if (data?.data?.disputes) {
          raw = Array.isArray(data.data.disputes) ? data.data.disputes[0] : data.data.disputes;
        } else if (Array.isArray(data)) {
          raw = data[0];
        }

        // attempt to extract inheritance/plan info from response envelopes
        let inheritanceArr: any[] = [];
        if (data?.disputes) {
          const d = data.disputes;
          if (Array.isArray(d?.inheritance)) inheritanceArr = d.inheritance;
          else if (d?.inheritance) inheritanceArr = [d.inheritance];
        } else if (Array.isArray(data?.inheritance)) {
          inheritanceArr = data.inheritance;
        } else if (data?.data?.inheritance) {
          inheritanceArr = Array.isArray(data.data.inheritance) ? data.data.inheritance : [data.data.inheritance];
        }

        const normalized = {
          id: Number(raw?.id ?? raw?.dispute_id ?? 0),
          plan_id: Number(raw?.plan_id ?? raw?.contract_plan_id ?? 0),
          raised_by: raw?.raised_by ?? raw?.raised_by_id ?? null,
          reason: raw?.reason ?? raw?.reason_code ?? 'UNKNOWN',
          description: raw?.description ?? raw?.desc ?? '',
          status: raw?.resolved === true ? 'resolved' : (raw?.stage ? String(raw.stage).toLowerCase() : (raw?.status ?? 'pending')),
          created_at: raw?.created_at ? (typeof raw.created_at === 'number' ? new Date(raw.created_at * 1000).toISOString() : raw.created_at) : null,
          updated_at: raw?.updated_at ? (typeof raw.updated_at === 'number' ? new Date(raw.updated_at * 1000).toISOString() : raw.updated_at) : null,
          file: raw?.file ?? raw?.file_url ?? null,
          raw,
        };

        // attach plan object if returned alongside dispute
        if (inheritanceArr && inheritanceArr.length > 0) {
          const found = inheritanceArr.find((pl: any) => Number(pl.id ?? pl.plan_id ?? pl.contract_plan_id) === normalized.plan_id);
          if (found) (normalized as any).plan = found;
        }

        setDispute(normalized as any);
      } catch (err: any) {
        setError(err?.message ?? 'Error fetching dispute');
        setDispute(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDispute();
  }, [user?.token, disputeId]);

  return { dispute, loading, error };
};
