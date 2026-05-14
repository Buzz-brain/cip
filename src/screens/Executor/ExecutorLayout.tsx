import { Outlet, useNavigate, Link } from "react-router-dom";
import ExecutorSidebar from "../../components/ui/ExecutorSidebar";
import ExecutorHeader from "../../components/ui/ExecutorHeader";
import { useAuth } from "../../context/useAuth";
import { LogOut, Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { toast } from 'react-toastify';

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
        try { toast.success('Logged out successfully'); } catch(e){}
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

        const [showMobileNav, setShowMobileNav] = useState(false);

        return (
                <div className="min-h-screen bg-[#1a1410] text-white flex">
                        {/* Desktop sidebar */}
                        <div className="hidden sm:block">
                            <ExecutorSidebar items={sidebarItems} footer={footerContent} />
                        </div>

                        <div className="flex-1">
                                <header className="sticky top-0 z-40">
                                    <div className="border-b border-[#3a3430] bg-[#1a1410]">
                                        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
                                            <div className="flex items-center gap-3 sm:hidden">
                                                <button onClick={() => setShowMobileNav(true)} aria-label="Open menu" className="p-2 rounded hover:bg-[#27221c]">
                                                    <MenuIcon className="w-5 h-5 text-[#8b7b64]" />
                                                </button>
                                            </div>
                                            <ExecutorHeader />
                                        </div>
                                    </div>
                                </header>

                                <main>
                                    <Outlet />
                                </main>
                        </div>

                        {/* Mobile nav drawer */}
                        <div aria-hidden={!showMobileNav} className={`fixed inset-0 z-50 ${showMobileNav ? '' : 'pointer-events-none'}`}>
                            <div onClick={() => setShowMobileNav(false)} className={`absolute inset-0 bg-black/40 transition-opacity ${showMobileNav ? 'opacity-100' : 'opacity-0'}`} />
                            <aside className={`absolute left-0 top-0 h-full w-[260px] bg-[#14100d] border-r border-[#3a3430] transform transition-transform duration-300 ${showMobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
                                <div className="p-6 border-b border-[#3a3430] flex items-center justify-between">
                                    <Link to="/executor-dashboard">
                                        <img src={"/assets/cip-logo-full.png"} alt="Logo" className="object-cover w-36" />
                                    </Link>
                                    <button onClick={() => setShowMobileNav(false)} className="p-2 rounded hover:bg-[#27221c]"><MenuIcon className="w-5 h-5 text-[#8b7b64] rotate-90" /></button>
                                </div>
                                <div className="p-4">
                                    <ExecutorSidebar items={sidebarItems} footer={footerContent} />
                                </div>
                            </aside>
                        </div>
                </div>
        );
};

export default ExecutorLayout;