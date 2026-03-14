import { Download, CreditCard, Wallet, Link as LinkIcon, FileText, MessageCircle } from 'lucide-react';

interface BillingPaymentPageProps {
  onUpgrade?: () => void;
}

export const BillingAndPayment = ({ onUpgrade }: BillingPaymentPageProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-neutral-900">
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
            <a href="#" className="text-neutral-400 hover:text-white transition">Vaults</a>
            <a href="#" className="text-neutral-400 hover:text-white transition">Beneficiaries</a>
            <a href="#" className="text-orange-500">Settings</a>
            <a href="#" className="text-neutral-400 hover:text-white transition">Help</a>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-9 h-9 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="text-sm text-neutral-500 mb-6">Settings /</div>
          <div className="flex items-center justify-between">
            <p className="text-neutral-400">Manage your subscription tier, payment methods, and view transaction history for your inheritance vaults.</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition">
              <Download className="w-4 h-4" />
              Download All Invoices
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-white text-xl font-semibold">Current Plan: Shield Plus</h2>
                    <span className="bg-green-500/20 text-green-400 px-2.5 py-1 rounded text-xs font-medium">Active</span>
                  </div>
                  <p className="text-neutral-400 text-sm">Next billing date: November 1, 2023</p>
                </div>
                <div className="flex gap-3">
                  <button className="text-neutral-400 hover:text-white px-4 py-2 rounded-lg border border-neutral-600 hover:border-neutral-500 transition">
                    Cancel Plan
                  </button>
                  <button
                    onClick={onUpgrade}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition"
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="text-neutral-400 text-sm mb-1">Plan Cost</div>
                  <div className="text-white text-2xl font-semibold">$29.00 <span className="text-neutral-400 text-base font-normal">/ mo</span></div>
                </div>
                <div>
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="text-neutral-400 text-sm mb-1">Renewal Type</div>
                  <div className="text-white text-lg font-medium">Auto-Renewal</div>
                </div>
                <div>
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-neutral-400 text-sm mb-1">Security Level</div>
                  <div className="text-white text-lg font-medium">Multi-Sig</div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h3 className="text-white text-lg font-semibold mb-4">Vault Utilization</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400 text-sm">Active Inheritance Vaults</span>
                    <span className="text-white font-medium">3 / 5</span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-neutral-500 text-xs mt-1">Upgrade to Enterprise for unlimited vaults.</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400 text-sm">Beneficiaries Added</span>
                    <span className="text-white font-medium">12 / 20</span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Billing History</h3>
                <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">View All</button>
              </div>

              <div className="space-y-3">
                {[
                  { id: '#CIP-2023-10', date: 'Oct 01, 2023', amount: '$29.00' },
                  { id: '#CIP-2023-09', date: 'Sep 01, 2023', amount: '$29.00' },
                  { id: '#CIP-2023-08', date: 'Aug 01, 2023', amount: '$29.00' }
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between py-3 border-b border-neutral-700 last:border-0">
                    <div className="flex items-center gap-8">
                      <span className="text-neutral-400 text-sm w-32">Invoice</span>
                      <span className="text-white font-medium">{invoice.id}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-neutral-400 text-sm w-28">Date</span>
                      <span className="text-white w-32">{invoice.date}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-neutral-400 text-sm w-24">Amount</span>
                      <span className="text-white w-20">{invoice.amount}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-neutral-400 text-sm w-20">Status</span>
                      <div className="flex items-center gap-2 w-20">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-400 text-sm">Paid</span>
                      </div>
                    </div>
                    <button className="text-neutral-400 hover:text-white">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h3 className="text-white text-lg font-semibold mb-4">Payment Methods</h3>

              <div className="space-y-3 mb-4">
                <div className="bg-neutral-900 border-2 border-orange-500 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">COTI Wallet</div>
                      <div className="text-neutral-400 text-sm">0x2828...09</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-orange-500 hover:text-orange-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </button>
                      <button className="text-orange-500 hover:text-orange-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">MetaMask Wallet</div>
                      <div className="text-neutral-400 text-sm">0x12...8394</div>
                    </div>
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">Default</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-neutral-900 border border-neutral-700 hover:border-neutral-600 rounded-lg p-4 text-neutral-400 hover:text-white transition flex flex-col items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm">Add Card</span>
                </button>
                <button className="bg-neutral-900 border border-neutral-700 hover:border-neutral-600 rounded-lg p-4 text-neutral-400 hover:text-white transition flex flex-col items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  <span className="text-sm">Connect Wallet</span>
                </button>
              </div>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-orange-500 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-orange-500 font-medium mb-1">Upcoming Charge</div>
                  <div className="text-neutral-400 text-sm">Your next payment of $29.00 will be processed on November 1, 2023</div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h3 className="text-white font-semibold mb-4">Need help with billing?</h3>
              <div className="space-y-3">
                <button className="w-full text-left flex items-center gap-3 text-neutral-400 hover:text-white transition">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Billing FAQ</span>
                </button>
                <button className="w-full text-left flex items-center gap-3 text-neutral-400 hover:text-white transition">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
