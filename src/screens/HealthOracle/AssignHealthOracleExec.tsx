import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import shieldUserFullIcon from "@assets/shield-user-full.svg";

export const AssignHealthOracleExec = (): JSX.Element => {

        const navigate = useNavigate();
    
        const handleBack = () => {
          navigate("/choose-plan-type");
        };
    
        const handleContinue = () => {
          navigate("/select-accepted-docs");
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
            Assign Health Oracle Executor
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
            Executes inheritance only after verified proof of death. Uses
            confidential verification (iExec / Secret AI vision).
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
              Step 2 of 5: Executor Setup
            </span>
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
              40% Completed
            </span>
          </div>

          <div className="w-full h-2 bg-[#54493B] rounded-full overflow-hidden">
            <div className="h-full w-[40%] bg-[#ff6600]"></div>
          </div>
        </div>

        <div className="bg-[#8A5F1E1A] border border-[#AF731E] rounded-xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-14 bg-orange-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <img
                src={shieldUserFullIcon}
                className="w-6 h-6"
                alt="Executor"
              />
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Executor Role</h3>
              <p className="text-[#B9AC9D] text-sm mb-3">
                This person is responsible for uploading the death certificate
                to verify the trigger condition.
              </p>
              <p className="text-white font-semibold text-sm">
                They cannot access funds. Their role is strictly administrative
                and non-custodial.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#27221C] border border-[#54453B] rounded-2xl p-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white font-bold text-lg">Designate Executor</h2>
            <span className="bg-red-600/20 border border-red-600/40 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
              Required
            </span>
          </div>

          <p className="text-[#B9AC9D] text-sm mb-8">
            Provide details for the person trusted to activate this protocol.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white font-semibold mb-3 text-sm">
                Executor Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                className="w-full bg-[#181611] border border-[#54453B] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-600 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-3 text-sm">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. jane@example.com"
                className="w-full bg-[#181611] border border-[#54453B] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-600 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-3 text-sm">
              Wallet Address
            </label>
            <input
              type="text"
              placeholder="0x..."
              className="w-full bg-[#181611] border border-[#54453B] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-600 placeholder-gray-400"
            />
          </div>

          <div className="flex items-start gap-2 text-[#B9AC9D] text-xs">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              This wallet will be whitelisted to interact with the verification
              oracle smart contract.
            </span>
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
              Continue Executor
              <span>→</span>
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
};
