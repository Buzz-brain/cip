import React from 'react';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import logoImg from '@assets/cip-logo.png';
import plusIcon from '@assets/plus-icon.svg';
import playIcon from '@assets/play-icon.svg';
import shieldIconOrange from '@assets/shield-orange.svg';
import bgUrl from '@assets/bgurl.png';
import cotiIcon from '@assets/coti.svg';
import haxagonIcon from '@assets/hexagon-icon.svg';
import wormholeIcon from '@assets/wormhole.svg';
import iExecTeeIcon from '@assets/iexectee.svg';
import mpcIcon from '@assets/mpc.svg';
import plusImg from '@assets/plus-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useConnectWallet } from '../context/ConnectWalletContext';

const technologyPartners = [
  { icon: cotiIcon, name: 'COTI', iconStyles: 'w-[54.17%] h-[62.50%] top-[18.75%] left-[25.00%]' },
  { icon: haxagonIcon, name: 'BNB Chain', iconStyles: 'w-[86.67%] h-[62.50%] top-[18.75%] left-[6.67%]' },
  { icon: wormholeIcon, name: 'Wormhole', iconStyles: 'w-full h-[38.19%] top-[30.90%] left-0' },
  { icon: iExecTeeIcon, name: 'iExec TEE', iconStyles: 'w-[75.00%] h-[62.50%] top-[18.75%] left-[12.50%]' },
  { icon: mpcIcon, name: 'MPC', iconStyles: 'w-[79.17%] h-[76.39%] top-[11.81%] left-[16.67%]' },
];

const OnboardingStepOneContent: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useConnectWallet();

  return (
    <div className="w-full">
      <div className="flex flex-col bg-[linear-gradient(0deg,rgba(34,24,16,1)_0%,rgba(34,24,16,1)_100%)]">
        <header className="w-full border-b border-[#37291f] bg-[#0d0501]">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-3">
              <Link to="/">
                <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
              </Link>
            </div>

            <nav className="flex items-center gap-8">
              <Button
                onClick={() => {
                  navigate('/');
                  openModal();
                }}
                className="h-10 px-4 bg-[#ff6600] hover:bg-[#ff7700] font-bold text-white text-sm leading-[21px] rounded-lg"
              >
                Connect Wallet
              </Button>
            </nav>
          </div>
        </header>

        <main className="relative">
          <section className="relative py-6 sm:py-10">
            <div className="container max-w-screen-xl px-4 sm:px-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
                <div className="w-full md:max-w-2xl flex-1 flex flex-col items-start gap-6 md:gap-8">
                  <Badge variant="outline" className="gap-2 rounded-full border-[#372d1f] bg-[#2e241c] px-3 py-1">
                    <div className="relative flex h-2 w-2 items-start">
                      <div className="absolute inset-0 rounded-full bg-green-400 opacity-75" />
                      <div className="relative h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs font-medium leading-4 tracking-[0.60px] text-slate-400">PROTOCOL LIVE V1.2</span>
                  </Badge>

                  <div>
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-[48px] text-white mt-3 mb-2 leading-tight md:leading-[48px]">
                      Secure Your Legacy
                      <span className="block bg-gradient-to-r from-[#FF6600] to-[#FAB060] text-transparent bg-clip-text">Across Chains.</span>
                    </h1>
                    <p className="text-sm sm:text-base font-normal text-slate-400 leading-6 sm:leading-7">
                      Ensure your digital assets are safely transferred to your loved ones using advanced decentralized cryptography and automated inheritance planning.
                    </p>
                  </div>

                  <div className="flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <Button onClick={() => navigate('/onboarding/step-two')} className="w-full sm:w-auto h-12 gap-2 overflow-hidden rounded-lg bg-[#ff6600] px-6 sm:px-8">
                      <div className="relative h-6 w-5">
                        <img className="absolute left-[8.33%] top-[15.28%] h-[69.44%] w-[83.33%]" alt="Launch" src={plusIcon} />
                      </div>
                      <span className="text-base font-bold leading-6 text-white">Launch App</span>
                    </Button>

                    <Button variant="outline" className="w-full sm:w-auto h-12 gap-2 rounded-lg border-[#554733] bg-transparent px-6 sm:px-8">
                      <div className="relative h-6 w-5">
                        <img className="absolute left-[8.33%] top-[15.28%] h-[69.44%] w-[83.33%]" alt="Demo" src={playIcon} />
                      </div>
                      <span className="text-base font-bold leading-6 text-white">Try Demo Mode</span>
                    </Button>
                  </div>

                  <div className="flex w-full flex-col items-start px-0 pb-0 pt-4">
                    <div className="flex w-full flex-col items-start gap-4 border-t border-[#3b2e1e] px-0 pb-0 pt-6">
                      <div className="flex w-full flex-col items-start">
                        <p className="text-xs font-semibold leading-4 tracking-[0.60px] text-[#8b7c64]">POWERED BY LEADING TECHNOLOGY</p>
                      </div>

                      <div className="relative grid auto-rows-min w-full grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-y-4 bg-[#191919] p-4 sm:p-5 opacity-80 items-center">
                        {technologyPartners.map((partner) => (
                          <div key={partner.name} className="inline-flex items-center gap-2">
                            <div className="relative h-6 w-5 py-0.5">
                              <img className={`absolute ${partner.iconStyles}`} alt={partner.name} src={partner.icon} />
                            </div>
                            <span className="text-sm font-bold leading-5 text-white">{partner.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:h-[500px] flex-1 mt-8 md:mt-0">
                  <Card className="h-full overflow-hidden rounded-2xl border-[#3b2e1e] bg-[#2e241c]">
                    <div className="flex h-10 items-center gap-2 border-b border-[#3b2e1e] bg-[#231c15] px-4">
                      <div className="h-3 w-3 rounded-full border border-[#ef444480] bg-[#ef444433]" />
                      <div className="h-3 w-3 rounded-full border border-[#eab30880] bg-[#eab30833]" />
                      <div className="h-3 w-3 rounded-full border border-[#22c55e80] bg-[#22c55e33]" />
                    </div>

                    <CardContent className="relative h-auto md:h-[calc(100%-40px)] p-4 md:p-0" style={{ background: `url(${bgUrl}) 50% 50% / cover` }}>
                      <div className="absolute inset-0 bg-[#2a1b0fcc] backdrop-blur-[1px]" />

                      <div className="absolute inset-0 flex flex-col md:block items-center md:items-start justify-center">
                        <Card className="relative w-full sm:w-[320px] md:absolute md:left-[calc(50%-203px)] md:top-[calc(50%-35px)] w-[219px] gap-3 overflow-hidden border-[#554733] bg-[#221510e6] p-4">
                          <CardContent className="flex flex-col gap-3 p-0">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff660033]">
                                <div className="relative h-4 w-[14.02px] py-0.5">
                                  <img className="absolute left-[18.30%] top-[15.28%] h-[69.44%] w-[63.40%]" alt="Icon" src={shieldIconOrange} />
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white">Feature Highlight</p>
                                <p className="text-xs text-gray-300">Military-grade MPC sharing</p>
                              </div>
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

export default OnboardingStepOneContent;
