import React from 'react';

type Props = {
  open: boolean;
  data?: any;
  onClose: () => void;
}

export default function IexecJobModal({ open, data, onClose }: Props) {
  if (!open) return null;

  const result = (data && data.result) || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#0b0908] border border-[#2a2520] rounded-lg max-w-2xl w-full p-6 mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <h3 className="text-white text-lg font-semibold">iExec Job Details</h3>
          <button onClick={onClose} className="text-gray-400">Close</button>
        </div>

        <div className="mt-4 text-sm text-gray-300">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-400">Task ID</div>
              <div className="text-white break-all">{(data && data.task_id) || '-'}</div>
            </div>
            <div>
              <div className="text-gray-400">Plan</div>
              <div className="text-white">{(data && (data.plan_name || data.plan_id)) || '-'}</div>
            </div>
            <div>
              <div className="text-gray-400">Trigger</div>
              <div className="text-white">{(data && data.trigger_type) || '-'}</div>
            </div>
            <div>
              <div className="text-gray-400">Processed</div>
              <div className="text-white">{(data && data.processed) ? 'Yes' : 'No'}</div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-400">Result Hash</div>
              <div className="text-white break-all">{(result && result.hash) || '-'}</div>
            </div>
          </div>

          {result && (
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Result Object</h4>
              <pre className="text-xs text-gray-300 bg-[#0f0c0a] p-3 rounded">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-[#27231c] rounded text-sm">Close</button>
        </div>
      </div>
    </div>
  );
}
