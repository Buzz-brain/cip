import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "@assets/cip-logo.png";

export const ExecutorForgotPwd = (): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const onBackToLogin = () => {
    navigate("/executor-login");
  };
  const onSendReset = () => {
    navigate("/executor-set-new-password");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSendReset();
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810] text-white [font-family:'Manrope',Helvetica]">
      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-[#DBD8D1] hover:text-gray-300 text-sm">
            Documentation
          </a>
          <a
            href="#"
            className="text-[#DBD8D1] hover:text-gray-300 text-sm"
          >
            Support
          </a>
          <a href="/mediator-login" className="text-[#FF6600] hover:text-gray-300 text-sm">
            Login
          </a>
        </nav>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-screen px-4"
        style={{ minHeight: "150vh" }}

      >
        <div className="w-full max-w-md">
          <div className="bg-[#2D231C] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-[#393428]">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#FF66001A] rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#FF6600]" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-4">
              Forgot your password?
            </h1>
            <p className="text-[#AFA89C] text-sm pl-3 mb-6 leading-relaxed">
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
                  className="w-full bg-[#181411] border border-[#54483B] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6600] text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20"
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
