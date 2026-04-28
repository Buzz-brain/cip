import { Card, CardContent } from "@components/ui/card";
import { Alert, AlertDescription } from "@components/ui/alert";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Badge } from "@components/ui/badge";
import shieldUser from "@assets/shield-user.svg";
import { Button } from "@components/ui/button";
import shieldLockIcon from "@assets/shield-lock.svg";
import {
  PlusCircleIcon,
} from "lucide-react";


export const MPCSelected = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810]">
      <main className="flex-1 flex flex-col items-center px-4 py-12">

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={shieldUser} className="w-5 h-5" />
                    <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg tracking-[0] leading-[22px]">
                      Set Recovery Guardians
                    </h2>
                  </div>
                  <Badge className="bg-[#ff66001a] border-[#ff660033] text-[#ff6600] hover:bg-[#ff66001a] [font-family:'Manrope',Helvetica] font-bold text-xs rounded-full px-3 py-1">
                    <img
                      className="w-3 mr-1"
                      alt="Material symbols"
                      src={shieldLockIcon}
                    />
                    MPC Secured
                  </Badge>
                </div>

                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-[13.9px] tracking-[0] leading-[21px]">
                  Select trusted guardians who can help you recover access if
                  you lose your MPC shares.
                </p>

                <Card className="bg-[#181411] border-[#54463b]">
                  <CardContent className="p-[21px] flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <Label
                          htmlFor="guardianName"
                          className="[font-family:'Manrope',Helvetica] font-medium text-white text-[13.9px] tracking-[0] leading-[21px]"
                        >
                          Guardian Name
                        </Label>
                        <Input
                          id="guardianName"
                          defaultValue="e.g. Trusted Family Member"
                          className="bg-[#27211c] border-[#54463b] text-white [font-family:'Manrope',Helvetica] font-normal text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <Label
                          htmlFor="guardianEmail"
                          className="[font-family:'Manrope',Helvetica] font-medium text-white text-[13.6px] tracking-[0] leading-[21px]"
                        >
                          Email or Wallet Address
                        </Label>
                        <div className="relative">
                          <Input
                            id="guardianEmail"
                            defaultValue="0x... or email@example.com"
                            className="bg-[#27211c] border-[#54463b] text-white [font-family:'Manrope',Helvetica] font-normal text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-fit bg-[#27211c] border-[#54463b] text-[#ff6600] hover:bg-[#27211c] hover:text-[#ff6600] [font-family:'Manrope',Helvetica] font-bold text-sm"
                    >
                      <PlusCircleIcon className="w-4 h-4 mr-2" />
                      Add Guardian
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="thresholdSelector"
                      className="[font-family:'Manrope',Helvetica] font-medium text-white text-[13.5px] tracking-[0] leading-[21px]"
                    >
                      Required threshold selector
                    </Label>
                    <div className="flex items-center gap-10 bg-[#181411] border border-[#54463b] rounded-lg px-[13px] py-[21px]">
                      <span className="[font-family:'Manrope',Helvetica] font-medium text-white text-[13.8px] tracking-[0] leading-5">
                        Recovery requires
                      </span>
                      <span className="[font-family:'Manrope',Helvetica] font-medium text-white text-[13.8px] tracking-[0] leading-5">
                        of guardians
                      </span>
                    </div>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-[11.9px] tracking-[0] leading-4">
                      Minimum number of approvals needed to restore access.
                    </p>
                  </div>

                  <Alert className="bg-[#8a591e1a] border-[#af5a1e4d]">
                    <AlertDescription className="flex flex-col gap-[6.5px]">
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm tracking-[0] leading-[17px]">
                        Security note
                      </span>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-xs tracking-[0] leading-[19px]">
                        &quot;Guardians cannot access your assets.&quot;
                        <br />
                        They only hold shards to help reconstruct your key in an
                        emergency.
                      </p>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

      </main>
    </div>
  );
};
