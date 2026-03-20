import {
  Bell,
  Search,
  CheckCircle2,
  Clock,
  Zap as ZapIcon,
} from "lucide-react";

export const Notifications = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex min-h-screen">
        <aside className="w-48 bg-[#1a1a1a] border-r border-gray-800 p-6 flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center">
                <span className="text-sm font-bold">C</span>
              </div>
              <span className="text-sm font-semibold">CIP Protocol</span>
            </div>
            <p className="text-xs text-gray-500">Secure Multi-Chain Legacy</p>
          </div>

          <nav className="space-y-1 flex-1">
            <div className="bg-orange-600/10 border-l-2 border-orange-600 px-4 py-2.5 rounded-r">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>📊</span>
                Dashboard
              </div>
            </div>
            <div className="text-gray-500 px-4 py-2.5 hover:text-gray-300 cursor-pointer text-sm flex items-center gap-2">
              <span>➕</span>
              Create Plan
            </div>
            <div className="text-gray-500 px-4 py-2.5 hover:text-gray-300 cursor-pointer text-sm flex items-center gap-2">
              <span>👥</span>
              Beneficiaries
            </div>
            <div className="text-gray-500 px-4 py-2.5 hover:text-gray-300 cursor-pointer text-sm flex items-center gap-2">
              <span>📦</span>
              Asset Registry
            </div>

            <div className="pt-6 mt-6 border-t border-gray-800">
              <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">
                SYSTEM
              </p>
              <div className="text-gray-500 px-4 py-2.5 hover:text-gray-300 cursor-pointer text-sm flex items-center gap-2">
                <span>⚙️</span>
                Settings
              </div>
              <div className="text-gray-500 px-4 py-2.5 hover:text-gray-300 cursor-pointer text-sm flex items-center gap-2">
                <span>❓</span>
                Support
              </div>
            </div>
          </nav>

          <div className="bg-gray-800/50 rounded-lg p-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-xs font-bold text-black">
              A
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">alex.eth</p>
              <p className="text-xs text-gray-500 truncate">Online</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
          <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Bell className="w-4 h-4" />
                <span className="text-sm">Alerts</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300" />
              <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300" />
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                New Plan
              </button>
            </div>
          </header>

          <div className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-gray-400">
                Manage your protocol alerts and critical actions.
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <button className="text-orange-500 font-semibold text-sm border-b-2 border-orange-500 pb-2">
                All Alerts
              </button>
              <button className="text-gray-400 hover:text-gray-300 text-sm flex items-center gap-1">
                <span className="w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  2
                </span>
                Action Required
              </button>
              <button className="text-gray-400 hover:text-gray-300 text-sm">
                Informational
              </button>
              <div className="ml-auto">
                <a
                  href="#"
                  className="text-orange-500 text-sm hover:text-orange-600"
                >
                  Mark all as read
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-500 text-sm">≈</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">
                      MPC Approval Request{" "}
                      <span className="inline-block w-2 h-2 bg-orange-500 rounded-full ml-2"></span>
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Wallet 0x7a...4B21 requires your signature for transaction
                      #8821 on Ethereum Mainnet.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">2 mins ago</p>
                  </div>
                </div>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ml-4 transition">
                  Sign Now
                </button>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ZapIcon className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">
                      Inactivity Trigger Activated{" "}
                      <span className="inline-block w-2 h-2 bg-orange-500 rounded-full ml-2"></span>
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Dead Man's Switch condition met. 24h cooling period
                      started before plan execution.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">4 hours ago</p>
                  </div>
                </div>
                <button className="bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ml-4 transition">
                  Verify Status
                </button>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">
                      Plan Executed Successfully
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Assets from 'Family Trust' vault transferred to
                      Beneficiary A (0x93...22ae).
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      Yesterday at 5:30 PM
                    </p>
                  </div>
                </div>
                <button className="text-gray-300 px-4 py-2 text-sm font-medium whitespace-nowrap ml-4">
                  View Details
                </button>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-8 h-8 bg-gray-700/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">
                      New Device Login
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Login detected from Mac OS X (Chrome) in Lisbon, Portugal.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">2 days ago</p>
                  </div>
                </div>
                <button className="text-gray-400 text-xs hover:text-gray-300 ml-4">
                  close
                </button>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-400 text-sm">✦</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">
                      Feature Update: Polygon Support
                    </h3>
                    <p className="text-gray-400 text-sm">
                      You can now create inheritance plans for assets on the
                      Polygon network.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">3 days ago</p>
                  </div>
                </div>
                <button className="text-gray-300 px-4 py-2 text-sm font-medium whitespace-nowrap ml-4">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
