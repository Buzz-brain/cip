import { AlertTriangle, TrendingDown } from "lucide-react";

export const MarketVolatilityAlert = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex min-h-screen">
        <aside className="w-48 bg-[#1a1a1a] border-r border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center">
              <span className="text-sm font-bold">S</span>
            </div>
            <span className="text-sm font-semibold">CryptoSafe</span>
            <span className="text-xs text-gray-600">Pro Plan</span>
          </div>

          <nav className="space-y-1">
            <div className="bg-orange-600/10 border-l-2 border-orange-600 px-4 py-2.5 rounded-r">
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="text-gray-500 px-4 py-2.5 hover:text-gray-300 cursor-pointer text-sm">
              Inheritance Plans
            </div>
            <div className="text-gray-500 px-4 py-2.5 hover:text-gray-300 cursor-pointer text-sm">
              Beneficiaries
            </div>
            <div className="text-gray-500 px-4 py-2.5 hover:text-gray-300 cursor-pointer text-sm">
              Wallet
            </div>
            <div className="text-gray-500 px-4 py-2.5 hover:text-gray-300 cursor-pointer text-sm">
              Settings
            </div>
          </nav>
        </aside>

        <main className="flex-1 flex flex-col">
          <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            <span className="text-gray-400 text-sm">help</span>
          </header>

          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-3xl bg-gradient-to-br from-orange-950/40 to-transparent border border-orange-900/40 rounded-2xl p-10">
              <div className="flex gap-2 mb-6">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600/20">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      Market Volatility Alert
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Significant downward movement detected in your active
                      portfolio.
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-300 text-xs">
                    close
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-base leading-relaxed">
                  ETH has dropped{" "}
                  <span className="text-red-400 font-semibold">9%</span> this
                  week. To protect your beneficiaries' future value, we
                  recommend adjusting your portfolio allocation immediately.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-black/40 rounded-lg p-6">
                  <p className="text-gray-500 text-sm mb-4">Current Price</p>
                  <p className="text-3xl font-bold mb-4">$1,642.00</p>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 text-sm font-semibold">
                      -9.0%
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mt-4">Entry Price</p>
                  <p className="text-lg font-semibold">$1,805.00</p>
                </div>

                <div className="bg-black/40 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-500 text-sm">ETH Trend (7D)</p>
                    <span className="text-orange-500 text-xs font-semibold">
                      LIVE
                    </span>
                  </div>
                  <div className="h-24 flex items-end justify-around">
                    <div className="w-1 h-12 bg-orange-600 rounded-full opacity-70"></div>
                    <div className="w-1 h-16 bg-orange-600 rounded-full opacity-70"></div>
                    <div className="w-1 h-14 bg-orange-600 rounded-full opacity-70"></div>
                    <div className="w-1 h-10 bg-orange-600 rounded-full opacity-70"></div>
                  </div>
                  <div className="flex justify-between text-gray-600 text-xs mt-4">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-6 mb-6 border border-orange-900/30">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-500 font-bold">S</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">
                      Smart Strategy: Time-Decay
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Automatically convert{" "}
                      <span className="font-semibold">20%</span> of this asset
                      to stablecoin annually to average out volatility.
                    </p>
                  </div>
                  <button className="text-orange-500 text-sm font-semibold whitespace-nowrap">
                    Review & Enable
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                  <span>⊛</span>
                  Convert Full Amount to USDT
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="border border-gray-700 hover:border-gray-600 text-gray-300 font-medium py-2.5 rounded-lg transition">
                    Convert Partial %
                  </button>
                  <button className="text-gray-500 hover:text-gray-400 font-medium py-2.5 transition">
                    Dismiss Alert
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 text-gray-600 text-xs">
                <span>
                  Estimated Gas Fee:{" "}
                  <span className="text-orange-500">-$2.45</span>
                </span>
                <span>•</span>
                <span>
                  Network: <span className="text-green-500">Stable</span>
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
