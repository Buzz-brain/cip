import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/useAuth";
import { disapproveAdmin, approveAdmin, promoteAdmin, disapproveMediator, viewUser, viewExecutor, viewMediator } from "../../lib/api/admin";
import ConfirmModal from "../../components/ui/ConfirmModal";
import AdminDetailModal from "../../components/ui/AdminDetailModal";

export default function AdminListPage({ title, fetcher }: { title: string; fetcher: (token?: string) => Promise<any[]> }) {
  const { user } = useAuth();
  const token = user?.token;
  const [items, setItems] = useState<any[]>([]);
  const [execStats, setExecStats] = useState<{ exec_count?: number; total_wallets?: number; pending?: number } | null>(null);
  const [mediatorStats, setMediatorStats] = useState<{ total_mediators?: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [confirmItemId, setConfirmItemId] = useState<number | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailTitle, setDetailTitle] = useState<string>('Details');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetcher(token);
        // backend may return { status,message,data:{ exec/mediators/...: [...] } } or an array
        const data = res?.data || res;
        // set executor stats when present
        if (data && typeof data === 'object') {
          if (typeof data.exec_count !== 'undefined' || typeof data.total_wallets !== 'undefined' || typeof data.pending !== 'undefined') {
            setExecStats({ exec_count: data.exec_count, total_wallets: data.total_wallets, pending: data.pending });
          } else {
            setExecStats(null);
          }
          if (typeof data.total_mediators !== 'undefined') {
            setMediatorStats({ total_mediators: data.total_mediators });
          } else {
            setMediatorStats(null);
          }
        }
        const list = Array.isArray(res)
          ? res
          : data?.exec || res?.exec || data?.mediators || res?.mediators || data?.results || res?.data || [];
        setItems(Array.isArray(list) ? list : []);
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
      const list = Array.isArray(res)
        ? res
        : res?.data?.exec || res?.exec || res?.data?.mediators || res?.mediators || res?.data?.results || res?.data || [];
      setItems(Array.isArray(list) ? list : []);
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
        {/* Stats for executors/mediators if provided by backend */}
        {(execStats || mediatorStats) && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {execStats && (
              <>
                <div className="bg-[#0f0c0a] border border-[#2a2520] rounded p-3 text-sm">
                  <div className="text-gray-400">Executors</div>
                  <div className="text-white text-lg font-semibold">{String(execStats.exec_count ?? 0)}</div>
                </div>
                <div className="bg-[#0f0c0a] border border-[#2a2520] rounded p-3 text-sm">
                  <div className="text-gray-400">Total Wallets</div>
                  <div className="text-white text-lg font-semibold">{String(execStats.total_wallets ?? 0)}</div>
                </div>
                <div className="bg-[#0f0c0a] border border-[#2a2520] rounded p-3 text-sm">
                  <div className="text-gray-400">Pending</div>
                  <div className="text-white text-lg font-semibold">{String(execStats.pending ?? 0)}</div>
                </div>
              </>
            )}
            {mediatorStats && (
              <div className="bg-[#0f0c0a] border border-[#2a2520] rounded p-3 text-sm col-span-3 md:col-span-1">
                <div className="text-gray-400">Mediators</div>
                <div className="text-white text-lg font-semibold">{String(mediatorStats.total_mediators ?? 0)}</div>
              </div>
            )}
          </div>
        )}

        {loading ? <div className="text-gray-400">Loading...</div> : (
          <>
            <div className="space-y-3">
              {current.length === 0 ? <div className="text-gray-400">No records</div> : current.map((it:any, idx:number)=> (
                <div key={idx} className="p-3 bg-[#0f0c0a] rounded border border-[#2a2520] text-sm text-white flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{it.full_name || it.user_name || it.email || it.name || `#${it.id || idx}`}</div>
                    <div className="text-gray-400 text-xs mt-1">{it.email || it.contact || JSON.stringify(it).slice(0,120)}</div>
                    <div className="mt-2 flex items-center gap-4 text-xs">
                      {it.wallet && <div className="text-gray-400"><span className="text-gray-400">Wallet:</span> <span className="text-white ml-1">{String(it.wallet).slice(0,12)}...{String(it.wallet).slice(-6)}</span></div>}
                      {typeof it.plan_id !== 'undefined' && <div className="text-gray-400"><span className="text-gray-400">Plan:</span> <span className="text-white ml-1">{String(it.plan_id)}</span></div>}
                      {typeof it.has_approved !== 'undefined' && (
                        <div>
                          {it.has_approved ? <span className="px-2 py-0.5 bg-green-600 rounded text-xs">Approved</span> : <span className="px-2 py-0.5 bg-yellow-600 rounded text-xs">Pending</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Actions: view, approve/disapprove, promote, disable depending on type */}
                    <button onClick={async ()=>{
                      setDetailLoading(true);
                      setDetailData(null);
                      setDetailTitle(it.full_name || it.email || `#${it.id || idx}`);
                      setDetailOpen(true);
                      try {
                        const details = it.id ? (
                          title.toLowerCase().includes('executors') || it.plan_id
                            ? await viewExecutor(it.id, token)
                            : title.toLowerCase().includes('mediators')
                              ? await viewMediator(it.id, token)
                              : await viewUser(it.id, token)
                        ) : null;
                        setDetailData(details || it);
                      } catch (e) {
                        setDetailData(it);
                      } finally {
                        setDetailLoading(false);
                      }
                    }} className="px-3 py-1 bg-[#27231c] rounded text-sm">View</button>
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
        <AdminDetailModal open={detailOpen} loading={detailLoading} data={detailData} title={detailTitle} onClose={()=>{setDetailOpen(false); setDetailData(null);}} />
      </div>
    </AdminLayout>
  );
}
