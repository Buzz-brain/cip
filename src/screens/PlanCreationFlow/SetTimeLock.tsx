import { ArrowRight as ArrowRightIcon, Info as InfoIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export const SetTimeLock = (): JSX.Element => {
  const navigate = useNavigate();
  const [unlockDate, setUnlockDate] = useState("");
  const [unlockTime, setUnlockTime] = useState("00:00");

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0806]">
      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-[#ff6600] rounded-lg">
            <img
              className="w-[25px] h-[31px] object-cover"
              alt="Logo"
              src="/logo-3.png"
            />
          </div>
          <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-[17.8px] tracking-[0] leading-[22px]">
            Inheritance Protocol
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
              Set Time-Lock Date
            </h1>
            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-base tracking-[0] leading-[26px]">
              Configure the specific date and time when your assets will
              automatically unlock for your beneficiaries.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-sm tracking-[0] leading-5">
                Step 2 of 5: Trigger Setup
              </span>
              <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
                40% Completed
              </span>
            </div>
            <div className="w-full h-2 bg-[#27211c] rounded-full overflow-hidden">
              <div className="h-full w-[40%] bg-[#ff6600]"></div>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex-1">
              <Card className="bg-[#1a1410] border-[#392f28] rounded-2xl">
                <CardContent className="p-8">
                  <div className="bg-[#27211c] border border-[#392f28] rounded-xl p-4 mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ff6600] rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-xs tracking-[0] leading-4">
                            Plan Type
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm tracking-[0] leading-5 mt-1">
                            Time-Lock Trigger
                          </p>
                        </div>
                      </div>
                      <button className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-xs tracking-[0] leading-4 hover:text-[#ff6600]/80 transition-colors">
                        Change Type
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <Label className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-sm tracking-[0] leading-5">
                        Unlock Date
                      </Label>
                      <Input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={unlockDate}
                        onChange={(e) => setUnlockDate(e.target.value)}
                        className="h-12 px-4 [font-family:'Manrope',Helvetica] font-normal text-white text-base bg-[#0f0c09] border border-[#392f28] rounded-xl placeholder:text-[#63564b] focus-visible:ring-[#ff6600]"
                      />
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#63564b] text-xs tracking-[0] leading-4">
                        Format: DD/MM/YYYY
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-sm tracking-[0] leading-5">
                        Unlock Time (Optional)
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          type="text"
                          placeholder="00:00"
                          value={unlockTime}
                          onChange={(e) => setUnlockTime(e.target.value)}
                          className="flex-1 h-12 px-4 [font-family:'Manrope',Helvetica] font-normal text-white text-base bg-[#0f0c09] border border-[#392f28] rounded-xl placeholder:text-[#63564b] focus-visible:ring-[#ff6600]"
                        />
                        <div className="h-12 px-4 bg-[#0f0c09] border border-[#392f28] rounded-xl flex items-center">
                          <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-sm tracking-[0] leading-5">
                            UTC
                          </span>
                        </div>
                      </div>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#63564b] text-xs tracking-[0] leading-4">
                        Defaults to 00:00 UTC
                      </p>
                    </div>

                    <div className="bg-[#0f0c09] border border-[#392f28] rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <InfoIcon className="w-5 h-5 text-[#ff6600] mt-0.5" />
                        <div>
                          <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm tracking-[0] leading-5 mb-1">
                            Important Configuration Note
                          </p>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-sm tracking-[0] leading-[22px]">
                            This date is encoded into the smart contract. While
                            you can extend the lock period later, you cannot
                            shorten it once the contract is deployed for security
                            reasons.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-[320px]">
              <Card className="bg-[#1a1410] border-[#392f28] rounded-2xl h-fit">
                <CardContent className="p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base tracking-[0] leading-[26px] mb-4">
                    Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#ff6600] rounded-lg flex items-center justify-center mt-1">
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-xs tracking-[0] leading-4">
                          Trigger
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm tracking-[0] leading-5 mt-1">
                          Time-based unlock
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#ff6600] rounded-lg flex items-center justify-center mt-1">
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-xs tracking-[0] leading-4">
                          Timezone
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm tracking-[0] leading-5 mt-1">
                          Universal Coordinated Time (UTC)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#392f28] rounded-lg flex items-center justify-center mt-1">
                        <svg
                          className="w-3.5 h-3.5 text-[#afa49c]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-xs tracking-[0] leading-4">
                          Security
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm tracking-[0] leading-5 mt-1">
                          Immutable on-chain execution
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mt-8">
            <Button
              variant="outline"
            onClick={() => navigate("/choose-plan-type")}
              className="h-11 px-6 [font-family:'Manrope',Helvetica] font-bold text-[#afa49c] text-sm bg-[#27211c] border border-[#392f28] hover:bg-[#392f28] hover:text-white rounded-xl"
            >
              Back
            </Button>
            <Button className="h-11 px-6 [font-family:'Manrope',Helvetica] font-bold text-white text-sm bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-xl flex items-center gap-2"
            onClick={() => navigate("/review-time-lock")}
            >
              Continue
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
