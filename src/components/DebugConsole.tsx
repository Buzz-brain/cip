import React, { useEffect, useState } from 'react';
import debugLogger, { getDebugLogs, clearDebugLogs, isDebugEnabled, setDebugEnabled, enableConsoleCapture, disableConsoleCapture } from '../lib/debugLogger';

export const DebugConsole: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState(getDebugLogs());
  const [capturing, setCapturing] = useState(isDebugEnabled());

  useEffect(() => {
    const id = setInterval(() => setLogs(getDebugLogs()), 800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (capturing) enableConsoleCapture(); else disableConsoleCapture();
    setDebugEnabled(capturing);
  }, [capturing]);

  const download = () => {
    const data = JSON.stringify(getDebugLogs(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-logs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        onClick={() => setOpen((s) => !s)}
        className="fixed z-50 left-4 bottom-4 bg-[#111] text-white px-3 py-2 rounded-lg shadow-lg"
      >
        {open ? 'Hide Logs' : 'Show Logs'}
      </button>

      {open && (
      <div className="fixed z-50 left-4 bottom-16 w-[min(95vw,600px)] max-h-[60vh] overflow-auto bg-[#0b0b0b] border border-[#444] rounded-lg p-3 text-sm text-white shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Debug Console</div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" checked={capturing} onChange={(e) => setCapturing(e.target.checked)} />
                Capture console
              </label>
              <button onClick={() => { clearDebugLogs(); setLogs([]); }} className="px-2 py-1 bg-[#333] rounded">Clear</button>
              <button onClick={download} className="px-2 py-1 bg-[#1f6feb] rounded">Download</button>
            </div>
          </div>

          <div className="bg-[#060606] p-2 rounded max-h-[52vh] overflow-auto">
            {logs.length === 0 && <div className="text-gray-400">No logs yet</div>}
            {logs.map((l, i) => (
              <div key={i} className="mb-1">
                <div className="text-xs text-gray-500">{new Date(l.ts).toLocaleTimeString()}</div>
                <div className={`whitespace-pre-wrap ${l.level === 'error' ? 'text-red-400' : l.level === 'warn' ? 'text-yellow-300' : 'text-white'}`}>
                  [{l.level}] {l.message} {l.meta ? JSON.stringify(l.meta) : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugConsole;
