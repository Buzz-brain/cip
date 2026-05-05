import { useParams } from 'react-router-dom';
import { useViewDispute } from '../../lib/hooks/useViewDispute';
import { useDisputeMessages, useSendDisputeMessage } from '../../lib/hooks/useDisputeMessages';
import { DisputeDetail } from '../../components/ui/DisputeDetail';

export const BeneficiaryDisputeDetail = (): JSX.Element => {
  const { disputeId } = useParams<{ disputeId: string }>();
  const id = disputeId ? parseInt(disputeId) : null;

  const { dispute, loading: disputeLoading } = useViewDispute(id);
  const { messages, refetch: refetchMessages } = useDisputeMessages(id);
  const { sendMessage, loading: sending } = useSendDisputeMessage();

  const handleSend = async (content: string, file?: File) => {
    if (!id) return;
    await sendMessage(id, content, file);
    await refetchMessages();
  };

  return (
    <div>
      {dispute ? (
        <DisputeDetail dispute={dispute} messages={messages} onSendMessage={handleSend} loading={disputeLoading} />
      ) : (
        <div className="text-[#AFA89C]">Loading dispute...</div>
      )}
    </div>
  );
};

export default BeneficiaryDisputeDetail;
