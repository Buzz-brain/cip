import { Shield, CheckCircle } from "lucide-react";

interface PwdResetCompleteProps {
  onLoginNow?: () => void;
}

export const AdminPwdResetComplete = ({
  onLoginNow = () => {},
}: PwdResetCompleteProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-amber-900/30 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-purple-900/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-red-900/20 to-transparent rounded-full blur-3xl" />

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
          <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-zinc-800 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-white" fill="white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-4">
              Password Reset Complete
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Your password has been successfully updated. You can now access
              your inheritance protocol dashboard with your new credentials.
            </p>

            <button
              onClick={onLoginNow}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 mb-4"
            >
              Login Now
            </button>

            <p className="text-gray-400 text-xs">
              Did not request this change?{" "}
              <a
                href="#"
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                Contact Support
              </a>
            </p>
          </div>

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
