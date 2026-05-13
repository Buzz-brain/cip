import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { ChainAlert } from "@components/ui/ChainAlert";
import { useState } from "react";

export const OwnerDashboardLayout = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0b08] [font-family:'Manrope',Helvetica]">
      <ChainAlert />
      <div className="flex h-screen bg-[#0d0b08]">
        {/* Desktop sidebar (hidden on small screens inside Sidebar component) */}
        <Sidebar />

        {/* Mobile drawer overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
        )}
        <Sidebar mobile open={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onToggleSidebar={() => setMobileOpen((s) => !s)} />
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardLayout;
