import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import shieldCheckOrangeIcon from "@assets/shield-check-orange.svg";
import fingerprintIcon from "@assets/fingerprint.svg";
import hourGlassIcon from "@assets/hour-glass.svg";
import leafLetterIcon from "@assets/leaf-letter.svg";
import handTouchIcon from "@assets/hand-touch.svg";
import messageCheckBorderIcon from "@assets/message-check-border.svg";
import paperEditIcon from "@assets/paper-edit.svg";
import alarmBuzzIcon from "@assets/alarm-buzz.svg";
import { Button } from "../../components/ui/button";

export const ConfirmInactivityOraclePlan = (): JSX.Element => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810] text-white [font-family:'Manrope',Helvetica]">
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
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-300 text-sm font-semibold"
          >
            Create Plan
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            My Plans
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Settings
          </a>
          <div className="w-9 h-9 bg-gray-400 rounded-full"></div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Confirm Inactivity Oracle Plan
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
            Confirm the creation of your Inactivity Oracle plan with selected
            inactivity period. Proof-of-Life methods, and grace period.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm tracking-[0] leading-5">
              Step 5 of 5: Review & Sign
            </span>
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#ff6600] text-sm tracking-[0] leading-5">
              100% Completed
            </span>
          </div>

          <div className="w-full h-2 bg-[#54493B] rounded-full overflow-hidden">
            <div className="h-full w-[100%] bg-[#ff6600]"></div>
          </div>
        </div>

        <div className="flex gap-8 mb-8">
          <div className="w-[65%]">
            <div className=" flex-1 border border-[#54493B] rounded-xl bg-[#27221C] mb-8">
              <div>
                <div className="flex items-center justify-between p-5">
                  <h2 className="text-white font-bold text-lg">
                    Plan Execution Flow
                  </h2>
                </div>
              </div>
            </div>

            <div className=" flex-1 border border-[#54493B] rounded-xl bg-[#27221C] mb-8">
              <div>
                <div className="flex items-center justify-between p-5">
                  <h2 className="text-white font-bold text-lg">
                    Configuration Summary
                  </h2>
                  <a
                    href="#"
                    className="text-orange-500 hover:text-orange-400 text-sm font-semibold"
                  >
                    Edit
                  </a>
                </div>

                <div>
                  <div className="flex border-b border-t border-[#54493B] p-4 items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-12 rounded-lg bg-[#393128] flex items-center justify-center flex-shrink-0">
                        <img
                          src={hourGlassIcon}
                          className="w-5 h-5"
                          alt="Hourglass"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-bold">
                            Inactivity Threshold
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Time before trigger
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto text-white font-semibold">
                      180 Days
                    </div>
                  </div>

                  <div className="flex border-b border-[#54493B] p-4 items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-12 rounded-lg bg-[#393128] flex items-center justify-center flex-shrink-0">
                        <img
                          src={alarmBuzzIcon}
                          className="w-5 h-5"
                          alt="Hourglass"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-bold">Grace Period</h3>
                        </div>
                        <p className="text-gray-400 text-sm">Cancel window</p>
                      </div>
                    </div>
                    <div className="ml-auto text-white font-semibold">
                      30 Days
                    </div>
                  </div>

                  <div className="flex p-4 items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-12 rounded-lg bg-[#393128] flex items-center justify-center flex-shrink-0">
                        <img src={fingerprintIcon} alt="Fingerprint" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-bold">
                            Proof-of-Life Methods
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Ways to reset the timer
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex p-4 items-center gap-4">
                    <div className="w-[165px] rounded-lg bg-[#8A541E33] border border-[#8A541E80] px-3 py-2 gap-2 flex items-center justify-between">
                      <img
                        src={leafLetterIcon}
                        className="w-5 h-5"
                        alt="Leaf Letter"
                      />
                      <span className="text-sm">Wallet Signature</span>
                    </div>

                    <div className="w-[120px] rounded-lg bg-[#581C8733] border border-[#581C8780] px-3 py-2 gap-2 flex items-center justify-between">
                      <img
                        src={handTouchIcon}
                        className="w-5 h-5"
                        alt="Leaf Letter"
                      />
                      <span className="text-sm">App Login</span>
                    </div>

                    <div className="w-[90px] rounded-lg bg-[#7C2D1233] border border-[#7C2D1280] px-3 py-2 gap-2 flex items-center justify-between">
                      <img
                        src={messageCheckBorderIcon}
                        className="w-5 h-5"
                        alt="Leaf Letter"
                      />
                      <span className="text-sm">Email</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[35%] border-2 border-[#FF660033] rounded-2xl p-6 bg-[#FF66001A]">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={shieldCheckOrangeIcon}
                className="w-5 h-5"
                alt="Hourglass"
              />
              <h2 className="text-[#FF6600] font-bold text-lg">
                Secure Transaction
              </h2>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              Ready to Deploy?
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              You are about to finalize your Inactivity Oracle. This requires an
              on-chain transaction to set your parameters immutably.
            </p>

            <div className="border border-[#54493B] rounded-xl p-4 bg-[#181311]">
              <div className="flex gap-4">
                <div className="flex-1 text-xs font-normal">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-300">Network</h3>

                    <div className="flex gap-2 items-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-white">Ethereum Mainnet</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-300">Est. Gas Fee</h3>
                    <h3 className="text-white">0.004 ETH ($12.40)</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-300">Contract Type</h3>
                    <h3 className="text-white">Standard Oracle</h3>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => navigate("/review-plan")}
              className="inline-flex w-full mt-8 items-center gap-2 px-7 py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-lg [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
            >
              <img src={paperEditIcon} alt="Icon" />
              Sign & Create Plan
            </Button>

            <p className="text-gray-400 text-sm mb-6 mt-4 leading-relaxed">
              By signing, you agree to the protocol Terms of Service and confirm
              you have backed up your keys.
            </p>
          </div>
        </div>

        <footer className="flex mt-12 items-center justify-start pt-8 pb-12 px-0 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-[#54483b]">
          <div className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
            <Button
              className="px-6 py-6 rounded-lg border border-solid border-[#54483b] bg-transparent hover:bg-transparent [font-family:'Manrope',Helvetica] font-bold text-white text-base text-center leading-6"
              onClick={handleBack}
            >
              &larr; &nbsp; Back
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
};
