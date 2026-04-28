import { Shield, Lock, AlertCircle } from 'lucide-react';
import shieldLockOrangeBorderIcon from '@assets/shield-lock-orange-border.svg';
import { Header } from "./Header";


interface ConfirmationPageProps {
  onConfirm?: () => void;
}

export const SubscriptionRenewal = ({ onConfirm }: ConfirmationPageProps): JSX.Element => {

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221710] text-white [font-family:'Manrope',Helvetica]">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-semibold mb-2">Subscription Renewal</p>
              <p className="text-[#AFA89C]">Secure your legacy by renewing your inheritance plan for another year.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-[#32261A] rounded-2xl text-white">

              <div className='bg-[#EB8125] rounded-t-2xl pt-24 pl-5 flex justify-start align-end'>
                <div className="inline-block bg-[#FFFFFF1A] border border-[#FFFFFF33] backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-6">
                  Premium Plan
                </div>
              </div>


              <div className="flex items-center justify-between gap-3 mb-6 pl-8 pr-8 pt-8">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Legacy Protector</h2>
                  <p className="text-[#C9B292] text-sm">Cross-chain asset distribution</p>
                </div>
                <img src={shieldLockOrangeBorderIcon} className='w-6 h-6' alt="" />
              </div>

              <div className="space-y-4 pt-6 pb-8 border-t border-[#674D32] m-8">
                <div className="flex items-center justify-between">
                  <span className="text-[#C9B292]">Renewal Date</span>
                  <span className="font-semibold">Dec 31, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#C9B292]">Amount Due</span>
                  <span className="text-lg font-bold">$120.00 <span className="text-base text-[#B8AA94] font-semibold">/ year</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#C9B292]">Status</span>
                  <div className="flex items-center gap-2 px-4 py-1 rounded-3xl bg-[#F59E0B1A] border border-[#F59E0B33]">
                    <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse"></div>
                    <span className="text-[#FBBF24] text-sm font-medium">Action Required</span>
                  </div>
                </div>


              </div>
            </div>

            <div className="bg-[#8A5D1E33] rounded-xl border border-[#AF531E] p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#FF6600] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#DBEAFE] text-sm">Your plan includes coverage for up to 5 wallets across Ethereum, BSC, and Polygon networks.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-[#32261A] rounded-xl border border-[#674D32] p-8">
              <h3 className="text-white text-xl font-semibold mb-6">Select Payment Method</h3>

              <div className="flex gap-4 mb-4 pb-6 border-b border-neutral-800">
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
                    { name: 'USDT', sub: 'Tether', icon: 'T', color: 'teal' },
                    { name: 'USDC', sub: 'USD Coin', icon: '$', color: 'blue' },
                    { name: 'ETH', sub: 'Ethereum', icon: '◆', color: 'purple' },
                    { name: 'BNB', sub: 'Binance', icon: '◆', color: 'yellow' }
                  ].map((token, idx) => (
                    <button
                      key={token.name}
                      className={`p-4 rounded-lg border-2 transition ${idx === 0
                          ? 'bg-[#FF66001A] border-[#FF6600]'
                          : 'bg-[#221710] border-[#674D32] hover:border-neutral-600'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex font-normal items-center justify-center text-2xl ${idx === 0 ? 'bg-[#26A17B] text-white' : 'bg-[#CA7027] text-white'
                        }`}>
                        {token.icon}
                      </div>
                      <div className={`font-semibold mb-1 ${idx === 0 ? 'text-white' : 'text-white'}`}>
                        {token.name}
                      </div>
                      <div className="text-[#C9B292] text-xs">{token.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Network</label>
                <select className="w-full bg-[#221710] border border-[#674D32] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500">
                  <option>Select network</option>
                  <option>ERC-20</option>
                  <option>BEP-20</option>
                  <option>TRC-20</option>
                </select>
              </div>

              <div className="bg-[#221710] border border-[#674D32] rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#C9B292]">Subtotal</span>
                  <span className="text-white">$120.00</span>
                </div>
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#674D32]">
                  <span className="text-[#C9B292]">Estimated Network Fee</span>
                  <span className="text-white">~$4.50 (0.002 ETH)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg font-semibold">Total</span>
                  <div className="text-right">
                    <div className="text-white text-xl font-bold">120.00 USDT</div>
                    <div className="text-[#C9B292] text-sm">+ gas fees</div>
                  </div>
                </div>
              </div>

              <button
                onClick={onConfirm}
                className="w-full bg-[#FF6600] hover:bg-orange-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition mb-4"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Confirm & Pay 120.00 USDT
              </button>

              <button className="w-full text-[#C9B292] hover:text-white py-3 font-medium transition">
                Cancel Subscription
              </button>

              <p className="text-center text-[#917058] text-sm mt-6">
                By confirming, you agree to the Terms of Service. Secure payment processed via Smart Contract.
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 mt-6 text-[#8B7464] text-sm">
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
