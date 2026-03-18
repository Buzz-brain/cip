import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
// import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Download, Shield } from "lucide-react";

interface Document {
  id: string;
  name: string;
  status: "encrypted" | "processing";
  encrypted: boolean;
  lastUpdated: string;
  size: string;
  hash: string;
  canShare: boolean;
  shared?: boolean;
  verifyIntegrity?: boolean;
  downloadReady?: boolean;
  uploadProgress?: number;
  notes?: string;
  icon: string;
}

interface Activity {
  id: string;
  name: string;
  status: "archived" | "processing";
  statusLabel: string;
  hash: string;
  uploadProgress?: number;
  notes?: string;
}

const documents: Document[] = [
  {
    id: "1",
    name: "DeathCertificate_v1.pdf",
    status: "encrypted",
    encrypted: true,
    lastUpdated: "Oct 24, 2023",
    size: "2.4 MB",
    hash: "0x7f...a23",
    canShare: true,
    shared: false,
    verifyIntegrity: true,
    downloadReady: true,
    icon: "📄",
  },
  {
    id: "2",
    name: "LastWill_Testament_Final.docx",
    status: "encrypted",
    encrypted: true,
    lastUpdated: "Nov 01, 2023",
    size: "845 KB",
    hash: "0xc4...1b9",
    canShare: true,
    shared: true,
    verifyIntegrity: true,
    downloadReady: true,
    icon: "📋",
  },
  {
    id: "3",
    name: "Property_Deed_Scan.png",
    status: "encrypted",
    encrypted: true,
    lastUpdated: "Aug 15, 2023",
    size: "5.2 MB",
    hash: "0x9a...c41",
    canShare: true,
    shared: false,
    verifyIntegrity: true,
    downloadReady: true,
    icon: "🖼️",
  },
];

const recentActivity: Activity[] = [
  {
    id: "1",
    name: "Insurance_Policy_24.pdf",
    status: "archived",
    statusLabel: "Archived Permanently",
    hash: "0x82...99f1",
  },
//   {
//     id: "2",
//     name: "Family_Trust.pdf",
//     status: "processing",
//     statusLabel: "Processing...",
//     uploadProgress: 65,
//   },
];

export const SecureStorage = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("all");
  const [uploadDragActive, setUploadDragActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a1b16]">
      <div className="flex h-screen bg-[#0a1b16]">
        {/* Sidebar */}
        <div className="w-56 bg-[#0d1f1a] border-r border-[#1a3a35] flex flex-col">
          <div className="p-6 border-b border-[#1a3a35]">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#ff6600] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🛡️</span>
              </div>
              <div>
                <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                  CIP V
                </div>
                <div className="[font-family:'Noto_Sans',Helvetica] text-green-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Autonomys Network Connected
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {[
              { icon: "📊", label: "Overview", id: "overview" },
              { icon: "🎯", label: "Asset Selection", id: "asset-selection" },
              { icon: "👥", label: "Beneficiaries", id: "beneficiaries" },
              { icon: "🔒", label: "Security", id: "security" },
              { icon: "📊", label: "Reports", id: "reports" },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.id === "asset-selection" ? "/asset-selection" : "#"}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors block ${
                  item.id === "security"
                    ? "bg-[#1a4a3f] text-white"
                    : "text-[#7a9a8f] hover:bg-[#152f2a] hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="border-t border-[#1a3a35] p-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1a3a35]">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                👤
              </div>
              <div className="flex-1 min-w-0">
                <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xs truncate">
                  0x71...8BA2
                </div>
                <div className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-xs">
                  Connected
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-[#0d1f1a] border-b border-[#1a3a35] px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1a4a3f] rounded-lg flex items-center justify-center">
                  <span className="text-lg">🔐</span>
                </div>
                <div>
                  <div className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-sm">
                    Protocol
                  </div>
                  <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                    Secure Storage
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="px-3 py-2 rounded-lg bg-[#1a3a35] text-[#7a9a8f] [font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                  0x71...8BA2
                </div>
                <button className="w-10 h-10 rounded-full bg-[#1a4a3f] hover:bg-[#224a3f] flex items-center justify-center">
                  <span>⚙️</span>
                </button>
                <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  👤
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* Title Section */}
              <div className="space-y-4">
                <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl">
                  Secure Storage
                </h1>
                <p className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] max-w-2xl">
                  Your inheritance plans and legal documents are encrypted locally and permanently archived on the Autonomys distributed storage network.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-6">
                <Card className="bg-[#0d1f1a] border-[#1a3a35]">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🏛️</span>
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-sm">
                        Vault Status
                      </span>
                    </div>
                    <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-3xl">
                      Synced
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0d1f1a] border-[#1a3a35]">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📄</span>
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-sm">
                        Documents
                      </span>
                    </div>
                    <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-3xl">
                      12 Files
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0d1f1a] border-[#1a3a35]">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💾</span>
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-sm">
                        Storage Used
                      </span>
                    </div>
                    <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-3xl">
                      48 MB
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {/* Left Column - Files */}
                <div className="col-span-2 space-y-6">
                  {/* Tabs */}
                  <div className="flex items-center gap-6 border-b border-[#1a3a35]">
                    {[
                      { id: "all", label: "All Files", icon: "📄" },
                      { id: "shared", label: "Shared with Executor", icon: "👥" },
                      { id: "archived", label: "Archived Plans", icon: "📦" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 flex items-center gap-2 [font-family:'Noto_Sans',Helvetica] font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "text-green-400 border-b-2 border-green-400"
                            : "text-[#7a9a8f] hover:text-white border-b-2 border-transparent"
                        }`}
                      >
                        <span className="text-lg">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Documents List */}
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <Card key={doc.id} className="bg-[#0d1f1a] border-[#1a3a35] hover:border-[#2a5a4f] transition-colors">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-12 h-12 bg-[#1a3a35] rounded-lg flex items-center justify-center text-2xl mt-1">
                                {doc.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                                    {doc.name}
                                  </h3>
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 [font-family:'Noto_Sans',Helvetica] font-bold text-xs">
                                    🔒 Encrypted
                                  </Badge>
                                </div>
                                <div className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-xs space-y-1">
                                  <div>Last updated: {doc.lastUpdated} • Size: {doc.size}</div>
                                  <div className="flex items-center gap-2">
                                    <span>📍</span>
                                    <span>{doc.hash}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#1a3a35]">
                            <div className="flex items-center gap-3">
                              {doc.canShare && (
                                <button className={`flex items-center gap-1 px-3 py-1 rounded-lg [font-family:'Noto_Sans',Helvetica] text-xs font-medium transition-colors ${
                                  doc.shared
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-[#1a3a35] text-[#7a9a8f] hover:bg-[#2a5a4f] hover:text-white"
                                }`}>
                                  <span>👥</span>
                                  Share with Executor
                                </button>
                              )}
                              {doc.verifyIntegrity && (
                                <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500/20 text-green-400 [font-family:'Noto_Sans',Helvetica] text-xs font-medium hover:bg-green-500/30 transition-colors">
                                  <span>✓</span>
                                  Verify Integrity
                                </button>
                              )}
                            </div>
                            {doc.downloadReady && (
                              <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#1a3a35] text-white hover:bg-[#2a5a4f] [font-family:'Noto_Sans',Helvetica] text-xs font-bold transition-colors">
                                <Download className="w-4 h-4" />
                                Download
                              </button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Secure Upload */}
                  <Card className="bg-[#0d1f1a] border-[#1a3a35]">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white">
                          Secure Upload
                        </h3>
                        <Shield className="w-5 h-5 text-green-400" />
                      </div>

                      <div
                        onDragEnter={() => setUploadDragActive(true)}
                        onDragLeave={() => setUploadDragActive(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => setUploadDragActive(false)}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          uploadDragActive
                            ? "border-green-400 bg-green-400/10"
                            : "border-[#1a3a35] hover:border-[#2a5a4f]"
                        }`}
                      >
                        <div className="flex items-center justify-center mb-3">
                          <Upload className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="[font-family:'Noto_Sans',Helvetica] text-white text-sm font-bold">
                          Click to upload or drag and drop
                        </div>
                        <div className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-xs mt-1">
                          PDF, DOCX, PNG (Max 50MB)
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="bg-[#0d1f1a] border-[#1a3a35]">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                        Recent Activity
                      </h3>

                      <div className="space-y-3">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="bg-[#0a1b16] rounded-lg p-3 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-2 flex-1">
                                <div
                                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                    activity.status === "archived" ? "bg-green-400" : "bg-yellow-400"
                                  }`}
                                />
                                <div className="flex-1">
                                  <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xs">
                                    {activity.name}
                                  </div>
                                  <div
                                    className={`[font-family:'Noto_Sans',Helvetica] text-xs font-medium ${
                                      activity.status === "archived" ? "text-green-400" : "text-yellow-400"
                                    }`}
                                  >
                                    {activity.statusLabel}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right ml-2">
                                {activity.status === "processing" && (
                                  <div className="text-[#7a9a8f] [font-family:'Noto_Sans',Helvetica] text-xs">
                                    {activity.uploadProgress}%
                                  </div>
                                )}
                              </div>
                            </div>

                            {activity.status === "processing" ? (
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-[#1a3a35] rounded-full h-1 overflow-hidden">
                                    <div
                                      className="bg-green-400 h-full transition-all"
                                      style={{ width: `${activity.uploadProgress}%` }}
                                    />
                                  </div>
                                  <span className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-xs">
                                    {activity.uploadProgress}%
                                  </span>
                                </div>
                                {activity.id === "2" && (
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-xs">
                                        On-device encryption
                                      </span>
                                      <span className="[font-family:'Noto_Sans',Helvetica] text-green-400 text-xs font-bold">
                                        Done
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <div className="flex-1 bg-[#1a3a35] rounded-full h-1 overflow-hidden">
                                        <div className="bg-green-400 h-full w-full" />
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-xs">
                                        Broadcasting to DSN
                                      </span>
                                      <span className="[font-family:'Noto_Sans',Helvetica] text-green-400 text-xs font-bold">
                                        65%
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-xs">
                                Hash: {activity.hash}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 space-y-1">
                        <div className="[font-family:'Noto_Sans',Helvetica] text-green-400 text-xs font-bold flex items-center gap-1">
                          <span>ℹ️</span>
                          Zero-Knowledge Proof
                        </div>
                        <div className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-xs">
                          Your data integrity is mathematically verifiable at any time.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Footer Note */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="text-lg mt-0.5">🔐</div>
                  <div className="[font-family:'Noto_Sans',Helvetica] text-[#7a9a8f] text-sm">
                    <span className="text-white font-bold">Files are encrypted with your private key</span> before leaving this device. Only you can decrypt them.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
