import { ChartBar as BarChart3Icon, Bell as BellIcon, FileText as FileTextIcon, LayoutGrid as LayoutGridIcon, LogOut as LogOutIcon, ChartPie as PieChartIcon, Search as SearchIcon, Settings as SettingsIcon, TrendingUp as TrendingUpIcon, CircleCheck as CheckCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import padlockImg from "@assets/padlock-img.svg";

export const BeneficiaryDashboard = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#0d0501] flex">
      <aside className="w-[193px] bg-[#0d0501] border-r border-[#392f28] flex flex-col">
        <button
          onClick={() => navigate("/proof-of-life")}
          className="p-6 flex items-center gap-2 border-b border-[#392f28] hover:bg-[#27221c] transition-colors"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-[#ff6600] rounded-lg">
            <span className="text-white font-bold text-sm">CIP</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
              CIP
            </span>
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs">
              Inheritance
            </span>
          </div>
        </button>

        <nav className="flex-1 flex flex-col gap-2 p-4">
          <button
            onClick={() => navigate("/overview")}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#2ccd2c] rounded-lg hover:bg-[#2ccd2c]/90 transition-colors"
          >
            <LayoutGridIcon className="w-5 h-5 text-[#0d0501]" />
            <span className="[font-family:'Manrope',Helvetica] font-bold text-[#0d0501] text-sm">
              Dashboard
            </span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group">
            <CheckCircleIcon className="w-5 h-5 text-[#8b7b64] group-hover:text-white" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] group-hover:text-white text-sm">
              Approvals
            </span>
            <span className="ml-auto bg-[#ff6600] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group">
            <FileTextIcon className="w-5 h-5 text-[#8b7b64] group-hover:text-white" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] group-hover:text-white text-sm">
              Tax Reports
            </span>
          </button>

          <button
            onClick={() => navigate("/beneficiary-details")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group"
          >
            <BarChart3Icon className="w-5 h-5 text-[#8b7b64] group-hover:text-white" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] group-hover:text-white text-sm">
              Assets
            </span>
          </button>
        </nav>

        <div className="border-t border-[#392f28] p-4">
          <div className="mb-4 flex items-center gap-3 px-3 py-3 rounded-lg bg-[#181511]">
            <img
              className="w-8 h-8 rounded-full"
              alt="User"
              src="https://images.pexels.com/photos/91227/greater-spotted-woodpecker-bird-red-yellow-black-91227.jpeg?auto=compress&cs=tinysrgb&w=400"
            />
            <div className="flex-1 min-w-0">
              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs truncate">
                Alex Morgan
              </p>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs truncate">
                alex@example.com
              </p>
            </div>
          </div>

          <button className="w-full flex items-center gap-2 px-3 py-2 text-[#2ccd2c] hover:bg-[#27221c] rounded-lg transition-colors">
            <LogOutIcon className="w-4 h-4" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-xs">
              Secure Login
            </span>
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-[#0d0501] overflow-auto">
        <header className="sticky top-0 flex items-center justify-between px-8 py-4 bg-[#0d0501] border-b border-[#392f28]">
          <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
            Overview
          </h1>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:flex">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b7b64]" />
              <input
                type="text"
                placeholder="Search plans..."
                className="pl-10 pr-4 py-2 bg-[#27221c] border border-[#392f28] rounded-lg [font-family:'Manrope',Helvetica] text-white placeholder-[#8b7b64] focus:outline-none focus:border-[#ff6600]"
              />
            </div>

            <button className="relative">
              <BellIcon className="w-5 h-5 text-[#8b7b64] hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2ccd2c] rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </span>
            </button>

            <button className="hover:text-white transition-colors">
              <SettingsIcon className="w-5 h-5 text-[#8b7b64]" />
            </button>
          </div>
        </header>

        <div className="p-8 flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[32px] leading-10">
                  Welcome back, Alex
                </h2>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-base">
                  You have <span className="font-bold text-white">3 active inheritance plans</span> and{" "}
                  <span className="font-bold text-[#ff3b30]">1 urgent approval</span> pending.
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
                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#2ccd2c] text-sm">
                      +5.2%
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      Total Inherited Value
                    </p>
                    <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
                      $1,240,500
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#27221c] rounded-lg">
                      <CheckCircleIcon className="w-6 h-6 text-[#ff3b30]" />
                    </div>
                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff3b30] text-sm">
                      Action Required
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      Pending Approvals
                    </p>
                    <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
                      2 requests
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#27221c] rounded-lg">
                      <PieChartIcon className="w-6 h-6 text-[#007aff]" />
                    </div>
                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#007aff] text-sm">
                      Est. Liability
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      Tax Summary (2024)
                    </p>
                    <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
                      ~15% <span className="text-base text-[#8b7b64]">average</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="[font-family:'Manrope',Helvetica] font-bold text-[#ff3b30] text-base">
              ⚠ Action Required
            </h3>

            <Card className="bg-gradient-to-r from-[#27221c] to-[#181511] border border-[#ff6600] rounded-xl overflow-hidden">
              <CardContent className="p-6 flex items-center gap-8">
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#ff3b30] text-white [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-1 rounded">
                      MPC Trigger
                    </span>
                    <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                      Grandmother's Trust Authorization
                    </h4>
                  </div>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ae9d] text-sm leading-6">
                    The inactivity period has ended. As a designated MPC Signer,
                    your digital signature is required to release the assets.
                    This action is irreversible.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full bg-[#2ccd2c] flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        1/3 Signatures Collected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center gap-4">
                  <img
                    className="w-40 h-40 rounded-lg object-cover"
                    alt="Security"
                    src={padlockImg}
                  />
                  <Button className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-white [font-family:'Manrope',Helvetica] font-bold text-base px-6 py-3 gap-2">
                    <CheckCircleIcon className="w-5 h-5" />
                    Approve Inheritance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl">
                Your Inheritance Plans
              </h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#27221c] rounded-lg transition-colors">
                  <SearchIcon className="w-5 h-5 text-[#8b7b64]" />
                </button>
                <button className="p-2 hover:bg-[#27221c] rounded-lg transition-colors">
                  <LayoutGridIcon className="w-5 h-5 text-[#8b7b64]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#27221c] rounded-lg">
                        <span className="text-2xl">🏛️</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-1">
                          Family Estate Plan
                        </h4>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                          Grantor: Robert Doe
                        </p>
                      </div>
                    </div>
                    <span className="bg-[#2ccd2c] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-3 py-1 rounded-full">
                      Active Monitoring
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6 py-4 border-y border-[#392f28]">
                    <div className="flex flex-col gap-2">
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        Asset
                      </p>
                      <div className="flex flex-col gap-1">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          Bitcoin (BTC)
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          Ethereum (ETH)
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        Amount
                      </p>
                      <div className="flex flex-col gap-1">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          1.5 BTC
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          12.4 ETH
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        Execution Status
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 flex-1 bg-[#27221c] rounded-full overflow-hidden max-w-[180px]">
                          <div className="h-full w-4/5 bg-[#2ccd2c] rounded-full" />
                        </div>
                        <span className="[font-family:'Manrope',Helvetica] font-normal text-[#2ccd2c] text-xs">
                          Monitoring check in 14 days
                        </span>
                      </div>
                    </div>
                    <button className="text-[#007aff] hover:text-[#007aff]/80 [font-family:'Manrope',Helvetica] font-bold text-sm">
                      Details
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#27221c] rounded-lg">
                        <span className="text-2xl">DAO</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-1">
                          DAO Governance Succession
                        </h4>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                          Grantor: DeFi Collective
                        </p>
                      </div>
                    </div>
                    <span className="bg-[#ff9500] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-3 py-1 rounded-full">
                      Pending Signatures
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6 py-4 border-y border-[#392f28]">
                    <div className="flex flex-col gap-2">
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        Asset
                      </p>
                      <div className="flex flex-col gap-1">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          USDC
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        Amount
                      </p>
                      <div className="flex flex-col gap-1">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          $50,000
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                        Execution Status
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 flex-1 bg-[#27221c] rounded-full overflow-hidden max-w-[180px]">
                          <div className="h-full w-1/3 bg-[#ff9500] rounded-full" />
                        </div>
                        <span className="[font-family:'Manrope',Helvetica] font-normal text-[#ff9500] text-xs">
                          Expires in 48 hours
                        </span>
                      </div>
                    </div>
                    <button className="text-[#007aff] hover:text-[#007aff]/80 [font-family:'Manrope',Helvetica] font-bold text-sm">
                      Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <aside className="w-[250px] bg-[#0d0501] border-l border-[#392f28] flex flex-col">
        <div className="p-6 border-b border-[#392f28]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
              Notifications
            </h3>
            <span className="bg-[#2ccd2c] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-1 rounded-full">
              3
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col divide-y divide-[#392f28] overflow-auto">
          <div className="p-4 hover:bg-[#27221c] transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#ff3b30] mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm mb-1">
                  MPC Signature Required
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs leading-5">
                  Grandmother's Trust requires your approval immediately.
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs mt-2">
                  2 hours ago
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-[#27221c] transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#2ccd2c] mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm mb-1">
                  Plan Execution Ready
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs leading-5">
                  "Family Estate Plan" is now 80% through the monitoring phase.
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs mt-2">
                  Yesterday
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-[#27221c] transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#2ccd2c] mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm mb-1">
                  Tax Summary Updated
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs leading-5">
                  New tax implications calculated based on recent crypto volatility.
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs mt-2">
                  2 days ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
