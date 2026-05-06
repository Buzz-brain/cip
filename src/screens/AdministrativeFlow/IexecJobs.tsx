import { useEffect, useMemo, useState } from "react";
import { Search, Download, Clipboard, Eye } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/useAuth";
import { viewIexecJobs } from "../../lib/api/admin";
import IexecJobModal from "../../components/ui/IexecJobModal";

export default function IexecJobs(): JSX.Element {
  const { user } = useAuth();
  const token = user && (user as any).token;
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filterProcessed, setFilterProcessed] = useState<"all" | "processed" | "pending">("all");
  const [selected, setSelected] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await viewIexecJobs(token).catch(() => []);
        const data = (res && (res as any).data) || res;
        setJobs(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load iexec jobs", e);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const stats = useMemo(() => {
    const total = jobs.length;
    const processed = jobs.filter(j => j.processed === true).length;
    const pending = total - processed;
    return { total, processed, pending };
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j:any) => {
      if (filterProcessed === "processed" && !j.processed) return false;
      if (filterProcessed === "pending" && j.processed) return false;
      if (!q) return true;
      return (
        String(j.task_id).toLowerCase().includes(q) ||
        String(j.plan_name || j.plan_id).toLowerCase().includes(q) ||
        String(((j.result && j.result.hash) || "")).toLowerCase().includes(q)
      );
    });
  }, [jobs, query, filterProcessed]);

  function openDetails(job:any) {
    setSelected(job);
    setModalOpen(true);
  }

  async function copyHash(hash?: string) {
    if (!hash) return;
    try { await navigator.clipboard.writeText(hash); } catch (e) { /* ignore */ }
  }

  return (
    <AdminLayout title="iExec Jobs" subtitle="Task logs, ProtectedData & EESR hashes from iExec.">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-[#2a2520] bg-[#13100d] p-4">
            <div className="text-sm text-gray-400">Total Jobs</div>
            <div className="text-white text-2xl font-semibold">{stats.total}</div>
          </div>
          <div className="rounded-lg border border-[#2a2520] bg-[#13100d] p-4">
            <div className="text-sm text-gray-400">Processed</div>
            <div className="text-white text-2xl font-semibold">{stats.processed}</div>
          </div>
          <div className="rounded-lg border border-[#2a2520] bg-[#13100d] p-4">
            <div className="text-sm text-gray-400">Pending</div>
            <div className="text-white text-2xl font-semibold">{stats.pending}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search task id, plan, hash..." className="w-full rounded-lg border border-[#2a2520] bg-[#0f0c0a] py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-600" />
          </div>
          <div className="flex items-center gap-2">
            <select value={filterProcessed} onChange={e=>setFilterProcessed(e.target.value as any)} className="rounded-lg bg-[#0f0c0a] border border-[#2a2520] text-sm text-white px-3 py-2">
              <option value="all">All</option>
              <option value="processed">Processed</option>
              <option value="pending">Pending</option>
            </select>
            <button className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700"><Download className="h-4 w-4" /> Export</button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#2a2520] bg-[#1a1510] text-sm">
          <table className="w-full border-collapse">
            <thead className="border-b border-[#2a2520] bg-[#13100d] text-left text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-6 py-4">Task</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Trigger</th>
                <th className="px-6 py-4">Result</th>
                <th className="px-6 py-4">Processed</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">No jobs found.</td></tr>
              ) : filtered.map((job:any) => (
                <tr key={job.id} className="border-b border-[#2a2520] hover:bg-white/3">
                  <td className="px-6 py-4 text-white max-w-xs">{String(job.task_id).slice(0, 18)}<div className="text-gray-400 text-xs mt-1">{job.task_id}</div></td>
                  <td className="px-6 py-4 text-white">{job.plan_name || job.plan_id}</td>
                  <td className="px-6 py-4 text-gray-300">{job.trigger_type}</td>
                  <td className="px-6 py-4 text-gray-300 max-w-sm">
                    <div className="flex items-center gap-3">
                      <div className="truncate">{(job.result && job.result.hash) || '-'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {job.processed ? <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-xs">Processed</span> : <span className="px-2 py-0.5 rounded bg-yellow-600 text-black text-xs">Pending</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{job.created_at ? new Date(Number(job.created_at) * 1000).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={()=>openDetails(job)} className="rounded-lg px-3 py-1 bg-[#27231c] text-gray-300 hover:text-white flex items-center gap-2"><Eye className="w-4 h-4" /> View</button>
                      <button onClick={()=>copyHash((job.result && job.result.hash) || undefined)} className="rounded-lg px-3 py-1 bg-[#161313] text-gray-300 hover:text-white flex items-center gap-2"><Clipboard className="w-4 h-4"/> Copy</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-6 py-3 border-t border-[#2a2520] text-gray-400 text-sm">
            <div>Showing {filtered.length} of {jobs.length} jobs</div>
            <div />
          </div>
        </div>

        <IexecJobModal open={modalOpen} data={selected} onClose={()=>setModalOpen(false)} />
      </div>
    </AdminLayout>
  );
}
