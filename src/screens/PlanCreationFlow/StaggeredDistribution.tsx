import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { CheckCircle2Icon, CalendarIcon, PlusIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import logoImg from "../../assets/cip-logo.svg";
import { Navbar } from "../../components/ui/Navbar";


const scheduleData = [
    {
        date: "Jan 1, 2025",
        percentage: "25",
        estimatedValue: "~ $25,000 USD",
    },
    {
        date: "Jan 1, 2030",
        percentage: "75",
        estimatedValue: "~ $75,000 USD",
    },
];

// const navigationItems = [
//   { label: "How it Works", href: "#" },
//   { label: "TaxCore", href: "#" },
//   { label: "Pricing", href: "/pricing" },
//   { label: "Enterprise", href: "#" },
// ];



const strategyOptions = [
    {
        id: "fixed-intervals",
        title: "Fixed Intervals",
        description:
            "Distribute equal amounts over a set period (e.g. Monthly for 5 years).",
        icon: "/material-symbols-update-rounded.svg",
        selected: true,
        bgColor: "bg-[#ff66000d]",
        borderColor: "border-[#ff6600]",
        iconBgColor: "bg-[#ff6600]",
    },
    {
        id: "milestone-based",
        title: "Milestone-based",
        description:
            "Release funds based on beneficiary age or time elapsed since trigger.",
        icon: "/tabler-flag.svg",
        selected: false,
        bgColor: "bg-[#27221c]",
        borderColor: "border-[#553e33]",
        iconBgColor: "bg-[#3b251e]",
    },
    {
        id: "custom-schedule",
        title: "Custom Schedule",
        description:
            "Manually define specific dates and percentage amounts for each payout.",
        icon: "/material-symbols-edit-calendar-outline.svg",
        selected: false,
        bgColor: "bg-[#27221c]",
        borderColor: "border-[#553e33]",
        iconBgColor: "bg-[#3b251e]",
    },
];

const timelinePoints = [
    { left: "left-0", size: "w-3 h-3", color: "bg-[#8b7b64]", top: "top-[34px]" },
    { left: "left-[62px]", size: "w-4 h-4", color: "bg-[#ff6600]", top: "top-8" },
    {
        left: "left-[156px]",
        size: "w-1.5 h-1.5",
        color: "bg-[#695a47]",
        top: "top-[37px]",
    },
    {
        left: "left-[249px]",
        size: "w-1.5 h-1.5",
        color: "bg-[#695a47]",
        top: "top-[37px]",
    },
    {
        left: "left-[342px]",
        size: "w-1.5 h-1.5",
        color: "bg-[#695a47]",
        top: "top-[37px]",
    },
    {
        left: "left-[435px]",
        size: "w-1.5 h-1.5",
        color: "bg-[#695a47]",
        top: "top-[37px]",
    },
    {
        left: "left-[610px]",
        size: "w-3 h-3",
        color: "bg-emerald-500",
        top: "top-[34px]",
    },
];


export const StaggeredDistribution = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-full mx-auto flex flex-col bg-[#221810]">
                    <Navbar
                      logo={logoImg}
                    //   navItems={navigationItems}
                    //   rightActions={
                    //     <Button
                    //       className="bg-gradient-to-r from-[#ff6600] to-[#993d00] hover:opacity-90 [font-family:'Noto_Sans',Helvetica] font-bold text-sm"
                    //       onClick={() => navigate("/onboarding/step-one")}
                    //     >
                    //       Launch App
                    //     </Button>
                    //   }
                    />
            <div className="max-w-[768px] mx-auto flex flex-col">

                <main className="w-full px-[38px] py-10 flex flex-col gap-10">
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-[#ff660033] text-[#ff6600] hover:bg-[#ff660033] [font-family:'Manrope',Helvetica] font-bold text-xs px-2 py-1">
                                Step 3 of 5
                            </Badge>
                            <span className="[font-family:'Manrope',Helvetica] font-medium text-[#b8a994] text-[13.5px] leading-5">
                                Distribution Logic
                            </span>
                        </div>

                        <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[35.1px] leading-10">
                            Staggered Distribution Setup
                        </h1>

                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ae9d] text-lg leading-7 max-w-[627px]">
                            Define exactly how and when assets will be released. Choose a strategy
                            to stagger payments over time or based on life events.
                        </p>
                    </section>

                    <section className="flex flex-col gap-8">
                        <div className="flex flex-col">
                            <h2 className="ml-1 [font-family:'Manrope',Helvetica] font-bold text-white text-lg tracking-[0] leading-7 whitespace-nowrap mb-5">
                                1. Choose Strategy
                            </h2>

                            <div className="flex flex-col gap-4">
                                {strategyOptions.map((strategy) => (
                                    <Card
                                        key={strategy.id}
                                        className={`${strategy.bgColor} ${strategy.selected ? "border-2" : "border"} ${strategy.borderColor} rounded-xl cursor-pointer hover:opacity-90 transition-opacity`}
                                    >
                                        <CardContent className="flex items-center gap-4 p-[18px]">
                                            <div
                                                className={`flex items-center justify-center w-10 h-[46px] ${strategy.iconBgColor} rounded-lg`}
                                            >
                                                <img
                                                    className="w-6 h-6"
                                                    alt={strategy.title}
                                                    src={strategy.icon}
                                                />
                                            </div>

                                            <div className="flex-1 flex flex-col gap-[3px]">
                                                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base tracking-[0] leading-6">
                                                    {strategy.title}
                                                </h3>
                                                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b8a994] text-[11.9px] tracking-[0] leading-4">
                                                    {strategy.description}
                                                </p>
                                            </div>

                                            {strategy.selected && (
                                                <CheckCircle2Icon className="w-6 h-6 text-[#ff6600]" />
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <Card className="bg-[#27221c] border-[#392f28] rounded-xl">
                                <CardContent className="p-0">
                                    <div className="px-[33px] py-[33px] flex items-center justify-between border-b border-[#392f28]">
                                        <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl tracking-[0] leading-7">
                                            Configure Fixed Intervals
                                        </h2>

                                        <div className="flex items-center gap-[3px]">
                                            <img
                                                className="w-6 h-6"
                                                alt="Beneficiary"
                                                src="/akar-icons-person.svg"
                                            />
                                            <span className="[font-family:'Manrope',Helvetica] font-bold text-[13.5px] tracking-[0] leading-5">
                                                <span className="text-[#8b7b64]">Beneficiary:</span>
                                                <span className="text-slate-200"> Alice Doe</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-[33px] py-6">
                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div className="flex flex-col gap-2">
                                                <Label className="[font-family:'Manrope',Helvetica] font-medium text-slate-300 text-sm tracking-[0] leading-5">
                                                    Frequency
                                                </Label>
                                                <Select defaultValue="monthly">
                                                    <SelectTrigger className="bg-[#181511] border-none h-11 [font-family:'Manrope',Helvetica]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="quarterly">Quarterly</SelectItem>
                                                        <SelectItem value="yearly">Yearly</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="[font-family:'Manrope',Helvetica] font-medium text-slate-300 text-sm tracking-[0] leading-5">
                                                    Duration
                                                </Label>
                                                <div className="flex items-center gap-3">
                                                    <Input
                                                        type="text"
                                                        defaultValue="5"
                                                        className="bg-[#181511] border-[#553e33] h-11 [font-family:'Manrope',Helvetica] text-white"
                                                    />
                                                    <span className="[font-family:'Manrope',Helvetica] font-medium text-[#8b7b64] text-sm tracking-[0] leading-5 whitespace-nowrap">
                                                        Years
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="[font-family:'Manrope',Helvetica] font-medium text-slate-300 text-[13.8px] tracking-[0] leading-5">
                                                    Initial Delay
                                                </Label>
                                                <div className="flex items-center gap-3">
                                                    <Input
                                                        type="text"
                                                        defaultValue="30"
                                                        className="bg-[#181511] border-[#553e33] h-11 [font-family:'Manrope',Helvetica] text-white max-w-[173px]"
                                                    />
                                                    <span className="[font-family:'Manrope',Helvetica] font-medium text-[#8b7b64] text-sm tracking-[0] leading-5 whitespace-nowrap">
                                                        Days after trigger
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="[font-family:'Manrope',Helvetica] font-medium text-slate-300 text-sm tracking-[0] leading-5">
                                                    Calculated Payout
                                                </Label>
                                                <div className="flex items-center justify-between h-11 px-[17px] bg-[#ff66001a] rounded-lg border border-[#ff660033]">
                                                    <span className="[font-family:'Manrope',Helvetica] font-normal text-slate-300 text-sm tracking-[0] leading-5">
                                                        Per interval:
                                                    </span>
                                                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff6600] text-base tracking-[0] leading-6">
                                                        ~1.66%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-[#392f28]">
                                            <h3 className="[font-family:'Manrope',Helvetica] font-bold text-[#8b7b64] text-sm tracking-[0] leading-5 mb-4">
                                                Projection Timeline
                                            </h3>

                                            <div className="relative h-20">
                                                <div className="absolute top-[38px] left-0 right-0 h-1 bg-[#553e33] rounded-full" />

                                                {timelinePoints.map((point, index) => (
                                                    <div
                                                        key={index}
                                                        className={`absolute ${point.top} ${point.left} ${point.size} ${point.color} rounded-full shadow-[0px_0px_0px_#ffffff]`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-[#27221c] border-[#392f28] rounded-xl">
                                <CardContent className="p-[25px]">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex flex-col">
                                            <span className="[font-family:'Manrope',Helvetica] font-medium text-[#b8a994] text-[13.9px] tracking-[0] leading-5 mb-1">
                                                Total Allocated
                                            </span>
                                            <div className="flex items-end gap-[5px]">
                                                <span className="[font-family:'Manrope',Helvetica] font-bold text-emerald-500 text-3xl tracking-[0] leading-9">
                                                    100%
                                                </span>
                                                <span className="[font-family:'Manrope',Helvetica] font-medium text-[#b8a994] text-[13.8px] tracking-[0] leading-5 mb-1">
                                                    of assets
                                                </span>
                                            </div>
                                        </div>

                                        <Badge className="bg-[#10b9811a] text-emerald-500 [font-family:'Manrope',Helvetica] font-bold text-[11.9px] hover:bg-[#10b9811a]">
                                            Valid Configuration
                                        </Badge>
                                    </div>

                                    <div className="relative">
                                        <div className="h-3 bg-[#3b251e] rounded-full overflow-hidden">
                                            <div className="h-full w-full bg-emerald-500 rounded-full relative">
                                                <div className="absolute inset-0 bg-[#ffffff33]" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-[7px]">
                                        <span className="[font-family:'Manrope',Helvetica] font-normal text-[#b8a994] text-xs tracking-[0] leading-4">
                                            0% Remaining
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex items-center justify-end gap-4">
                                <Button
                                    variant="outline"
                                    className="[font-family:'Manrope',Helvetica] font-bold text-white text-base border-[#695a47] bg-transparent hover:bg-[#695a47]/10 h-[50px] px-[25px]"
                                >
                                    Back
                                </Button>

                                <Button
                                    onClick={() => navigate("/review-plan")}
                                    className="[font-family:'Manrope',Helvetica] font-bold text-white text-base bg-[#ff6600] hover:bg-[#ff6600]/90 h-[50px] px-8"
                                >
                                    Save &amp; Continue
                                    <ChevronRightIcon className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </section>


                    <section className="mt-20 flex flex-col gap-[25px] border-t border-dashed border-[#553e33]">
                        <p className="ml-[159.4px] mt-12 [font-family:'Manrope',Helvetica] font-normal text-[#b8a994] text-xs tracking-[0] leading-4 whitespace-nowrap">
                            Design Component: Custom Schedule View Variant
                        </p>

                        <Card className="w-[688px] bg-[#27221c] rounded-xl border-[#392f28]">
                            <CardHeader className="px-[25px] pt-[25px] pb-4">
                                <div className="flex items-start justify-between">
                                    <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg tracking-[0] leading-7 whitespace-nowrap">
                                        Custom Schedule Breakdown
                                    </h2>

                                    <Button
                                        variant="ghost"
                                        className="h-auto p-0 hover:bg-transparent flex items-center gap-0.5"
                                    >
                                        <PlusIcon className="w-4 h-4 text-[#ff6600]" />
                                        <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff6600] text-xs tracking-[0] leading-4 whitespace-nowrap">
                                            Add Payout Date
                                        </span>
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="px-[25px] pb-[25px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b border-[#3b251e] hover:bg-transparent">
                                            <TableHead className="h-[32.5px] pl-2 [font-family:'Manrope',Helvetica] font-medium text-[#8b7b64] text-[11.7px] tracking-[0] leading-4 whitespace-nowrap">
                                                Trigger Date
                                            </TableHead>
                                            <TableHead className="h-[32.5px] [font-family:'Manrope',Helvetica] font-medium text-[#8b7b64] text-xs tracking-[0] leading-4 whitespace-nowrap">
                                                Percentage
                                            </TableHead>
                                            <TableHead className="h-[32.5px] [font-family:'Manrope',Helvetica] font-medium text-[#8b7b64] text-[11.9px] tracking-[0] leading-4 whitespace-nowrap">
                                                Estimated Value
                                            </TableHead>
                                            <TableHead className="h-[32.5px] [font-family:'Manrope',Helvetica] font-medium text-[#8b7b64] text-xs tracking-[0] leading-4 whitespace-nowrap">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {scheduleData.map((schedule, index) => (
                                            <TableRow
                                                key={index}
                                                className="border-b border-[#1e293b80] last:border-0 hover:bg-transparent"
                                            >
                                                <TableCell className="pl-2 py-[15.5px]">
                                                    <div className="flex items-center gap-[7px]">
                                                        <CalendarIcon className="w-[18px] h-[18px] text-white" />
                                                        <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 whitespace-nowrap">
                                                            {schedule.date}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="py-[12.5px]">
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            type="text"
                                                            defaultValue={schedule.percentage}
                                                            className="w-[75px] h-[34px] bg-[#181511] border-[#553e33] rounded [font-family:'Manrope',Helvetica] font-bold text-white text-base tracking-[0] leading-6 px-2"
                                                        />
                                                        <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 whitespace-nowrap">
                                                            %
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="py-[19.5px]">
                                                    <span className="[font-family:'Manrope',Helvetica] font-normal text-[#b8a994] text-sm tracking-[0] leading-5 whitespace-nowrap">
                                                        {schedule.estimatedValue}
                                                    </span>
                                                </TableCell>

                                                <TableCell className="py-[13px]">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-auto p-0 hover:bg-transparent"
                                                    >
                                                        <span className="[font-family:'Inter',Helvetica] font-normal text-[#b8a994] text-[8.3px] tracking-[0] leading-6 whitespace-nowrap">
                                                            delete
                                                        </span>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </section>
                </main>
            </div>
        </div>

    );
};
