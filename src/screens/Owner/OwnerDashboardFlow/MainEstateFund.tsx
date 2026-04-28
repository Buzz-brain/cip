// import { useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, Download } from "lucide-react";

interface Asset {
  icon: string;
  name: string;
  symbol: string;
  balance: string;
  value: string;
  type: string;
}

const assets: Asset[] = [
  {
    icon: "💎",
    name: "Ethereum",
    symbol: "ETH",
    balance: "12.5 ETH",
    value: "$24,350.00",
    type: "Native Token",
  },
  {
    icon: "💵",
    name: "USD Coin",
    symbol: "USDC",
    balance: "5,000 USDC",
    value: "$5,000.00",
    type: "Stablecoin",
  },
  {
    icon: "🎨",
    name: "Bored Ape #4521",
    symbol: "BAYC • ERC-721",
    balance: "1 Token",
    value: "$3,100.00",
    type: "NFT",
  },
];

interface Beneficiary {
  name: string;
  address: string;
  percentage: number;
}

const beneficiaries: Beneficiary[] = [
  {
    name: "alice.eth",
    address: "0x7IC...9A21",
    percentage: 45,
  },
  {
    name: "Bob Anderson",
    address: "0x5K...7F88",
    percentage: 55,
  },
];

export const MainEstateFund = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0d0b08]">
      <div className="flex h-screen bg-[#0d0b08]">
        {/* Sidebar */}
        <div className="w-56 bg-[#1a1410] border-r border-[#3a2f1e] flex flex-col">
          <div className="p-6 border-b border-[#3a2f1e]">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#ff6600] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🛡️</span>
              </div>
              <div>
                <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                  CIP Protocol
                </div>
                <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                  Secure Multi-Chain Legacy
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {[
              { icon: "📊", label: "Dashboard", id: "dashboard" },
              { icon: "➕", label: "Create Plan", id: "create-plan" },
              { icon: "👥", label: "Beneficiaries", id: "beneficiaries" },
              { icon: "🏛️", label: "Asset Registry", id: "asset-registry" },
              { icon: "📈", label: "Reports", id: "reports" },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.id === "dashboard" ? "/dashboard" : item.id === "asset-registry" ? "/asset-selection" : "#"}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors block ${
                  item.id === "reports"
                    ? "bg-[#332619] text-white"
                    : "text-[#b8a494] hover:bg-[#2a1f10] hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="border-t border-[#3a2f1e] p-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2a1f10]">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xs truncate">
                  alex.eth
                </div>
                <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-[#1a1410] border-b border-[#3a2f1e] px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#8b7664]">
                <span className="[font-family:'Noto_Sans',Helvetica] text-sm">Protocol</span>
                <span>&gt;</span>
                <span className="[font-family:'Noto_Sans',Helvetica] text-sm">Dashboard</span>
                <span>&gt;</span>
                <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                  Plan Details
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Button className="bg-[#ff6600] hover:bg-[#ff6600]/90 [font-family:'Noto_Sans',Helvetica] font-bold text-sm gap-2">
                  <span>🔌</span>
                  Connect Wallet
                </Button>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* Back and Title */}
              <div className="space-y-4">
                <Link to="/asset-selection" className="flex items-center gap-2 text-[#ff6600] hover:text-[#ff6600]/80 [font-family:'Noto_Sans',Helvetica] font-bold text-sm">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Plans
                </Link>

                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl">
                        Main Estate Fund
                      </h1>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 [font-family:'Noto_Sans',Helvetica] font-bold">
                        ● Active
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 [font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                      <div className="flex items-center gap-2">
                        <span>🏷️</span>
                        <span>tag ID: #0042</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🌐</span>
                        <span>Ethereum Network</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>Created: Oct 24, 2026</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button className="bg-[#332619] hover:bg-[#3a2f1e] text-white [font-family:'Noto_Sans',Helvetica] font-bold text-sm gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Summary
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="col-span-2 space-y-6">
                  {/* Assets Breakdown */}
                  <Card className="bg-[#1a1410] border-[#3a2f1e]">
                    <CardContent className="p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏦</span>
                          <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                            Assets Breakdown
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                            Total Value Secured
                          </div>
                          <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                            $32,450.00
                          </div>
                        </div>
                      </div>

                      {/* Assets Table */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-4 gap-4 pb-3 border-b border-[#3a2f1e]">
                          <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-[#8b7664] text-xs uppercase">
                            Asset Name
                          </div>
                          <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-[#8b7664] text-xs uppercase">
                            Type
                          </div>
                          <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-[#8b7664] text-xs uppercase">
                            Balance
                          </div>
                          <div className="text-right [font-family:'Noto_Sans',Helvetica] font-bold text-[#8b7664] text-xs uppercase">
                            Current Value
                          </div>
                        </div>

                        {assets.map((asset, idx) => (
                          <div key={idx} className="grid grid-cols-4 gap-4 py-4 border-b border-[#3a2f1e]">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#332619] rounded-lg flex items-center justify-center text-lg">
                                {asset.icon}
                              </div>
                              <div>
                                <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                                  {asset.name}
                                </div>
                                <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                                  {asset.symbol}
                                </div>
                              </div>
                            </div>
                            <div className="[font-family:'Noto_Sans',Helvetica] text-white text-sm">
                              {asset.type}
                            </div>
                            <div className="[font-family:'Noto_Sans',Helvetica] text-white text-sm">
                              {asset.balance}
                            </div>
                            <div className="text-right [font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                              {asset.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax Report */}
                  <Card className="bg-[#1a1410] border-[#3a2f1e]">
                    <CardContent className="p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏷️</span>
                          <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                            Estimated Tax Report
                          </h3>
                        </div>
                        <Button className="bg-[#332619] hover:bg-[#3a2f1e] text-[#ff6600] [font-family:'Noto_Sans',Helvetica] font-bold text-sm gap-2">
                          <Download className="w-4 h-4" />
                          Download PDF
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                            Jurisdiction
                          </div>
                          <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                            United States (Federal)
                          </div>
                        </div>

                        <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                            Est. Estate Tax
                          </div>
                          <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                            $0.00
                            <span className="text-[#8b7664] text-xs ml-2">(Below threshold)</span>
                          </div>
                        </div>

                        <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                            Est. Capital Gains
                          </div>
                          <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                            ~$4,250.00
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#332619]/50 border border-[#ff6600]/30 rounded-lg p-4">
                        <div className="flex gap-3">
                          <span className="text-lg">ℹ️</span>
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-sm">
                            Estimations are based on current asset values and generic tax rules for the selected jurisdiction. This is not financial advice. Please consult a certified tax professional.
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Trigger Configuration */}
                  <Card className="bg-[#1a1410] border-[#3a2f1e]">
                    <CardContent className="p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">⏱️</span>
                          <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                            Trigger Configuration
                          </h3>
                        </div>
                        <button className="text-[#8b7664] hover:text-white">
                          <span className="text-xl">⋯</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🎯</span>
                            <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                              Trigger Type
                            </div>
                          </div>
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm ml-6">
                            Inactivity Period
                          </div>
                        </div>

                        <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                            Wait Period
                          </div>
                          <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                            12 Months
                          </div>
                        </div>

                        <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                            Timeline
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="[font-family:'Noto_Sans',Helvetica] text-white text-sm">
                              <span className="text-[#ff6600]">Last Check-in</span>
                            </div>
                            <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                              2 days ago
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                            Grace Period Starts
                          </div>
                          <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                            Oct 24, 2024
                          </div>
                        </div>

                        <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                            Execution Date
                          </div>
                          <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                            Nov 24, 2024
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Proof of Life */}
                  <Card className="bg-[#1a1410] border-[#3a2f1e]">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                          Proof of Life
                        </h3>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="[font-family:'Noto_Sans',Helvetica] text-green-400 text-sm font-bold">
                          ✓ Wallet Signature Required
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Beneficiaries */}
                  <Card className="bg-[#1a1410] border-[#3a2f1e]">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">👥</span>
                          <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                            Beneficiaries
                          </h3>
                        </div>
                        <Badge className="bg-[#332619] text-[#ff6600] [font-family:'Noto_Sans',Helvetica] font-bold text-xs">
                          {beneficiaries.length}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {beneficiaries.map((beneficiary, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                                  {beneficiary.name}
                                </div>
                                <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                                  {beneficiary.address}
                                </div>
                              </div>
                              <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                                {beneficiary.percentage}%
                              </div>
                            </div>
                            <div className="w-full bg-[#0d0b08] rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-[#ff6600] to-[#ff8c33] h-full"
                                style={{ width: `${beneficiary.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
