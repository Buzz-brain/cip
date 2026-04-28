import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@components/ui/alert";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import logoImg from "@assets/cip-logo.png";
import shieldPadlock from "@assets/shield-padlock.svg";
import infoIcon from "@assets/info.svg";
import lockGreen from "@assets/lock-green.svg";
import { Link } from "react-router-dom";


const navigationLinks = [
    { label: "How it works", href: "#" },
    { label: "Guardians", href: "#" },
    { label: "Support", href: "#" },
];

export const WalletRecovery = (): JSX.Element => {
    const navigate = useNavigate();

    const handleSendRecovery = () => {
        navigate("/recovery-progress");
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#221810]">
            <header className="w-full h-[61px] flex items-center justify-center bg-[#0d0501] border-b border-[#393028]">
                <div className="w-full max-w-[1280px] h-[60px] flex items-center justify-between px-10">
                    <div className="flex items-center gap-3">
                        <Link to="/dashboard">
                            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
                        </Link>
                        <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-[17.8px] tracking-[0] leading-[22px]">
                            CIP Protocol
                        </span>
                    </div>

                    <nav className="flex items-center gap-[23px]">
                        {navigationLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm tracking-[0] leading-5 whitespace-nowrap hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <Button
                        onClick={() => navigate("/time-lock")}
                        variant="outline"
                        className="h-9 px-[17px] [font-family:'Manrope',Helvetica] font-bold text-white text-sm bg-transparent border-[#392f28] hover:bg-[#392f28] hover:text-white rounded-lg"
                    >
                        Login
                    </Button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">

                <Card className="w-full max-w-[560px] bg-[#27211c] border-[#392f28] rounded-2xl m-16">
                    <CardContent className="p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-[#ef444433] rounded-full">
                                <img src={shieldPadlock} alt="Shield Padlock" className="w-8 h-8" />
                            </div>

                            <div className="flex flex-col gap-3">
                                <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[28.3px] tracking-[0] leading-[37px]">
                                    Initiate Wallet Recovery
                                </h1>
                                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ac9d] text-base tracking-[0] leading-[26px]">
                                    Lost access? Enter your registered details below to verify
                                    your identity and alert your Guardians to begin the MPC share
                                    restoration process.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 mt-3">
                                <div className="flex flex-col gap-2">
                                    <Label
                                        htmlFor="email-wallet"
                                        className="[font-family:'Manrope',Helvetica] font-semibold text-gray-300 text-sm tracking-[0] leading-5"
                                    >
                                        Registered Email or Wallet Address
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email-wallet"
                                            type="text"
                                            placeholder="name@example.com or 0x..."
                                            className="h-14 [font-family:'Manrope',Helvetica] font-normal text-white text-base bg-[#181411] border-[#54493b] rounded-xl placeholder:text-white focus-visible:ring-[#ff6600]"
                                        />
                                    </div>
                                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#afa49c] text-[11.9px] tracking-[0] leading-4">
                                        We will send a secure verification link if the account
                                        exists.
                                    </p>
                                </div>

                                <Alert className="bg-[#ff66001a] border-[#ff660033] rounded-xl flex items-start gap-3 p-4">
                                    <img src={infoIcon} className="w-4 h-4 pt-1" />

                                    <AlertDescription className="[font-family:'Manrope',Helvetica] text-[#ebe6e5] text-sm">
                                        <span className="font-bold">
                                            Guardian Notification Protocol
                                        </span>
                                        <br />
                                        <span className="font-normal text-[13.9px] leading-[19px]">
                                            This action will notify your 3 designated Guardians.
                                            Approval from{" "}
                                        </span>
                                        <span className="font-bold text-[#ff6600]">
                                            2/3 Guardians
                                        </span>
                                        <span className="font-normal text-sm">
                                            {" "}
                                            is required to restore access to your wallet shares.
                                        </span>
                                    </AlertDescription>
                                </Alert>
                            </div>

                            <div className="flex flex-col gap-4 mt-2">
                                <Button
                                    onClick={handleSendRecovery}
                                    className="h-12 [font-family:'Manrope',Helvetica] font-bold text-white text-base bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-xl"
                                >
                                    Send Recovery Request
                                    <ArrowRightIcon className="w-4 h-4 ml-1.5" />
                                </Button>

                                <div className="flex items-center justify-between mt-3">
                                    <button className="flex items-center gap-1.5 [font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-sm hover:text-white transition-colors">
                                        <ArrowLeftIcon className="w-4 h-4" />
                                        Back to Login
                                    </button>
                                    <button className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-[13.9px] hover:text-white transition-colors">
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <div className="flex items-center justify-center gap-[6.5px] h-[45px] bg-[#211c16] border-t border-[#392f28] rounded-b-2xl">
                        <img src={lockGreen} className="w-4 h-4" />
                        <span className="[font-family:'Manrope',Helvetica] font-medium text-[#afa49c] text-[11.9px] tracking-[0] leading-4">
                            Encrypted via AES-256 &amp; MPC Protocol
                        </span>
                    </div>
                </Card>

                <footer className="mt-8 [font-family:'Manrope',Helvetica] font-normal text-[#63564b] text-[11.9px] tracking-[0] leading-4">
                    © 2024 CIP Protocol. All rights reserved.
                </footer>
            </main>
        </div>
    );
};
