import React, { useMemo, useState } from 'react';
import useActivityLogs from '../../lib/hooks/useActivityLogs';

export const formatWhen = (ts?: any) => {
  if (!ts) return '—';
  const n = Number(ts);
  try {
    return n > 1e12 ? new Date(n).toLocaleString() : new Date(n * 1000).toLocaleString();
  } catch (e) {
    return String(ts);
  }
};

type Props = {
  userToken?: string | null;
  title?: string;
  subtitle?: string;
  useOrange?: boolean;
};

const ActivityLogs: React.FC<Props> = ({ userToken, title = 'Activity Logs', subtitle, useOrange = false }) => {
  const { logs, loading, error, refresh } = useActivityLogs(userToken ?? undefined);
  const [query, setQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('');

  const filtered = useMemo(() => {
    if (!Array.isArray(logs)) return [];
    return logs.filter((l: any) => {
      const txt = JSON.stringify(l).toLowerCase();
      if (query && !txt.includes(query.toLowerCase())) return false;
      if (planFilter) {
        const pid = String(l.plan_id ?? l.inherit_id ?? l.inheritance_id ?? l.inheritanceId ?? '');
        if (!pid.includes(planFilter)) return false;
      }
      return true;
    });
  }, [logs, query, planFilter]);

  return (
    <div className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-1">{title}</h1>
              <p className="text-gray-400">{subtitle ?? 'All protocol activity for your account. Filter by text or Plan ID.'}</p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <input
                aria-label="Search activity"
                placeholder="Search text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`flex-1 bg-[#0f0b08] border border-[#2f271f] rounded px-4 py-3 text-sm text-[#d1c3b4] focus:outline-none ${useOrange ? 'focus:ring-2 focus:ring-[#F97316]' : 'focus:ring-2 focus:ring-[#2ccd2c]'}`}
              />

              <input
                aria-label="Filter by plan id"
                placeholder="Plan ID"
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className={`w-40 bg-[#0f0b08] border border-[#2f271f] rounded px-3 py-3 text-sm text-[#d1c3b4] focus:outline-none ${useOrange ? 'focus:ring-2 focus:ring-[#F97316]' : 'focus:ring-2 focus:ring-[#2ccd2c]'}`}
              />

              <button onClick={() => refresh()} className={`${useOrange ? 'bg-[#F97316]' : 'bg-[#2ccd2c]'} px-4 py-3 text-black rounded font-medium`}>Refresh</button>
            </div>

            {loading ? (
              <div className="py-20 text-center text-gray-400">Loading activity...</div>
            ) : error ? (
              <div className="py-20 text-center text-gray-400">Error loading activity</div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No activity logs</h3>
                <p className="max-w-lg mx-auto">There are no activity records matching your filters. Try adjusting the search or refresh.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.slice(0, 500).map((it: any, idx: number) => (
                  <article key={idx} className="p-4 bg-[#241C16] rounded-lg border border-[#392f28]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">{it.title ?? it.message ?? it.event ?? it.msg ?? 'Activity'}</div>
                        { (it.body || it.details || it.data) && (
                          <div className="text-gray-400 text-sm mt-1">{it.body ?? it.details ?? JSON.stringify(it.data)}</div>
                        )}
                        <div className="text-xs text-[#b8a494] mt-2">{String(it.user ?? it.actor ?? '')} • <span className="ml-1">Plan: {String(it.plan_id ?? it.inherit_id ?? it.inheritance_id ?? '—')}</span></div>
                      </div>
                      <div className="text-xs text-[#8b7664] whitespace-nowrap">{formatWhen(it.timestamp ?? it.created_at ?? it.time)}</div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivityLogs;
