import { CheckCircle2, FileText, Lock } from "lucide-react";

export const ConfirmHealthOraclePlan = (): JSX.Element => {
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
          <a
            href="#"
            className="text-gray-400 hover:text-gray-300 text-sm font-semibold"
          >
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

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Confirm Health Oracle Plan
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
            Review the details below carefully. Confirm the creation of your
            Health / Death Oracle plan with assigned executor, accepted
            documents, and jurisdiction settings.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400 text-sm font-medium">
              Step 5 of 5: Final Confirmation
            </span>
            <span className="text-orange-500 font-semibold text-sm ml-auto">
              100% Completed
            </span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-600 h-full rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 space-y-6">
            <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-white font-bold text-lg mb-2">
                    Health / Death Oracle Plan
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    This plan utilizes privacy-preserving TEE oracles to verify
                    status. Assets are released upon cryptographic verification
                    of official death certificates or prolonged inactivity.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  ⟫ Ethereum Mainnet
                </span>
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-600/40 flex items-center gap-1">
                  ✓ Audited Contract
                </span>
              </div>
            </div>

            <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900/50">
              <h2 className="text-white font-bold text-lg mb-8">
                Configuration & Settings
              </h2>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">
                    Designated Executor
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600"></div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        0x71C...9A23
                      </p>
                      <p className="text-green-500 text-xs mt-1">
                        ✓ Verified Identity
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">
                    Oracle Provider
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center font-semibold text-sm">
                      CL
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        Chainlink + TEE
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Redundant Verification
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-800">
                <div>
                  <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    Beneficiaries
                  </h3>
                  <p className="text-white font-semibold mb-1">
                    4 Wallets Configured
                  </p>
                  <p className="text-gray-500 text-xs">
                    Distribution: 25% / 25% / 25% / 25%
                  </p>
                </div>

                <div>
                  <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    Legal Jurisdiction
                  </h3>
                  <p className="text-white font-semibold mb-1">Delaware, USA</p>
                  <p className="text-gray-500 text-xs">
                    Dispute Window: 90 Days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900/50">
              <h2 className="text-white font-bold mb-6">Accepted Documents</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                  <FileText className="w-5 h-5 text-red-500" />
                  <span className="text-white text-sm font-medium flex-1">
                    Last_Will_Final.pdf
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                  <FileText className="w-5 h-5 text-red-500" />
                  <span className="text-white text-sm font-medium flex-1">
                    Health_Directive.pdf
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-yellow-600" />
                  <span className="text-white text-sm font-medium flex-1">
                    Asset_Manifest.csv
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
              </div>
            </div>

            <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900/50">
              <h2 className="text-white font-bold mb-6">Transaction Summary</h2>
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    Network Fee (Est.)
                  </span>
                  <span className="text-white font-semibold text-sm">
                    0.0045 ETH
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Protocol Fee</span>
                  <span className="text-white font-semibold text-sm">
                    0.02 ETH
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-white font-semibold">Total</span>
                <span className="text-white font-bold text-lg">0.0245 ETH</span>
              </div>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition">
                Sign & Create Plan
              </button>
              <p className="text-gray-500 text-xs mt-4 leading-relaxed">
                By signing, you agree to the Terms of Service and initiate the
                on-chain contract creation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition">
            Back to Edit
          </button>
          <span className="text-gray-500 text-xs">
            <span className="inline-block mr-1">🔒</span>
            End-to-End Secure Transaction
          </span>
        </div>
      </main>
    </div>
  );
};
