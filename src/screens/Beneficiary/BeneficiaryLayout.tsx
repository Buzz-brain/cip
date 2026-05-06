import React, { PropsWithChildren, useState } from 'react';
import { Bell as BellIcon, FileText as FileTextIcon, LayoutGrid as LayoutGridIcon, LogOut as LogOutIcon, AlertCircle as DisputeIcon } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import logoImg from '@assets/cip-logo-full.png';

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
    <div className="w-full h-screen [font-family:'Manrope',Helvetica] bg-[#0d0501] flex">
      <aside className="w-[193px] bg-[#0d0501] border-r border-[#392f28] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#3a2f1e]">
          <div className="flex items-center gap-2">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Link to="/beneficiary-dashboard">
                    <img src={logoImg} alt="Logo" className="object-cover" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2 p-4">
          <button
            onClick={() => navigate("/beneficiary-dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#2ccd2c]/90 transition-colors ${
              isActive("/beneficiary-dashboard") ? "bg-[#2ccd2c]" : ""
            }`}
          >
            <LayoutGridIcon
              className={`w-5 h-5 ${
                isActive("/beneficiary-dashboard")
                  ? "text-[#0d0501]"
                  : "text-[#8b7b64]"
              }`}
            />
            <span
              className={`[font-family:'Manrope',Helvetica] ${
                isActive("/beneficiary-dashboard")
                  ? "font-bold text-[#0d0501]"
                  : "font-normal text-[#8b7b64]"
              } text-sm`}
            >
              Dashboard
            </span>
          </button>

          <button
            onClick={() => navigate("/beneficiary-dashboard/activity-logs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors ${
              isActive("/beneficiary-dashboard/activity-logs")
                ? "bg-[#2ccd2c]"
                : ""
            }`}
          >
            <FileTextIcon
              className={`w-5 h-5 ${
                isActive("/beneficiary-dashboard/activity-logs")
                  ? "text-[#0d0501]"
                  : "text-[#8b7b64]"
              }`}
            />
            <span
              className={`[font-family:'Manrope',Helvetica] ${
                isActive("/beneficiary-dashboard/activity-logs")
                  ? "font-bold text-[#0d0501]"
                  : "font-normal text-[#8b7b64]"
              } text-sm`}
            >
              Activity Logs
            </span>
          </button>

          <button
            onClick={() => navigate("/beneficiary-dashboard/plans")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors ${
              isActive("/beneficiary-dashboard/plans") ? "bg-[#2ccd2c]" : ""
            }`}
          >
            <LayoutGridIcon
              className={`w-5 h-5 ${
                isActive("/beneficiary-dashboard/plans")
                  ? "text-[#0d0501]"
                  : "text-[#8b7b64]"
              }`}
            />
            <span
              className={`[font-family:'Manrope',Helvetica] ${
                isActive("/beneficiary-dashboard/plans")
                  ? "font-bold text-[#0d0501]"
                  : "font-normal text-[#8b7b64]"
              } text-sm`}
            >
              Plans
            </span>
          </button>

          <button
            onClick={() => navigate("/beneficiary-dashboard/disputes")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors ${
              isActive("/beneficiary-dashboard/disputes") ? "bg-[#2ccd2c]" : ""
            }`}
          >
            <DisputeIcon
              className={`w-5 h-5 ${
                isActive("/beneficiary-dashboard/disputes")
                  ? "text-[#0d0501]"
                  : "text-[#8b7b64]"
              }`}
            />
            <span
              className={`[font-family:'Manrope',Helvetica] ${
                isActive("/beneficiary-dashboard/disputes")
                  ? "font-bold text-[#0d0501]"
                  : "font-normal text-[#8b7b64]"
              } text-sm`}
            >
              Disputes
            </span>
          </button>
        </nav>

        <div className="border-t border-[#392f28] p-4">
          <div className="mb-4 flex items-center gap-3 px-3 py-3 rounded-lg bg-[#181511]">
            <div className="w-8 h-8 rounded-full bg-[#2ccd2c] flex items-center justify-center text-black font-bold">
              {user?.name
                ? user.name.slice(0, 1).toUpperCase()
                : user?.email
                ? user.email.slice(0, 1).toUpperCase()
                : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs truncate">
                {user?.name ??
                  user?.email ??
                  (user?.userInfo?.wallet
                    ? `${user.userInfo.wallet.slice(
                        0,
                        6,
                      )}...${user.userInfo.wallet.slice(-4)}`
                    : user?.publicKey
                    ? `${user.publicKey.slice(0, 6)}...${user.publicKey.slice(
                        -4,
                      )}`
                    : "User")}
              </p>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs truncate">
                {user?.email ?? user?.userInfo?.wallet ?? user?.publicKey ?? ""}
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
              navigate("/connect-wallet");
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-[#2ccd2c] hover:bg-[#27221c] rounded-lg transition-colors"
          >
            <LogOutIcon className="w-4 h-4" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-xs">
              Log out
            </span>
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-[#0d0501] overflow-auto">
        <header className="sticky top-0 flex items-center justify-between px-8 py-4 bg-[#0d0501] border-b border-[#392f28]">
          <div className="flex items-center gap-2 text-[#B9B09D]">
            <span className="[font-family:'Manrope',Helvetica] text-sm">
              Protocol
            </span>
            <span>&gt;</span>
            <span className="[font-family:'Manrope',Helvetica] text-white text-sm">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              className="relative"
              onClick={() => setShowNotifications((v) => !v)}
              aria-expanded={showNotifications}
              aria-controls="notifications-panel"
            >
              <BellIcon
                className={`w-5 h-5 ${
                  showNotifications ? "text-white" : "text-[#8b7b64]"
                } transition-colors`}
              />
            </button>
          </div>
        </header>

        <div className="p-8 flex flex-col gap-8">{children}</div>
      </main>

      {/* Notifications slide-in panel */}
      <div
        aria-hidden={!showNotifications}
        className={`fixed inset-0 z-40 ${
          showNotifications ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setShowNotifications(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            showNotifications ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          id="notifications-panel"
          role="dialog"
          aria-label="Notifications"
          className={`absolute right-0 top-0 h-full w-[320px] bg-[#0d0501] border-l border-[#392f28] transform transition-transform duration-300 ${
            showNotifications ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-[#392f28]">
            <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
              Notifications
            </h3>
            <p className="text-[#8b7b64] text-xs mt-2">
              Recent alerts about your plans and approvals.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-6 py-12">
              <BellIcon className="w-12 h-12 text-[#392f28] mx-auto mb-4" />
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                No notifications yet
              </p>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs mt-2">
                You'll see alerts here when there are updates about your plans.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BeneficiaryLayout;
