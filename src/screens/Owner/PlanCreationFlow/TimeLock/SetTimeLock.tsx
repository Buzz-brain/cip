import { ArrowRight as ArrowRightIcon, Info as InfoIcon } from "lucide-react";
import { useState } from "react";
import { usePlan } from "../../../../context/usePlan";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
// Header removed — layout provides header and sidebar
import calendarClockOrangeIcon from "@assets/calendar-clock-orange.svg";
import lockTimeIcon from "@assets/lock-time.svg";
import worldUniverseIcon from "@assets/world-universe.svg";
import shieldLockIcon from "@assets/shield-lock.svg";

export const SetTimeLock = (): JSX.Element => {
  const navigate = useNavigate();
  const { setPlanField } = usePlan();
  const [unlockDate, setUnlockDate] = useState("");
  const [unlockTime, setUnlockTime] = useState("00:00");

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-4">
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
                <div className="bg-[#8A4F1E33] border border-[#AF731E4D] rounded-xl p-4 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#27221C] rounded-full flex items-center justify-center">
                        <img src={calendarClockOrangeIcon} alt="" />
                      </div>
                      <div>
                        <p className="[font-family:'Manrope',Helvetica] font-semibold text-[#FF6600] text-xs tracking-[0] leading-4">
                          Plan Type
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm tracking-[0] leading-5 mt-1">
                          Time-Lock Trigger
                        </p>
                      </div>
                    </div>
                    <button className="[font-family:'Manrope',Helvetica] font-semibold text-[#B9AB9D] text-xs tracking-[0] leading-4 hover:text-[#ff6600]/80 transition-colors">
                      Change Type
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-6">
                    <div className="flex flex-col w-full gap-2">
                      <Label className="[font-family:'Manrope',Helvetica] font-semibold text-white text-sm tracking-[0] leading-5">
                        Unlock Date
                      </Label>
                      <Input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={unlockDate}
                        onChange={(e) => setUnlockDate(e.target.value)}
                        className="h-12 px-4 [font-family:'Manrope',Helvetica] font-normal text-white text-base bg-[#0f0c09] border border-[#392f28] rounded-xl placeholder:text-white focus-visible:ring-[#ff6600]"
                      />
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#B9AB9D] text-xs tracking-[0] leading-4">
                        Format: DD/MM/YYYY
                      </p>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                      <Label className="[font-family:'Manrope',Helvetica] font-semibold text-white text-sm tracking-[0] leading-5">
                        Unlock Time (Optional)
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          type="text"
                          placeholder="00:00"
                          value={unlockTime}
                          onChange={(e) => setUnlockTime(e.target.value)}
                          className="flex-1 h-12 px-4 [font-family:'Manrope',Helvetica] font-normal text-white text-base bg-[#0f0c09] border border-[#392f28] rounded-xl placeholder:text-white focus-visible:ring-[#ff6600]"
                        />
                        <div className="h-12 px-4 bg-[#0f0c09] border border-[#392f28] rounded-xl flex items-center">
                          <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#afa49c] text-sm tracking-[0] leading-5">
                            UTC
                          </span>
                        </div>
                      </div>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#B9AB9D] text-xs tracking-[0] leading-4">
                        Defaults to 00:00 UTC
                      </p>
                    </div>
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
                          shorten it once the contract is deployed for
                          security reasons.
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
                    <img
                      src={lockTimeIcon}
                      className="w-5 h-5"
                      alt="Lock Time"
                    />
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
                    <img
                      src={worldUniverseIcon}
                      className="w-5 h-5"
                      alt="World Universe"
                    />
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
                    <img
                      src={shieldLockIcon}
                      className="w-5 h-5"
                      alt="Lock Time"
                    />
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
          <Button
            className="h-11 px-6 [font-family:'Manrope',Helvetica] font-bold text-white text-sm bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-xl flex items-center gap-2"
            onClick={() => {
              // parse DD/MM/YYYY and optional time HH:MM into UTC timestamp (seconds)
              if (!unlockDate) {
                // still navigate but warn
                console.warn('[SetTimeLock] No unlock date set');
                navigate('/review-time-lock');
                return;
              }
              const parts = unlockDate.split('/');
              if (parts.length !== 3) {
                console.warn('[SetTimeLock] unlockDate in unexpected format', unlockDate);
                navigate('/review-time-lock');
                return;
              }
              const [day, month, year] = parts.map((p) => parseInt(p, 10));
              const [hourStr, minuteStr] = (unlockTime || '00:00').split(':');
              const hour = parseInt(hourStr || '0', 10);
              const minute = parseInt(minuteStr || '0', 10);
              // create UTC date
              const dateUtc = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
              const epochSeconds = Math.floor(dateUtc.getTime() / 1000);
              // save to plan context
              setPlanField('releaseTimestamp', epochSeconds);
              // log the chosen timestamp and display values (consistent with other step logs)
              console.log('[SetTimeLock] releaseTimestamp saved', {
                release_timestamp: epochSeconds,
                unlockDate,
                unlockTime,
                iso: dateUtc.toISOString(),
              });
              // also save display values in case other components rely on location.state
              navigate('/review-time-lock', { state: { unlockDate, unlockTime } });
            }}
          >
            Continue
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </main>
  );
};
