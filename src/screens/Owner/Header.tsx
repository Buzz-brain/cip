import {
  Bell,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConnectWalletButton } from "../../components/ConnectWalletButton";


export const Header = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#0D0501] border-b border-[#393028] px-8 py-4 [font-family:'Manrope',Helvetica]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#B9B09D]">
          <span className="[font-family:'Noto_Sans',Helvetica] text-sm">
            Protocol
          </span>
          <span>&gt;</span>
          <span className="[font-family:'Noto_Sans',Helvetica] text-white text-sm">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-[#2D241C] border border-[#393028] hover:bg-[#3a2f1e] flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#EAB308]" />
          </button>
          <button 
            onClick={() => navigate("/notifications")}
            className="relative w-10 h-10 rounded-full bg-[#332619] hover:bg-[#3a2f1e] flex items-center justify-center"
          >
            <Bell className="w-5 h-5 text-[#B9B09D]" />
            <div className="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <ConnectWalletButton variant="default" showAddress={true} />
        </div>
      </div>
    </header>
  );
}
