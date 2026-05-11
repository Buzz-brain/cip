import { Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConnectWalletButton } from "../../components/ConnectWalletButton";

type HeaderProps = {
  onToggleSidebar?: () => void;
};

export const Header = ({ onToggleSidebar }: HeaderProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#0D0501] border-b border-[#393028] px-4 md:px-8 py-4 [font-family:'Manrope',Helvetica]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#B9B09D]">
          <button
            onClick={onToggleSidebar}
            className="md:hidden w-9 h-9 rounded-md flex items-center justify-center bg-transparent text-[#B9B09D]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex hidden md:block items-center gap-2">
            <span className="text-sm">Protocol</span>
            <span>&gt;</span>
            <span className="text-white text-sm">Owner Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
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
