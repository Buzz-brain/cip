// import { useNavigate } from "react-router-dom";
import { Lock, Bell, AlertTriangle } from "lucide-react";

export const SettingsAndSecurity = (): JSX.Element => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1410] text-white flex">
      {/* Sidebar */}
      <aside className="w-48 bg-[#0d0a08] border-r border-[#3a3430] flex flex-col">
        <div className="p-5 border-b border-[#3a3430]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold">CIP Executor Portal</span>
          </div>
        </div>

        <div className="p-4 border-b border-[#3a3430] space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
            <div>
              <div className="text-sm font-medium">Alex Sterling</div>
              <div className="text-xs text-gray-400">Executor ID: #8821</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white text-sm">
            <span>⚙️</span>
            <span>General</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500/20 text-orange-400 text-sm">
            <Lock className="w-4 h-4" />
            <span>Security</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white text-sm">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2420] hover:text-white text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Danger Zone</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="border-b border-[#3a3430] bg-[#1a1410] px-8 py-4 flex items-center justify-between">
          <div></div>
          <nav className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white text-sm">
              Dashboard
            </button>
            <button className="text-gray-400 hover:text-white text-sm">
              Plans
            </button>
            <button className="text-gray-400 hover:text-white text-sm">
              Vault
            </button>
            <button className="text-gray-400 hover:text-white text-sm">
              Settings
            </button>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </nav>
        </header>

        <div className="p-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings & Security</h1>
            <p className="text-gray-400">
              Manage your executor profile, security credentials, and protocol
              safeguards.
            </p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-green-400">KYC Verified</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-3 py-1 rounded-full text-sm">
              <span>🔑</span>
              <span className="text-orange-400">MPC Signer</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Executor Identity Card */}
            <div className="col-span-2 bg-[#2a2420] border border-[#3a3430] rounded-xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Executor Identity
                  </h2>
                </div>
                <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                  Edit Profile
                </button>
              </div>

              <div className="flex gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">
                        Legal Name
                      </div>
                      <div className="text-sm font-medium">Alex Sterling</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">
                        Jurisdiction
                      </div>
                      <div className="text-sm font-medium">New York, USA</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-gray-400 text-xs mb-1">
                      Connected Wallet
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">0x71C...9A2F</span>
                      <button className="text-gray-400 hover:text-white">
                        <span>📋</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Protocols Card */}
            <div className="bg-[#3a2420] border border-red-500/30 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h2 className="text-lg font-bold text-red-400">
                  Emergency Protocols
                </h2>
              </div>
              <div className="text-xs text-red-400 uppercase tracking-wider mb-6">
                CRITICAL ACTIONS ZONE
              </div>

              <button className="w-full border-2 border-red-500 hover:bg-red-500/10 text-red-400 px-4 py-2 rounded-lg font-medium mb-4">
                Pause All Plans
              </button>
              <p className="text-xs text-gray-400 mb-6">Instant Freeze</p>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center gap-2 p-3 bg-[#2a2420] hover:bg-[#3a3430] rounded-lg">
                  <span className="text-2xl">🔄</span>
                  <span className="text-xs font-medium">Rotate MPC Share</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-[#2a2420] hover:bg-[#3a3430] rounded-lg">
                  <span className="text-2xl">🚨</span>
                  <span className="text-xs font-medium">Report Fraud</span>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                These actions are logged on-chain and cannot be undone without
                multisig approval.
              </p>
            </div>
          </div>

          {/* Access & Authentication Section */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6 mt-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Access & Authentication
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-xs text-gray-400">
                      Secure your account with Authenticator app
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-orange-500 rounded-full relative flex items-center justify-end pr-1 cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Backup Executor Section */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6 mt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span>👥</span>
                  Backup Executor
                </h2>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Designate a secondary wallet or ENS as a fallback. This person
              gains control if your account is inactive for 12 months.
            </p>

            <div className="bg-[#3a3430] border border-[#4a4430] rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">No Backup Assigned</span>
                <span className="text-orange-400 text-xs font-medium">
                  Action Recommended
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="0x... or name.eth"
                className="flex-1 bg-[#3a3430] border border-[#4a4430] rounded-lg px-4 py-2 text-sm placeholder-gray-500"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
                Assign
              </button>
            </div>
          </div>

          {/* Recovery Options Section */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-6">Recovery Options</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Recovery Email
                </label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="alex.sterling@CIP.io"
                    className="flex-1 bg-[#2a2420] border border-[#3a3430] rounded-lg px-4 py-2 text-sm"
                  />
                  <button className="text-orange-400 hover:text-orange-300 font-medium text-sm">
                    Verify
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Recovery Phone
                </label>
                <div className="flex gap-3">
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="flex-1 bg-[#2a2420] border border-[#3a3430] rounded-lg px-4 py-2 text-sm"
                  />
                  <button className="text-orange-400 hover:text-orange-300 font-medium text-sm">
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences Section */}
          <div className="bg-[#2a2420] border border-[#3a3430] rounded-xl p-6 mt-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Plan Activations</div>
                  <p className="text-xs text-gray-400">
                    Alerts when triggers are met
                  </p>
                </div>
                <div className="w-12 h-6 bg-orange-500 rounded-full relative flex items-center justify-end pr-1">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="border-t border-[#3a3430] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Document Uploads</div>
                    <p className="text-xs text-gray-400">
                      Notify when beneficiaries upload files
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-gray-600 rounded-full relative flex items-center justify-start pl-1">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#3a3430] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Tax Workflows</div>
                    <p className="text-xs text-gray-400">
                      Deadlines and submission updates
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-orange-500 rounded-full relative flex items-center justify-end pr-1">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-[#3a3430] bg-[#1a1410] px-8 py-4 text-center text-xs text-gray-500 mt-8">
          © 2024 CIP Protocol. All rights reserved. Privacy Policy • Terms of
          Service
        </footer>

        <div className="text-xs text-gray-600 px-8 py-2">
          Last Login: Oct 24, 09:41 AM
          <br />
          Session ID: 192.168.1.1
        </div>
      </main>
    </div>
  );
};
