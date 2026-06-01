import { useState, useEffect } from 'react';
import { useChainEnforcement } from '../../hooks/useChainEnforcement';
import { Button } from './button';

export const ChainAlert = (): JSX.Element | null => {
  const { currentChain, isWrongChain, chainName, isChecking, error, switchToArbitrumMainnet } =
    useChainEnforcement();
  const [dismissed, setDismissed] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // Reset dismissed state if chain changes
  useEffect(() => {
    setDismissed(false);
  }, [isWrongChain]);

  if (isChecking || !isWrongChain || dismissed || !currentChain) {
    return null;
  }

  const handleSwitch = async () => {
    setIsSwitching(true);
    try {
      await switchToArbitrumMainnet();
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-900/95 border-b border-red-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <div className="text-sm text-red-100">
              <span className="block sm:inline">
                <strong>Wrong Network:</strong> Currently connected to{" "}
                <span className="font-semibold text-red-50">{chainName}.</span>
              </span>

              <span className="block sm:inline">
                {" "}
                Please switch to{" "}
                <span className="font-semibold text-red-50">
                  Arbitrum One
                </span>{" "}
                to use this app.
              </span>
            </div>
          </div>
          {error && (
            <div className="text-xs text-red-200 mt-2 sm:mt-0">{error}</div>
          )}

          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <Button
              onClick={handleSwitch}
              disabled={isSwitching}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 h-auto disabled:opacity-50"
            >
              {isSwitching ? "Switching..." : "Switch Network"}
            </Button>
            <button
              onClick={() => setDismissed(true)}
              className="w-full sm:w-auto text-red-200 hover:text-red-50 text-sm px-4 py-2 bg-red-800/30 rounded"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
