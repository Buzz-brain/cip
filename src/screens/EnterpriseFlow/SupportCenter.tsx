import {
  Search,
  Bell,
  Settings,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const supportContactsData = [
  {
    title: "Dedicated Email",
    value: "enterprise@ciphervault.com",
    detail: "Avg. response time: 1 hour",
    icon: "✉️",
  },
  {
    title: "Priority Phone Line",
    value: "+1 (888) 992-0041",
    detail: "PIN: # 8829 for express routing",
    icon: "☎️",
  },
  {
    title: "Live Chat",
    value: "Chat with an Expert",
    detail: "Wait time: instant",
    icon: "💬",
    status: "24/7 Active",
  },
  {
    title: "System Operational",
    value: "All Systems Normal",
    detail: "Last checked: 1 min ago",
    icon: "🏢",
    link: "View Status Page",
  },
];

const ticketsData = [
  {
    id: "#29481",
    subject: "API Rate Limit Increase Request",
    description: "We are scaling our indexing infrastructure and need",
    category: "Integration",
    lastUpdated: "2 hours ago",
    status: "In Progress",
  },
  {
    id: "#29402",
    subject: "Clarification on multi-sig thresholds",
    description: "Regarding the 3:5 signature requirement for",
    category: "Security",
    lastUpdated: "Yesterday",
    status: "Resolved",
  },
  {
    id: "#28991",
    subject: "Inheritance Plan #882 Trigger Failure",
    description: "The oracle didn't trigger the death event.",
    category: "Smart Contract",
    lastUpdated: "Oct 24, 2023",
    status: "Closed",
  },
  {
    id: "#28810",
    subject: "Adding new organization members",
    description: "Need help batch importing users from CSV.",
    category: "Account",
    lastUpdated: "Oct 20, 2023",
    status: "Closed",
  },
];

const knowledgeBaseArticles = [
  {
    title: "How to setup a Dead Man's Switch?",
    date: "Updated 2 days ago",
    icon: "📘",
  },
  {
    title: "Managing API keys for sub-accounts",
    date: "Updated 1 week ago",
    icon: "📘",
  },
  {
    title: "Compliance auditing guide (PDF)",
    date: "Updated 3 weeks ago",
    icon: "📘",
  },
  {
    title: "Supported chains and assets",
    date: "Updated 1 month ago",
    icon: "📘",
  },
  {
    title: "Recovering access to enterprise vault",
    date: "Updated 2 months ago",
    icon: "📘",
  },
];

const statusIndicator = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-orange-500/20 text-orange-400";
    case "Resolved":
      return "bg-green-500/20 text-green-400";
    case "Closed":
      return "bg-gray-500/20 text-gray-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export const SupportCenter = (): JSX.Element => {
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
                  placeholder="Search help articles or tickets..."
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
                  <span className="text-xs text-gray-400">Admin</span>
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
                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-sm"
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
                className="flex items-center gap-3 px-4 py-2.5 text-white bg-orange-600/20 border border-orange-600/50 rounded-lg transition-colors text-sm"
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
                <span>Support</span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Support Center
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Access dedicated enterprise support, view your tickets, and
                    browse the knowledge base.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white hover:bg-zinc-700 transition-colors text-sm font-medium">
                    📚 Documentation
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-lg text-white hover:bg-orange-700 transition-colors text-sm font-medium">
                    + Submit Ticket
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {supportContactsData.map((contact, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{contact.icon}</span>
                    {contact.status && (
                      <span className="text-xs font-medium text-green-400">
                        ● {contact.status}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mb-1">{contact.title}</p>
                  <p className="text-white font-semibold text-sm mb-1">
                    {contact.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-xs">{contact.detail}</p>
                    {contact.link && (
                      <a
                        href="#"
                        className="text-orange-500 hover:text-orange-400 text-xs font-medium transition-colors"
                      >
                        {contact.link}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="col-span-2">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      🎟️ My Support Tickets
                    </h2>
                    <button className="p-1.5 hover:bg-zinc-800 rounded transition-colors">
                      <span className="text-gray-400">⊙</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                            Ticket ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                            Subject
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                            Category
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                            Last Updated
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ticketsData.map((ticket, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors"
                          >
                            <td className="px-4 py-3 text-white font-mono text-xs">
                              {ticket.id}
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-white text-sm font-medium">
                                {ticket.subject}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {ticket.description}
                              </p>
                            </td>
                            <td className="px-4 py-3 text-gray-400">
                              {ticket.category}
                            </td>
                            <td className="px-4 py-3 text-gray-400">
                              {ticket.lastUpdated}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${statusIndicator(ticket.status)}`}
                              >
                                {ticket.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-gray-400 hover:text-white transition-colors">
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                    >
                      View All Ticket History
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Knowledge Base
                  </h3>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded">
                      Getting Started
                    </span>
                    <span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded">
                      API Docs
                    </span>
                    <span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded">
                      Security
                    </span>
                    <span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded">
                      Billing
                    </span>
                  </div>

                  <div className="space-y-3">
                    {knowledgeBaseArticles.map((article, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors group"
                      >
                        <span className="text-lg mt-0.5">{article.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white group-hover:text-orange-400 transition-colors font-medium break-words">
                            {article.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {article.date}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="flex items-center justify-between mt-4 text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                  >
                    View KB
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
