import { Search, ChevronRight, Bell, User } from "lucide-react";
import { useState } from "react";

interface AllCasesProps {
  onCaseCreated?: (caseId: string) => void;
  onBackToDashboard?: () => void;
}

const caseFilesData = [
  {
    id: 1,
    name: "Death Certificate.pdf",
    uploadedBy: "Executor",
    uploadedTime: "2 days ago",
    type: "pdf",
    image:
      "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Last Will & Testament",
    uploadedBy: "Protocol",
    uploadedTime: "Automated",
    type: "document",
    image:
      "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Bank Statement (Oct)",
    uploadedBy: "Beneficiary A",
    uploadedTime: "Automated",
    type: "document",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Email Logs #002",
    uploadedBy: "Beneficiary B",
    uploadedTime: "Automated",
    type: "mail",
    image:
      "https://images.unsplash.com/photo-1555421692-202b3d63b48f?w=400&h=300&fit=crop",
  },
];

export const AllCases = ({ onCaseCreated = () => {}, onBackToDashboard = () => {} }: AllCasesProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewSmartContract = () => {
    onCaseCreated("#8821");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-amber-900/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-900/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      <header className="relative z-20 bg-zinc-900/50 backdrop-blur-xl border-b border-zinc-800 sticky top-0">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white text-lg font-semibold">
              CIP Protocol
            </span>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Global search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <nav className="flex items-center gap-6 mr-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium"
            >
              Cases
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Governance
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1">
              <span className="text-orange-400 text-xs font-medium">
                0x4a...8B2
              </span>
            </div>
            <button className="relative p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
            <button className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex">
        <aside className="w-48 bg-zinc-900/50 backdrop-blur-xl border-r border-zinc-800 p-6">
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Dispute Queue
            </h3>
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-500 font-medium transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  📁
                </span>
                All Cases
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  👤
                </span>
                <span className="flex-1 text-left">My Assigned</span>
                <span className="text-xs bg-zinc-800 px-2 py-1 rounded">3</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  ⏳
                </span>
                Pending Review
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  🗳
                </span>
                Voting Open
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  ✓
                </span>
                Resolved
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Analytics
            </h3>
            <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
              <p className="text-xs text-gray-400 mb-1">Total Value Secured</p>
              <p className="text-2xl font-bold text-white mb-2">$42.8M</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span>↗</span>
                +23.4% this week
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <a
                href="#"
                onClick={onBackToDashboard}
                className="hover:text-white transition-colors"
              >
                Dispute Queue
              </a>
              <ChevronRight className="w-4 h-4" />
              <span>Case #8821</span>
            </div>

            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-white">
                      Case #8821: Estate of J. Doe
                    </h1>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-orange-500 rounded-full" />
                      Ethereum Chain
                    </span>
                    <span>•</span>
                    <span>Value: $1,250,000 (USDC)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white hover:bg-zinc-700 transition-colors">
                  <span>📤</span>
                  Share
                </button>
                <button
                  onClick={handleViewSmartContract}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-colors font-medium"
                >
                  <span>🔗</span>
                  View Smart Contract
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/30 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded">
                  Voting Open
                </span>
                <span className="text-xs text-gray-400">48h</span>
              </div>
            </div>
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Total Asset Value</p>
              <p className="text-2xl font-bold text-white">$1,250,000</p>
              <p className="text-xs text-gray-500">Ethereum Chain</p>
            </div>
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Time Remaining</p>
              <p className="text-2xl font-bold text-white">48h</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>📁</span>
                    Case Files & Evidence
                  </h2>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                      <span>≣</span>
                    </button>
                    <button className="text-orange-500 text-sm hover:text-orange-400 transition-colors">
                      list
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {caseFilesData.map((file) => (
                  <div
                    key={file.id}
                    className="bg-zinc-800/50 border border-zinc-700 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors cursor-pointer group"
                  >
                    <div className="relative w-full h-32 overflow-hidden">
                      <img
                        src={file.image}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-white font-medium mb-1">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Uploaded by {file.uploadedBy} • {file.uploadedTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-800/30 border border-dashed border-zinc-700 rounded-lg p-8 text-center">
                <p className="text-orange-500 text-sm mb-2">add</p>
                <p className="text-gray-400 text-sm">Request Additional File</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-2">2 hours ago</p>
                  <p className="text-sm text-gray-300">
                    <span className="text-orange-400 font-medium">
                      Mediator @CryptoLawyer
                    </span>{" "}
                    requested additional documentation.
                  </p>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-2">1 day ago</p>
                  <p className="text-sm text-gray-300">
                    <span className="text-green-400 font-medium">
                      Beneficiary @AliceDoe
                    </span>{" "}
                    submitted new evidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
