import { useState, useEffect } from 'react';
import { useChainEnforcement } from '../../hooks/useChainEnforcement';
import { Button } from './button';

export const ChainAlert = (): JSX.Element | null => {
  const { currentChain, isWrongChain, chainName, isChecking, error, switchToArbitrumSepolia } =
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
      await switchToArbitrumSepolia();
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-900/90 border-b border-red-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <div className="text-sm text-red-100">
            <strong>Wrong Network:</strong> Currently connected to{' '}
            <span className="font-semibold text-red-50">{chainName}</span>. Please switch to{' '}
            <span className="font-semibold text-red-50">Arbitrum Sepolia</span> to use this app.
          </div>
          {error && <span className="text-xs text-red-200 ml-2">({error})</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={handleSwitch}
            disabled={isSwitching}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 h-auto disabled:opacity-50"
          >
            {isSwitching ? 'Switching...' : 'Switch Network'}
          </Button>
          <button
            onClick={() => setDismissed(true)}
            className="text-red-200 hover:text-red-50 text-lg leading-none px-2"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
