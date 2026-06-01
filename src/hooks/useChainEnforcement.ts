import { useState, useEffect, useCallback } from 'react';

const ARBITRUM_MAINNET_CHAIN_ID = '0xa4b1'; // 42161 in hex
const ARBITRUM_MAINNET_DECIMAL = 42161;

interface ChainEnforcementState {
  currentChain: string | null;
  isWrongChain: boolean;
  chainName: string | null;
  isChecking: boolean;
  error: string | null;
}

/**
 * Hook to enforce Arbitrum One (mainnet) chain
 * - Detects current chain on mount and at intervals
 * - Automatically attempts to switch to Arbitrum One
 * - Returns state about current chain and error handling
 */
export function useChainEnforcement(): ChainEnforcementState & {
  switchToArbitrumMainnet: () => Promise<void>;
} {
  const [state, setState] = useState<ChainEnforcementState>({
    currentChain: null,
    isWrongChain: false,
    chainName: null,
    isChecking: true,
    error: null,
  });

  const getChainName = useCallback((chainId: string): string => {
    if (chainId === ARBITRUM_MAINNET_CHAIN_ID || chainId === String(ARBITRUM_MAINNET_DECIMAL)) {
      return 'Arbitrum One';
    }
    const chainMap: Record<string, string> = {
      '0x1': 'Ethereum Mainnet',
      '0x5': 'Goerli',
      '0x11155111': 'Sepolia',
      '0xa4b1': 'Arbitrum One',
    };
    return chainMap[chainId] || `Chain ${chainId}`;
  }, []);

  const switchToArbitrumMainnet = useCallback(async (): Promise<void> => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      setState((prev) => ({
        ...prev,
        error: 'MetaMask not detected',
      }));
      return;
    }

    try {
      // Try to switch to existing chain
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ARBITRUM_MAINNET_CHAIN_ID }],
      });
      setState((prev) => ({
        ...prev,
        currentChain: ARBITRUM_MAINNET_CHAIN_ID,
        isWrongChain: false,
        error: null,
      }));
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        // Chain not added — add it
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ARBITRUM_MAINNET_CHAIN_ID,
                chainName: 'Arbitrum One',
                nativeCurrency: {
                  name: 'Ether',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://arb1.arbitrum.io/rpc'],
                blockExplorerUrls: ['https://arbiscan.io'],
              },
            ],
          });
          setState((prev) => ({
            ...prev,
            currentChain: ARBITRUM_MAINNET_CHAIN_ID,
            isWrongChain: false,
            error: null,
          }));
        } catch (addError) {
          setState((prev) => ({
            ...prev,
            error: 'Failed to add Arbitrum One network',
          }));
        }
      } else if (switchError.code === 4001) {
        // User rejected
        setState((prev) => ({
          ...prev,
          error: 'Chain switch rejected',
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: 'Failed to switch chain',
        }));
      }
    }
  }, []);

  const checkChain = useCallback(async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      setState((prev) => ({
        ...prev,
        isChecking: false,
      }));
      return;
    }

    try {
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      const isWrong = chainId !== ARBITRUM_MAINNET_CHAIN_ID;
      const chainName = getChainName(chainId);

      setState((prev) => ({
        ...prev,
        currentChain: chainId,
        isWrongChain: isWrong,
        chainName,
        isChecking: false,
        error: null,
      }));

      // If on wrong chain, attempt automatic switch
      if (isWrong && chainId !== '0x1' && chainId !== '0xa4b1') {
        // Only auto-switch if not on Mainnet or Arbitrum One
        await switchToArbitrumMainnet();
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isChecking: false,
        error: 'Failed to check chain',
      }));
    }
  }, [switchToArbitrumMainnet, getChainName]);

  // Check chain on mount and set up listener
  useEffect(() => {
    checkChain();

    const ethereum = (window as any).ethereum;
    if (!ethereum) return;

    // Listen for chain change
    const handleChainChanged = () => {
      checkChain();
    };

    ethereum.on('chainChanged', handleChainChanged);

    // Check periodically (every 10 seconds)
    const interval = setInterval(checkChain, 10000);

    return () => {
      ethereum.removeListener?.('chainChanged', handleChainChanged);
      clearInterval(interval);
    };
  }, [checkChain]);

  return {
    ...state,
    switchToArbitrumMainnet,
  };
}
