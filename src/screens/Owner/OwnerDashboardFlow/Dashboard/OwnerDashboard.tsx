import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Link } from "react-router-dom";
// Header removed — layout provides it
import { AllPlan } from "./AllPlan";
import { TrendingUp } from "lucide-react";
import { Plus, Eye, EyeOff, Search, ChevronLeft, ChevronRight } from "lucide-react";

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

export const OwnerDashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [showValues, setShowValues] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-8 space-y-8">

      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl mb-2">
            Welcome back, igwe.eth
          </h1>
          <p className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D]">
            Manage your active inheritance plans and monitor asset security.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowValues(!showValues)}
            className="px-5 py-3 rounded-lg bg-[#393028] hover:bg-[#3a2f1e] text-[#FFFFFF] hover:text-white transition-colors flex items-center gap-2 [font-family:'Noto_Sans',Helvetica] font-medium text-md"
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
          <Link to="/select-assets">
            <Button className="px-5 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 [font-family:'Noto_Sans',Helvetica] text-md gap-2">
              <Plus className="w-4 h-4" />
              Create New Plan
            </Button>
          </Link>
        </div>
      </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-[#2D241C] border-[#393028]">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">
                        Total Value Secured
                      </span>
                      {/* <div className="w-8 h-8 bg-[#ff66001a] rounded flex items-center justify-center">
                        🔒
                      </div> */}
                    </div>
                    <div className="space-y-1 flex gap-2 items-end">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                        {showValues ? "$142,500.00" : "••••••"}
                      </div>
                      <div className="flex bg-[#0BDA5B1A] px-1 items-center rounded-md w-[70px] gap-1">
                        <TrendingUp className="w-3 text-[#0BDA5B]" />
                        <span className="text-[#0BDA5B] text-xs"> +5.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2D241C] border-[#393028]">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">
                        Active Plans
                      </span>
                      {/* <div className="w-8 h-8 bg-[#135bec1a] rounded flex items-center justify-center">
                        📋
                      </div> */}
                    </div>
                    <div className="space-y-1 flex items-end gap-2">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                        3
                      </div>
                      <div className="text-[#B9B09D] text-sm">plans monitored</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2D241C] border-[#393028]">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">
                        Next Trigger Check
                      </span>
                      {/* <div className="w-8 h-8 bg-[#f6a83b1a] rounded flex items-center justify-center">
                        ⏱️
                      </div> */}
                    </div>
                    <div className="space-y-1 flex gap-2 items-end">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                        12 Days
                      </div>
                      <div className="text-[#EAB308] text-sm">Plan #0042</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2D241C] border-[#393028]">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm">
                        Network Status
                      </span>
                      {/* <div className="w-8 h-8 bg-[#22c55e1a] rounded flex items-center justify-center">
                        📈
                      </div> */}
                    </div>
                    <div className="space-y-1">
                      <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl flex items-center gap-2">
                        <span className="w-4 h-4 bg-[#22C55E] rounded-full"></span>
                        Healthy
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Plans Table Section */}
              <AllPlan showValues={showValues} />

              {/* Proof of Life Section */}
              <Card className="bg-gradient-to-b from-[#2B1E15] to-[#916547] border-[#554433]">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                        Proof of Life
                      </h3>
                      <p className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-sm mt-1">
                        Your heartbeat status is active. Next confirmation required via wallet signature.
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 [font-family:'Noto_Sans',Helvetica] text-xs">
                      {/* ● ONLINE */}
                         <div className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                    <p>ONLINE</p>
                </div>
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
                    <div className="w-full bg-[#393028] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#FF6600] h-full rounded-full"
                        style={{ width: "85%" }}
                      />
                    </div>
                    <div className="[font-family:'Noto_Sans',Helvetica] text-right text-[#B9B09D] text-xs">
                      Refreshes in 48 hours
                    </div>
                  </div>

                  <Button 
                    onClick={() => navigate("/proof-of-life-check")}
                    className="w-full bg-[#393028] hover:bg-[#393028] text-white [font-family:'Noto_Sans',Helvetica] mt-4"
                  >
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

                <div className="space-y-2" >
                  {activities.map((activity) => (
                    <Card
                      key={activity.id}
                      className="bg-[#2D241C] border-[#393028] hover:border-[#554433] transition-colors"
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-sm flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                            {activity.title}
                          </h4>
                          <p className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-xs mt-1">
                            {activity.description}
                          </p>
                        </div>
                        <span className="[font-family:'Noto_Sans',Helvetica] text-[#B9B09D] text-xs flex-shrink-0">
                          {activity.timestamp}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
      </div>
  );
};
