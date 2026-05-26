import React, { useMemo, useState, forwardRef } from 'react';
import useActivityLogs from '../../lib/hooks/useActivityLogs';
import ActivityListSkeleton from './ActivityListSkeleton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../screens/Owner/PlanCreationFlow/TimeLock/SetTimeLock.css';
import { Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';

export const formatWhen = (ts?: any) => {
  if (!ts) return '—';
  const n = Number(ts);
  try {
    return n > 1e12 ? new Date(n).toLocaleString() : new Date(n * 1000).toLocaleString();
  } catch (e) {
    return String(ts);
  }
};

type Props = {
  userToken?: string | null;
  title?: string;
  subtitle?: string;
  useOrange?: boolean;
};
interface DatePickerCustomInputProps {
  value?: string;
  onClick?: () => void;
  isOpen?: boolean;
}

const DatePickerCustomInput = forwardRef<HTMLButtonElement, DatePickerCustomInputProps>(
  ({ value, onClick, isOpen }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Filter by date"
      aria-expanded={isOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (ref as any)?.current?.click();
        }
      }}
      onClick={onClick}
      className="relative w-full text-left h-12 pl-12 pr-4 font-normal text-white text-sm bg-[#0f0c09] border border-[#2f271f] rounded px-3 py-3"
    >
      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ff6600] pointer-events-none" />
      <span className={`${value ? 'text-white' : 'text-[#d4ccc6]'}`}>{value || 'Date'}</span>
    </button>
  )
);

DatePickerCustomInput.displayName = 'DatePickerCustomInput';

const TimePickerCustomInput = forwardRef<HTMLButtonElement, DatePickerCustomInputProps>(
  ({ value, onClick, isOpen }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Filter by time"
      aria-expanded={isOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (ref as any)?.current?.click();
        }
      }}
      onClick={onClick}
      className="relative w-full text-left h-12 pl-12 pr-4 font-normal text-white text-sm bg-[#0f0c09] border border-[#2f271f] rounded px-3 py-3"
    >
      <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ff6600] pointer-events-none" />
      <span className={`${value ? 'text-white' : 'text-[#d4ccc6]'}`}>{value || 'Time'}</span>
    </button>
  )
);

TimePickerCustomInput.displayName = 'TimePickerCustomInput';

const ActivityLogs: React.FC<Props> = ({ userToken, title = 'Activity Logs', subtitle, useOrange = false }) => {
  const { logs, loading, error, refresh } = useActivityLogs(userToken ?? undefined);
  const [query, setQuery] = useState('');
  const [dateObj, setDateObj] = useState<Date | null>(null);
  const [timeObj, setTimeObj] = useState<Date | null>(null);

  const filtered = useMemo(() => {
    if (!Array.isArray(logs)) return [];

    const matchesDateTime = (item: any) => {
      if (!dateObj) return true;
      const tsRaw = Number(item.timestamp ?? item.created_at ?? item.time ?? 0) || 0;
      const ms = tsRaw > 1e12 ? tsRaw : tsRaw * 1000;
      const d = new Date(ms);
      // compare local date components
      if (d.getFullYear() !== dateObj.getFullYear()) return false;
      if (d.getMonth() !== dateObj.getMonth()) return false;
      if (d.getDate() !== dateObj.getDate()) return false;
      if (timeObj) {
        if (d.getHours() !== timeObj.getHours()) return false;
        if (d.getMinutes() !== timeObj.getMinutes()) return false;
      }
      return true;
    };

    return logs.filter((l: any) => {
      const txt = JSON.stringify(l).toLowerCase();
      if (query && !txt.includes(query.toLowerCase())) return false;
      if (!matchesDateTime(l)) return false;
      return true;
    });
  }, [logs, query, dateObj, timeObj]);

  return (
    <div className="min-h-full text-white">
      <div className="flex">
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">{title}</h1>
              <p className="text-gray-400">
                {subtitle ??
                  "All protocol activity for your account. Filter by text or Date/Time."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <input
                aria-label="Search activity"
                placeholder="Search text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`flex-1 bg-[#0f0b08] border border-[#2f271f] rounded px-4 py-3 text-sm text-[#d1c3b4] focus:outline-none ${
                  useOrange
                    ? "focus:ring-2 focus:ring-[#F97316]"
                    : "focus:ring-2 focus:ring-[#2ccd2c]"
                }`}
              />

              <div className="w-full sm:w-40 flex items-center gap-2">
                <div className="flex-1">
                  <DatePicker
                    selected={dateObj}
                    onChange={(d: Date | null) => setDateObj(d)}
                    customInput={<DatePickerCustomInput />}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    popperPlacement="bottom"
                    dateFormat="dd-MM-yyyy"
                    wrapperClassName="w-full"
                    popperClassName="datepicker-popper-dark"
                  />
                </div>
              </div>

              <div className="w-full sm:w-40">
                <DatePicker
                  selected={timeObj}
                  onChange={(d: Date | null) => setTimeObj(d)}
                  customInput={<TimePickerCustomInput />}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  wrapperClassName="w-full"
                  popperClassName="datepicker-popper-dark"
                />
              </div>

              <button
                title="Clear date and time"
                onClick={() => {
                  setDateObj(null);
                  setTimeObj(null);
                }}
                className="text-sm text-[#b9ac9d] hover:text-white"
              >
                Clear
              </button>

              <button
                onClick={() => refresh()}
                className={`${
                  useOrange ? "bg-[#F97316]" : "bg-[#2ccd2c]"
                } w-full sm:w-auto px-4 py-3 text-white rounded font-medium`}
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <ActivityListSkeleton count={4} />
            ) : error ? (
              <div className="py-20 text-center text-gray-400">
                Error loading activity
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No activity logs</h3>
                <p className="max-w-lg mx-auto">
                  There are no activity records matching your filters. Try
                  adjusting the search or refresh.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.slice(0, 500).map((it: any, idx: number) => (
                  <article
                    key={idx}
                    className="p-4 bg-[#241C16] rounded-lg border border-[#392f28]"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">
                          {String(
                            it.message ??
                              it.title ??
                              it.event ??
                              it.msg ??
                              "Activity",
                          )}
                        </div>
                        {(it.body || it.details || it.data) && (
                          <div className="text-gray-400 text-sm mt-1">
                            {it.body ?? it.details ?? JSON.stringify(it.data)}
                          </div>
                        )}
                        {/* Show only message and date — remove Plan display */}
                        <div className="text-xs text-[#8b7664] mt-2">
                          {formatWhen(it.timestamp ?? it.created_at ?? it.time)}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivityLogs;
