import { ChevronDown, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { useState } from "react";
import { usePlan } from "../../../../context/usePlan";
import worldUniverseYellowIcon from "@assets/world-universe-yellow.svg";
import bankIcon from "@assets/bank.svg";
import globeIcon from "@assets/globe.svg";
import gavelBorderIcon from "@assets/gavel-border.svg";
import shieldCheckGreenIcon from "@assets/shield-check-green.svg";

export const HealthOracleJurisdiction = (): JSX.Element => {
  const navigate = useNavigate();
  const { plan, setPlanField } = usePlan();
  const [country, setCountry] = useState<string>((plan as any)?.jurisdiction ?? "United States (California)");
  const countries = [
    "United States (California)",
    "United Kingdom",
    "Canada",
    "Nigeria",
    "Germany",
    "France",
    "Japan",
    "Australia",
    "Singapore",
  ];

  const handleBack = () => {
    navigate("/select-accepted-docs");
  };

  const handleContinue = () => {
    // persist
    setPlanField('jurisdiction' as any, country);
    console.log('[HealthOracleJurisdiction] selected country:', country);
    navigate("/review-health-oracle-plan");
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-4 text-white [font-family:'Manrope',Helvetica]">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Health Oracle Jurisdiction
        </h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
          Select the relevant legal jurisdiction for your health and death
          verification documents. This ensures the Oracle applies the correct
          validation standards.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
            Step 3 of 5: Jurisdiction Selection
          </span>
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
            60% Completed
          </span>
        </div>

        <div className="w-full h-2 bg-[#54493B] rounded-full overflow-hidden">
          <div className="h-full w-[60%] bg-[#ff6600]"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-12">
        <div className="col-span-2 space-y-8">
          <div>
            <label className="block text-white font-semibold mb-3 text-sm">
              Country / Region
            </label>
            <div className="flex gap-2">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#181611] border border-[#54453B] rounded-lg px-4 py-3 text-left text-white text-sm focus:outline-none focus:border-orange-600"
              >
                {countries.map((c) => (
                  <option key={c} value={c} className="bg-[#181611]">{c}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-600 mt-3" />
            </div>
            <div className="flex items-start gap-2 mt-3 text-[#B9AC9D] text-xs">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                The oracle will configure document parsers based on the
                selected region's legal standards.
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">
              Quick Select
            </h3>
              <div className="grid grid-cols-3 gap-4">
              {countries.slice(0,3).map((c, idx) => (
                <button
                  key={c}
                  onClick={() => setCountry(c)}
                  className={`border rounded-lg p-6 text-center transition ${country === c ? 'border-orange-600 bg-[#27221C]' : 'border-[#54453B] bg-[#27221C] hover:border-gray-700'}`}>
                  <div className="w-12 h-12 bg-[#8A591E4D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src={[worldUniverseYellowIcon, bankIcon, globeIcon][idx]} className="w-5 h-5" alt="" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">{c.split(' ')[0]}</h4>
                  <p className="text-[#B9AC9D] text-xs">{idx===0? 'US, CA, MX' : idx===1? 'EU, UK, CH' : 'SG, JP, AU'}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-[#54453B] rounded-xl p-6 bg-[#27221C]">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-12 bg-[#8A621E66] rounded-lg flex items-center justify-center`}
              >
                <img src={gavelBorderIcon} className="w-5 h-5" alt="Gavel" />
              </div>
              <h3 className="text-white font-semibold">Legal Standards</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Document formats for proof-of-death (e.g., Death Certificates,
              Coroner Reports) vary significantly by region.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Selecting the correct jurisdiction allows our TEE (Trusted
              Execution Environment) nodes to accurately verify authenticity
              features like watermarks and government seals.
            </p>
          </div>

          <div className="border border-[#54453B] rounded-xl p-6 bg-[#27221C]">
            <div className="flex items-start gap-3 mb-4">
              <img
                src={shieldCheckGreenIcon}
                className="w-5 h-5"
                alt="Shield"
              />
              <h3 className="text-white font-semibold">Privacy Protected</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your jurisdiction selection is used strictly for document
              validation logic and is not publicly revealed on the blockchain.
            </p>
          </div>
        </div>
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
          >
            Continue to Triggers
            <span>→</span>
          </Button>
        </div>
      </footer>
    </main>
  );
};
