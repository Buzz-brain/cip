import { ChevronRight } from "lucide-react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import docIcon from "@assets/doc-grey.svg";
import chatMsgIcon from "@assets/chat-msg.svg";
import pinIcon from "@assets/pin.svg";
import infoTriangleIcon from "@assets/info-triangle.svg";
import lockYellowIcon from "@assets/lock-yellow.svg";
import tickGreenIcon from "@assets/tick-green.svg";
import pauseIcon from "@assets/pause.svg";
import notAllowedIcon from "@assets/not-allowed.svg";
import gavelPurpleIcon from "@assets/gavel-purple.svg";
import cancelIcon from "@assets/cancel.svg";

interface DisputeQueueProps {
  onBackToCase?: () => void;
}

export const DisputeQueue = ({ onBackToCase = () => { } }: DisputeQueueProps): JSX.Element => {

  const decisionOptions = [
    {
      id: 1,
      title: "Approve Execution",
      description: "Proceed with inheritance",
      icon: tickGreenIcon,
      bgIcon: "bg-[#16A34A33]",
      color: "text-green-400",
      action: "Approve Execution",
    },
    {
      id: 2,
      title: "Pause Execution",
      description: "Freeze funds, request info",
      icon: pauseIcon,
      bgIcon: "bg-[#D9770633]",
      color: "text-yellow-400",
      action: "Pause Execution",
    },
    {
      id: 3,
      title: "Reject Action",
      description: "Invalidate executor action",
      icon: notAllowedIcon,
      bgIcon: "bg-[#DC262633]",
      color: "text-red-400",
      action: "Reject Action",
    },
    {
      id: 4,
      title: "Escalate Dispute",
      description: "Send to arbitration/DAO",
      icon: gavelPurpleIcon,
      bgIcon: "bg-[#A855F733]",
      color: "text-purple-400",
      action: "Escalate Dispute",
    },
    {
      id: 5,
      title: "Dismiss Dispute",
      description: "Close case without action",
      icon: cancelIcon,
      bgIcon: "bg-[#554433]",
      color: "text-gray-400",
      action: "Dismiss Dispute",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221710] text-white [font-family:'Manrope',Helvetica]">
      <Header />


      <div className="relative z-10 flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <button
            onClick={onBackToCase}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <span className="text-sm text-[#B9AB9D]">Dispute Queue</span>
            <ChevronRight className="w-4 h-4 text-[#B9AB9D]" />
            <span className="text-sm text-white">Case #8821</span>
          </button>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">

              <div className="bg-[#32261A] border border-[#393128] rounded-xl p-6">

                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#D4691120] border border-[#D4691120] rounded-full flex items-center justify-center text-[#D46211] text-2xl font-bold">
                      JD
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-xl font-bold text-white">
                          Estate of J. Doe
                        </h1>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-white">
                        <p className="flex items-center">
                          <span className="text-[#B9AB9D]">Case ID:</span>&nbsp;#8821
                        </p>
                        <span className="text-[#B9AB9D] font-bold">•</span>
                        <p><span className="text-[#B9AB9D]">Created:</span> Oct 24, 2023</p>
                      </div>

                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#D473111A] border border-[#D4691133] text-orange-400 text-xs font-medium rounded-full">
                      Voting Open
                    </span>
                    <div className="text-xs">
                      <span className="text-[#B9AB9D]">Ends in  </span>
                      <span className="text-[#D97706]">48h</span>
                    </div>
                  </div>


                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#22191080] border border-[#393128] rounded-lg p-4">
                    <p className="text-sm text-[#B9AB9D] mb-1">Total Asset Value</p>
                    <p className="text-md text-white mb-1">$1,250,000</p>
                    <p className="text-xs text-[#B9AB9D]">Ethereum Chain</p>
                  </div>
                  <div className="bg-[#22191080] border border-[#393128] rounded-lg p-4">
                    <p className="text-sm text-[#B9AB9D] mb-1">Beneficiary</p>
                    <p className="text-md text-white mb-1">Alice Doe (Spouse)</p>
                    <p className="text-xs text-[#B9AB9D]">0x3f...C92</p>
                  </div>
                  <div className="bg-[#22191080] border border-[#393128] rounded-lg p-4">
                    <p className="text-sm text-[#B9AB9D] mb-1">Executor</p>
                    <p className="text-md text-white mb-1">Legal Trust Corp</p>
                    <p className="text-xs text-[#B9AB9D]">0x4a...8B2</p>
                  </div>
                </div>

              </div>


              <div className="bg-[#32261A] border border-[#393128] rounded-xl p-6">
                <h2 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                  <img src={infoTriangleIcon} alt="" />
                  Dispute Context
                </h2>
                <div className="space-y-4">
                  <div className="bg-[#22191080] p-5 rounded-lg border border-[#393128]">
                    <h3 className="text-sm font-semibold text-white mb-2">
                      Dispute Reason: Incorrect Asset Distribution
                    </h3>
                    <p className="text-sm text-[#B9AB9D]">
                      The beneficiary claims that the executor initiated a
                      distribution of 500 ETH to an unknown wallet address
                      (0x99...22) which is not listed in the original
                      inheritance plan. The executor claims this is a required
                      tax payment wallet, but no documentation was provided
                      prior to the transaction initiation.
                    </p>
                  </div>

                  <div className="">
                    <h3 className="text-sm font-semibold text-white mb-3">
                      Evidence Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-[#2218104D] border border-[#393128] rounded-lg">
                        <div className="bg-[#44362C] p-3 rounded">

                          <img src={docIcon} alt="Doc" />
                        </div>
                        <div>
                          <p className="text-sm text-white">
                            Original Will.pdf
                          </p>
                          <p className="text-xs text-[#B9AB9D]">
                            Uploaded by Beneficiary • 2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#2218104D] border border-[#393128] rounded-lg">
                        <div className="bg-[#44362C] p-3 rounded">

                          <img src={pinIcon} alt="Doc" />
                        </div>
                        <div>
                          <p className="text-sm text-white">
                            Etherscan Transaction #0×22...99
                          </p>
                          <p className="text-xs text-[#B9AB9D]">
                            Linked by Beneficiary • 2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#2218104D] border border-[#393128] rounded-lg">
                        <div className="bg-[#44362C] p-3 rounded">

                          <img src={chatMsgIcon} alt="" />
                        </div>
                        <div>
                          <p className="text-sm text-white">
                            Executor Rebuttal Statement
                          </p>
                          <p className="text-xs text-[#B9AB9D]">
                            Posted by Executor • 1 day ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#32261A] border border-[#393128] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">
                    Case Activity
                  </h2>
                  <a
                    href="#"
                    className="text-[#D46211] hover:text-orange-400 transition-colors text-sm"
                  >
                    View Full Log
                  </a>
                </div>
                <div className="border-l-2 pl-3 border-[#393128] space-y-3">
                  <div>
                    <p className="text-xs text-[#B9AB9D] mb-1">
                      Today, 10:23 AM
                    </p>
                    <p className="text-sm text-white">
                      Mediator{" "}
                      <span className="text-[#D46211] font-medium">
                        @CryptoLawyer
                      </span>{" "}
                      requested additional tax documentation from the Executor.
                    </p>
                  </div>
                  <div className=" pt-3">
                    <p className="text-xs text-[#B9AB9D] mb-1">
                      Yesterday, 04:15 PM
                    </p>
                    <p className="text-sm text-white">
                      Beneficiary{" "}
                      <span className="text-[#D46211] font-medium">
                        @AliceDoe
                      </span>{" "}
                      submitted new evidence "Etherscan Transaction #0×22...99".
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#32261A] border border-[#393128] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Escrow State
                </h3>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="h-28 w-28 gap-2 rounded-full border-4 border-black flex flex-col items-center justify-center mb-4">
                    <img src={lockYellowIcon} alt="" />
                    <p className="text-xs font-bold text-white">FROZEN</p>
                  </div>
                  <p className="text-xs text-[#B9AB9D] text-center">
                    Funds are currently locked in the smart contract pending
                    mediator resolution.
                  </p>
                </div>
              </div>

              <div className="bg-[#32261A] border-t-2 rounded-b-xl border-[#D48311] p-6">
                <h3 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                  Your Decision
                </h3>
                <p className="text-xs text-[#B9AB9D] mb-4">
                  Cast your vote to resolve this dispute. This action is
                  recorded on-chain.
                </p>

                <div className="space-y-2">
                  {decisionOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`w-full text-left p-3 border border-[#393128] bg-[#181311] rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/10 ${option.color}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 ${option.bgIcon} rounded-full flex items-center justify-center`}>
                          <img src={option.icon} alt="" className="text-lg" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{option.title}</p>
                          <p className="text-xs text-[#B9AB9D]">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#32261A] border border-[#393128] rounded-xl p-4 [font-family:'Manrope',Helvetica]">
                <h3 className="text-sm font-semibold text-gray-400 text-white tracking-wider mb-4">
                  Current Vote Tally
                </h3>
                <div>
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white">Approve</span>
                      <span className="text-sm text-[#B9AB9D]">60%</span>
                    </div>
                    <div className="w-full h-2 bg-[#181311] rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-green-500 rounded-full" />
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white">Reject</span>
                      <span className="text-sm text-[#B9AB9D]">40%</span>
                    </div>
                    <div className="w-full h-2 bg-[#181311] rounded-full overflow-hidden">
                      <div className="h-full w-2/5 bg-red-500 rounded-full" />
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white">Pending</span>
                      <span className="text-sm text-[#B9AB9D]">15%</span>
                    </div>
                    <div className="w-full h-2 bg-[#181311] rounded-full overflow-hidden">
                      <div className="h-full w-1/5 bg-[#B9AB9D] rounded-full" />
                    </div>
                  </div>
                  <hr className="border-[#393128] mb-4" />
                  <p className="text-[#B9AB9D] text-xs text-center">Quorum reached. <span className="text-white">12/15</span> Mediators voted.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
