import { ChevronRight, Info } from "lucide-react";

export const AssignHealthOracleExec = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#1a1410] text-white">
      <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold">I</span>
          </div>
          <span className="text-sm font-semibold">Inheritance Protocol</span>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Dashboard
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Create Plan
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            My Plans
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Settings
          </a>
          <div className="w-9 h-9 bg-gray-400 rounded-full"></div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Assign Health Oracle Executor
          </h1>
          <p className="text-gray-400 text-base">
            Executes inheritance only after verified proof of death. Uses
            confidential verification (iExec / Secret AI vision).
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-300 text-sm font-medium">
              Step 2 of 5: Executor Setup
            </h2>
            <span className="text-orange-500 text-sm font-semibold">
              40% Completed
            </span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-600 h-full rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-orange-900/40 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">C</span>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Executor Role</h3>
              <p className="text-gray-400 text-sm mb-3">
                This person is responsible for uploading the death certificate
                to verify the trigger condition.
              </p>
              <p className="text-white font-semibold text-sm">
                They cannot access funds. Their role is strictly administrative
                and non-custodial.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white font-bold text-lg">Designate Executor</h2>
            <span className="bg-red-600/20 border border-red-600/40 text-red-400 px-3 py-1 rounded text-xs font-medium">
              Required
            </span>
          </div>

          <p className="text-gray-400 text-sm mb-8">
            Provide details for the person trusted to activate this protocol.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white font-semibold mb-3 text-sm">
                Executor Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-600 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-3 text-sm">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. jane@example.com"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-600 placeholder-gray-600"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-3 text-sm">
              Wallet Address
            </label>
            <input
              type="text"
              placeholder="0x..."
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-600 placeholder-gray-600"
            />
          </div>

          <div className="flex items-start gap-2 text-gray-500 text-xs">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              This wallet will be whitelisted to interact with the verification
              oracle smart contract.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-12">
          <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition">
            Back
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition flex items-center gap-2">
            Confirm Executor
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};
