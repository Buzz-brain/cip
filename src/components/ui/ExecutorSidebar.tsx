import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'lucide-react';

export type SidebarItem = {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
};

interface Props {
  items: SidebarItem[];
  footer?: React.ReactNode;
}

export const ExecutorSidebar: React.FC<Props> = ({ items, footer }) => {
  const loc = useLocation();
  return (
    <aside className="w-64 bg-[#14100d] border-r border-[#3a3430] min-h-screen p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <div>
          <div className="text-white font-semibold">CIP Protocol</div>
          <div className="text-xs text-[#9c8b74]">Executor Portal</div>
        </div>
      </div>

      <nav className="space-y-1">
        {items.map((it) => {
          const active = loc.pathname === it.href;
          return (
            <Link
              key={it.id}
              to={it.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${active ? 'bg-[#1f1a16] text-white' : 'text-[#b8a494] hover:bg-[#1a1511] hover:text-white'}`}
            >
              {it.icon ? <span className="w-5 h-5">{it.icon}</span> : null}
              <span className="text-sm">{it.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6">{footer}</div>
    </aside>
  );
};

export default ExecutorSidebar;
