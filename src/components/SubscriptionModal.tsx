import React from 'react';
import { Button } from '@components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#0d0501] border border-[#392f28] rounded-lg p-6 z-10">
        <h3 className="font-bold text-white text-lg">Subscription Required</h3>
        <p className="text-sm text-[#bdb09a] mt-2">Creating an inheritance plan requires an active subscription. Choose a plan to continue.</p>

        <div className="mt-6 flex gap-3">
          <Button
            className="bg-[#ff6600] hover:bg-[#ff6600]/90"
            onClick={() => {
              onClose();
              navigate('/owner-dashboard/billing-and-payments');
            }}
          >
            View Pricing
          </Button>

          <Button
            variant="outline"
            className='text-black'
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
