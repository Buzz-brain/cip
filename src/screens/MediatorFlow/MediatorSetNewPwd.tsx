import { Shield, EyeOff, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "@assets/cip-logo.png";
import setNewPwdIcon from "@assets/set-new-pwd.svg";

export const MediatorSetNewPwd = (): JSX.Element => {

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [requirements, setRequirements] = useState({
    minLength: false,
    specialChar: false,
    number: false,
    uppercase: false,
  });

    const onResetComplete = () => {
    navigate("/mediator-password-reset-complete");
  };
  const onBackToLogin = () => {
    navigate("/mediator-login");
  };

  useEffect(() => {
    setRequirements({
      minLength: newPassword.length >= 8,
      specialChar: /[!@#$%^&*]/.test(newPassword),
      number: /\d/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
    });
  }, [newPassword]);

  const allRequirementsMet = Object.values(requirements).every((req) => req);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allRequirementsMet && newPassword === confirmPassword) {
      onResetComplete();
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
          <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
            <span className="text-lg text-white font-bold hover:border-gray-500 transition-colors">?</span>
          </div>
      </header>

      <main
        className="relative z-10 flex items-center justify-center px-4"
        style={{ minHeight: "150vh" }}

      >
        <div className="w-full max-w-md">
          <div className="bg-[#2B2018] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-[#393428]">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#FF66001A] rounded-full flex items-center justify-center">
<img src={setNewPwdIcon} className="w-8 h-8" alt="" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-4">
              Set New Password
            </h1>
            <p className="text-[#B9AF9D] pl-3 text-sm mb-8">
              Create a strong password to secure your inheritance protocol
              account.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-[#DBD8D1] text-sm mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showNewPassword ? (
                      <Eye className="w-4 h-4 text-gray-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[#DBD8D1] text-sm mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-4 h-4 text-gray-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-[#22191066] border border-[#393428] rounded-lg p-4 mb-6">
                <div className="text-sm font-medium flex items-center gap-2 text-white mb-3">
                  <Shield className="w-4 h-4 inline-block mr-1 text-white" />
                  <p>Security Requirements</p>
                </div>
                <div className="space-y-2">
                  <div
                    className={`flex items-center gap-3 text-sm ${requirements.minLength ? "text-green-400" : "text-[#B9AF9D]"}`}
                  >
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                      {requirements.minLength && (
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>
                    <span>At least 8 characters</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-sm ${requirements.specialChar ? "text-green-400" : "text-[#B9AF9D]"}`}
                  >
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                      {requirements.specialChar && (
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>
                    <span>Includes a special character (!@#$%^&*)</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-sm ${requirements.number ? "text-green-400" : "text-[#B9AF9D]"}`}
                  >
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                      {requirements.number && (
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>
                    <span>Includes a number</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-sm ${requirements.uppercase ? "text-green-400" : "text-[#B9AF9D]"}`}
                  >
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                      {requirements.uppercase && (
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>
                    <span>Includes an uppercase letter</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  !allRequirementsMet ||
                  newPassword !== confirmPassword ||
                  !newPassword ||
                  !confirmPassword
                }
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Password
              </button>
            </form>
          </div>

          <button
            onClick={onBackToLogin}
            className="mt-6 w-full text-center text-gray-400 hover:text-gray-300 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Login
          </button>

          
        </div>
        
      </main>
      <footer className="relative z-10 mb-10  text-center text-[#B9AF9D] text-xs w-full border-t border-[#393428] pt-8">
            <div className="flex items-center justify-center gap-20 mb-6">
              <a href="#" className="hover:text-gray-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors">
                Support
              </a>
            </div>
            <p>© 2024 Inheritance Protocol. All rights reserved.</p>
          </footer>
    </div>
  );
}
