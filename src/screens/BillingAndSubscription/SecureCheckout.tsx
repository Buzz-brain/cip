import { Copy, ArrowRight } from 'lucide-react';

interface PaymentPageProps {
  onConfirm?: () => void;
}

export const SecureCheckout = ({ onConfirm }: PaymentPageProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-neutral-950">
      <nav className="bg-black border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded"></div>
            </div>
            <span className="text-white font-semibold text-lg">CIP Protocol</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-neutral-400 text-sm font-medium">1</div>
            <span className="text-neutral-400 text-sm">Select Plan</span>
            <div className="w-12 h-px bg-neutral-700 mx-2"></div>
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-medium">2</div>
            <span className="text-white text-sm font-medium">Payment</span>
            <div className="w-12 h-px bg-neutral-700 mx-2"></div>
            <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-neutral-400 text-sm font-medium">3</div>
            <span className="text-neutral-400 text-sm">Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <p className="text-neutral-400 mb-6">Complete your subscription to activate your inheritance plan.</p>

            <div className="bg-neutral-900 rounded-xl border border-neutral-800">
              <div className="flex border-b border-neutral-800">
                <button className="flex-1 py-4 px-6 text-white font-medium border-b-2 border-orange-500 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pay with Crypto
                </button>
                <button className="flex-1 py-4 px-6 text-neutral-400 hover:text-white transition flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Pay with Card
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-4">1. Select Currency</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { name: 'USDT', icon: '⊕', active: true },
                      { name: 'USDC', icon: '$', active: false },
                      { name: 'ETH', icon: '◆', active: false },
                      { name: 'BNB', icon: '◆', active: false }
                    ].map((currency) => (
                      <button
                        key={currency.name}
                        className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                          currency.active
                            ? 'bg-neutral-800 border-orange-500'
                            : 'bg-black border-neutral-700 hover:border-neutral-600'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                          currency.active ? 'bg-teal-500/20 text-teal-400' : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {currency.icon}
                        </div>
                        <span className={currency.active ? 'text-white font-medium' : 'text-neutral-400'}>
                          {currency.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">2. Select Network</h3>
                  <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500">
                    <option>Select network</option>
                    <option>ERC-20</option>
                    <option>BEP-20</option>
                    <option>TRC-20</option>
                  </select>
                  <div className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="text-yellow-500 font-medium text-sm">
                          Ensure you select the ERC-20 network. Sending funds via any other network may result in permanent loss.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">3. Transfer Details</h3>
                  <div className="flex gap-6">
                    <div className="w-44 h-44 bg-white rounded-lg p-4 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-teal-500 to-teal-700 rounded flex items-center justify-center">
                        <div className="w-32 h-32 bg-white rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <div className="text-neutral-400 text-sm mb-2">Send exact amount:</div>
                        <div className="text-white text-3xl font-bold">120.00 <span className="text-orange-500 text-xl">USDT</span></div>
                      </div>
                      <div>
                        <div className="text-neutral-400 text-sm mb-2">To this address:</div>
                        <div className="flex items-center gap-2 bg-black border border-neutral-700 rounded-lg px-4 py-3">
                          <span className="text-white font-mono text-sm flex-1">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
                          <button className="text-neutral-400 hover:text-white transition">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Rate guaranteed for 14:32</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onConfirm}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  I have sent the funds
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-neutral-500 text-sm">
                  By confirming, you agree to the CIP Protocol <a href="#" className="text-orange-500 hover:text-orange-400">Terms of Service</a>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 h-fit">
            <h3 className="text-white text-lg font-semibold mb-4">Order Summary</h3>
            <p className="text-neutral-400 text-sm mb-6">Billed annually. Next billing: Oct 26, 2024</p>

            <div className="space-y-4 mb-6 pb-6 border-b border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">SafeVault Pro Plan</span>
                <span className="text-white">$120.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Cross-chain Fee</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Tax (0%)</span>
                <span className="text-white">$0.00</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Total Due</span>
                <div className="text-right">
                  <div className="text-white text-3xl font-bold">$120.00</div>
                  <div className="text-orange-500 text-sm">Change Plan</div>
                </div>
              </div>
              <div className="text-right text-neutral-400 text-sm">USD Equivalent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
