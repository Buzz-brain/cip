import {
    Zap,
    ChevronRightIcon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logoImg from "@assets/cip-logo.png";
import { Progress } from "../../components/ui/progress";
import calendarClockIcon from "@assets/calendar-clock.svg";
// import circlePentagonnIcon from "@assets/circle-pentagon.svg";
import institutionIcon from "@assets/institution.svg";
import healthWaveIcon from "@assets/health-wave.svg";
import timeCancelIcon from "@assets/time-cancel.svg";
import charityIcon from "@assets/charity.svg";
import staggeredIcon from "@assets/staggered.svg";
import groupTogetherIcon from "@assets/group-together.svg";
import multiSigIcon from "@assets/multi-sig.svg";
import { Button } from "../../components/ui/button";


interface PlanType {
    id: string;
    title: string;
    icon: string;
    bgColor: string,
    description: string;
    details?: string;
    mpcConfig?: {
        shares: Array<{
            number: number;
            label: string;
            placeholder: string;
            isEditable: boolean;
            defaultValue?: string;
        }>;
    };
}

const planTypes: PlanType[] = [
    {
        id: "time-lock",
        title: "Time-Lock",
        icon: calendarClockIcon,
        bgColor: "bg-[#8A561E33]",
        description:
            "Assets unlock automatically on a pre-defined future date. Ideal for trust funds or long-term savings",
    },
    {
        id: "multi-sig",
        title: "Multi-Sig / MPC",
        icon: multiSigIcon,
        bgColor: "bg-[#581C8733]",
        description:
            "Requires multiple signatures (e.g. 2-of-3) from trusted parties or devices to authorize asset release.",
        mpcConfig: {
            shares: [
                {
                    number: 1,
                    label: "Share 1: Owner",
                    placeholder: "You (Wallet Connected)",
                    isEditable: false,
                    defaultValue: "You (Wallet Connected)",
                },
                {
                    number: 2,
                    label: "Share 2: Executor",
                    placeholder: "Enter Executor Wallet Address (0x...",
                    isEditable: true,
                },
                {
                    number: 3,
                    label: "Share 3: Backup Signer",
                    placeholder: "Enter Backup Signer Address (0x...",
                    isEditable: true,
                },
            ],
        },
    },
    {
        id: "custom",
        title: "Custom / Institutional",
        icon: institutionIcon,
        bgColor: "bg-[#372F1F]",
        description:
            "Bespoke smart contract development for complex estates, high net worth individuals, or family offices.",
    },
    {
        id: "health-oracle",
        title: "Health Oracle",
        icon: healthWaveIcon,
        bgColor: "bg-[#7F1D1D33]",
        description:
            "Uses privacy preserving TEE oracles to verify official death certificates from trusted data providers.",
    },
    {
        id: "inactivity-oracle",
        title: "Inactivity Oracle",
        icon: timeCancelIcon,
        bgColor: "bg-[#7C2D1233]",
        description:
            'A "Dead Man\'s Switch" that triggers if your wallet remains inactive for a specified duration.',
    },
    {
        id: "philanthropy",
        title: "Charity / Philanthropy",
        icon: charityIcon,
        bgColor: "bg-[#83184333]",
        description:
            "Pre-configured logic to distribute assets directly to verified non-profits and charitable organizations.",
    },
    {
        id: "staggered",
        title: "Staggered Distribution",
        icon: staggeredIcon,
        bgColor: "bg-[#064E3B33]",
        description:
            "Release assets in installments over time (e.g., monthly allowances) rather than a lump sum.",
    },
    {
        id: "testamentary-dao",
        title: "Testamentary DAO",
        icon: groupTogetherIcon,
        bgColor: "bg-[#816B2E33]",
        description:
            "Establish a Decentralized Autonomous Organization for beneficiaries to collectively manage inheritance.",
    },
];



const navigationLinks = [
    { label: "Dashboard", href: "/docs/dispute" },
    { label: "Create Plan", href: "#" },
    { label: "Vaults", href: "#" },
    { label: "Settings", href: "#" },
];


export const ChoosePlanType = (): JSX.Element => {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const selectedPlanData = planTypes.find((p) => p.id === selectedPlan);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/beneficiaries");
    };

    const handleContinue = () => {
        if (selectedPlan) {
            if (selectedPlan === "staggered") {
                navigate("/staggered-distribution");
            } else if (selectedPlan === "time-lock") {
                navigate("/set-time-lock");
            } else if (selectedPlan === "philanthropy") {
                navigate("/philanthropy-plan");
            } else if (selectedPlan === "inactivity-oracle") {
                navigate("/set-inactivity-period");
            } else if (selectedPlan === "health-oracle") {
                navigate("/assign-health-oracle-exec");
            } else {
                navigate("/summary", { state: { selectedPlan } });
            }
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#221810] [font-family:'Manrope',Helvetica]">
            <header className="sticky top-0 z-50 w-full border-b border-[#37291f] bg-[#0d0501] backdrop-blur-[6px]">
                <div className="container flex h-16 items-center justify-between px-8">
                    <div className="flex items-center gap-3">
                        <Link to="/dashboard">
                            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
                        </Link>
                        <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
                            Inheritance&nbsp;&nbsp;Protocol
                        </span>
                    </div>

                    <nav className="flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium leading-5 text-slate-400 transition-colors hover:text-white [font-family:'Manrope',Helvetica]"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>
            </header>

            <div className="flex-1 flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-6xl">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <h1 className="[font-family:'Manrope',Helvetica] text-4xl font-bold text-white">
                                Choose Contract or Plan Type
                            </h1>
                            <p className="[font-family:'Manrope',Helvetica] text-gray-400 text-lg max-w-2xl">
                                Select the type of smart contract structure for your inheritance plan.
                                Each option offers different security models, trigger mechanisms, and
                                distribution logic.
                            </p>
                        </div>

                        <section className="flex flex-col items-start gap-3 w-full">
                            <header className="flex items-end justify-between w-full">
                                <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                                    Step 1 of 5: Selection
                                </h2>

                                <span className="text-right text-orange-600 text-sm font-medium">
                                    20% Completed
                                </span>
                            </header>

                            <Progress
                                value={20}
                                className="w-full h-2 bg-[#54483b]"
                                indicatorClassName="bg-[#ff6600]"
                            />
                        </section>

                        <div className="grid grid-cols-3 gap-6">
                            {planTypes.map((plan) => (
                                <button
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`relative p-6 rounded-lg bg-[#27231C] border-2 transition-all text-left ${selectedPlan === plan.id
                                            ? "border-orange-600"
                                            : "border-[#54493B] hover:border-orange-600"
                                        }`}
                                >
                                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                                        {selectedPlan === plan.id && (
                                            <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                                        )}
                                    </div>
                    <div
                      className={`w-12 h-12 ${plan.bgColor} rounded-lg flex items-center mb-4 justify-center`}
                    >
                      <img src={plan.icon} alt="" className="w-6 h-6" />
                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {plan.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">{plan.description}</p>
                                </button>
                            ))}
                        </div>

                        {selectedPlanData && selectedPlanData.mpcConfig && (
                            <div className="border-2 border-orange-600 rounded-lg p-6 bg-gray-900">
                                <div className="flex items-start gap-3 mb-6">
                                    <Zap className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                                    <h3 className="text-lg font-semibold text-white">
                                        Who holds each MPC share?
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {selectedPlanData.mpcConfig.shares.map((share) => (
                                        <div key={share.number} className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                                {share.number}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-400 mb-2">{share.label}</div>
                                                {share.isEditable ? (
                                                    <input
                                                        type="text"
                                                        placeholder={share.placeholder}
                                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-gray-300 placeholder-gray-600 focus:border-orange-600 focus:outline-none"
                                                    />
                                                ) : (
                                                    <div className="px-4 py-3 bg-gray-800 border border-gray-700 rounded text-gray-300">
                                                        {share.defaultValue}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        

                            <footer className="flex items-center justify-end pt-8 pb-12 px-0 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-[#54483b]">

                                <div className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
                                    <Button
                                        className="px-6 py-6 rounded-lg border border-solid border-[#54483b] bg-transparent hover:bg-transparent [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        onClick={handleContinue}
                                        className="inline-flex items-center gap-2 px-7 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-lg [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
                                        disabled={!selectedPlan}
                                    >
                                        Continue
                                        <ChevronRightIcon className="w-6 h-6" />
                                    </Button>
                                </div>
                            </footer>
                    </div>
                </div>
            </div>
        </div>

    );
};
