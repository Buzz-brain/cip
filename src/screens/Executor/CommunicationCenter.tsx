// import { useNavigate } from "react-router-dom";
import { Search, Send, Play, AlertTriangle, Lock } from "lucide-react";

export const CommunicationCenter = (): JSX.Element => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1410] text-white flex">
      {/* Sidebar */}
      <aside className="w-48 bg-[#0d0a08] border-r border-[#3a3430] flex flex-col">
        <div className="p-5 border-b border-[#3a3430]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <div className="text-sm font-semibold">CIP Executor</div>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-[#3a3430]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search plans or docs"
              className="w-full bg-[#2a2420] border border-[#3a3430] rounded-lg pl-10 pr-4 py-2 text-xs placeholder-gray-500"
            />
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-3">
            Threads
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white text-sm">
            <span>💬</span>
            <span>CIP Support</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white text-sm">
            <span>👥</span>
            <span>Beneficiaries</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white text-sm">
            <span>⚖️</span>
            <span>Legal Team</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500/20 text-orange-400 text-sm">
            <span>🔗</span>
            <span>Mediators</span>
            <span className="ml-auto bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              1
            </span>
          </button>
        </nav>

        <div className="p-4 border-t border-[#3a3430] space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-3">
            Private Notes
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white text-sm">
            <span>📝</span>
            <span>Tax Documents</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white text-sm">
            <span>🔐</span>
            <span>Key Shards (Encrypted)</span>
          </button>
        </div>

        <div className="p-4 border-t border-[#3a3430]">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Network Status</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Connected to CIP Mainnet</p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-[#1a1410]">
        <header className="border-b border-[#3a3430] bg-[#1a1410] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold">
                  Plan #8492 - Communication Center
                </h1>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                  Secure
                </span>
              </div>
              <p className="text-sm text-gray-400">
                End-to-End Encrypted Channel • Mediator Thread
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-white">
                <span>🔔</span>
              </button>
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          {/* Security Reminder */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 flex gap-4">
            <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Security Reminder</h3>
              <p className="text-sm text-gray-300">
                Do not share private keys in this chat. CIP Support will never
                ask for your seed phrase. All documents uploaded here are
                encrypted with your public key.
              </p>
              <button className="text-xs text-orange-400 hover:text-orange-300 mt-2">
                close
              </button>
            </div>
          </div>

          {/* Date Separator */}
          <div className="flex items-center justify-center">
            <span className="text-xs text-gray-500">Today, Oct 24</span>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {/* Sarah's message */}
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    Sarah Jenkins (Mediator)
                  </span>
                  <span className="text-xs text-gray-500">10:42 AM</span>
                </div>
                <p className="text-sm text-gray-300 bg-[#2a2420] rounded-lg p-3 w-fit">
                  Good morning. I've reviewed the preliminary asset list. We
                  still need the verified death certificate to proceed with the
                  release of the multi-sig funds.
                </p>
              </div>
            </div>

            {/* Executor's message */}
            <div className="flex gap-3 justify-end">
              <div className="flex-1 flex justify-end">
                <div>
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="text-xs text-gray-500">10:45 AM</span>
                    <span className="font-medium text-sm">Executor (Me)</span>
                  </div>
                  <div className="space-y-2 w-fit">
                    <p className="text-sm text-white bg-orange-500 rounded-lg p-3">
                      I've just uploaded the death certificate. Can you verify
                      it? It is a high-res scan of the original.
                    </p>
                    <div className="bg-orange-500 rounded-lg p-3 flex items-center gap-3 w-fit">
                      <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center">
                        <span>📄</span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">
                          Death_Certificate_v1.pdf
                        </div>
                        <div className="text-xs text-orange-100">
                          2.4 MB • Encrypted
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex-shrink-0"></div>
            </div>

            {/* Sarah's message with audio */}
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    Sarah Jenkins (Mediator)
                  </span>
                  <span className="text-xs text-gray-500">10:52 AM</span>
                </div>
                <div className="bg-[#2a2420] rounded-lg p-3 w-fit flex items-center gap-3">
                  <button className="w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-white" />
                  </button>
                  <div className="flex items-center gap-1">
                    <div className="h-8 w-16 bg-[#3a3430] rounded flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-2 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-4 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-4 bg-gray-500 rounded-full"></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">0:45</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System message */}
            <div className="flex items-center justify-center">
              <span className="text-xs text-gray-500 bg-[#2a2420] px-3 py-1 rounded-full">
                <Lock className="w-3 h-3 inline mr-1" />
                Keys re-negotiated successfully. Session secure.
              </span>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-[#3a3430] bg-[#1a1410] px-8 py-4">
          <div className="flex items-end gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-[#2a2420] border border-[#3a3430] rounded-lg px-4 py-3 text-sm placeholder-gray-500"
            />
            <button className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Messages are encrypted with AES-256. Only participants with keys can
            decrypt.
          </p>
        </div>
      </main>

      {/* Right Sidebar - Activity Log & Participants */}
      <aside className="w-64 bg-[#0d0a08] border-l border-[#3a3430] flex flex-col">
        <div className="border-b border-[#3a3430] p-4">
          <h3 className="text-sm font-semibold mb-4">Activity Log</h3>
          <div className="space-y-3">
            <div className="pb-3 border-b border-[#3a3430]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-xs font-medium">Today, 11:00 AM</span>
              </div>
              <p className="text-xs text-gray-300">Document Uploaded</p>
              <p className="text-xs text-gray-500">
                Executor uploaded 'Death_Certificate_v1.pdf' to IPFS.
              </p>
              <p className="text-xs text-gray-600 mt-1">Hash: 0x6f82...3e1</p>
            </div>

            <div className="pb-3 border-b border-[#3a3430]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className="text-xs font-medium">Today, 10:42 AM</span>
              </div>
              <p className="text-xs text-gray-300">Login Verified</p>
              <p className="text-xs text-gray-500">
                Login from IP 192.168.1.1 verified via 2FA.
              </p>
            </div>

            <div className="pb-3 border-b border-[#3a3430]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-xs font-medium">Oct 23, 09:15 AM</span>
              </div>
              <p className="text-xs text-gray-300">MPC Key Generated</p>
              <p className="text-xs text-gray-500">
                New signing session initialized by Legal Backup.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="text-xs font-medium">Oct 23, 09:15 AM</span>
              </div>
              <p className="text-xs text-gray-300">Plan Accessed</p>
              <p className="text-xs text-gray-500">
                Sarah Jenkins viewed 'Asset Schedule A'.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 border-b border-[#3a3430]">
          <h3 className="text-sm font-semibold mb-4">
            Participants in this Thread
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <div>
                  <div className="text-xs font-medium">Sarah J.</div>
                  <div className="text-xs text-gray-400">Mediator • Online</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">⋮</button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"></div>
                <div>
                  <div className="text-xs font-medium">Legal Team</div>
                  <div className="text-xs text-gray-400">Offline • 2w ago</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">⋮</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
