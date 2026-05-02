import { Info as InfoIcon, Lock as LockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import initiatedIcon from "@assets/initiated.svg";
import guardiansIcon from "@assets/guardians.svg";
import delayIcon from "@assets/delay.svg";
import regenerateIcon from "@assets/regenerate.svg";
import shieldUserFullIcon from "@assets/shield-user-full.svg";
import ledgerNanoIcon from "@assets/ledger-nano.svg";
import girlGhostIcon from "@assets/girl-ghost.svg";
import gavelIcon from "@assets/gavel.svg";
import logoImg from "@assets/cip-logo.png";
import { Link } from "react-router-dom";


interface Guardian {
  name: string;
  email: string;
  status: "signed" | "pending";
  icon: string;
  iconBg: string;
}

const guardians: Guardian[] = [
  {
    name: "Ledger Nano X (Self)",
    email: "Hardware Wallet",
    status: "signed",
    icon: "grid",
    iconBg: "bg-[#FF66001A]",
  },
  {
    name: "Sarah Jenkins (Spouse)",
    email: "sarah.j@example.com",
    status: "pending",
    icon: "user",
    iconBg: "bg-[#581C874D]",
  },
  {
    name: "Legal Counsel",
    email: "lawfirm@partners.com",
    status: "pending",
    icon: "briefcase",
    iconBg: "bg-[#8A401E4D]",
  },
];

export const RecoveryProgress = (): JSX.Element => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 47,
    minutes: 58,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0806]">
      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
        </div>

        <nav className="flex items-center gap-8">
          <a
            href="#"
            className="[font-family:'Manrope',Helvetica] font-medium text-white text-sm tracking-[0] leading-5 whitespace-nowrap"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
          >
            Plans
          </a>
          <a
            href="#"
            className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
          >
            Vault
          </a>
          <a
            href="#"
            className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
          >
            Settings
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-[#1a1410] border border-[#392f28] rounded-lg">
            <span className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm">
              0x4a...3b21
            </span>
          </div>
          <div className="w-10 h-10 bg-[#ff6600] rounded-full"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-[1040px]">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[31.7px] tracking-[0] leading-[38px]">
              Recovery in Progress
            </h1>
            <span className="px-3 py-0.1 \bg-[#ff660033] border border-[#ff660066] rounded-md">
              <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-xs">
                Action Required
              </span>
            </span>
          </div>

          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-base tracking-[0] leading-[26px] mb-8 max-w-[720px]">
            The recovery sequence for Main Family Vault has been initiated.
            Requests have been broadcast to your guardians. The Multi-Party
            Computation (MPC) protocol is currently gathering shares to
            regenerate your key.
          </p>

          <Card className="bg-[#1a1410] border-[#392f28] rounded-2xl">
            <CardContent className="p-8">
              <div className="flex gap-12">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <svg className="w-[240px] h-[240px] -rotate-90">
                      <circle
                        cx="120"
                        cy="120"
                        r="110"
                        fill="none"
                        stroke="#392f28"
                        strokeWidth="8"
                      />
                      <circle
                        cx="120"
                        cy="120"
                        r="110"
                        fill="none"
                        stroke="#ff6600"
                        strokeWidth="8"
                        strokeDasharray={`${(1 / 3) * 691.15} 691.15`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="[font-family:'Manrope',Helvetica] font-bold text-white text-[42px] tracking-[0] leading-[50px]">
                        {formatTime(timeRemaining.hours)}:
                        {formatTime(timeRemaining.minutes)}:
                        {formatTime(timeRemaining.seconds)}
                      </div>
                      <div className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 mt-1">
                        Remaining
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-sm tracking-[0] leading-5">
                      Estimated Completion
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-6">
                  <div>
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg tracking-[0] leading-[26px] mb-2">
                      Status: Awaiting Guardian Approval
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-sm tracking-[0] leading-[22px] mb-4">
                      We need 2 out of 3 guardians to sign the recovery
                      transaction to proceed to the time-lock phase.
                    </p>

                    <div className="relative h-2 bg-[#392f28] rounded-full mb-2">
                      <div className="absolute h-full w-1/3 bg-[#ff6600] rounded-full"></div>
                    </div>

                    <div className="flex justify-between">
                      <span className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-xs tracking-[0] leading-4">
                        1 signature received
                      </span>
                      <span className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-xs tracking-[0] leading-4">
                        Threshold: 2/3
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-8 py-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#22C55E] rounded-full">
                        <img src={initiatedIcon} className="w-6" />
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-[#22C55E] text-xs tracking-[0] leading-4">
                        Initiated
                      </span>
                    </div>

                    <div className="h-px w-12 bg-[#392f28]"></div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#FF6600] rounded-full">

                        <img src={guardiansIcon} className="w-6" />
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-[#ff6600] text-xs tracking-[0] leading-4">
                        Guardians
                      </span>
                    </div>

                    <div className="h-px w-12 bg-[#392f28]"></div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#544B3B] rounded-full">
                        <img src={delayIcon} className="w-5" />
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-medium text-[#63564b] text-xs tracking-[0] leading-4">
                        48h Delay
                      </span>
                    </div>

                    <div className="h-px w-12 bg-[#392f28]"></div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#544B3B] rounded-full">
                        <img src={regenerateIcon} className="w-6" />
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-medium text-[#63564b] text-xs tracking-[0] leading-4">
                        Regeneration
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#392f28]">
                <div className="flex items-center gap-2 mb-4">
                  <img src={shieldUserFullIcon} className="w-5 h-5" />
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base tracking-[0] leading-[26px]">
                    Guardian Responses
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {guardians.map((guardian, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#0f0c09] border border-[#392f28] rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${guardian.iconBg} rounded-full flex items-center justify-center`}
                        >
                          {guardian.icon === "grid" && (
                            <img src={ledgerNanoIcon} alt="Ledger Nano" />
                          )}
                          {guardian.icon === "user" && (
                            <img src={girlGhostIcon} alt="Girl Ghost" />
                          )}
                          {guardian.icon === "briefcase" && (
                            <img src={gavelIcon} alt="Gavel" />
                          )}
                        </div>
                        <div>
                          <div className="[font-family:'Manrope',Helvetica] font-semibold text-white text-sm tracking-[0] leading-5">
                            {guardian.name}
                          </div>
                          <div className="[font-family:'Manrope',Helvetica] font-normal text-[#afa49c] text-xs tracking-[0] leading-4">
                            {guardian.email}
                          </div>
                        </div>
                      </div>
                      <div>
                        {guardian.status === "signed" ? (
                          <span className="[font-family:'Manrope',Helvetica] bg-[#14532D33] px-5 py-2 rounded-full font-semibold text-[#22c55e] text-sm tracking-[0] leading-5">
                            Signed
                          </span>
                        ) : (
                          <span className="[font-family:'Manrope',Helvetica] bg-[#78350F33] px-5 py-2 rounded-full font-semibold text-[#ff9800] text-sm tracking-[0] leading-5">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-2 mt-4 p-3 bg-[#0f0c09] border border-[#392f28] rounded-lg">
                  <InfoIcon className="w-4 h-4 text-[#afa49c]" />
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#afa49c] text-xs tracking-[0] leading-4">
                    If guardians do not respond within 7 days, the backup delay
                    protocol will activate.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-6">
                <Button
                  onClick={() => navigate("/guardian-approval")}
                  variant="outline"
                  className="h-11 px-6 [font-family:'Manrope',Helvetica] font-bold text-[#ef4444] text-sm bg-transparent border-[#ef444433] hover:bg-[#ef444433] hover:text-[#ef4444] rounded-xl"
                >
                  Cancel Recovery
                </Button>
                <Button className="h-11 px-6 [font-family:'Manrope',Helvetica] font-bold text-white text-sm bg-[#27211c] border border-[#392f28] hover:bg-[#392f28] rounded-xl">
                  Refresh Status
                </Button>
              </div>
            </CardContent>

            <div className="flex items-center justify-center gap-2 h-[45px] bg-[#0f0c09] border-t border-[#392f28] rounded-b-2xl">
              <LockIcon className="w-4 h-4 text-[#afa49c]" />
              <span className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-[11.9px] tracking-[0] leading-4">
                This process is secured by on-chain verification and
                Zero-Knowledge Proofs.
              </span>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
