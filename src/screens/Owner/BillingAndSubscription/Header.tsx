import {
  Bell,
  User,
  HelpCircle,
  Settings,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.png";

export const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/mediator-login");
  };

  return (
    <header className="relative z-20 bg-[#0d0501] backdrop-blur-xl border-b border-zinc-800 sticky top-0 [font-family:'Manrope',Helvetica]">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
            </Link>
          </div>
        </div>

        <nav className="flex items-center gap-8">
          <a href="#dashboard" className="[font-family:'Manrope',Helvetica] text-white text-sm hover:text-white transition-colors">Dashboard</a>
          <a href="#plans" className="[font-family:'Manrope',Helvetica] text-white text-sm hover:text-white transition-colors">Vaults</a>
          <a href="#tasks" className="[font-family:'Manrope',Helvetica] text-white text-sm hover:text-white transition-colors">Beneficiaries</a>
          <a href="#tasks" className="[font-family:'Manrope',Helvetica] text-[#FF6600] text-sm hover:text-white transition-colors">Settings</a>
          <a href="#tasks" className="[font-family:'Manrope',Helvetica] text-white text-sm hover:text-white transition-colors">Help</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-lg bg-[#29382E] hover:bg-[#3a3430] flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </button>
          
          <button
            onClick={onLogout}
            className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
