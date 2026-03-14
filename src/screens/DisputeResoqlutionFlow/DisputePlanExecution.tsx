import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const DisputePlanExecution = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-[#0d0501]">
      <header className="w-full h-[60px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#2a2420]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-[#ff6600] rounded-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
            </svg>
          </div>
          <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
            Inheritance Protocol
          </span>
        </div>

        <nav className="flex items-center gap-8">
          <a href="#dashboard" className="[font-family:'Manrope',Helvetica] text-gray-300 text-sm hover:text-white transition-colors">Dashboard</a>
          <a href="#plans" className="[font-family:'Manrope',Helvetica] text-gray-300 text-sm hover:text-white transition-colors">My Plans</a>
          <a href="#tasks" className="[font-family:'Manrope',Helvetica] text-gray-300 text-sm hover:text-white transition-colors">Executor Tasks</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-lg bg-[#2a2420] hover:bg-[#3a3430] flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          <button className="w-8 h-8 rounded-lg bg-[#2a2420] hover:bg-[#3a3430] flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"/>
            </svg>
          </button>
          <button className="w-8 h-8 rounded-lg bg-[#2a2420] hover:bg-[#3a3430] flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/>
            </svg>
          </button>
          <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
            <span className="[font-family:'Manrope',Helvetica] text-sm font-bold text-black">U</span>
          </div>
        </div>
      </header>

      <div className="flex-1 px-10 py-12">
        <div className="max-w-6xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 [font-family:'Manrope',Helvetica]">
              Dispute Plan Execution
            </h1>
            <p className="text-gray-400 [font-family:'Manrope',Helvetica]">
              Plan ID: #4928-ETH
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="bg-[#1a1410] border border-[#2a2420] rounded-2xl p-8">
                <h2 className="text-lg font-bold text-white mb-6 [font-family:'Manrope',Helvetica]">
                  Reason for Dispute
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button className="p-4 border border-[#2a2420] rounded-lg hover:border-[#ff6600] transition-all group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-500/30">
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                      </svg>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-[#2a2420] mb-3"></div>
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Owner is still alive</h3>
                    <p className="text-gray-400 text-xs mt-2 [font-family:'Manrope',Helvetica]">Proof of life required.</p>
                  </button>

                  <button className="p-4 border border-[#2a2420] rounded-lg hover:border-[#ff6600] transition-all group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3 group-hover:bg-purple-500/30">
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                      </svg>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-[#2a2420] mb-3"></div>
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Incorrect Assets</h3>
                    <p className="text-gray-400 text-xs mt-2 [font-family:'Manrope',Helvetica]">Missing or wrong tokens listed.</p>
                  </button>

                  <button className="p-4 border border-[#2a2420] rounded-lg hover:border-[#ff6600] transition-all group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3 group-hover:bg-orange-500/30">
                      <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                      </svg>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-[#2a2420] mb-3"></div>
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Wrong Executor</h3>
                    <p className="text-gray-400 text-xs mt-2 [font-family:'Manrope',Helvetica]">Executor acting in bad faith.</p>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border border-[#2a2420] rounded-lg hover:border-[#ff6600] transition-all group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center mb-3 group-hover:bg-red-500/30">
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                      </svg>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-[#2a2420] mb-3"></div>
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Family Disagreement</h3>
                    <p className="text-gray-400 text-xs mt-2 [font-family:'Manrope',Helvetica]">Will contests or other disputes.</p>
                  </button>

                  <button className="p-4 border border-[#2a2420] rounded-lg hover:border-[#ff6600] transition-all group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-gray-500/20 flex items-center justify-center mb-3 group-hover:bg-gray-500/30">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                      </svg>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-[#2a2420] mb-3"></div>
                    <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">Other Legal Reason</h3>
                    <p className="text-gray-400 text-xs mt-2 [font-family:'Manrope',Helvetica]">Please specify in description.</p>
                  </button>
                </div>
              </div>

              <div className="bg-[#1a1410] border border-[#2a2420] rounded-2xl p-8 mt-6">
                <h2 className="text-lg font-bold text-white mb-2 [font-family:'Manrope',Helvetica]">
                  Dispute Details
                </h2>
                <p className="text-gray-400 text-sm mb-4 [font-family:'Manrope',Helvetica]">
                  Provide a detailed explanation of your claim
                </p>
                <textarea
                  className="w-full h-32 bg-[#0d0501] border border-[#2a2420] rounded-lg p-4 text-gray-300 [font-family:'Manrope',Helvetica] focus:outline-none focus:border-[#ff6600]"
                  placeholder="Enter dispute details..."
                />
              </div>

              <div className="bg-[#1a1410] border border-[#2a2420] rounded-2xl p-8 mt-6">
                <h2 className="text-lg font-bold text-white mb-4 [font-family:'Manrope',Helvetica]">
                  Evidence Upload
                </h2>
                <div className="border-2 border-dashed border-[#2a2420] rounded-lg p-12 text-center hover:border-[#ff6600] transition-colors cursor-pointer">
                  <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  <p className="text-white font-semibold [font-family:'Manrope',Helvetica] mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">
                    SVG, PNG, JPG, PDF or MP3 (max. 10MB)
                  </p>
                  <button className="mt-4 px-4 py-2 border border-[#2a2420] rounded-lg text-gray-300 hover:text-white hover:border-[#ff6600] transition-colors [font-family:'Manrope',Helvetica] text-sm font-semibold">
                    Select Files
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between p-3 bg-[#0d0501] border border-[#2a2420] rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                    </svg>
                    <div>
                      <p className="text-white text-sm font-semibold [font-family:'Manrope',Helvetica]">death_certificate_v1.pdf</p>
                      <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">2.3 MB • Uploaded 12h ago</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex gap-4 justify-between">
                <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica] self-center">
                  By submitting this dispute, you initiate an on-chain arbitration process.<br/>
                  You will be required to sign a transaction. <span className="text-orange-500">Gas fees apply.</span>
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" className="px-8 py-2 border-[#2a2420] hover:bg-[#1a1410]">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => navigate("/docs/case")}
                    className="px-8 py-2 bg-[#ff6600] hover:bg-[#ff7700] gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Sign & Submit Dispute
                  </Button>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4 sticky top-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                  <div>
                    <h3 className="font-bold text-orange-300 mb-1 [font-family:'Manrope',Helvetica]">Escrow Freeze Imminent</h3>
                    <p className="text-orange-200/80 text-sm [font-family:'Manrope',Helvetica]">
                      Initiating a dispute will immediately pause asset distribution. Assets will be locked in the smart contract until resolution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
