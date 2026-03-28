// import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Header } from "./Header";
import cubeIcon from "@assets/cube.svg";
import hourGlassYellowIcon from "@assets/hour-glass-yellow.svg";
import padlockIcon from "@assets/padlock.svg";
import chatbubbleMsg from "@assets/chatbubble-msg.svg";
import marcusVIcon from "@assets/marcus-v.svg";
import ethereumIcon from "@assets/ethereum.svg";
import solanaIcon from "@assets/solana.svg";
import nftIcon from "@assets/nft.svg";
import timeClockLeftIcon from "@assets/time-clock-left.svg";
import gavelIcon from "@assets/gavel-green.svg";
import { Info } from "lucide-react";

export const EscrowStateVisualization = (): JSX.Element => {
  // const navigate = useNavigate();

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#191919] [font-family:'Manrope',Helvetica]">
    <Header />


      <div className="flex-1 px-10 py-12">
        <div className="max-w-7xl">
          <div className="mb-8">
            <p className="text-gray-400 text-sm mb-5 [font-family:'Manrope',Helvetica]">
              <span className="text-[#9DB8A6] pr-1">Disputes</span> / <span className="text-[#9DB8A6] pl-1 pr-1">Case #4829</span> / <span className="text-white pl-1">Escrow State Visualization</span>
            </p>
            <h1 className="text-3xl font-bold text-white [font-family:'Manrope',Helvetica]">
              Escrow State Visualization
            </h1>

            <div className="flex justify-between items-center text-[#9DB8A6]">
              <p>Real-time status of secure assets for Case #4829</p>

              <div className="flex gap-4">

              <button className="bg-[#1C261F] flex items-center gap-2 hover:bg-[#2a2420] border border-[#29382E] text-white px-5 rounded-lg py-2"><img src={timeClockLeftIcon} className="w-3" alt="History" />History Log</button>
              <button className="flex items-center gap-2 border border-[#29382E] text-[#ffffff] px-5 rounded-lg py-2"><img src={gavelIcon} alt="Submit" />Submit Evidence</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 flex flex-col gap-6">
              <div className="bg-[#1C261F] border border-[#2a2420] rounded-2xl p-10 relative">
          
                <div className="flex gap-10">
                  <div>
                    <img src={padlockIcon} alt="Cube" />
                  </div>

                  <div>
                    <div className="mb-5">
                      <div className="flex gap-2 px-3 py-1 w-[250px] bg-[#EAB3081A] border border-[#EAB30833] rounded-xl mb-3">
                        <img src={hourGlassYellowIcon} alt="" />
                        <p className="text-[#EAB308] text-xs font-semibold [font-family:'Manrope',Helvetica]">
                          Status: Funds Held for Review
                        </p>
                      </div>

                      <h2 className="text-2xl font-bold text-white [font-family:'Manrope',Helvetica]">
                        Safe Escrow Vault #8832
                      </h2>
                      <p className="text-[#9DB8A6] text-sm [font-family:'Manrope',Helvetica]">
                        Assets from the inheritance plan have been<br />
                        automatically moved to this neutral CIP Vault contract.<br />
                        They are cryptographically locked until the assigned<br />
                        mediator resolves the dispute.
                      </p>
                    </div>


                    <div className="grid grid-cols-2 gap-8 mb-8">
                      <div className="flex flex-col bg-[#111813] rounded-xl border border-[#29382E] p-4 gap-2">
                        <p className="text-[#9DB8A6] text-xs font-semibold [font-family:'Manrope',Helvetica]">Total Locked Value</p>
                        <p className="text-2xl font-bold text-white [font-family:'Manrope',Helvetica]">$1,250,420.00</p>
                      </div>
                      <div className="flex flex-col bg-[#111813] rounded-xl border border-[#29382E] p-4 gap-2">
                        <p className="text-[#9DB8A6] text-xs font-semibold [font-family:'Manrope',Helvetica]">Contract Risk</p>
                        <p className="text-white text-2xl font-bold [font-family:'Manrope',Helvetica]">Audited</p>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="flex items-center gap-2 pt-5 border-t border-[#29382E]">
                  <img src={cubeIcon} alt="Cube" />

                  <p className="text-[#9DB8A6] text-sm [font-family:'Manrope',Helvetica]">
                    Contract Address: <span className="text-[#CBD5E1] bg-[#0000004D] px-2 pr-7 py-1 ml-1 rounded">0x71C...92f4</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-[#1C261F] border border-[#2a2420] rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-white mb-6 [font-family:'Manrope',Helvetica]">
                    Dispute Progression
                  </h3>

<hr className="mb-7 border-dashed border-[#29382E]"/>
  <div className="bg-[#3B82F61A] text-[#F59E0B] border border-[#3B82F633] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="text-[#60A5FA]" />
                  <div>
                    <h3 className="font-bold text-[#DBEAFE] mb-1 [font-family:'Manrope',Helvetica]">Mediator Note</h3>
                    <p className="text-[#BFDBFECC] text-sm [font-family:'Manrope',Helvetica]">
                      "I have received the initial statements. I am currently reviewing the on-chain activity logs for the wallet in question. Please submit any additional proof of ownership by Oct 28."
                    </p>
                  </div>
              </div>
</div>

                </div>
              </div>
            </div>

            <div className="col-span-1 flex flex-col gap-6">
              <div className="bg-[#1C261F] border border-[#29382E] rounded-2xl p-6">
                <div>
                  <h4 className="text-sm font-bold text-[#9DB8A6] mb-4 [font-family:'Manrope',Helvetica]">Assigned Mediator</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <img src={marcusVIcon} alt="Marcus V." />
                    </div>
                    <div>
                      <p className="text-white font-semibold [font-family:'Manrope',Helvetica]">Marcus V.</p>
                      <p className="text-gray-400 text-xs [font-family:'Manrope',Helvetica]">Kleros Court Level 3</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-[#9DB8A6] text-sm [font-family:'Manrope',Helvetica]">Cases Resolved</p>
                      <p className="text-white text-sm [font-family:'Manrope',Helvetica]">142</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-[#9DB8A6] text-sm [font-family:'Manrope',Helvetica]">Reputation Score</p>
                      <p className="text-white text-sm [font-family:'Manrope',Helvetica]">98/100</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[#9DB8A6] textsm [font-family:'Manrope',Helvetica]">Time Remaining</p>
                      <p className="text-white bg-[#EF444433] text-sm border border-[#EF44444D] rounded px-2 font-semibold [font-family:'Manrope',Helvetica]">48h 12m</p>
                    </div>
                  </div>

                  <Button className="w-full bg-[#111813] p-4 hover:bg-[#2a2420] border border-[#29382E] text-white gap-2">
<img src={chatbubbleMsg} alt="ChatBubble" />
                    Contact Mediator
                  </Button>
                </div>
              </div>

              <div className="bg-[#1C261F] border border-[#29382E] rounded-2xl">
                <h4 className="text-sm font-bold text-[#9DB8A6] [font-family:'Manrope',Helvetica] p-4">Locked Assets</h4>

                <div>
                  <div className="flex items-center justify-between p-3 border-t border-b border-[#29382E]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <img src={ethereumIcon} alt="Ethereum" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm [font-family:'Manrope',Helvetica]">Wrapped ETH</p>
                        <p className="text-[#9DB8A6] text-xs [font-family:'Manrope',Helvetica]">Ethereum Mainnet</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-semibold [font-family:'Manrope',Helvetica]">450.00 wETH</p>
                      <p className="text-[#9DB8A6] text-xs [font-family:'Manrope',Helvetica]">$850,230</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border-t border-b border-[#29382E]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <img src={solanaIcon} alt="Solana" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm [font-family:'Manrope',Helvetica]">Solana</p>
                        <p className="text-[#9DB8A6] text-xs [font-family:'Manrope',Helvetica]">Solana Chain</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-semibold [font-family:'Manrope',Helvetica]">2,500 SOL</p>
                      <p className="text-[#9DB8A6] text-xs [font-family:'Manrope',Helvetica]">$330,120</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border-t border-b border-[#29382E]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <img src={nftIcon} alt="NFT" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm [font-family:'Manrope',Helvetica]">Bored Ape #8821</p>
                        <p className="text-[#9DB8A6] text-xs [font-family:'Manrope',Helvetica]">NFT (ERC-721)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-semibold [font-family:'Manrope',Helvetica]">1 Unit</p>
                      <p className="text-[#9DB8A6] text-xs [font-family:'Manrope',Helvetica]">$50,070</p>
                    </div>
                  </div>
                </div>

                <button className="w-full p-3 text-[#9DB8A6] hover:text-[#ff7700] text-sm [font-family:'Manrope',Helvetica] transition-colors flex items-center justify-center gap-2">
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
