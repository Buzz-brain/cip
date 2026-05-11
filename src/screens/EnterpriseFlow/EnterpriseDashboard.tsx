import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { Header } from '../Administrative/Header';
import { AppProvider } from '../Administrative/AppContext';
import { useAuth } from '../../context/useAuth'
import logoImg from "@assets/cip-logo-full.png";;
import { toast } from 'react-toastify';

export const EnterpriseDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try { logout(); toast.success('Logged out'); } catch {}
    navigate('/enterprise-login');
  };

  return (
    <div className="flex min-h-screen bg-[#0f0c0a] [font-family:'Manrope',Helvetica]">
      <AppProvider>
        <aside className="hidden sm:block w-64 bg-[#0f0c0a] text-white p-6 border-r border-[#2a2520]">
        <div className="p-4 border-b border-[#3a2f1e] flex items-center justify-between">
          <Link to="/administrative-dashboard">
            <img src={logoImg} alt="Logo" className="h-8 object-contain" />
          </Link>
          {/* <button onClick={onClose} aria-label="Close menu" className="text-slate-300 p-2">✕</button> */}
        </div>

          <nav className="flex-1 space-y-1">
            <NavLink to="/enterprise-dashboard" end className={({isActive})=> `block px-3 py-2 rounded ${isActive ? 'bg-[#1a1510] text-white' : 'text-gray-400 hover:text-white'}`}>
              Dashboard
            </NavLink>
            <NavLink to="/enterprise-dashboard/generate-api-key" className={({isActive})=> `block px-3 py-2 rounded ${isActive ? 'bg-[#1a1510] text-white' : 'text-gray-400 hover:text-white'}`}>
              Generate API Key
            </NavLink>
          </nav>

          <div className="mt-4 pt-4 border-t border-[#2a2520]">
            <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded text-sm text-orange-500 hover:bg-[#1a1510]">Logout</button>
          </div>
        </aside>
      </AppProvider>

      <div className="flex-1 flex flex-col">
        <Header title="Enterprise Dashboard" subtitle="Manage plans and API access" onToggleMenu={() => {}} />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
