import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../../../../context/usePlan";
import { CircleAlert as AlertCircle } from "lucide-react";
import calendarEditIcon from "@assets/calendar-edit.svg";
import calendarIcon from "@assets/calendar.svg";
import hourGlassUpIcon from "@assets/hour-glass-up.svg";
import hourGlassDownIcon from "@assets/hour-glass-down.svg";
import { Button } from "@components/ui/button";


type InactivityPeriod = "90" | "180" | "12months" | "custom" | null;

export const SetInactivityPeriod = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<InactivityPeriod>(null);
  const [customDays, setCustomDays] = useState("");
  const { setPlanField } = usePlan();

  const handleBack = () => {
    navigate(-1);
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

      // Persist selection into PlanContext and log before navigation
      setPlanField('inactivityPeriodDays', Number(daysValue));
      console.log('[SetInactivityPeriod] selectedPeriod:', selectedPeriod, 'daysValue:', daysValue);

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
      icon: hourGlassUpIcon,
      bgColor: "bg-[#7C2D1233]",
    },
    {
      id: "180",
      label: "180 days",
      description: "Balanced security and convenience.",
      icon: hourGlassDownIcon,
      bgColor: "bg-[#7C2D1233]",
    },
    {
      id: "12months",
      label: "12 months",
      description: "Long-term holding strategy.",
      icon: calendarIcon,
      bgColor: "bg-[#7C2D1233]",
    },
    {
      id: "custom",
      label: "Custom",
      description: "Enter days",
      icon: calendarEditIcon,
      bgColor: "bg-[#5544334D]",
    },
  ];

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-4">
      <div className="w-full max-w-[1040px]">
        <div className="mb-8">
          <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[31.7px] tracking-[0] leading-[38px] mb-2">
            Set Inactivity Period
          </h1>
          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-base tracking-[0] leading-[26px]">
            Configure the "Dead Man's Switch" timing for your Inactivity
            Oracle trigger.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
              Step 4 of 5: Trigger Configuration
            </span>
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
              80% Completed
            </span>
          </div>
          <div className="w-full h-2 bg-[#27211c] rounded-full overflow-hidden">
            <div className="h-full w-[80%] bg-[#ff6600]"></div>
          </div>
        </div>

        <div className="flex-1 mb-10 max-w-6xl mx-auto w-full [font-family:'Manrope',Helvetica]">
          <div className="space-y-8 mt-12">
            <div className="bg-[#7C2D121A] rounded-lg p-6 border border-[#7C2D1233] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white font-semibold mb-2">
                  About Inactivity Oracle
                </div>
                <p className="text-gray-400 text-sm">
                  Executes inheritance if the owner fails to prove they are
                  alive for a defined period. This is a Proof-of-Life system,
                  not a death assumption.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 [font-family:'Manrope',Helvetica]">
          {periodOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelectedPeriod(option.id as InactivityPeriod);
                console.log('[SetInactivityPeriod] option chosen:', option.id);
              }}
              className={`relative p-6 rounded-lg bg-[#27231C] border-2 transition-all text-left ${selectedPeriod === option.id
                  ? "border-orange-600 bg-[#27221C]"
                  : "border-[#54493B] bg-[#27221C] hover:border-gray-600"
                }`}
            >
              <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                {selectedPeriod === option.id && (
                  <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                )}
              </div>

              <div
                className={`w-12 h-12 ${option.bgColor} rounded-lg flex items-center mb-4 justify-center`}
              >
                <img src={option.icon} alt="" className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">
                {option.label}
              </h3>
              <p className="text-gray-400 text-sm">{option.description}</p>

              {option.id === "custom" && selectedPeriod === "custom" && (
                <input
                  type="number"
                  placeholder="Enter days"
                  value={customDays}
                  onChange={(e) => setCustomDays(e.target.value)}
                  className="mt-4 w-full bg-[#181311] border border-[#80766B] text-white rounded px-3 py-2 focus:border-orange-600 focus:outline-none placeholder-white"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </button>
          ))}
        </div>



        <footer className="flex mt-12 items-center justify-end pt-8 pb-12 px-0 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-[#54483b]">
          <div className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
            <Button
              className="px-6 py-6 rounded-lg border border-solid border-[#54483b] bg-transparent hover:bg-transparent [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
              onClick={handleBack}
            >
              Back
            </Button>

            <Button
              onClick={handleContinue}
              className="inline-flex items-center gap-2 px-7 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-lg [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
              disabled={
                !selectedPeriod ||
                (selectedPeriod === "custom" && !customDays)
              }
            >
              Continue
              {/* <ChevronRightIcon className="w-6 h-6" /> */}
              <span>→</span>
            </Button>
          </div>
        </footer>
      </div>
    </main>
  );
};
