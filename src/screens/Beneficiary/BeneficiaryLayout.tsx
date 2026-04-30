import React, { PropsWithChildren, useState } from 'react';
import { ChartBar as BarChart3Icon, Bell as BellIcon, FileText as FileTextIcon, LayoutGrid as LayoutGridIcon, LogOut as LogOutIcon, Search as SearchIcon, Settings as SettingsIcon, CheckCircle as CheckCircleIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export const BeneficiaryLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="w-full h-screen bg-[#0d0501] flex">
      <aside className="w-[193px] bg-[#0d0501] border-r border-[#392f28] flex flex-col">
        <button
          onClick={() => navigate('/proof-of-life')}
          className="p-6 flex items-center gap-2 border-b border-[#392f28] hover:bg-[#27221c] transition-colors"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-[#ff6600] rounded-lg">
            <span className="text-white font-bold text-sm">CIP</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">CIP</span>
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs">Inheritance</span>
          </div>
        </button>

        <nav className="flex-1 flex flex-col gap-2 p-4">
          <button
            onClick={() => navigate('/beneficiary-dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#2ccd2c]/90 transition-colors ${isActive('/beneficiary-dashboard') ? 'bg-[#2ccd2c]' : ''}`}
          >
            <LayoutGridIcon className={`w-5 h-5 ${isActive('/beneficiary-dashboard') ? 'text-[#0d0501]' : 'text-[#8b7b64]'}`} />
            <span className={`[font-family:'Manrope',Helvetica] ${isActive('/beneficiary-dashboard') ? 'font-bold text-[#0d0501]' : 'font-normal text-[#8b7b64]'} text-sm`}>Dashboard</span>
          </button>

          <button
            onClick={() => navigate('/beneficiary-dashboard#approvals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group ${isActive('/beneficiary-dashboard') && location.hash === '#approvals' ? 'bg-[#2ccd2c]' : ''}`}
          >
            <CheckCircleIcon className={`w-5 h-5 ${isActive('/beneficiary-dashboard') && location.hash === '#approvals' ? 'text-white' : 'text-[#8b7b64]'}`} />
            <span className={`[font-family:'Manrope',Helvetica] ${isActive('/beneficiary-dashboard') && location.hash === '#approvals' ? 'font-bold text-white' : 'font-normal text-[#8b7b64]'} group-hover:text-white text-sm`}>Approvals</span>
            <span className="ml-auto bg-[#ff6600] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
          </button>

          <button
            onClick={() => navigate('/beneficiary-dashboard#tax-reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group ${location.hash === '#tax-reports' ? 'bg-[#2ccd2c]' : ''}`}
          >
            <FileTextIcon className={`w-5 h-5 ${location.hash === '#tax-reports' ? 'text-white' : 'text-[#8b7b64]'}`} />
            <span className={`[font-family:'Manrope',Helvetica] ${location.hash === '#tax-reports' ? 'font-bold text-white' : 'font-normal text-[#8b7b64]'} group-hover:text-white text-sm`}>Tax Reports</span>
          </button>

          <button
            onClick={() => navigate('/beneficiary-details')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group ${isActive('/beneficiary-details') ? 'bg-[#27221c]' : ''}`}
          >
            <BarChart3Icon className={`w-5 h-5 ${isActive('/beneficiary-details') ? 'text-white' : 'text-[#8b7b64]'}`} />
            <span className={`[font-family:'Manrope',Helvetica] ${isActive('/beneficiary-details') ? 'font-bold text-white' : 'font-normal text-[#8b7b64]'} group-hover:text-white text-sm`}>Assets</span>
          </button>
        </nav>

        <div className="border-t border-[#392f28] p-4">
          <div className="mb-4 flex items-center gap-3 px-3 py-3 rounded-lg bg-[#181511]">
            <div className="w-8 h-8 rounded-full bg-[#2ccd2c] flex items-center justify-center text-black font-bold">
              {user?.name ? user.name.slice(0, 1).toUpperCase() : (user?.email ? user.email.slice(0, 1).toUpperCase() : 'U')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs truncate">
                {user?.name ?? user?.email ?? (user?.userInfo?.wallet ? `${user.userInfo.wallet.slice(0,6)}...${user.userInfo.wallet.slice(-4)}` : (user?.publicKey ? `${user.publicKey.slice(0,6)}...${user.publicKey.slice(-4)}` : 'User'))}
              </p>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs truncate">
                {user?.email ?? user?.userInfo?.wallet ?? user?.publicKey ?? ''}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              try {
                logout();
              } catch (e) {
                // ignore
              }
              navigate('/');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-[#2ccd2c] hover:bg-[#27221c] rounded-lg transition-colors"
          >
            <LogOutIcon className="w-4 h-4" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-xs">Log out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-[#0d0501] overflow-auto">
        <header className="sticky top-0 flex items-center justify-between px-8 py-4 bg-[#0d0501] border-b border-[#392f28]">
          <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">Overview</h1>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:flex">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b7b64]" />
              <input
                type="text"
                placeholder="Search plans..."
                className="pl-10 pr-4 py-2 bg-[#27221c] border border-[#392f28] rounded-lg [font-family:'Manrope',Helvetica] text-white placeholder-[#8b7b64] focus:outline-none focus:border-[#ff6600]"
              />
            </div>

            <button className="relative" onClick={() => setShowNotifications(v => !v)} aria-expanded={showNotifications} aria-controls="notifications-panel">
              <BellIcon className={`w-5 h-5 ${showNotifications ? 'text-white' : 'text-[#8b7b64]'} transition-colors`} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2ccd2c] rounded-full flex items-center justify-center text-white text-xs font-bold">3</span>
            </button>

            <button className="hover:text-white transition-colors">
              <SettingsIcon className="w-5 h-5 text-[#8b7b64]" />
            </button>
          </div>
        </header>

        <div className="p-8 flex flex-col gap-8">{children}</div>
      </main>

      {/* Notifications slide-in panel */}
      <div aria-hidden={!showNotifications} className={`fixed inset-0 z-40 ${showNotifications ? '' : 'pointer-events-none'}`}>
        <div onClick={() => setShowNotifications(false)} className={`absolute inset-0 bg-black/40 transition-opacity ${showNotifications ? 'opacity-100' : 'opacity-0'}`} />

        <aside id="notifications-panel" role="dialog" aria-label="Notifications" className={`absolute right-0 top-0 h-full w-[320px] bg-[#0d0501] border-l border-[#392f28] transform transition-transform duration-300 ${showNotifications ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-[#392f28]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">Notifications</h3>
              <span className="bg-[#2ccd2c] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-1 rounded-full">3</span>
            </div>
            <p className="text-[#8b7b64] text-xs">Recent alerts about your plans and approvals.</p>
          </div>

          <div className="flex-1 flex flex-col divide-y divide-[#392f28] overflow-auto">
            <div className="p-4 hover:bg-[#27221c] transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#ff3b30] mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm mb-1">MPC Signature Required</p>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs leading-5">Grandmother's Trust requires your approval immediately.</p>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs mt-2">2 hours ago</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-[#27221c] transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2ccd2c] mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm mb-1">Plan Execution Ready</p>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs leading-5">"Family Estate Plan" is now 80% through the monitoring phase.</p>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs mt-2">Yesterday</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-[#27221c] transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2ccd2c] mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm mb-1">Tax Summary Updated</p>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs leading-5">New tax implications calculated based on recent crypto volatility.</p>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs mt-2">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BeneficiaryLayout;
