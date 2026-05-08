import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AppProvider } from "./AppContext";

interface AdminLayoutProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function AdminLayout({ title, subtitle, children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <AppProvider>
      <div className="flex min-h-screen w-full bg-[#0f0c0a] [font-family:'Manrope',Helvetica] overflow-x-hidden">
        <div className="hidden sm:block">
          <Sidebar />
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 sm:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-64">
              <Sidebar mobile open={mobileOpen} onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <Header title={title} subtitle={subtitle} onToggleMenu={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
