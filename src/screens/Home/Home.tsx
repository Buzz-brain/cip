import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Link } from "react-router-dom";

import logoImg from "@assets/cip-logo.png";
import homeBgImg from "@assets/home-bg.svg";
import shieldImg from "@assets/shield-1.svg";
import divIcon from "@assets/ethereum.png";
import div1Icon from "@assets/polygon.png";
import div2Icon from "@assets/bnb-logo.png";
import solIcon from "@assets/solana.png";
import timerIcon from "@assets/timer.svg";
import verifiedUserIcon from "@assets/verified-user.svg";
import accBalWallet from "@assets/acc-bal-wallet.svg";

const navigationItems = [
  { label: "How it Works", href: "#" },
  { label: "TaxCore", href: "#" },
  { label: "Pricing", href: "/pricing" },
  { label: "Enterprise", href: "#" },
];

const blockchains = [
  { name: "BNB Chain", icon: div2Icon },
  { name: "Polygon", icon: div1Icon },
  { name: "Ethereum", icon: divIcon },
  { name: "Solana", icon: solIcon },
];

const coreCapabilities = [
  {
    icon: timerIcon,
    title: "Dead Man's Switch",
    description:
      "Automated triggers based on wallet inactivity or oracle verification. Customizable heartbeat periods from 3 months to 5 years.",
  },
  {
    icon: verifiedUserIcon,
    title: "Beneficiary KYB",
    description:
      "Integrated Know Your Beneficiary compliance checks ensure assets are only transferred to verified identities, meeting global regulatory standards.",
  },
  {
    icon: accBalWallet,
    title: "Asset Aggregation",
    description:
      "Consolidate assets from multiple wallets and chains into a single abstract smart account for unified distribution.",
  },
];

const taxCoreSteps = [
  {
    title: "Before: Smart Planning",
    description:
      "Identify tax obligations based on beneficiary residency. Preliminary tax summary estimation.",
  },
  {
    title: "During: Execution Tracking",
    description:
      "Real-time snapshotting of asset values at time of transfer. Freezing cost-basis for accurate gains reporting.",
  },
  {
    title: "After: Compliance & Reporting",
    description:
      "Automated PDF generation for tax authorities. Post-distribution summaries for beneficiaries.",
  },
];

const featureCards = [
  {
    icon: "/material-symbols-child-care-outline.svg",
    title: "Children's Trust Accounts",
    description:
      "Create time-locked vaults for minor beneficiaries. Set automated drip-feeds for tuition or monthly allowances unlocked only after specific dates or milestones.",
    features: ["18th Birthday Release", "Tuition Direct-Pay"],
    bgColor: "bg-[#ec48991a]",
  },
  {
    icon: "/wpf-key-security.svg",
    title: "MPC Security Architecture",
    description:
      "We use Multi-Party Computation to shard private keys. No single entity—including us—can access your funds. Recovery requires a threshold of shards.",
    features: ["Non-custodial by design", "SOC 2 Type II Audited"],
    bgColor: "bg-[#22c55e1a]",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For single-chain assets.",
    features: [
      { text: "1 WalletIcon Connected", included: true },
      { text: "Basic Beneficiary triggers", included: true },
    ],
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Pro Estate",
    price: "$29",
    period: "/mo",
    description: "Multi-chain & TaxCore.",
    badge: "POPULAR",
    features: [
      { text: "Unlimited Wallets", included: true },
      { text: "Full TaxCore Access", included: true },
      { text: "Children's Trust Features", included: true },
    ],
    buttonText: "Get Started",
    buttonVariant: "default" as const,
    highlighted: true,
  },
  {
    name: "Lifetime",
    price: "$999",
    period: "/one-time",
    description: "Pay once, secure forever.",
    features: [
      { text: "All Pro Features", included: true },
      { text: "Concierge Onboarding", included: true },
      { text: "Hardware Key Backup", included: true },
    ],
    buttonText: "Buy Lifetime",
    buttonVariant: "outline" as const,
    highlighted: false,
  },
];

const footerLinks = {
  product: ["Features", "TaxCore", "Security", "Pricing"],
  resources: ["Documentation", "API Reference", "Whitepaper", "Community"],
  legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
};

export const Home = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <div className="bg-black">
        <header className="bg-[#0d0501] border-b border-[#483423]">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between h-16">
              <div className="flex items-center gap-1">
                <div>
                  <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
                </div>
                <span className="[font-family:'Space_Grotesk',Helvetica] text-[19.4px] font-bold text-white">
                  CIP
                </span>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="[font-family:'Noto_Sans',Helvetica] font-medium text-slate-300 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Button className="bg-gradient-to-r from-[#ff6600] to-[#993d00] hover:opacity-90 [font-family:'Noto_Sans',Helvetica] font-bold text-sm">
                  Launch App
                </Button>
              </div>
            </nav>
          </div>
        </header>

        <section className="relative bg-[#060605] py-20">
          <img
            src={homeBgImg}
            alt="Home Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="space-y-6">
                <h2 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-7xl leading-[72px]">
                  <span className="text-white">Secure Your Digital Legacy</span>
                </h2>
                <p className="[font-family:'Noto_Sans',Helvetica] font-light text-slate-300 text-xl max-w-2xl mx-auto">
                  Automated, non-custodial inheritance for the multi-chain
                  future. Ensure your assets reach your beneficiaries safely,
                  securely, and tax-efficiently.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button className="bg-gradient-to-r from-[#ff6600] to-[#993d00] hover:opacity-90 shadow-[0px_0px_20px_#ff6633cc] [font-family:'Noto_Sans',Helvetica] font-bold">
                  Start Plan
                </Button>
                <Button
                  variant="outline"
                  className="bg-[#111111] text-[#ffffff] border-[#bd4b00] [font-family:'Noto_Sans',Helvetica] font-bold"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0568 7.01474C16.417 7.2063 16.7183 7.49226 16.9284 7.84198C17.1385 8.1917 17.2495 8.592 17.2495 8.99999C17.2495 9.40798 17.1385 9.80828 16.9284 10.158C16.7183 10.5077 16.417 10.7937 16.0568 10.9852L6.44775 16.2105C4.9005 17.0527 3 15.9577 3 14.226V3.77474C3 2.04224 4.9005 0.947986 6.44775 1.78874L16.0568 7.01474Z" fill="white"/>
</svg>

                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1c130d] py-8">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <p className="[font-family:'Space_Grotesk',Helvetica] font-bold text-[#8b7664] text-xs">
                Securing Assets On Top Chains
              </p>
              <div className="flex items-center justify-center gap-16">
                {blockchains.map((chain) => (
                  <div key={chain.name} className="flex items-center gap-4">
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="w-8 h-8"
                    />
                    <span className="[font-family:'Space_Grotesk',Helvetica] font-bold text-[#b8a494] text-base">
                      {chain.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="space-y-5">
                <h2 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl">
                  Core Capabilities
                </h2>
                <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-lg max-w-2xl">
                  Built for security and autonomy across multiple blockchains,
                  ensuring your plan executes exactly as intended.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coreCapabilities.map((capability) => (
                  <Card
                    key={capability.title}
                    className="bg-[#332619] border-[#674932]"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-[#135bec1a] rounded-lg flex items-center justify-center">
                        <img src={capability.icon} alt="" className="w-6 h-6" />
                      </div>
                      <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-xl">
                        {capability.title}
                      </h3>
                      <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-base leading-[26px]">
                        {capability.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#20190f] border-t border-b border-[#483423] py-20 relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8a6f1e1a] rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-10">
                <div className="space-y-6">
                  <Badge className="bg-[#f6a83b1a] border-[#f6b13b33] text-[#faaf60] [font-family:'Noto_Sans',Helvetica] font-bold">
                    <img
                      src="/majesticons-analytics-line.svg"
                      alt=""
                      className="w-4 h-4 mr-2"
                    />
                    Infrastructure for Accountants
                  </Badge>
                  <h2 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-5xl">
                    TaxCore Intelligence
                  </h2>
                  <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-lg leading-[29px]">
                    TaxCore isn't just a calculator; it's a full compliance
                    suite. It integrates real-time transaction analysis,
                    automatic capital gains calculation, and multi-jurisdiction
                    tax rules to prepare accountant-ready documentation.
                  </p>
                </div>

                <div className="border-l border-[#674932] pl-8 space-y-12">
                  {taxCoreSteps.map((step) => (
                    <div key={step.title} className="space-y-2">
                      <h3 className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-lg">
                        {step.title}
                      </h3>
                      <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-sm">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-[#332619] border-[#674932]">
                <CardHeader className="border-b border-[#674932]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#f6b13b33] rounded flex items-center justify-center">
                        <img
                          src="/material-symbols-calculate.svg"
                          alt=""
                          className="w-6 h-6"
                        />
                      </div>
                      <span className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white">
                        TaxCore CalculatorIcon
                      </span>
                    </div>
                    <Badge className="bg-[#22c55e1a] border-[#22c55e33] text-green-400">
                      <img
                        src="/tabler-download.svg"
                        alt=""
                        className="w-4 h-4 mr-1"
                      />
                      Export PDF
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                        Origin Jurisdiction
                      </label>
                      <div className="bg-[#221911] border border-[#674932] rounded px-3 py-2">
                        <span className="[font-family:'Noto_Sans',Helvetica] text-white text-sm">
                          United Kingdom
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                        Beneficiary Residency
                      </label>
                      <div className="bg-[#221911] border border-[#674932] rounded px-3 py-2">
                        <span className="[font-family:'Noto_Sans',Helvetica] text-white text-sm">
                          Germany
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-[#221911] border-[#674932]">
                      <CardContent className="p-4 space-y-2">
                        <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                          Est. Capital Gains
                        </p>
                        <p className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                          $142,050.00
                        </p>
                        <div className="flex items-center gap-1">
                          <img
                            src="/fluent-data-trending-24-filled.svg"
                            alt=""
                            className="w-3.5 h-3.5"
                          />
                          <span className="[font-family:'Noto_Sans',Helvetica] text-red-400 text-[10px]">
                            +12% since inception
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-[#221911] border-[#674932]">
                      <CardContent className="p-4 space-y-2">
                        <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-xs">
                          Inheritance Tax
                        </p>
                        <p className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                          $56,820.00
                        </p>
                        <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-[10px]">
                          Rate: 40% (Above Threshold)
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-[#ff66001a] border border-[#ff66004d] rounded-lg p-4 flex gap-4">
                    <img
                      src="/ic-baseline-auto-awesome.svg"
                      alt=""
                      className="w-6 h-6 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <p className="[font-family:'Noto_Sans',Helvetica] font-bold text-[#ff6600] text-xs">
                        TaxCore AI Insight
                      </p>
                      <p className="[font-family:'Noto_Sans',Helvetica] text-slate-300 text-xs leading-[19px]">
                        Based on the double taxation treaty between UK and
                        Germany, the beneficiary may claim credit for tax paid
                        in the UK.
                      </p>
                    </div>
                  </div>

                  <Button className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 [font-family:'Noto_Sans',Helvetica] font-bold">
                    Generate Preliminary Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {featureCards.map((card) => (
                <Card
                  key={card.title}
                  className="bg-[#332619] border-[#674932] relative overflow-hidden"
                >
                  <CardContent className="p-8 space-y-6 relative z-10">
                    <div className="w-12 h-12 bg-[#ec489933] rounded-lg flex items-center justify-center">
                      <img src={card.icon} alt="" className="w-6 h-6" />
                    </div>
                    <h3 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-2xl">
                      {card.title}
                    </h3>
                    <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-base leading-6">
                      {card.description}
                    </p>
                    <div className="space-y-2">
                      {card.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <img
                            src="/material-symbols-check-circle-outline.svg"
                            alt=""
                            className="w-3.5 h-3.5"
                          />
                          <span className="[font-family:'Noto_Sans',Helvetica] text-slate-300 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <div
                    className={`absolute bottom-0 right-0 w-40 h-40 ${card.bgColor} rounded-full blur-2xl`}
                  />
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#20180f] border-t border-[#483423] py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-5">
                <h2 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl">
                  Simple Pricing for Peace of Mind
                </h2>
                <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-base">
                  Choose the plan that fits your estate complexity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`${
                      plan.highlighted
                        ? "bg-[#332619] border-2 border-[#ff6600]"
                        : "bg-[#221911] border-[#674932]"
                    } relative`}
                  >
                    {plan.badge && (
                      <div className="absolute top-0 right-0 bg-[#ff6600] px-3 py-1">
                        <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xs">
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                        <h3 className="[font-family:'Noto_Sans',Helvetica] font-bold text-white text-xl">
                          {plan.name}
                        </h3>
                        <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
                          {plan.description}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-3xl">
                          {plan.price}
                        </span>
                        <span className="[font-family:'Space_Grotesk',Helvetica] font-bold text-[#8b7664] text-sm">
                          {plan.period}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <img
                              src="/streamline-sharp-check-solid.svg"
                              alt=""
                              className="w-3.5 h-3.5"
                            />
                            <span
                              className={`[font-family:'Noto_Sans',Helvetica] text-sm ${plan.highlighted ? "text-white" : "text-slate-300"}`}
                            >
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant={plan.buttonVariant}
                        className={`w-full ${
                          plan.highlighted
                            ? "bg-[#ff6600] hover:bg-[#ff6600]/90"
                            : "border-[#674932]"
                        } [font-family:'Noto_Sans',Helvetica] font-bold`}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto bg-gradient-to-r from-[#332319] to-[#99684b] border-[#674932]">
              <CardContent className="p-12 flex items-center justify-between gap-12">
                <div className="flex-1 space-y-6">
                  <h2 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-3xl">
                    For Family Offices & Custodians
                  </h2>
                  <p className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-lg leading-7">
                    Manage high-net-worth digital estates with enterprise-grade
                    multi-sig coordination, dedicated account managers, and
                    custom legal framework integration.
                  </p>
                  <div className="flex items-center gap-6">
                    <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-[#ff6600] text-base cursor-pointer hover:underline">
                      Contact Sales
                    </span>
                    <img
                      src="/material-symbols-arrow-forward-rounded.svg"
                      alt=""
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <img src={shieldImg} alt="Shield" className="w-[252px] h-[277px]" />
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="bg-[#17100b] border-t border-[#483423] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#ff6600] rounded-lg flex items-center justify-center">
                      <img src={logoImg} alt="Logo" className="w-5 h-6 object-cover" />
                    </div>
                    <span className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-lg">
                      CIP
                    </span>
                  </div>
                  <p className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm leading-[22px]">
                    The standard for sovereign digital inheritance. Securing the
                    future of decentralized wealth.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-base">
                    Product
                  </h4>
                  <div className="space-y-2">
                    {footerLinks.product.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="block [font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-base">
                    Resources
                  </h4>
                  <div className="space-y-2">
                    {footerLinks.resources.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="block [font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-base">
                    Legal
                  </h4>
                  <div className="space-y-2">
                    {footerLinks.legal.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="block [font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="bg-[#483423]" />

              <div className="flex items-center justify-between">
                <p className="[font-family:'Noto_Sans',Helvetica] text-[#695d47] text-sm">
                  © 2024 CIP Protocol. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <span className="[font-family:'Inter',Helvetica] text-[#8b7664] text-xs">
                    public
                  </span>
                  <span className="[font-family:'Inter',Helvetica] text-[#8b7664] text-sm">
                    mail
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
