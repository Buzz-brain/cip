import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from "@assets/cip-logo-full.png";

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
    <aside className="w-64 bg-[#14100d] border-r border-[#3a3430] min-h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Link to="/owner-dashboard">
                  <img src={logoImg} alt="Logo" className="object-cover" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {items.map((it) => {
          const active = loc.pathname === it.href;
          return (
            <Link
              key={it.id}
              to={it.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                active
                  ? "bg-[#1f1a16] text-white"
                  : "text-[#b8a494] hover:bg-[#1a1511] hover:text-white"
              }`}
            >
              {it.icon ? <span className="w-5 h-5">{it.icon}</span> : null}
              <span className="text-sm">{it.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div>{footer}</div>
      </div>
    </aside>
  );
};

export default ExecutorSidebar;
