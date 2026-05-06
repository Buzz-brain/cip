import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  CreditCard as Edit2,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/useAuth";
import { viewAdmins, viewExecutors, viewMediators, viewUsers, viewUser, viewExecutor, viewMediator, approveAdmin, disapproveAdmin, promoteAdmin, approveMediator, disapproveMediator } from "../../lib/api/admin";
import AdminDetailModal from "../../components/ui/AdminDetailModal";
import AdminCreateModal from "../../components/ui/AdminCreateModal";
import ConfirmModal from "../../components/ui/ConfirmModal";

function normalizeResponse(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];

  const payload = data.data || data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.exec)) return payload.exec;
  if (Array.isArray(payload.execs)) return payload.execs;
  if (Array.isArray(payload.users)) return payload.users;
  if (Array.isArray(payload.mediators)) return payload.mediators;
  if (Array.isArray(payload.admins)) return payload.admins;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
}

export const RoleAccessControl = (): JSX.Element => {
  const { user } = useAuth();
  const token = user?.token;
  const [users, setUsers] = useState<any[]>([]);
  const [executors, setExecutors] = useState<any[]>([]);
  const [mediators, setMediators] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"all-accounts" | "users" | "executors" | "mediators" | "admins">("all-accounts");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailTitle, setDetailTitle] = useState<string>('Details');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [confirmItemId, setConfirmItemId] = useState<number | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const itemsPerPage = 8;

  async function loadRoleData() {
    setLoading(true);
    try {
      const [usersResponse, executorResponse, mediatorResponse, adminResponse] = await Promise.all([
        viewUsers(token).catch(() => []),
        viewExecutors(token).catch(() => []),
        viewMediators(token).catch(() => []),
        viewAdmins(token).catch(() => []),
      ]);

      setUsers(normalizeResponse(usersResponse));
      setExecutors(normalizeResponse(executorResponse));
      setMediators(normalizeResponse(mediatorResponse));
      setAdmins(normalizeResponse(adminResponse));
    } catch (error) {
      console.error("Failed to load role access data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRoleData();
  }, [token]);

  async function runAction(action: string, id: number) {
    try {
      setConfirmLoading(true);
      if (action === 'approve-admin') await approveAdmin(id, token);
      if (action === 'disapprove-admin') await disapproveAdmin(id, token);
      if (action === 'promote-admin') await promoteAdmin(id, token);
      if (action === 'approve-mediator') await approveMediator(id, token);
      if (action === 'disapprove-mediator') await disapproveMediator(id, token);
      // refresh
      await loadRoleData();
      setConfirmOpen(false);
    } catch (err:any) {
      console.error('Action failed', err);
      alert(err?.message || 'Action failed');
    } finally {
      setConfirmLoading(false);
    }
  }

  function openConfirm(action: string, id: number) {
    setConfirmAction(action);
    setConfirmItemId(id);
    setConfirmOpen(true);
  }

  async function handleConfirm() {
    if (!confirmAction || confirmItemId == null) return;
    await runAction(confirmAction, confirmItemId);
  }

  const activeList = useMemo(() => {
    switch (activeTab) {
      case "users":
        return users;
      case "executors":
        return executors;
      case "mediators":
        return mediators;
      case "admins":
        return admins;
      case "all-accounts":
      default:
        return [...users, ...executors, ...mediators, ...admins];
    }
  }, [activeTab, users, executors, mediators, admins]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return activeList;

    return activeList.filter((user) => {
      const values = [
        user.full_name,
        user.email,
        user.id,
        user.role,
        user.wallet,
        user.plan_id,
      ]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase());

      return values.some((value) => value.includes(query));
    });
  }, [activeList, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const userCount = users.length;
  const executorCount = executors.length;
  const mediatorCount = mediators.length;
  const adminCount = admins.length;
  const allAccountsCount = userCount + executorCount + mediatorCount + adminCount;

  return (
    <AdminLayout title="Role & Access Control" subtitle="Manage user roles, permissions and access across all accounts.">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">Role & Access Control</h2>
            <p className="text-gray-400 max-w-2xl">
              Manage all accounts for users, executors, mediators, and admins from a single page.
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            <span className="text-lg">+</span>
            Add New Admin
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-5">
          <div className="rounded-2xl border border-[#2a2520] bg-[#1a1510] p-4">
            <div className="text-sm text-gray-400">All Accounts</div>
            <div className="mt-2 text-white text-3xl font-semibold">{allAccountsCount}</div>
          </div>
          <div className="rounded-2xl border border-[#2a2520] bg-[#1a1510] p-4">
            <div className="text-sm text-gray-400">Users</div>
            <div className="mt-2 text-white text-3xl font-semibold">{userCount}</div>
          </div>
          <div className="rounded-2xl border border-[#2a2520] bg-[#1a1510] p-4">
            <div className="text-sm text-gray-400">Executors</div>
            <div className="mt-2 text-white text-3xl font-semibold">{executorCount}</div>
          </div>
          <div className="rounded-2xl border border-[#2a2520] bg-[#1a1510] p-4">
            <div className="text-sm text-gray-400">Mediators</div>
            <div className="mt-2 text-white text-3xl font-semibold">{mediatorCount}</div>
          </div>
          <div className="rounded-2xl border border-[#2a2520] bg-[#1a1510] p-4">
            <div className="text-sm text-gray-400">Admins</div>
            <div className="mt-2 text-white text-3xl font-semibold">{adminCount}</div>
          </div>
        </div>

        <div className="bg-[#0f0c0a] border-b border-[#2a2520] px-4 py-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab("all-accounts");
                setCurrentPage(1);
              }}
              className={`rounded-t-lg px-3 py-2 text-sm transition-colors ${
                activeTab === "all-accounts"
                  ? "border-b-2 border-orange-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Accounts ({allAccountsCount})
            </button>
            <button
              onClick={() => {
                setActiveTab("users");
                setCurrentPage(1);
              }}
              className={`rounded-t-lg px-3 py-2 text-sm transition-colors ${
                activeTab === "users"
                  ? "border-b-2 border-orange-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Users ({userCount})
            </button>
            <button
              onClick={() => {
                setActiveTab("executors");
                setCurrentPage(1);
              }}
              className={`rounded-t-lg px-3 py-2 text-sm transition-colors ${
                activeTab === "executors"
                  ? "border-b-2 border-orange-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Executors ({executorCount})
            </button>
            <button
              onClick={() => {
                setActiveTab("mediators");
                setCurrentPage(1);
              }}
              className={`rounded-t-lg px-3 py-2 text-sm transition-colors ${
                activeTab === "mediators"
                  ? "border-b-2 border-orange-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Mediators ({mediatorCount})
            </button>
            <button
              onClick={() => {
                setActiveTab("admins");
                setCurrentPage(1);
              }}
              className={`rounded-t-lg px-3 py-2 text-sm transition-colors ${
                activeTab === "admins"
                  ? "border-b-2 border-orange-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Admins ({adminCount})
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search users, emails, wallets..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-[#2a2520] bg-[#1a1510] py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-[#2a2520] bg-[#1a1510] px-4 py-2 text-sm text-gray-300 hover:border-orange-600 hover:text-white">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#2a2520] bg-[#1a1510] text-sm">
          <table className="w-full border-collapse">
            <thead className="border-b border-[#2a2520] bg-[#13100d] text-left text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Loading role data...
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No records found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id || user.email || user.full_name} className="border-b border-[#2a2520] hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-semibold text-white">
                          {(user.full_name || user.email || user.id || "U").toString().charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.full_name || user.email || user.id}</div>
                          <div className="text-gray-400 text-xs">
                            {user.email || user.wallet || String(user.id)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <span className="inline-flex rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-gray-300">
                        {user.role ||
                          (activeTab === "executors"
                            ? "Executor"
                            : activeTab === "mediators"
                              ? "Mediator"
                              : activeTab === "admins"
                                ? "Admin"
                                : "User")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <span className={`inline-flex items-center gap-2 text-sm ${user.status === "Active" || user.status === "Approved" ? "text-green-400" : "text-gray-400"}`}>
                        <span className={`h-2.5 w-2.5 rounded-full ${user.status === "Active" || user.status === "Approved" ? "bg-emerald-500" : "bg-gray-500"}`} />
                        {user.status || (user.has_approved ? "Approved" : "Pending") || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(user.date_added || user.created_at || user.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={async () => {
                              setDetailLoading(true);
                              setDetailData(null);
                              setDetailTitle(user.full_name || user.email || `${user.id ? `#${user.id}` : 'Details'}`);
                              setDetailOpen(true);
                              try {
                                // determine which view endpoint to call
                                const isExecutor = user.role === 'executor' || user.plan_id;
                                const isMediator = user.role === 'mediator';
                                const details = user.id
                                  ? isExecutor
                                    ? await viewExecutor(user.id, token)
                                    : isMediator
                                    ? await viewMediator(user.id, token)
                                    : await viewUser(user.id, token)
                                  : null;
                                setDetailData(details || user);
                              } catch (e) {
                                console.error('Failed to load details', e);
                                setDetailData(user);
                              } finally {
                                setDetailLoading(false);
                              }
                            }}
                            className="rounded-lg px-3 py-1 text-sm bg-[#27231c] text-gray-300 hover:text-white"
                          >
                            View
                          </button>

                          {/* mediator actions */}
                          {((user.role === 'mediator') || activeTab === 'mediators') && (
                            <>
                              {user.approved === false && (
                                <button onClick={() => user.id && openConfirm('approve-mediator', Number(user.id))} className="rounded-lg px-3 py-1 text-sm bg-green-600 text-white">Approve</button>
                              )}
                              {user.approved === true && (
                                <button onClick={() => user.id && openConfirm('disapprove-mediator', Number(user.id))} className="rounded-lg px-3 py-1 text-sm bg-red-600 text-white">Disapprove</button>
                              )}
                            </>
                          )}
                          {/* admin actions */}
                          {((user.role === 'admin') || activeTab === 'admins') && (
                            <>
                              {user.status === false && (
                                <button onClick={() => user.id && openConfirm('approve-admin', Number(user.id))} className="rounded-lg px-3 py-1 text-sm bg-green-600 text-white">Approve</button>
                              )}
                              {user.status === true && (
                                <button onClick={() => user.id && openConfirm('disapprove-admin', Number(user.id))} className="rounded-lg px-3 py-1 text-sm bg-red-600 text-white">Disapprove</button>
                              )}
                              <button onClick={() => user.id && openConfirm('promote-admin', Number(user.id))} className="rounded-lg px-3 py-1 text-sm bg-orange-600 text-white">Promote</button>
                            </>
                          )}

                          <button className="rounded-lg p-2 text-gray-400 transition hover:bg-[#2a2520] hover:text-white">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-gray-400 transition hover:bg-[#2a2520] hover:text-white">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2a2520] px-6 py-4">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg bg-[#161313] px-3 py-1.5 text-sm text-gray-400 transition hover:bg-[#2a2520] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg px-3 py-1.5 text-sm ${currentPage === page ? "bg-orange-600 text-white" : "bg-[#161313] text-gray-400 hover:bg-[#2a2520]"}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg bg-[#161313] px-3 py-1.5 text-sm text-gray-400 transition hover:bg-[#2a2520] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
          </div>
          <AdminDetailModal open={detailOpen} loading={detailLoading} data={detailData} title={detailTitle} onClose={() => { setDetailOpen(false); setDetailData(null); }} />
          <ConfirmModal open={confirmOpen} loading={confirmLoading} title="Confirm action" description={`Are you sure you want to ${confirmAction?.replace(/-/g,' ')} this item?`} confirmLabel="Yes, do it" cancelLabel="Cancel" onConfirm={handleConfirm} onCancel={()=>setConfirmOpen(false)} />
            <AdminCreateModal open={createOpen} onClose={()=>setCreateOpen(false)} token={token} onCreated={async ()=>{ await loadRoleData(); }} />
      </div>
    </AdminLayout>
  );
};
