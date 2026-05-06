import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Separator } from "../../components/ui/separator";
import { usePlans } from "../../lib/hooks/usePlans";

const navigationItems = [
  { label: "How it Works", href: "#" },
  { label: "TaxCore", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Enterprise", href: "#" },
];

const blockchains = [
  { name: "BNB Chain", icon: "/div-2.svg" },
  { name: "Polygon", icon: "/div-1.svg" },
  { name: "Ethereum", icon: "/div.svg" },
  { name: "Solana", icon: "/sol.svg" },
];

const coreCapabilities = [
  {
    icon: "/ic-baseline-timer.svg",
    title: "Dead Man's Switch",
    description:
      "Automated triggers based on wallet inactivity or oracle verification. Customizable heartbeat periods from 3 months to 5 years.",
  },
  {
    icon: "/iconoir-verified-user.svg",
    title: "Beneficiary KYB",
    description:
      "Integrated Know Your Beneficiary compliance checks ensure assets are only transferred to verified identities, meeting global regulatory standards.",
  },
  {
    icon: "/material-symbols-account-balance-wallet.svg",
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

// Pricing is sourced from backend via `usePlans` — remove local mock arrays.

const auditors = [
  { name: "CertiK", icon: "/iconoir-verified-user.svg" },
  { name: "Hacken", icon: "/material-symbols-shield-outline-rounded.svg" },
  { name: "OpenZeppelin", icon: "/material-symbols-lock-outline.svg" },
  { name: "Trail of Bits", icon: "/mdi-security-lock-outline.svg" },
];

const faqs = [
  {
    question: "Are my assets safe if I stop paying?",
    answer:
      "Yes. CIP is non-custodial. Your triggers remain active on-chain, but you will lose access to the editing dashboard and TaxCore features until you renew.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Absolutely. You can upgrade or downgrade your subscription at any time. Changes take effect immediately.",
  },
];

const footerLinks = {
  product: ["Features", "TaxCore", "Security", "Pricing"],
  resources: ["Documentation", "API Reference", "Whitepaper", "Community"],
  legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
};

const footerLinksAlt = [
  "Privacy Policy",
  "Terms of Service",
  "Security Audit",
  "Contact Support",
];

export const Box = (): JSX.Element => {
  const { plans: backendPlans, loading: plansLoading } = usePlans();
  const planSource = backendPlans && backendPlans.length > 0 ? backendPlans.slice().sort((a: any, b: any) => Number(a.id) - Number(b.id)) : [];
  const toTitleCase = (input?: string) => input ? input.replace(/(^|\s)\S/g, (t) => t.toUpperCase()) : '';

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <div className="bg-black">
        <header className="bg-[#0d0501] border-b border-[#483423]">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between h-16">
              <div className="flex items-center gap-1">
                <div className="w-10 h-10 bg-[#ff6600] rounded-lg flex items-center justify-center">
                  <img
                    src="/logo-3-2.png"
                    alt="Logo"
                    className="w-[25px] h-[31px] object-cover"
                  />
                </div>
                <span className="[font-family:'Space_Grotesk',Helvetica] text-[19.4px] font-bold text-white">
                  CIP
                </span>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-6">
                  {navigationItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="[font-family:'Noto_Sans',Helvetica] font-medium text-slate-300 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
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
            src="/header-1.png"
            alt="Header"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="space-y-6">
                <h2 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-7xl leading-[72px]">
                  <span className="text-white">Secure Your Digital Legacy</span>
                  <br />
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Legacy Across Chains
                  </span>
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
                  className="bg-[#111111] border-[#bd4b00] [font-family:'Noto_Sans',Helvetica] font-bold"
                >
                  <img
                    src="/solar-play-bold.svg"
                    alt=""
                    className="w-[18px] h-[18px] mr-2"
                  />
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
                      {card.features.map((feature: string) => (
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
                {planSource.map((rawPlan: any, idx: number) => {
                  const plan = {
                    name: toTitleCase(rawPlan.name ?? `Plan ${rawPlan.id}`),
                    price: rawPlan.price !== undefined && rawPlan.price !== null ? (typeof rawPlan.price === 'number' ? `$${rawPlan.price}` : `$${rawPlan.price}`) : 'Custom',
                    period: "/mo",
                    description: rawPlan.description ?? `${toTitleCase(rawPlan.name)} Plan`,
                    features: [
                      { text: `Included Plans: ${rawPlan.plans ?? '—'}`, included: true },
                      { text: `Triggers: ${rawPlan.triggers ?? '—'}`, included: true },
                      { text: `Supported Chains: ${rawPlan.supported_chain ?? '—'}`, included: true },
                    ],
                    buttonText: rawPlan.buttonText ?? 'Choose',
                    buttonVariant: rawPlan.buttonVariant ?? 'default',
                    highlighted: !!rawPlan.highlighted,
                    badge: rawPlan.badge,
                  };
                  return (
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
                        {plan.features.map((feature: { text: string; included?: boolean; subtext?: string } , idx: number) => (
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
                )})}
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
                <img
                  src="/shield-1.png"
                  alt="Shield"
                  className="w-[252px] h-[277px]"
                />
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
                      <img
                        src="/logo-3-2.png"
                        alt="Logo"
                        className="w-5 h-6 object-cover"
                      />
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

      <div className="bg-white">
        <div className="bg-black">
          <header className="bg-[#0d0501] shadow-[0px_3px_4px_#78370c29]">
            <div className="container mx-auto px-4">
              <nav className="flex items-center justify-between h-20">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#ff6600] rounded-lg flex items-center justify-center">
                    <img
                      src="/logo-3-2.png"
                      alt="Logo"
                      className="w-[25px] h-[31px] object-cover"
                    />
                  </div>
                  <span className="[font-family:'Manrope',Helvetica] text-xl font-bold text-white">
                    CIP
                  </span>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-9">
                    <a
                      href="#"
                      className="[font-family:'Manrope',Helvetica] font-medium text-gray-200 text-sm hover:text-white transition-colors"
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className="[font-family:'Manrope',Helvetica] font-medium text-gray-200 text-sm hover:text-white transition-colors"
                    >
                      Security
                    </a>
                    <a
                      href="#"
                      className="[font-family:'Manrope',Helvetica] font-bold text-gray-200 text-sm hover:text-white transition-colors"
                    >
                      Pricing
                    </a>
                    <a
                      href="#"
                      className="[font-family:'Manrope',Helvetica] font-medium text-gray-200 text-sm hover:text-white transition-colors"
                    >
                      Resources
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      className="bg-[#554233] hover:bg-[#554233]/90 [font-family:'Manrope',Helvetica] font-bold text-sm"
                    >
                      Log In
                    </Button>
                    <Button className="bg-[#ff6600] hover:bg-[#ff6600]/90 [font-family:'Manrope',Helvetica] font-bold text-sm">
                      Get Started
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          </header>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto space-y-10">
                <div className="text-center space-y-6">
                  <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[46px] leading-[48px]">
                    Secure your legacy across chains
                  </h1>
                  <p className="[font-family:'Manrope',Helvetica] text-[#b8a494] text-lg max-w-2xl mx-auto leading-[27px]">
                    Choose the inheritance plan that fits your assets and your
                    family's needs. Upgrade or downgrade at any time with zero
                    lock-in periods.
                  </p>
                  <div className="flex items-center justify-center gap-9 bg-[#32241a] border border-[#554233] rounded-full p-1 max-w-xs mx-auto">
                    <Button className="bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-full [font-family:'Manrope',Helvetica] font-bold text-sm">
                      Monthly
                    </Button>
                    <span className="[font-family:'Manrope',Helvetica] font-bold text-[#b8a494] text-sm pr-4">
                      Yearly (Save 20%)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {planSource.map((rawPlan: any) => {
                    const plan = {
                      name: toTitleCase(rawPlan.name ?? `Plan ${rawPlan.id}`),
                      price: rawPlan.price !== undefined && rawPlan.price !== null ? (typeof rawPlan.price === 'number' ? `$${rawPlan.price}` : `$${rawPlan.price}`) : 'Custom',
                      period: rawPlan.period ?? '/mo',
                      description: rawPlan.description ?? `${toTitleCase(rawPlan.name)} Plan`,
                      features: rawPlan.features ?? [],
                      buttonText: rawPlan.buttonText ?? 'Choose',
                      highlighted: !!rawPlan.highlighted,
                      badge: rawPlan.badge,
                    };
                    return (
                      <Card
                        key={plan.name}
                        className={`${
                          plan.highlighted
                            ? "bg-[#32241a] border-2 border-[#ff6600] relative"
                            : "bg-[#32241a] border-[#554233]"
                        }`}
                      >
                        {plan.badge && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#ff6600] rounded-full px-3 py-1">
                            <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
                              {plan.badge}
                            </span>
                          </div>
                        )}
                        <CardContent className="p-6 space-y-6">
                          <div className="space-y-2">
                            <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
                              {plan.name}
                            </h3>
                            <div className="flex items-baseline gap-1">
                              <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-[35px] leading-[45px]">
                                {plan.price}
                              </span>
                              {plan.period && (
                                <span className="[font-family:'Manrope',Helvetica] font-bold text-[#b8a494] text-sm">
                                  {plan.period}
                                </span>
                              )}
                            </div>
                            <p className="[font-family:'Manrope',Helvetica] text-[#b8a494] text-sm">
                              {plan.description}
                            </p>
                          </div>

                          <Button
                            variant={plan.highlighted ? "default" : "secondary"}
                            className={`w-full ${
                              plan.highlighted
                                ? "bg-[#ff6600] hover:bg-[#ff6600]/90"
                                : "bg-[#554233] hover:bg-[#554233]/90"
                            } [font-family:'Manrope',Helvetica] font-bold`}
                          >
                            {plan.buttonText}
                          </Button>

                          <Separator className="bg-[#554233]" />

                          <div className="space-y-3">
                            {plan.features.map((feature: { text: string; included?: boolean; subtext?: string } , idx: number) => (
                              <div key={idx} className="flex items-start gap-4">
                                {feature.included ? (
                                  <img
                                    src="/streamline-sharp-check-solid.svg"
                                    alt=""
                                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                                  />
                                ) : (
                                  <img
                                    src="/material-symbols-close.svg"
                                    alt=""
                                    className="w-[18px] h-[18px] flex-shrink-0"
                                  />
                                )}
                                <div className="flex-1">
                                  <span
                                    className={`[font-family:'Manrope',Helvetica] text-sm ${
                                      feature.included
                                        ? "font-medium text-slate-200"
                                        : "font-normal text-[#8b7964]"
                                    }`}
                                  >
                                    {feature.text}
                                  </span>
                                  {feature.subtext && (
                                    <p className="[font-family:'Manrope',Helvetica] font-medium text-[#b8a494] text-xs mt-1">
                                      {feature.subtext}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  )}
                </div>

                <div className="text-center space-y-6 pt-10">
                  <p className="[font-family:'Manrope',Helvetica] font-bold text-[#b8a494] text-sm">
                    Trusted by leading auditors
                  </p>
                  <div className="flex items-center justify-center gap-10">
                    {auditors.map((auditor) => (
                      <div
                        key={auditor.name}
                        className="flex items-center gap-2"
                      >
                        <img src={auditor.icon} alt="" className="w-6 h-6" />
                        <span className="[font-family:'Manrope',Helvetica] font-bold text-neutral-300 text-xl">
                          {auditor.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-6 pt-14">
                  <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl text-center">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <Card
                        key={faq.question}
                        className="bg-[#32241a] border-[#554233]"
                      >
                        <CardContent className="p-4 space-y-2">
                          <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
                            {faq.question}
                          </h3>
                          <p className="[font-family:'Manrope',Helvetica] text-[#b8a494] text-sm">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="bg-[#32241a] border-t border-[#3b2f1e] py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-center gap-20">
                  {footerLinksAlt.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="[font-family:'Manrope',Helvetica] text-[#b8a494] text-base hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="[font-family:'Inter',Helvetica] text-[#896d61] text-xs">
                    public
                  </span>
                  <img
                    src="/cuida-chatbubble-outline.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  <span className="[font-family:'Inter',Helvetica] text-[#896d61] text-sm">
                    mail
                  </span>
                </div>
                <p className="[font-family:'Manrope',Helvetica] text-[#8b7964] text-sm text-center">
                  © 2024 Multi-Chain Inheritance Protocol. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
