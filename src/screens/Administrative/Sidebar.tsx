import {
  LayoutDashboard,
  Users,
  Box,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect } from "react";
import { useApp } from "./AppContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logoImg from "@assets/cip-logo-full.png";

interface SidebarProps {
  variant?: "default" | "simple";
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ variant = "default", mobile = false, open = false, onClose }: SidebarProps) {
  const { currentPage, setCurrentPage } = useApp();

  const navigationItems =
    variant === "default"
      ? [
          {
            id: "dashboard" as const,
            label: "Dashboard",
            icon: LayoutDashboard,
          },
          {
            id: "role-management" as const,
            label: "Role Access Control",
            icon: Users,
          },
          {
            id: "iexec-jobs" as const,
            label: "iExec Jobs",
            icon: Box,
          },
        ]
      : [
          {
            id: "dashboard" as const,
            label: "Dashboard",
            icon: LayoutDashboard,
          },
          {
            id: "role-management" as const,
            label: "Role Management",
            icon: Users,
          },
          { id: "manage-executors" as const, label: "Users", icon: Users },
          { id: "plan-management" as const, label: "Settings", icon: Settings },
          { id: "job-logs" as const, label: "Audit Logs", icon: Box },
        ];

  const navigate = useNavigate();
  const location = useLocation();

  const routeForId = (id: string) => {
    switch (id) {
      case "dashboard":
        return "/administrative-dashboard";
      case "iexec-jobs":
        return "/administrative/iexec-jobs";
      case "user-analytics":
        return "/administrative-dashboard";
      case "manage-executors":
        return "/administrative/users";
      case "plan-management":
        return "/administrative-dashboard";
      case "job-logs":
        return "/administrative-dashboard";
      case "support-tickets":
        return "/administrative-dashboard";
      case "role-management":
        return "/administrative/role-access-control";
      default:
        return "/administrative-dashboard";
    }
  };

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/administrative/role-access-control")) {
      setCurrentPage("role-management");
      return;
    }
    if (path.startsWith("/administrative/users")) {
      setCurrentPage("manage-executors");
      return;
    }
    if (path.startsWith("/administrative/dashboard") || path === "/administrative-dashboard") {
      setCurrentPage("dashboard");
      return;
    }
    if (path.startsWith("/administrative/executors") || path.startsWith("/administrative/mediators") || path.startsWith("/administrative/admins")) {
      setCurrentPage("manage-executors");
      return;
    }
    if (path.startsWith("/administrative/iexec-jobs")) {
      setCurrentPage("iexec-jobs");
      return;
    }
  }, [location.pathname, setCurrentPage]);

  // Mobile drawer
  if (mobile) {
    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1510] border-r border-[#2a2520] transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`} aria-hidden={!open}>
        <div className="p-4 border-b border-[#3a2f1e] flex items-center justify-between">
          <Link to="/administrative-dashboard">
            <img src={logoImg} alt="Logo" className="h-8 object-contain" />
          </Link>
          <button onClick={onClose} aria-label="Close menu" className="text-slate-300 p-2">✕</button>
        </div>


        <nav className="flex-1 p-3 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  const r = routeForId(item.id);
                  navigate(r);
                  onClose && onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-400 hover:bg-[#2a2520] hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#2a2520]">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#2a2520] hover:text-gray-300 transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-60 bg-[#1a1510] border-r border-[#2a2520] flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-[#3a2f1e] flex items-center justify-between">
          <Link to="/administrative-dashboard">
            <img src={logoImg} alt="Logo" className="h-8 object-contain" />
          </Link>
        </div>
      <nav className="flex-1 p-3">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                const r = routeForId(item.id);
                navigate(r);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-orange-600 text-white"
                  : "text-gray-400 hover:bg-[#2a2520] hover:text-gray-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#2a2520]">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#2a2520] hover:text-gray-300 transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="text-sm">
            {variant === "default" ? "Logout" : "Log Out"}
          </span>
        </button>
      </div>
    </div>
  );
}
