import { useState } from 'react';
import { useViewAllDisputes } from '../../lib/hooks/useViewDispute';
import { useDisputeMessages, useSendDisputeMessage } from '../../lib/hooks/useDisputeMessages';
import { useViewDispute } from '../../lib/hooks/useViewDispute';
import { useResolveDispute } from '../../lib/hooks/useDisputeStages';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { DisputeList } from '../../components/ui/DisputeList';
import { DisputeDetail } from '../../components/ui/DisputeDetail';
import { toast } from 'react-toastify';

interface DisputeQueueProps {
  onBackToCase?: () => void;
}

export const DisputeQueue = ({ }: DisputeQueueProps): JSX.Element => {
  const [selectedDisputeId, setSelectedDisputeId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'priority' | 'date'>('priority');

  const { disputes, loading: disputesLoading, refetch: refetchDisputes } = useViewAllDisputes();
  const { dispute, loading: disputeLoading } = useViewDispute(selectedDisputeId);
  const { messages, refetch: refetchMessages } = useDisputeMessages(selectedDisputeId);
  const { sendMessage } = useSendDisputeMessage();
  const { resolveDispute, loading: resolving } = useResolveDispute();

  // Sort disputes by priority (pending > reviewing > resolved)
  const sortedDisputes = [...disputes].sort((a, b) => {
    if (sortBy === 'priority') {
      const statusPriority: { [key: string]: number } = {
        pending: 1,
        reviewing: 2,
        resolved: 3,
      };
      const priorityA = statusPriority[a.status?.toLowerCase() || 'pending'] ?? 99;
      const priorityB = statusPriority[b.status?.toLowerCase() || 'pending'] ?? 99;
      return priorityA - priorityB;
    }
    // Sort by date (newest first)
    return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
  });

  const handleResolveDispute = async (resolutionNote: string): Promise<void> => {
    if (!selectedDisputeId) return;

    try {
      await resolveDispute(selectedDisputeId, resolutionNote);
      toast.success('Dispute resolved successfully!');
      setSelectedDisputeId(null);
      await refetchDisputes();
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to resolve dispute');
    }
  };

  const handleSendMessage = async (content: string, file?: File): Promise<void> => {
    if (!selectedDisputeId) return;

    try {
      await sendMessage(selectedDisputeId, content, file);
      toast.success('Message sent!');
      await refetchMessages();
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to send message');
    }
  };

  const handleSelectDispute = (id: number): void => {
    setSelectedDisputeId(id);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#191919] [font-family:'Manrope',Helvetica]">
      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">Dispute Queue</h1>
            <p className="text-[#9DB8A6]">Prioritized disputes waiting for your resolution.</p>
          </div>

          {selectedDisputeId && dispute ? (
            <>
              {/* Dispute Detail View with Resolution Form */}
              <DisputeDetail
                dispute={dispute}
                messages={messages}
                onSendMessage={handleSendMessage}
                canResolve={true}
                onResolve={handleResolveDispute}
                loading={disputeLoading || resolving}
              />

              <div className="mt-6 flex gap-3">
                <Button onClick={() => setSelectedDisputeId(null)} className="bg-[#393028]">
                  Back to Queue
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Queue List with Sort Options */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Pending Disputes</h2>
                    <p className="text-[#AFA89C] text-sm">Total in queue: {sortedDisputes.length}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSortBy('priority')}
                      className={`${
                        sortBy === 'priority'
                          ? 'bg-[#ff6600] text-white'
                          : 'bg-[#393028] text-[#AFA89C]'
                      }`}
                    >
                      Sort by Priority
                    </Button>
                    <Button
                      onClick={() => setSortBy('date')}
                      className={`${
                        sortBy === 'date'
                          ? 'bg-[#ff6600] text-white'
                          : 'bg-[#393028] text-[#AFA89C]'
                      }`}
                    >
                      Sort by Date
                    </Button>
                  </div>
                </div>

                <DisputeList
                  disputes={sortedDisputes}
                  onSelectDispute={handleSelectDispute}
                  loading={disputesLoading}
                  filter="pending"
                />
              </div>

              {/* Priority Guide Card */}
              <Card className="bg-[#78350F4D] border-[#F59E0B33] mt-8">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-[#FBBF24] mb-2">Queue Priority</h3>
                      <p className="text-[#FCD34DCC] text-sm mb-2">
                        Disputes are ordered by urgency:
                      </p>
                      <ul className="text-[#FCD34DCC] text-sm space-y-1 ml-4">
                        <li>• <strong>Pending:</strong> Awaiting initial review</li>
                        <li>• <strong>Reviewing:</strong> Under active examination</li>
                        <li>• <strong>Resolved:</strong> Decision provided</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DisputeQueue;

//                     </h3>
//                     <div className="grid grid-cols-2 gap-3">
//                       <div className="flex items-center gap-3 p-3 bg-[#2218104D] border border-[#393128] rounded-lg">
//                         <div className="bg-[#44362C] p-3 rounded">

//                           <img src={docIcon} alt="Doc" />
//                         </div>
//                         <div>
//                           <p className="text-sm text-white">
//                             Original Will.pdf
//                           </p>
//                           <p className="text-xs text-[#B9AB9D]">
//                             Uploaded by Beneficiary • 2 days ago
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-[#2218104D] border border-[#393128] rounded-lg">
//                         <div className="bg-[#44362C] p-3 rounded">

//                           <img src={pinIcon} alt="Doc" />
//                         </div>
//                         <div>
//                           <p className="text-sm text-white">
//                             Etherscan Transaction #0×22...99
//                           </p>
//                           <p className="text-xs text-[#B9AB9D]">
//                             Linked by Beneficiary • 2 days ago
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-[#2218104D] border border-[#393128] rounded-lg">
//                         <div className="bg-[#44362C] p-3 rounded">

//                           <img src={chatMsgIcon} alt="" />
//                         </div>
//                         <div>
//                           <p className="text-sm text-white">
//                             Executor Rebuttal Statement
//                           </p>
//                           <p className="text-xs text-[#B9AB9D]">
//                             Posted by Executor • 1 day ago
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-[#32261A] border border-[#393128] rounded-xl p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-bold text-white">
//                     Case Activity
//                   </h2>
//                   <a
//                     href="#"
//                     className="text-[#D46211] hover:text-orange-400 transition-colors text-sm"
//                   >
//                     View Full Log
//                   </a>
//                 </div>
//                 <div className="border-l-2 pl-3 border-[#393128] space-y-3">
//                   <div>
//                     <p className="text-xs text-[#B9AB9D] mb-1">
//                       Today, 10:23 AM
//                     </p>
//                     <p className="text-sm text-white">
//                       Mediator{" "}
//                       <span className="text-[#D46211] font-medium">
//                         @CryptoLawyer
//                       </span>{" "}
//                       requested additional tax documentation from the Executor.
//                     </p>
//                   </div>
//                   <div className=" pt-3">
//                     <p className="text-xs text-[#B9AB9D] mb-1">
//                       Yesterday, 04:15 PM
//                     </p>
//                     <p className="text-sm text-white">
//                       Beneficiary{" "}
//                       <span className="text-[#D46211] font-medium">
//                         @AliceDoe
//                       </span>{" "}
//                       submitted new evidence "Etherscan Transaction #0×22...99".
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <div className="bg-[#32261A] border border-[#393128] rounded-xl p-6">
//                 <h3 className="text-sm font-semibold text-white mb-4">
//                   Escrow State
//                 </h3>
//                 <div className="flex flex-col items-center justify-center py-4">
//                   <div className="h-28 w-28 gap-2 rounded-full border-4 border-black flex flex-col items-center justify-center mb-4">
//                     <img src={lockYellowIcon} alt="" />
//                     <p className="text-xs font-bold text-white">FROZEN</p>
//                   </div>
//                   <p className="text-xs text-[#B9AB9D] text-center">
//                     Funds are currently locked in the smart contract pending
//                     mediator resolution.
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-[#32261A] border-t-2 rounded-b-xl border-[#D48311] p-6">
//                 <h3 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
//                   Your Decision
//                 </h3>
//                 <p className="text-xs text-[#B9AB9D] mb-4">
//                   Cast your vote to resolve this dispute. This action is
//                   recorded on-chain.
//                 </p>

//                 <div className="space-y-2">
//                   {decisionOptions.map((option) => (
//                     <button
//                       key={option.id}
//                       className={`w-full text-left p-3 border border-[#393128] bg-[#181311] rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/10 ${option.color}`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <div className={`w-8 h-8 ${option.bgIcon} rounded-full flex items-center justify-center`}>
//                           <img src={option.icon} alt="" className="text-lg" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-white">{option.title}</p>
//                           <p className="text-xs text-[#B9AB9D]">
//                             {option.description}
//                           </p>
//                         </div>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-[#32261A] border border-[#393128] rounded-xl p-4 [font-family:'Manrope',Helvetica]">
//                 <h3 className="text-sm font-semibold text-gray-400 text-white tracking-wider mb-4">
//                   Current Vote Tally
//                 </h3>
//                 <div>
//                   <div className="mb-5">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-sm text-white">Approve</span>
//                       <span className="text-sm text-[#B9AB9D]">60%</span>
//                     </div>
//                     <div className="w-full h-2 bg-[#181311] rounded-full overflow-hidden">
//                       <div className="h-full w-3/5 bg-green-500 rounded-full" />
//                     </div>
//                   </div>

//                   <div className="mb-5">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-sm text-white">Reject</span>
//                       <span className="text-sm text-[#B9AB9D]">40%</span>
//                     </div>
//                     <div className="w-full h-2 bg-[#181311] rounded-full overflow-hidden">
//                       <div className="h-full w-2/5 bg-red-500 rounded-full" />
//                     </div>
//                   </div>

//                   <div className="mb-5">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-sm text-white">Pending</span>
//                       <span className="text-sm text-[#B9AB9D]">15%</span>
//                     </div>
//                     <div className="w-full h-2 bg-[#181311] rounded-full overflow-hidden">
//                       <div className="h-full w-1/5 bg-[#B9AB9D] rounded-full" />
//                     </div>
//                   </div>
//                   <hr className="border-[#393128] mb-4" />
//                   <p className="text-[#B9AB9D] text-xs text-center">Quorum reached. <span className="text-white">12/15</span> Mediators voted.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
