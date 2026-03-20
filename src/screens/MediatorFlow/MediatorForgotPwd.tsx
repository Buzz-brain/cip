import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";

interface MediatorForgotPwdProps {
  onBackToLogin?: () => void;
  onSendReset?: () => void;
}

export const MediatorForgotPwd = ({
  onBackToLogin = () => {},
  onSendReset = () => {},
}: MediatorForgotPwdProps): JSX.Element => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSendReset();
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-amber-900/30 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-purple-900/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-red-900/20 to-transparent rounded-full blur-3xl" />

      <main className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-zinc-800">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-amber-200" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-3">
              Forgot your password?
            </h1>
            <p className="text-gray-400 text-center text-sm mb-8 leading-relaxed">
              No worries! Enter your registered email address or username below
              and we'll send you password reset instructions.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm mb-2">
                  Email or Username
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20"
              >
                Send Reset Instructions
              </button>
            </form>

            <button
              onClick={onBackToLogin}
              className="w-full mt-6 text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Login</span>
            </button>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-zinc-800">
              <Lock className="w-3 h-3 text-gray-500" />
              <span className="text-gray-500 text-xs">
                Secured by Multi-Chain Inheritance Protocol
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
