import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import docIcon from "@assets/doc.svg";
import gavelYellowIcon from "@assets/gavel-yellow.svg";
import firstAidIcon from "@assets/first-aid.svg";
import { usePlan } from "../../../../context/usePlan";

type SelectDoc = "death" | "court" | "hospital";

const docOptions = [
  {
    id: "death",
    label: "Death Certificate",
    description: "Standard government-issued death certificate. The most common and widely accepted proof for executing inheritance protocols.",
    icon: docIcon,
    bgColor: "bg-[#7C2D1233]",
  },
  {
    id: "court",
    label: "Court Declaration",
    description: " Official court ruling declaring presumption of death. Required in special cases such as missing persons where no body is recovered.",
    icon: gavelYellowIcon,
    bgColor: "bg-[#7C2D1233]",
  },
  {
    id: "hospital",
    label: "Hospital Record",
    description: "Certified medical record or verified physician's statement confirming time and cause of death. Useful for immediate triggers.",
    icon: firstAidIcon,
    bgColor: "bg-[#7C2D1233]",
  },
];

export const SelectAcceptedDocs = (): JSX.Element => {
  const navigate = useNavigate();
  const { plan, setPlanField } = usePlan();
  const initialAccepted = (() => {
    const v = (plan as any)?.acceptedDocs;
    if (!v) return [] as SelectDoc[];
    if (typeof v === 'string') return v.split(',').map((s: string) => s.trim()) as SelectDoc[];
    if (Array.isArray(v)) return v as SelectDoc[];
    return [] as SelectDoc[];
  })();

  const [selectedDocs, setSelectedDocs] = useState<SelectDoc[]>(initialAccepted);

  const handleBack = () => {
    navigate("/assign-health-oracle-exec");
  };

  const toggleDoc = (id: SelectDoc) => {
    setSelectedDocs((prev) => {
      const next = prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id];
      console.log('[SelectAcceptedDocs] selectedDocs:', next);
      return next;
    });
  };

  const confirmSelection = () => {
    if (selectedDocs.length === 0) return;
    setPlanField('acceptedDocs' as any, selectedDocs.join(','));
    console.log('[SelectAcceptedDocs] persisting acceptedDocs:', selectedDocs);

    // map to example doc codes for next step if needed
    navigate("/health-oracle-jurisdiction", {
      state: {
        acceptedDocs: selectedDocs,
      },
    });
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-4 text-white [font-family:'Manrope',Helvetica]">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Select Accepted Documents</h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
          Choose which official documents will be accepted as valid proof of
          death by the Health Oracle. You can select multiple options to
          provide flexibility for the verification process.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
            Step 3 of 5: Verification Proofs
          </span>
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
            60% Completed
          </span>
        </div>

        <div className="w-full h-2 bg-[#54493B] rounded-full overflow-hidden">
          <div className="h-full w-[60%] bg-[#ff6600]"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 [font-family:'Manrope',Helvetica]">
        {docOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => toggleDoc(option.id as SelectDoc)}
            className={`relative p-6 rounded-lg bg-[#27231C] border-2 transition-all text-left cursor-pointer ${selectedDocs.includes(option.id as SelectDoc)
                ? "border-orange-600 bg-[#27221C]"
                : "border-[#54493B] bg-[#27221C] hover:border-gray-600"
              }`}
          >
            <div className={`absolute top-4 right-4 w-6 h-6 rounded border-2 flex items-center justify-center ${selectedDocs.includes(option.id as SelectDoc) ? 'border-orange-600 bg-orange-600' : 'border-gray-600'}`}>
              {selectedDocs.includes(option.id as SelectDoc) && (
                <span className="text-white text-sm">✓</span>
              )}
            </div>

            <div
              className={`w-12 h-14 ${option.bgColor} rounded-lg flex items-center mb-4 justify-center`}
            >
              <img src={option.icon} alt="" className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">
              {option.label}
            </h3>
            <p className="text-gray-400 text-sm">{option.description}</p>
          </div>
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
            onClick={confirmSelection}
            className="inline-flex items-center gap-2 px-7 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-lg [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
          >
            Confirm Selection
          </Button>
        </div>
      </footer>
    </main>
  );
};
