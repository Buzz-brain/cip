import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Link } from "react-router-dom";

const pricingPlansAlt = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Perfect for getting started with crypto inheritance.",
    features: [
      { text: "1 inheritance plan", included: true },
      { text: "Basic editing (3x/year)", included: true },
      { text: "MPC wallet enabled", included: true },
      { text: "Basic tax estimate", included: true },
      { text: "No AI detection", included: false },
      { text: "No priority support", included: false },
    ],
    buttonText: "Get Started",
    highlighted: false,
  },
  {
    name: "Basic",
    price: "$15",
    period: "/mo",
    description: "Essential protection for your main portfolio.",
    features: [
      { text: "3 inheritance plans", included: true },
      { text: "Full MPC wallet", included: true },
      {
        text: "Limited triggers",
        included: true,
        subtext: "(Time-lock + Inactivity)",
      },
      { text: "Basic TaxCore", included: true },
      { text: "No PDF exports", included: false },
    ],
    buttonText: "Choose Basic",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$49",
    period: "/mo",
    description: "Complete peace of mind for you and your family.",
    badge: "Recommended",
    features: [
      { text: "Unlimited plans", included: true },
      { text: "All triggers including Health Oracle", included: true },
      { text: "Full TaxCore + PDF exports", included: true },
      { text: "AI fraud detection", included: true },
      { text: "Children's trust accounts", included: true },
      { text: "Priority support", included: true },
    ],
    buttonText: "Go Premium",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for high-net-worth needs.",
    features: [
      { text: "API access", included: true },
      { text: "White-label solution", included: true },
      { text: "Dedicated support", included: true },
      { text: "Custom contracts", included: true },
      { text: "Compliance reporting", included: true },
    ],
    buttonText: "Contact Sales",
    highlighted: false,
  },
];

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

const footerLinksAlt = [
  "Privacy Policy",
  "Terms of Service",
  "Security Audit",
  "Contact Support",
];

export const Pricing = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-black">
      <header className="bg-[#0d0501] shadow-[0px_3px_4px_#78370c29]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
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
            </Link>

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
                <Link
                  to="/pricing"
                  className="[font-family:'Manrope',Helvetica] font-bold text-gray-200 text-sm hover:text-white transition-colors"
                >
                  Pricing
                </Link>
                <a
                  href="#"
                  className="[font-family:'Manrope',Helvetica] font-medium text-gray-200 text-sm hover:text-white transition-colors"
                >
                  Resources
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button
                    variant="secondary"
                    className="bg-[#554233] hover:bg-[#554233]/90 [font-family:'Manrope',Helvetica] font-bold text-sm"
                  >
                    Log In
                  </Button>
                </Link>
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
              {pricingPlansAlt.map((plan) => (
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
                      {plan.features.map((feature, idx) => (
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
              ))}
            </div>

            <div className="text-center space-y-6 pt-10">
              <p className="[font-family:'Manrope',Helvetica] font-bold text-[#b8a494] text-sm">
                Trusted by leading auditors
              </p>
              <div className="flex items-center justify-center gap-10">
                {auditors.map((auditor) => (
                  <div key={auditor.name} className="flex items-center gap-2">
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
  );
};
