import React from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import OnboardingContent from './OnboardingContent';
import { Button } from '@components/ui/button';

const StepOneContent: React.FC<{ openConnect: () => void; navigateHome: () => void }> = ({ openConnect }) => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-white mb-2">Secure Your Legacy</h2>
      <p className="text-gray-300 mb-4">Ensure your digital assets are safely transferred to your loved ones using advanced decentralized cryptography.</p>

      <div className="flex gap-3">
        <Button className="bg-[#ff6600]" onClick={openConnect}>Connect Wallet</Button>
        <Button variant="outline" onClick={() => {}}>Learn More</Button>
      </div>
    </div>
  );
};

const StepTwoContent: React.FC<{ onNext: () => void; onBack: () => void; openConnect: () => void }> = ({ onNext, onBack, openConnect }) => {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">MPC Sharing Technology</h2>
        <div className="text-sm text-gray-400">Step 2 of 4</div>
      </div>

      <p className="text-gray-300 mb-4">Your private key is never stored in one place. It is split into shards using MPC.</p>

      <div className="flex gap-3 mt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} className="bg-[#ff6600]">Next Step</Button>
        <Button variant="ghost" onClick={openConnect}>Connect Wallet</Button>
      </div>
    </div>
  );
};

const ProgressBar: React.FC<{ step: number; total: number }> = ({ step, total }) => {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full mb-4">
      <div className="w-full h-2 bg-[#2b241d] rounded-full overflow-hidden">
        <div className="h-2 bg-[#ff6600]" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-gray-400 mt-2">{step} of {total} steps</div>
    </div>
  );
};

const OnboardingModal: React.FC = () => {
  const { isOpen, currentStep, close, openStep } = useOnboarding();
  if (!isOpen) return null;

  const stepIndex = currentStep === 'one' ? 1 : currentStep === 'two' ? 2 : 1;

  const openConnect = () => {
    // trigger the global connect wallet modal by dispatching a custom event
    window.dispatchEvent(new CustomEvent('openConnectWallet'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={close} />

      <div className="relative z-10 w-full sm:max-w-4xl px-4 pb-6 sm:pb-0">
        <div className="bg-[#0d0501] w-full rounded-t-xl sm:rounded-xl shadow-xl overflow-hidden max-h-[90vh]">
          {/* Close button matches ConnectWallet modal */}
          <button
            aria-label="Close onboarding"
            onClick={close}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 bg-black/30 hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <span className="text-lg leading-none">×</span>
          </button>

          <div className="w-full overflow-y-auto scrollbar-thin-custom pr-2 max-h-[82vh]">
            <div className="p-4 border-b border-[#2b241d]"><!-- progress placeholder to preserve spacing --></div>
            {/* Render the same content/design used in StepOne/StepTwo */}
            <OnboardingContent step={currentStep ?? 'one'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
