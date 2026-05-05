import { useState } from 'react';
import { useDisputeMessages, useSendDisputeMessage } from '../../lib/hooks/useDisputeMessages';
import { useViewDispute } from '../../lib/hooks/useViewDispute';
import { useViewAllDisputes } from '../../lib/hooks/useViewDispute';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { DisputeDetail } from '../../components/ui/DisputeDetail';
import { DisputeList } from '../../components/ui/DisputeList';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { DisputePlanExecution } from '../DisputeResolutionFlow/DisputePlanExecution';

export const ExecutorDisputePlan = (): JSX.Element => {

  const [selectedDisputeId, setSelectedDisputeId] = useState<number | null>(null);

  const { dispute, loading: disputeLoading } = useViewDispute(selectedDisputeId);
  const { disputes, loading: disputesLoading, refetch } = useViewAllDisputes();
  const { messages, refetch: refetchMessages } = useDisputeMessages(selectedDisputeId);
  const { sendMessage } = useSendDisputeMessage();

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

  // read optional ?raise=planId query param
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const raiseParam = search.get('raise');

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#191919] [font-family:'Manrope',Helvetica]">
      <main className="flex-1 flex flex-col items-center px-4 py-4">
        <div className="w-full max-w-5xl">
          {raiseParam ? (
            // Render the shared raise-dispute form for executors when ?raise= is present
            <DisputePlanExecution initialPlanId={raiseParam} redirectPath={'/executor-dashboard/executor-dispute-plan'} onSuccess={() => refetch()} useOrange={true} />
          ) : selectedDisputeId && dispute ? (
            <>
              {/* Dispute Detail View */}
              <DisputeDetail
                dispute={dispute}
                messages={messages}
                onSendMessage={handleSendMessage}
                canResolve={false}
                loading={disputeLoading}
                useOrange={true}
              />

              <div className="mt-6 flex gap-3">
                <Button onClick={() => setSelectedDisputeId(null)} className="bg-[#393028]">
                  Back to All Disputes
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Disputes List */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Your Disputes</h2>
                </div>

                <DisputeList
                  disputes={disputes}
                  onSelectDispute={handleSelectDispute}
                  loading={disputesLoading}
                  filter="all"
                  useOrange={true}
                />
              </div>

              {/* Alert Box */}
              <Card className="bg-[#163a1f4d] border-[#F9731633] mt-8">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-[#F97316] mb-1">Important Notice</h3>
                      <p className="text-[#9DB8A6] text-sm">
                        If you believe a beneficiary or another party is acting in bad faith, you can raise a dispute. Provide clear evidence and documentation.
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

export default ExecutorDisputePlan;
