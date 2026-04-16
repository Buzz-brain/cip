import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/ui/Navbar";
import { ToggleBilling } from "../../components/ui/ToggleBilling";
import logoImg from "@assets/cip-logo.png";
import sharpCheckSolid from "@assets/sharp-check-solid.svg";
import sharpUncheckSolid from "@assets/sharp-uncheck-solid.svg";
import verifiedUser from "@assets/verified-user-white.svg";
import shield from "@assets/shield.svg";
import lock from "@assets/lock.svg";
import securityLock from "@assets/security-lock.svg";
import chatbubble from "@assets/chatbubble.svg";

type Feature = { text: string; included: boolean; subtext?: string };

const pricingPlansAlt = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Perfect for getting started with crypto inheritance.",
    features: [
      { text: "1 inheritance plan", included: true, subtext: undefined },
      { text: "Basic editing (3x/year)", included: true, subtext: undefined },
      { text: "MPC wallet enabled", included: true, subtext: undefined },
      { text: "Basic tax estimate", included: true, subtext: undefined },
      { text: "No AI detection", included: false, subtext: undefined },
      { text: "No priority support", included: false, subtext: undefined },
    ] as Feature[],
    buttonText: "Get Started",
    highlighted: false,
    checkIcon: sharpCheckSolid,
    uncheckIcon: sharpUncheckSolid,
  },
  {
    name: "Basic",
    price: "$15",
    period: "/mo",
    description: "Essential protection for your main portfolio.",
    features: [
      { text: "3 inheritance plans", included: true, subtext: undefined },
      { text: "Full MPC wallet", included: true, subtext: undefined },
      {
        text: "Limited triggers",
        included: true,
        subtext: "(Time-lock + Inactivity)",
      },
      { text: "Basic TaxCore", included: true, subtext: undefined },
      { text: "No PDF exports", included: false, subtext: undefined },
    ] as Feature[],
    buttonText: "Choose Basic",
    highlighted: false,
    checkIcon: sharpCheckSolid,
    uncheckIcon: sharpUncheckSolid,
  },
  {
    name: "Premium",
    price: "$49",
    period: "/mo",
    description: "Complete peace of mind for you and your family.",
    badge: "Recommended",
    features: [
      { text: "Unlimited plans", included: true, subtext: undefined },
      { text: "All triggers including Health Oracle", included: true, subtext: undefined },
      { text: "Full TaxCore + PDF exports", included: true, subtext: undefined },
      { text: "AI fraud detection", included: true, subtext: undefined },
      { text: "Children's trust accounts", included: true, subtext: undefined },
      { text: "Priority support", included: true, subtext: undefined },
    ] as Feature[],
    buttonText: "Go Premium",
    highlighted: true,
    checkIcon: sharpCheckSolid,
    uncheckIcon: sharpUncheckSolid,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for high-net-worth needs.",
    features: [
      { text: "API access", included: true, subtext: undefined },
      { text: "White-label solution", included: true, subtext: undefined },
      { text: "Dedicated support", included: true, subtext: undefined },
      { text: "Custom contracts", included: true, subtext: undefined },
      { text: "Compliance reporting", included: true, subtext: undefined },
    ] as Feature[],
    buttonText: "Contact Sales",
    highlighted: false,
    checkIcon: sharpCheckSolid,
    uncheckIcon: sharpUncheckSolid,
  },
];

const auditors = [
  { name: "CertiK", icon: verifiedUser },
  { name: "Hacken", icon: shield },
  { name: "OpenZeppelin", icon: lock },
  { name: "Trail of Bits", icon: securityLock },
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

const footerLinksAlt = [
  "Privacy Policy",
  "Terms of Service",
  "Security Audit",
  "Contact Support",
];

export const Pricing = (): JSX.Element => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navItems = [
    { label: "Features", href: "#" },
    { label: "Security", href: "#" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "#" },
  ];

  const rightActions = (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button
          variant="default"
          className="bg-[#554233] hover:bg-[#554233]/90 [font-family:'Manrope',Helvetica] font-bold text-sm"
        >
          Log In
        </Button>
      </Link>
      <Button 
        className="bg-[#ff6600] hover:bg-[#ff6600]/90 [font-family:'Manrope',Helvetica] font-bold text-sm"
        onClick={() => navigate("/onboarding/step-one")}
      >
        Get Started
      </Button>
    </div>
  );

  const auditorElements = auditors.map((auditor) => (
    <div key={auditor.name} className="flex items-center gap-2">
      <img src={auditor.icon} alt="" className="w-6 h-6" />
      <span className="[font-family:'Manrope',Helvetica] font-bold text-neutral-300 text-xl">
        {auditor.name}
      </span>
    </div>
  ));

  const planCards = pricingPlansAlt.map((plan) => {
    const raw = typeof plan.price === "string" ? plan.price.replace(/[^0-9.]/g, "") : "";
    const monthlyNum = raw ? parseFloat(raw) : NaN;
    let displayPrice = plan.price;
    let displayPeriod = plan.period;
    if (!isNaN(monthlyNum)) {
      if (isYearly) {
        const yearly = monthlyNum * 12 * 0.8; // save 20%
        displayPrice = `$${yearly % 1 === 0 ? yearly.toFixed(0) : yearly.toFixed(2)}`;
        displayPeriod = "/yr";
      } else {
        displayPrice = plan.price;
        displayPeriod = plan.period;
      }
    }

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
          <div className="absolute top-0 right-0 w-[90%] bg-[#ff6600] rounded-l-full rounded-tr-full px-4 py-1 flex justify-start">
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
                {displayPrice}
              </span>
              {displayPeriod && (
                <span className="[font-family:'Manrope',Helvetica] font-bold text-[#b8a494] text-sm">
                  {displayPeriod}
                </span>
              )}
            </div>
            <p className="[font-family:'Manrope',Helvetica] text-[#b8a494] text-sm">
              {plan.description}
            </p>
          </div>

          <Button
            variant={"default"}
            className={`w-full ${
              plan.highlighted
                ? "bg-[#ff6600] hover:bg-[#ff6600]/90"
                : "bg-[#554233] hover:bg-[#554233]/90"
            } [font-family:'Manrope',Helvetica] font-bold`}
            onClick={() => navigate("/connect-wallet")}
          >
            {plan.buttonText}
          </Button>

          <Separator className="bg-[#554233]" />

          <div className="space-y-3">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                {feature.included ? (
                  <img
                    src={plan.checkIcon}
                    alt=""
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  />
                ) : (
                  <img
                    src={plan.uncheckIcon}
                    alt=""
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
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
    );
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        logo={logoImg}
        brand="CIP"
        navItems={navItems}
        rightActions={rightActions}
      />

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
                  {/* Billing period toggle */}
                  <ToggleBilling value={isYearly} onChange={setIsYearly} />
            </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {planCards}
              </div>

            <div className="text-center space-y-6 pt-10">
              <p className="[font-family:'Manrope',Helvetica] font-bold text-[#b8a494] text-sm">
                Trusted by leading auditors
              </p>
              <div className="flex items-center justify-center gap-10">
                {auditorElements}
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
                src={chatbubble}
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
  );
};
