import { CheckCircle2, Circle, FileText, Gavel, Plus } from "lucide-react";

export const SelectAcceptedDocs = (): JSX.Element => {
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
          <h1 className="text-4xl font-bold mb-3">Select Accepted Documents</h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
            Choose which official documents will be accepted as valid proof of
            death by the Health Oracle. You can select multiple options to
            provide flexibility for the verification process.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-300 text-sm font-medium">
              Step 3 of 5: Verification Proofs
            </h2>
            <span className="text-orange-500 text-sm font-semibold">
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

        <div className="grid grid-cols-3 gap-6 mb-12">
          <button className="border-2 border-orange-600 rounded-2xl p-8 text-left bg-gray-900/50 hover:bg-gray-900 transition relative cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <CheckCircle2 className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              Death Certificate
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Standard government-issued death certificate. The most common and
              widely accepted proof for executing inheritance protocols.
            </p>
          </button>

          <button className="border-2 border-orange-600 rounded-2xl p-8 text-left bg-gray-900/50 hover:bg-gray-900 transition relative cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <Gavel className="w-6 h-6 text-orange-500" />
              </div>
              <CheckCircle2 className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              Court Declaration
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Official court ruling declaring presumption of death. Required in
              special cases such as missing persons where no body is recovered.
            </p>
          </button>

          <button className="border-2 border-gray-800 rounded-2xl p-8 text-left bg-gray-900/50 hover:bg-gray-900 transition relative cursor-pointer opacity-60">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-gray-800/20 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-gray-600" />
              </div>
              <Circle className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-gray-500 font-bold text-lg mb-2">
              Hospital Record
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Certified medical record or verified physician's statement
              confirming time and cause of death. Useful for immediate triggers.
            </p>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition">
            Back
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition flex items-center gap-2">
            Confirm Selection
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};
