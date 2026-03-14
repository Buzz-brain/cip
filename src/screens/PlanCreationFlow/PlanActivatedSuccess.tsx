import { useNavigate } from "react-router-dom";
import { CircleCheck as CheckCircle } from "lucide-react";

export const PlanActivatedSuccess = (): JSX.Element => {
  const navigate = useNavigate();

  const handleViewPlans = () => {
    navigate("/dashboard");
  };

  const handleReturnDashboard = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0d0501]">
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-white font-semibold">CIP Protocol</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
            Dashboard
          </span>
          <span className="text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
            My Plans
          </span>
          <span className="text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
            Settings
          </span>
          <div className="flex items-center gap-3 px-4 py-2 bg-orange-600 rounded-lg">
            <span className="text-white text-sm font-semibold">0x71c...9a21</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">J</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-2xl w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-12 border border-gray-700 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full border-4 border-orange-600 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <CheckCircle className="w-20 h-20 text-orange-600" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white text-center mb-4">Plan Activated Successfully</h1>

          <p className="text-gray-300 text-center text-lg mb-8">
            Your inheritance plan has been secured on-chain. The smart contract has been deployed and assets are now
            monitored.
          </p>

          <div className="bg-gray-800 rounded-lg p-4 mb-8">
            <div className="text-gray-400 text-sm mb-2">REFERENCE ID</div>
            <div className="flex items-center gap-4">
              <span className="text-white text-xl font-semibold font-mono">#CIP-8354-JD</span>
              <button className="text-orange-600 hover:text-orange-500 transition-colors">
                <span className="text-lg">📋</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-gray-400 text-xs font-semibold mb-2">TRIGGER MECHANISM</div>
              <div className="text-white font-semibold text-lg mb-1">Inactivity Monitor(12 Months)</div>
              <div className="text-gray-400 text-sm">Dead Man's Switch</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-gray-400 text-xs font-semibold mb-2">ASSETS INCLUDED</div>
              <div className="text-white font-semibold text-lg mb-1">12 Assets</div>
              <div className="text-gray-400 text-sm">(ETH, SOL, USDC)</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-gray-400 text-xs font-semibold mb-2">MAIN BENEFICIARY</div>
              <div className="text-white font-semibold text-lg font-mono">0x71c...9a21</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-gray-400 text-xs font-semibold mb-2">SECURITY LEVEL</div>
              <div className="text-white font-semibold text-lg">AES-256 ENCRYPTED</div>
            </div>
          </div>

          <div className="text-center text-gray-400 text-xs mb-8">
            <div className="flex items-center justify-center gap-2">
              <span>Creation Timestamp</span>
              <span className="text-orange-600">Oct 24, 2025</span>
              <span className="text-orange-600">14:32:01 UTC</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleViewPlans}
              className="flex-1 bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold py-4 rounded-lg"
            >
              View my Plans
            </button>
            <button
              onClick={handleReturnDashboard}
              className="flex-1 border border-gray-600 text-white hover:bg-gray-900 transition-colors font-semibold py-4 rounded-lg"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 px-8 py-6">
        <div className="flex items-center justify-center gap-4 text-gray-400 text-xs">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">
            Smart Contract Audit
          </a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">
            Documentation
          </a>
          <span className="ml-4">© AI Systems Operational</span>
          <span>—</span>
          <span>2025 Multi-Chain Inheritance Protocol. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};
