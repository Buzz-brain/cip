import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import shieldUserFullIcon from "@assets/shield-user-full.svg";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePlan } from "../../../../context/usePlan";
import { normalizeWalletAddress } from "../../../../lib/utils";

export const AssignHealthOracleExec = (): JSX.Element => {

  const navigate = useNavigate();
  const { plan, setPlanField } = usePlan();

  const [fullName, setFullName] = useState<string>((plan as any)?.executorName ?? "");
  const [email, setEmail] = useState<string>((plan as any)?.executorEmail ?? "");
  const [wallet, setWallet] = useState<string>((plan as any)?.executorWallet ?? "");

  const handleBack = () => {
    navigate("/choose-plan-type");
  };

  const handleContinue = () => {
    // validation: all fields required
    if (!fullName.trim() || !email.trim() || !wallet.trim()) {
      toast.error("Please fill in all required executor fields.");
      return;
    }

    // normalize wallet to checksum format
    try {
      const checksum = normalizeWalletAddress(wallet.trim());
      setPlanField("executorName" as any, fullName.trim());
      setPlanField("executorEmail" as any, email.trim());
      setPlanField("executorWallet" as any, checksum);
      console.log('[AssignHealthOracleExec] executor:', { fullName, email, wallet: checksum });
      navigate("/review-health-oracle-plan", { state: { executor: { fullName, email, wallet: checksum } } });
    } catch (err) {
      toast.error("Invalid executor wallet address. Please provide a valid Ethereum address.");
      return;
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-4 text-white [font-family:'Manrope',Helvetica]">
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
            Step 4 of 5: Executor Setup
          </span>
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
            80% Completed
          </span>
        </div>

        <div className="w-full h-2 bg-[#54493B] rounded-full overflow-hidden">
          <div className="h-full w-[80%] bg-[#ff6600]"></div>
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
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
  );
};
