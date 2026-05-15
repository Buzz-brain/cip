import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../context/OnboardingContext';
import OnboardingContent from './OnboardingContent';
import OnboardingProgressBar from './OnboardingProgressBar';

const OnboardingModal: React.FC = () => {
  const { isOpen, currentStep, close, nextStep, finish, prevStep } = useOnboarding();

  if (!isOpen || currentStep === null) return null;

  const handleNextStep = () => {
    nextStep();
  };

  const handleFinish = () => {
    finish();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

      <div className="relative z-10 w-full sm:max-w-4xl px-4 pb-6 sm:pb-0">
        <div className="bg-[#0d0501] w-full rounded-t-xl sm:rounded-xl shadow-2xl ring-1 ring-black/50 overflow-hidden max-h-[90vh]">
          {/* Close button matches ConnectWallet modal */}
          <button
            aria-label="Close onboarding"
            onClick={close}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 bg-black/30 hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <span className="text-lg leading-none">×</span>
          </button>

          {/* Progress Bar */}
          <OnboardingProgressBar currentStep={currentStep as 'one' | 'two'} />

          {/* Content with slide animation */}
          <div className="w-full overflow-y-auto scrollbar-thin-custom pr-2 max-h-[calc(90vh-120px)] relative">
            <AnimatePresence mode="wait" custom={1}>
              <motion.div
                key={currentStep}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                <OnboardingContent
                  step={currentStep as 'one' | 'two'}
                  onNextStep={handleNextStep}
                  onFinish={handleFinish}
                  onPrev={prevStep}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
