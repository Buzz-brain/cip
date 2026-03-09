import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import logoImg from "@assets/cip-logo.svg";
import forwardPlayBtn from "@assets/forward-play-btn.svg";
import shareButton from "@assets/share-button.svg";
import militaryGradeShield from "@assets/military-grade-shield.svg";
import cloudCancel from "@assets/cloud-cancel.svg";
import arrowForwardWhite from "@assets/arrow-forward-white.svg";
import circlePentagon from "@assets/circle-pentagon.svg";
import checkGreenCircle from "@assets/check-green-circle.svg";
import keybg from "@assets/keybg.png";

export const StepTwo = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-[#221810] flex flex-col">
      <header className="w-full h-[65px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#392f28]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-[#ff6600] rounded-lg">
            <img
              className="h-[31px] w-[25px] object-cover"
              alt="Logo"
              src={logoImg}
            />
          </div>
          <div className="[font-family:'Manrope',Helvetica] font-bold text-white text-[17.6px] leading-[22px]">
            CIP Protocol
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="[font-family:'Manrope',Helvetica] font-medium text-white text-sm hover:text-[#ff6600] transition-colors flex items-center gap-3"
        >
          Skip Intro
          <img className="h-[12px]" alt="SkipIntro" src={forwardPlayBtn} />
        </button>
      </header>

      <section className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-6xl">
          <div className="mb-12">
            <div className="text-[#ff6600] [font-family:'Manrope',Helvetica] font-semibold text-sm mb-2">
              Step 2 of 4
            </div>
            <h2 className="text-white [font-family:'Manrope',Helvetica] font-bold text-2xl mb-4">
              MPC Sharing Technology
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative w-full h-2 rounded-full bg-[#3a3530] flex-1">
                <div
                  className="absolute left-0 top-0 h-2 rounded-full bg-[#ff6600]"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <span className="text-gray-400 [font-family:'Manrope',Helvetica] font-medium ml-2">
                50%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-md h-[450px] rounded-3xl bg-[#1a1410] border border-[#3a3530] p-2 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600]/10 to-transparent"></div>

                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${keybg})` }}
                ></div>

                <div className="absolute bottom-0 left-0 right-0 z-10 w-full px-4 pb-4">
                  <div className="bg-[#2d2420] border border-[#3a3530] rounded-2xl p-4 flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 p-2 rounded-lg bg-[#ff6600] flex items-center justify-center">
                        <img src={circlePentagon} alt="Icon" />
                      </div>
                      <div>
                        <p className="[font-family:'Manrope',Helvetica] text-[#b8a494]">
                          Status
                        </p>
                        <p className="[font-family:'Manrope',Helvetica] font-bold text-white">
                          Shards Distributed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={checkGreenCircle} className="h-4" alt="Icon" />
                      <p className="[font-family:'Manrope',Helvetica] font-semibold text-green-500">
                        Secure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* <div className="flex items-start gap-3"> */}
              <div className="w-12 h-12 rounded-lg bg-[#ff660033] flex items-center justify-center flex-shrink-0 mt-1">
                <img src={shareButton} alt="Icon" />
              </div>

              <div>
                <h3 className="text-white [font-family:'Manrope',Helvetica] font-bold text-3xl mb-1">
                  The Power of MPC
                </h3>
                {/* </div> */}
              </div>

              <p className="text-gray-300 [font-family:'Manrope',Helvetica] text-base leading-relaxed">
                Your private key is never stored in one place. Instead, it is
                split into multiple shards using{" "}
                <span className="text-[#ff6600] font-semibold">
                  Multi-Party Computation (MPC)
                </span>
                .
              </p>

              <p className="text-[#b8a494] [font-family:'Manrope',Helvetica] text-base leading-relaxed">
                These shards are distributed across independent nodes, ensuring
                that no single point of failure exists. Even if one node is
                compromised, your assets remain secure.
              </p>

              <div className="flex flex-col gap-3 mt-3">
                <div className="flex items-center gap-5">
                  <img src={militaryGradeShield} alt="Icon" />
                  <p className="text-gray-300 [font-family:'Manrope',Helvetica] text-sm">
                    Military-grade encryption
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={cloudCancel} alt="" />
                  <p className="text-gray-300 [font-family:'Manrope',Helvetica] text-sm">
                    No complete key ever exists online
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  className="h-12 gap-2 rounded-lg border-[#554733] bg-transparent px-8 hover:bg-[#554733]/10"
                >
                  <span className="text-base font-bold leading-6 text-white [font-family:'Manrope',Helvetica]">
                    Back
                  </span>
                </Button>
                <Button
                  onClick={() => navigate("/connect-wallet")}
                  className="h-12 px-8 bg-[#ff6600] hover:bg-[#ff7700] [font-family:'Manrope',Helvetica] font-bold text-white text-base rounded-lg flex items-center gap-2"
                >
                  Next Step
                  <img src={arrowForwardWhite} alt="" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-16">
            <button className="w-2 h-2 rounded-full bg-[#ff6600]"></button>
            <button className="w-2 h-2 rounded-full bg-[#3a3530]"></button>
            <button className="w-2 h-2 rounded-full bg-[#3a3530]"></button>
            <button className="w-2 h-2 rounded-full bg-[#3a3530]"></button>
          </div>
        </div>
      </section>
    </main>
  );
};
