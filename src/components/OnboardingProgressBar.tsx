import React from 'react';

interface OnboardingProgressBarProps {
  currentStep: 'one' | 'two';
}

const OnboardingProgressBar: React.FC<OnboardingProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Step One', key: 'one' },
    { number: 2, title: 'Step Two', key: 'two' },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="w-full px-4 sm:px-6 py-6 border-b border-[#3b2e1e]">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            {/* Step Circle */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all duration-300
                  ${
                    index <= currentStepIndex
                      ? 'bg-[#ff6600] text-white'
                      : 'bg-[#3b2e1e] text-[#8b7c64]'
                  }
                `}
              >
                {index + 1}
              </div>
              <span className={`
                text-xs font-medium mt-2 text-center
                transition-all duration-300
                ${
                  index <= currentStepIndex
                    ? 'text-white'
                    : 'text-[#8b7c64]'
                }
              `}>
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mb-6 rounded-full mx-1 transition-all duration-300" style={{
                background: index < currentStepIndex 
                  ? 'linear-gradient(to right, #ff6600, #ff6600)' 
                  : 'linear-gradient(to right, #ff6600, #3b2e1e)'
              }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OnboardingProgressBar;
