import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import shieldCheckOrangeIcon from "@assets/shield-check-orange.svg";

export const PlanActivatedSuccess = (): JSX.Element => {
  const navigate = useNavigate();

  const handleViewPlans = () => {
    navigate("/view-plan-history");
  };

  const handleReturnDashboard = () => {
    navigate("/owner-dashboard");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810] [font-family:'Manrope',Helvetica]">
      <div className="flex items-center justify-between px-8 py-6 bg-[#0D0501]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
          <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
            CIP&nbsp;&nbsp;Protocol
          </span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-white text-sm cursor-pointer hover:text-gray-400 transition-colors">
            Dashboard
          </span>
          <span className="text-white text-sm cursor-pointer hover:text-gray-400 transition-colors">
            My Plans
          </span>
          <span className="text-white text-sm cursor-pointer hover:text-gray-400 transition-colors">
            Settings
          </span>
          <div className="flex items-center gap-3 px-4 py-2 bg-orange-600 rounded-lg">
            <span className="text-white text-sm font-semibold">
              0x71c...9a21
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">J</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-3xl w-full bg-[#3D2E21] rounded-xl p-12 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-full border-2 border-[#FF6600] flex items-center justify-center bg-[#FF660033]">
              <img src={shieldCheckOrangeIcon} alt="" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Plan Activated Successfully
          </h1>

          <p className="text-[#FFC589] text-center text-md mb-8">
            Your inheritance plan has been secured on-chain. The smart contract
            has been deployed and assets are now monitored.
          </p>

          <div style={{ width: "55%", margin: "20px auto" }} className="bg-[#181411] rounded-lg p-4 flex justify-between items-center">
            <p className="text-gray-400 text-xl">REFERENCE ID</p>
            <p className="text-white text-xl font-semibold">#CIP-8354-JD</p>
            <button className="text-orange-600 hover:text-orange-500 transition-colors">
              <Copy className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#181411] rounded-lg p-6 border border-gray-700">
              <div className="text-[#FFC589] text-sm font-semibold mb-2">
                Trigger Mechanism
              </div>
              <div className="text-white font-semibold text-sm mb-1">
                Inactivity Monitor (12 Months)
              </div>
            </div>
            <div className="bg-[#181411] rounded-lg p-6 border border-gray-700">
              <div className="text-[#FFC589] text-sm font-semibold mb-2">
                Assets Included
              </div>
              <div className="text-white font-semibold text-sm mb-1">
                12 Assets{" "}
                <span className="text-[#FFC589] text-xs font-light">
                  (ETH, SOL, USDC)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#181411] rounded-lg p-6 border border-gray-700">
              <div className="text-[#FFC589] text-sm font-semibold mb-2">
                Main Beneficiary
              </div>
              <div className="text-white font-semibold text-sm font-mono">
                0x71c...9a21
              </div>
            </div>
            <div className="bg-[#181411] rounded-lg p-6 border border-gray-700">
              <div className="text-[#FFC589] text-sm font-semibold mb-2">
                Security Level
              </div>
              <div className="text-white font-semibold text-sm">
                AES-256 ENCRYPTED
              </div>
            </div>
          </div>

          <div className="text-center text-gray-400 text-xs mb-8">
            <div className="flex items-center justify-center gap-2">
              <span>Creation Timestamp</span>
              <span className="text-orange-600">Oct 24, 2025</span>
              <span className="text-orange-600">14:32:01 UTC</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleViewPlans}
              className="flex-1 bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold py-4 rounded-lg"
            >
              View my Plans
            </button>
            <button
              onClick={handleReturnDashboard}
              className="flex-1 border border-[#84461C] text-white hover:bg-orange-700 transition-colors font-semibold py-4 rounded-lg"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1B1613] px-8 py-6">
        <div className="flex items-center justify-center flex-col gap-4 text-gray-400 text-xs">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Smart Contract Audit
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Documentation
            </a>
          </div>

          <div className="flex items-center gap-2"  >
            <div className="relative flex h-2 w-2 items-start">
              <div className="absolute inset-0 rounded-full bg-green-400" />
              <div className="relative h-2 w-2 rounded-full bg-green-500" />
            </div>
            <span>
              AI Systems Operational
            </span>
          </div>

          <p>2025 Multi-Chain Inheritance Protocol. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
