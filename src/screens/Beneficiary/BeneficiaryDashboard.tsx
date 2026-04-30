import { LayoutGrid as LayoutGridIcon, ChartPie as PieChartIcon, Search as SearchIcon, TrendingUp as TrendingUpIcon, CircleCheck as CheckCircleIcon } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import padlockImg from "@assets/padlock-img.svg";
import YourInheritances from "./YourInheritances";
import BeneficiaryLayout from "./BeneficiaryLayout";

export const BeneficiaryDashboard = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <BeneficiaryLayout>
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[32px] leading-10">
              Welcome back, {user?.name ?? user?.email ?? (user?.userInfo?.wallet ? `${user.userInfo.wallet.slice(0,6)}...${user.userInfo.wallet.slice(-4)}` : (user?.publicKey ? `${user.publicKey.slice(0,6)}...${user.publicKey.slice(-4)}` : 'User'))}
            </h2>
            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-base">
              You have <span className="font-bold text-white">3 active inheritance plans</span> and <span className="font-bold text-[#ff3b30]">1 urgent approval</span> pending.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 bg-[#27221c] rounded-lg">
                  <TrendingUpIcon className="w-6 h-6 text-[#2ccd2c]" />
                </div>
                <span className="[font-family:'Manrope',Helvetica] font-bold text-[#2ccd2c] text-sm">+5.2%</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">Total Inherited Value</p>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">$1,240,500</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 bg-[#27221c] rounded-lg">
                  <CheckCircleIcon className="w-6 h-6 text-[#ff3b30]" />
                </div>
                <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff3b30] text-sm">Action Required</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">Pending Approvals</p>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">2 requests</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 bg-[#27221c] rounded-lg">
                  <PieChartIcon className="w-6 h-6 text-[#007aff]" />
                </div>
                <span className="[font-family:'Manrope',Helvetica] font-bold text-[#007aff] text-sm">Est. Liability</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">Tax Summary (2024)</p>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">~15% <span className="text-base text-[#8b7b64]">average</span></p>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="flex flex-col gap-4">
          <h3 className="[font-family:'Manrope',Helvetica] font-bold text-[#ff3b30] text-base">⚠ Action Required</h3>

          <Card className="bg-gradient-to-r from-[#27221c] to-[#181511] border border-[#ff6600] rounded-xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-8">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#ff3b30] text-white [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-1 rounded">MPC Trigger</span>
                  <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">Grandmother's Trust Authorization</h4>
                </div>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ae9d] text-sm leading-6">The inactivity period has ended. As a designated MPC Signer, your digital signature is required to release the assets. This action is irreversible.</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-[#2ccd2c] flex items-center justify-center"><span className="text-white text-xs font-bold">✓</span></div>
                    <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">1/3 Signatures Collected</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center gap-4">
                <img className="w-40 h-40 rounded-lg object-cover" alt="Security" src={padlockImg} />
                <Button className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-white [font-family:'Manrope',Helvetica] font-bold text-base px-6 py-3 gap-2">
                  <CheckCircleIcon className="w-5 h-5" /> Approve Inheritance
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl">Your Inheritance Plans</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[#27221c] rounded-lg transition-colors"><SearchIcon className="w-5 h-5 text-[#8b7b64]" /></button>
              <button className="p-2 hover:bg-[#27221c] rounded-lg transition-colors"><LayoutGridIcon className="w-5 h-5 text-[#8b7b64]" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <YourInheritances />
          </div>
        </section>
        </section>
      </BeneficiaryLayout>
  );
};
