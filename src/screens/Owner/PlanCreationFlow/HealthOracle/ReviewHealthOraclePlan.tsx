import { ChevronLeft, AlertCircle, CheckCircle2, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@components/ui/badge";
import rocketIcon from "@assets/rocket.svg";
import gavelGreenIcon from "@assets/gavel-green.svg";
import { usePlan } from "../../../../context/usePlan";
import { useEffect } from "react";

export const ReviewHealthOraclePlan = (): JSX.Element => {
  const navigate = useNavigate();
  const { plan } = usePlan();

  useEffect(() => {
    console.log('[ReviewHealthOraclePlan] plan snapshot:', plan);
  }, [plan]);
  return (
    <main className="max-w-5xl mx-auto px-4 py-4  text-white [font-family:'Manrope',Helvetica]">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Review Health Oracle Plan</h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
          Please verify the details of your Health Oracle configuration below.
          Ensure the assigned executor and document requirements are correct
          before finalizing the smart contract.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
            Step 4 of 5: Review
          </span>
          <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
            80% Completed
          </span>
        </div>

        <div className="w-full h-2 bg-[#54493B] rounded-full overflow-hidden">
          <div className="h-full w-[80%] bg-[#ff6600]"></div>
        </div>
      </div>

      <div className="border border-[#AF731E] bg-[#8A5F1E1A] rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[#FEF6DB] font-semibold mb-1">
              Plan Execution Condition
            </h3>
            <p className="text-[#FEE7BF] text-sm">
              This plan will execute only after verified proof of death
              through the assigned executor and accepted documents.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-12">
        <div className="border border-[#54453B] rounded-2xl p-8 bg-[#27221C] ">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#54453B] ">
            <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center">
              <img src={gavelGreenIcon} className="w-5 h-5" alt="Gavel" />
            </div>
            <h2 className="text-white font-bold">Assigned Executor</h2>
          </div>

          <div className="text-center py-4">
            <div className="text-3xl font-bold text-gray-300 mb-6">{(((plan as any)?.executorName ?? 'LE') as string).slice(0,2).toUpperCase()}</div>

            <h3 className="text-white font-semibold text-sm">
              {(plan as any)?.executorName ?? 'Legal Executor Node'}
            </h3>
            <p className="text-[#B9AC9D] text-xs">{(plan as any)?.executorEmail ?? 'Designated Fiduciary'}</p>
          </div>

          <div className="flex border-t border-gray-800 relative">
            <input
              type="text"
              value={plan?.executorWallet ?? ''}
              className="w-full bg-[#181611] border border-[#54453B] rounded-lg px-4 py-3 text-gray-400 text-sm focus:outline-none focus:border-orange-600 placeholder-[#B9AC9D]"
              readOnly
            />

            <Copy className="w-4 h-4 text-orange-600 absolute right-3 top-[calc(35%)] cursor-pointer" />
          </div>

          <div className="flex items-center w-full gap-4 mt-6 text-xs">
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-[#22C55E33] bg-[#22C55E1A] px-3 py-1"
            >
              <div className="relative flex h-2 w-2 items-start">
                <div className="absolute inset-0 rounded-full bg-green-400" />
                <div className="relative h-2 w-2 rounded-full bg-green-500" />
              </div>
              <span className="text-xs font-medium leading-4 tracking-[0.60px] text-[#4ADE80] text-slate-400 [font-family:'Manrope',Helvetica]">
                Verified
              </span>
            </Badge>

            <Badge
              variant="outline"
              className="gap-2 rounded-full border-[#e5e7eb03] bg-[#372D1F] px-3 py-1"
            >
              <span className="text-xs font-medium leading-4 tracking-[0.60px] text-[#4ADE80] text-slate-400 [font-family:'Manrope',Helvetica]">
                KYC Checked
              </span>
            </Badge>
          </div>
        </div>
      </div>

      <footer className="flex items-center pt-8 justify-between border-t [border-top-style:solid] border-[#54483b]">
        <button
          onClick={() => navigate(-1)}
          className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Selection
        </button>
        <div className="flex items-center gap-3">
          <button className="border border-gray-700 hover:border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium text-sm transition">
            Save as Draft
          </button>
          <button
            onClick={() => navigate("/review-plan")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition flex items-center gap-2"
          >
            Confirm & Deploy
            <img src={rocketIcon} alt="" />
          </button>
        </div>
      </footer>
    </main>
  );
};
