import { ChevronDown, Info } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import worldUniverseYellowIcon from "@assets/world-universe-yellow.svg";
import bankIcon from "@assets/bank.svg";
import globeIcon from "@assets/globe.svg";
import gavelBorderIcon from "@assets/gavel-border.svg";
import shieldCheckGreenIcon from "@assets/shield-check-green.svg";

export const HealthOracleJurisdiction = (): JSX.Element => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/select-accepted-docs");
  };

  const handleContinue = () => {
    navigate("/review-health-oracle-plan");
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
              <button className="w-full bg-[#181611] border border-[#54453B] rounded-lg px-4 py-3 text-left text-gray-400 text-sm focus:outline-none focus:border-orange-600 flex items-center justify-between hover:border-gray-700 transition">
                <span>Select Country</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
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
                <button className="bg-[#27221C] border border-[#54453B] rounded-lg p-6 text-center hover:border-gray-700 transition">
                  <div className="w-12 h-12 bg-[#8A591E4D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <img
                      src={worldUniverseYellowIcon}
                      className="w-5 h-5"
                      alt="World Universe"
                    />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    North America
                  </h4>
                  <p className="text-[#B9AC9D] text-xs">US, CA, MX</p>
                </button>

                <button className="bg-[#27221C] border border-[#54453B] rounded-lg p-6 text-center hover:border-gray-700 transition">
                  <div className="w-12 h-12 bg-[#581C874D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src={bankIcon} className="w-5 h-5" alt="Bank" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Europe (EEA)
                  </h4>
                  <p className="text-[#B9AC9D] text-xs">EU, UK, CH</p>
                </button>

                <button className="bg-[#27221C] border border-[#54453B] rounded-lg p-6 text-center hover:border-gray-700 transition">
                  <div className="w-12 h-12 bg-[#7C2D124D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src={globeIcon} className="w-5 h-5" alt="Globe" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Asia Pacific
                  </h4>
                  <p className="text-[#B9AC9D] text-xs">SG, JP, AU</p>
                </button>
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
    </div>
  );
};
