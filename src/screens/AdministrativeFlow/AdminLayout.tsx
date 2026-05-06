import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AppProvider } from "./AppContext";

interface AdminLayoutProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function AdminLayout({ title, subtitle, children }: AdminLayoutProps) {
  return (
    <AppProvider>
      <div className="flex min-h-screen bg-[#0f0c0a]">
        <Sidebar />
        <div className="flex-1">
          <Header title={title} subtitle={subtitle} />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </AppProvider>
  );
}
