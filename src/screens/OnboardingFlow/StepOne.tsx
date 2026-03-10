import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import logoImg from "@assets/cip-logo.svg";
import plusIcon from "@assets/plus-icon.svg";
import playIcon from "@assets/play-icon.svg";
import shieldIconOrange from "@assets/shield-orange.svg";
import bgUrl from "@assets/bgurl.png";
import githubShare from "@assets/github-share.svg";
import cotiIcon from "@assets/coti.svg";
import haxagonIcon from "@assets/hexagon-icon.svg";
import wormholeIcon from "@assets/wormhole.svg";
import iExecTeeIcon from "@assets/iexectee.svg";
import mpcIcon from "@assets/mpc.svg";
import connectWallet from "@assets/connect-wallet.svg";
import { Link } from "react-router-dom";


const navigationLinks = [
  { label: "Docs", href: "/docs/dispute" },
  { label: "FAQ", href: "#" },
];

const technologyPartners = [
  {
    icon: cotiIcon,
    name: "COTI",
    iconStyles: "w-[54.17%] h-[62.50%] top-[18.75%] left-[25.00%]",
  },
  {
    icon: haxagonIcon,
    name: "BNB Chain",
    iconStyles: "w-[86.67%] h-[62.50%] top-[18.75%] left-[6.67%]",
  },
  {
    icon: wormholeIcon,
    name: "Wormhole",
    iconStyles: "w-full h-[38.19%] top-[30.90%] left-0",
  },
  {
    icon: iExecTeeIcon,
    name: "iExec TEE",
    iconStyles: "w-[75.00%] h-[62.50%] top-[18.75%] left-[12.50%]",
  },
  {
    icon: mpcIcon,
    name: "MPC",
    iconStyles: "w-[79.17%] h-[76.39%] top-[11.81%] left-[16.67%]",
  },
];

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "GitHub", href: "#", hasIcon: true },
];

export const StepOne = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col min-h-screen bg-[linear-gradient(0deg,rgba(34,24,16,1)_0%,rgba(34,24,16,1)_100%)]">
        <header className="sticky top-0 z-50 w-full border-b border-[#37291f] bg-[#0d0501] backdrop-blur-[6px]">
          <div className="container flex h-16 items-center justify-between px-8">
            <div className="flex items-center gap-3">
                                    <Link to="/dashboard">
                            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
                          </Link>
              <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
                CIP&nbsp;&nbsp;Protocol
              </span>
            </div>

            <nav className="flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navigationLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium leading-5 text-slate-400 transition-colors hover:text-white [font-family:'Manrope',Helvetica]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <Button
                onClick={() => navigate("/connect-wallet")}
                className="gap-2 rounded-lg bg-[#ff6600] px-4 py-[7px] hover:bg-[#ff6600]/90"
              >
                <div className="relative h-[22px] w-[18px]">
                  <img
                    className="absolute left-[12.50%] top-[19.32%] h-[61.36%] w-[79.17%]"
                    alt="Wallet"
                    src={connectWallet}
                  />
                </div>
                <span className="text-sm font-bold leading-5 text-white [font-family:'Manrope',Helvetica]">
                  Connect Wallet
                </span>
              </Button>
            </nav>
          </div>
        </header>

        <main className="relative flex-1">
          <div className="absolute inset-0 [background:radial-gradient(50%_50%_at_50%_0%,rgba(250,130,55,0.15)_0%,rgba(255,102,0,0)_60%)]" />

          <section className="relative py-32">
            <div className="container max-w-screen-xl px-8">
              <div className="flex items-center justify-center gap-20">
                <div className="flex max-w-2xl flex-1 flex-col items-start gap-8">
                  <div className="relative h-[325.75px] w-full">
                    <Badge
                      variant="outline"
                      className="gap-2 rounded-full border-[#372d1f] bg-[#2e241c] px-3 py-1"
                    >
                      <div className="relative flex h-2 w-2 items-start">
                        <div className="absolute inset-0 rounded-full bg-green-400 opacity-75" />
                        <div className="relative h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-medium leading-4 tracking-[0.60px] text-slate-400 [font-family:'Manrope',Helvetica]">
                        PROTOCOL LIVE V1.2
                      </span>
                    </Badge>

                    <div>
                      <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[68px] leading-[66px] mt-3 mb-2">
                        Secure Your Legacy <br />
                        <span className="bg-gradient-to-r from-[#FF6600] to-[#FAB060] text-transparent bg-clip-text">
                          Across Chains.
                        </span>
                      </h1>
                      <p className="text-lg font-normal leading-[29.2px] text-slate-400 [font-family:'Manrope',Helvetica]">
                        Ensure your digital assets are safely transferred to
                        <br />
                        your loved ones using advanced decentralized
                        <br />
                        cryptography and automated inheritance planning.
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full items-start gap-4">
                    <Button
                      onClick={() => navigate("/onboarding/step-two")}
                      className="h-12 gap-2 overflow-hidden rounded-lg bg-[#ff6600] px-8 shadow-[0px_4px_6px_-4px_#3b82f633,0px_10px_15px_-3px_#3b82f633] hover:bg-[#ff6600]/90"
                    >
                      <div className="relative h-6 w-5">
                        <img
                          className="absolute left-[8.33%] top-[15.28%] h-[69.44%] w-[83.33%]"
                          alt="Launch"
                          src={plusIcon}
                        />
                      </div>
                      <span className="text-base font-bold leading-6 text-white [font-family:'Manrope',Helvetica]">
                        Launch App
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-12 gap-2 rounded-lg border-[#554733] bg-transparent px-8 hover:bg-[#554733]/10"
                    >
                      <div className="relative h-6 w-5">
                        <img
                          className="absolute left-[8.33%] top-[15.28%] h-[69.44%] w-[83.33%]"
                          alt="Demo"
                          src={playIcon}
                        />
                      </div>
                      <span className="text-base font-bold leading-6 text-white [font-family:'Manrope',Helvetica]">
                        Try Demo Mode
                      </span>
                    </Button>
                  </div>

                  <div className="flex w-full flex-col items-start px-0 pb-0 pt-4">
                    <div className="flex w-full flex-col items-start gap-4 border-t border-[#3b2e1e] px-0 pb-0 pt-8">
                      <div className="flex w-full flex-col items-start">
                        <p className="text-xs font-semibold leading-4 tracking-[0.60px] text-[#8b7c64] [font-family:'Manrope',Helvetica]">
                          POWERED BY LEADING TECHNOLOGY
                        </p>
                      </div>

                      <div className="relative grid h-[100px] w-full grid-cols-3 gap-y-4 bg-[#191919] p-5 opacity-70">
                        {technologyPartners.map((partner) => (
                          <div
                            key={partner.name}
                            className="inline-flex items-center gap-2"
                          >
                            <div className="relative h-6 w-5 py-0.5">
                              <img
                                className={`absolute ${partner.iconStyles}`}
                                alt={partner.name}
                                src={partner.icon}
                              />
                            </div>
                            <span className="text-sm font-bold leading-5 text-white [font-family:'Manrope',Helvetica]">
                              {partner.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative h-[500px] flex-1">
                  <Card className="h-full overflow-hidden rounded-2xl border-[#3b2e1e] bg-[#2e241c] shadow-[0px_25px_50px_-12px_#00000040]">
                    <div className="flex h-10 items-center gap-2 border-b border-[#3b2e1e] bg-[#231c15] px-4">
                      <div className="h-3 w-3 rounded-full border border-[#ef444480] bg-[#ef444433]" />
                      <div className="h-3 w-3 rounded-full border border-[#eab30880] bg-[#eab30833]" />
                      <div className="h-3 w-3 rounded-full border border-[#22c55e80] bg-[#22c55e33]" />
                    </div>

                    <CardContent
                      className="relative h-[calc(100%-40px)] p-0"
                      style={{ background: `url(${bgUrl}) 50% 50% / cover` }}
                    >
                      <div className="absolute inset-0 bg-[#2a1b0fcc] backdrop-blur-[1px]" />

                      <div className="absolute inset-0">
                        <Card className="absolute left-[calc(50%-203px)] top-[calc(50%-35px)] w-[219px] gap-3 overflow-hidden border-[#554733] bg-[#221510e6] p-4 shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] backdrop-blur-[6px]">
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

                        <Card className="absolute left-[calc(50%-32px)] top-[calc(50%-94px)] h-[123px] w-[219px] overflow-hidden border-[#ff66004c] bg-[#221810] shadow-[0px_25px_50px_-12px_#00000040]">
                          <CardContent className="flex h-full flex-col p-0">
                            <div className="mx-[17px] mt-[17px] flex max-h-5 items-center justify-between">
                              <span className="text-xs font-bold leading-4 text-slate-400 [font-family:'Manrope',Helvetica]">
                                Transfer Status
                              </span>
                              <Badge className="rounded-full bg-[#4ade801a] px-2 py-0.5 text-xs font-normal leading-4 text-green-400 hover:bg-[#4ade801a]">
                                Secure
                              </Badge>
                            </div>

                            <div className="mx-[17px] mt-4 flex max-h-5 items-center justify-between">
                              <span className="text-sm font-medium leading-5 text-white [font-family:'Manrope',Helvetica]">
                                Assets Locked
                              </span>
                              <span className="text-sm font-bold leading-5 text-white [font-family:'Manrope',Helvetica]">
                                $124,500.00
                              </span>
                            </div>

                            <div className="mx-[17px] mt-2 w-[185px] h-[6px] rounded-full bg-[#FF6600]" />

                            <div className="mx-[17px] mt-1 flex max-h-[15px] items-start justify-between">
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

        <footer className="z-0 w-full border-t border-[#3b2e1e] bg-[#221810] p-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-normal leading-5 text-slate-400 [font-family:'Manrope',Helvetica]">
              © 2026 Legacy Protocol. All rights reserved.
            </p>

            <nav className="flex flex-wrap items-start justify-center gap-8">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex h-[21px] items-center gap-[3.99px] text-sm font-normal leading-5 text-slate-400 transition-colors hover:text-white [font-family:'Manrope',Helvetica]"
                >
                  {link.label}
                  {link.hasIcon && (
                    <div className="relative h-4 w-[14.02px]">
                      <img
                        className="absolute left-[14.34%] top-[18.75%] h-[62.50%] w-[71.33%]"
                        alt="External"
                        src={githubShare}
                      />
                    </div>
                  )}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};
