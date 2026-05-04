import React, { useState } from 'react';

interface PaymentScreenProps {
  plan: { id: number; name: string; price: number };
  onPaymentInitiated: (userWallet: string) => void;
  walletAddress: string;
  ethAmount: string;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ plan, onPaymentInitiated, walletAddress, ethAmount }) => {
  const [userWallet, setUserWallet] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProceed = () => {
    if (!userWallet || !/^0x[a-fA-F0-9]{40}$/.test(userWallet)) {
      setError('Please enter a valid Ethereum wallet address.');
      return;
    }
    setError(null);
    onPaymentInitiated(userWallet);
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Subscribe to {plan.name}</h2>
      <div className="mb-2">Price: {plan.price === 0 ? 'Free' : `$${plan.price}`}</div>
      <div className="mb-2">Network: <b>Sepolia Testnet</b></div>
      <div className="mb-2">Send exactly <b>{ethAmount} ETH</b> to:</div>
      <div className="mb-2 flex items-center">
        <span className="font-mono bg-gray-100 px-2 py-1 rounded mr-2">{walletAddress}</span>
        <button onClick={() => navigator.clipboard.writeText(walletAddress)} className="text-blue-600 underline">Copy</button>
      </div>
      <div className="mb-2">Your Wallet Address (for verification):</div>
      <input
        className="border px-2 py-1 rounded w-full mb-2"
        value={userWallet}
        onChange={e => setUserWallet(e.target.value)}
        placeholder="0x..."
      />
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleProceed}>
        I've sent the payment
      </button>
    </div>
  );
};

export default PaymentScreen;
