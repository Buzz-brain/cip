import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Box,
  Headphones,
  Settings,
  LogOut,
} from "lucide-react";
import { useApp } from "./AppContext";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  variant?: "default" | "simple";
}

export function Sidebar({ variant = "default" }: SidebarProps) {
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
            id: "user-analytics" as const,
            label: "User Analytics",
            icon: Users,
          },
          {
            id: "plan-management" as const,
            label: "Plan Management",
            icon: FolderKanban,
          },
          { id: "job-logs" as const, label: "iExec Job Logs", icon: Box },
          {
            id: "support-tickets" as const,
            label: "Support Tickets",
            icon: Headphones,
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

  const routeForId = (id: string) => {
    switch (id) {
      case "dashboard":
        return "/administrative-dashboard";
      case "user-analytics":
      case "manage-executors":
        return "/manage-executors";
      case "plan-management":
        return "/administrative-dashboard";
      case "job-logs":
        return "/administrative-dashboard";
      case "support-tickets":
        return "/administrative-dashboard";
      case "role-management":
        return "/role-access-control";
      default:
        return "/administrative-dashboard";
    }
  };

  return (
    <div className="w-60 bg-[#1a1510] border-r border-[#2a2520] flex flex-col h-screen">
      <div className="p-4 border-b border-[#2a2520]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
            <Box className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm">
              {variant === "default" ? "CIP Admin" : "Admin Panel"}
            </h1>
            <p className="text-gray-400 text-xs">
              {variant === "default" ? "Inference Protocol" : "CIP Team"}
            </p>
          </div>
        </div>
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
          {variant === "default" ? (
            <>
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </>
          ) : null}
        </button>
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
