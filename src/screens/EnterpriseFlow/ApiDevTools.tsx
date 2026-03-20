import {
  Search,
  Bell,
  Settings,
  ChevronRight,
  RotateCw,
  Trash2,
  Eye,
} from "lucide-react";
import { useState } from "react";

const statsData = [
  {
    label: "Requests (24h)",
    value: "2,450,192",
    change: "+8.2%",
    icon: "📊",
    bgColor: "bg-orange-950/40",
  },
  {
    label: "API Latency",
    value: "42 ms",
    change: "-1.2%",
    icon: "⚡",
    bgColor: "bg-orange-950/40",
  },
  {
    label: "Error Rate",
    value: "0.02%",
    status: "Healthy",
    icon: "✓",
    bgColor: "bg-orange-950/40",
  },
  {
    label: "Quota Used",
    value: "75M / 100M",
    change: "75% Used",
    icon: "⏱",
    bgColor: "bg-orange-950/40",
  },
];

const apiKeysData = [
  {
    name: "Production Primary",
    prefix: "pk_live_8847...",
    permissions: "Full Access",
    created: "Oct 12, 2023",
    lastUsed: "2 mins ago",
    status: "Active",
  },
  {
    name: "Staging / Test",
    prefix: "pk_test_1129...",
    permissions: "Read Only",
    created: "Nov 05, 2023",
    lastUsed: "5 hours ago",
    status: "Active",
  },
  {
    name: "Legacy Integration",
    prefix: "pk_live_4432...",
    permissions: "Inheritance Write",
    created: "Jan 10, 2023",
    lastUsed: "12 days ago",
    status: "Deprecating",
  },
];

const webhookEvents = [
  {
    title: "Inheritance Events",
    description: "",
    url: "https://api.acmecorp.com/webhooks/icp",
    status: "LIVE",
    tags: ["plan-created", "asset-locked", "trigger-alert"],
  },
  {
    title: "Audit Logs Sync",
    description: "",
    url: "https://logs.acmecorp.com/ingest",
    status: "FAILED",
    tags: ["audit-log-entry", "auth-failure"],
  },
];

const resourcesData = [
  {
    title: "API Reference",
    description: "Complete API documentation",
    icon: "/<>",
  },
  {
    title: "SDKs & Libraries",
    description: "Node.js, Python, Go",
    icon: "📚",
  },
  {
    title: "Authentication",
    description: "OAuth & API key patterns",
    icon: "🔐",
  },
];

export const ApiDevTools = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-amber-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-900/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <header className="bg-black/60 backdrop-blur border-b border-zinc-800 sticky top-0">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search documentation, API keys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-8">
              <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-zinc-700">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  T
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-white font-medium">
                    Thomas K.
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          <aside className="w-52 bg-black/40 border-r border-zinc-800 p-6 fixed left-0 top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <nav className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-sm"
              >
                <span>📊</span>
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-sm"
              >
                <span>👥</span>
                Client Management
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-sm"
              >
                <span>📋</span>
                Inheritance Plans
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-sm"
              >
                <span>🔐</span>
                Access Control
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-sm"
              >
                <span>📝</span>
                Audit Logs
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-white bg-orange-600/20 border border-orange-600/50 rounded-lg transition-colors text-sm"
              >
                <span>⚙</span>
                API & Developer
              </a>
            </nav>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Systems
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-4 py-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-400">Protocol Active</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-400">Nodes Synced (12/12)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-sm"
              >
                <span>⚙</span>
                Settings
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-sm"
              >
                <span>❓</span>
                Support
              </a>
            </div>
          </aside>

          <main className="flex-1 ml-52 p-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <span>Enterprise</span>
                <ChevronRight className="w-4 h-4" />
                <span>API & Developer</span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    API & Developer Tools
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Manage API keys, configure webhooks, and monitor real-time
                    integration statistics for your enterprise instances.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white hover:bg-zinc-700 transition-colors text-sm font-medium">
                    📚 Documentation
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-lg text-white hover:bg-orange-700 transition-colors text-sm font-medium">
                    + Generate Key
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {statsData.map((stat, idx) => (
                <div
                  key={idx}
                  className={`${stat.bgColor} border border-zinc-700 rounded-lg p-6`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                    {stat.change && (
                      <span
                        className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                      >
                        {stat.change}
                      </span>
                    )}
                    {stat.status && (
                      <span className="text-xs font-medium text-green-400">
                        ✓ {stat.status}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                  <p className="text-white text-lg font-semibold">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>📊</span>
                    API Traffic Overview
                  </h2>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded font-medium">
                      24h
                    </button>
                    <button className="px-3 py-1 text-gray-400 text-xs hover:text-white">
                      7d
                    </button>
                    <button className="px-3 py-1 text-gray-400 text-xs hover:text-white">
                      30d
                    </button>
                  </div>
                </div>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t ${
                        i === 23 ? "bg-orange-500" : "bg-orange-900/60"
                      }`}
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 px-4 text-xs text-gray-500">
                  <span>00:00 AM</span>
                  <span>06:00 PM</span>
                  <span>Now</span>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  📚 Developer Resources
                </h3>
                <div className="space-y-4">
                  {resourcesData.map((resource, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors group"
                    >
                      <span className="text-xl">{resource.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors">
                          {resource.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {resource.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-orange-400 transition-colors mt-1" />
                    </a>
                  ))}
                </div>
                <button className="w-full mt-4 text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
                  Contact Developer Support
                </button>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  🔑 API Keys
                </h2>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                  <RotateCw className="w-4 h-4" />
                  Rotate Keys
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Manage access keys for your applications. Treat these keys like
                passwords.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Key Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Key Prefix
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Permissions
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Created
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Last Used
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeysData.map((key, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors"
                      >
                        <td className="px-4 py-3 text-white font-medium">
                          {key.name}
                        </td>
                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                          {key.prefix}
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {key.permissions}
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {key.created}
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {key.lastUsed}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-medium ${key.status === "Active" ? "text-green-400" : "text-orange-400"}`}
                          >
                            {key.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 flex items-center gap-2">
                          <button className="p-1 hover:bg-zinc-700 rounded transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-zinc-700 rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  🪝 Webhook Configuration
                </h2>
                <button className="flex items-center gap-2 text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
                  ⚙ Add Endpoint
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Receive real-time notifications for protocol events.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {webhookEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white">
                        {event.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${event.status === "LIVE" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <code className="text-xs text-gray-500 bg-black/50 p-2 rounded block mb-3 overflow-auto max-h-12">
                      {event.url}
                    </code>
                    <div className="flex items-center gap-2 flex-wrap">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-zinc-700/50 text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
