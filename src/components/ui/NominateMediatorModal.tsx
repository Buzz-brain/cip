import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { toast } from 'react-toastify';

interface NominateMediatorModalProps {
  open: boolean;
  planId: number | null;
  onSubmit: (payload: { full_name: string; email: string; wallet: string; dispute_id?: number }) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
}

export const NominateMediatorModal: React.FC<NominateMediatorModalProps> = ({ open, planId, onSubmit, onClose, loading = false }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !wallet) {
      toast.error('Please fill all fields');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({ full_name: fullName, email, wallet });
      setFullName('');
      setEmail('');
      setWallet('');
    } catch (err: any) {
      const errMsg = err?.message ?? 'Failed to nominate mediator';
      console.error('[NominateMediatorModal] error:', errMsg);
      
      // Check for specific error cases
      if (errMsg.includes('must raise a dispute') || errMsg.includes('dispute_id')) {
        toast.error('You must raise a dispute first before nominating a mediator.');
      } else if (errMsg.includes('422')) {
        toast.error('Validation error: Please ensure all fields are correct and a dispute exists.');
      } else {
        toast.error(errMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#1f1915] border border-[#3a2f1e] rounded-lg w-[90%] max-w-md p-6 z-70">
        <h3 className="text-white font-bold mb-4">Nominate Mediator</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">
              Full Name
            </label>
            <Input
              className="text-white"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Mediator full name"
            />
          </div>

          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">Email</label>
            <Input
              className="text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mediator@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">
              Wallet Address
            </label>
            <Input
              className="text-white"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x..."
            />
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              onClick={onClose}
              className="bg-[#393028]"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#2ccd2c]"
              disabled={submitting || loading || !fullName || !email || !wallet}
            >
              {submitting || loading ? "Submitting..." : "Nominate Mediator"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NominateMediatorModal;
