import { Shield, EyeOff, Eye } from "lucide-react";
import { useState, useEffect } from "react";

interface MediatorSetNewPwdProps {
  onResetComplete?: () => void;
  onBackToLogin?: () => void;
}

export const ExecutorSetNewPwd = ({
  onResetComplete = () => {},
  onBackToLogin = () => {},
}: MediatorSetNewPwdProps): JSX.Element => {
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-amber-900/30 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-900/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-red-900/20 to-transparent rounded-full blur-3xl" />

      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="text-white text-xl font-semibold">
            Inheritance Protocol
          </span>
        </div>
        <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="5" r="1" fill="currentColor" />
            <circle cx="12" cy="19" r="1" fill="currentColor" />
          </svg>
        </button>
      </header>

      <main
        className="relative z-10 flex items-center justify-center px-4"
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        <div className="w-full max-w-md">
          <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-zinc-800">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Set New Password
            </h1>
            <p className="text-gray-400 text-center text-sm mb-8">
              Create a strong password to secure your inheritance protocol
              account.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-gray-300 text-sm mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors pr-10"
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
                <label className="block text-gray-300 text-sm mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors pr-10"
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

              <div className="bg-black/30 border border-zinc-700 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3">
                  Security Requirements
                </h3>
                <div className="space-y-2">
                  <div
                    className={`flex items-center gap-3 text-sm ${requirements.minLength ? "text-green-400" : "text-gray-400"}`}
                  >
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                      {requirements.minLength && (
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>
                    <span>At least 8 characters</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-sm ${requirements.specialChar ? "text-green-400" : "text-gray-400"}`}
                  >
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                      {requirements.specialChar && (
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>
                    <span>Includes a special character (!@#$%^&*)</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-sm ${requirements.number ? "text-green-400" : "text-gray-400"}`}
                  >
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                      {requirements.number && (
                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>
                    <span>Includes a number</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-sm ${requirements.uppercase ? "text-green-400" : "text-gray-400"}`}
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

          <footer className="relative z-10 mt-12 text-center text-gray-500 text-xs">
            <div className="flex items-center justify-center gap-6 mb-4">
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
      </main>
    </div>
  );
};
