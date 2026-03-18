import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router-dom";
import { Bell, Zap, Plus, Eye, EyeOff, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  chainName: string;
  chainIcon: string;
  beneficiary: {
    name: string;
    avatar: string;
  };
  assets: string;
  assetsDetail: string;
  status: "Active" | "Pending" | "Triggered";
  statusColor: string;
  triggerDays: number;
}

interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  timestamp: string;
}

const plans: Plan[] = [
  {
    id: "0042",
    name: "Main Estate Fund",
    chainName: "Ethereum",
    chainIcon: "💎",
    beneficiary: { name: "alice.eth", avatar: "🔴" },
    assets: "$32,450.00",
    assetsDetail: "12.5 ETH, 4 NFTs",
    status: "Active",
    statusColor: "bg-green-500",
    triggerDays: 1,
  },
  {
    id: "0045",
    name: "DeFi Safety Net",
    chainName: "Polygon",
    chainIcon: "⭕",
    beneficiary: { name: "0x4f...a9", avatar: "🟠" },
    assets: "$4,500.00",
    assetsDetail: "4500 USDC",
    status: "Pending",
    statusColor: "bg-yellow-500",
    triggerDays: 1,
  },
  {
    id: "0018",
    name: "Cold Storage Vault",
    chainName: "Bitcoin",
    chainIcon: "₿",
    beneficiary: { name: "sarah.btc", avatar: "🟣" },
    assets: "$105,550.00",
    assetsDetail: "1.5 BTC",
    status: "Active",
    statusColor: "bg-green-500",
    triggerDays: 3,
  },
];

const activities: ActivityItem[] = [
  {
    id: "1",
    icon: "✓",
    title: "Heartbeat Confirmed",
    description: "Automated check passed successfully.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    icon: "📋",
    title: "Plan #0045 Edited",
    description: "Beneficiary allocation updated.",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    icon: "⛽",
    title: "Gas Top-up",
    description: "0.05 ETH added to execution wallet.",
    timestamp: "3 days ago",
  },
  {
    id: "4",
    icon: "📦",
    title: "New Asset Registered",
    description: "NFT collection added to registry.",
    timestamp: "5 days ago",
  },
];

const sidebarMenuItems = [
  { icon: "📊", label: "Dashboard", id: "dashboard" },
  { icon: "➕", label: "Create Plan", id: "create-plan" },
  { icon: "👥", label: "Beneficiaries", id: "beneficiaries" },
  { icon: "🏛️", label: "Asset Registry", id: "asset-registry" },
];

const systemMenuItems = [
  { icon: "⚙️", label: "Settings", id: "settings" },
  { icon: "❓", label: "Support", id: "support" },
];

export const OwnerDashboard = (): JSX.Element => {
  const [showValues, setShowValues] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#0d0b08]">
      <div className="flex h-screen bg-[#0d0b08]">
        {/* Sidebar */}
        <div className="w-56 bg-[#1a1410] border-r border-[#3a2f1e] flex flex-col">
          {/* Logo */}
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

          {/* Main Menu */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {sidebarMenuItems.map((item) => {
              let href = "#";
              if (item.id === "create-plan") href = "/create-plan";
              if (item.id === "asset-registry") href = "/asset-selection";

              return (
                <Link
                  key={item.id}
                  to={href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors block ${
                    item.id === "dashboard"
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

          {/* System Menu */}
          <div className="border-t border-[#3a2f1e] p-4 space-y-2">
            {systemMenuItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#8b7664] hover:bg-[#2a1f10] hover:text-white transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* User Profile */}
          <div className="border-t border-[#3a2f1e] p-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2a1f10]">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
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
          {/* Top Header */}
          <header className="bg-[#1a1410] border-b border-[#3a2f1e] px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#8b7664]">
                <span className="[font-family:'Noto_Sans',Helvetica] text-sm">
                  Protocol
                </span>
                <span>&gt;</span>
                <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                  Dashboard
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-[#332619] hover:bg-[#3a2f1e] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#ff6600]" />
                </button>
                <button className="relative w-10 h-10 rounded-full bg-[#332619] hover:bg-[#3a2f1e] flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#8b7664]" />
                  <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </button>
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
              {/* Welcome Section */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl mb-2">
                    Welcome back, igwe.eth
                  </h1>
                  <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494]">
                    Manage your active inheritance plans and monitor asset security.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowValues(!showValues)}
                    className="px-4 py-2 rounded-lg bg-[#332619] hover:bg-[#3a2f1e] text-[#8b7664] hover:text-white transition-colors flex items-center gap-2 [font-family:'Noto_Sans',Helvetica] font-medium text-sm"
                  >
                    {showValues ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Hide Values
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Show Values
                      </>
                    )}
                  </button>
                  <Link to="/create-plan">
                    <Button className="bg-[#ff6600] hover:bg-[#ff6600]/90 [font-family:'Noto_Sans',Helvetica] font-bold text-sm gap-2">
                      <Plus className="w-4 h-4" />
                      Create New Plan
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-[#1a1410] border-[#3a2f1e]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                        Total Value Secured
                      </span>
                      <div className="w-8 h-8 bg-[#ff66001a] rounded flex items-center justify-center">
                        🔒
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                        {showValues ? "$142,500.00" : "••••••"}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-400 text-sm">↑ +5.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1410] border-[#3a2f1e]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                        Active Plans
                      </span>
                      <div className="w-8 h-8 bg-[#135bec1a] rounded flex items-center justify-center">
                        📋
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                        3
                      </div>
                      <div className="text-[#8b7664] text-sm">plans monitored</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1410] border-[#3a2f1e]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                        Next Trigger Check
                      </span>
                      <div className="w-8 h-8 bg-[#f6a83b1a] rounded flex items-center justify-center">
                        ⏱️
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                        12 Days
                      </div>
                      <div className="text-[#8b7664] text-sm">Plan #0042</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1410] border-[#3a2f1e]">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                        Network Status
                      </span>
                      <div className="w-8 h-8 bg-[#22c55e1a] rounded flex items-center justify-center">
                        📈
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Healthy
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Plans Table Section */}
              <Card className="bg-[#1a1410] border-[#3a2f1e]">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 rounded-lg bg-[#332619] text-white [font-family:'Noto_Sans',Helvetica] font-medium text-sm">
                      All Plans
                    </button>
                    {["Active", "Pending", "Triggered"].map((status) => (
                      <button
                        key={status}
                        className="px-4 py-2 rounded-lg text-[#8b7664] hover:bg-[#2a1f10] [font-family:'Noto_Sans',Helvetica] font-medium text-sm"
                      >
                        {status}
                      </button>
                    ))}

                    <div className="ml-auto relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7664]" />
                      <input
                        type="text"
                        placeholder="Search plans..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#0d0b08] border border-[#3a2f1e] rounded-lg pl-10 pr-4 py-2 text-[#b8a494] placeholder-[#695d47] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                      />
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#3a2f1e]">
                          <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-bold text-[#8b7664] text-xs uppercase tracking-wider">
                            Plan ID & Chain
                          </th>
                          <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-bold text-[#8b7664] text-xs uppercase tracking-wider">
                            Beneficiary
                          </th>
                          <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-bold text-[#8b7664] text-xs uppercase tracking-wider">
                            Assets
                          </th>
                          <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-bold text-[#8b7664] text-xs uppercase tracking-wider">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 [font-family:'Noto_Sans',Helvetica] font-bold text-[#8b7664] text-xs uppercase tracking-wider">
                            Trig
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {plans.map((plan) => (
                          <tr
                            key={plan.id}
                            className="border-b border-[#3a2f1e] hover:bg-[#0d0b08] transition-colors"
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#332619] rounded-lg flex items-center justify-center text-lg">
                                  {plan.chainIcon}
                                </div>
                                <div>
                                  <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                                    {plan.name}
                                  </div>
                                  <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                                    #{plan.id} • {plan.chainName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  {plan.beneficiary.avatar}
                                </div>
                                <span className="[font-family:'Noto_Sans',Helvetica] text-white text-sm">
                                  {plan.beneficiary.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div>
                                <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                                  {showValues ? plan.assets : "••••••"}
                                </div>
                                <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                                  {plan.assetsDetail}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge
                                className={`${
                                  plan.status === "Active"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : plan.status === "Pending"
                                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                      : "bg-red-500/20 text-red-400 border-red-500/30"
                                } [font-family:'Noto_Sans',Helvetica] font-bold text-xs`}
                              >
                                {plan.status === "Active"
                                  ? "● Active"
                                  : plan.status === "Pending"
                                    ? "● Pending"
                                    : "● Triggered"}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                                {plan.triggerDays}h
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between pt-4">
                    <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                      Showing 1-3 of 3 plans
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded border border-[#3a2f1e] hover:bg-[#2a1f10] flex items-center justify-center">
                        <ChevronLeft className="w-4 h-4 text-[#8b7664]" />
                      </button>
                      <button className="w-8 h-8 rounded border border-[#3a2f1e] hover:bg-[#2a1f10] flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-[#8b7664]" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Proof of Life Section */}
              <Card className="bg-gradient-to-r from-[#3a2f1e] to-[#2a1f10] border-[#554433]">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                        Proof of Life
                      </h3>
                      <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-sm mt-1">
                        Your heartbeat status is active. Next confirmation required via wallet signature.
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 [font-family:'Noto_Sans',Helvetica] font-bold text-xs">
                      ● ONLINE
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-sm">
                        Heartbeat Progress
                      </span>
                      <span className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-sm">
                        85%
                      </span>
                    </div>
                    <div className="w-full bg-[#1a1410] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#ff6600] to-[#ff8c33] h-full rounded-full"
                        style={{ width: "85%" }}
                      />
                    </div>
                    <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                      Refreshes in 48 hours
                    </div>
                  </div>

                  <Button className="w-full bg-[#332619] hover:bg-[#3a2f1e] text-white [font-family:'Noto_Sans',Helvetica] font-bold mt-4">
                    Confirm Now
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                    Recent Activity
                  </h2>
                  <a
                    href="#"
                    className="[font-family:'Noto_Sans',Helvetica] font-bold text-[#ff6600] hover:text-[#ff6600]/80 text-sm"
                  >
                    View All
                  </a>
                </div>

                <div className="space-y-3">
                  {activities.map((activity) => (
                    <Card
                      key={activity.id}
                      className="bg-[#1a1410] border-[#3a2f1e] hover:border-[#554433] transition-colors"
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-sm flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                            {activity.title}
                          </h4>
                          <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs mt-1">
                            {activity.description}
                          </p>
                        </div>
                        <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs flex-shrink-0">
                          {activity.timestamp}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
