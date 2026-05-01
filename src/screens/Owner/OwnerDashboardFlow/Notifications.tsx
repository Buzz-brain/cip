import { useState } from "react";

type NotificationItem = {
  id: string;
  title: string;
  body?: string;
  type: "alert" | "info";
  read?: boolean;
  date?: string;
};

export const Notifications = (): JSX.Element => {
  const [tab, setTab] = useState<"all" | "info">("all");

  // No notifications for now — keep structure in place for future data.
  const notifications: NotificationItem[] = [];

  const filtered =
    tab === "all" ? notifications : notifications.filter((n) => n.type === "info");

  return (
    <div className="min-h-screen text-white">
      <div className="flex min-h-screen">
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-gray-400">Manage your protocol alerts and critical actions.</p>
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
                All Alerts
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
                <a
                  href="#"
                  className={`text-orange-500 text-sm hover:text-orange-600 ${filtered.length === 0 ? "opacity-50 pointer-events-none" : ""}`}
                >
                  Mark all as read
                </a>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="max-w-lg mx-auto">You have no notifications at the moment. Any future alerts will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((n) => (
                  <div key={n.id} className="p-4 bg-[#241C16] rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="font-semibold text-white">{n.title}</div>
                        {n.body && <div className="text-gray-400 text-sm mt-1">{n.body}</div>}
                      </div>
                      <div className="text-xs text-gray-400">{n.date}</div>
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
