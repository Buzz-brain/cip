import { useConnectWallet } from '../context/ConnectWalletContext';
import ConnectWalletModal from './ConnectWalletModal';

export const ConnectWalletModalWrapper = (): JSX.Element | null => {
  const { isOpen, closeModal } = useConnectWallet();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={closeModal}
      />

      {/* Modal container: bottom sheet on mobile, centered on desktop */}
      <div className="relative z-10 w-full sm:max-w-3xl px-4 pb-6 sm:pb-0">
        <div className="bg-[#221810] w-full rounded-t-xl sm:rounded-xl shadow-xl overflow-hidden max-h-[90vh]">
          {/* Close button */}
          <button
            aria-label="Close connect wallet"
            onClick={closeModal}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 bg-black/30 hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <span className="text-lg leading-none">×</span>
          </button>

          {/* Modal content (scrollable) */}
          <div className="w-full overflow-y-auto scrollbar-thin-custom pr-2">
            <ConnectWalletModal onClose={closeModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModalWrapper;
