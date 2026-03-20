import { Shield, User, EyeOff, Eye, Lock } from "lucide-react";
import { useState } from "react";

interface LoginProps {
  onForgotPassword?: () => void;
  onLoginSuccess?: () => void;
}

export const MediatorLogin = ({
  onForgotPassword = () => {},
  onLoginSuccess = () => {},
}: LoginProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-amber-900/30 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-900/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-red-900/20 to-transparent rounded-full blur-3xl" />

      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="text-white text-xl font-semibold">CIP Portal</span>
        </div>
        <button className="px-4 py-2 rounded-full border border-gray-600 text-white text-sm hover:border-gray-500 transition-colors flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
            <span className="text-xs">?</span>
          </div>
          Contact Support
        </button>
      </header>

      <main
        className="relative z-10 flex items-center justify-center px-4"
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        <div className="w-full max-w-md">
          <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-zinc-800">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Secure Access
            </h1>
            <p className="text-gray-400 text-center text-sm mb-8">
              Enter your credentials to access Executor, Mediator, or Admin
              panels.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-gray-300 text-sm mb-2">
                  Email / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-800 rounded flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-300 text-sm">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-orange-500 text-sm hover:text-orange-400 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-800 rounded flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4 text-gray-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                Log In
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="rotate-180"
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-zinc-800">
              <Lock className="w-3 h-3 text-green-500" />
              <span className="text-gray-400 text-xs">
                End-to-end Encrypted Session
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs mb-1">
              Unauthorized access is prohibited and monitored.
            </p>
            <p className="text-gray-600 text-xs">© 2024 CIP Foundation</p>
          </div>
        </div>
      </main>
    </div>
  );
}
