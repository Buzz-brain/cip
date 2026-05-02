import { User, EyeOff, Eye, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "@assets/cip-logo.png";
import loginBgImg from "@assets/login-bg.svg";
import shieldPadlockIcon from "@assets/shield-padlock-orange.svg";
import loginArrowIcon from "@assets/login-arrow.svg";


export const ExecutorLogin = (): JSX.Element => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onForgotPassword = () => {
    navigate("/executor-forgot-password");
  };
  const onLoginSuccess = () => {
    navigate("/executor-dashboard");
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLoginSuccess();
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen text-white [font-family:'Manrope',Helvetica]"
      style={{ backgroundImage: `url(${loginBgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >


      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
        </div>
        <button className="px-4 py-2 font-bold  rounded-lg border border-gray-600 text-white text-sm hover:border-gray-500 transition-colors flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
            <span className="text-xs">?</span>
          </div>
          Contact Support
        </button>
      </header>

      <main
        className="relative z-10 flex items-center justify-center px-4"
        style={{ minHeight: "150vh" }}
      >
        <div className="w-full max-w-md">
          <div className="bg-[#27231C] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-zinc-800">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#FF66001A] rounded-full flex items-center justify-center">
                <img src={shieldPadlockIcon} className="w-8 h-8" alt="" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-4">
              Secure Access
            </h1>
            <p className="text-[#B9AF9D] text-sm pl-3 mb-8">
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
                    className="w-full bg-[#181411] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors pr-12"
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
                className="w-full bg-[#FF6600] text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                Log In
                <img src={loginArrowIcon} alt="" />
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
