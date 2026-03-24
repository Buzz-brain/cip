import { ArrowLeft as ArrowLeftIcon, Copy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import shieldLockIcon from "../../assets/shield-lock.svg";
import charityWhiteIcon from "../../assets/charity-white.svg";
import christmasTreeIcon from "../../assets/christmas-tree.svg";
import saveIcon from "../../assets/save.svg";

interface Charity {
  id: string;
  name: string;
  network: string;
  walletAddress: string;
  link?: string;
  icon: string;
}

const charities: Charity[] = [
  {
    id: "1",
    name: "Red Cross Crypto Fund",
    network: "Ethereum",
    walletAddress: "0x71C...9A23",
    link: "redcross.org/crypto",
    icon: charityWhiteIcon,
  },
  {
    id: "2",
    name: "Greenpeace DAO",
    network: "Solana",
    walletAddress: "GuiQ...3d4F",
    link: "Global (Reg: 88291)",
    icon: christmasTreeIcon,
  },
];

export const PhilanthropyPlan = (): JSX.Element => {
  const navigate = useNavigate();
  const [redCrossPercentage, setRedCrossPercentage] = useState(35);
  const [greenpeacePercentage, setGreenpeacePercentage] = useState(25);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const totalAllocated = redCrossPercentage + greenpeacePercentage;
  const unallocated = 100 - totalAllocated;

  return (
    <div className="w-full min-h-screen bg-[#0d0501] flex flex-col">
      <header className="w-full h-[65px] flex items-center bg-[#0d0501] border-b border-solid border-[#392f28]">
        <div className="ml-8 flex items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-[#ff6600] rounded-lg">
            <img
              className="w-[25px] h-[31px] object-cover"
              alt="Logo"
              src="/logo-3.png"
            />
          </div>
        </div>
      </header>

      <main className="w-full max-w-[768px] mx-auto px-6 py-10 flex flex-col gap-10">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img className="w-4 h-4" alt="Back" src={shieldLockIcon} />
            <span className="[font-family:'Manrope',Helvetica] font-medium text-[#ff6600] text-sm leading-5">
              Inheritance Protocol
            </span>
          </div>

          <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[35px] leading-[44px]">
            Philanthropy Plan Setup
          </h1>

          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ae9d] text-base leading-6">
            Securely designate charitable organizations as beneficiaries.
            Configure wallets, allocate percentages, and confirm your on-chain
            legacy.
          </p>
        </section>

        <Card className="bg-[#27221c] border border-[#392f28] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center justify-center w-10 h-10 bg-[#ff6600] rounded-full">
                <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                  1
                </span>
              </div>
              <div className="flex-1">
                <div className="h-0.5 bg-[#ff6600]" />
              </div>
            </div>

            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center justify-center w-10 h-10 bg-[#ff6600] rounded-full">
                <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                  2
                </span>
              </div>
              <div className="flex-1">
                <div className="h-0.5 bg-[#ff6600]" />
              </div>
            </div>

            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <span className="[font-family:'Manrope',Helvetica] font-bold text-black text-sm">
                3
              </span>
            </div>
          </div>

          <div className="flex items-start justify-between text-sm">
            <span className="[font-family:'Manrope',Helvetica] font-medium text-white flex-1 text-center">
              Add Charities
            </span>
            <span className="[font-family:'Manrope',Helvetica] font-medium text-white flex-1 text-center">
              Allocate Funds
            </span>
            <span className="[font-family:'Manrope',Helvetica] font-medium text-white flex-1 text-center">
              Review & Confirm
            </span>
          </div>
        </Card>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl leading-7">
                1. Beneficiaries
              </h2>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm leading-5">
                Organizations designated to receive assets.
              </p>
            </div>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
              <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff6600] text-sm">
                Edit
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-2   gap-4">
            {charities.map((charity) => (
              <Card
                key={charity.id}
                className="bg-[#181511] border border-[#392f28] rounded-xl"
              >
                <CardContent className="p-5 flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#27221c] rounded-full text-2xl">
                      <img src={charity.icon} alt="" />
                    </div>
                    <div className="flex-1">
                      <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base leading-6 mb-1">
                        {charity.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${charity.network === "Ethereum" ? "bg-[#ff6600]" : "bg-emerald-500"}`}
                        />
                        <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                          {charity.network}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        Wallet Address
                      </span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="[font-family:'Manrope',Helvetica] font-mono text-white text-xs">
                          {charity.walletAddress}
                        </span>
                        <Copy className="w-4 h-4 opacity-50 text-white" />
                      </div>
                    </div>
                    {charity.link && (
                      <div className="flex items-center justify-between">
                        {/* <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                          {charity.link.includes("Reg") ? "ORG" : "LINK"}
                        </span> */}
                        <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-xs">
                          {charity.link}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-[#181511] border border-dashed border-[#392f28] rounded-xl">
              <CardContent className="p-8 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center w-12 h-12 bg-[#27221c] rounded-full mb-2">
                  <span className="text-[#8b7b64] text-xl">+</span>
                </div>
                <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                  Add Another Charity
                </span>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl leading-7">
                2. Allocation of Funds
              </h2>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm leading-5">
                Distribution of assets across beneficiaries.
              </p>
            </div>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
              <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff6600] text-sm">
                ⚙ Modify
              </span>
            </Button>
          </div>

          <Card className="bg-[#27221c] border border-[#392f28] rounded-xl">
            <CardContent className="p-6 flex items-center gap-8">
              <div className="relative w-[180px] h-[180px]">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="90"
                    cy="90"
                    r="70"
                    stroke="#3b251e"
                    strokeWidth="24"
                    fill="none"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="70"
                    stroke="#10b981"
                    strokeWidth="24"
                    fill="none"
                    strokeDasharray={`${(totalAllocated / 100) * 439.8} 439.8`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                    Total
                  </span>
                  <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-4xl">
                    {totalAllocated}%
                  </span>
                  <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                    Allocated
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-[#181511] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#ff6600] rounded-full" />
                    <div className="flex flex-col">
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                        Red Cross Crypto Fund
                      </span>
                      <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        Fixed Percentage
                      </span>
                    </div>
                  </div>
                  <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                    {redCrossPercentage}.00%
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#181511] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                    <div className="flex flex-col">
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                        Greenpeace DAO
                      </span>
                      <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        Fixed Percentage
                      </span>
                    </div>
                  </div>
                  <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                    {greenpeacePercentage}.00%
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#181511] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#553e33] rounded-full" />
                    <div className="flex flex-col">
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-[#8b7b64] text-sm">
                        Unallocated (Remaining)
                      </span>
                      <span className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs">
                        Returns to main estate
                      </span>
                    </div>
                  </div>
                  <span className="[font-family:'Manrope',Helvetica] font-bold text-[#8b7b64] text-lg">
                    {unallocated}.00%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl leading-7">
              3. Review & Confirm
            </h2>
            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm leading-5">
              Please verify all wallet addresses carefully. Blockchain
              transactions are irreversible.
            </p>
          </div>

          <Card className="bg-[#B9AF9D] border-none rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Checkbox
                  checked={isConfirmed}
                  onCheckedChange={(checked) =>
                    setIsConfirmed(checked as boolean)
                  }
                  className="mt-1 border-2 border-[#221810] data-[state=checked]:bg-[#ff6600] data-[state=checked]:border-[#ff6600]"
                />
                <div className="flex flex-col gap-1">
                  <span className="[font-family:'Manrope',Helvetica] font-bold text-[#221810] text-base leading-6">
                    I confirm these charity wallets are correct.
                  </span>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#3b251e] text-sm leading-5">
                    I understand that CipherInherit cannot recover funds sent to
                    incorrect addresses. This configuration will be written to
                    the Smart Contract upon confirmation.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#3b251e]">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/choose-plan-type")}
                  className="[font-family:'Manrope',Helvetica] font-bold text-[#221810] text-base hover:bg-[#3b251e]/10 h-12 px-6"
                >
                  Cancel Setup
                </Button>

                <Button
                  onClick={() => navigate("/")}
                  className="flex-1 [font-family:'Manrope',Helvetica] font-bold text-white text-base bg-[#3b251e] hover:bg-[#3b251e]/90 h-12 px-6 gap-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Back to Allocation
                </Button>

                <Button
                  disabled={!isConfirmed}
                  onClick={() => navigate("/review-plan")}
                  className="flex-1 [font-family:'Manrope',Helvetica] font-bold text-white text-base bg-[#ff6600] hover:bg-[#ff6600]/90 disabled:opacity-50 disabled:pointer-events-none h-12 px-6 gap-2"
                >
                  <img className="w-4 h-4" alt="Save" src={saveIcon} />
                  Confirm & Save Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="flex items-center justify-center gap-2 pt-8 border-t border-dashed border-[#392f28]">
          <span className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs">
            Secured by CipherInherit Protocol v2.1 • Multi-sig Enabled
          </span>
        </footer>
      </main>
    </div>
  );
};
