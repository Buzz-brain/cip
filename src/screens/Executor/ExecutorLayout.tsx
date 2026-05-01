import { Outlet } from "react-router-dom";
import ExecutorSidebar from "../../components/ui/ExecutorSidebar";
import ExecutorHeader from "../../components/ui/ExecutorHeader";

const ExecutorLayout = (): JSX.Element => {
    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", href: "/executor-dashboard" },
        // { id: "plans", label: "Plans", href: "/executor-dashboard/executor-inheritance-plan" },
        // { id: "compliance", label: "Compliance", href: "/executor-dashboard/compliance" },
        // { id: "audit", label: "Audit", href: "/executor-dashboard/executor-audit-log" },
        // { id: "mpc", label: "MPC", href: "/executor-dashboard/mpc-share-management" },
    ];

    return (
        <div className="min-h-screen bg-[#1a1410] text-white flex [font-family:'Manrope',Helvetica]">
            <ExecutorSidebar items={sidebarItems} />
            <div className="flex-1">
                <ExecutorHeader />
                <Outlet />
            </div>
        </div>
    );
};

export default ExecutorLayout;