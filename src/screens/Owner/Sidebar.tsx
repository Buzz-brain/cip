import { Link, useLocation } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import dashboardIcon from "@assets/dashboard.svg";
import plusCircleIcon from "@assets/plus-icon-grey.svg";
// import usersIcon from "@assets/users-grey.svg";
// import walletIcon from "@assets/wallet.svg";
import settingsIcon from "@assets/settings.svg";
import helpIcon from "@assets/help-grey.svg";
import { useAuth } from "../../context/useAuth";

const sidebarMenuItems = [
  { icon: dashboardIcon, label: "Dashboard", id: "dashboard" },
  { icon: plusCircleIcon, label: "Create Plan", id: "create-plan" },
  // { icon: usersIcon, label: "Beneficiaries", id: "beneficiaries" },
  // { icon: walletIcon, label: "Asset Registry", id: "asset-registry" },
];

const systemMenuItems = [
  { icon: settingsIcon, label: "Settings", id: "settings" },
  { icon: helpIcon, label: "Support", id: "support" },
];

export const Sidebar = (): JSX.Element => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const pathname = location.pathname || "/";

  const displayName = user?.name || user?.userInfo?.full_name || user?.publicKey || "Guest";
  const displayEmail = user?.email || user?.userInfo?.email || "";
  const avatarInitial = displayName ? String(displayName).charAt(0).toUpperCase() : "G";

  return (
        
        <div className="w-56 bg-[#1a1410] border-r border-[#3a2f1e] flex flex-col [font-family:'Manrope',Helvetica]">
            {/* Logo */}
            <div className="p-6 border-b border-[#3a2f1e]">
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 mb-2">
                                <Link to="/dashboard">
                                    <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
                                </Link>
                                <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
                                    CIP Protocol
                                </span>
                            </div>
                        </div>
                        <div className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-xs text-center">
                            Secure Multi-Chain Legacy
                        </div>
                    </div>
                </div>
            </div>

          {/* Main Menu */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {sidebarMenuItems.map((item) => {
              let href = "#";
              if (item.id === "dashboard") href = "/owner-dashboard";
              if (item.id === "create-plan") href = "/owner-dashboard/select-assets";
              if (item.id === "asset-registry") href = "/owner-dashboard/select-assets";

              const isActive = href !== "#" && pathname.startsWith(href);

              return (
                <Link
                  key={item.id}
                  to={href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors block ${
                    isActive ? "bg-[#332619] text-white" : "text-[#B9B09D] hover:bg-[#2a1f10] hover:text-white"
                  }`}
                >
                  <img src={item.icon} />
                  <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* System Menu */}
          <div className="border-t border-[#3a2f1e] p-4 space-y-2">
            {systemMenuItems.map((item) => {
              let href = "#";
              if (item.id === "settings") href = "/billing-and-payment";
              
              return (
                <Link
                  key={item.id}
                  to={href}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#B9B09D] hover:bg-[#2a1f10] hover:text-white transition-colors"
                >
                  <img src={item.icon} />
                  <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="border-t border-[#3a2f1e] p-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2D241C]">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {avatarInitial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xs truncate">
                  {displayName}
                </div>
                <div className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-xs truncate">
                  {displayEmail || (user?.publicKey ? `${user.publicKey.slice(0, 6)}...${user.publicKey.slice(-4)}` : "")}
                </div>
                <div className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-1 text-[#B9B09D] text-xs mt-1">
                    <div className={`w-2 h-2 rounded-full ${isAuthenticated ? "bg-[#22C55E] animate-pulse" : "bg-gray-400"}`}></div>
                    <p>{isAuthenticated ? "Online" : "Offline"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
}
