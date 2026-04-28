import { useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  changeDirection: "up" | "down";
  volatility: "Low Risk" | "Medium" | "High" | "Very Low";
  volatilityIcon: string;
  volatilityColor: string;
  chartColor: string;
  icon: string;
  category: "Safe" | "Cautionary" | "High Risk";
  hasSelect?: boolean;
}

const assets: Asset[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    price: "$42,384.21",
    change: "↑",
    changePercent: "2.4%",
    changeDirection: "up",
    volatility: "Low Risk",
    volatilityIcon: "🛡️",
    volatilityColor: "text-green-400",
    chartColor: "bg-green-500",
    icon: "🟠",
    category: "Safe",
    hasSelect: true,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,254.12",
    change: "↓",
    changePercent: "0.8%",
    changeDirection: "down",
    volatility: "Medium",
    volatilityIcon: "⚠️",
    volatilityColor: "text-yellow-400",
    chartColor: "bg-yellow-500",
    icon: "🌐",
    category: "Cautionary",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    price: "$104.45",
    change: "↑",
    changePercent: "12.5%",
    changeDirection: "up",
    volatility: "High",
    volatilityIcon: "⚡",
    volatilityColor: "text-red-400",
    chartColor: "bg-red-500",
    icon: "🔷",
    category: "High Risk",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    price: "$1.00",
    change: "—",
    changePercent: "0.0%",
    changeDirection: "up",
    volatility: "Very Low",
    volatilityIcon: "✓",
    volatilityColor: "text-green-400",
    chartColor: "bg-teal-500",
    icon: "💵",
    category: "Safe",
    hasSelect: true,
  },
  {
    id: "link",
    name: "Chainlink",
    symbol: "LINK",
    price: "$14.82",
    change: "↓",
    changePercent: "4.1%",
    changeDirection: "down",
    volatility: "Medium",
    volatilityIcon: "⚠️",
    volatilityColor: "text-yellow-400",
    chartColor: "bg-yellow-500",
    icon: "🔗",
    category: "Cautionary",
  },
];

export const RealTimeVolatility = (): JSX.Element => {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState("7");

  const safeCount = assets.filter((a) => a.category === "Safe").length;
  const cautionaryCount = assets.filter((a) => a.category === "Cautionary").length;
  const highRiskCount = assets.filter((a) => a.category === "High Risk").length;

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
                  Secure Legacy Management
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {[
              { icon: "📊", label: "Overview", id: "overview" },
              { icon: "🎯", label: "Asset Selection", id: "asset-selection" },
              { icon: "👥", label: "Beneficiaries", id: "beneficiaries" },
              { icon: "🔒", label: "Security", id: "security" },
              { icon: "📊", label: "Reports", id: "reports" },
            ].map((item) => {
              let href = "#";
              if (item.id === "reports") href = "/reports";
              if (item.id === "security") href = "/security";

              return (
                <Link
                  key={item.id}
                  to={href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors block ${
                    item.id === "asset-selection"
                      ? "bg-[#332619] text-white"
                      : "text-[#b8a494] hover:bg-[#2a1f10] hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-[#3a2f1e] p-4 space-y-3">
            <div className="text-[#8b7664] text-xs [font-family:'Noto_Sans',Helvetica]">
              STORAGE STATUS
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm [font-family:'Noto_Sans',Helvetica]">
                <span className="text-[#8b7664]">45% Used</span>
                <span className="text-[#8b7664]">120GB Free</span>
              </div>
              <div className="w-full bg-[#0d0b08] rounded-full h-2 overflow-hidden">
                <div className="bg-[#ff6600] h-full" style={{ width: "45%" }} />
              </div>
            </div>
          </div>

          <div className="border-t border-[#3a2f1e] p-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2a1f10]">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
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
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7664]" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="w-full max-w-sm bg-[#0d0b08] border border-[#3a2f1e] rounded-lg pl-10 pr-4 py-2 text-[#b8a494] placeholder-[#695d47] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                />
              </div>

              <div className="flex items-center gap-4">
                <button className="px-3 py-2 rounded-lg bg-[#332619] text-[#ff6600] [font-family:'Noto_Sans',Helvetica] font-bold text-sm hover:bg-[#3a2f1e]">
                  Assets
                </button>
                <button className="w-10 h-10 rounded-full bg-[#332619] hover:bg-[#3a2f1e] flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#8b7664]" />
                </button>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  👤
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* Beta Feature Banner */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#332619]/50 border border-[#ff6600]/30">
                <div className="px-2 py-1 bg-[#ff6600] rounded text-white text-xs [font-family:'Noto_Sans',Helvetica] font-bold">
                  Beta Feature
                </div>
                <div className="flex-1">
                  <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                    Real-Time Volatility Assessment
                  </h1>
                  <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-sm mt-1">
                    Analyze asset stability before securing them in the inheritance vault. Select assets with lower volatility scores to ensure consistent value preservation for your beneficiaries.
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-[#1a1410] border-[#3a2f1e]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        🛡️
                      </div>
                      <div>
                        <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                          {safeCount}
                        </div>
                        <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                          Safe Assets
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1410] border-[#3a2f1e]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        ⚠️
                      </div>
                      <div>
                        <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                          {cautionaryCount}
                        </div>
                        <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                          Medium Risk
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1410] border-[#3a2f1e]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                        ⚡
                      </div>
                      <div>
                        <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                          {highRiskCount}
                        </div>
                        <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                          High Risk
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeframe Selector */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setTimeframe("7")}
                  className={`px-4 py-2 rounded-lg [font-family:'Noto_Sans',Helvetica] font-bold text-sm transition-colors ${
                    timeframe === "7"
                      ? "bg-[#ff6600] text-white"
                      : "bg-[#332619] text-[#8b7664] hover:text-white"
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setTimeframe("30")}
                  className={`px-4 py-2 rounded-lg [font-family:'Noto_Sans',Helvetica] font-bold text-sm transition-colors ${
                    timeframe === "30"
                      ? "bg-[#ff6600] text-white"
                      : "bg-[#332619] text-[#8b7664] hover:text-white"
                  }`}
                >
                  30 Days
                </button>
              </div>

              {/* Assets Grid */}
              <div className="grid grid-cols-3 gap-6">
                {assets.map((asset) => (
                  <Card
                    key={asset.id}
                    className="bg-[#1a1410] border-[#3a2f1e] hover:border-[#554433] transition-colors"
                  >
                    <CardContent className="p-6 space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-[#332619] rounded-lg flex items-center justify-center text-2xl">
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
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-xs [font-family:'Noto_Sans',Helvetica] font-bold ${
                            asset.category === "Safe"
                              ? "bg-green-500/20 text-green-400"
                              : asset.category === "Cautionary"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {asset.category === "Safe"
                            ? "✓ Stable Asset"
                            : asset.category === "Cautionary"
                              ? "⚠ Medium Risk"
                              : "⚡ High Risk"}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="space-y-2">
                        <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-3xl">
                          {asset.price}
                        </div>
                        <div
                          className={`flex items-center gap-1 ${
                            asset.changeDirection === "up" ? "text-green-400" : "text-red-400"
                          } [font-family:'Noto_Sans',Helvetica] font-bold text-sm`}
                        >
                          {asset.changeDirection === "up" ? "↑" : "↓"} {asset.changePercent}
                        </div>
                      </div>

                      {/* Chart Placeholder */}
                      <div className="h-16 bg-[#0d0b08] rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 flex items-end justify-center gap-1 p-2">
                          <div
                            className={`${asset.chartColor} rounded-full`}
                            style={{ width: "4px", height: "40%" }}
                          />
                          <div
                            className={`${asset.chartColor} rounded-full`}
                            style={{ width: "4px", height: "60%" }}
                          />
                          <div
                            className={`${asset.chartColor} rounded-full`}
                            style={{ width: "4px", height: "45%" }}
                          />
                          <div
                            className={`${asset.chartColor} rounded-full`}
                            style={{ width: "4px", height: "70%" }}
                          />
                          <div
                            className={`${asset.chartColor} rounded-full`}
                            style={{ width: "4px", height: "50%" }}
                          />
                        </div>
                      </div>

                      {/* Volatility Score */}
                      <div className="space-y-2">
                        <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                          Volatility Score
                        </div>
                        <div className={`flex items-center gap-2 [font-family:'Noto_Sans',Helvetica] font-bold text-sm ${asset.volatilityColor}`}>
                          <span>{asset.volatilityIcon}</span>
                          {asset.volatility}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex gap-2 pt-2">
                        {asset.hasSelect ? (
                          <Button
                            onClick={() =>
                              setSelectedAssets((prev) =>
                                prev.includes(asset.id)
                                  ? prev.filter((id) => id !== asset.id)
                                  : [...prev, asset.id]
                              )
                            }
                            className={`flex-1 [font-family:'Noto_Sans',Helvetica] font-bold text-sm ${
                              selectedAssets.includes(asset.id)
                                ? "bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                                : "bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                            }`}
                          >
                            Select
                          </Button>
                        ) : (
                          <Button className="flex-1 bg-[#332619] hover:bg-[#3a2f1e] text-[#8b7664] [font-family:'Noto_Sans',Helvetica] font-bold text-sm">
                            Details
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add New Asset Card */}
                <Card className="bg-[#1a1410] border-2 border-dashed border-[#3a2f1e] hover:border-[#554433] transition-colors flex items-center justify-center min-h-96">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#332619] rounded-lg flex items-center justify-center text-2xl mx-auto">
                      ➕
                    </div>
                    <div>
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                        Monitor New Asset
                      </div>
                      <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs mt-2">
                        Add a new token to your volatility dashboard to track its risk profile.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
