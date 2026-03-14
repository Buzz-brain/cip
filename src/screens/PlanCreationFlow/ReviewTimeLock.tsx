import { useLocation, useNavigate } from "react-router-dom";
import { Check, CircleAlert as AlertCircle } from "lucide-react";

export const ReviewTimeLock = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unlockDate = "", unlockTime = "00:00" } = location.state || {};

  const formatDisplayDate = () => {
    if (!unlockDate) return "Not set";
    const [day, month, year] = unlockDate.split("/");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[parseInt(month) - 1]} ${day}, ${year} at ${unlockTime} UTC`;
  };

  const handleEditPlan = () => {
    navigate("/set-time-lock", {
      state: {
        unlockDate,
        unlockTime,
      },
    });
  };

  const handleConfirmDeploy = () => {
    navigate("/plan-activated", {
      state: {
        referenceId: "#CIP-8354-JD",
        triggerMechanism: "Time-Lock Trigger",
        assetsIncluded: "4 Tokens",
        mainBeneficiary: "0x71c...9a21",
        securityLevel: "Time-based unlock",
      },
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0d0501]">
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">I</span>
          </div>
          <span className="text-white font-semibold">Inheritance Protocol</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">Dashboard</span>
          <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">Create Plan</span>
          <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">My Plans</span>
          <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">Settings</span>
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 px-8 py-12 max-w-6xl mx-auto w-full">
        <h1 className="text-5xl font-bold text-white mb-4">Review Time-Lock Plan</h1>
        <p className="text-gray-400 text-lg mb-12">
          Verify the parameters of your automated inheritance plan. This setup ensures your assets are distributed exactly when intended.
        </p>

        <div className="mb-8">
          <div className="text-gray-400 text-sm mb-2">Step 3 of 4: Review Details</div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: "75%" }}></div>
          </div>
          <div className="text-orange-600 text-sm mt-2 float-right">75% Completed</div>
        </div>

        <div className="space-y-8 mt-12">
          <div className="bg-orange-900 border border-orange-700 rounded-lg p-6 flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span>📅</span>
            </div>
            <div>
              <div className="text-orange-400 text-sm mb-1">Automatic Trigger</div>
              <div className="text-white text-2xl font-bold">
                This plan will execute automatically on {formatDisplayDate()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-start gap-3 mb-4">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <h3 className="text-white font-semibold text-lg">Trustless Execution</h3>
              </div>
              <div className="bg-green-900 border border-green-700 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm font-semibold">No executor or approval required.</span>
                </div>
                <p className="text-green-200 text-sm">
                  The smart contract operates independently. No intermediary, lawyer, or family member needs to sign a transaction for release.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-xl">📦</span>
                <h3 className="text-white font-semibold text-lg">Plan Contents</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔒</span>
                    <span className="text-gray-300 text-sm">Assets Locked</span>
                  </div>
                  <span className="text-white font-semibold">4 Tokens</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👥</span>
                    <span className="text-gray-300 text-sm">Beneficiaries</span>
                  </div>
                  <span className="text-white font-semibold">2 Wallets</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold mb-2">You retain full control</div>
              <p className="text-gray-400 text-sm">
                Even though this plan is automatic, you can cancel, pause, or modify the date and beneficiaries at any time before execution using your connected wallet.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 mt-12">
          <button
            onClick={handleEditPlan}
            className="px-8 py-3 text-white border border-gray-600 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
          >
            Edit Plan
          </button>
          <button
            onClick={handleConfirmDeploy}
            className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center gap-2"
          >
            <span>🚀</span>
            Confirm & Deploy
          </button>
        </div>
      </div>
    </div>
  );
};
