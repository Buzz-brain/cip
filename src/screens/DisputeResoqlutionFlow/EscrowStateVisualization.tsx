// import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const EscrowStateVisualization = (): JSX.Element => {
  // const navigate = useNavigate();

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
            CIP Protocol
          </span>
        </div>

        <nav className="flex items-center gap-8">
          <a href="#dashboard" className="[font-family:'Manrope',Helvetica] text-gray-300 text-sm hover:text-white transition-colors">Dashboard</a>
          <a href="#vaults" className="[font-family:'Manrope',Helvetica] text-gray-300 text-sm hover:text-white transition-colors">Vaults</a>
          <a href="#settings" className="[font-family:'Manrope',Helvetica] text-gray-300 text-sm hover:text-white transition-colors">Settings</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
            <span className="[font-family:'Manrope',Helvetica] text-sm font-bold text-black">U</span>
          </div>
        </div>
      </header>

      <div className="flex-1 px-10 py-12">
        <div className="max-w-7xl">
          <div className="mb-8">
            <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica] mb-4">
              <span className="text-gray-500">Disputes</span> / <span className="text-gray-500">Case #4829</span> /
            </p>
            <h1 className="text-3xl font-bold text-white mb-8 [font-family:'Manrope',Helvetica]">
              Real-time status of secure assets for Case #4829
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 flex flex-col gap-6">
              <div className="bg-[#1a1410] border border-[#2a2420] rounded-2xl p-8 relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="px-3 py-1 bg-[#1a1410] border border-[#2a2420] rounded-lg text-gray-300 text-sm hover:border-[#ff6600] [font-family:'Manrope',Helvetica] transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3H5v14h8V7h6V5h-6V3zm-2 10h-4v-2h4v2zm0-4h-4V7h4v2zm6 8h-4v-2h4v2z"/>
                    </svg>
                    History Log
                  </button>
                  <button className="px-3 py-1 bg-[#1a1410] border border-[#2a2420] rounded-lg text-gray-300 text-sm hover:border-[#ff6600] [font-family:'Manrope',Helvetica] transition-colors">
                    Case Details
                  </button>
                </div>

                <div className="mb-8">
                  <div className="inline-block px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-lg mb-3">
                    <p className="text-yellow-300 text-xs font-semibold [font-family:'Manrope',Helvetica]">
                      Status: Funds Held for Review
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 [font-family:'Manrope',Helvetica]">
                    Safe Escrow Vault #8832
                  </h2>
                  <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica]">
                    Assets from the inheritance plan have been<br/>
                    automatically moved to this neutral CIP Vault contract.<br/>
                    They are cryptographically locked until the assigned<br/>
                    mediator resolves the dispute.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-400 text-xs font-semibold [font-family:'Manrope',Helvetica] uppercase">Total Locked Value</p>
                    <p className="text-2xl font-bold text-white [font-family:'Manrope',Helvetica]">$1,250,420.00</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-400 text-xs font-semibold [font-family:'Manrope',Helvetica] uppercase">Contract Risk</p>
                    <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica]">-</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#2a2420]">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
                  </svg>
                  <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica]">
                    Contract Address: <span className="text-gray-300 font-mono">0x71C...92f4</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1a1410] border border-[#2a2420] rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-white mb-6 [font-family:'Manrope',Helvetica]">
                    Dispute Progression
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 h-1 bg-[#ff6600] rounded-full mr-4"></div>
                      <span className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">75%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1 h-1 bg-[#ff6600] rounded-full mr-4"></div>
                      <span className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">100%</span>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <button className="text-gray-400 hover:text-gray-300 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1410] border border-[#2a2420] rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white [font-family:'Manrope',Helvetica]">
                      Mediator Note
                    </h3>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-300/80 text-sm [font-family:'Manrope',Helvetica] italic">
                      "I have received the initial statements. I am currently reviewing the on-chain activity logs for the wallet in question. Please submit any additional proof of ownership by Oct 28."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex flex-col gap-6">
              <div className="bg-[#1a1410] border border-[#2a2420] rounded-2xl p-6 sticky top-4">
                <div className="relative mb-8">
                  <div className="w-full h-40 bg-gradient-to-b from-[#ff6600]/20 to-[#0d0501] rounded-lg flex items-center justify-center overflow-hidden border border-[#2a2420]">
                    <div className="w-32 h-32 bg-[#2a2420] rounded-lg flex items-center justify-center border border-[#3a3430]">
                      <svg className="w-16 h-16 text-[#ff6600]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="inline-block px-2 py-1 bg-yellow-500/20 rounded mb-2">
                    <p className="text-yellow-300 text-xs font-semibold [font-family:'Manrope',Helvetica]">Status: Funds Held for Review</p>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 [font-family:'Manrope',Helvetica]">
                    Safe Escrow Vault #8832
                  </h3>
                  <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">
                    Assets from the inheritance plan have been automatically moved to this neutral CIP Vault contract. They are cryptographically locked until the assigned mediator resolves the dispute.
                  </p>
                </div>

                <div className="border-t border-[#2a2420] pt-6">
                  <h4 className="text-sm font-bold text-white mb-4 [font-family:'Manrope',Helvetica]">Assigned Mediator</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold [font-family:'Manrope',Helvetica]">M</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold [font-family:'Manrope',Helvetica]">Marcus V.</p>
                      <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">Mediator</p>
                    </div>
                  </div>

                  <div className="bg-[#0d0501] rounded-lg p-3 mb-4 border border-[#2a2420]">
                    <div className="flex justify-between mb-2">
                      <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">Cases Resolved</p>
                      <p className="text-white font-semibold [font-family:'Manrope',Helvetica]">142</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">Reputation Score</p>
                      <p className="text-white font-semibold [font-family:'Manrope',Helvetica]">-</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">Time Remaining</p>
                      <p className="text-orange-400 font-semibold [font-family:'Manrope',Helvetica]">48h 12m</p>
                    </div>
                  </div>

                  <Button className="w-full bg-[#1a1410] hover:bg-[#2a2420] border border-[#2a2420] text-gray-300 gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                    </svg>
                    Contact Mediator
                  </Button>
                </div>
              </div>

              <div className="bg-[#1a1410] border border-[#2a2420] rounded-2xl p-6">
                <h4 className="text-sm font-bold text-white mb-4 [font-family:'Manrope',Helvetica]">Locked Assets</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#0d0501] rounded-lg border border-[#2a2420]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 font-bold text-sm">Ξ</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm [font-family:'Manrope',Helvetica]">Wrapped ETH</p>
                        <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">Ethereum Mainnet</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold [font-family:'Manrope',Helvetica]">450.00 wETH</p>
                      <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">$850,230</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#0d0501] rounded-lg border border-[#2a2420]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 font-bold text-sm">◎</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm [font-family:'Manrope',Helvetica]">Solana</p>
                        <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">Solana Chain</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold [font-family:'Manrope',Helvetica]">2,500 SOL</p>
                      <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">$330,120</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#0d0501] rounded-lg border border-[#2a2420]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-400 font-bold text-sm">🐵</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm [font-family:'Manrope',Helvetica]">Bored Ape #8821</p>
                        <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">NFT (ERC-721)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold [font-family:'Manrope',Helvetica]">1 Unit</p>
                      <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">$50,070</p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 text-[#ff6600] hover:text-[#ff7700] text-sm font-semibold [font-family:'Manrope',Helvetica] transition-colors flex items-center justify-center gap-2">
                  View Full Asset List →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
