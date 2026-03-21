// import { useNavigate } from "react-router-dom";
import {
  Lock,
  Download,
  CheckCircle2,
  Upload,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

export const ExecutorSecureStorage = (): JSX.Element => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2a1f] to-[#0f1f17] text-white">
      <header className="border-b border-green-500/20 bg-[#0a2a1f]/80 backdrop-blur px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <div className="font-semibold text-sm">CIP V</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Autonomys Network Connected
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 bg-[#1a3a2a] px-3 py-1 rounded-lg">
            0x71...89A2
          </span>
          <button className="text-gray-400 hover:text-white">⚙️</button>
          <div className="w-8 h-8 bg-orange-300 rounded-lg"></div>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3">Secure Storage</h1>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                Your inheritance plans and legal documents are encrypted locally
                and permanently archived on the Autonomys distributed storage
                network.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#1a3a2a]/50 border border-green-500/20 rounded-xl p-6">
                <div className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                  <span>🔒</span>
                  Vault Status
                </div>
                <div className="text-2xl font-bold">Synced</div>
              </div>

              <div className="bg-[#1a3a2a]/50 border border-green-500/20 rounded-xl p-6">
                <div className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                  <span>📁</span>
                  Documents
                </div>
                <div className="text-2xl font-bold">12 Files</div>
              </div>

              <div className="bg-[#1a3a2a]/50 border border-green-500/20 rounded-xl p-6">
                <div className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                  <span>💾</span>
                  Storage Used
                </div>
                <div className="text-2xl font-bold">48 MB</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-green-500/20 mb-6">
              <button className="text-white text-sm pb-4 border-b-2 border-green-500">
                <span className="flex items-center gap-2">
                  <span>📁</span>
                  All Files
                </span>
              </button>
              <button className="text-gray-400 hover:text-white text-sm pb-4">
                <span className="flex items-center gap-2">
                  <span>🔗</span>
                  Shared with Executor
                </span>
              </button>
              <button className="text-gray-400 hover:text-white text-sm pb-4">
                <span className="flex items-center gap-2">
                  <span>📦</span>
                  Archived Plans
                </span>
              </button>
            </div>

            {/* Files List */}
            <div className="space-y-4">
              {/* File 1 */}
              <div className="bg-[#1a3a2a]/50 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base">
                        DeathCertificate_v1.pdf
                      </h3>
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">
                        Encrypted
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last updated: Oct 24, 2023 • Size: 2.4 MB
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono flex-shrink-0">
                    0x7f...a23
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400">
                      <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                      Share with Executor
                    </button>
                    <button className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      Verify Integrity
                    </button>
                  </div>
                  <button className="text-green-400 hover:text-green-300 flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* File 2 */}
              <div className="bg-[#1a3a2a]/50 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base">
                        LastWill_Testament_Final.docx
                      </h3>
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">
                        Encrypted
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last updated: Nov 01, 2023 • Size: 845 KB
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono flex-shrink-0">
                    0xc4...1b9
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400">
                      <div className="flex gap-1">
                        <div className="w-5 h-5 bg-green-400 rounded-full"></div>
                        <div className="w-5 h-5 bg-green-400 rounded-full"></div>
                      </div>
                      Share with Executor
                    </button>
                    <button className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1">
                      <span>◇</span>
                      Verify Integrity
                    </button>
                  </div>
                  <button className="text-green-400 hover:text-green-300 flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* File 3 */}
              <div className="bg-[#1a3a2a]/50 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base">
                        Property_Deed_Scan.png
                      </h3>
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">
                        Encrypted
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last updated: Aug 15, 2023 • Size: 5.2 MB
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono flex-shrink-0">
                    0x9a...c41
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400">
                      <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                      Share with Executor
                    </button>
                    <button className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      Verify Integrity
                    </button>
                  </div>
                  <button className="text-green-400 hover:text-green-300 flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Secure Upload Card */}
            <div className="bg-[#1a3a2a]/50 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-base">Secure Upload</h2>
                <Lock className="w-4 h-4 text-green-400" />
              </div>

              <div className="border-2 border-dashed border-green-500/30 hover:border-green-500/60 rounded-xl p-8 text-center cursor-pointer transition mb-4">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOCX, PNG (Max 50MB)
                </p>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-[#1a3a2a]/50 border border-green-500/20 rounded-xl p-6">
              <h2 className="font-bold text-base mb-4">Recent Activity</h2>

              <div className="space-y-4">
                {/* Activity 1 */}
                <div className="pb-4 border-b border-green-500/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-sm font-medium">
                      Insurance_Policy_24.pdf
                    </span>
                  </div>
                  <div className="text-xs text-green-400 ml-5">
                    Archived Permanently
                  </div>
                  <div className="text-xs text-gray-500 ml-5 mt-1">
                    Hash: 0x82...99f1
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="pb-4 border-b border-green-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Family_Trust.pdf
                    </span>
                    <span className="text-xs text-yellow-500">
                      Processing...
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    On-device encryption
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Done</div>
                    <div className="w-full bg-green-500/20 rounded-full h-1.5">
                      <div
                        className="bg-green-400 h-1.5 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    65%
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-4">
                  <span className="text-yellow-600">⚠️</span> Files are
                  encrypted with your private key before leaving this device.
                  Only you can decrypt them.
                </div>
              </div>
            </div>

            {/* Zero-Knowledge Proof Card */}
            <div className="bg-[#1a3a2a]/50 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm mb-1">
                    Zero-Knowledge Proof
                  </h3>
                  <p className="text-xs text-gray-400">
                    Your data integrity is mathematically verifiable at any
                    time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
