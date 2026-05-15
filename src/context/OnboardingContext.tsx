import React, { createContext, useContext, useCallback, useState } from 'react';

type OnboardingStep = 'one' | 'two' | 'three' | null;

interface OnboardingContextType {
  isOpen: boolean;
  currentStep: OnboardingStep;
  open: (step?: OnboardingStep) => void;
  openStep: (step: OnboardingStep) => void;
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

  const close = useCallback(() => {
    setIsOpen(false);
    setCurrentStep(null);
  }, []);

  return (
    <OnboardingContext.Provider value={{ isOpen, currentStep, open, openStep, close }}>
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
