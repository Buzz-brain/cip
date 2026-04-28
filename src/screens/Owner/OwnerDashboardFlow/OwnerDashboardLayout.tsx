import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";

export const OwnerDashboardLayout = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0d0b08]">
      <div className="flex h-screen bg-[#0d0b08]">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardLayout;
