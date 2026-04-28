import { useState } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Lock, Settings as SettingsIcon, Info, ChevronRight, CircleAlert as AlertCircle } from "lucide-react";

export const AssetRegistry = (): JSX.Element => {
  const [releaseAge, setReleaseAge] = useState(18);
  const [selectedStablecoin, setSelectedStablecoin] = useState("BUSD");
  const [contributionAmount, setContributionAmount] = useState("100");
  const [frequency, setFrequency] = useState("Weekly");
  const [mpcApprovalLock, setMpcApprovalLock] = useState(true);

  return (
    <div className="min-h-screen bg-[#0d0b08]">
      {/* Header */}
      <header className="bg-[#1a1410] border-b border-[#3a2f1e] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#ff6600] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🛡️</span>
            </div>
            <span className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
              CIP
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] hover:text-white text-sm">
              Dashboard
            </a>
            <a href="#" className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] hover:text-white text-sm">
              Trusts
            </a>
            <a href="#" className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] hover:text-white text-sm">
              Assets
            </a>
            <a href="#" className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] hover:text-white text-sm">
              Settings
            </a>
            <div className="flex items-center gap-2 bg-[#2a1f10] px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-[#ff6600] text-sm">
                BNB Chain
              </span>
            </div>
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Breadcrumb */}
          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
            Dashboard <span className="text-[#8b7664]">/</span> Trusts{" "}
            <span className="text-[#8b7664]">/</span>{" "}
            <span className="text-white">Children's Trust Account</span>
          </div>

          {/* Title Section */}
          <div className="space-y-4">
            <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl">
              Children's Trust Account
            </h1>
            <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] max-w-2xl">
              Secure your child's future on the BNB Chain. Set up automated savings, choose your stablecoin, and define secure inheritance release rules.
            </p>
            <div className="flex justify-end">
              <Button className="bg-[#332619] hover:bg-[#3a2f1e] border border-[#554433] text-white gap-2 [font-family:'Noto_Sans',Helvetica] font-bold text-sm">
                <SettingsIcon className="w-4 h-4" />
                Set Reminders
              </Button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="col-span-2 space-y-6">
              {/* Beneficiary Details */}
              <Card className="bg-[#1a1410] border-[#3a2f1e]">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👤</span>
                    <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                      Beneficiary Details
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Alice Doe"
                          className="w-full bg-[#0d0b08] border border-[#3a2f1e] rounded-lg px-4 py-2 text-[#b8a494] placeholder-[#695d47] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                        />
                      </div>
                      <div>
                        <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full bg-[#0d0b08] border border-[#3a2f1e] rounded-lg px-4 py-2 text-[#b8a494] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                        Wallet Address (BEP-20)
                      </label>
                      <input
                        type="text"
                        placeholder="0x..."
                        className="w-full bg-[#0d0b08] border border-[#3a2f1e] rounded-lg px-4 py-2 text-[#b8a494] placeholder-[#695d47] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Funding Configuration */}
              <Card className="bg-[#1a1410] border-[#3a2f1e]">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                      Funding Configuration
                    </h3>
                  </div>

                  <div>
                    <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-4">
                      Select Stablecoin
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["BUSD", "USDT", "USDC"].map((coin) => (
                        <button
                          key={coin}
                          onClick={() => setSelectedStablecoin(coin)}
                          className={`py-3 rounded-lg border transition-colors [font-family:'Noto_Sans',Helvetica] font-bold text-sm ${
                            selectedStablecoin === coin
                              ? "bg-[#332619] border-[#ff6600] text-white"
                              : "bg-[#0d0b08] border-[#3a2f1e] text-[#8b7664] hover:border-[#554433]"
                          }`}
                        >
                          <div className="text-lg mb-1">
                            {coin === "BUSD"
                              ? "💛"
                              : coin === "USDT"
                                ? "🟢"
                                : "🟡"}
                          </div>
                          {coin}
                          {coin === "BUSD" && (
                            <div className="text-xs text-[#ff6600] mt-1">
                              Recommended
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                        Contribution Amount
                      </label>
                      <input
                        type="number"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="w-full bg-[#0d0b08] border border-[#3a2f1e] rounded-lg px-4 py-2 text-[#b8a494] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                      />
                    </div>

                    <div>
                      <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                        Frequency
                      </label>
                      <div className="flex gap-2">
                        {["Weekly", "Monthly"].map((freq) => (
                          <button
                            key={freq}
                            onClick={() => setFrequency(freq)}
                            className={`flex-1 py-2 rounded-lg border transition-colors [font-family:'Noto_Sans',Helvetica] font-medium text-sm ${
                              frequency === freq
                                ? "bg-[#332619] border-[#ff6600] text-white"
                                : "bg-[#0d0b08] border-[#3a2f1e] text-[#8b7664]"
                            }`}
                          >
                            {freq}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Release Age and Security */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-[#1a1410] border-[#3a2f1e]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔓</span>
                      <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                        Release Age
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl">
                        {releaseAge}
                        <span className="text-lg text-[#8b7664] ml-2">Years Old</span>
                      </div>

                      <div className="flex justify-between gap-2">
                        {[18, 21, 25, 30].map((age) => (
                          <button
                            key={age}
                            onClick={() => setReleaseAge(age)}
                            className={`flex-1 py-2 rounded-lg border transition-colors [font-family:'Noto_Sans',Helvetica] font-bold text-sm ${
                              releaseAge === age
                                ? "bg-[#332619] border-[#ff6600] text-white"
                                : "bg-[#0d0b08] border-[#3a2f1e] text-[#8b7664]"
                            }`}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1410] border-[#3a2f1e]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔐</span>
                      <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                        Security
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                          MPC Approval Lock
                        </label>
                        <button
                          onClick={() => setMpcApprovalLock(!mpcApprovalLock)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            mpcApprovalLock
                              ? "bg-[#ff6600]"
                              : "bg-[#332619]"
                          }`}
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              mpcApprovalLock ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                      <p className="[font-family:'Noto_Sans',Helvetica] text-[#ff6600] text-xs bg-[#ff66001a] border border-[#ff66004d] rounded p-2">
                        ⚠️ Safe Mode: Guardians must approve any changes to the release schedule.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Projection */}
            <div className="space-y-4">
              <Card className="bg-[#1a1410] border-[#3a2f1e]">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-base">
                      Projection
                    </h3>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 [font-family:'Noto_Sans',Helvetica] font-bold text-xs">
                      5% APY
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                      Projected Value at Age 18
                    </div>
                    <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-3xl">
                      $34,892<span className="text-lg">.45</span>
                    </div>
                    <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                      Based on $100 monthly contribution for 18 years
                    </p>
                  </div>

                  {/* Chart */}
                  <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                    <div className="flex gap-1 h-40 items-end">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-[#ff6600] to-[#ff8c33]"
                          style={{
                            height: `${20 + i * 4}%`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center px-1 pt-2 border-t border-[#3a2f1e]">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                        0
                      </span>
                      <div className="flex items-center gap-1 bg-[#332619] px-2 py-1 rounded">
                        <span className="w-2 h-2 bg-[#ff6600] rounded-full"></span>
                        <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xs">
                          $15,420
                        </span>
                      </div>
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                        18yr
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-[#0d0b08] rounded p-3 space-y-1">
                      <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                        Total Principal
                      </p>
                      <p className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white">
                        $21,600
                      </p>
                    </div>
                    <div className="bg-[#0d0b08] rounded p-3 space-y-1">
                      <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                        Total Interest
                      </p>
                      <p className="[font-family:'Space_Grotesk',Helvetica] font-bold text-green-400">
                        +$13,292
                      </p>
                    </div>
                  </div>

                  {/* Release Info */}
                  <div className="bg-[#332619] border border-[#554433] rounded-lg p-3 space-y-2">
                    <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-xs">
                      Funds will unlock for{" "}
                      <span className="text-white font-bold">Alice Doe</span> on{" "}
                      <span className="text-[#ff6600] font-bold">Oct 24, 2042</span>{" "}
                      when they turn 18.
                    </p>
                  </div>

                  <Button className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white [font-family:'Noto_Sans',Helvetica] font-bold gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Create Trust Account
                  </Button>

                  <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs text-center">
                    Gas fees will be paid in BNB
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
