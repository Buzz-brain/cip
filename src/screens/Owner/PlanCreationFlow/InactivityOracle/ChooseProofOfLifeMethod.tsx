import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { usePlan } from "../../../../context/usePlan";
import leafLetterIcon from "@assets/leaf-letter.svg";
import handTouchIcon from "@assets/hand-touch.svg";


type ProofOfLifeMethod = "wallet" | "app";

export const ChooseProofOfLifeMethod = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { inactivityPeriod = "", daysValue = "" } = location.state || {};
  const { plan, setPlanField } = usePlan();
  const [selectedMethod, setSelectedMethod] = useState<ProofOfLifeMethod | null>(null);
  const [backendTypes, setBackendTypes] = useState<string[] | null>(null);
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const selectMethod = (method: ProofOfLifeMethod) => {
    setSelectedMethod(method);
    console.log('[ChooseProofOfLifeMethod] selectedMethod:', method);
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
    if (selectedMethod) {
      // Map frontend method ids to canonical backend ids before persisting
      const backendIdsForMethod: Record<ProofOfLifeMethod, string[]> = {
        wallet: ["wallet_signature"],
        app: ["app_login"],
      };

      const mapToBackend = (m: ProofOfLifeMethod) => {
        const ids = backendIdsForMethod[m];
        return ids && ids.length > 0 ? ids[0] : m;
      };
      const backendSelected = mapToBackend(selectedMethod);

      // persist selection and log (use backend canonical id in plan)
      setPlanField('proofOfLifeMethod', backendSelected);
      console.log('[ChooseProofOfLifeMethod] continuing with:', { inactivityPeriod: inactivityPeriod || plan?.inactivityPeriodDays, daysValue: daysValue || String(plan?.inactivityPeriodDays || ''), selectedMethod, backendSelected });

      navigate("/set-inactivity-grace-period", {
        state: {
          inactivityPeriod,
          daysValue,
          // pass backend canonical id so downstream steps get normalized value
          selectedMethod: backendSelected,
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
    // Only wallet signature and app login options are supported by backend.
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

  // Map frontend method ids to possible backend ids (used for display filtering)
  const backendIdsForMethod: Record<ProofOfLifeMethod, string[]> = {
    wallet: ["wallet_signature", "wallet"],
    app: ["app_login", "app"],
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
              Select one method to verify your activity and reset the
              Inactivity Oracle. Choose the option that works best for your needs.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
                Step 5 of 5: Trigger Configuration
              </span>
              <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
                100% Completed
              </span>
            </div>
            <div className="w-full h-2 bg-[#27211c] rounded-full overflow-hidden">
              <div className="h-full w-[100%] bg-[#ff6600]"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            {displayedMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => selectMethod(method.id as ProofOfLifeMethod)}
                className={`relative p-6 rounded-lg bg-[#27231C] border-2 transition-all text-left ${selectedMethod === method.id
                  ? "border-orange-600 bg-[#27221C]"
                  : "border-[#54493B] bg-[#27221C] hover:border-gray-600"
                }`}
              >
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                  {selectedMethod === method.id && (
                    <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                  )}
                </div>

                <div
                  className={`w-12 h-12 ${method.bgColor} rounded-lg flex items-center mb-4 justify-center`}
                >
                  <img src={method.icon} className="w-6 h-6" alt="Icon" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </button>
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
                disabled={selectedMethod === null}
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
