import { ChevronRight } from "lucide-react";

export const SelectJurisdiction = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#1a1410] text-white">
      <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold">C</span>
          </div>
          <span className="text-sm font-semibold">CIP Protocol</span>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Dashboard
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Compliance Checker
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Assets
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Settings
          </a>
          <div className="w-9 h-9 bg-gray-400 rounded-full"></div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-400 text-sm font-medium">
              Step 2 of 4: Jurisdiction Setup
            </h2>
            <span className="text-gray-500 text-sm">50%</span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-600 h-full rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Select Your Jurisdiction</h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
            Ensure your inheritance plan complies with local regulations.
            Accuracy here ensures your plan holds up in court. We use this data
            strictly for generating legal templates.
          </p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-8">
          <div className="flex gap-8 items-start">
            <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Map"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-orange-500 text-sm font-semibold mb-3">
                Auto-detection found
              </h3>
              <p className="text-white font-medium mb-2">
                We detected your IP location as{" "}
                <span className="text-orange-400">New York, United States</span>
                . Would you like to use this information to populate the form
                below?
              </p>
              <div className="flex gap-3 mt-4">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition">
                  Confirm & Populate
                </button>
                <button className="bg-transparent border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-2 rounded-lg font-medium text-sm transition">
                  No, I'll enter manually
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <div className="mb-8">
            <label className="block text-white font-semibold mb-3">
              Primary Country of Residence
            </label>
            <input
              type="text"
              placeholder="Nigeria"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-600"
            />
            <p className="text-gray-600 text-xs mt-2">
              The country where you spend the majority of your time (183+
              days/year).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-white font-semibold mb-3">
                State / Province / Region
              </label>
              <input
                type="text"
                placeholder="Abuja"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-600"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-3">
                Tax Residency
              </label>
              <input
                type="text"
                placeholder="Ogigba"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-600"
              />
            </div>
          </div>

          <p className="text-gray-600 text-xs mt-8">
            <span className="inline-block mr-2">🔒</span>
            Your location data is encrypted locally and is not broadcast
            on-chain until final confirmation.
          </p>
        </div>

        <div className="flex items-center justify-between mt-12">
          <button className="text-gray-400 hover:text-gray-300 font-medium text-sm">
            Skip for now
          </button>
          <div className="flex gap-3">
            <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition">
              Back
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition flex items-center gap-2">
              Save & Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-xs mt-12">
          Disclaimer: This tool provides guidance based on open inheritance
          protocols but does not constitute professional legal advice. Consult a
          qualified attorney for your specific situation.
        </p>
      </main>
    </div>
  );
}
