import { useState } from "react";
// Sidebar removed — layout provides it
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import {
  ChevronLeft,
  Share2,
  Search,
  Download as DownloadIcon,
} from "lucide-react";

interface HistoryEvent {
  id: string;
  type: "beneficiaries" | "dispute" | "executor" | "plan-created";
  title: string;
  status: "Completed" | "Active" | "Pending Sign-off";
  statusColor: string;
  description: string;
  details: string[];
  date: string;
  time: string;
  hash: string;
  side: "left" | "right";
}

const historyEvents: HistoryEvent[] = [
  {
    id: "1",
    type: "beneficiaries",
    title: "Beneficiaries Updated",
    status: "Completed",
    statusColor: "bg-green-500/20 text-green-400",
    description: "Added 2 new beneficiaries for 'Crypto Assets' allocation, removed 1 outdated entry.",
    details: ["Storage Hash:", "0x7b92...5a81"],
    date: "Oct 24, 2023",
    time: "10:42 AM • by Alice (Executor)",
    hash: "0x7b92...5a81",
    side: "right",
  },
  {
    id: "2",
    type: "dispute",
    title: "Dispute Triggered",
    status: "Active",
    statusColor: "bg-red-500/20 text-red-400",
    description: "Beneficiary #2 contested the asset allocation ratio. Plan locked for edits pending resolution.",
    details: ["Hash:", "0x9e821...Bltbc"],
    date: "Sep 12, 2023",
    time: "02:15 PM • System Alert",
    hash: "0x9e821...Bltbc",
    side: "left",
  },
  {
    id: "3",
    type: "executor",
    title: "Executor Updated",
    status: "Pending Sign-off",
    statusColor: "bg-yellow-500/20 text-yellow-400",
    description: "Primary executor changed from 'John Doe' to 'Alice Smith'. Awaiting multi-sig confirmation.",
    details: ["Hash:", "0xdc4c2...1faf"],
    date: "Aug 05, 2023",
    time: "09:30 AM • by Owner",
    hash: "0xdc4c2...1faf",
    side: "right",
  },
  {
    id: "4",
    type: "plan-created",
    title: "Plan Created",
    status: "Completed",
    statusColor: "bg-green-500/20 text-green-400",
    description: "Initial setup of 'Family Trust Alpha'. Vault initialized with 0 assets.",
    details: ["Genesis Hash:", "0x1000...dafb"],
    date: "Jan 10, 2023",
    time: "11:00 AM • by Owner",
    hash: "0x1000...dafb",
    side: "left",
  },
];

export const PlanHistory = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Events");

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
          {/* Back and Title */}
          <div className="space-y-4">
            <Link to="/dashboard" className="flex items-center gap-2 [font-family:'Noto_Sans',Helvetica] text-[#ff6600] hover:text-[#ff6600]/80 text-sm">
              <ChevronLeft className="w-4 h-4" />
              Back to Plans
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl mb-2">
                  Plan History: Family Trust Alpha
                </h1>
                <p className="[font-family:'Noto_Sans',Helvetica] text-[#B8AA9D] text-sm">
                  📝 Immutable audit log stored on Autonomys Network
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="bg-transparent hover:bg-[#3a2f1e] border border-[#554433] text-white gap-2 [font-family:'Noto_Sans',Helvetica] font-bold text-sm">
                  <DownloadIcon className="w-4 h-4" />
                  Export History
                </Button>
                <Button className="bg-[#332619] hover:bg-[#3a2f1e] border border-[#554433] text-white gap-2 [font-family:'Noto_Sans',Helvetica] font-bold text-sm">
                  <Share2 className="w-4 h-4" />
                  Share Proof
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-[#1a1410] border-[#3a2f1e]">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-2 [font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                  <span>📋</span>
                  Plan ID
                </div>
                <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                  #88392-CIP
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1410] border-[#3a2f1e]">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-2 [font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                  <span>📊</span>
                  Total Revisions
                </div>
                <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                  14
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1410] border-[#3a2f1e]">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-2 [font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                  <span>✓</span>
                  Last Verification
                </div>
                <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                  Synced Just Now
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7664]" />
              <input
                type="text"
                placeholder="Search by hash, event type, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1410] border border-[#3a2f1e] rounded-lg pl-10 pr-4 py-3 text-[#b8a494] placeholder-[#695d47] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
              />
            </div>

            <div className="flex items-center gap-2">
              {["All Events", "Completed", "Pending", "Disputes"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-lg [font-family:'Noto_Sans',Helvetica] font-bold text-xs transition-colors ${
                    activeFilter === filter
                      ? filter === "All Events"
                        ? "bg-[#ff6600] text-white"
                        : filter === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : filter === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      : "bg-[#332619] text-[#8b7664] hover:text-white"
                  }`}
                >
                  {filter === "Completed"
                    ? "● Completed"
                    : filter === "Pending"
                      ? "● Pending"
                      : filter === "Disputes"
                        ? "● Disputes"
                        : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {historyEvents.map((event, index) => (
              <div key={event.id} className="flex">
                {/* Left side */}
                <div className={`w-1/2 pr-8 ${event.side === "left" ? "text-right" : ""}`}>
                  {event.side === "left" && (
                    <Card className={`bg-[#1a1410] border-l-4 ${
                      event.type === "dispute"
                        ? "border-l-red-500"
                        : "border-l-green-500"
                    }`}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                              {event.title}
                            </h3>
                            <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs mt-1">
                              {event.description}
                            </p>
                          </div>
                          {event.type === "dispute" && (
                            <Button className="bg-red-500 hover:bg-red-500/90 text-white [font-family:'Noto_Sans',Helvetica] font-bold text-xs px-3 py-1">
                              View Evidence
                            </Button>
                          )}
                        </div>
                        {event.details && (
                          <div className="pt-2 border-t border-[#3a2f1e] space-y-1">
                            {event.details.map((detail, idx) => (
                              <div key={idx} className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                                <span className="text-[#ff6600]">{detail.split(":")[0]}:</span>{" "}
                                <span>{detail.split(":")[1]}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-2 border-t border-[#3a2f1e]">
                          <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                            {event.date}
                            <br />
                            {event.time}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Timeline Center */}
                <div className="w-0 flex flex-col items-center relative">
                  <div className="w-4 h-4 bg-[#ff6600] rounded-full border-4 border-[#0d0b08] absolute top-8 -left-2 z-10" />
                  {index < historyEvents.length - 1 && (
                    <div className="w-1 bg-[#3a2f1e] flex-1 absolute top-12 left-1" />
                  )}
                </div>

                {/* Right side */}
                <div className={`w-1/2 pl-8 ${event.side === "right" ? "" : ""}`}>
                  {event.side === "right" && (
                    <Card className="bg-[#1a1410] border-[#3a2f1e]">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-sm">
                                {event.title}
                              </h3>
                              <Badge className={`${event.statusColor} [font-family:'Noto_Sans',Helvetica] font-bold text-xs`}>
                                {event.status}
                              </Badge>
                            </div>
                            <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                              {event.description}
                            </p>
                          </div>
                        </div>
                        {event.details && (
                          <div className="pt-2 border-t border-[#3a2f1e] space-y-1">
                            {event.details.map((detail, idx) => (
                              <div key={idx} className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                                <span className="text-[#ff6600]">{detail.split(":")[0]}:</span>{" "}
                                <span>{detail.split(":")[1]}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2 items-end">
                          <a
                            href="#"
                            className="[font-family:'Noto_Sans',Helvetica] text-[#ff6600] hover:text-[#ff6600]/80 text-xs font-bold underline"
                          >
                            View on Explorer →
                          </a>
                        </div>
                        <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs pt-2 border-t border-[#3a2f1e]">
                          {event.date}
                          <br />
                          {event.time}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* End of History */}
          <div className="text-center py-8">
            <p className="[font-family:'Noto_Sans',Helvetica] text-[#695d47] text-sm">
              🔒 End of immutable history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
