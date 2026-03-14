import { Shield, Lock, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GracePeriodActivePageProps {
  onConfirm?: () => void;
}

export const GracePeriodActive = ({ onConfirm }: GracePeriodActivePageProps): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950">
      <nav className="bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded"></div>
            </div>
            <span className="text-white font-semibold text-lg">CIP Protocol</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-neutral-400 hover:text-white transition">Dashboard</a>
            <a href="#" className="text-neutral-400 hover:text-white transition">Plans</a>
            <a href="#" className="text-neutral-400 hover:text-white transition">Settings</a>
            <button className="w-9 h-9 bg-neutral-700 rounded-full"></button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-neutral-400 text-center mb-12">Secure your legacy by renewing your inheritance plan for another year.</p>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-6">
                Premium Plan
              </div>

              <div className="flex items-start gap-3 mb-6">
                <Shield className="w-8 h-8 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Legacy Protector</h2>
                  <p className="text-orange-100 text-sm">Cross-chain asset distribution</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-orange-100">Renewal Date</span>
                  <span className="font-semibold">Dec 31, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-100">Amount Due</span>
                  <span className="text-2xl font-bold">$120.00 <span className="text-base font-normal">/ year</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-100">Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                    <span className="text-yellow-300 text-sm font-medium">Action Required</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-2">Grace Period Active</h4>
                  <p className="text-neutral-400 text-sm mb-4">We were unable to process your recent renewal payment for the Premium Cross-Chain Plan.</p>
                </div>
              </div>

              <div className="bg-neutral-900 rounded-lg p-4 mb-4">
                <div className="text-orange-500 text-sm font-medium mb-3">Time Remaining until Service Suspension</div>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="text-neutral-400 text-xs">Days</div>
                  </div>
                  <div className="text-orange-500">:</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-neutral-400 text-xs">Hours</div>
                  </div>
                  <div className="text-orange-500">:</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-neutral-400 text-xs">Minutes</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <div className="text-white text-sm font-medium">Inheritance Plan Paused</div>
                    <div className="text-neutral-400 text-xs">Assets will not be distributed if a trigger event occurs during downtime.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <div className="text-white text-sm font-medium">Validators Deactivated</div>
                    <div className="text-neutral-400 text-xs">Cross-chain verification nodes will be taken offline.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <div className="text-white text-sm font-medium">Failed Method</div>
                    <div className="text-neutral-400 text-xs">Visa ending in •••• 4242</div>
                    <div className="text-red-400 text-xs font-medium mt-1">Expired</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-8">
              <h3 className="text-white text-xl font-semibold mb-6">Select Payment Method</h3>

              <div className="flex gap-4 mb-8 pb-6 border-b border-neutral-800">
                <button className="flex-1 py-3 px-4 bg-neutral-800 border-2 border-orange-500 rounded-lg text-white font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pay with Crypto
                </button>
                <button className="flex-1 py-3 px-4 bg-black border-2 border-neutral-700 rounded-lg text-neutral-400 font-medium flex items-center justify-center gap-2 hover:border-neutral-600 transition">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Pay with Card
                </button>
              </div>

              <div className="mb-6">
                <label className="text-white font-medium mb-4 block">Select Token</label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: 'USDT', sub: 'Tether', icon: '⊕', color: 'teal' },
                    { name: 'USDC', sub: 'USD Coin', icon: '$', color: 'blue' },
                    { name: 'ETH', sub: 'Ethereum', icon: '◆', color: 'purple' },
                    { name: 'BNB', sub: 'Binance', icon: '◆', color: 'yellow' }
                  ].map((token, idx) => (
                    <button
                      key={token.name}
                      className={`p-4 rounded-lg border-2 transition ${
                        idx === 0
                          ? 'bg-neutral-800 border-orange-500'
                          : 'bg-black border-neutral-700 hover:border-neutral-600'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl ${
                        idx === 0 ? 'bg-teal-500/20 text-teal-400' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {token.icon}
                      </div>
                      <div className={`font-semibold mb-1 ${idx === 0 ? 'text-white' : 'text-neutral-400'}`}>
                        {token.name}
                      </div>
                      <div className="text-neutral-500 text-xs">{token.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Network</label>
                <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500">
                  <option>Select network</option>
                  <option>ERC-20</option>
                  <option>BEP-20</option>
                  <option>TRC-20</option>
                </select>
              </div>

              <div className="bg-black border border-neutral-800 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="text-white">$120.00</span>
                </div>
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-800">
                  <span className="text-neutral-400">Estimated Network Fee</span>
                  <span className="text-white">~$4.50 (0.002 ETH)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <div className="text-right">
                    <div className="text-white text-2xl font-bold">120.00 USDT</div>
                    <div className="text-orange-500 text-sm">+ gas fees</div>
                  </div>
                </div>
              </div>

              <button
                onClick={onConfirm}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition mb-4"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Confirm & Pay 120.00 USDT
              </button>

              <button className="w-full text-neutral-400 hover:text-white py-3 font-medium transition">
                Cancel Subscription
              </button>

              <p className="text-center text-neutral-500 text-sm mt-6">
                By confirming, you agree to the Terms of Service. Secure payment processed via Smart Contract.
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 mt-6 text-neutral-500 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Audited by CertiK</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>AES-256 Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
