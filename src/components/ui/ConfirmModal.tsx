import React from 'react';

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ open, title = 'Confirm', description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', loading = false, onConfirm, onCancel }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className="relative bg-[#0b0908] border border-[#2a2520] rounded-lg max-w-lg w-full p-6 mx-4">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        {description && <p className="text-gray-400 mt-2 text-sm">{description}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-[#27231c] rounded text-sm">{cancelLabel}</button>
          <button onClick={onConfirm} disabled={loading} className="px-4 py-2 bg-red-600 rounded text-sm text-white disabled:opacity-60">
            {loading ? 'Working...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
