import { useState } from "react";
import { useAuth } from "../../../context/useAuth";
import useActivityLogs from "../../../lib/hooks/useActivityLogs";
import ActivityListSkeleton from "../../../components/ActivityLogs/ActivityListSkeleton";
import { formatWhen } from "../../../components/ActivityLogs/ActivityLogs";

export const Notifications = (): JSX.Element => {
  const { user } = useAuth();
  const { logs, loading, error, refresh } = useActivityLogs(user?.token ?? undefined);
  const [tab, setTab] = useState<"all" | "info">("all");

  const isInfo = (txt?: string) => {
    if (!txt) return false;
    const s = txt.toLowerCase();
    return s.includes("info") || s.includes("notice") || s.includes("inform") || s.includes("summary");
  };

  const items = Array.isArray(logs) ? logs.slice().reverse() : [];
  const filtered = items.filter((it: any) => {
    if (tab === "all") return true;
    const msg = String(it.message ?? it.title ?? it.event ?? it.msg ?? "");
    return isInfo(msg);
  });

  return (
    <div className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-gray-400">This view shows backend activity entries (acts as notifications + activity feed).</p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setTab("all")}
                className={`text-sm pb-2 ${
                  tab === "all"
                    ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                    : "text-gray-400 hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setTab("info")}
                className={`text-sm pb-2 ${
                  tab === "info"
                    ? "text-orange-500 border-b-2 border-orange-500 pb-2"
                    : "text-gray-400 hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
                }`}
              >
                Informational
              </button>

              <div className="ml-auto">
                <button
                  onClick={() => refresh()}
                  className="text-sm text-[#b9ac9d] hover:text-white"
                >
                  Refresh
                </button>
              </div>
            </div>

            {loading ? (
              <ActivityListSkeleton count={4} />
            ) : error ? (
              <div className="py-20 text-center text-gray-400">Error loading activity</div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="max-w-lg mx-auto">There are no notifications matching your filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.slice(0, 200).map((it: any, idx: number) => (
                  <div key={it.id ?? idx} className="p-4 bg-[#241C16] rounded-lg border border-[#392f28]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">
                          {String(it.message ?? it.title ?? it.event ?? it.msg ?? 'Activity')}
                        </div>
                        {(it.body || it.details || it.data) && (
                          <div className="text-gray-400 text-sm mt-1">
                            {it.body ?? it.details ?? (typeof it.data === 'string' ? it.data : JSON.stringify(it.data))}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">{formatWhen(it.timestamp ?? it.created_at ?? it.time)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
