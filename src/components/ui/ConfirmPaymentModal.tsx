import React from 'react';
import { Button } from '@components/ui/button';

interface Props {
  open: boolean;
  title?: string;
  planName?: string;
  usdAmount?: number;
  ethAmount?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmPaymentModal: React.FC<Props> = ({ open, title = 'Confirm Payment', planName, usdAmount, ethAmount, loading = false, onConfirm, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#1f1915] border border-[#3a2f1e] rounded-lg w-[90%] max-w-md p-6 z-70">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-white font-bold">{title}</h3>
          <button className="text-[#b8a494]" onClick={onClose}>Close</button>
        </div>

        <div className="text-sm text-[#d1c3b4] space-y-4">
          {planName && <div className="text-xs text-[#8b7664]">Plan</div>}
          {planName && <div className="font-mono text-white">{planName}</div>}

          {typeof usdAmount === 'number' && (
            <div>
              <div className="text-xs text-[#8b7664]">Price (USD)</div>
              <div className="font-bold text-white">${usdAmount}</div>
            </div>
          )}

          {ethAmount && (
            <div>
              <div className="text-xs text-[#8b7664]">Amount (ETH)</div>
              <div className="font-mono text-white">{ethAmount} ETH</div>
            </div>
          )}

          <div className="text-sm text-[#e7c8b0]">You will be asked to approve a MetaMask transaction to send the exact ETH amount. This is irreversible on-chain.</div>

          <div className="flex gap-2 mt-4">
            <Button onClick={onClose} className="bg-[#393028]">Cancel</Button>
            <Button onClick={onConfirm} className="bg-[#ff6600]" disabled={loading}>
              {loading ? 'Processing...' : 'Confirm & Pay'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPaymentModal;
