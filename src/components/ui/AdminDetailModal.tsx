import React from 'react';

type Props = {
  open: boolean;
  loading?: boolean;
  data?: any;
  title?: string;
  onClose: () => void;
}

export default function AdminDetailModal({ open, loading = false, data, title = 'Details', onClose }: Props) {
  if (!open) return null;

  // backend sometimes wraps executor details in `user-info`
  const main = data?.['user-info'] || data || null;
  const acts = data?.acts || data?.actions || [];
  const inheritances = data?.inheritances || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#0b0908] border border-[#2a2520] rounded-lg max-w-3xl w-full p-6 mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400">Close</button>
        </div>
        <div className="mt-4">
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : main ? (
            <>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {main.full_name && <div><div className="text-gray-400">Full name</div><div className="text-white">{main.full_name}</div></div>}
                {main.email && <div><div className="text-gray-400">Email</div><div className="text-white">{main.email}</div></div>}
                {main.wallet && <div><div className="text-gray-400">Wallet</div><div className="text-white">{main.wallet}</div></div>}
                {typeof main.plan_id !== 'undefined' && <div><div className="text-gray-400">Plan ID</div><div className="text-white">{String(main.plan_id)}</div></div>}
                {typeof main.nominated_by !== 'undefined' && <div><div className="text-gray-400">Nominated by</div><div className="text-white">{String(main.nominated_by)}</div></div>}
                {typeof main.dispute_id !== 'undefined' && <div><div className="text-gray-400">Dispute ID</div><div className="text-white">{String(main.dispute_id)}</div></div>}
                {typeof main.approved !== 'undefined' && <div><div className="text-gray-400">Approved</div><div className="text-white">{main.approved ? 'Yes' : 'No'}</div></div>}
                {typeof main.approved_at !== 'undefined' && <div><div className="text-gray-400">Approved at</div><div className="text-white">{main.approved_at || '-'}</div></div>}
                {typeof main.id !== 'undefined' && <div><div className="text-gray-400">ID</div><div className="text-white">{String(main.id)}</div></div>}
                {main.contact && <div className="col-span-2"><div className="text-gray-400">Contact</div><div className="text-white">{main.contact}</div></div>}
              </div>

              {Array.isArray(acts) && acts.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-2">Activity</h4>
                  <div className="text-sm text-gray-300">{JSON.stringify(acts)}</div>
                </div>
              )}

              {Array.isArray(inheritances) && inheritances.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-3">Inheritances</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-400 text-xs border-b border-[#2a2520]">
                          <th className="py-2">Plan ID</th>
                          <th className="py-2">Name</th>
                          <th className="py-2">Amount</th>
                          <th className="py-2">Type</th>
                          <th className="py-2">Funded</th>
                          <th className="py-2">Disputed</th>
                          <th className="py-2">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inheritances.map((inh:any) => (
                          <tr key={inh.id} className="border-b border-[#2a2520]">
                            <td className="py-3 text-white">{inh.contract_plan_id ?? inh.id}</td>
                            <td className="py-3 text-white">{inh.name || '-'}</td>
                            <td className="py-3 text-gray-300">{typeof inh.amount !== 'undefined' ? String(inh.amount) : '-'}</td>
                            <td className="py-3 text-gray-300">{inh.plan_type || '-'}</td>
                            <td className="py-3">{inh.is_funded ? <span className="text-green-400">Yes</span> : <span className="text-yellow-400">No</span>}</td>
                            <td className="py-3">{inh.is_disputed ? <span className="text-red-400">Yes</span> : <span className="text-gray-400">No</span>}</td>
                            <td className="py-3 text-gray-300">{inh.created_at ? new Date(Number(inh.created_at) * 1000).toLocaleString() : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-400">No details available</div>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-[#27231c] rounded text-sm">Close</button>
        </div>
      </div>
    </div>
  );
}
