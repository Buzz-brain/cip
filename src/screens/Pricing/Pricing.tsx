import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlans } from "../../lib/hooks/usePlans";
import { Navbar } from "@components/ui/Navbar";
import { useAuth } from "../../context/useAuth";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../lib/utils";
import { ToggleBilling } from "@components/ui/ToggleBilling";
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

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

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
  const { user } = useAuth();
  const { plans: backendPlans, loading: plansLoading, error: plansError } = usePlans();
  const [subscribing, setSubscribing] = useState<Record<string, boolean>>({});

  const XCIP_HEADER_VALUE = import.meta.env.VITE_XCIP_HEADER;

  const toTitleCase = (input?: string) => {
    if (!input) return "";
    return input
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

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

  const sourcePlans = (backendPlans && backendPlans.length > 0) ? backendPlans : null;

  const planSource = sourcePlans ? sourcePlans : pricingPlansAlt;

  const planCards = (plansLoading ? [] : planSource).map((plan: any, idx: number) => {
    const displayBadge = plan.badge ?? (idx === 2 ? "Recommended" : undefined);
    const priceValue = typeof plan.price === "number" ? plan.price : (typeof plan.price === "string" ? parseFloat(plan.price.replace(/[^0-9.]/g, "")) : NaN);
    const monthlyNum = !isNaN(priceValue) ? priceValue : NaN;
    let displayPrice = plan.price;
    let displayPeriod = plan.period;
    if (!isNaN(monthlyNum)) {
      if (isYearly) {
        const yearly = monthlyNum * 12 * 0.8; // save 20%
        displayPrice = `$${yearly % 1 === 0 ? yearly.toFixed(0) : yearly.toFixed(2)}`;
        displayPeriod = "/yr";
      } else {
        displayPrice = typeof plan.price === "number" ? `$${plan.price}` : plan.price;
        displayPeriod = plan.period;
      }
    }

    return (
      <Card
        key={plan.name ?? plan.id}
        className={`${
          plan.highlighted
            ? "bg-[#32241a] border-2 border-[#ff6600] relative"
            : "bg-[#32241a] border-[#554233] relative"
        }`}
      >
        {displayBadge && (
          <div className="absolute top-0 right-0 w-[90%] bg-[#ff6600] rounded-l-full rounded-tr-full px-4 py-1 flex justify-start">
            <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-xs">
              {displayBadge}
            </span>
          </div>
        )}
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg">
              {toTitleCase(plan.name)}
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
              {plan.description || (plan.name ? `${toTitleCase(plan.name)} Plan` : "")}
            </p>
          </div>

          <Button
            variant={"default"}
            className={`w-full ${
              plan.highlighted
                ? "bg-[#ff6600] hover:bg-[#ff6600]/90"
                : "bg-[#554233] hover:bg-[#554233]/90"
            } [font-family:'Manrope',Helvetica] font-bold`}
            onClick={async () => {
              // Only subscribe for backend plans that include an id
              if (!plan.id) {
                // fallback: go to onboarding/connect flow
                navigate("/onboarding/step-one");
                return;
              }
              const key = String(plan.id);
              if (subscribing[key]) return;
              setSubscribing((s) => ({ ...s, [key]: true }));
              try {
                const body = { pricing_id: plan.id, months: 1 };
                const res = await fetch(`${BACKEND_API_URL}/auth/subscribe`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "xcip-header": XCIP_HEADER_VALUE,
                    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
                  },
                  body: JSON.stringify(body),
                });
                const text = await res.text();
                let data: any = null;
                try {
                  data = text ? JSON.parse(text) : null;
                } catch (e) {
                  data = { raw: text };
                }

                if (res.ok) {
                  toast.success("Subscription successful.");
                  // Navigate to success page with backend response data
                  navigate("/plan-activated", {
                    state: {
                      // map common possible fields from backend to what the success page expects
                      plan_id_to_fund: data?.plan_id_to_fund ?? data?.plan_id ?? data?.id ?? plan.id,
                      trx_hex: data?.trx_hex ?? data?.transaction_hex ?? data?.tx_hex ?? data?.tx ?? undefined,
                      backendMessage: data?.message ?? data?.detail ?? undefined,
                      protectedDataAddress: data?.protected_data_address ?? data?.protectedDataAddress ?? undefined,
                      triggerMechanism: data?.triggerMechanism ?? data?.trigger_mechanism ?? undefined,
                      assetsIncluded: data?.assets ?? data?.assetsIncluded ?? undefined,
                      mainBeneficiary: data?.mainBeneficiary ?? data?.main_beneficiary ?? undefined,
                      securityLevel: data?.securityLevel ?? undefined,
                      creationTimestamp: data?.creationTimestamp ?? data?.created_at ?? undefined,
                    },
                  });
                } else {
                  const errorMsg = await extractErrorMessage(res);
                  toast.error(`Subscription failed: ${errorMsg}`);
                }
              } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                toast.error(`Subscription error: ${msg}`);
              } finally {
                setSubscribing((s) => ({ ...s, [key]: false }));
              }
            }}
            disabled={!!(plan.id && subscribing[String(plan.id)])}
          >
            {subscribing[String(plan.id)] ? "Processing..." : (plan.buttonText || "Choose")}
          </Button>

          <Separator className="bg-[#554233]" />

          <div className="space-y-3">
            {Array.isArray(plan.features)
              ? plan.features.map((feature: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    {feature.included ? (
                      <img src={plan.checkIcon || sharpCheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    ) : (
                      <img src={plan.uncheckIcon || sharpUncheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <span className={`[font-family:'Manrope',Helvetica] text-sm ${feature.included ? "font-medium text-slate-200" : "font-normal text-[#8b7964]"}`}>
                        {feature.text}
                      </span>
                      {feature.subtext && (
                        <p className="[font-family:'Manrope',Helvetica] font-medium text-[#b8a494] text-xs mt-1">{feature.subtext}</p>
                      )}
                    </div>
                  </div>
                ))
              : (
                // Build features from backend plan shape — show all relevant fields except id
                <>
                  <div className="flex items-start gap-4">
                    <img src={sharpCheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="[font-family:'Manrope',Helvetica] text-sm font-medium text-slate-200">{`Included Plans: ${plan.plans ?? '—'}`}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src={sharpCheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="[font-family:'Manrope',Helvetica] text-sm font-medium text-slate-200">{`Triggers: ${plan.triggers ?? '—'}`}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src={sharpCheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="[font-family:'Manrope',Helvetica] text-sm font-medium text-slate-200">{`Supported Chains: ${plan.supported_chain ?? '—'}`}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src={plan.storage ? sharpCheckSolid : sharpUncheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className={`[font-family:'Manrope',Helvetica] text-sm ${plan.storage ? 'font-medium text-slate-200' : 'font-normal text-[#8b7964]'}`}>{plan.storage ? 'Storage Included' : 'No Storage'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src={plan.taxcore ? sharpCheckSolid : sharpUncheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className={`[font-family:'Manrope',Helvetica] text-sm ${plan.taxcore ? 'font-medium text-slate-200' : 'font-normal text-[#8b7964]'}`}>{plan.taxcore ? 'TaxCore Enabled' : 'No TaxCore'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src={plan.secret_ai ? sharpCheckSolid : sharpUncheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className={`[font-family:'Manrope',Helvetica] text-sm ${plan.secret_ai ? 'font-medium text-slate-200' : 'font-normal text-[#8b7964]'}`}>{plan.secret_ai ? 'Secret AI features' : 'No Secret AI'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src={sharpCheckSolid} alt="" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="[font-family:'Manrope',Helvetica] text-sm font-medium text-slate-200">{`Plan edits allowed: ${plan.plan_edit ?? '—'}`}</span>
                    </div>
                  </div>
                </>
              )}
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
                {plansLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <Card key={`skeleton-${i}`} className="bg-[#32241a] border-[#554233] animate-pulse">
                      <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                          <div className="h-6 bg-[#2f241c] rounded w-2/3" />
                          <div className="h-10 bg-[#2f241c] rounded w-1/3 mt-2" />
                          <div className="h-4 bg-[#2f241c] rounded w-full mt-2" />
                        </div>

                        <div className="h-10 bg-[#2f241c] rounded w-full" />

                        <Separator className="bg-[#554233]" />

                        <div className="space-y-3">
                          <div className="h-4 bg-[#2f241c] rounded w-full" />
                          <div className="h-4 bg-[#2f241c] rounded w-5/6" />
                          <div className="h-4 bg-[#2f241c] rounded w-4/6" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  planCards
                )}
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
