import { Lock } from "lucide-react";

interface EnterpriseLoginProps {
  onLogin?: () => void;
}

export const EnterpriseLogin = ({ onLogin = () => {} }: EnterpriseLoginProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-orange-500" />
              <span className="text-2xl font-bold text-white">
                CIP PROTOCOL
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Secure Login
          </h1>
          <p className="text-slate-400 text-center mb-8">
            Enterprise B2B Interface
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 bg-slate-700 border border-slate-600 rounded cursor-pointer accent-orange-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-400">
                Remember this device
              </label>
            </div>

            <button
              onClick={onLogin}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Secure Login
            </button>
          </form>

          <div className="mt-6 text-center text-slate-400 text-sm">
            <p>
              Don't have an account?{" "}
              <span className="text-orange-500 cursor-pointer hover:text-orange-400">
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
