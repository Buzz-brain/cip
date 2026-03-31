import { ShieldCheck, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UploadSignedDoc = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#1a1410] text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent opacity-50"></div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-950/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-950/20 rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-10 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold">C</span>
          </div>
          <span className="text-sm font-semibold">CIP Protocol</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">Step 3 of 5</span>
          <button className="text-gray-400 hover:text-gray-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-73px)] px-8 py-12">
        <div className="max-w-2xl w-full">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-3">Legal Compliance Check</h1>
            <p className="text-gray-400 text-base">
              Ensure your inheritance plan complies with local regulations and
              legal requirements.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-orange-900/30 rounded-3xl p-12 text-center backdrop-blur-sm">
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 border-2 border-orange-600/40 rounded-full"></div>
                <div className="absolute inset-2 border border-orange-600/20 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              Action Required: Jurisdiction Check
            </h2>

            <p className="text-gray-300 text-base leading-relaxed mb-8">
              Your jurisdiction requires additional legal verification. Upload
              your signed estate document to make this plan legally enforceable
            </p>

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition mb-4 flex items-center justify-center gap-2 text-base">
              <span>⬇</span>
              Upload Signed Document
            </button>

            <button className="w-full bg-transparent border border-orange-900/50 hover:border-orange-700 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-base mb-8">
              View Legal Requirements
              <ExternalLink className="w-4 h-4" />
            </button>

            <button className="text-orange-500 hover:text-orange-400 text-sm font-medium transition" onClick={() => navigate(-1)}>
              Remind me later
            </button>
          </div>
        </div>
      </main>

      <aside className="fixed left-0 top-0 w-96 h-screen bg-gradient-to-r from-gray-900/80 to-transparent border-r border-gray-800 p-8 overflow-y-auto pointer-events-none opacity-30">
        <div className="space-y-8">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">
              Setup Progress
            </p>
            <div className="space-y-3">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-orange-600 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-600">
                Step 3 complete, 2 remaining
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">
              Requirements Status
            </p>
            <div className="space-y-2 text-xs">
              <div className="text-green-500">✓ Jurisdiction Passed</div>
              <div className="text-gray-500">Identity Verified</div>
              <div className="text-gray-500">Will Uploaded</div>
              <div className="text-gray-500">Beneficiary Registered</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
