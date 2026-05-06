import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/useAuth";
import { disapproveAdmin, approveAdmin, promoteAdmin, disapproveMediator, viewUser, viewExecutor } from "../../lib/api/admin";
import ConfirmModal from "../../components/ui/ConfirmModal";

export default function AdminListPage({ title, fetcher }: { title: string; fetcher: (token?: string) => Promise<any[]> }) {
  const { user } = useAuth();
  const token = user?.token;
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [confirmItemId, setConfirmItemId] = useState<number | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetcher(token);
        setItems(Array.isArray(res) ? res : []);
      } catch (err) {
        setItems([]);
      } finally { setLoading(false); }
    })();
  }, [fetcher, token]);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(it => JSON.stringify(it).toLowerCase().includes(q));
  }, [items, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page-1)*pageSize, page*pageSize);

  async function runAction(action: string, id: number) {
    try {
      setConfirmLoading(true);
      if (action === 'approve-admin') await approveAdmin(id, token);
      if (action === 'disapprove-admin') await disapproveAdmin(id, token);
      if (action === 'promote-admin') await promoteAdmin(id, token);
      if (action === 'disapprove-mediator') await disapproveMediator(id, token);
      // refresh list
      const res = await fetcher(token);
      setItems(Array.isArray(res) ? res : []);
      setConfirmOpen(false);
    } catch (err:any) {
      console.error('Action failed', err);
      alert(err?.message || 'Action failed');
    } finally { setConfirmLoading(false); }
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

  return (
    <AdminLayout title={title}>
      <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
          <div className="flex items-center gap-3">
            <input value={query} onChange={e=>{setQuery(e.target.value); setPage(1);}} placeholder="Search..." className="px-3 py-2 bg-[#0f0c0a] border border-[#2a2520] text-white rounded" />
          </div>
        </div>

        {loading ? <div className="text-gray-400">Loading...</div> : (
          <>
            <div className="space-y-3">
              {current.length === 0 ? <div className="text-gray-400">No records</div> : current.map((it:any, idx:number)=> (
                <div key={idx} className="p-3 bg-[#0f0c0a] rounded border border-[#2a2520] text-sm text-white flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{it.full_name || it.user_name || it.email || it.name || `#${it.id || idx}`}</div>
                    <div className="text-gray-400 text-xs mt-1">{it.email || it.contact || JSON.stringify(it).slice(0,120)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Actions: view, approve/disapprove, promote, disable depending on type */}
                    <button onClick={async ()=>{ const details = await (it.id ? viewUser(it.id, token).catch(()=>null) : null); alert(JSON.stringify(details||it, null, 2)); }} className="px-3 py-1 bg-[#27231c] rounded text-sm">View</button>
                    {it.role === 'admin' || title.toLowerCase().includes('admins') ? (
                      <>
                        <button onClick={()=>openConfirm('approve-admin', it.id)} className="px-3 py-1 bg-green-600 rounded text-sm">Approve</button>
                        <button onClick={()=>openConfirm('disapprove-admin', it.id)} className="px-3 py-1 bg-red-600 rounded text-sm">Disapprove</button>
                        <button onClick={()=>openConfirm('promote-admin', it.id)} className="px-3 py-1 bg-orange-600 rounded text-sm">Promote</button>
                      </>
                    ) : null}
                    {title.toLowerCase().includes('mediator') || it.role === 'mediator' ? (
                      <button onClick={()=>openConfirm('disapprove-mediator', it.id)} className="px-3 py-1 bg-red-600 rounded text-sm">Disapprove</button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-gray-400 text-sm">Showing {(page-1)*pageSize+1} - {Math.min(page*pageSize, filtered.length)} of {filtered.length}</div>
              <div className="flex items-center gap-2">
                <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 bg-[#27231c] rounded">Prev</button>
                <div className="text-sm text-gray-300">{page}/{pages}</div>
                <button disabled={page>=pages} onClick={()=>setPage(p=>Math.min(pages,p+1))} className="px-3 py-1 bg-[#27231c] rounded">Next</button>
              </div>
            </div>
          </>
        )}
        <ConfirmModal open={confirmOpen} loading={confirmLoading} title="Confirm action" description={`Are you sure you want to ${confirmAction?.replace(/-/g,' ')} this item?`} confirmLabel="Yes, do it" cancelLabel="Cancel" onConfirm={handleConfirm} onCancel={()=>setConfirmOpen(false)} />
      </div>
    </AdminLayout>
  );
}
