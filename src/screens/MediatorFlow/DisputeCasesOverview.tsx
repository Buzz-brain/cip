import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useViewAllDisputes } from '../../lib/hooks/useViewDispute';
import { useDisputeMessages, useSendDisputeMessage } from '../../lib/hooks/useDisputeMessages';
import { useViewDispute } from '../../lib/hooks/useViewDispute';
import { useResolveDispute } from '../../lib/hooks/useDisputeStages';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { DisputeList } from '../../components/ui/DisputeList';
import { DisputeDetail } from '../../components/ui/DisputeDetail';
import { toast } from 'react-toastify';

export const DisputeCasesOverview = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedDisputeId, setSelectedDisputeId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const { disputes, loading: disputesLoading, refetch: refetchDisputes } = useViewAllDisputes();
  const { dispute, loading: disputeLoading } = useViewDispute(selectedDisputeId);
  const { messages, refetch: refetchMessages } = useDisputeMessages(selectedDisputeId);
  const { sendMessage } = useSendDisputeMessage();
  const { resolveDispute, loading: resolving } = useResolveDispute();

  const handleResolveDispute = async (resolutionNote: string) => {
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

  const handleSendMessage = async (content: string, file?: File) => {
    if (!selectedDisputeId) return;

    try {
      await sendMessage(selectedDisputeId, content, file);
      toast.success('Message sent!');
      await refetchMessages();
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to send message');
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#191919] [font-family:'Manrope',Helvetica]">
      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">Dispute Cases Overview</h1>
            <p className="text-[#9DB8A6]">Manage and resolve inheritance disputes across multiple chains.</p>
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
                  Back to All Cases
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Cases List with Filter */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Active Cases</h2>
                    <p className="text-[#AFA89C] text-sm">Total disputes: {disputes.length}</p>
                  </div>

                  <div className="flex gap-2">
                    {['all', 'pending', 'resolved'].map((status) => (
                      <Button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`${
                          filterStatus === status
                            ? 'bg-[#ff6600] text-white'
                            : 'bg-[#393028] text-[#AFA89C]'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {disputesLoading ? (
                  <p className="text-[#AFA89C]">Loading disputes...</p>
                ) : (
                  <DisputeList
                    disputes={disputes}
                    onSelectDispute={(id) => setSelectedDisputeId(id)}
                    filter={filterStatus}
                  />
                )}
              </div>

              {/* Info Card */}
              <Card className="bg-[#78350F4D] border-[#F59E0B33] mt-8">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-[#FBBF24] mb-1">Your Role as Mediator</h3>
                      <p className="text-[#FCD34DCC] text-sm">
                        Review dispute details, communicate with involved parties, and provide fair resolutions. Your arbitration is final.
                      </p>
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

export default DisputeCasesOverview;
