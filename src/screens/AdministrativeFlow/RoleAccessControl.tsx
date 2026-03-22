import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  CreditCard as Edit2,
  Trash2,
} from "lucide-react";
import { Box } from "lucide-react";

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: "Admin" | "Executor" | "Mediator";
  status: "Active" | "Inactive";
  avatar_url?: string;
  date_added: string;
  created_at: string;
}

export const RoleAccessControl = (): JSX.Element => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | "executors" | "mediators" | "admins"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    // Local mock users (removed supabase)
    const mock: AdminUser[] = [
      {
        id: "admin-1",
        full_name: "Alex Sterling",
        email: "alex@cip.io",
        role: "Admin",
        status: "Active",
        date_added: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        id: "exec-1",
        full_name: "Evan Wright",
        email: "evan@cip.io",
        role: "Executor",
        status: "Active",
        date_added: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ];

    setUsers(mock);
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "executors")
      return matchesSearch && user.role === "Executor";
    if (activeTab === "mediators")
      return matchesSearch && user.role === "Mediator";
    if (activeTab === "admins") return matchesSearch && user.role === "Admin";
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const executorCount = users.filter((u) => u.role === "Executor").length;
  const mediatorCount = users.filter((u) => u.role === "Mediator").length;
  const adminCount = users.filter((u) => u.role === "Admin").length;

  return (
    <div className="min-h-screen bg-[#0f0c0a]">
      <div className="bg-[#0f0c0a] border-b border-[#2a2520] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Box className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl font-semibold">Admin Panel</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
              Logout
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <span>Dashboard</span>
          <span>/</span>
          <span>Role Management</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">
              Role & Access Control
            </h2>
            <p className="text-gray-400">
              Manage user roles, permissions, and access levels for Executors,
              Mediators, and Admins.
            </p>
          </div>
          <button className="px-4 py-2 bg-[#1a1510] border border-[#2a2520] text-white rounded-lg hover:border-orange-600 transition-colors flex items-center gap-2">
            <span className="text-lg">+</span>
            Add New User
          </button>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="bg-[#0f0c0a] border-b border-[#2a2520] mb-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "all"
                  ? "border-orange-600 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setActiveTab("executors")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "executors"
                  ? "border-orange-600 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Executors ({executorCount})
            </button>
            <button
              onClick={() => setActiveTab("mediators")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "mediators"
                  ? "border-orange-600 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Mediators ({mediatorCount})
            </button>
            <button
              onClick={() => setActiveTab("admins")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "admins"
                  ? "border-orange-600 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Admins ({adminCount})
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1a1510] border border-[#2a2520] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 w-80"
              />
            </div>
            <button className="p-2 bg-[#1a1510] border border-[#2a2520] rounded-lg hover:border-orange-600 transition-colors">
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-[#2a2520]">
              <tr>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  User
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Role
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Status
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Date Added
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#2a2520] hover:bg-[#2a2520]/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-medium">
                        {user.full_name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {user.full_name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                        user.role === "Admin"
                          ? "bg-purple-500/10 text-purple-400"
                          : user.role === "Executor"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-sm ${
                        user.status === "Active"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(user.date_added).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-[#2a2520] rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1.5 hover:bg-[#2a2520] rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 border-t border-[#2a2520] flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-[#2a2520] text-gray-400 rounded hover:bg-[#3a3530] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded ${
                      currentPage === page
                        ? "bg-orange-600 text-white"
                        : "bg-[#2a2520] text-gray-400 hover:bg-[#3a3530]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-[#2a2520] text-gray-400 rounded hover:bg-[#3a3530] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
