import { Shield, Wallet, Lock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import * as walletUtils from "../../lib/wallet/walletUtils";
import { normalizeWalletAddress, getDashboardRoute } from "../../lib/utils";
import * as authAPI from "../../lib/api/auth";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { loginWithWallet, getNonce, loading, error, clearError, fetchUserInfo } = useAuth();
  const { user } = useAuth();
  const [connectedAccount, setConnectedAccount] = useState("");
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const handleConnectWallet = async () => {
    try {
      clearError();
      setIsConnectingWallet(true);
      let account = await walletUtils.requestWalletConnection();
      // Normalize wallet address to lowercase for consistency
      account = normalizeWalletAddress(account);
      setConnectedAccount(account);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connectedAccount) {
      return;
    }

    try {
      clearError();
      // Ensure wallet is normalized (safety check)
      const normalizedAccount = normalizeWalletAddress(connectedAccount);
      // Step 1: Get nonce from backend
      const nonce = await getNonce(normalizedAccount);

      // Step 2: Sign nonce with wallet
      const signature = await walletUtils.signMessage(nonce, normalizedAccount);

      // Step 3: Login with signature
      const returnedUser = await loginWithWallet(normalizedAccount, signature, nonce);
      console.log('[Login] login returnedUser', returnedUser, 'context user before fetch:', user);
      let finalUserInfo = returnedUser?.userInfo ?? null;
      if (!finalUserInfo && returnedUser?.token) {
        try {
          finalUserInfo = await authAPI.getUserInfo(returnedUser.token);
        } catch (e) {
          try { await fetchUserInfo(); } catch {}
          finalUserInfo = returnedUser?.userInfo ?? null;
        }
      }
      const finalUser = { ...(returnedUser || user), userInfo: finalUserInfo || returnedUser?.userInfo || user?.userInfo };
      const role = ((finalUser?.userInfo?.role ?? (finalUser as any)?.role) || "").toString();
      const isFullyRegistered = finalUser?.userInfo?.full_reg;
      const isSetup = finalUser?.userInfo?.is_setup;
      const roleLower = role.toLowerCase();
      const likelyUser = roleLower === "user" || roleLower === "";
      const shouldRequireSetup = likelyUser && (isFullyRegistered !== true || isSetup === false);
      console.log('[Login] finalUser for redirect', { role, isFullyRegistered, isSetup, shouldRequireSetup, userInfo: finalUser.userInfo });
      if (shouldRequireSetup) {
        navigate("/profile-setup");
      } else {
        navigate(getDashboardRoute(role));
      }
    } catch (err) {
      console.error("Login failed:", err);
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
              Connect your wallet to access your Executor, Mediator, Enterprise, or Beneficiary account.
            </p>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-5 p-4 bg-red-900/30 border border-red-600 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-400 text-sm font-medium">Login Error</p>
                    <p className="text-red-300 text-xs mt-1">{error}</p>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-300 text-sm mb-3">
                  Connect Wallet
                </label>
                {!connectedAccount ? (
                  <button
                    type="button"
                    onClick={handleConnectWallet}
                    disabled={isConnectingWallet || loading}
                    className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white hover:border-orange-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Wallet className="w-4 h-4" />
                    {isConnectingWallet ? "Connecting..." : "Connect Wallet"}
                  </button>
                ) : (
                  <div className="bg-black/50 border border-green-600/50 rounded-lg px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-green-400 text-sm">
                        {connectedAccount.slice(0, 6)}...{connectedAccount.slice(-4)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConnectedAccount("")}
                      className="text-gray-400 hover:text-gray-300 text-xs"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!connectedAccount || loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && (
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
                )}
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
            <p className="text-gray-600 text-xs">© 2026 CIP Foundation</p>
          </div>
        </div>
      </main>
    </div>
  );
};
