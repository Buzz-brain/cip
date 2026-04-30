import { useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  Eye,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
} from "lucide-react";

export const DocumentVerification = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1410] text-white flex">
      <aside className="w-64 bg-[#1a1410] border-r border-[#3a3430] flex flex-col">
        <div className="p-6 border-b border-[#3a3430]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white font-semibold">CIP Protocol</span>
          </div>
        </div>

        <div className="p-4 border-b border-[#3a3430]">
          <div className="flex items-center gap-3 bg-[#2a2420] rounded-lg p-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div>
              <div className="text-sm font-medium">Executor Portal</div>
              <div className="text-xs text-gray-400">0x7fC...9i4</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white mb-1"
          >
            <span>📊</span>
            <span className="text-sm">Dashboard</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white mb-1">
            <span>📋</span>
            <span className="text-sm">Plans Management</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2a2420] text-white mb-1">
            <span>📄</span>
            <span className="text-sm">Document Verification</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white mb-1">
            <span>💰</span>
            <span className="text-sm">Tax Workflows</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white mb-1">
            <span>🔐</span>
            <span className="text-sm">MPC Approvals</span>
          </button>
        </nav>

        <div className="p-4 border-t border-[#3a3430]">
          <div className="bg-gradient-to-br from-[#3a2820] to-[#2a2420] border border-[#4a3830] rounded-xl p-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mb-3">
              <span className="text-white text-lg">🤖</span>
            </div>
            <h3 className="font-semibold text-sm mb-2">Autonomys AI</h3>
            <p className="text-xs text-gray-400 mb-3">
              Analyze stored legal clauses securely.
            </p>
            <button className="w-full bg-[#3a3430] hover:bg-[#4a4430] py-2 rounded-lg text-xs">
              Open Secure Chat
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <header className="border-b border-[#3a3430] bg-[#1a1410] px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Executor Dashboard</span>
              <ChevronRight className="w-4 h-4" />
              <span>Plan #1024</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Verification</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search documents..."
                className="bg-[#2a2420] border border-[#3a3430] rounded-lg px-4 py-2 text-sm w-64"
              />
              <button className="w-8 h-8 bg-[#2a2420] rounded-lg flex items-center justify-center">
                <span>🔔</span>
              </button>
              <button className="w-8 h-8 bg-[#2a2420] rounded-lg flex items-center justify-center">
                <span>⚙️</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">Document Verification</h1>
                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded text-sm">
                  Plan #1024
                </span>
                <span className="bg-[#2a2420] text-gray-300 px-3 py-1 rounded text-sm flex items-center gap-2">
                  <span>🔗</span>
                  Autonomys Integrated
                </span>
              </div>
              <p className="text-gray-400">
                Securely upload and verify legal documents for the Estate of
                John Doe. All files are encrypted and permanently stored on the
                Autonomys Network.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-[#2a2420] border border-[#3a3430] px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[#3a3430]">
                <FileText className="w-4 h-4" />
                Audit Log
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold mb-1">
                      Verification Completeness
                    </h3>
                    <p className="text-sm text-gray-400">
                      3 of 5 required documents verified
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-orange-400">
                    60%
                  </span>
                </div>
                <div className="w-full bg-[#3a3430] rounded-full h-3 mb-3">
                  <div
                    className="bg-orange-500 h-3 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-orange-400">Pending: 1</span>
                  <span className="text-gray-400">Missing: 1</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Required Documents</h2>
                  <div className="flex items-center gap-3">
                    <button className="bg-[#2a2420] border border-[#3a3430] px-4 py-2 rounded-lg text-sm hover:bg-[#3a3430]">
                      Filter
                    </button>
                    <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                      <span>+</span>
                      Add Optional Doc
                    </button>
                  </div>
                </div>

                <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#3a3430] text-sm text-gray-400">
                        <th className="text-left p-4 font-medium">
                          Document Type
                        </th>
                        <th className="text-left p-4 font-medium">
                          File Details
                        </th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                        <th className="text-left p-4 font-medium">AI Tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#3a3430] hover:bg-[#3a3430]">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <div className="font-medium">
                                Death Certificate
                              </div>
                              <div className="text-xs text-gray-400">
                                Required
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm mb-1">death_cert_v1.pdf</div>
                          <div className="text-xs text-gray-400 mb-1">
                            2.4 MB • Uploaded Oct 24, 2023
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <span>🔒</span>
                            Encrypted & permanently stored on Autonomys
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-2">
                            <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs w-fit">
                              <CheckCircle className="w-3 h-3" />
                              Integrity Verified
                            </span>
                            <span className="text-xs text-gray-400">
                              via Hash: 0x7f...323
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 bg-[#3a3430] hover:bg-[#4a4430] rounded flex items-center justify-center">
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="w-8 h-8 bg-[#3a3430] hover:bg-[#4a4430] rounded flex items-center justify-center">
                              <Trash2 className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <button className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded text-xs hover:bg-orange-500/30">
                            Autonomys Insight
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-[#3a3430] hover:bg-[#3a3430]">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                              <div className="font-medium">
                                Legal Appointment
                              </div>
                              <div className="text-xs text-gray-400">
                                Required
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm mb-1">
                            court_doc_signed.pdf
                          </div>
                          <div className="text-xs text-gray-400 mb-1">
                            4.1 MB • Uploaded 2 hrs ago
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <span>⏳</span>
                            Syncing to Autonomys...
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-2">
                            <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs w-fit">
                              <Clock className="w-3 h-3" />
                              Pending Review
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 bg-[#3a3430] hover:bg-[#4a4430] rounded flex items-center justify-center">
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="w-8 h-8 bg-[#3a3430] hover:bg-[#4a4430] rounded flex items-center justify-center">
                              <Trash2 className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <button className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded text-xs hover:bg-orange-500/30">
                            Autonomys Analysis
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-[#3a3430] hover:bg-[#3a3430]">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                              <AlertCircle className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                              <div className="font-medium">Medical Report</div>
                              <div className="text-xs text-gray-400">
                                Optional
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm mb-1">scan_004.jpg</div>
                          <div className="text-xs text-gray-400">
                            1.2 MB • Uploaded Yesterday
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-2">
                            <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs w-fit">
                              <AlertCircle className="w-3 h-3" />
                              Rejected
                            </span>
                            <span className="text-xs text-gray-400">
                              Reason: Image too blurry
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 bg-[#3a3430] hover:bg-[#4a4430] rounded flex items-center justify-center">
                              <RefreshCw className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <button className="bg-[#3a3430] text-gray-400 px-3 py-1 rounded text-xs hover:bg-[#4a4430]">
                            Why?
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-[#3a3430]">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#3a3430] rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium">
                                Beneficiary Letter
                              </div>
                              <div className="text-xs text-gray-400">
                                Confirmation
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-400">
                            No file uploaded
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">
                            <AlertCircle className="w-3 h-3" />
                            Missing
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded flex items-center justify-center">
                            <Upload className="w-4 h-4 text-white" />
                          </button>
                        </td>
                        <td className="p-4">
                          <span className="text-xs text-gray-400">—</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#2a2420] border-2 border-dashed border-[#3a3430] rounded-xl p-12 mt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#3a3430] rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Click to upload or drag and drop
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    SVG, PNG, JPG or PDF (max. 10MB)
                  </p>
                  <button className="bg-[#3a3430] hover:bg-[#4a4430] px-6 py-2 rounded-lg text-sm">
                    Select Files
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-orange-900/40 to-[#2a2420] border border-orange-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 text-orange-400 text-xs mb-4">
                  <span>🤖</span>
                  <span className="font-medium">Autonomys Network</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Tamper-Proof Storage
                </h3>
                <p className="text-sm text-gray-300 mb-6">
                  Documents are encrypted with your private key and permanently
                  archived on Autonomys. Content hashes ensure files remain
                  immutable and verifiable forever.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Network Status</div>
                    <div className="font-medium">Storage Node Active</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                <div className="text-2xl mb-3">💡</div>
                <h3 className="font-semibold mb-2">
                  Securely analyzing permanent records for tamper-proof
                  validity.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
