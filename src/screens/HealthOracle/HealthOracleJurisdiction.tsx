import { ChevronDown, Shield, Info } from "lucide-react";

export const HealthOracleJurisdiction = (): JSX.Element => {
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

      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Health Oracle Jurisdiction
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
            Select the relevant legal jurisdiction for your health and death
            verification documents. This ensures the Oracle applies the correct
            validation standards.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-orange-500 font-semibold text-sm">
              Step 3 of 5
            </span>
            <span className="text-gray-600 text-sm">
              Jurisdiction Selection
            </span>
            <span className="text-orange-500 font-semibold text-sm ml-auto">
              60% Completed
            </span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-600 h-full rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="col-span-2 space-y-8">
            <div>
              <label className="block text-white font-semibold mb-3 text-sm">
                Country / Region
              </label>
              <button className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-left text-gray-400 text-sm focus:outline-none focus:border-orange-600 flex items-center justify-between hover:border-gray-700 transition">
                <span>Select Country</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex items-start gap-2 mt-3 text-gray-500 text-xs">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  The oracle will configure document parsers based on the
                  selected region's legal standards.
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm">
                Quick Select
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="border border-gray-800 rounded-lg p-6 text-center hover:border-gray-700 transition">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌎</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    North America
                  </h4>
                  <p className="text-gray-500 text-xs">US, CA, MX</p>
                </button>

                <button className="border border-gray-800 rounded-lg p-6 text-center hover:border-gray-700 transition">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Europe (EEA)
                  </h4>
                  <p className="text-gray-500 text-xs">EU, UK, CH</p>
                </button>

                <button className="border border-gray-800 rounded-lg p-6 text-center hover:border-gray-700 transition">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌏</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Asia Pacific
                  </h4>
                  <p className="text-gray-500 text-xs">SG, JP, AU</p>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <h3 className="text-white font-semibold">Legal Standards</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Document formats for proof-of-death (e.g., Death Certificates,
                Coroner Reports) vary significantly by region.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Selecting the correct jurisdiction allows our TEE (Trusted
                Execution Environment) nodes to accurately verify authenticity
                features like watermarks and government seals.
              </p>
            </div>

            <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <h3 className="text-white font-semibold">Privacy Protected</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your jurisdiction selection is used strictly for document
                validation logic and is not publicly revealed on the blockchain.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-12">
          <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition">
            Back
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition flex items-center gap-2">
            Continue to Triggers
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  );
};
