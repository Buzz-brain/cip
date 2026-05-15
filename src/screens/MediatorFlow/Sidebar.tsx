import {
    TrendingUp,
} from "lucide-react";

import folderIcon from "@assets/folder.svg";
import userIcon from "@assets/user-border.svg";
import clipboardTimeIcon from "@assets/clipboard-time.svg";
import voteIcon from "@assets/vote.svg";
import checkGrayCircleIcon from "@assets/check-gray-circle.svg";


export const Sidebar = (): JSX.Element => {

    return (
        <aside className="w-72 bg-[#0d0501] backdrop-blur-xl border-r border-[#393128] p-6">
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-white tracking-wider mb-4">
                    Dispute Queue
                </h3>

                <nav className="space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#2E291E] border border-[#393128] rounded-lg text-white font-medium transition-colors">
                        <img src={folderIcon} className="w-4 h-4" alt="All Cases" />
                        All Cases
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-[#B9AB9D] ho   ver:text-white transition-colors">
                        <img src={userIcon} className="w-4 h-4" alt="My Assigned" />
                        <span className="flex-1 text-left">My Assigned</span>
                        <span className="text-xs bg-[#393128] font-bold rounded-full px-2 py-1 rounded">3</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-[#B9AB9D] hover:text-white transition-colors">
                        <img src={clipboardTimeIcon} className="w-4 h-4" alt="Pending Review" />
                        Pending Review
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-[#B9AB9D] hover:text-white transition-colors">
                        <img src={voteIcon} className="w-4 h-4" alt="Voting Open" />
                        Voting Open
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-[#B9AB9D] hover:text-white transition-colors">
                       <img src={checkGrayCircleIcon} className="w-4 h-4" alt="Resolved" />
                        Resolved
                    </button>
                </nav>
            </div>

            <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-sm font-semibold text-white tracking-wider mb-4">
                    Analytics
                </h3>
                <div className="bg-[#2E291E] rounded-lg p-4 border border-zinc-700">
                    <p className="text-xs text-[#B9AB9D] mb-1">Total Value Secured</p>
                    <p className="text-2xl font-bold text-white mb-2">$42.8M</p>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +2.4% this week
                    </p>
                </div>
            </div>
        </aside>
    );
}
