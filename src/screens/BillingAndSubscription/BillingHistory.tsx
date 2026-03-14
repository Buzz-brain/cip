import { ChevronRight } from 'lucide-react';

interface BillingPageProps {
  onManagePayment?: () => void;
}

export const BillingHistory = ({ onManagePayment }: BillingPageProps): JSX.Element => {
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
            <a href="#" className="text-neutral-400 hover:text-white transition">Inheritance Plans</a>
            <a href="#" className="text-neutral-400 hover:text-white transition">Assets</a>
            <a href="#" className="text-orange-500">Billing</a>
            <a href="#" className="text-neutral-400 hover:text-white transition">Settings</a>
            <button className="w-9 h-9 bg-orange-500 rounded-full"></button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-neutral-400 mb-8">Track your subscription payments, crypto transactions, and download invoices.</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
            <div className="flex items-start justify-between mb-4">
              <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-neutral-400 text-sm mb-1">Next Billing</div>
            <div className="text-white text-2xl font-semibold mb-1">Oct 24, 2024</div>
            <div className="text-neutral-500 text-xs">Auto-renewal enabled</div>
          </div>

          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
            <div className="flex items-start justify-between mb-4">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-neutral-400 text-sm mb-1">Active Plan</div>
            <div className="text-white text-2xl font-semibold mb-1">Guardian Annual</div>
            <div className="text-green-500 text-xs font-medium">Active & Secure</div>
          </div>

          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
            <div className="flex items-start justify-between mb-4">
              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-neutral-400 text-sm mb-1">Total Spent</div>
            <div className="text-white text-2xl font-semibold mb-1">$4,250.00</div>
            <div className="text-neutral-500 text-xs">Since Jan 2022</div>
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 mb-8">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search by Transaction ID or Invoice #"
              className="flex-1 bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
            <button className="bg-neutral-700 hover:bg-neutral-600 text-neutral-400 px-4 py-3 rounded-lg transition">Last 12 Months</button>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-neutral-400 px-4 py-3 rounded-lg transition">Status: All</button>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-neutral-400 px-4 py-3 rounded-lg transition">Method: Crypto</button>
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700 bg-neutral-900/50">
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Date</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Description</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Method</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Amount</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-neutral-400 text-sm font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {[
                  { date: 'Oct 24, 2024', desc: 'Guardian Annual', txId: '0x8a...4b2d', method: { name: 'USDC', icon: '⊕', color: 'teal' }, amount: '$120.00', status: 'Paid' },
                  { date: 'Sep 15, 2024', desc: 'Storage Expansion', txId: 'INV-2024-0092', method: { name: 'Visa', icon: '💳', color: 'blue' }, amount: '$15.00', status: 'Paid' },
                  { date: 'Aug 24, 2024', desc: 'Plan Setup Fee', txId: '0x3c...9f1a', method: { name: 'MATIC', icon: '⬠', color: 'purple' }, amount: '$45.00', status: 'Pending' },
                  { date: 'Jul 24, 2024', desc: 'Guardian Annual', txId: '0x1d...e4f5', method: { name: 'USDC', icon: '⊕', color: 'teal' }, amount: '$120.00', status: 'Failed' },
                  { date: 'Jun 10, 2024', desc: 'Consultation', txId: 'INV-2024-0045', method: { name: 'Mastercard', icon: '💳', color: 'red' }, amount: '$250.00', status: 'Paid' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/50 transition">
                    <td className="px-6 py-4 text-white text-sm">{row.date}</td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">{row.desc}</div>
                      {row.desc !== 'Guardian Annual' && row.desc !== 'Consultation' && <div className="text-neutral-500 text-xs">Renewal</div>}
                    </td>
                    <td className="px-6 py-4 text-neutral-400 text-sm font-mono">{row.txId}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                          row.method.color === 'teal' ? 'bg-teal-500/20 text-teal-400' :
                          row.method.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                          row.method.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {row.method.icon}
                        </div>
                        <span className="text-white text-sm">{row.method.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-medium text-sm">{row.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                        row.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          row.status === 'Paid' ? 'bg-green-400' :
                          row.status === 'Pending' ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}></div>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-neutral-400 hover:text-white transition">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-neutral-700 flex items-center justify-between">
            <span className="text-neutral-400 text-sm">Showing 1 to 5 of 42 results</span>
            <div className="flex items-center gap-2">
              <button className="text-neutral-400 hover:text-white">
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button className="w-8 h-8 bg-orange-500 text-white rounded text-sm font-medium">1</button>
              <button className="w-8 h-8 bg-neutral-700 text-neutral-400 rounded text-sm hover:bg-neutral-600">2</button>
              <button className="w-8 h-8 bg-neutral-700 text-neutral-400 rounded text-sm hover:bg-neutral-600">3</button>
              <button className="text-neutral-400 hover:text-white">...</button>
              <button className="text-neutral-400 hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onManagePayment}
        className="fixed top-6 right-6 bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition border border-neutral-700"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        Manage Payment Methods
      </button>
    </div>
  );
}
