import { useNavigate } from "react-router-dom";
import {
  FolderOpen,
  DollarSign,
  AlertTriangle,
  Activity,
  FileText,
  Upload,
  FileCheck,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import AssignedInheritancePlans from "./ExecutorDashboardFlow/AssignedInheritancePlans";

export const ExecutorDashboard = (): JSX.Element => {
  const navigate = useNavigate();

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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-semibold">Action Required</h2>
            </div>
            <span className="text-xs text-gray-400 bg-[#2a2420] px-3 py-1 rounded-full">
              3 Pending
            </span>
          </div>

          <div className="space-y-3 mb-8">
            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center mt-1">
                  <FileCheck className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    MPC Signature Pending
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Plan #402 (John Doe) — Initial key generation phase.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-orange-400">
                    <Clock className="w-3 h-3" />
                    <span>3 days left to approve</span>
                  </div>
                </div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                Sign Transaction
              </button>
            </div>

            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center mt-1">
                  <Upload className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Document Upload Required
                  </h3>
                  <p className="text-sm text-gray-400">
                    Plan #881 (Jane Smith) — Death Certificate needed for
                    verification.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/verification")}
                className="bg-[#3a3430] hover:bg-[#4a4430] border border-[#5a5440] px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
              >
                Upload Document
              </button>
            </div>

            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center mt-1">
                  <FileText className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Review Tax Summary</h3>
                  <p className="text-sm text-gray-400">
                    Plan #215 (Robert Fox) — Final tax assessment ready for
                    review.
                  </p>
                </div>
              </div>
              <button className="bg-[#3a3430] hover:bg-[#4a4430] border border-[#5a5440] px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                Review
              </button>
            </div>
          </div>

          <div>
            <AssignedInheritancePlans />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Compliance Health</h3>
              <button className="text-orange-400 text-xs hover:text-orange-300">
                View Report
              </button>
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#3a3430"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#a855f7"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56 * 0.85} ${2 * Math.PI * 56 * 0.15}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">85%</span>
                  <span className="text-xs text-gray-400">Healthy</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Executor ID Verified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Documents Submitted</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">Tax Summary Incomplete</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">MPC Nodes Ready</span>
              </div>
            </div>
          </div>

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
              <div>
                <div className="text-xs text-gray-500 mb-1">2 hours ago</div>
                <div className="text-sm">
                  Plan #402 status changed to{" "}
                  <span className="text-orange-400">Triggered</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Yesterday</div>
                <div className="text-sm">
                  Uploaded Death Certificate for Plan #101
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">2 days ago</div>
                <div className="text-sm">
                  Verified identity with KYC provider
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
