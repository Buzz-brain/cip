import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Header } from "./Header";
import signalIcon from "@assets/signal.svg";
import { Trash2, Wallet } from "lucide-react";
import gavelIcon from "@assets/gavel-orange.svg";
import familyIcon from "@assets/family.svg";
import threeDotIcon from "@assets/three-dot.svg";
import pdfRedIcon from "@assets/pdf-red.svg";
import thumbprintIcon from "@assets/thumbprint.svg";

export const DisputePlanExecution = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#191919] [font-family:'Manrope',Helvetica]">
    <Header />
    <main className="flex-1 flex flex-col items-center px-4 py-12">

        <div className="w-full max-w-[1040px]">

          <div className="flex items-center justify-between mb-10">

            <div>
              <h1 className="text-4xl font-bold text-white mb-4 [font-family:'Manrope',Helvetica]">
                Dispute Plan Execution
              </h1>
              <div className="[font-family:'Manrope',Helvetica]">
                <span className="text-[#9DB8A6] pr-1">Plan ID:</span> <span className="text-white bg-[#FFFFFF1A] px-2 py-1 rounded-md">#4928-ETH</span>
              </div>
            </div>

          
              <div className="bg-[#78350F4D] text-[#F59E0B] border border-[#F59E0B33] rounded-xl p-4 w-[480px]">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                  <div>
                    <h3 className="font-bold text-[#FBBF24] mb-1 [font-family:'Manrope',Helvetica]">Escrow Freeze Imminent</h3>
                    <p className="text-[#FCD34DCC] text-sm [font-family:'Manrope',Helvetica]">
                      Initiating a dispute will immediately pause asset distribution. Assets will be locked in the smart contract until resolution.
                    </p>
                  </div>
              </div>


            </div>

          </div>

            <div className="col-span-2">
              <div className="bg-[#1C2620] border border-[#2a2420] rounded-2xl p-8">
                <h2 className="text-lg font-bold text-white mb-6 [font-family:'Manrope',Helvetica]">
                  Reason for Dispute
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  
                  <button className="p-4 bg-[#111813] text-left border border-[#3C5344] rounded-xl hover:border-[#ff6600] transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30">
                        <img src={signalIcon} className="w-5 h-5" alt="Signal" />
                      </div>
                      <div className="w-6 h-6 rounded-full border border-[#4B5563]"></div>
                    </div>
                    
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Owner is still alive</h3>
                    <p className="text-[#9CA3AF] text-xs mt-1 [font-family:'Manrope',Helvetica]">Proof of life required.</p>
                  </button>

                  <button className="p-4 bg-[#111813] text-left border border-[#3C5344] rounded-xl hover:border-[#ff6600] transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#A855F71A] flex items-center justify-center group-hover:bg-blue-500/30">
                        <Wallet className="text-[#C084FC]" />
                      </div>
                      <div className="w-6 h-6 rounded-full border border-[#4B5563]"></div>
                    </div>
                    
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Incorrect Assets</h3>
                    <p className="text-[#9CA3AF] text-xs mt-1 [font-family:'Manrope',Helvetica]">Missing or wrong tokens listed.</p>
                  </button>

                  <button className="p-4 bg-[#111813] text-left border border-[#3C5344] rounded-xl hover:border-[#ff6600] transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#F973161A] flex items-center justify-center group-hover:bg-blue-500/30">
                        <img src={gavelIcon} className="w-5 h-5" alt="Gavel" />
                      </div>
                      <div className="w-6 h-6 rounded-full border border-[#4B5563]"></div>
                    </div>
                    
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Wrong Executor</h3>
                    <p className="text-[#9CA3AF] text-xs mt-1 [font-family:'Manrope',Helvetica]">Executor acting in bad faith.</p>
                  </button>


                  <button className="p-4 bg-[#111813] text-left border border-[#3C5344] rounded-xl hover:border-[#ff6600] transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#F43F5E1A] flex items-center justify-center group-hover:bg-blue-500/30">
                        <img src={familyIcon} className="w-5 h-5" alt="Family" />
                      </div>
                      <div className="w-6 h-6 rounded-full border border-[#4B5563]"></div>
                    </div>
                    
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Family Disagreement</h3>
                    <p className="text-[#9CA3AF] text-xs mt-1 [font-family:'Manrope',Helvetica]">Will contests or other disputes.</p>
                  </button>

                  <button className="p-4 bg-[#111813] text-left border border-[#3C5344] rounded-xl hover:border-[#ff6600] transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#6B72801A] flex items-center justify-center group-hover:bg-blue-500/30">
                        <img src={threeDotIcon} className="w-5 h-5" alt="Family" />
                      </div>
                      <div className="w-6 h-6 rounded-full border border-[#4B5563]"></div>
                    </div>
                    
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Other Legal Reason</h3>
                    <p className="text-[#9CA3AF] text-xs mt-1 [font-family:'Manrope',Helvetica]">Please specify in description.</p>
                  </button>
                </div>
              </div>

              <div className="bg-[#1C2620] border border-[#2a2420] rounded-2xl p-8 mt-6">
                <h2 className="text-lg font-bold text-white mb-2 [font-family:'Manrope',Helvetica]">
                  Dispute Details
                </h2>
                <p className="text-[#9DB8A6] text-sm mb-4 [font-family:'Manrope',Helvetica]">
                  Provide a detailed explanation of your claim
                </p>
                <textarea
                  className="w-full h-32 bg-[#111813] border border-[#3C5344] rounded-lg p-4 text-[#9CA3AF] [font-family:'Manrope',Helvetica] focus:outline-none focus:border-[#ff6600]"
                  placeholder="Enter dispute details..."
                />
              </div>

              <div className="bg-[#1C2620] border border-[#2a2420] rounded-2xl p-8 mt-6">
                <h2 className="text-lg font-bold text-white mb-4 [font-family:'Manrope',Helvetica]">
                  Evidence Upload
                </h2>
                <div className="border-2 bg-[#111813] border-dashed border-[#3C5344] rounded-lg p-12 text-center hover:border-[#ff6600] transition-colors cursor-pointer">
                  <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  <p className="text-white font-semibold [font-family:'Manrope',Helvetica] mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-[#9DB8A6] text-xs [font-family:'Manrope',Helvetica]">
                    SVG, PNG, JPG, PDF or MP3 (max. 10MB)
                  </p>
                  <button className="mt-4 px-4 py-2 bg-[#29382E] border border-[#3C5344] rounded-lg text-gray-300 hover:text-white hover:border-[#ffffff] transition-colors [font-family:'Manrope',Helvetica] text-sm font-semibold">
                    Select Files
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between p-4 bg-[#1C2620] border border-[#29382E] rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-md bg-[#7F1D1D4D] flex items-center justify-center group-hover:bg-blue-500/30">
                    <img src={pdfRedIcon} alt="PDF" />

                      </div>

                    <div>
                      <p className="text-white text-sm font-semibold [font-family:'Manrope',Helvetica]">death_certificate_v1.pdf</p>
                      <p className="text-[#6B7280] text-xs [font-family:'Manrope',Helvetica]">2.4 MB • Uploaded just now</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>

              <div className="bg-[#111813] border border-[#2a2420] rounded-2xl p-8 mt-6">

              <div className="flex gap-4 justify-between">
                <p className="text-[#9DB8A6] text-sm [font-family:'Manrope',Helvetica] self-center">
                  By submitting this dispute, you initiate an on-chain arbitration process.<br/>
                  You will be required to sign a transaction. <span className="text-white">Gas fees apply.</span>
                </p>
                <div className="flex gap-4">
                  <Button className="bg-transparent px-8 py-2 border-transparent hover:bg-[#9DB8A6] hover:text-[#221810] gap-2">
                    Cancel
                  </Button>

                  <Button
                    onClick={() => navigate("/docs/case")}
                    className="px-8 py-2 bg-[#1A1A1A] hover:bg-[#9DB8A6] hover:text-[#000000] gap-2"
                  >
                   <img src={thumbprintIcon} alt="" />
                    Sign & Submit Dispute
                  </Button>
                </div>
              </div>
</div>
            </div>

        </div>
    </main>
    </div>
  );
};
