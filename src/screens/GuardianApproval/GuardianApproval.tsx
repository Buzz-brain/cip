import { CircleAlert as AlertCircleIcon, CircleCheck as CheckCircleIcon, ShieldAlert as ShieldAlertIcon, ThumbsUp as ThumbsUpIcon } from "lucide-react";
import { Button } from "@components/ui/button";
import { ConnectWalletButton } from "../../components/ConnectWalletButton";
import { Card, CardContent } from "@components/ui/card";
import logoImg from "@assets/cip-logo.png";
import { Link } from "react-router-dom";
import verifiedUsericon from "@assets/verified-user.svg";

interface ActivityLog {
    type: "approved" | "added" | "security";
    title: string;
    description: string;
    date: string;
    time: string;
    icon: JSX.Element;
}

const activityLog: ActivityLog[] = [
    {
        type: "approved",
        title: "Approved recovery for Alice",
        description: "Key reconstruction authorized successfully",
        date: "Oct 12, 2023",
        time: "14:30 PM",
        icon: <CheckCircleIcon className="w-5 h-5 text-[#22c55e]" />,
    },
    {
        type: "added",
        title: "Added as Guardian by Samson",
        description: "You accepted the request to be a guardian.",
        date: "Sep 01, 2023",
        time: "09:15 AM",
        icon: <ShieldAlertIcon className="w-5 h-5 text-[#ff9800]" />,
    },
    {
        type: "security",
        title: "Security Check Completed",
        description: "Routine verification of guardian status",
        date: "Aug 20, 2023",
        time: "10:00 AM",
        icon: <AlertCircleIcon className="w-5 h-5 text-[#63564b]" />,
    },
];

export const GuardianApproval = (): JSX.Element => {
    return (
        <div className="min-h-screen flex flex-col bg-[#0a0806]">
            <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
                <div className="flex items-center gap-3">
                    <Link to="/dashboard">
                        <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
                    </Link>
                </div>

                <nav className="flex items-center gap-8">
                    <a
                        href="#"
                        className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
                    >
                        Plans
                    </a>
                    <a
                        href="#"
                        className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
                    >
                        Vault
                    </a>
                    <a
                        href="#"
                        className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
                    >
                        Settings
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <ConnectWalletButton variant="default" showAddress={true} compact={false} />
                    <div className="w-10 h-10 bg-[#ff6600] rounded-full"></div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center px-4 py-12">
                <div className="w-full max-w-[1040px]">
                    <div className="mb-8">
                        <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[31.7px] tracking-[0] leading-[38px] mb-2">
                            Guardian Approval Dashboard
                        </h1>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-base tracking-[0] leading-[26px]">
                            Manage your responsibilities as a designated guardian. Review and
                            approve recovery requests securely.
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[19.9px] tracking-[0] leading-[26px]">
                                Incoming Requests
                            </h2>
                            <span className="px-2.5 py-1 bg-[#ef444433] border border-[#ef444466] rounded-md">
                                <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ef4444] text-xs tracking-[0] leading-4">
                                    1 Pending
                                </span>
                            </span>
                        </div>

                        <Card className="bg-[#1a1410] border-[#392f28] rounded-2xl overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex">
                                    <div className="w-1.5 bg-[#ff6600]"></div>
                                    <div className="flex-1 p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-[#663399] rounded-full flex items-center justify-center">
                                                    <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                                                        S
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base tracking-[0] leading-[26px]">
                                                            Samson
                                                        </h3>
                                                        <span className="[font-family:'Manrope',Helvetica] font-normal text-[#afa49c] text-sm tracking-[0] leading-5">
                                                            requested recovery
                                                        </span>
                                                    </div>
                                                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#afa49c] text-xs tracking-[0] leading-4 mt-1">
                                                        Request ID: #REC-2024-883 · 2 hours ago
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1.5 bg-[#ff660033] border border-[#ff660066] rounded-lg">
                                                <span className="flex items-center gap-1.5 [font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-xs tracking-[0] leading-4">
                                                    <AlertCircleIcon className="w-3.5 h-3.5" />
                                                    Awaiting Approval
                                                </span>
                                            </span>
                                        </div>

                                        <div className="bg-[#0f0c09] border border-[#392f28] rounded-xl p-4 mb-6">
                                            <div className="flex items-start gap-3">
                                                <img src={verifiedUsericon} className="w-5 h-5 mt-0.5" />
                                                <div>
                                                    <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm tracking-[0] leading-5 mb-2">
                                                        Guardian Protocol Notice
                                                    </h4>
                                                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-sm tracking-[0] leading-[22px]">
                                                        Samson has requested recovery. Your approval does NOT
                                                        give you access to their assets. It only signals the
                                                        protocol to reconstruct a key share for the rightful
                                                        owner.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="outline"
                                                className="h-11 px-6 [font-family:'Manrope',Helvetica] font-bold text-[#afa49c] text-sm bg-[#27211c] border border-[#392f28] hover:bg-[#392f28] hover:text-white rounded-xl"
                                            >
                                                Decline
                                            </Button>
                                            <Button className="h-11 px-6 [font-family:'Manrope',Helvetica] font-bold text-white text-sm bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-xl flex items-center gap-2">
                                                <ThumbsUpIcon className="w-4 h-4" />
                                                Approve Recovery
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[19.9px] tracking-[0] leading-[26px]">
                                Recovery Activity Log
                            </h2>
                            <a
                                href="#"
                                className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5 hover:text-[#ff6600]/80 transition-colors"
                            >
                                View All
                            </a>
                        </div>

                        <Card className="bg-[#1a1410] border-[#392f28] rounded-2xl">
                            <CardContent className="p-0">
                                <div className="flex flex-col divide-y divide-[#392f28]">
                                    {activityLog.map((log, index) => (
                                        <div key={index} className="p-6 hover:bg-[#0f0c09] transition-colors cursor-pointer">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 bg-[#27211c] border border-[#392f28] rounded-full flex items-center justify-center">
                                                        {log.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm tracking-[0] leading-5">
                                                            {log.title}
                                                        </h4>
                                                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#afa49c] text-xs tracking-[0] leading-4 mt-1">
                                                            {log.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-xs tracking-[0] leading-4">
                                                        {log.date}
                                                    </p>
                                                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#63564b] text-xs tracking-[0] leading-4">
                                                        {log.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};
