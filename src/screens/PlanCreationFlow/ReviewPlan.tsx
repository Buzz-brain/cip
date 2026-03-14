// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../../components/ui/checkbox";
import { TriangleAlert as AlertTriangle, Download } from "lucide-react";

export const ReviewPlan = (): JSX.Element => {
  const navigate = useNavigate();
  // const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBack = () => {
    navigate("/philanthropy-plan");
  };

  const handleConfirmSign = () => {
    navigate("/plan-activated", {
      state: {
        referenceId: "#CIP-8354-JD",
        triggerMechanism: "Inactivity Monitor (12 Months)",
        assetsIncluded: "12 Assets (ETH, SOL, USDC)",
        mainBeneficiary: "0x71c...9a21",
        securityLevel: "AES-256 ENCRYPTED",
      },
    });
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
          <span className="text-gray-400 text-sm">Assets</span>
          <span className="text-gray-400 text-sm">Beneficiaries</span>
          <span className="text-gray-400 text-sm">Configuration</span>
          <span className="text-gray-400 text-sm">Review</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <span className="text-green-500 text-sm">Connected</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full px-8 py-8 max-w-[1000px] mx-auto">
        <div className="mb-8">
          <div className="text-orange-600 font-semibold text-sm mb-3">STEP 4 OF 4</div>
          <h1 className="text-5xl font-bold text-white mb-4">Review & Confirm Plan</h1>
          <p className="text-gray-400 text-lg">
            Finalize your multi-chain inheritance protocol configuration and review estimated tax
            implications provided by TaxCore.
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-orange-600 font-semibold text-lg">TaxCore Analysis</span>
              <span className="text-orange-600 bg-orange-900 px-3 py-1 rounded text-xs font-semibold">
                BETA
              </span>
            </div>
            <a href="#" className="flex items-center gap-2 text-orange-600 hover:text-orange-500 transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">Tax Forms (PDF)</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-4">Country of Residence</label>
              <select className="bg-gray-800 border border-gray-700 text-white rounded px-4 py-3 focus:border-orange-600 focus:outline-none">
                <option>United States</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-4">Total Estimated Liability</label>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-4xl font-bold">$14,250.00</span>
                <span className="text-gray-400 text-sm">USD</span>
              </div>
              <span className="text-green-500 text-sm mt-2">
                ↓ Potential savings found via structure optimization
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <label className="text-gray-400 text-sm">Beneficiary Countries</label>
            <div className="flex items-center gap-2">
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                Germany
                <span className="ml-1">×</span>
              </span>
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                France
                <span className="ml-1">×</span>
              </span>
              <input
                type="text"
                placeholder="Add country..."
                className="bg-gray-800 border border-gray-700 text-gray-400 rounded px-3 py-1 text-sm focus:border-orange-600 focus:outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold py-3 rounded-lg mb-6 flex items-center justify-center gap-2">
            <span>📊</span>
            Recalculate Liability
          </button>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="text-sm text-gray-400 mb-2">LIABILITY BREAKDOWN</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">US Estate Tax</span>
                <span className="text-white">$10,450.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">German Compliance Co</span>
                <span className="text-white">$3,800.00</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-900 border border-orange-700 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-200">
              <strong>Disclaimer:</strong> These figures are estimates only based on current market rates and tax
              laws. This tool does not constitute professional tax advice. Please consult with a certified tax
              professional before finalizing.
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Plan Configuration Summary</h2>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col">
              <label className="text-orange-600 text-sm font-semibold mb-2">Edit Configuration</label>
              <h3 className="text-white text-lg font-semibold mb-4">Asset Breakdown</h3>
              <div className="text-gray-400 text-sm mb-2">3 Assets Protected</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Ethereum (Optimism Network)</span>
                  <span className="text-gray-300">12.5 ETH</span>
                </div>
                <div className="text-gray-400 text-xs">$38,250.00</div>
                <div className="flex items-center justify-between text-sm mt-4">
                  <span className="text-gray-300">USDC (Polygon)</span>
                  <span className="text-gray-300">50,000 USDC</span>
                </div>
                <div className="text-gray-400 text-xs">$50,000.00</div>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-white text-lg font-semibold mb-4">Beneficiary Allocation</h3>
              <div className="text-gray-400 text-sm mb-4">Total: 100%</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-gray-300 text-sm">Sarah Jenkins (Daughter)</span>
                  </div>
                  <span className="text-orange-600 font-semibold">60%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    <span className="text-gray-300 text-sm">Michael Jenkins (Son)</span>
                  </div>
                  <span className="text-orange-600 font-semibold">40%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-gray-400 text-xs font-semibold mb-2">TRIGGER TYPE</div>
              <div className="text-white font-semibold">Dead Man's Switch</div>
              <div className="text-gray-400 text-xs mt-1">12 months inactivity</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-gray-400 text-xs font-semibold mb-2">MPC SECURITY</div>
              <div className="text-white font-semibold">3 of 5 Signers</div>
              <div className="text-gray-400 text-xs mt-1">Multi-Party Comp</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-gray-400 text-xs font-semibold mb-2">EST. GAS FEES</div>
              <div className="text-white font-semibold">~0.004 ETH</div>
              <div className="text-gray-400 text-xs mt-1">$12.50 USD</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-gray-400 text-xs font-semibold mb-2">PRIMARY NETWORK</div>
              <div className="text-white font-semibold">Arbitrum One</div>
              <div className="text-gray-400 text-xs mt-1">L2 Scaling</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Checkbox
              // checked={isConfirmed}
              // onCheckedChange={setIsConfirmed}
              className="mt-1"
            />
            <div className="flex-1">
              <label className="text-white font-semibold cursor-pointer">
                I confirm these inheritance wallets are correct.
              </label>
              <p className="text-gray-400 text-sm mt-1">
                I understand that CipherInherit cannot recover funds sent to incorrect addresses. This configuration
                will be written to the Smart Contract upon confirmation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handleBack}
            className="px-8 py-3 text-white border border-gray-600 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
          >
            Back
          </button>
          <button
            onClick={handleConfirmSign}
            className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center gap-2"
          >
            <span>✓</span>
            Confirm & Sign Plan
          </button>
        </div>
      </div>
    </div>
  );
};
