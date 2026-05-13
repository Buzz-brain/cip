import { useState, useEffect } from "react";
import { assetData } from "../PlanCreationFlow/SelectAssets";
import { useParams, useNavigate } from "react-router-dom";
import { usePlan } from "../../../context/usePlan";
import { toast } from "react-toastify";
// Sidebar removed — layout provides it
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Settings as SettingsIcon, ChevronRight } from "lucide-react";

export const ChildrensTrustAccount = (): JSX.Element => {
  const [releaseAge, setReleaseAge] = useState(18);
  // Only show Arbitrum-supported assets
  const arbitrumAssets = assetData.filter(a => a.chain.toLowerCase().includes("arbitrum") && !a.needsBridge);
  const [selectedAsset, setSelectedAsset] = useState(arbitrumAssets[0]?.symbol || "ETH");
  const [contributionAmount, setContributionAmount] = useState("100");
  const [frequency, setFrequency] = useState("Weekly");
  const { trustId } = useParams<{ trustId?: string }>();
  const TEMPLATE_TITLES: Record<string, string> = {
    'template-child': "Children Trust Account",
    'template-family': "Family Trust Account",
    'template-education': "Education Trust Account",
    'template-retirement': "Retirement Trust Account",
  };

  const viewingLabel = trustId ? (TEMPLATE_TITLES[trustId] || `Trust (${trustId})`) : "Trust Account";

  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { setPlanType, setPlanField, setAssets, setBeneficiaries, submitPlan, clearPlan } = usePlan();
  const navigate = useNavigate();

  useEffect(() => {
    // Prefill based on selected template id
    if (!trustId) return;
    if (trustId === 'template-child') {
      setReleaseAge(18);
      setSelectedAsset(arbitrumAssets[0]?.symbol || 'ETH');
      setContributionAmount('100');
      setFrequency('Monthly');
    } else if (trustId === 'template-family') {
      setReleaseAge(21);
      setSelectedAsset(arbitrumAssets.find(a => a.symbol === 'USDT')?.symbol || arbitrumAssets[0]?.symbol || 'ETH');
      setContributionAmount('200');
      setFrequency('Monthly');
    } else if (trustId === 'template-education') {
      setReleaseAge(22);
      setSelectedAsset(arbitrumAssets.find(a => a.symbol === 'USDC')?.symbol || arbitrumAssets[0]?.symbol || 'ETH');
      setContributionAmount('150');
      setFrequency('Monthly');
    } else if (trustId === 'template-retirement') {
      setReleaseAge(60);
      setSelectedAsset(arbitrumAssets.find(a => a.symbol === 'USDC')?.symbol || arbitrumAssets[0]?.symbol || 'ETH');
      setContributionAmount('500');
      setFrequency('Monthly');
    }
  }, [trustId]);

  const computeReleaseTimestamp = (dobStr: string | null, age: number) => {
    try {
      let month: number, day: number, year: number;

      if (dobStr) {
        // Parse DOB and calculate release date: DOB year + age, same month/day as DOB
        const dob = new Date(dobStr);
        year = dob.getUTCFullYear() + age;
        month = dob.getUTCMonth();
        day = dob.getUTCDate();
      } else {
        // No DOB provided: use today and add age years
        const today = new Date();
        year = today.getUTCFullYear() + age;
        month = today.getUTCMonth();
        day = today.getUTCDate();
      }

      const releaseDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
      return Math.floor(releaseDate.getTime() / 1000);
    } catch (err) {
      console.warn('computeReleaseTimestamp failed', err);
      return Math.floor(Date.now() / 1000);
    }
  };

  const projectedReleaseTs = computeReleaseTimestamp(dateOfBirth || null, releaseAge);
  const projectedReleaseDateStr = new Date(projectedReleaseTs * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Dynamic projection calculations
  const calculateProjection = () => {
    const monthlyAmount = parseFloat(contributionAmount) || 0;
    const periodsPerYear = frequency === 'Weekly' ? 52 : 12;
    const totalPeriods = releaseAge * periodsPerYear;
    const annualRate = 0.05; // 5% APY
    const periodRate = annualRate / periodsPerYear;

    // Future Value of Annuity formula: FV = PMT × [((1 + r)^n - 1) / r]
    let futureValue = 0;
    if (periodRate > 0) {
      futureValue = monthlyAmount * (Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate;
    } else {
      futureValue = monthlyAmount * totalPeriods;
    }

    const totalPrincipal = monthlyAmount * totalPeriods;
    const totalInterest = futureValue - totalPrincipal;

    return {
      futureValue,
      totalPrincipal,
      totalInterest,
      totalPeriods,
    };
  };

  const projection = calculateProjection();
  const chartBars = Math.max(1, releaseAge); // Ensure at least 1 bar

  const handleCreateTrust = async () => {
    setSubmitting(true);
    try {
      // basic validation
      if (!beneficiaryName) {
        toast.error('Please provide the beneficiary full name');
        setSubmitting(false);
        return;
      }
      if (!walletAddress) {
        toast.error('Please provide a beneficiary wallet address');
        setSubmitting(false);
        return;
      }
      // prepare plan
      setPlanType('timelock');
      const planName = `${viewingLabel} - ${beneficiaryName || 'Beneficiary'}`;
      setPlanField('name', planName);
      setAssets(selectedAsset, contributionAmount);
      const beneficiary = {
        id: 'b1',
        name: beneficiaryName || 'Beneficiary',
        relationship: 'child',
        email: email || '',
        walletAddress: walletAddress || '',
        allocation: 100,
        color: '#8b7664',
        initial: (beneficiaryName || 'B').charAt(0).toUpperCase(),
      };
      setBeneficiaries([beneficiary as any]);

      const releaseTs = computeReleaseTimestamp(dateOfBirth || null, releaseAge);
      setPlanField('releaseTimestamp', releaseTs);

      // submit using existing plan flow
      const res = await submitPlan();
      toast.success('Trust plan created — processing');
      // clear draft and navigate to plans list
      clearPlan();
      navigate('/owner-dashboard/plans');
      return res;
    } catch (err: any) {
      console.error('Create trust failed', err);
      toast.error(err?.message || 'Failed to create trust plan');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
          Dashboard <span className="text-[#8b7664]">/</span> Trusts{" "}
          <span className="text-[#8b7664]">/</span>{" "}
          <span className="text-white">{viewingLabel}</span>
        </div>

        {/* Title Section */}
        <div className="space-y-4">
          <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl">
            {viewingLabel}
          </h1>
          <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] max-w-2xl">
            Secure your child's future on Arbitrum. Set up automated savings, choose your asset, and define secure inheritance release rules.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="col-span-2 space-y-6">
            {/* Beneficiary Details */}
            <Card className="bg-[#1a1410] border-[#3a2f1e]">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👤</span>
                  <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                    Beneficiary Details
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={beneficiaryName}
                        onChange={(e) => setBeneficiaryName(e.target.value)}
                        placeholder="e.g. Alice Doe"
                        className="w-full bg-[#0d0b08] border border-[#3a2f1e] rounded-lg px-4 py-2 text-[#b8a494] placeholder-[#695d47] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                      />
                    </div>
                    <div>
                      <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full bg-[#0d0b08] border border-[#3a2f1e] rounded-lg px-4 py-2 text-[#b8a494] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                      Wallet Address (Arbitrum)
                    </label>
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder="0x..."
                      className="w-full bg-[#0d0b08] border border-[#3a2f1e] rounded-lg px-4 py-2 text-[#b8a494] placeholder-[#695d47] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                    />
                  </div>

                  <div>
                    <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="beneficiary@example.com"
                      className="w-full bg-[#0d0b08] border border-[#3a2f1e] rounded-lg px-4 py-2 text-[#b8a494] placeholder-[#695d47] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding Configuration */}
            <Card className="bg-[#1a1410] border-[#3a2f1e]">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                    Funding Configuration
                  </h3>
                </div>

                <div>
                  <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-4">
                    Select Asset (Arbitrum Only)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {arbitrumAssets.map((asset) => (
                      <button
                        key={asset.symbol}
                        onClick={() => setSelectedAsset(asset.symbol)}
                        className={`py-3 rounded-lg border transition-colors [font-family:'Noto_Sans',Helvetica] font-bold text-sm ${
                          selectedAsset === asset.symbol
                            ? "bg-[#332619] border-[#ff6600] text-white"
                            : "bg-[#0d0b08] border-[#3a2f1e] text-[#8b7664] hover:border-[#554433]"
                        }`}
                      >
                        <div className="text-lg mb-1">{asset.symbol}</div>
                        {asset.name}
                        {asset.symbol === "ETH" && (
                          <div className="text-xs text-[#ff6600] mt-1">Recommended</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                      Contribution Amount
                    </label>
                    <input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      className="w-full bg-[#0d0b08] border border-[#3a2f1e] rounded-lg px-4 py-2 text-[#b8a494] [font-family:'Noto_Sans',Helvetica] text-sm focus:outline-none focus:border-[#ff6600]"
                    />
                  </div>

                  <div>
                    <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm block mb-2">
                      Frequency
                    </label>
                    <div className="flex gap-2">
                      {["Weekly", "Monthly"].map((freq) => (
                        <button
                          key={freq}
                          onClick={() => setFrequency(freq)}
                          className={`flex-1 py-2 rounded-lg border transition-colors [font-family:'Noto_Sans',Helvetica] font-medium text-sm ${
                            frequency === freq
                              ? "bg-[#332619] border-[#ff6600] text-white"
                              : "bg-[#0d0b08] border-[#3a2f1e] text-[#8b7664]"
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Release Age */}
            <Card className="bg-[#1a1410] border-[#3a2f1e]">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔓</span>
                  <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                    Release Age
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl">
                    {releaseAge}
                    <span className="text-lg text-[#8b7664] ml-2">Years Old</span>
                  </div>

                  <div className="flex justify-between gap-2">
                    {[18, 21, 25, 30].map((age) => (
                      <button
                        key={age}
                        onClick={() => setReleaseAge(age)}
                        className={`flex-1 py-2 rounded-lg border transition-colors [font-family:'Noto_Sans',Helvetica] font-bold text-sm ${
                          releaseAge === age
                            ? "bg-[#332619] border-[#ff6600] text-white"
                            : "bg-[#0d0b08] border-[#3a2f1e] text-[#8b7664]"
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Projection */}
          <div className="space-y-4">
            <Card className="bg-[#1a1410] border-[#3a2f1e]">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-base">
                    Projection
                  </h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 [font-family:'Noto_Sans',Helvetica] font-bold text-xs">
                    5% APY
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                    Projected Value at Age {releaseAge}
                  </div>
                  <div className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-3xl">
                    ${projection.futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                    Based on ${contributionAmount} {frequency.toLowerCase()} contribution for {releaseAge} years
                  </p>
                </div>

                {/* Chart */}
                <div className="bg-[#0d0b08] rounded-lg p-4 space-y-2">
                  <div className="flex gap-1 h-40 items-end">
                    {Array.from({ length: chartBars }).map((_, i) => {
                      const progressPercent = (i + 1) / chartBars;
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-[#ff6600] to-[#ff8c33]"
                          style={{
                            height: `${30 + progressPercent * 70}%`,
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between items-center px-1 pt-2 border-t border-[#3a2f1e]">
                    <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                      0
                    </span>
                    <div className="flex items-center gap-1 bg-[#332619] px-2 py-1 rounded">
                      <span className="w-2 h-2 bg-[#ff6600] rounded-full"></span>
                      <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xs">
                        ${projection.futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <span className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                      {releaseAge}yr
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#0d0b08] rounded p-3 space-y-1">
                    <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                      Total Principal
                    </p>
                    <p className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white">
                      ${projection.totalPrincipal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="bg-[#0d0b08] rounded p-3 space-y-1">
                    <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                      Total Interest
                    </p>
                    <p className="[font-family:'Space_Grotesk',Helvetica] font-bold text-green-400">
                      +${projection.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                {/* Release Info */}
                <div className="bg-[#332619] border border-[#554433] rounded-lg p-3 space-y-2">
                  <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-xs">
                    Funds will unlock for{" "}
                    <span className="text-white font-bold">{beneficiaryName || 'beneficiary'}</span> on{" "}
                    <span className="text-[#ff6600] font-bold">{projectedReleaseDateStr}</span>{" "}
                    when they turn {releaseAge}.
                  </p>
                </div>

                {/* Bridge prompt if asset needs bridge */}
                {assetData.find(a => a.symbol === selectedAsset && a.needsBridge) && (
                  <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded p-3 text-xs">
                    This asset is not native to Arbitrum. Please <a href="https://portalbridge.com/" target="_blank" rel="noopener noreferrer" className="underline">bridge your funds</a> to Arbitrum before proceeding.
                  </div>
                )}

                <Button
                  className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white [font-family:'Noto_Sans',Helvetica] font-bold gap-2"
                  onClick={handleCreateTrust}
                  disabled={submitting}
                >
                  <ChevronRight className="w-4 h-4" />
                  {submitting ? 'Creating...' : 'Create Trust Account'}
                </Button>

                <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs text-center">
                  Gas fees will be paid in the selected asset
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
