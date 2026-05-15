import React from 'react';
import plusIcon from '@assets/plus-icon.svg';
import playIcon from '@assets/play-icon.svg';
import militaryGradeShield from '@assets/military-grade-shield.svg';
import cloudCancel from '@assets/cloud-cancel.svg';
import arrowForwardWhite from '@assets/arrow-forward-white.svg';
import circlePentagon from '@assets/circle-pentagon.svg';
import checkGreenCircle from '@assets/check-green-circle.svg';
import keybg from '@assets/keybg.png';
import shieldIconOrange from '@assets/shield-orange.svg';
import bgUrl from '@assets/bgurl.png';
import cotiIcon from '@assets/coti.svg';
import haxagonIcon from '@assets/hexagon-icon.svg';
import wormholeIcon from '@assets/wormhole.svg';
import iExecTeeIcon from '@assets/iexectee.svg';
import mpcIcon from '@assets/mpc.svg';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';

const technologyPartners = [
  { icon: cotiIcon, name: 'COTI', iconStyles: 'w-[54.17%] h-[62.50%] top-[18.75%] left-[25.00%]' },
  { icon: haxagonIcon, name: 'BNB Chain', iconStyles: 'w-[86.67%] h-[62.50%] top-[18.75%] left-[6.67%]' },
  { icon: wormholeIcon, name: 'Wormhole', iconStyles: 'w-full h-[38.19%] top-[30.90%] left-0' },
  { icon: iExecTeeIcon, name: 'iExec TEE', iconStyles: 'w-[75.00%] h-[62.50%] top-[18.75%] left-[12.50%]' },
  { icon: mpcIcon, name: 'MPC', iconStyles: 'w-[79.17%] h-[76.39%] top-[11.81%] left-[16.67%]' },
];

export type OnboardingStep = 'one' | 'two';

export interface OnboardingContentProps {
  step?: OnboardingStep;
  openConnect?: () => void;
  onNextStep?: () => void;
  onFinish?: () => void;
  onPrev?: () => void;
}

export const OnboardingContent: React.FC<OnboardingContentProps> = ({
  step = 'one',
  onNextStep,
  onFinish,
  onPrev,
}) => {
  // Step Two Content (use original StepTwo design adapted for modal)
  if (step === 'two') {
    return (
      <main className="w-full min-h-full bg-transparent flex flex-col">
        <section className="flex-1 flex items-center justify-center px-8 py-8">
          <div className="w-full max-w-6xl">
            <div className="mb-6">
              <div className="text-[#ff6600] font-semibold text-sm mb-2">
                Step 2 of 2
              </div>
              <h2 className="text-white font-bold text-2xl mb-4">
                MPC Sharing Technology
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative w-full h-2 rounded-full bg-[#3a3530] flex-1">
                  <div
                    className="absolute left-0 top-0 h-2 rounded-full bg-[#ff6600]"
                    style={{ width: "50%" }}
                  />
                </div>
                <span className="text-gray-400 font-medium ml-2">50%</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="hidden md:flex items-center justify-between order-2 md:order-1">
                <div className="relative w-full max-w-md h-[420px] rounded-3xl bg-[#1a1410] border border-[#3a3530] p-2 flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600]/10 to-transparent" />
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${keybg})` }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 z-10 w-full px-4 pb-4">
                    <div className="bg-[#2d2420] border border-[#3a3530] rounded-2xl p-4 flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 p-2 rounded-lg bg-[#ff6600] flex items-center justify-center">
                          <img src={circlePentagon} alt="Icon" />
                        </div>
                        <div>
                          <p className="text-[#b8a494]">Status</p>
                          <p className="font-bold text-white">
                            Shards Distributed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src={checkGreenCircle}
                          className="h-4"
                          alt="Icon"
                        />
                        <p className="font-semibold text-green-500">Secure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 order-1 md:order-2">
                <div>
                  <h3 className="text-white font-bold text-3xl mb-1">
                    The Power of MPC
                  </h3>
                </div>

                <p className="text-gray-300 text-base leading-relaxed">
                  Your private key is never stored in one place. Instead, it is
                  split into multiple shards using{" "}
                  <span className="text-[#ff6600] font-semibold">
                    Multi-Party Computation (MPC)
                  </span>
                  .
                </p>

                <p className="text-[#b8a494] text-base leading-relaxed">
                  These shards are distributed across independent nodes,
                  ensuring that no single point of failure exists. Even if one
                  node is compromised, your assets remain secure.
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-5">
                    <img src={militaryGradeShield} alt="Icon" />
                    <p className="text-gray-300 text-sm">
                      Military-grade encryption
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={cloudCancel} alt="" />
                    <p className="text-gray-300 text-sm">
                      No complete key ever exists online
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="h-12 gap-2 rounded-lg border-[#554733] bg-transparent px-8 hover:bg-[#554733]/10"
                    onClick={onPrev}
                  >
                    <span className="text-base font-bold leading-6 text-white">
                      Back
                    </span>
                  </Button>
                  <Button
                    onClick={onFinish}
                    className="h-12 px-8 bg-[#ff6600] hover:bg-[#ff7700] font-bold text-white text-base rounded-lg flex items-center gap-2"
                  >
                    Finish
                    <img src={arrowForwardWhite} alt="" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col min-h-screen bg-[linear-gradient(0deg,rgba(34,24,16,1)_0%,rgba(34,24,16,1)_100%)]">
        <main className="relative flex-1">
          <div className="absolute inset-0 [background:radial-gradient(50%_50%_at_50%_0%,rgba(250,130,55,0.15)_0%,rgba(255,102,0,0)_60%)]" />

          <section className="relative py-12 sm:py-10">
            <div className="container max-w-screen-xl px-4 sm:px-8">
              <div className="mb-6">
                <div className="text-[#ff6600] font-semibold text-sm mb-2">Step 1 of 2</div>
                <h2 className="text-white font-bold text-2xl mb-4">Welcome</h2>
                <div className="flex items-center gap-4">
                  <div className="relative w-full h-2 rounded-full bg-[#3a3530] flex-1">
                    <div className="absolute left-0 top-0 h-2 rounded-full bg-[#ff6600]" style={{ width: '0%' }} />
                  </div>
                  <span className="text-gray-400 font-medium ml-2">0%</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center min-w-0">
                <div className="order-1 md:order-1 w-full md:max-w-2xl flex-1 flex flex-col items-start min-w-0">
                  <div className="relative w-full h-auto sm:h-[325px]">
                    <Badge
                      variant="outline"
                      className="gap-2 rounded-full border-[#372d1f] bg-[#2e241c] px-3 py-1"
                    >
                      <div className="relative flex h-2 w-2 items-start">
                        <div className="absolute inset-0 rounded-full bg-green-400 opacity-75" />
                        <div className="relative h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-medium leading-4 tracking-[0.60px] text-slate-400 ">
                        PROTOCOL LIVE V1.2
                      </span>
                    </Badge>

                    <div>
                      <h1 className="font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white mt-3 mb-2 leading-tight break-words whitespace-normal">
                        Secure Your Legacy
                        <span className="block bg-gradient-to-r from-[#FF6600] to-[#FAB060] text-transparent bg-clip-text">
                          Across Chains.
                        </span>
                      </h1>
                      <p className="text-sm sm:text-base font-normal text-slate-400 leading-6 mb-3 sm:leading-6">
                        Ensure your digital assets are safely transferred to
                        your loved ones using advanced decentralized
                        cryptography and automated inheritance planning.
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 min-w-0">
                    <Button
                      onClick={() => onNextStep?.()}
                      className="w-full sm:w-auto h-12 gap-2 overflow-hidden rounded-lg bg-[#ff6600] px-3 sm:px-5 shadow-[0px_4px_6px_-4px_#3b82f633,0px_10px_15px_-3px_#3b82f633] hover:bg-[#ff6600]/90 flex-shrink-0"
                    >
                      <div className="relative h-6 w-5">
                        <img
                          className="absolute left-[8.33%] top-[15.28%] h-[69.44%] w-[83.33%]"
                          alt="Launch"
                          src={plusIcon}
                        />
                      </div>
                      <span className="text-base font-bold leading-6 text-white">
                        Next Step
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full sm:w-auto h-12 gap-2 rounded-lg border-[#554733] bg-transparent px-3 sm:px-5 hover:bg-[#554733]/10 flex-shrink-0"
                    >
                      <div className="relative h-6 w-5">
                        <img
                          className="absolute left-[8.33%] top-[15.28%] h-[69.44%] w-[83.33%]"
                          alt="Demo"
                          src={playIcon}
                        />
                      </div>
                      <span className="text-base font-bold leading-6 text-white">
                        Try Demo Mode
                      </span>
                    </Button>
                  </div>

                  <div className="flex w-full flex-col items-start px-0 pb-0 pt-4 min-w-0">
                    <div className="flex w-full flex-col items-start gap-4 border-t border-[#3b2e1e] px-0 pb-0 pt-6">
                      <div className="flex w-full flex-col items-start">
                        <p className="text-xs font-semibold leading-4 tracking-[0.60px] text-[#8b7c64]">
                          POWERED BY LEADING TECHNOLOGY
                        </p>
                      </div>

                      <div className="relative grid auto-rows-min w-full grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-y-4 bg-[#191919] p-4 sm:p-5 opacity-80 items-center min-w-0">
                        {technologyPartners.map((partner) => (
                          <div
                            key={partner.name}
                            className="inline-flex items-center gap-2 min-w-0"
                          >
                            <div className="relative h-6 w-5 py-0.5">
                              <img
                                className={`absolute ${partner.iconStyles}`}
                                alt={partner.name}
                                src={partner.icon}
                              />
                            </div>
                            <span className="text-sm font-bold leading-5 text-white truncate">
                              {partner.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-full order-2 md:order-2 md:h-[450px] flex-1 mt-8 md:mt-0">
                  <Card className="h-full overflow-hidden rounded-2xl border-[#3b2e1e] bg-[#2e241c] shadow-[0px_25px_50px_-12px_#00000040]">
                    <div className="flex h-10 items-center gap-2 border-b border-[#3b2e1e] bg-[#231c15] px-4">
                      <div className="h-3 w-3 rounded-full border border-[#ef444480] bg-[#ef444433]" />
                      <div className="h-3 w-3 rounded-full border border-[#eab30880] bg-[#eab30833]" />
                      <div className="h-3 w-3 rounded-full border border-[#22c55e80] bg-[#22c55e33]" />
                    </div>

                    <CardContent
                      className="relative h-auto md:h-[calc(100%-40px)] p-4 md:p-0"
                      style={{ background: `url(${bgUrl}) 50% 50% / cover` }}
                    >
                      <div className="absolute inset-0 bg-[#2a1b0fcc] backdrop-blur-[1px]" />

                      <div className="absolute inset-0 flex flex-col md:block items-center md:items-start justify-center">
                        <Card className="relative w-full sm:w-[230px] md:absolute md:left-[calc(50%-153px)] md:top-[calc(50%-35px)] w-[219px] gap-3 overflow-hidden border-[#554733] bg-[#221510e6] p-4 shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] backdrop-blur-[6px]">
                          <CardContent className="flex flex-col gap-3 p-0">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff660033]">
                                <div className="relative h-4 w-[14.02px] py-0.5">
                                  <img
                                    className="absolute left-[18.30%] top-[15.28%] h-[69.44%] w-[63.40%]"
                                    alt="Icon"
                                    src={shieldIconOrange}
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col items-start gap-1">
                                <div className="h-2 w-24 rounded bg-[#554733]" />
                                <div className="h-2 w-16 rounded bg-[#3b2e1e]" />
                              </div>
                            </div>

                            <div className="flex flex-col items-start gap-2">
                              <div className="h-2 w-full rounded bg-[#3b2e1e]" />
                              <div className="h-2 w-[138.75px] rounded bg-[#3b2e1e]" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="relative w-full sm:w-[240px] md:absolute md:left-[calc(50%-80px)] md:top-[calc(50%-110px)] h-auto md:h-[123px] w-[219px] overflow-hidden border-[#ff66004c] bg-[#221810] shadow-[0px_25px_50px_-12px_#00000040] mt-4 md:mt-0">
                          <CardContent className="flex h-full flex-col p-4 md:p-0">
                            <div className="mx-0 sm:mx-[17px] mt-0 sm:mt-[17px] flex max-h-5 items-center justify-between">
                              <span className="text-xs font-bold leading-4 text-slate-400 [font-family:'Manrope',Helvetica]">
                                Transfer Status
                              </span>
                              <Badge className="rounded-full bg-[#4ade801a] px-2 py-0.5 text-xs font-normal leading-4 text-green-400 hover:bg-[#4ade801a]">
                                Secure
                              </Badge>
                            </div>

                            <div className="mx-0 sm:mx-[17px] mt-3 sm:mt-4 flex max-h-5 items-center justify-between">
                              <span className="text-sm font-medium leading-5 text-white [font-family:'Manrope',Helvetica]">
                                Assets Locked
                              </span>
                              <span className="text-sm font-bold leading-5 text-white [font-family:'Manrope',Helvetica]">
                                $124,500.00
                              </span>
                            </div>

                            <div className="mx-0 sm:mx-[17px] mt-2 w-full sm:w-[205px] h-[6px] rounded-full bg-[#FF6600]" />

                            <div className="mx-0 sm:mx-[17px] mt-2 flex max-h-[15px] items-start justify-between">
                              <span className="text-[10px] font-normal leading-[15px] text-[#8b7c64] [font-family:'Manrope',Helvetica]">
                                Vault #8821
                              </span>
                              <span className="text-[10px] font-normal leading-[15px] text-[#8b7c64] [font-family:'Manrope',Helvetica]">
                                Optimized by MPC
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OnboardingContent;
