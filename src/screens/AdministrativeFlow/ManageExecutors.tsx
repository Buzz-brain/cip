import { useEffect, useState } from "react";
import { Copy, X, User, Mail, Wallet, Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";


export interface Executor {
  id: string;
  name: string;
  email: string;
  wallet_address: string;
  status: "Active" | "Inactive";
  access_level: "Read Only" | "Executor" | "Admin";
  can_sign_transactions: boolean;
  created_at: string;
}

export const ManageExecutors = (): JSX.Element => {
  const [executors, setExecutors] = useState<Executor[]>([]);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wallet_address: "",
    access_level: "Executor" as "Read Only" | "Executor" | "Admin",
    can_sign_transactions: true,
  });

  const itemsPerPage = 4;

  useEffect(() => {
    loadExecutors();
  }, []);

  async function loadExecutors() {
    // Local mock data (supabase not used in this project)
    const mock: Executor[] = [
      {
        id: "exec-1",
        name: "Evan Wright",
        email: "evan@cip.io",
        wallet_address: "0x71C...9A23",
        status: "Active",
        access_level: "Executor",
        can_sign_transactions: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "exec-2",
        name: "Jamie Fox",
        email: "jamie@cip.io",
        wallet_address: "0x9fC...3B11",
        status: "Inactive",
        access_level: "Read Only",
        can_sign_transactions: false,
        created_at: new Date().toISOString(),
      },
    ];

    setExecutors(mock);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Add locally (no supabase). Generate a simple id and timestamp.
    const newExecutor: Executor = {
      id: `exec-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      wallet_address: formData.wallet_address,
      status: formData.can_sign_transactions ? "Active" : "Inactive",
      access_level: formData.access_level,
      can_sign_transactions: formData.can_sign_transactions,
      created_at: new Date().toISOString(),
    };

    setExecutors((prev) => [newExecutor, ...prev]);
    setShowAddPanel(false);
    setFormData({
      name: "",
      email: "",
      wallet_address: "",
      access_level: "Executor",
      can_sign_transactions: true,
    });
  }

  const totalPages = Math.ceil(executors.length / itemsPerPage);
  const paginatedExecutors = executors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const activeCount = executors.filter((e) => e.status === "Active").length;
  const pendingCount = executors.filter((e) => e.status === "Inactive").length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "from-orange-400 to-orange-600",
      "from-purple-400 to-purple-600",
      "from-yellow-400 to-yellow-600",
      "from-pink-400 to-pink-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const sidebarMenuItems = [
  { icon: "📊", label: "Dashboard", id: "dashboard" },
  { icon: "➕", label: "Create Plan", id: "create-plan" },
  { icon: "👥", label: "Beneficiaries", id: "beneficiaries" },
  { icon: "🏛️", label: "Asset Registry", id: "asset-registry" },
];

const systemMenuItems = [
  { icon: "⚙️", label: "Settings", id: "settings" },
  { icon: "❓", label: "Support", id: "support" },
];

  return (
    <div className="flex min-h-screen bg-[#0f0c0a]">

      {/* Sidebar */}
      <div className="w-56 bg-[#1a1410] border-r border-[#3a2f1e] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#3a2f1e]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#ff6600] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🛡️</span>
            </div>
            <div>
              <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                CIP Protocol
              </div>
              <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                Secure Multi-Chain Legacy
              </div>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {sidebarMenuItems.map((item) => {
            let href = "#";
            if (item.id === "create-plan") href = "/create-plan";
            if (item.id === "asset-registry") href = "/asset-selection";

            return (
              <Link
                key={item.id}
                to={href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors block ${
                  item.id === "dashboard"
                    ? "bg-[#332619] text-white"
                    : "text-[#b8a494] hover:bg-[#2a1f10] hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* System Menu */}
        <div className="border-t border-[#3a2f1e] p-4 space-y-2">
          {systemMenuItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#8b7664] hover:bg-[#2a1f10] hover:text-white transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-[#3a2f1e] p-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2a1f10]">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xs truncate">
                alex.eth
              </div>
              <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                Online
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex-1">
        <div className="bg-[#0f0c0a] border-b border-[#2a2520] px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 114 0 2 2 0 01-4 0z" />
                </svg>
              </div>
              <h1 className="text-white text-lg font-semibold">
                Admin Console
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search data..."
                  className="bg-[#1a1510] border border-[#2a2520] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 w-64"
                />
              </div>
              <button className="p-2 bg-[#1a1510] border border-[#2a2520] rounded-lg hover:border-orange-600 transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" />
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <span>Admin Role Management</span>
              <span>/</span>
              <span>Manage Executor Details</span>
            </div>

            <div>
              <h2 className="text-white text-2xl font-bold mb-2">
                Manage Executors
              </h2>
              <p className="text-gray-400 text-sm">
                Add, edit, or revoke access for protocol executors. Ensure
                wallet addresses are verified before granting active status.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <User className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-gray-400 text-sm">Active Executors</span>
              </div>
              <div className="text-white text-3xl font-bold">{activeCount}</div>
            </div>

            <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <User className="w-5 h-5 text-yellow-500" />
                </div>
                <span className="text-gray-400 text-sm">Pending Approval</span>
              </div>
              <div className="text-white text-3xl font-bold">
                {pendingCount}
              </div>
            </div>

            <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Wallet className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-gray-400 text-sm">Total Wallets</span>
              </div>
              <div className="text-white text-3xl font-bold">
                {executors.length}
              </div>
            </div>
          </div>

          <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl">
            <div className="p-6 border-b border-[#2a2520] flex items-center justify-between">
              <h3 className="text-white font-semibold">Executor List</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <button className="hover:text-gray-400">Filter All</button>
                <button className="hover:text-gray-400">Export</button>
                <button className="hover:text-gray-400">PDF</button>
              </div>
            </div>

            <table className="w-full">
              <thead className="border-b border-[#2a2520]">
                <tr>
                  <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                    Name
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                    Email Address
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                    Wallet Address
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedExecutors.map((executor) => (
                  <tr
                    key={executor.id}
                    className="border-b border-[#2a2520] hover:bg-[#2a2520]/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(executor.name)} flex items-center justify-center text-white text-sm font-medium`}
                        >
                          {getInitials(executor.name)}
                        </div>
                        <span className="text-white">{executor.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {executor.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm font-mono">
                          {executor.wallet_address}
                        </span>
                        <button className="p-1 hover:bg-[#2a2520] rounded">
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-sm ${
                          executor.status === "Active"
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {executor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-white">
                        ...
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-4 flex items-center justify-between">
              <div className="text-gray-400 text-sm">
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, executors.length)} of{" "}
                {executors.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-[#2a2520] text-gray-400 rounded hover:bg-[#3a3530] disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 bg-[#2a2520] text-gray-400 rounded hover:bg-[#3a3530] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddPanel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
          <div className="w-full max-w-md h-full bg-[#0f0c0a] border-l border-[#2a2520] animate-slide-in-right">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="p-6 border-b border-[#2a2520] flex items-center justify-between">
                <h2 className="text-white text-xl font-semibold">
                  Add New Executor
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAddPanel(false)}
                  className="p-1 hover:bg-[#2a2520] rounded"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="e.g. Evan Wright"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#1a1510] border border-[#2a2520] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Official Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      placeholder="name@cip.io"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#1a1510] border border-[#2a2520] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Wallet Address (Public Key)
                  </label>
                  <textarea
                    placeholder="0x..."
                    value={formData.wallet_address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        wallet_address: e.target.value,
                      })
                    }
                    className="w-full bg-[#1a1510] border border-[#2a2520] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 h-24 resize-none font-mono text-sm"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Ensure the address starts with 0x and matches the network
                    protocol.
                  </p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-3">
                    Access Level
                  </label>
                  <div className="flex gap-2">
                    {(["Read Only", "Executor", "Admin"] as const).map(
                      (level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, access_level: level })
                          }
                          className={`flex-1 px-4 py-2.5 rounded-lg border transition-colors ${
                            formData.access_level === level
                              ? "bg-orange-600 border-orange-600 text-white"
                              : "bg-[#1a1510] border-[#2a2520] text-gray-400 hover:border-orange-600"
                          }`}
                        >
                          {level}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-3">
                    Active Status
                  </label>
                  <div className="flex items-center justify-between p-4 bg-[#1a1510] border border-[#2a2520] rounded-lg">
                    <span className="text-white text-sm">
                      User can sign transactions immediately
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          can_sign_transactions:
                            !formData.can_sign_transactions,
                        })
                      }
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        formData.can_sign_transactions
                          ? "bg-orange-600"
                          : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                          formData.can_sign_transactions
                            ? "translate-x-7"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[#2a2520] flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddPanel(false)}
                  className="flex-1 px-4 py-2.5 bg-[#1a1510] border border-[#2a2520] text-white rounded-lg hover:border-orange-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-lg">+</span>
                  Save Executor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowAddPanel(true)}
        className="fixed bottom-8 right-8 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg flex items-center gap-2"
      >
        <span className="text-lg">+</span>
        Add New Executor
      </button>
    </div>
  );
}
