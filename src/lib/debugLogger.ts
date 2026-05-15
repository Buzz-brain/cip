const STORAGE_KEY = 'cip_debug_logs';
const ENABLE_KEY = 'cip_enable_debug';

export type DebugLevel = 'log' | 'info' | 'warn' | 'error';

export interface DebugEntry {
  ts: number;
  level: DebugLevel;
  message: string;
  meta?: any;
}

function pushEntry(entry: DebugEntry) {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) || '[]';
    const arr: DebugEntry[] = JSON.parse(raw);
    arr.push(entry);
    // keep last 500 entries
    if (arr.length > 500) arr.splice(0, arr.length - 500);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    // ignore
  }
}

export function logDebug(level: DebugLevel, message: string, meta?: any) {
  pushEntry({ ts: Date.now(), level, message, meta });
}

export function getDebugLogs(): DebugEntry[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearDebugLogs() {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
}

export function isDebugEnabled(): boolean {
  try { return sessionStorage.getItem(ENABLE_KEY) === '1'; } catch { return false; }
}

export function setDebugEnabled(enabled: boolean) {
  try {
    if (enabled) sessionStorage.setItem(ENABLE_KEY, '1');
    else sessionStorage.removeItem(ENABLE_KEY);
  } catch {}
}

// Optionally capture console messages
let _capturing = false;
let _origConsole: Partial<Console> = {};

export function enableConsoleCapture() {
  if (_capturing) return;
  _capturing = true;
  _origConsole.log = console.log;
  _origConsole.info = console.info;
  _origConsole.warn = console.warn;
  _origConsole.error = console.error;

  console.log = function (...args: any[]) {
    try { pushEntry({ ts: Date.now(), level: 'log', message: String(args[0] ?? ''), meta: args.slice(1) }); } catch {}
    _origConsole.log?.apply(console, args as any);
  } as any;
  console.info = function (...args: any[]) {
    try { pushEntry({ ts: Date.now(), level: 'info', message: String(args[0] ?? ''), meta: args.slice(1) }); } catch {}
    _origConsole.info?.apply(console, args as any);
  } as any;
  console.warn = function (...args: any[]) {
    try { pushEntry({ ts: Date.now(), level: 'warn', message: String(args[0] ?? ''), meta: args.slice(1) }); } catch {}
    _origConsole.warn?.apply(console, args as any);
  } as any;
  console.error = function (...args: any[]) {
    try { pushEntry({ ts: Date.now(), level: 'error', message: String(args[0] ?? ''), meta: args.slice(1) }); } catch {}
    _origConsole.error?.apply(console, args as any);
  } as any;
}

export function disableConsoleCapture() {
  if (!_capturing) return;
  _capturing = false;
  if (_origConsole.log) console.log = _origConsole.log as any;
  if (_origConsole.info) console.info = _origConsole.info as any;
  if (_origConsole.warn) console.warn = _origConsole.warn as any;
  if (_origConsole.error) console.error = _origConsole.error as any;
}

// Auto-enable if session flag present
if (isDebugEnabled()) enableConsoleCapture();

export default {
  logDebug,
  getDebugLogs,
  clearDebugLogs,
  isDebugEnabled,
  setDebugEnabled,
  enableConsoleCapture,
  disableConsoleCapture,
};
