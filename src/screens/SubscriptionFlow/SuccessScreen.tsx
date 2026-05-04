import React, { useEffect, useState } from 'react';

interface SuccessScreenProps {
  plan: { id: number; name: string };
  userToken: string;
  xcipHeader: string;
  onDone: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ plan, userToken, xcipHeader, onDone }) => {
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://xcip.name.ng/auth/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xcip-header': xcipHeader, // TODO: Move to backend env before production
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({ pricing_id: plan.id, months: 1 }),
    })
      .then(res => {
        if (res.status === 201) {
          setStatus('success');
        } else {
          return res.json().then(data => { throw new Error(data.message || 'Subscription failed'); });
        }
      })
      .catch(e => {
        setStatus('error');
        setError(e.message);
      });
  }, [plan, userToken, xcipHeader]);

  if (status === 'pending') {
    return <div className="max-w-md mx-auto py-8 text-center">Payment confirmed! Subscribing you now...</div>;
  }
  if (status === 'success') {
    return <div className="max-w-md mx-auto py-8 text-center">You are now subscribed to <b>{plan.name}</b>! 🎉<br /><button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={onDone}>Done</button></div>;
  }
  return <div className="max-w-md mx-auto py-8 text-center text-red-600">{error || 'An error occurred.'}</div>;
};

export default SuccessScreen;
