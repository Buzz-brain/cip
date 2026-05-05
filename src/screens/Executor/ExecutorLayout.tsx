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
        { id: "plans", label: "Plans", href: "/executor-dashboard/executor-inheritance-plan" },
        { id: "disputes", label: "Disputes", href: "/executor-dashboard/executor-dispute-plan" },
        { id: "activity-logs", label: "Activity Logs", href: "/executor-dashboard/activity-logs" },
    ];

    const handleLogout = () => {
        try {
            logout();
        } catch (e) {
            // ignore
        }
        navigate("/connect-wallet");
    };

    const { user } = useAuth();
    const displayName = user?.name || user?.userInfo?.full_name || "Guest";
    const displayEmail = user?.email || user?.userInfo?.email || "";
    const avatarInitial = displayName ? String(displayName).charAt(0).toUpperCase() : "G";

    const footerContent = (
        <div className="space-y-2">
            <div className="border-t border-[#3a3430] pt-4">
                <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-transparent">
                    <div className="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center text-black font-bold text-sm">{avatarInitial}</div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm truncate">{displayName}</div>
                        <div className="text-[#B9B09D] text-xs truncate">{displayEmail || (user?.publicKey ? `${user.publicKey.slice(0,6)}...${user.publicKey.slice(-4)}` : '')}</div>
                    </div>
                </div>
            </div>

            <div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#F97316] hover:bg-[#1a1511] rounded-md transition-colors text-sm"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                </button>
            </div>
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