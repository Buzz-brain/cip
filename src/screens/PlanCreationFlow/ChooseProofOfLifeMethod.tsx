import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ProofOfLifeMethod = "wallet" | "app" | "email" | "biometric";

export const ChooseProofOfLifeMethod = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { inactivityPeriod = "", daysValue = "" } = location.state || {};
  const [selectedMethods, setSelectedMethods] = useState<ProofOfLifeMethod[]>([]);

  const toggleMethod = (method: ProofOfLifeMethod) => {
    setSelectedMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const handleBack = () => {
    navigate("/set-inactivity-period", {
      state: {
        inactivityPeriod,
        daysValue,
      },
    });
  };

  const handleContinue = () => {
    if (selectedMethods.length > 0) {
      navigate("/philanthropy-summary", {
        state: {
          inactivityPeriod,
          daysValue,
          selectedMethods,
        },
      });
    }
  };

  const methods = [
    {
      id: "wallet",
      title: "Wallet Signature",
      description:
        "Sign a message or transaction with your connected Web3 wallet. This is the most direct way to prove control of your private keys and reset the timer.",
      icon: "🔐",
      selected: true,
    },
    {
      id: "app",
      title: "App Login + Confirmation",
      description:
        "Simply log in to the Inheritance Protocol dashboard and click a 'Confirm I'm Alive' button. Convenient for frequent users.",
      icon: "🔑",
    },
    {
      id: "email",
      title: "Email/SMS Confirmation",
      description:
        "Receive automated periodic check-ins via Email or SMS. Clicking the secure link in the message verifies your proof-of-life.",
      icon: "📧",
    },
    {
      id: "biometric",
      title: "Biometric Confirmation",
      description:
        "Advanced verification using device sensors (FaceID, TouchID) for cryptographically secure proof of physical presence.",
      icon: "🔒",
      comingSoon: true,
    },
  ];

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
          <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">
            Dashboard
          </span>
          <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">
            Create Plan
          </span>
          <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">
            My Plans
          </span>
          <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">
            Settings
          </span>
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 px-8 py-12 max-w-6xl mx-auto w-full">
        <h1 className="text-5xl font-bold text-white mb-4">Choose Proof-of-Life Method</h1>
        <p className="text-gray-400 text-lg mb-12">
          Select one or more methods to verify your activity and reset the Inactivity Oracle.
          We recommend enabling multiple methods for redundancy and ease of use.
        </p>

        <div className="mb-8">
          <div className="text-gray-400 text-sm mb-2">Step 3 of 5: Proof of Life</div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: "60%" }}></div>
          </div>
          <div className="text-orange-600 text-sm mt-2 float-right">60% Completed</div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-12">
          {methods.map((method) => (
            <div
              key={method.id}
              onClick={() => !method.comingSoon && toggleMethod(method.id as ProofOfLifeMethod)}
              className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                selectedMethods.includes(method.id as ProofOfLifeMethod)
                  ? "border-orange-600 bg-gray-900"
                  : "border-gray-700 bg-gray-900 hover:border-gray-600"
              } ${method.comingSoon ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{method.icon}</div>
                <div className="flex items-center">
                  {method.comingSoon ? (
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  ) : (
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        selectedMethods.includes(method.id as ProofOfLifeMethod)
                          ? "border-orange-600 bg-orange-600"
                          : "border-gray-600"
                      }`}
                    >
                      {selectedMethods.includes(method.id as ProofOfLifeMethod) && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{method.title}</h3>
              <p className="text-gray-400 text-sm">{method.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center gap-4 mt-12">
          <button
            onClick={handleBack}
            className="px-8 py-3 text-white border border-gray-600 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={selectedMethods.length === 0}
            className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
