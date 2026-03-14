import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleAlert as AlertCircle } from "lucide-react";

type InactivityPeriod = "90" | "180" | "12months" | "custom" | null;

export const SetInactivityPeriod = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<InactivityPeriod>(null);
  const [customDays, setCustomDays] = useState("");

  const handleBack = () => {
    navigate("/review-plan");
  };

  const handleContinue = () => {
    if (selectedPeriod) {
      const daysValue =
        selectedPeriod === "90"
          ? "90"
          : selectedPeriod === "180"
            ? "180"
            : selectedPeriod === "12months"
              ? "365"
              : customDays;

      navigate("/choose-proof-of-life", {
        state: {
          inactivityPeriod: selectedPeriod,
          daysValue,
        },
      });
    }
  };

  const periodOptions = [
    {
      id: "90",
      label: "90 days",
      description: "Best for frequent activity checks.",
      icon: "⏳",
    },
    {
      id: "180",
      label: "180 days",
      description: "Balanced security and convenience.",
      icon: "⏳",
    },
    {
      id: "12months",
      label: "12 months",
      description: "Long-term holding strategy.",
      icon: "📅",
    },
    {
      id: "custom",
      label: "Custom",
      description: "Enter days",
      icon: "🔧",
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
        <h1 className="text-5xl font-bold text-white mb-4">Set Inactivity Period</h1>
        <p className="text-gray-400 text-lg mb-12">
          Configure the "Dead Man's Switch" timing for your Inactivity Oracle trigger.
        </p>

        <div className="mb-8">
          <div className="text-gray-400 text-sm mb-2">Step 2 of 5: Trigger Configuration</div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: "40%" }}></div>
          </div>
          <div className="text-orange-600 text-sm mt-2 float-right">40% Completed</div>
        </div>

        <div className="bg-orange-900 border border-orange-700 rounded-lg p-6 mb-12 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-orange-400 font-semibold mb-2">About Inactivity Oracle</h3>
            <p className="text-orange-200 text-sm">
              Executes inheritance if the owner fails to prove they are alive for a defined period. This is a Proof-of-Life system, not a death assumption.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {periodOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedPeriod(option.id as InactivityPeriod)}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                selectedPeriod === option.id
                  ? "border-orange-600 bg-gray-900"
                  : "border-gray-700 bg-gray-900 hover:border-gray-600"
              }`}
            >
              <div className="text-3xl mb-3">{option.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-1">{option.label}</h3>
              <p className="text-gray-400 text-sm">{option.description}</p>

              {option.id === "custom" && selectedPeriod === "custom" && (
                <input
                  type="number"
                  placeholder="Enter days"
                  value={customDays}
                  onChange={(e) => setCustomDays(e.target.value)}
                  className="mt-4 w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:border-orange-600 focus:outline-none placeholder-gray-600"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </button>
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
            disabled={!selectedPeriod || (selectedPeriod === "custom" && !customDays)}
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
