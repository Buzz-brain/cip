import { ChevronRightIcon, PlusIcon, TrashIcon, UserIcon, WalletIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import logoImg from "@assets/cip-logo.png";
import { usePlan } from "../../context/usePlan";
import usersPlusIcon from "@assets/users-plus.svg";
import bookCheckGreyIcon from "@assets/book-check-grey.svg";
import pieCircleIcon from "@assets/pie-circle.svg";
import { Link, useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { Slider } from "../../components/ui/slider";

interface Beneficiary {
    id: string;
    name: string;
    relationship: string;
  email?: string;
    walletAddress: string;
    allocation: number;
    color: string;
    initial: string;
}

const RELATIONSHIP_OPTIONS = [
    "Spouse",
    "Child",
    "Parent",
    "Sibling",
    "Friend",
    "Organization",
    "Other",
];

const BENEFICIARY_COLORS = [
    "#ff6600",
    "#a855f7",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
];

const navigationLinks = [
    { label: "Dashboard", href: "/docs/dispute" },
    { label: "Create Plan", href: "#" },
    { label: "Vaults", href: "#" },
    { label: "Settings", href: "#" },
];


export const AddBeneficiaries = (): JSX.Element => {
    const navigate = useNavigate();
    const { plan, addBeneficiary, removeBeneficiary, updateBeneficiary, setBeneficiaries } = usePlan();
    const beneficiaries = plan.beneficiaries;

    useEffect(() => {
        if (beneficiaries.length === 0) {
            setBeneficiaries([
                {
                    id: "1",
                    name: "Alice Smith",
              relationship: "Spouse",
              email: "alice@example.com",
              walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
                    allocation: 45,
                    color: BENEFICIARY_COLORS[0],
                    initial: "A",
                },
                {
                    id: "2",
                    name: "Michael Chang",
              relationship: "Child",
              email: "",
              walletAddress: "",
                    allocation: 30,
                    color: BENEFICIARY_COLORS[1],
                    initial: "M",
                },
            ]);
        }
    }, [plan.beneficiaries.length, setBeneficiaries]);

    const totalAllocated = beneficiaries.reduce((sum, b) => sum + b.allocation, 0);
    const unallocated = 100 - totalAllocated;

    const handleAddBeneficiary = () => {
        const newId = (Math.max(...beneficiaries.map((b) => parseInt(b.id))) + 1).toString();
        const colorIndex = beneficiaries.length % BENEFICIARY_COLORS.length;
        const newBeneficiary = {
            id: newId,
            name: "",
            relationship: "",
            walletAddress: "",
            allocation: 0,
            color: BENEFICIARY_COLORS[colorIndex],
            initial: "?",
        };
        addBeneficiary(newBeneficiary);
    };

    const handleUpdateBeneficiary = (id: string, field: keyof Beneficiary, value: any) => {
        const updates: Partial<Beneficiary> = { [field]: value };
        if (field === "name" && value) {
            updates.initial = value.charAt(0).toUpperCase();
        }
        updateBeneficiary(id, updates);
    };

    const isValidAddress = (address: string) => {
        return address.length > 0 && address.startsWith("0x") && address.length === 42;
    };

    return (
      <div className="w-full min-h-screen bg-[#221810] flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-[#37291f] bg-[#0d0501] backdrop-blur-[6px]">
          <div className="container flex h-16 items-center justify-between px-8">
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <img
                  src={logoImg}
                  alt="Logo"
                  className="h-[45px] object-cover"
                />
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
            </nav>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-6xl">
            <div className="mb-8">
              <div className="flex items-center gap-3 text-sm mb-10">
                <a
                  href="/"
                  className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] hover:text-white transition-colors flex items-center gap-2"
                >
                  <WalletIcon className="w-4 h-4 text-[#9DABB9]" />
                  Assets
                </a>
                <ChevronRightIcon className="w-4 h-4 text-[#9dabb9]" />
                <span className="[font-family:'Manrope',Helvetica] font-medium text-[#ff6600] flex items-center gap-2">
                  <img src={usersPlusIcon} alt="" />
                  Beneficiaries
                </span>
                <ChevronRightIcon className="w-4 h-4 text-[#9dabb9]" />
                <span className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] flex items-center gap-2">
                  <img src={bookCheckGreyIcon} alt="" />
                  Review
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-[35.7px] tracking-[-1.19px] leading-10">
                  Add Beneficiaries
                </h1>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#9dabb9] text-base leading-6">
                  Define who will inherit your digital assets. You can assign
                  different percentages to multiple
                  <br />
                  beneficiaries. Ensure the total allocation equals 100%.
                </p>
              </div>
            </div>

            <div className="flex  gap-10">
              <div className="flex flex-col flex-1 gap-8">
                <div className="flex flex-col gap-6">
                  {beneficiaries.map((beneficiary, index) => (
                    <Card
                      key={beneficiary.id}
                      className="bg-[#1a1410] border-[#2c231a] rounded-xl overflow-hidden"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg"
                              style={{ backgroundColor: beneficiary.color }}
                            >
                              {beneficiary.initial}
                            </div>
                            <div>
                              <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
                                Beneficiary #{index + 1}
                              </h3>
                              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#80796b] text-xs uppercase tracking-wide">
                                {index === 0
                                  ? "Primary Allocator"
                                  : "Secondary Allocator"}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeBeneficiary(beneficiary.id)}
                            className="text-[#80796b] hover:text-red-500 hover:bg-transparent"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex flex-col gap-2">
                            <label className="[font-family:'Manrope',Helvetica] font-medium text-[#9dabb9] text-sm uppercase tracking-wide">
                              Legal Name / Alias
                            </label>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80796b]" />
                              <Input
                                value={beneficiary.name}
                                onChange={(e) =>
                                  handleUpdateBeneficiary(
                                    beneficiary.id,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                placeholder="Enter name"
                                className="pl-10 bg-[#0d0501] border-[#2c231a] text-white placeholder:text-[#80796b]"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="[font-family:'Manrope',Helvetica] font-medium text-[#9dabb9] text-sm uppercase tracking-wide">
                              Relationship
                            </label>
                            <Select
                              value={beneficiary.relationship}
                              onValueChange={(value) =>
                                handleUpdateBeneficiary(
                                  beneficiary.id,
                                  "relationship",
                                  value,
                                )
                              }
                            >
                              <SelectTrigger className="bg-[#0d0501] border-[#2c231a] text-white">
                                <SelectValue placeholder="Select relationship" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0d0501] border-[#2c231a]">
                                {RELATIONSHIP_OPTIONS.map((option) => (
                                  <SelectItem
                                    key={option}
                                    value={option}
                                    className="text-white hover:bg-[#2c231a] focus:bg-[#2c231a]"
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-6">
                          <div className="flex items-center justify-between">
                            <label className="[font-family:'Manrope',Helvetica] font-medium text-[#9dabb9] text-sm uppercase tracking-wide">
                              Wallet Address (ETH/EVM)
                            </label>
                            {beneficiary.walletAddress &&
                              isValidAddress(beneficiary.walletAddress) && (
                                <span className="flex items-center gap-1 text-green-500 text-xs font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                  VALID ADDRESS
                                </span>
                              )}
                          </div>
                          <div className="relative">
                            <WalletIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80796b]" />
                            <Input
                              value={beneficiary.walletAddress}
                              onChange={(e) =>
                                handleUpdateBeneficiary(
                                  beneficiary.id,
                                  "walletAddress",
                                  e.target.value,
                                )
                              }
                              placeholder="0x..."
                              className="pl-10 bg-[#0d0501] border-[#2c231a] text-white placeholder:text-[#80796b] font-mono text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-6">
                          <label className="[font-family:'Manrope',Helvetica] font-medium text-[#9dabb9] text-sm uppercase tracking-wide">
                            Email (optional)
                          </label>
                          <Input
                            value={beneficiary.email || ''}
                            onChange={(e) =>
                              handleUpdateBeneficiary(
                                beneficiary.id,
                                "email",
                                e.target.value,
                              )
                            }
                            placeholder="name@example.com"
                            className="bg-[#0d0501] border-[#2c231a] text-white placeholder:text-[#80796b]"
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <label className="[font-family:'Manrope',Helvetica] font-medium text-white text-sm">
                              Allocation Share
                            </label>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={beneficiary.allocation}
                                onChange={(e) =>
                                  handleUpdateBeneficiary(
                                    beneficiary.id,
                                    "allocation",
                                    Math.max(
                                      0,
                                      Math.min(
                                        100,
                                        parseInt(e.target.value) || 0,
                                      ),
                                    ),
                                  )
                                }
                                className="w-16 h-9 bg-[#0d0501] border-[#2c231a] text-white text-center"
                              />
                              <span className="text-white font-medium">%</span>
                            </div>
                          </div>
                          <Slider
                            value={[beneficiary.allocation]}
                            onValueChange={(value) =>
                              handleUpdateBeneficiary(
                                beneficiary.id,
                                "allocation",
                                value[0],
                              )
                            }
                            max={100}
                            step={1}
                            className="w-full"
                            style={
                              {
                                "--slider-color": beneficiary.color,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <button
                    onClick={handleAddBeneficiary}
                    className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-[#2c231a] rounded-xl hover:border-[#ff6600] hover:bg-[#ff66000d] transition-colors group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2c231a] group-hover:bg-[#ff6600] transition-colors">
                      <PlusIcon className="w-5 h-5 text-[#80796b] group-hover:text-white transition-colors" />
                    </div>
                    <span className="[font-family:'Manrope',Helvetica] font-medium text-[#80796b] group-hover:text-[#ff6600] text-base transition-colors">
                      Add Another Beneficiary
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col w-[320px] gap-6 sticky top-8">
                <Card className="bg-[#1a1410] border-[#2c231a] rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg">
                        <img src={pieCircleIcon} alt="" />
                      </div>
                      <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
                        Allocation Summary
                      </h3>
                    </div>

                    <div className="flex flex-col items-center justify-center py-8 mb-6">
                      <div className="relative w-48 h-48">
                        <svg
                          className="w-full h-full -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#2c231a"
                            strokeWidth="12"
                          />
                          {beneficiaries.map((b, index) => {
                            const previousTotal = beneficiaries
                              .slice(0, index)
                              .reduce((sum, prev) => sum + prev.allocation, 0);
                            const circumference = 2 * Math.PI * 40;
                            const offset =
                              (previousTotal / 100) * circumference;
                            const dashArray = `${(b.allocation / 100) * circumference} ${circumference}`;

                            return (
                              <circle
                                key={b.id}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={b.color}
                                strokeWidth="12"
                                strokeDasharray={dashArray}
                                strokeDashoffset={-offset}
                                strokeLinecap="round"
                              />
                            );
                          })}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-4xl">
                            {totalAllocated}%
                          </span>
                          <span className="[font-family:'Manrope',Helvetica] font-medium text-[#80796b] text-sm uppercase tracking-wide">
                            Allocated
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pb-4 mb-4 border-b border-[#2c231a]">
                      {beneficiaries.map((b) => (
                        <div
                          key={b.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: b.color }}
                            />
                            <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm">
                              {b.name || "Unnamed"}
                            </span>
                          </div>
                          <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm">
                            {b.allocation}%
                          </span>
                        </div>
                      ))}
                      {unallocated > 0 && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#54483b]" />
                            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#80796b] text-sm">
                              Unallocated
                            </span>
                          </div>
                          <span className="[font-family:'Manrope',Helvetica] font-bold text-[#80796b] text-sm">
                            {unallocated}%
                          </span>
                        </div>
                      )}
                    </div>

                    {unallocated > 0 && (
                      <div className="flex items-start gap-3 p-4 bg-[#78350f] border border-[#f59e0b33] rounded-lg">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg
                            className="w-5 h-5 text-[#f59e0b]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="[font-family:'Manrope',Helvetica] font-bold text-[#f59e0b] text-xs uppercase tracking-wide">
                            Action Required
                          </span>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-[#fef3c7] text-sm leading-5">
                            You have {unallocated}% of your assets unallocated.
                            Total allocation must equal 100% to proceed.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button
                  onClick={() => {
                    // log beneficiaries selected before navigation (backend payload shape)
                    console.log(
                      '[AddBeneficiaries] Beneficiaries:',
                      beneficiaries.map((b) => ({
                        id: b.id,
                        name: b.name,
                        relationship: b.relationship,
                        email: b.email || '',
                        wallet: b.walletAddress,
                        allocation_percentage: b.allocation,
                      })),
                    );
                    navigate("/choose-plan-type");
                  }}
                  disabled={unallocated !== 0}
                  className="w-full py-6 bg-[#ff6600] hover:bg-[#ff6600]/90 disabled:bg-[#54483b] disabled:text-[#80796b] disabled:cursor-not-allowed rounded-lg shadow-[0px_4px_6px_-4px_#137fec40,0px_10px_15px_-3px_#137fec40]"
                >
                  <span className="[font-family:'Manrope',Helvetica] font-bold text-base">
                    Next: Review Plan
                  </span>
                  <ChevronRightIcon className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="w-full text-[#9dabb9] hover:text-white hover:bg-transparent"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
