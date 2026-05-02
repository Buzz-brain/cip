import { LayoutGrid as LayoutGridIcon, TrendingUp as TrendingUpIcon, CircleCheck as CheckCircleIcon } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { Card, CardContent } from "@components/ui/card";
import YourInheritances from "./YourInheritances";
import { useEffect, useState } from "react";
import { getBeneficiaryDashboard } from "../../lib/api/beneficiary";

export const BeneficiaryDashboard = (): JSX.Element => {
  const { user } = useAuth();
  const [totalPlans, setTotalPlans] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchStats() {
      if (!user?.token) return;
      setLoading(true);
      try {
        const data = await getBeneficiaryDashboard(user.token);
        if (!mounted) return;
        if (data) {
          setTotalPlans(typeof data.total_plans_benefit === 'number' ? data.total_plans_benefit : null);
          setTotalAmount(typeof data.total_amount === 'number' ? data.total_amount : null);
        }
      } catch (err) {
        console.error('Failed to load beneficiary stats:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStats();
    return () => { mounted = false; };
  }, [user?.token]);

  return (
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[32px] leading-10">
              Welcome back, {user?.name ?? user?.email ?? (user?.userInfo?.wallet ? `${user.userInfo.wallet.slice(0,6)}...${user.userInfo.wallet.slice(-4)}` : (user?.publicKey ? `${user.publicKey.slice(0,6)}...${user.publicKey.slice(-4)}` : 'User'))}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 bg-[#27221c] rounded-lg">
                  <TrendingUpIcon className="w-6 h-6 text-[#2ccd2c]" />
                </div>
                <span className="[font-family:'Manrope',Helvetica] font-bold text-[#2ccd2c] text-sm">Total Inheritance Plans</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">Total Plans</p>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">{loading ? '—' : (totalPlans ?? 0)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 bg-[#27221c] rounded-lg">
                  <CheckCircleIcon className="w-6 h-6 text-[#ff3b30]" />
                </div>
                <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff3b30] text-sm">Total Amount</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">Total Inherited Value (ETH)</p>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">{loading ? '—' : (totalAmount !== null ? String(totalAmount) : '0')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl">Your Inheritance Plans</h3>
            <div className="flex items-center gap-2">
              {/* <button className="p-2 hover:bg-[#27221c] rounded-lg transition-colors"><SearchIcon className="w-5 h-5 text-[#8b7b64]" /></button> */}
              <button className="p-2 hover:bg-[#27221c] rounded-lg transition-colors"><LayoutGridIcon className="w-5 h-5 text-[#8b7b64]" /></button>
            </div>
          </div>

            <YourInheritances />
        </section>
        </section>
  );
};
