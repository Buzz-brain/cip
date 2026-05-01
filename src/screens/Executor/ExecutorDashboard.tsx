import {
  FolderOpen,
  DollarSign,
  AlertTriangle,
  Activity,
  CheckCircle,
} from "lucide-react";
import AssignedInheritancePlans from "./ExecutorDashboardFlow/AssignedInheritancePlans";

export const ExecutorDashboard = (): JSX.Element => {
  return (
    <main className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Executor Dashboard</h1>
          <p className="text-gray-400">
            Manage your assigned inheritance plans, verify documents, and
            handle MPC approvals.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#1a3a2a] px-3 py-2 rounded-lg">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-green-400 text-sm">System Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-5 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-green-400 text-xs">+2 New</span>
          </div>
          <div className="text-3xl font-bold mb-1">12</div>
          <div className="text-gray-400 text-sm">Active Plans Managed</div>
        </div>

        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <button className="text-gray-400 text-xs">👁️</button>
          </div>
          <div className="text-3xl font-bold mb-1">~$4.2M</div>
          <div className="text-gray-400 text-sm">Assets Under Management</div>
        </div>

        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">3</div>
          <div className="text-gray-400 text-sm">Urgent Tasks Pending</div>
        </div>

        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-white text-lg font-bold">85%</span>
          </div>
          <div className="w-full bg-[#3a3430] rounded-full h-2 mb-3">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: "85%" }}
            ></div>
          </div>
          <div className="text-gray-400 text-sm">Compliance Health</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div>
            <AssignedInheritancePlans />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#3a2820] to-[#2a2420] border border-[#4a3830] rounded-xl p-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Need legal guidance?</h3>
              <p className="text-sm text-gray-400 mb-4">
                CIP AI can help you understand local inheritance laws and tax
                implications for your active plans.
              </p>
              <button className="text-orange-400 text-sm hover:text-orange-300 flex items-center gap-1">
                Start Chat →
              </button>
            </div>
          </div>

          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <h3 className="font-semibold mb-4">Activity Log</h3>
            <div className="space-y-4">
            <div className="text-gray-400 text-sm text-center py-8">No activity log</div>

              {/* Skeleton loading */}
              {/* {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-3 bg-[#3a3430] rounded w-16 mb-2"></div>
                  <div className="h-4 bg-[#3a3430] rounded w-3/4"></div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
