import { Badge } from "../../components/ui/badge";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Navbar } from "../../components/ui/Navbar";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

import logoImg from "@assets/cip-logo.svg";
import homeBgImg from "@assets/home-bg.svg";
import shieldCheckImg from "@assets/shield-check.svg";
import divIcon from "@assets/ethereum.svg";
import div1Icon from "@assets/polygon.svg";
import div2Icon from "@assets/bnb-logo.svg";
import solIcon from "@assets/solana.svg";
import timerIcon from "@assets/timer.svg";
import verifiedUserIcon from "@assets/verified-user.svg";
import accBalWalletIcon from "@assets/acc-bal-wallet.svg";
import barChartIcon from "@assets/bar-chart.svg";
import calculatorIcon from "@assets/calculator.svg";
import downloadIcon from "@assets/download.svg";
import starIcon from "@assets/star.svg";
import chartIcon from "@assets/chart.svg";
import happyFaceIcon from "@assets/happy-face.svg"
import keyIcon from "@assets/key.svg";
import checkPinkCircle from "@assets/check-purple-circle.svg";
import checkGreenCircle from "@assets/check-green-circle.svg";
import sharpCheckWhite from "@assets/sharp-check-white.svg";
import sharpCheckSolid from "@assets/sharp-check-solid.svg";
import arrowForward from "@assets/arrow-forward.svg";

import { motion } from "framer-motion";


const navigationItems = [
  { label: "How it Works", href: "#core-capabilities" },
  { label: "TaxCore", href: "#taxcore-intelligence" },
  { label: "Pricing", href: "#pricing" },
  { label: "Enterprise", href: "/login" },
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
    icon: accBalWalletIcon,
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
    icon: happyFaceIcon,
    title: "Children's Trust Accounts",
    description:
      "Create time-locked vaults for minor beneficiaries. Set automated drip-feeds for tuition or monthly allowances unlocked only after specific dates or milestones.",
    features: ["18th Birthday Release", "Tuition Direct-Pay"],
    bgColor: "bg-[#ec48991a]",
    featureIcon: checkPinkCircle
  },
  {
    icon: keyIcon,
    title: "MPC Security Architecture",
    description:
      "We use Multi-Party Computation to shard private keys. No single entity—including us—can access your funds. Recovery requires a threshold of shards.",
    features: ["Non-custodial by design", "SOC 2 Type II Audited"],
    bgColor: "bg-[#22c55e1a]",
    featureIcon: checkGreenCircle
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For single-chain assets.",
    features: [
      { text: "1 Wallet Connected", included: true },
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
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Automated, non-custodial inheritance for the multi-chain future. Ensure your assets reach your beneficiaries safely, securely, and tax-efficiently.";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let startTimeout: ReturnType<typeof setTimeout>;

    const typeText = (text: string, index: number = 0) => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        timeout = setTimeout(() => typeText(text, index + 1), 30);
      } else {
        setIsTypingComplete(true);
      }
    };

    startTimeout = setTimeout(() => typeText(fullText), 800);

    return () => {
      clearTimeout(startTimeout);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    // Dynamically inject Sora font only for this page
    const id = "sora-font-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
    return () => {
      // Optionally remove the font when unmounting
      // const el = document.getElementById(id);
      // if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <div className="bg-black">
        <Navbar
          logo={logoImg}
          navItems={navigationItems}
          logoHref="/"
          rightActions={
            <Button
              className="bg-gradient-to-r from-[#ff6600] to-[#993d00] hover:opacity-90 [font-family:'Sora',Helvetica] font-bold text-sm"
              onClick={() => navigate("/onboarding/step-one")}
            >
              Launch App
            </Button>
          }
        />

        <section className="relative bg-[#060605] py-20">
          <motion.img
            src={homeBgImg}
            alt="Home Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h2 
                  className="[font-family:'Sora',Helvetica] font-bold text-7xl leading-[72px]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <span className="text-white">Secure Your Digital Legacy</span>
                </motion.h2>
                <motion.div
                  className="[font-family:'Sora',Helvetica] font-light text-slate-300 text-xl max-w-2xl mx-auto inline-flex items-center justify-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p className="break-words">{displayText}</p>
                  <motion.span
                    className="ml-2 text-[#ff6600]"
                    animate={{ opacity: isTypingComplete ? 0 : [0, 1, 0] }}
                    transition={{ repeat: isTypingComplete ? 0 : Infinity, duration: 1 }}
                  >
                    |
                  </motion.span>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #ff6633cc" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    className="bg-gradient-to-r px-7 py-5 from-[#ff6600] to-[#993d00] hover:opacity-90 shadow-[0px_0px_20px_#ff6633cc] [font-family:'Sora',Helvetica] font-bold"
                    onClick={() => navigate("/onboarding/step-one")}
                  >
                    Start Plan
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(189, 75, 0, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    className="bg-[#111111] px-5 py-5 border-[#bd4b00] [font-family:'Sora',Helvetica] font-bold"
                  >
                    <motion.svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path
                        d="M16.0568 7.01474C16.417 7.2063 16.7183 7.49226 16.9284 7.84198C17.1385 8.1917 17.2495 8.592 17.2495 8.99999C17.2495 9.40798 17.1385 9.80828 16.9284 10.158C16.7183 10.5077 16.417 10.7937 16.0568 10.9852L6.44775 16.2105C4.9005 17.0527 3 15.9577 3 14.226V3.77474C3 2.04224 4.9005 0.947986 6.44775 1.78874L16.0568 7.01474Z"
                        fill="white"
                      />
                    </motion.svg>
                    View Demo
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#1c130d] py-8 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <motion.p 
                className="[font-family:'Sora',Helvetica] font-bold text-[#8b7664] text-xs"
                initial={{ y: 30, scale: 0.9 }}
                whileInView={{ y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                viewport={{}}
              >
                Securing Assets On Top Chains
              </motion.p>
              <div className="flex items-center justify-center gap-16">
                {blockchains.map((chain, index) => (
                  <motion.div
                    key={chain.name}
                    className="flex items-center gap-4 cursor-pointer group"
                    initial={{ 
                      y: 80,
                      rotateX: -15,
                      scale: 0.7
                    }}
                    whileInView={{ 
                      y: 0,
                      rotateX: 0,
                      scale: 1
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 150,
                      damping: 25
                    }}
                    viewport={{}}
                    whileHover={{ 
                      y: -12,
                      rotateY: index % 2 === 0 ? 5 : -5,
                      scale: 1.1,
                      transition: { 
                        duration: 0.3, 
                        type: "spring", 
                        stiffness: 300,
                        damping: 15
                      }
                    }}
                    whileTap={{ 
                      scale: 0.9,
                      rotateX: 10,
                      transition: { duration: 0.1 }
                    }}
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      className="relative p-3 rounded-xl bg-[#332619] border border-[#674932]"
                      whileHover={{
                        borderColor: "#ff6600",
                        boxShadow: "0 0 25px rgba(255, 102, 0, 0.3)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.img
                        src={chain.icon}
                        alt={chain.name}
                        className="w-8 h-8 relative z-10"
                        whileHover={{ 
                          rotate: [0, -15, 15, -10, 10, 0],
                          scale: 1.2,
                          transition: { 
                            duration: 0.6,
                            ease: "easeInOut"
                          }
                        }}
                      />
                      {/* Clean glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-[#ff6600] opacity-0"
                        whileHover={{
                          opacity: 0.1,
                          transition: { duration: 0.3 }
                        }}
                      />
                    </motion.div>
                    <motion.span 
                      className="[font-family:'Sora',Helvetica] font-bold text-[#b8a494] text-base"
                      whileHover={{ 
                        color: "#ff6600",
                        scale: 1.05,
                        textShadow: "0 0 10px rgba(255, 102, 0, 0.5)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {chain.name}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="core-capabilities" className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto space-y-12">
              <motion.div 
                className="space-y-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{}}
              >
                <motion.h2 
                  className="[font-family:'Sora',Helvetica] font-bold text-white text-4xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
                  viewport={{}}
                >
                  Core Capabilities
                </motion.h2>
                <motion.p 
                  className="[font-family:'Sora',Helvetica] text-[#b8a494] text-lg max-w-2xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{}}
                >
                  Built for security and autonomy across multiple blockchains,
                  ensuring your plan executes exactly as intended.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coreCapabilities.map((capability, index) => {
                  const [flipped, setFlipped] = useState(false);
                  return (
                    <motion.div
                      key={capability.title}
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                      viewport={{}}
                      className="group perspective-1000"
                      style={{ perspective: 1000 }}
                    >
                      <motion.div
                        className="relative w-full h-full min-h-[260px]"
                        style={{ transformStyle: "preserve-3d" }}
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
                        onMouseEnter={() => setFlipped(true)}
                        onMouseLeave={() => setFlipped(false)}
                        tabIndex={0}
                        onFocus={() => setFlipped(true)}
                        onBlur={() => setFlipped(false)}
                      >
                        {/* Front Side */}
                        <div
                          className="absolute inset-0 bg-[#332619] border-[#674932] border rounded-lg overflow-hidden flex flex-col items-center justify-center p-6 z-20"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <motion.div
                            className="w-12 h-12 bg-[#135bec1a] rounded-lg flex items-center justify-center mb-4"
                          >
                            <motion.img
                              src={capability.icon}
                              alt=""
                              className="w-6 h-6"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                            />
                          </motion.div>
                          <h3 className="[font-family:'Sora',Helvetica] font-bold text-white text-xl mb-2 text-center">
                            {capability.title}
                          </h3>
                          <p className="[font-family:'Sora',Helvetica] text-[#b8a494] text-sm leading-[22px] text-center">
                            {capability.description}
                          </p>
                        </div>
                        {/* Back Side */}
                        <div
                          className="absolute inset-0 bg-[#ff6600] border-[#674932] border rounded-lg overflow-hidden flex flex-col items-center justify-center p-6 z-10"
                          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                        >
                          <motion.div
                            className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4"
                          >
                            <motion.img
                              src={capability.icon}
                              alt=""
                              className="w-6 h-6"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                            />
                          </motion.div>
                          <h3 className="[font-family:'Sora',Helvetica] font-bold text-white text-xl mb-2 text-center">
                            {capability.title}
                          </h3>
                          <p className="[font-family:'Sora',Helvetica] text-white text-sm leading-[22px] text-center">
                            {capability.description}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="taxcore-intelligence" className="bg-[#20190f] border-t border-b border-[#483423] py-20 relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8a6f1e1a] rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 180, damping: 18 }}
                  viewport={{}}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    viewport={{}}
                  >
                    <Badge className="bg-[#f6a83b1a] border-[#f6b13b33] !pl-4 !pr-20 !pt-2 !pb-2 text-[#faaf60] [font-family:'Sora',Helvetica] font-bold rounded-3xl">
                      <img src={barChartIcon} alt="" className="w-4 h-4 mr-2" />
                      Infrastructure for Accountants
                    </Badge>
                  </motion.div>
                  <motion.h2
                    className="[font-family:'Sora',Helvetica] font-bold text-white text-5xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 200 }}
                    viewport={{}}
                    whileHover={{ textShadow: "0 0 24px #f6a83b, 0 0 8px #ff6600" }}
                  >
                    TaxCore Intelligence
                  </motion.h2>
                  <motion.p
                    className="[font-family:'Sora',Helvetica] text-[#b8a494] text-lg leading-[29px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{}}
                  >
                    TaxCore isn't just a calculator; it's a full compliance suite. It integrates real-time transaction analysis, automatic capital gains calculation, and multi-jurisdiction tax rules to prepare accountant-ready documentation.
                  </motion.p>
                </motion.div>

                <div className="border-l border-[#674932] pl-8 space-y-12">
                  {taxCoreSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ x: -200, rotate: -15, scale: 0.8, opacity: 0 }}
                      whileInView={{ x: 0, rotate: 0, scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.3, type: "spring", stiffness: 100, damping: 15 }}
                      viewport={{}}
                      className="space-y-2"
                    >
                      <motion.h3
                        className="[font-family:'Sora',Helvetica] font-bold text-white text-lg"
                        whileHover={{ scale: 1.1, textShadow: "0 0 20px #ff6600" }}
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p
                        className="[font-family:'Sora',Helvetica] text-[#b8a494] text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
                        viewport={{}}
                      >
                        {step.description}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Card className="bg-[#332619] border-[#674932]">
                <CardHeader className="border-b border-[#674932]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#f6b13b33] rounded flex items-center justify-center">
                        <img src={calculatorIcon} alt="" className="w-4 h-4" />
                      </div>
                      <span className="[font-family:'Sora',Helvetica] font-bold text-white">
                        TaxCore CalculatorIcon
                      </span>
                    </div>
                    <Badge className="bg-[#22c55e1a] border-[#22c55e33] text-green-400 p-2">
                      <img src={downloadIcon} alt="" className="w-4 h-4 mr-1" />
                      Export PDF
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="[font-family:'Sora',Helvetica] text-[#8b7664] text-xs">
                        Origin Jurisdiction
                      </label>
                      <div className="bg-[#221911] border border-[#674932] rounded px-3 py-2">
                        <span className="[font-family:'Sora',Helvetica] text-white text-sm">
                          United Kingdom
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="[font-family:'Sora',Helvetica] text-[#8b7664] text-xs">
                        Beneficiary Residency
                      </label>
                      <div className="bg-[#221911] border border-[#674932] rounded px-3 py-2">
                        <span className="[font-family:'Sora',Helvetica] text-white text-sm">
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
                          <img src={chartIcon} alt="" className="w-3 h-3" />
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
                      src={starIcon}
                      alt=""
                      className="w-6 h-6 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <p className="[font-family:'Sora',Helvetica] font-bold text-[#ff6600] text-xs">
                        TaxCore AI Insight
                      </p>
                      <p className="[font-family:'Sora',Helvetica] text-slate-300 text-xs leading-[19px]">
                        Based on the double taxation treaty between UK and
                        Germany, the beneficiary may claim credit for tax paid
                        in the UK.
                      </p>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 102, 0, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 [font-family:'Sora',Helvetica] font-bold transition-all duration-300">
                      Generate Preliminary Report
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {featureCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 100, scale: 0.5, rotateY: 90, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: index * 0.3, type: "spring", stiffness: 80, damping: 15 }}
                  viewport={{}}
                  whileHover={{ 
                    y: -20, 
                    scale: 1.05, 
                    rotateY: 5, 
                    rotateX: -5,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.4), 0 0 30px rgba(255, 102, 0, 0.3)" 
                  }}
                  style={{ perspective: 1000 }}
                >
                  <Card
                    className="bg-[#332619] border-[#674932] relative overflow-hidden"
                  >
                    <CardContent className="p-8 space-y-6 relative z-10">
                      <motion.div
                        className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.3 + 0.2, type: "spring", stiffness: 200 }}
                        viewport={{}}
                        whileHover={{ 
                          rotate: 360, 
                          scale: 1.2,
                          boxShadow: "0 0 20px rgba(255, 102, 0, 0.5)"
                        }}
                      >
                        <motion.img 
                          src={card.icon} 
                          alt="" 
                          className="w-6 h-6"
                          whileHover={{ rotate: -360, scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.div>
                      <motion.h3 
                        className="[font-family:'Poppins',Helvetica] font-bold text-white text-2xl"
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: index * 0.3 + 0.4, type: "spring", stiffness: 150 }}
                        viewport={{}}
                        whileHover={{ 
                          scale: 1.1, 
                          textShadow: "0 0 20px rgba(255, 102, 0, 0.8)",
                          color: "#ff6600"
                        }}
                      >
                        {card.title}
                      </motion.h3>
                      <motion.p 
                        className="[font-family:'Poppins',Helvetica] text-[#b8a494] text-base leading-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
                        viewport={{}}
                      >
                        {card.description}
                      </motion.p>
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.3 + 0.8 }}
                        viewport={{}}
                      >
                        {card.features.map((feature, featureIndex) => (
                          <motion.div 
                            key={feature} 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -30, scale: 0.9 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.3 + 0.8 + featureIndex * 0.1, type: "spring", stiffness: 200 }}
                            viewport={{}}
                            whileHover={{ scale: 1.05, x: 5 }}
                          >
                            <motion.img 
                              src={card.featureIcon} 
                              alt="" 
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.3 + 0.8 + featureIndex * 0.1 + 0.2 }}
                              viewport={{}}
                              whileHover={{ rotate: 360, scale: 1.2 }}
                            />
                            <motion.span 
                              className="[font-family:'Poppins',Helvetica] text-slate-300 text-sm"
                              whileHover={{ color: "#ff6600", scale: 1.05 }}
                            >
                              {feature}
                            </motion.span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                    <div
                      className={`absolute bottom-0 right-0 w-40 h-40 ${card.bgColor} rounded-full translate-x-1/3 translate-y-1/3`}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[#20180f] border-t border-[#483423] py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              <motion.div
                className="text-center space-y-5"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 150, damping: 20 }}
                viewport={{}}
              >
                <motion.h2
                  className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-4xl"
                  initial={{ scale: 0.8, rotate: -5 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
                  viewport={{}}
                  whileHover={{ textShadow: "0 0 20px #ff6600" }}
                >
                  Simple Pricing for Peace of Mind
                </motion.h2>
                <motion.p
                  className="[font-family:'Noto_Sans',Helvetica] text-[#b8a494] text-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{}}
                >
                  Choose the plan that fits your estate complexity.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 80, scale: 0.9, rotateY: 20 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 120, damping: 18 }}
                    viewport={{}}
                    whileHover={{ y: -15, scale: 1.03, boxShadow: "0 25px 50px rgba(255, 102, 0, 0.2)" }}
                  >
                    <Card
                      className={`${
                        plan.highlighted
                          ? "bg-[#332619] border-2 border-[#ff6600]"
                          : "bg-[#221911] border-[#674932]"
                      } relative`}
                    >
                    {plan.badge && (
                      <div className="absolute top-0 right-0 bg-[#ff6600] px-3 py-1">
                        <span className="[font-family:'Sora',Helvetica] font-bold text-white text-xs">
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                        <h3 className="[font-family:'Sora',Helvetica] font-bold text-white text-xl">
                          {plan.name}
                        </h3>
                        <p className="[font-family:'Sora',Helvetica] text-[#8b7664] text-sm">
                          {plan.description}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="[font-family:'Sora',Helvetica] font-bold text-white text-3xl">
                          {plan.price}
                        </span>
                        <span className="[font-family:'Sora',Helvetica] font-bold text-[#b8a494] text-sm">
                          {plan.period}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <img
                              src={
                                plan.highlighted
                                  ? sharpCheckSolid
                                  : sharpCheckWhite
                              }
                              alt=""
                              className="w-3.5 h-3.5"
                            />
                            <span
                              className={`[font-family:'Sora',Helvetica] text-sm ${plan.highlighted ? "text-white" : "text-slate-300"}`}
                            >
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 102, 0, 0.3)", transition: { type: "spring", stiffness: 300, damping: 20 } }}
                        whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                        animate={plan.highlighted ? { scale: [1, 1.2, 1], boxShadow: ["0 0 0 rgba(255, 102, 0, 0)", "0 0 30px rgba(255, 102, 0, 0.8)", "0 0 0 rgba(255, 102, 0, 0)"] } : {}}
                        transition={plan.highlighted ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
                      >
                        <Button
                          variant={plan.buttonVariant}
                          className={`w-full ${
                            plan.highlighted
                              ? "bg-[#ff6600] hover:bg-[#ff6600]/90"
                              : "border-[#674932] bg-transparent "
                          } [font-family:'Sora',Helvetica] font-bold transition-all duration-300`}
                          onClick={() => navigate("/pricing")}
                        >
                          {plan.buttonText}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto bg-gradient-to-r from-[#332319] to-[#99684b] [#332319] border-[#674932]">
              <CardContent className="p-12 flex items-center justify-between gap-12">
                <div className="flex-1 space-y-6">
                  <h2 className="[font-family:'Sora',Helvetica] font-bold text-white text-3xl">
                    For Family Offices & Custodians
                  </h2>
                  <p className="[font-family:'Sora',Helvetica] text-[#b8a494] text-lg leading-7">
                    Manage high-net-worth digital estates with enterprise-grade
                    multi-sig coordination, dedicated account managers, and
                    custom legal framework integration.
                  </p>
                  <div className="flex items-center gap-2">
                    <motion.span
                      className="[font-family:'Sora',Helvetica] font-bold text-[#ff6600] text-base cursor-pointer"
                      initial={{ opacity: 0.85, scale: 1 }}
                      whileHover={{ scale: 1.08, color: "#ffc77a", textShadow: "0 0 16px rgba(255, 102, 0, 0.6)" }}
                      whileTap={{ scale: 0.98 }}
                      animate={{ opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Contact Sales
                    </motion.span>
                    <motion.img
                      src={arrowForward}
                      alt=""
                      className="w-5 h-5"
                      initial={{ x: 0, rotate: 0 }}
                      whileHover={{ x: 6, rotate: 15 }}
                      animate={{ x: [0, 6, 0], rotate: [0, 15, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
                <motion.div
                  className="relative cursor-pointer"
                  style={{ perspective: 1000 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="relative w-[252px] h-[277px]"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Front Side */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <motion.img
                        src={shieldCheckImg}
                        alt="Shield"
                        className="w-[252px] h-[277px] object-contain"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    {/* Back Side */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <motion.img
                        src={shieldCheckImg}
                        alt="Shield"
                        className="w-[252px] h-[277px] object-contain"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
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
                        src={logoImg}
                        alt="Logo"
                        className="w-5 h-6 object-cover"
                      />
                    </div>
                    <span className="[font-family:'Sora',Helvetica] font-bold text-white text-lg">
                      CIP
                    </span>
                  </div>
                  <p className="[font-family:'Sora',Helvetica] text-[#8b7664] text-sm leading-[22px]">
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
                        className="block [font-family:'Sora',Helvetica] text-[#b8a494] text-sm hover:text-white transition-colors"
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
                        className="block [font-family:'Sora',Helvetica] text-[#b8a494] text-sm hover:text-white transition-colors"
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
                        className="block [font-family:'Sora',Helvetica] text-[#b8a494] text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="bg-[#483423]" />

              <div className="flex items-center justify-between">
                <p className="[font-family:'Sora',Helvetica] text-[#695d47] text-sm">
                  © 2024 CIP Protocol. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <span className="[font-family:'Sora',Helvetica] text-[#8b7664] text-xs">
                    public
                  </span>
                  <span className="[font-family:'Sora',Helvetica] text-[#8b7664] text-sm">
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
