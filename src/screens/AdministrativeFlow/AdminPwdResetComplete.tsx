import { CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";


export const AdminPwdResetComplete = (): JSX.Element => {
  const navigate = useNavigate();

  const onLoginNow = () => {
    navigate("/administrative-dashboard");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810] text-white [font-family:'Manrope',Helvetica]">
      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
          <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
            Inheritance Protocol
          </span>
        </div>
        <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
          <span className="text-lg text-white font-bold hover:border-gray-500 transition-colors">?</span>
        </div>
      </header>

      <main
        className="relative z-10 flex items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-full max-w-md">
          <div className="bg-[#2B2018] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-[#393428] text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#FF660033] rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-[#FF6600] to-orange-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-4">
              Password Reset Complete
            </h1>
            <p className="text-[#B9AF9D] text-left pl-3 text-sm leading-relaxed mb-8">
              Your password has been successfully updated. You can now access
              your inheritance protocol dashboard with your new credentials.
            </p>

            <button
              onClick={onLoginNow}
              className="w-full bg-[#FF6600] text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 mb-6"
            >
              Login Now
            </button>

            <div className="border-t border-dashed border-[#393428] pt-6">
              <p className="text-[#80766B] text-xs">
                Did not request this change?{" "}
                <a
                  href="#"
                  className="text-[#FF6600] hover:text-[#FF6600]/80 transition-colors"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
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
