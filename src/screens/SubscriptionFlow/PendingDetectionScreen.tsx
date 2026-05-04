import React, { useEffect, useState } from 'react';

interface PendingDetectionScreenProps {
  userWallet: string;
  walletAddress: string;
  ethAmount: string;
  onDetected: (tx: any) => void;
  onError: (msg: string) => void;
  etherscanApiKey: string;
}

const POLL_INTERVAL = 10000; // 10 seconds
const TIMEOUT = 10 * 60 * 1000; // 10 minutes

const PendingDetectionScreen: React.FC<PendingDetectionScreenProps> = ({ userWallet, walletAddress, ethAmount, onDetected, onError, etherscanApiKey }) => {
  const [elapsed, setElapsed] = useState(0);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let poller: NodeJS.Timeout;
    let start = Date.now();

    const poll = async () => {
      try {
        const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === '1' && Array.isArray(data.result)) {
          const now = Math.floor(Date.now() / 1000);
          const validTx = data.result.find((tx: any) =>
            tx.to?.toLowerCase() === walletAddress.toLowerCase() &&
            tx.from?.toLowerCase() === userWallet.toLowerCase() &&
            tx.value === (BigInt(Number(ethAmount) * 1e18)).toString() &&
            now - Number(tx.timeStamp) < 600 &&
            Number(tx.confirmations) > 1
          );
          if (validTx) {
            setPolling(false);
            onDetected(validTx);
            return;
          }
        }
      } catch (e) {
        onError('Network error while polling Etherscan.');
        setPolling(false);
        return;
      }
      poller = setTimeout(poll, POLL_INTERVAL);
    };
    poll();
    timer = setInterval(() => setElapsed(Date.now() - start), 1000);
    const timeout = setTimeout(() => {
      setPolling(false);
      onError('Transaction not detected within 10 minutes.');
    }, TIMEOUT);
    return () => {
      clearTimeout(poller);
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [userWallet, walletAddress, ethAmount, etherscanApiKey, onDetected, onError]);

  return (
    <div className="max-w-md mx-auto py-8 text-center">
      <div className="mb-4">
        <span className="loader inline-block mr-2" />
        Waiting for your transaction to be detected on-chain...
      </div>
      <div className="mb-2">Elapsed time: {Math.floor(elapsed / 1000)}s</div>
      <div className="text-sm text-gray-500">Polling Sepolia every 10 seconds</div>
    </div>
  );
};

export default PendingDetectionScreen;
