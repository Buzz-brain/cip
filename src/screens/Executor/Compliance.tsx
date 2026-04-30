import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Download,
} from "lucide-react";

export const Compliance = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1410] text-white">
      <header className="border-b border-[#3a3430] sticky top-0 z-50 bg-[#1a1410]">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-semibold">CIP Protocol</span>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Executor Dashboard</span>
              <ChevronRight className="w-4 h-4" />
              <span>Active Plans</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-orange-400">Plan #XC-9210</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-green-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Secure Connection
            </span>
            <button className="text-gray-400 hover:text-white">
              <span>🔔</span>
            </button>
            <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Compliance & TaxCore Integration
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Verify legal prerequisites, manage jurisdiction rules, and finalize
            tax liabilities for the Estate of Jonathan H. Sterling
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="col-span-2 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
                <div className="mb-4">
                  <h3 className="text-sm text-gray-400 mb-1">
                    Readiness Score
                  </h3>
                  <p className="text-xs text-orange-400 font-medium mb-3">
                    Action Required
                  </p>
                </div>
                <div className="text-5xl font-bold mb-1">80%</div>
                <div className="text-sm text-gray-400 mb-4">
                  ready for filing
                </div>
                <div className="w-full bg-[#3a3430] rounded-full h-2 mb-4">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400">verified_user</p>
              </div>

              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-3xl">⚙️</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  TaxCore & Autonomys Vault
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Real-time liability computation and immutable archival.
                </p>
                <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                  View jurisdiction compliance
                </button>
              </div>
            </div>

            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                <span>✓</span>
                Compliance Checklist
              </h3>
              <div className="space-y-3 mt-4">
                <div className="flex items-start gap-3 pb-3 border-b border-[#3a3430]">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Executor ID Verified</p>
                    <p className="text-xs text-gray-400">
                      KYC completed on Oct 12, 2023
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-[#3a3430]">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      All required documents uploaded
                    </p>
                    <p className="text-xs text-gray-400">
                      34 files encrypted & stored
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-[#3a3430]">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      Jurisdiction Rules Checked
                    </p>
                    <p className="text-xs text-gray-400">
                      CA (USA) & London (UK) rulesets applied
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-[#3a3430]">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Tax Summary Generated</p>
                    <p className="text-xs text-gray-400">
                      Draft v1.4 available
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-orange-500/30 border border-orange-500 rounded-sm flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="text-orange-400 text-xs font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Pending Court Authorization
                    </p>
                    <p className="text-xs text-gray-400">
                      Awaiting signature from Probate Court
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6 mb-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Tax Liability Breakdown</h3>
                <span className="text-2xl font-bold text-orange-400">
                  $24,750
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-6">
                Estimated distribution of tax obligations.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Transfer Tax</span>
                    <span className="text-sm font-medium">50.3%</span>
                  </div>
                  <div className="w-full bg-[#3a3430] rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "50.3%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Beneficiary Obligations</span>
                    <span className="text-sm font-medium">32.7%</span>
                  </div>
                  <div className="w-full bg-[#3a3430] rounded-full h-2">
                    <div
                      className="bg-orange-400 h-2 rounded-full"
                      style={{ width: "32.7%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Capital Gains</span>
                    <span className="text-sm font-medium">17.0%</span>
                  </div>
                  <div className="w-full bg-[#3a3430] rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "17.0%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#3a3430]">
                <div className="text-xs text-gray-400 mb-2">Legend</div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Beneficiary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Capital Gains</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 py-2 rounded-lg text-sm font-medium transition"
            >
              Audit Log
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">Transfer Tax</p>
                <p className="text-lg font-bold">$12,450.00</p>
                <p className="text-xs text-green-400 mt-1">+2.1%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Capital Gains</p>
                <p className="text-lg font-bold">$4,200.00</p>
                <p className="text-xs text-gray-400 mt-1">Federal & State</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Beneficiary Obgs.</p>
                <p className="text-lg font-bold">$8,100.00</p>
                <div className="text-xs text-orange-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Verify IDs
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Jurisdictions</p>
                <p className="text-lg font-bold">2 Active</p>
                <p className="text-xs text-gray-400 mt-1">US UK</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <p className="text-xs text-gray-400 mb-4">
              Last updated: Today, 09:41 AM
            </p>
            <div className="space-y-3">
              <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold transition">
                Generate Tax Summary
              </button>
              <p className="text-xs text-gray-400 text-center">
                Auto-synce to Autonomys Network
              </p>
              <button className="w-full border border-[#3a3430] hover:bg-[#3a3430] py-3 rounded-lg flex items-center justify-center gap-2 transition">
                <Download className="w-4 h-4" />
                Download Tax Report
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">🤖</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span>🌐</span>
                Autonomys Permanent Archive
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Immutable storage for tax records & jurisdiction files.
              </p>
              <div className="space-y-3">
                <div className="bg-[#3a3430] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <span>📄</span>
                        Tax_Summary_FY2023_Final.pdf
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        Tax Summary archived permanently.
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">Hash: 0x4e4...f92</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-[#2a2420] hover:bg-orange-500/20 px-4 py-2 rounded text-sm flex items-center gap-2 transition">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="bg-[#2a2420] hover:bg-green-500/20 px-4 py-2 rounded text-sm transition">
                      Integrity Check
                    </button>
                  </div>
                </div>

                <div className="bg-[#3a3430] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <span>📁</span>
                        Multi_Jurisdiction_Filing_Bundle.zip
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        Files archived permanently.
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">Hash: 0x302...x19</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-[#2a2420] hover:bg-orange-500/20 px-4 py-2 rounded text-sm flex items-center gap-2 transition">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="bg-[#2a2420] hover:bg-green-500/20 px-4 py-2 rounded text-sm transition">
                      Integrity Check
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-orange-400 mt-4 flex items-center gap-1">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Network Synced
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
