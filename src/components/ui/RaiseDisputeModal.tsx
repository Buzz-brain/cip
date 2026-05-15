import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Card, CardContent } from './card';
import { toast } from 'react-toastify';

interface RaiseDisputeModalProps {
  open: boolean;
  planId: number | null;
  reasons: string[];
  onSubmit: (reason: string, description: string, file: File) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
}

export const RaiseDisputeModal: React.FC<RaiseDisputeModalProps> = ({
  open,
  planId,
  reasons,
  onSubmit,
  onClose,
  loading = false,
}) => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !description || !file) {
      toast.error('Please fill all fields and select a file');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(reason, description, file);
      setReason('');
      setDescription('');
      setFile(null);
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to raise dispute');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#1f1915] border border-[#3a2f1e] rounded-lg w-[90%] max-w-md p-6 z-70">
        <h3 className="text-white font-bold mb-4">Raise a Dispute</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#2d241a] border border-[#554233] text-white rounded px-3 py-2"
            >
              <option value="">Select a reason</option>
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the dispute..."
              className="w-full bg-[#2d241a] border border-[#554233] text-white rounded px-3 py-2 h-24"
            />
          </div>

          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">Evidence (PDF only)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-white"
            />
            {file && <p className="text-xs text-[#8b7664] mt-1">{file.name}</p>}
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={onClose} className="bg-[#393028]" disabled={submitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#ff6600]"
              disabled={submitting || loading || !reason || !description || !file}
            >
              {submitting || loading ? 'Submitting...' : 'Raise Dispute'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
