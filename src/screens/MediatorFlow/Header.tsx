import {
  Search,
  Bell,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.png";


export const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

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
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Global search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <nav className="flex items-center gap-6 mr-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium"
          >
            Cases
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Governance
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1">
            <span className="text-orange-400 text-xs font-medium">
              0x4a...8B2
            </span>
          </div>
          <button className="relative p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
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
