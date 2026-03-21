import { useNavigate } from "react-router-dom";
import {
  Shield,
  Lock,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export const MPCShareManagement = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1410] text-white">
      <header className="border-b border-[#3a3430] sticky top-0 z-50 bg-[#1a1410]">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-semibold">CIP</span>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Plans</span>
              <ChevronRight className="w-4 h-4" />
              <span>Estate Plan #8823</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-orange-400">MPC Management</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white">
              <span>⚙️</span>
            </button>
            <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">MPC Share Management</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-400">
                Protocol ID: #CIP#8823
              </span>
              <span className="text-sm">•</span>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-green-400">Executor Level Access</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-900/40 to-transparent border border-orange-500/30 rounded-lg p-4 w-80">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-400 mb-1">
                  High Security Environment
                </h3>
                <p className="text-sm text-gray-300">
                  Keys are encrypted & stored in Secure Enclave. Verified by
                  ICRC TEE attestation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Share Status Monitor</h2>
              <button className="flex items-center gap-2 text-orange-400 hover:text-orange-300">
                <RefreshCw className="w-4 h-4" />
                Refresh Status
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                  <span className="text-sm text-green-400">Active</span>
                </div>
                <div className="mb-4">
                  <div className="text-lg text-gray-400 mb-2">
                    Executor MPC Share
                  </div>
                  <h3 className="text-3xl font-bold">Healthy</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span>Secure Enclave (SGX)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Sig</span>
                    <span>2h ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">
                    Post-Trigger Locked
                  </span>
                </div>
                <div className="mb-4">
                  <div className="text-lg text-gray-400 mb-2">
                    Owner MPC Share
                  </div>
                  <h3 className="text-3xl font-bold">Locked</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trigger Event</span>
                    <span>Death Cert. Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Access</span>
                    <span>Read-Only</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400">
                    Pending Approval
                  </span>
                </div>
                <div className="mb-4">
                  <div className="text-lg text-gray-400 mb-2">
                    Backup MPC Share
                  </div>
                  <h3 className="text-3xl font-bold">Pending</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Condition</span>
                    <span>Awaiting Validator</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ETA</span>
                    <span>~4 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Critical Actions</h2>

                <button className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl p-6 text-left mb-4 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-white" />
                        <h3 className="text-lg font-bold">
                          Approve Inheritance Execution
                        </h3>
                      </div>
                      <p className="text-sm text-orange-100">
                        Initiate the final transfer workflow. Requires 2/3
                        Multi-Sig consensus
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition" />
                  </div>
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">🔑</span>
                      <h3 className="font-semibold">Generate Signature</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Sign off on specific tax documents or legal verifications
                      without full execution.
                    </p>
                  </div>

                  <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">🔄</span>
                      <h3 className="font-semibold">Rotate Executor Share</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Regenerate your key share if you suspect device
                      compromise.
                    </p>
                  </div>
                </div>

                <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-4 mt-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <h3 className="font-semibold text-red-400">
                        Emergency Zone
                      </h3>
                    </div>
                    <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                      Emergency Override
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Force a protocol override via TaxCore verification.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6">Verification Logs</h2>
              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6 space-y-4">
                <div className="border-b border-[#3a3430] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 text-xs font-medium">
                      VERIFIED
                    </span>
                    <span className="text-xs text-gray-400">10m ago</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">
                    Executor Share Integrity Check
                  </h4>
                  <p className="text-xs text-gray-400">Hash: 0x6b47_7f3b</p>
                </div>

                <div className="border-b border-[#3a3430] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 text-xs font-medium">
                      VERIFIED
                    </span>
                    <span className="text-xs text-gray-400">2h ago</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">
                    Signature Generated
                  </h4>
                  <p className="text-xs text-gray-400">Sig: 0x447_31b</p>
                </div>

                <div className="border-b border-[#3a3430] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-400 text-xs font-medium">
                      LOCKED
                    </span>
                    <span className="text-xs text-gray-400">1d ago</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">
                    Owner Share Transition
                  </h4>
                  <p className="text-xs text-gray-400">
                    Event: DEATH_CERT_VERIFIED
                  </p>
                </div>

                <div className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-orange-400 text-xs font-medium">
                      ATTESTED
                    </span>
                    <span className="text-xs text-gray-400">2d ago</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">
                    Secure Enclave Boot
                  </h4>
                  <p className="text-xs text-gray-400">MRENCLAVE: 0x991_d223</p>
                </div>

                <button
                  onClick={() => navigate("/compliance")}
                  className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 py-2 rounded-lg text-sm font-medium transition mt-4"
                >
                  View Full Audit Log
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#3a3430] pt-8">
            <p className="text-center text-xs text-gray-500">
              🔐 End-to-End Encrypted via iExec Confidential Computing
            </p>
            <p className="text-center text-xs text-gray-600 mt-1">
              © 2024 CipherProtocol. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
