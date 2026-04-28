import { ShieldCheck, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Sidebar removed — layout provides it
export const UploadSignedDoc = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#1a1410] text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent opacity-50"></div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-950/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-950/20 rounded-full blur-3xl"></div>
      </div>

      <div className="px-8 py-12">
        <div className="max-w-2xl w-full">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-3">Legal Compliance Check</h1>
            <p className="text-gray-400 text-base">
              Ensure your inheritance plan complies with local regulations and legal requirements.
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

            <h2 className="text-2xl font-bold mb-4">Action Required: Jurisdiction Check</h2>

            <p className="text-gray-300 text-base leading-relaxed mb-8">
              Your jurisdiction requires additional legal verification. Upload your signed estate document to make this plan legally enforceable
            </p>

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition mb-4 flex items-center justify-center gap-2 text-base">
              <span>⬇</span>
              Upload Signed Document
            </button>

            <button className="w-full bg-transparent border border-orange-900/50 hover:border-orange-700 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-base mb-8">
              View Legal Requirements
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              className="text-orange-500 hover:text-orange-400 text-sm font-medium transition"
              onClick={() => navigate(-1)}
            >
              Remind me later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
