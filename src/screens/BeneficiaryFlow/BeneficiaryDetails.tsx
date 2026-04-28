import { ChartBar as BarChart3Icon, Bell as BellIcon, FileText as FileTextIcon, LayoutGrid as LayoutGridIcon, LogOut as LogOutIcon, ChartPie as PieChartIcon, Search as SearchIcon, Settings as SettingsIcon, TrendingUp as TrendingUpIcon, CircleCheck as CheckCircleIcon, Download as DownloadIcon, Lock as LockIcon, Chrome as HomeIcon, ChevronRight as ChevronRightIcon, CircleAlert as AlertCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";

export const BeneficiaryDetails = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#0d0501] flex">
      <aside className="w-[193px] bg-[#0d0501] border-r border-[#392f28] flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-[#392f28]">
          <div className="w-8 h-8 flex items-center justify-center bg-[#2ccd2c] rounded-full">
            <span className="text-white font-bold text-sm">IC</span>
          </div>
          <div className="flex flex-col">
            <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
              InheritChain
            </span>
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#695a47] text-xs">
              Secure Legacy Protocol
            </span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2 p-4">
          <button
            onClick={() => navigate("/overview")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group"
          >
            <LayoutGridIcon className="w-5 h-5 text-[#8b7b64] group-hover:text-white" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] group-hover:text-white text-sm">
              Dashboard
            </span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group">
            <FileTextIcon className="w-5 h-5 text-[#8b7b64] group-hover:text-white" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] group-hover:text-white text-sm">
              My Plans
            </span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group">
            <HomeIcon className="w-5 h-5 text-[#8b7b64] group-hover:text-white" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] group-hover:text-white text-sm">
              Beneficiary Plans
            </span>
          </button>

          <button
            onClick={() => navigate("/beneficiary-details")}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#27221c] rounded-lg hover:bg-[#2d251f] transition-colors"
          >
            <BarChart3Icon className="w-5 h-5 text-white" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm">
              Wallet & Assets
            </span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#27221c] transition-colors group">
            <SettingsIcon className="w-5 h-5 text-[#8b7b64] group-hover:text-white" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] group-hover:text-white text-sm">
              Settings
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
                Beneficiary
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
          <div className="flex items-center gap-2 text-[#8b7b64]">
            <button
              onClick={() => navigate("/overview")}
              className="hover:text-white transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
            </button>
            <span className="text-sm">/</span>
            <span className="text-sm">Beneficiary Plans</span>
            <span className="text-sm">/</span>
            <span className="text-sm font-bold text-white">Plan #4029 Details</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#2ccd2c]">
              <div className="w-2 h-2 rounded-full bg-[#2ccd2c]" />
              <span className="[font-family:'Manrope',Helvetica] font-normal text-xs">
                End-to-End Encrypted
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full"
                alt="User"
                src="https://images.pexels.com/photos/91227/greater-spotted-woodpecker-bird-red-yellow-black-91227.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              <div className="flex flex-col gap-0">
                <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                  Alex Morgan
                </span>
                <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                  Beneficiary
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-3xl">
                    Estate Plan #4029
                  </h1>
                  <span className="bg-[#2ccd2c] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-3 py-1 rounded-full">
                    ACTIVE MONITORING
                  </span>
                </div>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                  Smith Family Trust • Last Updated: 2 hours ago
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button className="flex items-center gap-2 bg-transparent border border-[#392f28] text-white hover:bg-[#27221c] [font-family:'Manrope',Helvetica] font-bold text-sm px-4 py-2">
                  <DownloadIcon className="w-4 h-4" />
                  Export PDF
                </Button>
                <Button className="flex items-center gap-2 bg-transparent border border-[#392f28] text-white hover:bg-[#27221c] [font-family:'Manrope',Helvetica] font-bold text-sm px-4 py-2">
                  History
                </Button>
              </div>
            </div>
          </section>

          <Card className="bg-[#181511] border-l-4 border-l-[#2ccd2c] border-t border-t-[#392f28] border-r border-r-[#392f28] border-b border-b-[#392f28] rounded-xl">
            <CardContent className="p-6 flex items-start gap-4">
              <AlertCircleIcon className="w-6 h-6 text-[#2ccd2c] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-1">
                  Action Required: Signatures Pending
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm mb-4">
                  You are listed as a designated signer for this plan (Key ID: 0x82...91a).
                  1 signature is pending from your account to authorize the next stage of distribution review.
                </p>
                <Button className="bg-[#2ccd2c] hover:bg-[#2ccd2c]/90 text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-sm px-4 py-2 gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  Approve Inheritance
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-4 gap-6">
            <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📦</span>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                    Assets Included
                  </p>
                </div>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
                  4 Items
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                  Multi-chain assets
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                    Tax Status
                  </p>
                </div>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
                  Pending
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                  Assessment upon execution
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏰</span>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                    Trigger Type
                  </p>
                </div>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
                  Dead Man's Switch
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                  Inactivity Period: 365 Days
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">❤️</span>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                    Current Status
                  </p>
                </div>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
                  Heartbeat Active
                </p>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                  Last check-in: 2 days ago
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 flex flex-col gap-4">
              <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                      Asset Allocation
                    </h3>
                    <span className="flex items-center gap-1 text-[#ff9500] text-xs [font-family:'Manrope',Helvetica]">
                      <LockIcon className="w-3 h-3" />
                      Restricted View
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between py-3 border-b border-[#392f28]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#ff9500] flex items-center justify-center text-white font-bold text-sm">
                          ₿
                        </div>
                        <div>
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                            Bitcoin
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                            BTC
                          </p>
                        </div>
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff9500] text-sm">
                        Bitcoin Network
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-[#392f28]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#627eea] flex items-center justify-center text-white font-bold text-sm">
                          Ξ
                        </div>
                        <div>
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                            Ethereum
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                            ETH
                          </p>
                        </div>
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-[#627eea] text-sm">
                        Ethereum Mainnet
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-[#392f28]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#2ccd2c] flex items-center justify-center text-white font-bold text-sm">
                          U
                        </div>
                        <div>
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                            USDC
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                            Stablecoin
                          </p>
                        </div>
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-[#a78bfa] text-sm">
                        Polygon
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#627eea] flex items-center justify-center text-white font-bold text-xs">
                          🦍
                        </div>
                        <div>
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                            Bored Ape #8822
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                            NFT
                          </p>
                        </div>
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-[#627eea] text-sm">
                        Ethereum Mainnet
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                <CardContent className="p-6 flex flex-col gap-4">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                    Plan Timeline
                  </h3>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#2ccd2c]" />
                        <div className="w-0.5 h-12 bg-[#392f28] mt-2" />
                      </div>
                      <div className="pb-4">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          Plan Created & Funded
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">
                          Smart contracts deployed and assets locked in vault.
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-2">
                          Jan 12, 2023
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#2ccd2c]" />
                        <div className="w-0.5 h-12 bg-[#2ccd2c] mt-2" />
                      </div>
                      <div className="pb-4">
                        <div className="flex items-center gap-2">
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                            Inactivity Monitoring
                          </p>
                          <span className="bg-[#2ccd2c] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-1 rounded">
                            ACTIVE
                          </span>
                        </div>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">
                          Oracle checking wallet activity every 24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#8b7b64]" />
                        <div className="w-0.5 h-12 bg-[#392f28] mt-2" />
                      </div>
                      <div className="pb-4">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          Grace Period
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">
                          30 days allowed for owner to cancel trigger.
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#ff9500] text-xs mt-2">
                          Pending
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#8b7b64]" />
                        <div className="w-0.5 h-12 bg-[#392f28] mt-2" />
                      </div>
                      <div className="pb-4">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          MPC Authorization
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">
                          Designated signers must approve asset release.
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#ff9500] text-xs mt-2">
                          Pending
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#8b7b64]" />
                      </div>
                      <div className="pb-4">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                          Distribution Executed
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-1">
                          Assets transferred to beneficiary wallets.
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs mt-2">
                          Locked
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-4">
              <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                <CardContent className="p-6 flex flex-col gap-4">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
                    MPC Approvals
                  </h3>

                  <div className="flex flex-col items-center gap-3 py-4">
                    <div className="relative w-32 h-32">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 120 120"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="#392f28"
                          strokeWidth="8"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="#2ccd2c"
                          strokeWidth="8"
                          strokeDasharray={`${(2 * 54 * 3.14159 * 66) / 100} ${2 * 54 * 3.14159}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl">
                          66%
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                          Approval
                        </p>
                      </div>
                    </div>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs text-center">
                      2/3 REQUIRED
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 bg-[#27221c] rounded-lg">
                      <CheckCircleIcon className="w-5 h-5 text-[#2ccd2c]" />
                      <div className="flex-1">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                          Authorized Signer
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                          Signature verified
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[#27221c] rounded-lg">
                      <CheckCircleIcon className="w-5 h-5 text-[#2ccd2c]" />
                      <div className="flex-1">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                          Authorized Signer
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                          Signature verified
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[#27221c] rounded-lg">
                      <div className="w-5 h-5 rounded-full border-2 border-[#ff9500] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#ff9500] text-xs font-bold">!</span>
                      </div>
                      <div className="flex-1">
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                          You (Beneficiary)
                        </p>
                        <span className="bg-[#2ccd2c] text-[#0d0501] [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-0.5 rounded inline-block mt-1">
                          Sign
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
                <CardContent className="p-6 flex flex-col gap-4">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
                    Legal Documents
                  </h3>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 bg-[#27221c] rounded-lg hover:bg-[#2d251f] transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 flex-1">
                        <FileTextIcon className="w-5 h-5 text-[#8b7b64]" />
                        <div>
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                            Last Will & Testament.pdf
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                            Updated Jan 12, 2023
                          </p>
                        </div>
                      </div>
                      <DownloadIcon className="w-4 h-4 text-[#8b7b64] hover:text-white" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#27221c] rounded-lg hover:bg-[#2d251f] transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 flex-1">
                        <FileTextIcon className="w-5 h-5 text-[#8b7b64]" />
                        <div>
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                            Trust Deed.pdf
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-xs">
                            Updated Jan 12, 2023
                          </p>
                        </div>
                      </div>
                      <DownloadIcon className="w-4 h-4 text-[#8b7b64] hover:text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
