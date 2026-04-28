import { useState } from 'react';
import { Copy, ArrowRight } from 'lucide-react';
import { Header } from "./Header";
import timeClockGreenBorderIcon from "@assets/time-clock-green-border.svg"
import  scanImg from "@assets/scan.svg"

interface PaymentPageProps {
  onConfirm?: () => void;
}

export const SecureCheckout = ({ onConfirm }: PaymentPageProps): JSX.Element => {
    const [payOption, setPayOption] = useState<'paywithcrypto' | 'paywithcard'>('paywithcrypto');
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221710] text-white [font-family:'Manrope',Helvetica]">
      <Header />


      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#393128] flex items-center justify-center text-white text-sm font-medium">1</div>
            <span className="text-[#B9AF9D] text-sm">Select Plan</span>
            <div className="w-12 h-px bg-[#393128] mx-2"></div>
            <div className="w-8 h-8 rounded-full bg-[#FF6600] flex items-center justify-center text-white text-sm font-medium">2</div>
            <span className="text-white text-sm font-medium">Payment</span>
            <div className="w-12 h-px bg-[#393128] mx-2"></div>
            <div className="w-8 h-8 rounded-full border border-[#393128] flex items-center justify-center text-white text-sm font-medium">3</div>
            <span className="text-[#B9AF9D] text-sm">Confirmation</span>
          </div>
        </div>


<div className='flex gap-8'>
<div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
            <p className="text-3xl font-semibold mb-2">Secure Checkout</p>
            <p className="text-[#AFA89C]">Complete your subscription to activate your inheritance plan.</p>
            </div>
          </div>
        </div>

        <div className="flex mb-6 bg-[#181511] border border-[#393128] rounded-lg p-1">
          <button
            onClick={() => setPayOption('paywithcrypto')}
            className={`flex-1 px-6 py-2.5 rounded-md transition ${payOption === 'paywithcrypto' ? 'bg-[#393128] text-white' : 'text-[#B9AF9D] hover:text-white'
              }`}
          >
            Pay With Crypto
          </button>
          <button
            onClick={() => setPayOption('paywithcard')}
            className={`flex-1 px-6 py-2.5 rounded-md transition ${payOption === 'paywithcard' ? 'bg-[#393128] text-white' : 'text-[#B9AF9D] hover:text-white'
              }`}
          >
            Pay With Card
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className="bg-[#181511] rounded-xl border border-[#393128]">
              <div className="p-6 space-y-8">
                <div>
                  <h3 className="text-white font-medium mb-4">1. Select Currency</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { name: 'USDT', icon: '⊕', active: true },
                      { name: 'USDC', icon: '$', active: false },
                      { name: 'ETH', icon: 'E', active: false },
                      { name: 'BNB', icon: 'B', active: false }
                    ].map((currency) => (
                      <button
                        key={currency.name}
                        className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-2 ${currency.active
                            ? 'bg-[#FF66001A] border-[#FF6600]'
                            : 'bg-transparent border-[#393128] hover:border-neutral-600'
                          }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${currency.active ? 'bg-teal-500/20 text-teal-400' : 'bg-neutral-800 text-white'
                          }`}>
                          {currency.icon}
                        </div>
                        <span className={currency.active ? 'text-white font-medium' : 'text-white'}>
                          {currency.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">2. Select Network</h3>
                  <select className="w-full bg-[#181511] border border-[#9DABB94D] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500">
                    <option>Select network</option>
                    <option>ERC-20</option>
                    <option>BEP-20</option>
                    <option>TRC-20</option>
                  </select>
                  <div className="mt-3 bg-[#EAB3081A] border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="text-[#FEF08A] font-medium text-sm">
                          Ensure you select the <span className='text-white'>ERC-20</span> network. Sending funds via any other network may result in permanent loss.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">3. Transfer Details</h3>
                  <div className="flex gap-6 bg-[#0B0E11] border-2 border-[#393128] border-dashed p-8 rounded-2xl">
                    <div className="w-44 h-44 flex items-center justify-center">
                       <img src={scanImg} alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <div className="text-[#B9AF9D] text-lg mb-2">Send exact amount:</div>
                        <div className="text-white text-3xl font-bold">120.00 <span className="text-orange-500 text-xl font-normal">USDT</span></div>
                      </div>
                      <div>
                        <div className="text-[#B9AF9D] text-lg mb-2">To this address:</div>
                        <div className="flex items-center gap-2 bg-[#393328] border border-neutral-700 rounded-lg px-4 py-3">
                          <span className="text-white text-sm flex-1">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
                          <button className="text-neutral-400 hover:text-white transition">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm">
                        <img src={timeClockGreenBorderIcon} alt="" />
                        <span className='text-[#B9AF9D]'>Rate guaranteed for 14:32</span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className='border-[#393128]' />

                <button
                  onClick={onConfirm}
                  className="w-full bg-[#FF6600] hover:bg-orange-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  I have sent the funds
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-[#B9AF9D] text-md">
                  By confirming, you agree to the CIP Protocol <a href="#" className="text-[#FF6600] hover:text-orange-400">Terms of Service</a>.
                </p>
              </div>
            </div>
          </div>
        </div>


</div>

          <div className="bg-[#181511] rounded-xl border border-[#393128] p-6 pt-36 h-fit">
            <h3 className="text-white text-lg font-semibold mb-1">Order Summary</h3>
            <p className="text-[#B9AF9D] text-sm mb-6">Billed annually. Next billing: Oct 26, 2024</p>

            <div className="space-y-4 mb-6 text-sm pb-5 border-b border-t pt-5 border-[#393128]">
              <div className="flex items-center justify-between">
                <span className="text-[#B9AF9D]">SafeVault Pro Plan</span>
                <span className="text-white">$120.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#B9AF9D]">Cross-chain Fee</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#B9AF9D]">Tax (0%)</span>
                <span className="text-white">$0.00</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#B9AF9D]">Total Due</span>
                  <div className="text-orange-500 text-sm">Change Plan</div>
                </div>
                

                <div className="text-right">
                  <div className="text-white text-2xl font-bold">$120.00</div>
              <div className="text-right text-[#B9AF9D] text-xs">USD Equivalent</div>
                </div>
              </div>
            </div>
          </div>
</div>



      </div>
    </div>
  );
}
