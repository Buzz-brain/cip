import { useLocation, useNavigate } from "react-router-dom";
import { CircleAlert as AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import {
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import calendarClockOrangeIcon from "@assets/calendar-clock-orange.svg";
import usersIcon from "@assets/users.svg";
import inventoryIcon from "@assets/inventory.svg";
import gavelGreenIcon from "@assets/gavel-green.svg";
import checkGreenCircle from "@assets/check-green-circle.svg";
import rocketIcon from "@assets/rocket.svg";


export const ReviewTimeLock = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unlockDate = "", unlockTime = "00:00" } = location.state || {};

  const formatDisplayDate = () => {
    if (!unlockDate) return "Not set";
    const [day, month, year] = unlockDate.split("/");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[parseInt(month) - 1]} ${day}, ${year} at ${unlockTime} UTC`;
  };

  const handleEditPlan = () => {
    navigate("/set-time-lock", {
      state: {
        unlockDate,
        unlockTime,
      },
    });
  };

  const handleConfirmDeploy = () => {
    navigate("/plan-activated", {
      state: {
        referenceId: "#CIP-8354-JD",
        triggerMechanism: "Time-Lock Trigger",
        assetsIncluded: "4 Tokens",
        mainBeneficiary: "0x71c...9a21",
        securityLevel: "Time-based unlock",
      },
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810]">
      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
          <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
            Inheritance&nbsp;&nbsp;Protocol
          </span>
        </div>

        <nav className="flex items-center gap-8">
          <a
            href="#"
            className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
          >
            Create Plan
          </a>
          <a
            href="#"
            className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
          >
            My Plans
          </a>
          <a
            href="#"
            className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
          >
            Settings
          </a>
        </nav>

        <div className="w-10 h-10 bg-[#ff6600] rounded-full"></div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-[1040px]">
          <div className="mb-8">
            <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[31.7px] tracking-[0] leading-[38px] mb-2">
              Review Time-Lock Plan
            </h1>
            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-base tracking-[0] leading-[26px]">
              Verify the parameters of your automated inheritance plan. This
              setup ensures your assets are distributed exactly when intended.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
                Step 3 of 4: Review Details
              </span>
              <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
                75% Completed
              </span>
            </div>
            <div className="w-full h-2 bg-[#27211c] rounded-full overflow-hidden">
              <div className="h-full w-[40%] bg-[#ff6600]"></div>
            </div>
          </div>

          <Card className="bg-[#8A4F1E1A] border border-[#FF660033] mb-10">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#FF66001A] rounded-full flex items-center justify-center">
                    <img src={calendarClockOrangeIcon} alt="" />
                  </div>

                  <div>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#FF6600] text-xs tracking-[0] leading-4">
                      Automatic Trigger
                    </p>

                    <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg tracking-[0] leading-5 mt-1">
                      This plan will execute automatically on <br />
                      <span className="text-[#ff6600]">
                        {formatDisplayDate()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-[#27221C] rounded-lg p-6 border border-[#544B3B]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#064E3B33] rounded-lg flex items-center justify-center">
                  <img src={gavelGreenIcon} className="w-5 h-5" alt="" />
                </div>

                <h3 className="text-white font-semibold text-lg">
                  Trustless Execution
                </h3>
              </div>

              <div className="rounded-lg mt-6 border border-gray-800 flex items-start gap-3">
                <img src={checkGreenCircle} className="w-4 h-4" alt="Icon" />
                <div>
                  <div className="text-white font-semibold mb-2">
                    No executor or approval required.
                  </div>
                  <p className="text-gray-400 text-sm">
                    The smart contract operates independently. No intermediary,
                    lawyer, or family member needs to sign a transaction for
                    release.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#27221C] rounded-lg p-6 border border-[#544B3B]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#5541334D] rounded-lg flex items-center justify-center">
                  <img src={inventoryIcon} className="w-5 h-5" alt="" />
                </div>

                <h3 className="text-white font-semibold text-lg">
                  Plan Contents
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#221810] rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-[#887663]" />

                    <span className="text-gray-300 text-sm">Assets Locked</span>
                  </div>
                  <span className="text-white font-semibold">4 Tokens</span>
                </div>
                <div className="flex items-center justify-between bg-[#221810] rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <img src={usersIcon} className="w-5 h-5" alt="" />
                    <span className="text-gray-300 text-sm">Beneficiaries</span>
                  </div>
                  <span className="text-white font-semibold">2 Wallets</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-6xl mx-auto w-full [font-family:'Manrope',Helvetica]">
            <div className="space-y-8 mt-12">
              <div className="bg-[#7C2D121A] rounded-lg p-6 border border-[#7C2D1233] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold mb-2">
                    You retain full control
                  </div>
                  <p className="text-gray-400 text-sm">
                    Even though this plan is automatic, you can cancel, pause,
                    or modify the date and beneficiaries at any time before
                    execution using your connected wallet.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 mt-12">
              <button
                onClick={handleEditPlan}
                className="px-8 py-3 text-white border border-[#544B3B] rounded-lg hover:bg-gray-900 transition-colors font-semibold"
              >
                Edit Plan
              </button>
              <button
                onClick={handleConfirmDeploy}
                className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center gap-2"
              >
                <span>Confirm & Deploy</span>
                <img src={rocketIcon} className="w-5 h-5" alt="Rocket" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
