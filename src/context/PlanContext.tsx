import React, { createContext, useCallback, useEffect, useMemo, useState, ReactNode } from "react";
import { useAuth } from "./useAuth";

export type BeneficiaryPlan = {
  id: string;
  name: string;
  relationship: string;
  walletAddress: string;
  allocation: number;
  color: string;
  initial: string;
};

export type PlanType =
  | "time-lock"
  | "multi-sig"
  | "custom"
  | "health-oracle"
  | "inactivity-oracle"
  | "philanthropy"
  | "staggered"
  | "testamentary-dao";

export interface PlanCreationState {
  planType?: PlanType;
  ownerWallet?: string;
  ownerName?: string;
  cryptoAsset?: string;
  amount?: string;
  beneficiaries: BeneficiaryPlan[];
  releaseTimestamp?: string;
  inactivityPeriodDays?: string;
  isActive?: string;
  healthOracleAddress?: string;
  protectedDataAddress?: string;
  createdAt?: string;
}

export interface PlanContextType {
  plan: PlanCreationState;
  setPlanField: (field: keyof PlanCreationState, value: any) => void;
  setPlanType: (planType: PlanType) => void;
  setOwnerInfo: (ownerWallet: string, ownerName: string) => void;
  setAssets: (cryptoAsset: string, amount: string) => void;
  setBeneficiaries: (beneficiaries: BeneficiaryPlan[]) => void;
  addBeneficiary: (beneficiary: BeneficiaryPlan) => void;
  updateBeneficiary: (id: string, updates: Partial<BeneficiaryPlan>) => void;
  removeBeneficiary: (id: string) => void;
  setProtectedDataAddress: (protectedDataAddress: string) => void;
  clearPlan: () => void;
  getProtectorPayload: () => Record<string, string>;
}

const STORAGE_KEY = "cip_plan_draft";

const initialState: PlanCreationState = {
  planType: "time-lock",
  beneficiaries: [],
};

export const PlanContext = createContext<PlanContextType | undefined>(undefined);

interface PlanProviderProps {
  children: ReactNode;
}

const mapPlanTypeToDataProtectorType = (planType?: PlanType): string => {
  switch (planType) {
    case "time-lock":
      return "timelock";
    case "inactivity-oracle":
      return "inactivity";
    case "health-oracle":
      return "health_oracle";
    case "philanthropy":
      return "philanthropy";
    case "multi-sig":
    case "custom":
    case "staggered":
    case "testamentary-dao":
    default:
      return "timelock";
  }
};

const normalizeBeneficiary = (beneficiary: BeneficiaryPlan, index: number) => ({
  [`beneficiary_${index + 1}_name`]: beneficiary.name || "",
  [`beneficiary_${index + 1}_relationship`]: beneficiary.relationship || "",
  [`beneficiary_${index + 1}_wallet`]: beneficiary.walletAddress || "",
  [`beneficiary_${index + 1}_allocation`]: String(beneficiary.allocation ?? 0),
});

export const PlanProvider: React.FC<PlanProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [plan, setPlan] = useState<PlanCreationState>(initialState);

  useEffect(() => {
    const stored = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPlan(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse plan draft from storage", err);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    }
  }, [plan]);

  useEffect(() => {
    if (user?.publicKey) {
      setPlan((prev) => ({
        ...prev,
        ownerWallet: prev.ownerWallet || user.publicKey,
      }));
    }
  }, [user?.publicKey]);

  const setPlanField = useCallback((field: keyof PlanCreationState, value: any) => {
    setPlan((prevPlan) => ({ ...prevPlan, [field]: value }));
  }, []);

  const setPlanType = useCallback((planType: PlanType) => {
    setPlan((prev) => ({ ...prev, planType }));
  }, []);

  const setOwnerInfo = useCallback((ownerWallet: string, ownerName: string) => {
    setPlan((prev) => ({ ...prev, ownerWallet, ownerName }));
  }, []);

  const setAssets = useCallback((cryptoAsset: string, amount: string) => {
    setPlan((prev) => ({ ...prev, cryptoAsset, amount }));
  }, []);

  const setBeneficiaries = useCallback((beneficiaries: BeneficiaryPlan[]) => {
    setPlan((prev) => ({ ...prev, beneficiaries }));
  }, []);

  const addBeneficiary = useCallback((beneficiary: BeneficiaryPlan) => {
    setPlan((prev) => ({ ...prev, beneficiaries: [...prev.beneficiaries, beneficiary] }));
  }, []);

  const updateBeneficiary = useCallback((id: string, updates: Partial<BeneficiaryPlan>) => {
    setPlan((prev) => ({
      ...prev,
      beneficiaries: prev.beneficiaries.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    }));
  }, []);

  const removeBeneficiary = useCallback((id: string) => {
    setPlan((prev) => ({
      ...prev,
      beneficiaries: prev.beneficiaries.filter((beneficiary) => beneficiary.id !== id),
    }));
  }, []);

  const setProtectedDataAddress = useCallback((protectedDataAddress: string) => {
    setPlan((prev) => ({ ...prev, protectedDataAddress }));
  }, []);

  const clearPlan = useCallback(() => {
    setPlan(initialState);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const getProtectorPayload = useCallback(() => {
    const ownerWallet = plan.ownerWallet || user?.publicKey || "";
    const ownerName = plan.ownerName || "Owner";
    const cryptoAsset = plan.cryptoAsset || "ETH";
    const amount = plan.amount || "0";

    const payload: Record<string, string> = {
      owner_wallet: ownerWallet,
      owner_name: ownerName,
      crypto_asset: cryptoAsset,
      amount,
      beneficiary_count: String(plan.beneficiaries.length),
      plan_type: mapPlanTypeToDataProtectorType(plan.planType),
      release_timestamp: plan.releaseTimestamp || "",
      is_active: plan.isActive ?? "false",
      inactivity_period_days: plan.inactivityPeriodDays || "",
      health_oracle_address: plan.healthOracleAddress || "",
    };

    plan.beneficiaries.forEach((beneficiary, index) => {
      Object.assign(payload, normalizeBeneficiary(beneficiary, index));
    });

    return payload;
  }, [plan, user?.publicKey]);

  const value = useMemo(
    () => ({
      plan,
      setPlanField,
      setPlanType,
      setOwnerInfo,
      setAssets,
      setBeneficiaries,
      addBeneficiary,
      updateBeneficiary,
      removeBeneficiary,
      setProtectedDataAddress,
      clearPlan,
      getProtectorPayload,
    }),
    [plan, setPlanField, setPlanType, setOwnerInfo, setAssets, setBeneficiaries, addBeneficiary, updateBeneficiary, removeBeneficiary, setProtectedDataAddress, clearPlan, getProtectorPayload],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
