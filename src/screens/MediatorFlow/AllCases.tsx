import { Check, Menu, Info } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import timeClockFullIcon from "@assets/time-clock-full.svg";
import docWhiteIcon from "@assets/doc-white.svg";
import shareButtonWhiteIcon from "@assets/share-button-white.svg";
import folderUserIcon from "@assets/folder-user.svg";
import deathCertImage from "@assets/death-cert.svg";
import lastWillImage from "@assets/last-will.svg";
import emailLogsImageq from "@assets/email-logs.svg";
import bankStatmentImage from "@assets/bank-statement.svg";
import gridIcon from "@assets/grid.svg";
import timeClockOrangeIcon from "@assets/time-clock-orange.svg";
import gavelIcon from "@assets/gavel.svg";
import lockOrangeIcon from "@assets/lock-orange.svg";
import robotYellowIcon from "@assets/robot-yellow.svg";
import timeClockYellowicon from "@assets/time-clock-yellow.svg";
import notAllowedIcon from "@assets/not-allowed.svg";

const caseFilesData = [
  {
    id: 1,
    name: "Death Certificate.pdf",
    uploadedBy: "Executor",
    uploadedTime: "2 days ago",
    type: "pdf",
    image: deathCertImage,
  },
  {
    id: 2,
    name: "Last Will & Testament",
    uploadedBy: "Protocol",
    uploadedTime: "Automated",
    type: "document",
    image: lastWillImage,
  },
  {
    id: 3,
    name: "Bank Statement (Oct)",
    uploadedBy: "Beneficiary A",
    uploadedTime: null,
    type: "document",
    image: bankStatmentImage,
  },
  {
    id: 4,
    name: "Email Logs #002",
    uploadedBy: "Beneficiary B",
    uploadedTime: null,
    type: "mail",
    image: emailLogsImageq,
  },
];

export const AllCases = (): JSX.Element => {

  const onCaseCreated = () => { }

  const handleViewSmartContract = () => {
    onCaseCreated();
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221710] text-white [font-family:'Manrope',Helvetica]">
      <Header />

      <div className="relative z-10 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between gap-2 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#F973161A] text-[#F97316] border border-[#F9731633] text-xs font-semibold rounded">
                  Voting Open
                </span>
                <div className="flex gap-1 text-xs text-[#B9AB9D]">
                  <img src={timeClockFullIcon} alt="" />

                  <span>
                    Time Remaining: 48h
                  </span>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={handleViewSmartContract}
                  className="flex items-center gap-2 px-3 py-2 bg-[#2E291E] border border-[#393128] rounded-lg text-white hover:bg-orange-500/30 transition-colors font-medium"
                >
                  <img src={docWhiteIcon} alt="Smart Contract" />
                  View Smart Contract
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-[#2E291E] border border-[#393128] rounded-lg text-white hover:bg-zinc-700 transition-colors">
                  <img src={shareButtonWhiteIcon} alt="Share" />
                  Share
                </button>
              </div>



            </div>

            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-white">
                      Case #8821: Estate of J. Doe
                    </h1>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-white">
                    <span className="flex items-center gap-1 bg-[#2E291E] border border-[#393128] px-2 py-1 rounded">
                      <span className="w-2 h-2 bg-orange-500 rounded-full" />
                      Ethereum Chain
                    </span>
                    <span>•</span>
                    <span>Value: $1,250,000 (USDC)</span>
                  </div>

                </div>
              </div>
            </div>
          </div>


          <div className="flex justify-between gap-8">
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <img src={folderUserIcon} className="w-5 h-5" alt="Folder" />
                    Case Files & Evidence
                  </h2>

                  <div className="flex items-center gap-2 text-[#B9AB9D]">
                    <button className="p-2 text-sm bg-zinc-800 rounded-lg transition-colors">
                      <img src={gridIcon} className="w-3 h-3" alt="Grid" />
                    </button>
                    <button className="p-2 text-sm hover:bg-zinc-800 rounded-lg transition-colors">
                      <Menu className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {caseFilesData.map((file) => (
                  <div
                    key={file.id}
                    className="bg-[#2E291E] border border-[#393128] rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors cursor-pointer group"
                  >
                    <div className="relative w-full h-50 overflow-hidden">
                      <img
                        src={file.image}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-white font-medium mb-1">
                        {file.name}
                      </p>
                      <p className="text-xs text-[#B9AB9D]">
                        Uploaded by {file.uploadedBy} {file.uploadedTime ? `• ${file.uploadedTime}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex flex-col justify-center items-center bg-[#32261A] border border-dashed border-[#393128] rounded-lg p-8 text-center">
                  <div className="bg-[#393128] border border-[#393128] rounded-full p-3 mb-2">

                    <p className="text-[#B9AB9D] text-sm">add</p>
                  </div>
                  <p className="text-[#B9AB9D] text-sm">Request Additional File</p>
                </div>

              </div>

              <div>
                <div className="flex gap-2 items-center pt-6 mb-4">
                  <img src={timeClockOrangeIcon} className="w-4 h-4" alt="Time Clock" />
                  <h2 className="text-xl font-bold text-white">
                    Recent Activity
                  </h2>

                </div>


                <div className="bg-[#32261A] border border-[#393128] rounded-lg p-4">

                  <div className="flex items-start gap-4 border-b border-[#393128] pb-4 pt-4 mb-6">

                    <div className="p-2 text-sm bg-[#181311] border border-[#393128] rounded-full transition-colors">
                      <img src={gridIcon} className="w-10 h-10 p-3" alt="Grid" />
                    </div>

                    <div>

                      <p className="text-sm">New Evidence Uploaded</p>
                      <p className="text-sm text-[#B9AB9D] mb-2">
                        Beneficiary B uploaded "Email Logs #002" challenging the will validity.
                      </p>
                      <p className="text-xs text-[#B9AB9D] mb-2">Today, 09:41 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">

                    <div className="p-2 text-sm bg-[#181311] border border-[#393128] rounded-full transition-colors">
                      <img src={gavelIcon} className="w-10 h-10 p-2" alt="Gavel" />
                    </div>

                    <div>

                      <p className="text-sm">Dispute Opened</p>
                      <p className="text-sm text-[#B9AB9D] mb-2">
                        Smart contract automatically flagged estate for mediation due to contested claim.
                      </p>
                      <p className="text-xs text-[#B9AB9D] mb-2">Yesterday, 4:20 PM</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>


            <div className="w-[380px]">
              <div className="space-y-4">
                <div className="bg-[#32261A] border border-[#393128] rounded-lg p-4">

                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-[#B9AB9D] font-semibold">Contract State</p>

                    <div className="flex items-center gap-2 px-2 py-1 bg-[#D977061A] text-[#D97706] border border-[#D977061A] font-semibold rounded">
                      <img src={lockOrangeIcon} className="w-3 h-3" alt="" />
                      <span className="text-xs">ESCROWED</span>
                    </div>
                  </div>

                  <div className="flex gap-2">

                    <div className="w-10 h-10 rounded-lg bg-[#ff660033] flex items-center justify-center flex-shrink-0 mt-1">
                      <img src={robotYellowIcon} className="w-5 h-5" alt="Icon" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        Automated Execution
                      </p>
                      <p className="text-[#B9AB9D] text-xs">Awaiting consensus (2/5 votes cast)</p>
                    </div>

                  </div>


                  <div className="text-right mt-3">
                    <div className="relative w-full h-2 mb-1 rounded-full bg-[#181311]">
                      <div
                        className="absolute left-0 top-0 h-2 rounded-full bg-[#D46211]"
                        style={{ width: "50%" }}
                      ></div>
                    </div>

                    <span className="text-[#B9AB9D] [font-family:'Manrope',Helvetica] text-xs font-medium">
                      40% Consensus Reached
                    </span>
                  </div>




                </div>
                <div className="bg-[#32261A] border border-[#393128] rounded-lg">

                  <div className="p-4 border border-b border-[#393128] rounded-t-lg">
                    <p className="text-sm font-semibold text-white mb-2">Mediator Ruling</p>
                    <p className="text-xs text-[#B9AB9D]">
                      Submit your binding decision on-chain.
                    </p>
                  </div>

                  <div className="p-4 border border-b border-[#393128]">
                    <p className="text-xs text-[#B9AB9D] mb-2">
                      Decision Rationale
                    </p>
                    <div className="h-28 bg-[#181311] border border-[#393128] mb-2 rounded-md">

                    </div>
                    <p className="text-xs text-[#B9AB9D] mb-4">
                      Markdown supported
                    </p>

                    <hr className="border-[#393128] mb-6" />


                    <div className="bg-[#16A34A1A] border border-[#16A34A33] rounded-xl p-2 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#16A34A33] rounded-full flex items-center justify-center">
                            <Check className="text-[#16A34A] w-4 h-4" />
                          </div>
                          <div>
                            <p className="[font-family:'Manrope',Helvetica] font-semibold text-white text-xs">
                              Approve Distribution
                            </p>
                            <p className="[font-family:'Manrope',Helvetica] text-[#16A34A] text-xs">
                              Execute original plan
                            </p>
                          </div>
                        </div>
                        <button className="[font-family:'Manrope',Helvetica] text-[#B9AB9D] text-sm tracking-[0] leading-4">
                          &gt;
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#D977061A] border border-[#D9770633] rounded-xl p-2 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#D9770633] rounded-full flex items-center justify-center">
                            <img src={timeClockYellowicon} alt="" />
                          </div>
                          <div>
                            <p className="[font-family:'Manrope',Helvetica] font-semibold text-white text-xs">
                              Delay / Request Info
                            </p>
                            <p className="[font-family:'Manrope',Helvetica] text-[#D97706] text-xs">
                              +7 Days extension
                            </p>
                          </div>
                        </div>
                        <button className="[font-family:'Manrope',Helvetica] text-[#B9AB9D] text-sm tracking-[0] leading-4">
                          &gt;
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#DC26261A] border border-[#DC262633] rounded-xl p-2 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#DC262633] rounded-full flex items-center justify-center">
                            <img src={notAllowedIcon} alt="" />
                          </div>
                          <div>
                            <p className="[font-family:'Manrope',Helvetica] font-semibold text-white text-xs">
                              Delay / Request Info
                            </p>
                            <p className="[font-family:'Manrope',Helvetica] text-[#DC2626] text-xs">
                              +7 Days extension
                            </p>
                          </div>
                        </div>
                        <button className="[font-family:'Manrope',Helvetica] text-[#B9AB9D] text-sm tracking-[0] leading-4">
                          &gt;
                        </button>
                      </div>
                    </div>


                    <div className="bg-[#181311] text-[#B9AB9D] flex gap-2 items-start border border-[#393128] p-3 mb-2 rounded-md">

                      <Info className="w-10" />
                      <p className="text-xs">
                        Transactions are immutable. By voting, you sign a message with your connected wallet (0x4a...8B2).
                      </p>
                    </div>


                  </div>



                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
