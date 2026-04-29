import {
  InfoIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import * as authAPI from "../../lib/api/auth";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Separator } from "../../components/ui/separator";
import { ConnectWalletButton } from "../../components/ConnectWalletButton";
import { toast } from "react-toastify";
import logoImg from "@assets/cip-logo.svg";
import lockWhite from "@assets/lock-white.svg";
import userIcon from "@assets/user.svg";
import protocolIcon from "@assets/protocol.svg";
import { Link } from "react-router-dom";
import { getDashboardRoute } from "../../lib/utils";


const navigationLinks = [
  { label: "Dashboard", href: "/owner-dashboard" },
  { label: "Plans", href: "/select-assets" },
  { label: "Vault", href: "#" },
  { label: "Settings", href: "#" },
];

export const ProfileSetupForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, fetchUserInfo } = useAuth();
  const [profile, setProfile] = useState({
    fullName: "",
    emailAddress: "",
    backupContact: "",
    preferredChain: "",
    taxResidence: "",
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const loadProfile = async () => {
    if (!user?.token) {
      return;
    }

    setIsLoadingProfile(true);
    setProfileError(null);

    try {
      const payload = await authAPI.getUserInfo(user.token);

      setProfile({
        fullName: payload.full_name || payload.fullName || "",
        emailAddress: payload.email || payload.emailAddress || "",
        backupContact: payload.backup_contact || payload.backupContact || "",
        preferredChain: payload.preferred_chain || payload.preferredChain || "",
        taxResidence: payload.country || payload.tax_residence || payload.taxResidence || "",
      });
    } catch (error) {
      console.warn("Failed to auto-fill profile from API:", error);
      setProfileError("Could not load profile data. Please complete manually.");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.token) {
      setSaveError("Not authenticated");
      return;
    }

    setSaveError(null);
    setSaveLoading(true);

    try {
      await authAPI.updateAccountInfo(user.token, {
        full_name: profile.fullName,
        email: profile.emailAddress,
        country: profile.taxResidence,
        preferred_chain: profile.preferredChain,
      });

      toast.success("Profile saved successfully!");
      // Fetch latest user info to get updated role
      let latestUserInfo = null;
      try {
        latestUserInfo = await authAPI.getUserInfo(user.token);
        console.log('[ProfileSetupForm] latestUserInfo after save', latestUserInfo);
      } catch (e) {
        // fallback: use previous userInfo
        latestUserInfo = user.userInfo;
      }
      const role = latestUserInfo?.role || user?.userInfo?.role;
      navigate(getDashboardRoute(role));
    } catch (err) {
      console.error("Profile save failed:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.token) {
      navigate("/connect-wallet");
      return;
    }

    loadProfile();
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen bg-[#221810] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-[#37291f] bg-[#0d0501] backdrop-blur-[6px]">
        <div className="container flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
            </Link>
            <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
              Inheritance&nbsp;&nbsp;Protocol
            </span>
          </div>

          <nav className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium leading-5 text-slate-400 transition-colors hover:text-white [font-family:'Manrope',Helvetica]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <ConnectWalletButton variant="default" showAddress={true} />
          </nav>
        </div>
      </header>

      <section className="w-full max-w-[800px] mx-auto flex flex-col gap-4 px-4 mt-20 mb-20">
        <header className="flex flex-col gap-[15px]">
          <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-[30.4px] tracking-[0] leading-10">
            Profile Setup
          </h1>
          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-sm tracking-[0] mb-4 leading-[21px]">
            Secure your digital legacy by completing your profile information.
            This ensures your assets are correctly routed according to your
            inheritance plan.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <Card className="bg-[#27211c] border-[#392f28]">
            <CardContent className="p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <img src={userIcon} className="w-4" alt="Icon" />
                  <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg tracking-[0] leading-[22px]">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="fullName"
                      className="[font-family:'Manrope',Helvetica] font-medium text-white text-[13.8px] tracking-[0] leading-[21px]"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder="e.g. Alex Sterling"
                      className="bg-[#181411] border-[#54463b] text-white [font-family:'Manrope',Helvetica] font-normal text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="emailAddress"
                      className="[font-family:'Manrope',Helvetica] font-medium text-white text-[13.7px] tracking-[0] leading-[21px]"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="emailAddress"
                      value={profile.emailAddress}
                      onChange={(e) => setProfile((prev) => ({ ...prev, emailAddress: e.target.value }))}
                      placeholder="e.g. alex@example.com"
                      className="bg-[#181411] border-[#54463b] text-white [font-family:'Manrope',Helvetica] font-normal text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-[7px]">
                    <Label
                      htmlFor="backupContact"
                      className="[font-family:'Manrope',Helvetica] font-medium text-white text-sm tracking-[0] leading-[21px]"
                    >
                      Backup Contact
                    </Label>
                    <InfoIcon className="w-4 h-4 text-[#80756b]" />
                  </div>
                  <div className="relative">
                    <Input
                      id="backupContact"
                      value={profile.backupContact}
                      onChange={(e) => setProfile((prev) => ({ ...prev, backupContact: e.target.value }))}
                      placeholder="Email or phone number for emergency contact"
                      className="bg-[#181411] border-[#54463b] text-white [font-family:'Manrope',Helvetica] font-normal text-sm"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-[#392f28]" />

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <img src={protocolIcon} className="w-6" />
                  <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg tracking-[0] leading-[22px]">
                    Protocol SettingsIcon
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="preferredChain"
                      className="[font-family:'Manrope',Helvetica] font-medium text-white text-[13.7px] tracking-[0] leading-[21px]"
                    >
                      Preferred Chain
                    </Label>
                    <Input
                      id="preferredChain"
                      value={profile.preferredChain}
                      onChange={(e) => setProfile((prev) => ({ ...prev, preferredChain: e.target.value }))}
                      placeholder="eg: ETH"
                      className="bg-[#27211c] border-[#54463b] text-white [font-family:'Manrope',Helvetica] font-normal text-sm"
                    />
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-[11.9px] tracking-[0] leading-4">
                      Gas fees for plan execution will be paid on this chain.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="taxResidence"
                      className="[font-family:'Manrope',Helvetica] font-medium text-white text-[13.9px] tracking-[0] leading-[21px]"
                    >
                      Tax Residence (Country)
                    </Label>
                    <Input
                      id="taxResidence"
                      value={profile.taxResidence}
                      onChange={(e) => setProfile((prev) => ({ ...prev, taxResidence: e.target.value }))}
                      placeholder="Nigeria"
                      className="bg-[#27211c] border-[#54463b] text-white [font-family:'Manrope',Helvetica] font-normal text-sm"
                    />
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-xs tracking-[0] leading-4">
                      Used to calculate potential inheritance tax implications.
                    </p>
                  </div>
                </div>
              </div>



              <div className="flex justify-end gap-4 mt-10">
                <Button
                  variant="outline"
                  className="h-12 gap-2 rounded-lg border-[#554733] bg-transparent px-8 hover:bg-[#554733]/10"
                  onClick={() => navigate("/connect-wallet")}
                >
                  <span className="text-base font-bold leading-6 text-white [font-family:'Manrope',Helvetica]">
                    Cancel
                  </span>
                </Button>

                <Button
                  onClick={handleSaveProfile}
                  disabled={saveLoading}
                  className="h-12 px-8 bg-[#ff6600] hover:bg-[#ff7700] [font-family:'Manrope',Helvetica] font-bold text-white text-base rounded-lg flex items-center gap-2"
                >
                  {saveLoading ? "Saving..." : "Save Profile"}
                </Button>

                {saveError && (
                  <p className="text-sm text-red-400">{saveError}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-1">
            <img src={lockWhite} alt="Lock icon" />
            <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-[11.9px] tracking-[0] leading-4">
              Your data is end-to-end encrypted and stored securely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
