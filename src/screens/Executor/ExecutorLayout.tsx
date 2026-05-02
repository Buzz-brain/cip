import { Outlet, useNavigate } from "react-router-dom";
import ExecutorSidebar from "../../components/ui/ExecutorSidebar";
import ExecutorHeader from "../../components/ui/ExecutorHeader";
import { useAuth } from "../../context/useAuth";
import { LogOut } from "lucide-react";

const ExecutorLayout = (): JSX.Element => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    
    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", href: "/executor-dashboard" },
        { id: "activity-logs", label: "Activity Logs", href: "/executor-dashboard/activity-logs" },
        // { id: "plans", label: "Plans", href: "/executor-dashboard/executor-inheritance-plan" },
        // { id: "compliance", label: "Compliance", href: "/executor-dashboard/compliance" },
        // { id: "audit", label: "Audit", href: "/executor-dashboard/executor-audit-log" },
        // { id: "mpc", label: "MPC", href: "/executor-dashboard/mpc-share-management" },
    ];

    const handleLogout = () => {
        try {
            logout();
        } catch (e) {
            // ignore
        }
        navigate("/connect-wallet");
    };

    const footerContent = (
        <div className="border-t border-[#3a3430] pt-4">
            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-orange-400 hover:bg-[#1a1511] rounded-md transition-colors text-sm"
            >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#1a1410] text-white flex [font-family:'Manrope',Helvetica]">
            <ExecutorSidebar items={sidebarItems} footer={footerContent} />
            <div className="flex-1">
                <ExecutorHeader />
                <Outlet />
            </div>
        </div>
    );
};

export default ExecutorLayout;