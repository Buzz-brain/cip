import React, { createContext, useContext, useCallback, useState } from 'react';

type OnboardingStep = 'one' | 'two' | null;

interface OnboardingContextType {
  isOpen: boolean;
  currentStep: OnboardingStep;
  open: (step?: OnboardingStep) => void;
  openStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  finish: () => void;
  close: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(null);

  const open = useCallback((step: OnboardingStep = 'one') => {
    setCurrentStep(step);
    setIsOpen(true);
  }, []);

  const openStep = useCallback((step: OnboardingStep) => {
    setCurrentStep(step);
    setIsOpen(true);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === 'one') return 'two';
      return prev;
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === 'two') return 'one';
      return prev;
    });
  }, []);

  const finish = useCallback(() => {
    // Trigger the connect wallet modal
    window.dispatchEvent(new CustomEvent('openConnectWallet'));
    // Close the onboarding modal
    setIsOpen(false);
    setCurrentStep(null);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setCurrentStep(null);
  }, []);

  return (
    <OnboardingContext.Provider value={{ isOpen, currentStep, open, openStep, nextStep, prevStep, finish, close }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}

export type { OnboardingStep };
