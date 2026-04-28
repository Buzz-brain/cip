import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { usePlan } from "../../../../context/usePlan";
import leafLetterIcon from "@assets/leaf-letter.svg";
import handTouchIcon from "@assets/hand-touch.svg";
import messageCheckIcon from "@assets/message-check.svg";
import fingerprintIcon from "@assets/fingerprint.svg";


type ProofOfLifeMethod = "wallet" | "app" | "email" | "biometric";

export const ChooseProofOfLifeMethod = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { inactivityPeriod = "", daysValue = "" } = location.state || {};
  const { plan, setPlanField } = usePlan();
  const [selectedMethods, setSelectedMethods] = useState<ProofOfLifeMethod[]>([]);
  const [backendTypes, setBackendTypes] = useState<string[] | null>(null);
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "https://xcip.name.ng";

  const toggleMethod = (method: ProofOfLifeMethod) => {
    setSelectedMethods((prev) => {
      const next = prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method];
      console.log('[ChooseProofOfLifeMethod] selectedMethods:', next);
      return next;
    });
  };

  const handleBack = () => {
    navigate("/set-inactivity-period", {
      state: {
        inactivityPeriod,
        daysValue,
      },
    });
  };

  const handleContinue = () => {
    if (selectedMethods.length > 0) {
      // persist selection and log
      setPlanField('proofOfLifeMethod', selectedMethods.join(','));
      console.log('[ChooseProofOfLifeMethod] continuing with:', { inactivityPeriod: inactivityPeriod || plan?.inactivityPeriodDays, daysValue: daysValue || String(plan?.inactivityPeriodDays || ''), selectedMethods });
      navigate("/set-inactivity-grace-period", {
        state: {
          inactivityPeriod,
          daysValue,
          selectedMethods,
        },
      });
    }
  };

  const methods = [
    {
      id: "wallet",
      title: "Wallet Signature",
      description:
        "Sign a message or transaction with your connected Web3 wallet. This is the most direct way to prove control of your private keys and reset the timer.",
      icon: leafLetterIcon,
      selected: true,
      bgColor: "bg-[#8A541EAD]",
    },
    {
      id: "app",
      title: "App Login + Confirmation",
      description:
        "Simply log in to the Inheritance Protocol dashboard and click a 'Confirm I'm Alive' button. Convenient for frequent users.",
      icon: handTouchIcon,
      bgColor: "bg-[#581C8733]",
    },
    {
      id: "email",
      title: "Email/SMS Confirmation",
      description:
        "Receive automated periodic check-ins via Email or SMS. Clicking the secure link in the message verifies your proof-of-life.",
      icon: messageCheckIcon,
      bgColor: "bg-[#7C2D1233]",
    },
    {
      id: "biometric",
      title: "Biometric Confirmation",
      description:
        "Advanced verification using device sensors (FaceID, TouchID) for cryptographically secure proof of physical presence.",
      icon: fingerprintIcon,
      comingSoon: true,
      bgColor: "bg-[#514837]",
    },
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${BACKEND_API_URL}/inherit/proof-of-life-types`, {
          method: "GET",
          headers: { accept: "application/json" },
        });
        if (!res.ok) {
          console.warn("Failed to fetch proof-of-life types", res.status);
          setBackendTypes(null);
          return;
        }
        const json = await res.json();
        if (mounted && Array.isArray(json)) setBackendTypes(json.map(String));
      } catch (err) {
        console.warn("Error fetching proof-of-life types", err);
        setBackendTypes(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Map frontend method ids to possible backend ids
  const backendIdsForMethod: Record<ProofOfLifeMethod, string[]> = {
    wallet: ["wallet_signature", "wallet"],
    app: ["app_login", "app"],
    email: ["email", "email_sms"],
    biometric: ["biometric", "faceid", "touchid"],
  };

  const displayedMethods =
    backendTypes && Array.isArray(backendTypes)
      ? methods.filter((m) =>
          backendTypes.some((bt) => backendIdsForMethod[m.id as ProofOfLifeMethod].includes(bt)),
        )
      : methods;

  return (
      <main className="flex-1 flex flex-col items-center px-4 py-4">
        <div className="w-full max-w-[1040px]">
          <div className="mb-8">
            <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[31.7px] tracking-[0] leading-[38px] mb-2">
              Choose Proof-of-Life Method
            </h1>
            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-base tracking-[0] leading-[26px]">
              Select one or more methods to verify your activity and reset the
              Inactivity Oracle. We recommend enabling multiple methods for
              redundancy and ease of use.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
                Step 2 of 4: Trigger Configuration
              </span>
              <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
                40% Completed
              </span>
            </div>
            <div className="w-full h-2 bg-[#27211c] rounded-full overflow-hidden">
              <div className="h-full w-[40%] bg-[#ff6600]"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            {displayedMethods.map((method) => (
              <div
                key={method.id}
                onClick={() =>
                  !method.comingSoon &&
                  toggleMethod(method.id as ProofOfLifeMethod)
                }
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedMethods.includes(method.id as ProofOfLifeMethod)
                    ? "border-orange-600 bg-[#27221C]"
                    : "border-gray-700 bg-[#27221C] hover:border-gray-600"
                } ${method.comingSoon ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-start justify-between mb-4">
                    <div
                  className={`w-14 h-16 ${method.bgColor} rounded-lg flex items-center mb-2 justify-center`}
                >
                    <img src={method.icon} className="w-6 h-6" alt="Icon" />
                  </div>
                  <div className="flex items-center">
                    {method.comingSoon ? (
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        Coming Soon
                      </span>
                    ) : (
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          selectedMethods.includes(
                            method.id as ProofOfLifeMethod,
                          )
                            ? "border-orange-600 bg-orange-600"
                            : "border-gray-600"
                        }`}
                      >
                        {selectedMethods.includes(
                          method.id as ProofOfLifeMethod,
                        ) && <span className="text-white text-sm">✓</span>}
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </div>
            ))}
          </div>

          <footer className="flex mt-12 items-center justify-end pt-8 pb-12 px-0 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-[#54483b]">
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
                disabled={selectedMethods.length === 0}
              >
                Continue
                <span>→</span>
              </Button>
            </div>
          </footer>
        </div>
      </main>
  );
};
