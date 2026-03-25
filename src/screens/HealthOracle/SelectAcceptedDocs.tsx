import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import docIcon from "@assets/doc.svg";
import gavelYellowIcon from "@assets/gavel-yellow.svg";
import firstAidIcon from "@assets/first-aid.svg";

type SelectDoc = "death" | "court" | "hospital" | null;

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
  const [selectedDoc, setSelectedDoc] = useState<SelectDoc>(null);

  const handleBack = () => {
    navigate("/assign-health-oracle-exec");
  };

  const confirmSelection = () => {
     if (selectedDoc) {
       const doc =
         selectedDoc === "death"
           ? "90"
           : selectedDoc === "court"
             ? "180"
             : selectedDoc === "hospital"
               ? "365"
               : null;

       navigate("/health-oracle-jurisdiction", {
         state: {
           inactivityPeriod: selectedDoc,
           doc,
         },
       });
     }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810] text-white [font-family:'Manrope',Helvetica]">
      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
          <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
            Inheritance&nbsp;&nbsp;Protocol
          </span>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-300 text-sm font-semibold"
          >
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

      <main className="max-w-5xl mx-auto px-8 py-12">
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
            <button
              key={option.id}
              onClick={() => setSelectedDoc(option.id as SelectDoc)}
              className={`relative p-6 rounded-lg bg-[#27231C] border-2 transition-all text-left ${
                selectedDoc === option.id
                  ? "border-orange-600 bg-[#27221C]"
                  : "border-[#54493B] bg-[#27221C] hover:border-gray-600"
              }`}
            >
              <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                {selectedDoc === option.id && (
                  <div className="w-3 h-3 rounded-full bg-orange-600"></div>
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
              onClick={confirmSelection}
              className="inline-flex items-center gap-2 px-7 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-lg [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
            >
              Confirm Selection
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
};
