import { useState, useMemo, useEffect } from "react";
import { PlusIcon, TrashIcon, UserIcon, WalletIcon, X as XIcon } from "lucide-react";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Slider } from "./slider";
import { toast } from "react-toastify";
import { normalizeWalletAddress } from "../../lib/utils";
import pieCircleIcon from "@assets/pie-circle.svg";

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

interface BeneficiaryForm {
  id?: string;
  name: string;
  relationship: string;
  email?: string;
  wallet: string;
  allocation_percentage: number;
  color?: string;
}

interface EditInheritanceModalProps {
  open: boolean;
  onClose: () => void;
  beneficiaries: BeneficiaryForm[];
  onSave: (beneficiaries: BeneficiaryForm[]) => Promise<void>;
  loading?: boolean;
}

export const EditInheritanceModal = ({
  open,
  onClose,
  beneficiaries: initialBeneficiaries,
  onSave,
  loading = false,
}: EditInheritanceModalProps) => {
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryForm[]>([]);

  // Sync beneficiaries whenever initialBeneficiaries changes
  useEffect(() => {
    if (open && initialBeneficiaries && initialBeneficiaries.length > 0) {
      setBeneficiaries(
        initialBeneficiaries.map((b, idx) => ({
          ...b,
          color: b.color || BENEFICIARY_COLORS[idx % BENEFICIARY_COLORS.length],
        }))
      );
    }
  }, [open, initialBeneficiaries]);

  const totalAllocated = useMemo(
    () => beneficiaries.reduce((sum, b) => sum + (b.allocation_percentage || 0), 0),
    [beneficiaries]
  );

  const unallocated = 100 - totalAllocated;

  const isChecksumAddress = (address: string) => {
    if (!address || typeof address !== "string") return false;
    try {
      normalizeWalletAddress(address);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleUpdateBeneficiary = (idx: number, field: keyof BeneficiaryForm, value: any) => {
    const copy = [...beneficiaries];
    
    if (field === "wallet") {
      const candidate = (value || "").trim();
      if (!candidate) {
        copy[idx][field] = "";
      } else {
        try {
          copy[idx][field] = normalizeWalletAddress(candidate);
        } catch (err) {
          copy[idx][field] = candidate;
        }
      }
    } else {
      copy[idx] = { ...copy[idx], [field]: value };
    }
    
    setBeneficiaries(copy);
  };

  const handleAddBeneficiary = () => {
    let maxId = 0;
    beneficiaries.forEach((b) => {
      if (b.id) {
        const numId = parseInt(b.id, 10);
        if (!isNaN(numId) && numId > maxId) {
          maxId = numId;
        }
      }
    });
    
    const newBeneficiary: BeneficiaryForm = {
      id: (maxId + 1).toString(),
      name: "",
      relationship: "",
      email: "",
      wallet: "",
      allocation_percentage: 0,
      color: BENEFICIARY_COLORS[beneficiaries.length % BENEFICIARY_COLORS.length],
    };
    
    setBeneficiaries([...beneficiaries, newBeneficiary]);
  };

  const handleRemoveBeneficiary = (idx: number) => {
    if (beneficiaries.length === 1) {
      // Don't allow removing the last beneficiary
      toast.warning("You must keep at least one beneficiary");
      return;
    }
    
    const filtered = beneficiaries.filter((_, i) => i !== idx);
    setBeneficiaries(filtered);
  };

  const validateAndSave = async () => {
    // Validate: at least one beneficiary
    if (beneficiaries.length === 0) {
      toast.error("Please add at least one beneficiary.");
      return;
    }

    // Validate each beneficiary
    for (const b of beneficiaries) {
      if (!b.name || b.name.trim().length === 0) {
        toast.error("Each beneficiary requires a name.");
        return;
      }
      if (!b.relationship || b.relationship.trim().length === 0) {
        toast.error("Each beneficiary requires a relationship selection.");
        return;
      }
      if (!b.wallet || !isChecksumAddress(b.wallet)) {
        toast.error("Each beneficiary requires a valid wallet address (0x...).");
        return;
      }
    }

    // Validate allocation = 100%
    if (totalAllocated !== 100) {
      toast.error("Total allocation must equal 100%.");
      return;
    }

    try {
      await onSave(beneficiaries);
    } catch (err) {
      // Error handling is done in the parent component
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 z-[10000]"
        onClick={() => {
          if (!loading) {
            onClose();
          }
        }}
      />
      <div className="relative bg-[#1f1915] border border-[#3a2f1e] rounded-lg w-[90%] max-w-4xl p-4 z-[10001] max-h-[70vh] overflow-y-auto">
        <button
          onClick={() => {
            if (!loading) onClose();
          }}
          disabled={loading}
          aria-label="Close modal"
          className="absolute top-3 right-3 p-1 rounded-md text-[#80796b] hover:text-white transition-colors"
        >
          <XIcon className="w-4 h-4" />
        </button>
        <div className="mb-4">
          <h2 className="text-white font-bold text-lg mb-1">
            Edit Inheritance Beneficiaries
          </h2>
          <p className="text-xs text-[#d1c3b4]">
            Update beneficiary details and allocations. Total allocation must equal 100%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">
          {/* Main form area */}
          <div className="flex flex-col gap-3">
            {beneficiaries.map((beneficiary, index) => (
              <Card
                key={beneficiary.id ?? index}
                className="bg-[#14110f] border-[#2a241c] rounded-lg overflow-hidden"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-base"
                        style={{ backgroundColor: beneficiary.color }}
                      >
                        {beneficiary.name ? beneficiary.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">
                          Beneficiary #{index + 1}
                        </h3>
                      </div>
                    </div>
                    {beneficiaries.length > 1 && (
                      <button
                        onClick={() => handleRemoveBeneficiary(index)}
                        className="text-[#80796b] hover:text-red-500 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-[#9dabb9] text-sm uppercase tracking-wide">
                        Legal Name / Alias
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#80796b]" />
                        <Input
                          value={beneficiary.name}
                          onChange={(e) =>
                            handleUpdateBeneficiary(index, "name", e.target.value)
                          }
                          placeholder="Enter name"
                          className="pl-9 bg-[#0d0501] border-[#2c231a] text-white placeholder:text-[#80796b] w-full text-sm h-8"
                        />
                      </div>
                    </div>

                    {/* Relationship Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-[#9dabb9] text-sm uppercase tracking-wide">
                        Relationship
                      </label>
                      <Select
                        value={beneficiary.relationship}
                        onValueChange={(value) =>
                          handleUpdateBeneficiary(index, "relationship", value)
                        }
                      >
                        <SelectTrigger className="bg-[#0d0501] border-[#2c231a] text-white text-sm h-8">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0d0501] border-[#2c231a]">
                          {RELATIONSHIP_OPTIONS.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="text-white hover:bg-[#2c231a] focus:text-white focus:bg-[#2c231a]"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Wallet Address */}
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center justify-between">
                      <label className="font-medium text-[#9dabb9] text-sm uppercase tracking-wide">
                        Wallet Address (ETH/EVM)
                      </label>
                      {beneficiary.wallet ? (
                        isChecksumAddress(beneficiary.wallet) ? (
                          <span className="flex items-center gap-1 text-green-500 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            VALID ADDRESS
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                            INVALID ADDRESS
                          </span>
                        )
                      ) : null}
                    </div>
                    <div className="relative">
                      <WalletIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#80796b]" />
                      <Input
                        value={beneficiary.wallet}
                        onChange={(e) =>
                          handleUpdateBeneficiary(index, "wallet", e.target.value)
                        }
                        placeholder="0x..."
                        className="pl-9 bg-[#0d0501] border-[#2c231a] text-white placeholder:text-[#80796b] font-mono text-xs w-full h-8"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="font-medium text-[#9dabb9] text-sm uppercase tracking-wide">
                      Email
                    </label>
                    <Input
                      value={beneficiary.email || ""}
                      onChange={(e) =>
                        handleUpdateBeneficiary(index, "email", e.target.value)
                      }
                      placeholder="name@example.com"
                      className="bg-[#0d0501] border-[#2c231a] text-white placeholder:text-[#80796b] w-full text-sm h-8"
                    />
                  </div>

                  {/* Allocation */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="font-medium text-white text-sm">
                        Allocation Share
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={beneficiary.allocation_percentage}
                          onChange={(e) =>
                            handleUpdateBeneficiary(
                              index,
                              "allocation_percentage",
                              Math.max(
                                0,
                                Math.min(100, parseInt(e.target.value) || 0)
                              )
                            )
                          }
                          className="w-20 h-8 bg-[#0d0501] border-[#2c231a] text-white text-center text-sm"
                        />
                        <span className="text-white font-medium">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[beneficiary.allocation_percentage]}
                      onValueChange={(value) =>
                        handleUpdateBeneficiary(
                          index,
                          "allocation_percentage",
                          value[0]
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

            {/* Add Another Beneficiary Button */}
            <button
              onClick={handleAddBeneficiary}
              disabled={loading}
              className="flex items-center justify-center gap-2 p-3 sm:p-4 border-2 border-dashed border-[#2c231a] rounded-lg hover:border-[#ff6600] hover:bg-[#ff66000d] transition-colors group w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#2c231a] group-hover:bg-[#ff6600] transition-colors">
                <PlusIcon className="w-4 h-4 text-[#80796b] group-hover:text-white transition-colors" />
              </div>
              <span className="font-medium text-[#80796b] group-hover:text-[#ff6600] text-sm transition-colors">
                Add Another Beneficiary
              </span>
            </button>
          </div>

          {/* Summary Sidebar */}
          <div className="flex flex-col gap-3">
            <Card className="bg-[#14110f] border-[#2a241c] rounded-lg overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    <img src={pieCircleIcon} alt="" />
                  </div>
                  <h3 className="font-bold text-white text-sm">
                    Allocation Summary
                  </h3>
                </div>

                {/* Pie Chart */}
                <div className="flex flex-col items-center justify-center py-4 mb-4">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
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
                          .reduce((sum, prev) => sum + (prev.allocation_percentage || 0), 0);
                        const circumference = 2 * Math.PI * 40;
                        const offset = (previousTotal / 100) * circumference;
                        const dashArray = `${((b.allocation_percentage || 0) / 100) * circumference} ${circumference}`;

                        return (
                          <circle
                            key={b.id ?? index}
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
                      <span className="font-bold text-white text-2xl">
                        {totalAllocated}%
                      </span>
                      <span className="font-medium text-[#80796b] text-xs uppercase tracking-wide">
                        Allocated
                      </span>
                    </div>
                  </div>
                </div>

                {/* Allocation List */}
                <div className="flex flex-col gap-2 pb-3 mb-3 border-b border-[#2c231a]">
                  {beneficiaries.map((b, idx) => (
                    <div
                      key={b.id ?? idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: b.color }}
                        />
                        <span className="font-normal text-white text-sm">
                          {b.name || "Unnamed"}
                        </span>
                      </div>
                      <span className="font-bold text-white text-sm">
                        {b.allocation_percentage}%
                      </span>
                    </div>
                  ))}
                  {unallocated > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#54483b]" />
                        <span className="font-normal text-[#80796b] text-sm">
                          Unallocated
                        </span>
                      </div>
                      <span className="font-bold text-[#80796b] text-sm">
                        {unallocated}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Allocation warning */}
                {unallocated !== 0 && (
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
                      <span className="font-bold text-[#f59e0b] text-xs uppercase tracking-wide">
                        Action Required
                      </span>
                      <p className="font-normal text-[#fef3c7] text-sm leading-5">
                        You have {unallocated}% unallocated. Total allocation must equal
                        100% to save.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-[#2a241c]">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[#393028] text-white hover:bg-[#4a3f35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Cancel
          </button>
          <button
            onClick={validateAndSave}
            disabled={loading || unallocated !== 0}
            className="px-4 py-2 rounded-lg bg-[#ff6600] text-white hover:bg-[#ff6600]/80 disabled:bg-[#54483b] disabled:text-[#80796b] disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
