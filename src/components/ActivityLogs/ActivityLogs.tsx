import React, { useMemo, useState } from 'react';
import useActivityLogs from '../../lib/hooks/useActivityLogs';
import { SkeletonCard } from '@components/ui/skeleton-card';

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
  const [dateFilter, setDateFilter] = useState('');

  const filtered = useMemo(() => {
    if (!Array.isArray(logs)) return [];
    return logs.filter((l: any) => {
      const txt = JSON.stringify(l).toLowerCase();
      if (query && !txt.includes(query.toLowerCase())) return false;
      if (dateFilter) {
        const when = formatWhen(l.timestamp ?? l.created_at ?? l.time).toLowerCase();
        if (!when.includes(dateFilter.toLowerCase())) return false;
      }
      return true;
    });
  }, [logs, query, dateFilter]);

  return (
    <div className="min-h-full text-white">
      <div className="flex">
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">{title}</h1>
              <p className="text-gray-400">{subtitle ?? 'All protocol activity for your account. Filter by text or Date/Time.'}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <input
                aria-label="Search activity"
                placeholder="Search text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`flex-1 bg-[#0f0b08] border border-[#2f271f] rounded px-4 py-3 text-sm text-[#d1c3b4] focus:outline-none ${useOrange ? 'focus:ring-2 focus:ring-[#F97316]' : 'focus:ring-2 focus:ring-[#2ccd2c]'}`}
              />

              <input
                aria-label="Filter by date/time"
                placeholder="Date / Time"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={`w-full sm:w-40 bg-[#0f0b08] border border-[#2f271f] rounded px-3 py-3 text-sm text-[#d1c3b4] focus:outline-none ${useOrange ? 'focus:ring-2 focus:ring-[#F97316]' : 'focus:ring-2 focus:ring-[#2ccd2c]'}`}
              />

              <button onClick={() => refresh()} className={`${useOrange ? 'bg-[#F97316]' : 'bg-[#2ccd2c]'} w-full sm:w-auto px-4 py-3 text-white rounded font-medium`}>Refresh</button>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1,2,3,4].map((i) => (
                  <SkeletonCard key={`act-skel-${i}`} />
                ))}
              </div>
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">{String(it.message ?? it.title ?? it.event ?? it.msg ?? 'Activity')}</div>
                        { (it.body || it.details || it.data) && (
                          <div className="text-gray-400 text-sm mt-1">{it.body ?? it.details ?? JSON.stringify(it.data)}</div>
                        )}
                        {/* Show only message and date — remove Plan display */}
                        <div className="text-xs text-[#8b7664] mt-2">{formatWhen(it.timestamp ?? it.created_at ?? it.time)}</div>
                      </div>
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
