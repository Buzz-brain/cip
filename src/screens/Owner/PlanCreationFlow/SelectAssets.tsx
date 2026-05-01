import {
    ArrowRightIcon,
    SearchIcon,
    TrendingUpIcon,
    ZapIcon,
    ChevronRightIcon
} from "lucide-react";
import { Alert, AlertDescription } from "@components/ui/alert";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { Input } from "@components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/table";
import { Progress } from "@components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePlan } from "../../../context/usePlan";
import filterIcon from "@assets/filter.svg";
import sortIcon from "@assets/sort.svg";
import ethIcon from "@assets/eth-icon.svg";
import solanaIcon from "@assets/solana-icon.svg";
import hexagonIcon from "@assets/hexagon-icon.svg";
import circlePentagonOrangeIcon from "@assets/circle-pentagon-orange.svg";
import bitcoinPic from "@assets/bitcoin.svg";
import womanPic from "@assets/woman-pic.svg";
import threeSquareIcon from "@assets/three-square.svg";
import whiteWomanPic from "@assets/white-woman.svg";
import portalPic from "@assets/portal.svg";
import ethCoinPic from "@assets/eth-coin.svg";
import wormHoleBg from "@assets/worm-hole-bg.svg";
import chartGraph from "@assets/chart-graph.svg";
import chartGraphLine from "@assets/chart-graph-line.svg";
import robotIcon from "@assets/robot.svg";
import shieldCheckGreen from "@assets/shield-check-green.svg";
import connectWalletGreen from "@assets/connect-wallet-green.svg";
import greaterThanSignIcon from "@assets/gt-sign.svg";
import bulbIcon from "@assets/bulb-icon.svg";
// Header removed — layout provides it

const assetData = [
    {
        id: "eth",
        checked: true,
        icon: bitcoinPic,
        iconBg: "bg-[#feeddb]",
        name: "Ethereum",
        symbol: "ETH",
        chainIcon: ethIcon,
        chainIconClass: "w-[75.00%] h-[68.18%] top-[15.91%] left-[12.50%]",
        chain: "Ethereum\nMainnet",
        balance: "12.5402",
        value: "$23,199.37",
        bridgeStatus: "Native",
        bridgeBg: "bg-[#22c55e1a]",
        bridgeColor: "text-green-500",
        highlighted: false,
    },
    {
        id: "sol",
        checked: false,
        icon: womanPic,
        iconBg: "bg-[#3b2c1e]",
        name: "Solana",
        symbol: "SOL",
        chainIcon: solanaIcon,
        chainIconClass: "w-[91.67%] h-[75.00%] top-[12.50%] left-[4.17%]",
        chain: "Solana",
        balance: "450.00",
        value: "$65,250.00",
        bridgeStatus: "Bridge\nReq.",
        bridgeBg: "bg-[#f59e0b1a]",
        bridgeColor: "text-amber-500",
        highlighted: true,
    },
    {
        id: "usdc",
        checked: false,
        icon: threeSquareIcon,
        iconBg: "bg-[#feeddb]",
        name: "USD Coin",
        symbol: "USDC",
        chainIcon: hexagonIcon,
        chainIconClass: "w-[86.67%] h-[61.36%] top-[19.32%] left-[6.67%]",
        chain: "Polygon",
        balance: "5,432.10",
        value: "$5,432.10",
        bridgeStatus: "Bridge\nReq.",
        bridgeBg: "bg-[#f59e0b1a]",
        bridgeColor: "text-amber-500",
        highlighted: false,
    },
];

const aiGuardianChecks = [
    {
        icon: shieldCheckGreen,
        iconClass: "w-[66.67%] h-[69.44%] top-[15.28%] left-[16.67%]",
        title: "Risk Check",
        description: "Assets verified safe",
    },
    {
        icon: connectWalletGreen,
        iconClass: "w-[79.17%] h-[62.50%] top-[18.75%] left-[12.50%]",
        title: "Inflow Check",
        description: "0 Suspicious txs",
    },
];

export const SelectAssets = (): JSX.Element => {
    const navigate = useNavigate();
    const [selectedAssets, setSelectedAssets] = useState<string[]>(assetData.filter(a => a.checked).map(a => a.id));
    const [searchTerm, setSearchTerm] = useState("");

    const toggleAsset = (id: string) => {
        setSelectedAssets(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    // Filter assets based on search term
    const filteredAssets = assetData.filter(asset => {
        const searchLower = searchTerm.toLowerCase();
        return (
            asset.name.toLowerCase().includes(searchLower) ||
            asset.symbol.toLowerCase().includes(searchLower) ||
            asset.chain.toLowerCase().includes(searchLower)
        );
    });

    // Calculate unique chains from selected assets
    const selectedChainsSet = new Set(
        assetData
            .filter(a => selectedAssets.includes(a.id))
            .map(a => a.chain.split('\n')[0])
    );
    const selectedChainsCount = selectedChainsSet.size;

    // Calculate total value from selected assets
    const totalSelectedValue = assetData
        .filter(a => selectedAssets.includes(a.id))
        .reduce((sum, asset) => {
            const valueNum = parseFloat(asset.value.replace(/[$,]/g, ''));
            return sum + (isNaN(valueNum) ? 0 : valueNum);
        }, 0);
    const totalValueFormatted = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2 
    }).format(totalSelectedValue);

    const { setAssets, setPlanField } = usePlan();

    const handleNext = () => {
        // Log selected assets for debugging / audit trail
        const chosen = assetData.filter(a => selectedAssets.includes(a.id)).map(a => ({ id: a.id, name: a.name, symbol: a.symbol, balance: a.balance }));
        console.log('[SelectAssets] Selected assets:', chosen);
        // persist first selected asset into PlanContext (cryptoAsset, amount)
        if (chosen.length > 0) {
            // take first asset as primary
            const first = chosen[0];
            // amount: use the balance string (caller can edit later)
            setAssets(first.symbol || first.id, first.balance || '0');
            // persist all selected asset IDs
            setPlanField('assets', selectedAssets);
            console.log('[SelectAssets] persisted to PlanContext:', { cryptoAsset: first.symbol || first.id, amount: first.balance, assets: selectedAssets });
        } else {
            console.warn('[SelectAssets] no assets selected to persist');
        }
        // proceed to beneficiaries step
        navigate('/beneficiaries');
    };
    return (
        <section className="flex-1 flex items-center justify-center px-4 py-4">
            <div className="w-full max-w-6xl">
                <section className="flex flex-col items-start gap-3 w-full">
                    <header className="flex items-end justify-between w-full">
                        <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                            Step 1 of 5: Select Assets
                        </h2>

                        <span className="[font-family:'Manrope',Helvetica] font-normal text-[#afa59c] text-sm leading-5 tracking-[0] whitespace-nowrap">
                            20% Completed
                        </span>
                    </header>

                    <Progress
                        value={20}
                        className="w-full h-2 bg-[#54483b]"
                        indicatorClassName="bg-[#ff6600]"
                    />

                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-sm tracking-[0] leading-[21px] w-full">
                        Configure the digital assets to be included in your Inheritance Vault.
                    </p>
                </section>

                <div className="flex items-start justify-center gap-8 relative self-stretch w-full mt-10 flex-[0_0_auto]">
                    <div className="flex flex-col flex-1 items-start gap-6 relative self-stretch">
                        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                            <h1 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-[35.7px] tracking-[-1.19px] leading-10">
                                Select Assets
                            </h1>
                            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-base tracking-[0] leading-6">
                                Select tokens from any supported chain. Use the integrated bridge to
                                consolidate
                                <br />
                                assets into your vault.
                            </p>
                        </div>

                        <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex flex-col items-start relative flex-1 self-stretch grow">
                                <div className="relative w-full">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-[17.5px] h-[17.5px] text-[#80796b]" />
                                    <Input
                                        placeholder="Search assets (e.g. ETH, USDC)..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-5 bg-[#2c231a] border-[#54483b] text-[#80796b] [font-family:'Manrope',Helvetica] font-normal text-sm rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="inline-flex items-start gap-2 relative self-stretch flex-[0_0_auto]">
                                <Button
                                    variant="outline"
                                    className="inline-flex items-center gap-2 px-4 py-5 bg-[#2c231a] border-[#54483b] hover:bg-[#2c231a]/80 rounded-lg"
                                >
                                    <img
                                        className="w-[15px] h-[10px]"
                                        alt="Filter"
                                        src={filterIcon}
                                    />
                                    <span className="[font-family:'Manrope',Helvetica] font-medium text-white text-sm">
                                        Filter
                                    </span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="inline-flex items-center gap-2 px-4 py-5 bg-[#2c231a] border-[#54483b] hover:bg-[#2c231a]/80 rounded-lg"
                                >
                                    <img
                                        className="w-[13.33px] h-[16.67px]"
                                        alt="Sort"
                                        src={sortIcon}
                                    />
                                    <span className="[font-family:'Manrope',Helvetica] font-medium text-white text-sm">
                                        Sort
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <Card className="bg-[#2c231a] border-[#54483b] rounded-xl overflow-hidden w-full">
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-[#382f23]">
                                            <TableRow className="border-0 hover:bg-transparent">
                                                <TableHead className="w-[50px] p-4">
                                                    <Checkbox className="w-4 h-4 ml-2 border-[#54483b]" />
                                                </TableHead>
                                                <TableHead className="w-[142.66px] p-4">
                                                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#afa59c] text-xs">
                                                        ASSET
                                                    </span>
                                                </TableHead>
                                                <TableHead className="w-[129.19px] p-4">
                                                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#afa59c] text-xs">
                                                        CHAIN
                                                    </span>
                                                </TableHead>
                                                <TableHead className="w-[99.22px] p-4 text-right">
                                                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#afa59c] text-xs">
                                                        BALANCE
                                                    </span>
                                                </TableHead>
                                                <TableHead className="w-[116.02px] p-4 text-right">
                                                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#afa59c] text-xs">
                                                        VALUE (USD)
                                                    </span>
                                                </TableHead>
                                                <TableHead className="w-[88.25px] p-4 text-center">
                                                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#afa59c] text-xs">
                                                        BRIDGE
                                                    </span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {filteredAssets.map((asset) => (
                                                <TableRow
                                                    key={asset.id}
                                                    className={`border-t border-[#49382f] hover:bg-[#3a3228] cursor-pointer transition-colors ${
                                                        selectedAssets.includes(asset.id)
                                                            ? "bg-[#ff66000d] border-l-4 border-l-[#ff6600]"
                                                            : ""
                                                        }`}
                                                >
                                                    <TableCell className="p-4">
                                                        <div className="flex items-center justify-center">
                                                            <Checkbox
                                                                className="w-4 h-4 mr-4 border-[#54483b]"
                                                                checked={selectedAssets.includes(asset.id)}
                                                                onCheckedChange={() => toggleAsset(asset.id)}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`flex w-8 h-8 items-center justify-center ${asset.iconBg} rounded-full overflow-hidden`}
                                                            >
                                                                <img src={asset.icon}
                                                                    className={`relative w-5 h-5 bg-cover bg-[50%_50%]`}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                                                                    {asset.name}
                                                                </span>
                                                                <span className="[font-family:'Manrope',Helvetica] font-normal text-[#80796b] text-xs">
                                                                    {asset.symbol}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="relative w-[18px] h-[22px]">
                                                                <img
                                                                    className={`absolute ${asset.chainIconClass}`}
                                                                    alt="Chain"
                                                                    src={asset.chainIcon}
                                                                />
                                                            </div>
                                                            <span className="[font-family:'Manrope',Helvetica] font-normal text-gray-300 text-sm whitespace-pre-line">
                                                                {asset.chain}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="p-4 text-right">
                                                        <span className="[font-family:'Inter',Helvetica] font-normal text-white text-sm">
                                                            {asset.balance}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="p-4 text-right">
                                                        <span className="[font-family:'Inter',Helvetica] font-medium text-white text-sm">
                                                            {asset.value}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="p-4">
                                                        <div className="flex items-center justify-center">
                                                            <Badge
                                                                className={`${asset.bridgeBg} ${asset.bridgeColor} px-2 py-1 text-xs font-medium whitespace-pre-line text-center`}
                                                            >
                                                                {asset.bridgeStatus}
                                                            </Badge>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>

                        <Alert className="bg-[#241f15] border-[#ff66004c] p-8 shadow-[0px_1px_2px_#0000000d] rounded-xl overflow-hidden relative">
                            <div className="absolute top-2 right-8 opacity-10 rotate-12">
                                <img
                                    className="w-[120px] h-36 -rotate-12"
                                    alt="Background"
                                    src={wormHoleBg}
                                />
                            </div>
                            <AlertDescription className="flex items-center gap-6 relative z-10">
                                <div className="flex flex-col items-start gap-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <img
                                            className="w-[23.33px] h-[22.38px]"
                                            alt="Alert"
                                            src={circlePentagonOrangeIcon}
                                        />
                                        <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                                            Cross-Chain Bridging Required
                                        </h3>
                                    </div>
                                    <p className="[font-family:'Manrope',Helvetica] font-normal text-gray-300 text-sm leading-5">
                                        You have selected assets on{" "}
                                        <span className="font-bold">Solana</span>. Use the
                                        <br />
                                        integrated Wormhole bridge to move them to the
                                        <br />
                                        secure Inheritance Vault on Ethereum.
                                    </p>
                                    <div className="inline-flex items-center gap-3 p-3 bg-[#00000033] rounded-lg border border-solid border-[#ffffff0d]">
                                        <div className="inline-flex items-center gap-2">
                                            <img src={whiteWomanPic} className="relative w-5 h-5 bg-cover bg-[50%_50%]" />
                                            <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                                                SOL
                                            </span>
                                        </div>
                                        <ArrowRightIcon className="w-[8.89px] h-[8.89px] text-gray-400" />
                                        <div className="inline-flex items-center gap-2">
                                            <img src={portalPic} className={`relative w-5 h-5 bg-cover bg-[50%_50%]`} />
                                            <span className="[font-family:'Manrope',Helvetica] font-medium text-[#80796b] text-xs">
                                                Portal
                                            </span>
                                        </div>
                                        <ArrowRightIcon className="w-[8.89px] h-[8.89px] text-gray-400" />
                                        <div className="inline-flex items-center gap-2">
                                            <img src={ethCoinPic} className={`relative w-5 h-5 bg-cover bg-[50%_50%]`} />
                                            <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                                                ETH Vault
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="inline-flex items-center gap-2 px-7 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-lg shadow-[0px_4px_6px_-4px_#137fec33,0px_10px_15px_-3px_#137fec33]">
                                    <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
                                        Start Bridge Process
                                    </span>
                                    <ZapIcon className="w-[15.56px] h-[19.44px]" />
                                </Button>
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="flex flex-col w-[298.67px] items-start gap-6 relative self-stretch">
                        <Card className="bg-[#2c231a] border-[#54483b] rounded-xl shadow-[0px_1px_2px_#0000000d] w-full">
                            <CardContent className="flex flex-col items-start gap-6 p-6">
                                <div className="flex flex-col items-start gap-1 w-full">
                                    <p className="[font-family:'Manrope',Helvetica] font-medium text-[#9dabb9] text-sm">
                                        Total Estimated Value
                                    </p>
                                    <div className="flex items-baseline gap-2">
                                        <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-3xl tracking-[-0.75px] leading-9">
                                            {totalValueFormatted}
                                        </h2>
                                        <span className="[font-family:'Manrope',Helvetica] font-medium text-[#afa59c] text-xs">
                                            USD
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 pt-1">
                                        <TrendingUpIcon className="w-4 h-4 text-green-500" />
                                        <span className="[font-family:'Manrope',Helvetica] font-medium text-green-500 text-sm">
                                            +2.4% (24h)
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full h-[88px] items-start justify-center pt-2 relative">
                                    <img
                                        className="absolute w-full h-[102.67%] top-[-2.67%] left-0"
                                        alt="Chart background"
                                        src={chartGraph}
                                    />
                                    <img
                                        className="absolute w-full h-[82.67%] top-[-2.67%] left-0"
                                        alt="Chart line"
                                        src={chartGraphLine}
                                    />
                                </div>

                                <div className="flex items-start justify-center gap-4 pt-4 w-full border-t border-[#49382f]">
                                    <div className="flex flex-col flex-1">
                                        <span className="[font-family:'Manrope',Helvetica] font-normal text-[#80796b] text-xs">
                                            Selected Assets
                                        </span>
                                        <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                                            {selectedAssets.length}
                                        </span>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="[font-family:'Manrope',Helvetica] font-normal text-[#80796b] text-xs">
                                            Chains
                                        </span>
                                        <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                                            {selectedChainsCount}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#ff660033] bg-[linear-gradient(180deg,rgba(255,102,0,0.05)_0%,rgba(255,102,0,0)_100%)] rounded-xl overflow-hidden w-full">
                            <CardContent className="flex flex-col items-start gap-4 p-6">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex w-8 h-8 items-center justify-center bg-[#ff660033] rounded-lg">
                                        <img
                                            className="w-[21.38px] h-[18.47px]"
                                            alt="AI Guardian"
                                            src={robotIcon}
                                        />
                                    </div>
                                    <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
                                        AI Guardian
                                    </span>
                                    <div className="flex-1 flex justify-end">
                                        <Badge className="px-2 py-0.5 bg-[#ff66001a] text-[#ff6600] text-[10px] font-bold tracking-[0.50px] rounded-full">
                                            ACTIVE
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-3 w-full">
                                    {aiGuardianChecks.map((check, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 w-full bg-[#00000033] rounded-lg border border-transparent"
                                        >
                                            <div className="inline-flex items-center gap-3">
                                                <div className="relative w-5 h-6">
                                                    <img
                                                        className={`absolute ${check.iconClass}`}
                                                        alt={check.title}
                                                        src={check.icon}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="[font-family:'Manrope',Helvetica] font-medium text-white text-sm">
                                                        {check.title}
                                                    </span>
                                                    <span className="[font-family:'Manrope',Helvetica] font-normal text-[#80796b] text-xs">
                                                        {check.description}
                                                    </span>
                                                </div>
                                            </div>
                                            <img src={greaterThanSignIcon} className="w-[5.56px] h-[9px]" />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col items-start gap-[6.8px] pt-6 pb-4 px-4 w-full bg-[#f6923b1a] rounded-lg border border-solid border-[#f6923b33]">
                                    <div className="flex items-center gap-[3.99px]">
                                        <img src={bulbIcon} className="w-3 h-3 text-[#ff6600]" />
                                        <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff6600] text-xs">
                                            RECOMMENDATION
                                        </span>
                                    </div>
                                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm leading-[22.8px]">
                                        Based on current market
                                        <br />
                                        volatility &amp; stability indices,
                                        <br />
                                        consider a split of:
                                    </p>
                                    <div className="flex items-start gap-2 pt-[5.2px]">
                                        <Badge className="px-2 py-1 bg-[#ffffff1a] text-white text-[11.3px] font-bold border border-solid">
                                            60% ETH
                                        </Badge>
                                        <Badge className="px-2 py-1 bg-[#ffffff1a] text-white text-[11.6px] font-bold border border-solid">
                                            40% COTI
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <footer className="items-start pt-14 pb-0 px-0 self-stretch w-full flex-[0_0_auto] flex flex-col relative">
                    <div className="flex items-center justify-between pt-8 pb-12 px-0 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-[#54483b]">
                        <Button
                            className="px-6 py-6 rounded-lg border border-solid border-[#54483b] bg-transparent hover:bg-transparent [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
                        >
                            Back
                        </Button>

                        <div className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
                            <Button
                                className="px-6 py-6 rounded-lg border border-solid border-[#54483b] bg-transparent hover:bg-transparent [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
                            >
                                Save as Draft
                            </Button>

                            <Button
                                onClick={handleNext}
                                className="inline-flex items-center gap-2 px-7 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-lg shadow-[0px_4px_6px_-4px_#137fec40,0px_10px_15px_-3px_#137fec40] [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
                            >
                                Next: Configure Beneficiaries
                                <ChevronRightIcon className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
};
