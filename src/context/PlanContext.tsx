import React, { createContext, useCallback, useEffect, useMemo, useState, useRef, ReactNode } from "react";
import { useAuth } from "./useAuth";
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;


export type BeneficiaryPlan = {
  id: string;
  name: string;
  relationship: string;
  email?: string;
  walletAddress: string;
  allocation: number;
  color: string;
  initial: string;
};

export type PlanType =
  | "timelock"
  | "multi-sig"
  | "custom"
  | "health_oracle"
  | "inactivity"
  | "philanthropy"
  | "staggered"
  | "testamentary-dao";

export interface PlanCreationState {
  planType?: PlanType;
  ownerWallet?: string;
  ownerName?: string;
  cryptoAsset?: string;
  amount?: string;
  assets?: string[]; // Track all selected assets
  beneficiaries: BeneficiaryPlan[];
  releaseTimestamp?: number;
  inactivityPeriodDays?: number;
  isActive?: boolean;
  healthOracleAddress?: string;
  proofOfLifeMethod?: string;
  gracePeriod?: number;
  // Health oracle fields
  executorName?: string;
  executorEmail?: string;
  executorWallet?: string;
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
  submitPlan: (opts?: { signal?: AbortSignal }) => Promise<any>;
  /**
   * Subscribe to plan-updated events. Returns an unsubscribe function.
   */
  subscribePlansUpdated?: (cb: (detail?: any) => void) => () => void;
  /**
   * Emit a plans-updated event to all subscribers.
   */
  emitPlansUpdated?: (detail?: any) => void;
}

const STORAGE_KEY = "cip_plan_draft";


const initialState: PlanCreationState = {
  planType: "timelock",
  beneficiaries: [],
};

export const PlanContext = createContext<PlanContextType | undefined>(undefined);

interface PlanProviderProps {
  children: ReactNode;
}

export const mapPlanTypeToDataProtectorType = (planType?: PlanType): string => {
  if (!planType) return "timelock";
  // for most cases frontend id matches protector id
  switch (planType) {
    case "timelock":
      return "timelock";
    case "inactivity":
      return "inactivity";
    case "health_oracle":
      return "health_oracle";
    default:
      return String(planType);
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
  const listenersRef = useRef<Set<(detail?: any) => void>>(new Set());

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
      release_timestamp: String(plan.releaseTimestamp ?? ""),
      is_active: String(plan.isActive ?? false),
      inactivity_period_days: String(plan.inactivityPeriodDays ?? ""),
      health_oracle_address: plan.healthOracleAddress || "",
    };

    plan.beneficiaries.forEach((beneficiary, index) => {
      Object.assign(payload, normalizeBeneficiary(beneficiary, index));
    });

    return payload;
  }, [plan, user?.publicKey]);

  const submitPlan = useCallback(async ({ signal }: { signal?: AbortSignal } = {}) => {

    const url = `${BACKEND_API_URL}/inherit/create-inheritance`;

    const ownerWallet = plan.ownerWallet || user?.publicKey || "";

    // prefer explicitly assigned executor (used by Health Oracle flow)
    const executorFromPlan = plan.executorName || plan.executorEmail || plan.executorWallet
      ? {
          full_name: plan.executorName || "",
          email: plan.executorEmail || "",
          wallet: plan.executorWallet || "",
        }
      : null;

    const executor = [
      executorFromPlan || {
        full_name: plan.ownerName || user?.name || "",
        email: user?.email || "",
        wallet: ownerWallet,
      },
    ];

    const beneficiariesPayload = plan.beneficiaries.map((b) => ({
      name: b.name,
      relationship: b.relationship,
      email: b.email || "",
      wallet: b.walletAddress,
      allocation_percentage: b.allocation,
    }));

    // Build payload according to selected plan type (backend expects different shapes)
    const planType = plan.planType;
    const body: Record<string, any> = {
      crypto_asset: plan.cryptoAsset || "",
      plan_type: mapPlanTypeToDataProtectorType(planType),
    };

    // common: beneficiaries when present
    if (beneficiariesPayload && beneficiariesPayload.length > 0) {
      body.beneficiaries = beneficiariesPayload;
    }

    switch (planType) {
      case "timelock":
        // timelock requires release_timestamp and beneficiaries
        if (typeof plan.releaseTimestamp === "number") body.release_timestamp = plan.releaseTimestamp;
        break;

      case "health_oracle":
        // health oracle requires an executor and beneficiaries
        if (executor && executor.length > 0) body.executor = executor;
        break;

      case "inactivity":
        // inactivity requires inactivity_period_days, proof_of_life, grace_period, beneficiaries
        if (typeof plan.inactivityPeriodDays === "number") body.inactivity_period_days = plan.inactivityPeriodDays;
        if (plan.proofOfLifeMethod) body.proof_of_life = plan.proofOfLifeMethod;
        if (typeof plan.gracePeriod === "number") body.grace_period = plan.gracePeriod;
        break;

      default:
        // fallback: include optional fields when present
        if (typeof plan.releaseTimestamp === "number") body.release_timestamp = plan.releaseTimestamp;
        if (typeof plan.inactivityPeriodDays === "number") body.inactivity_period_days = plan.inactivityPeriodDays;
        if (plan.proofOfLifeMethod) body.proof_of_life = plan.proofOfLifeMethod;
        if (typeof plan.gracePeriod === "number") body.grace_period = plan.gracePeriod;
        if (executor && executor.length > 0) body.executor = executor;
        break;
    }

    // log body for debugging / audit trail before sending to backend
    console.log('[PlanContext] submitPlan body:', body);

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (user?.token) {
      headers["Authorization"] = `Bearer ${user.token}`;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Create inheritance failed: ${res.status} ${text}`);
      }

      return res.json();
    } catch (err) {
      console.error('[PlanContext] submitPlan error:', err);
      throw err;
    }
  }, [plan, user]);

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
      submitPlan,
      subscribePlansUpdated: (cb: (detail?: any) => void) => {
        listenersRef.current.add(cb);
        return () => listenersRef.current.delete(cb);
      },
      emitPlansUpdated: (detail?: any) => {
        listenersRef.current.forEach((cb) => {
          try { cb(detail); } catch (e) { console.error('plansUpdated listener error', e); }
        });
      },
    }),
    [plan, setPlanField, setPlanType, setOwnerInfo, setAssets, setBeneficiaries, addBeneficiary, updateBeneficiary, removeBeneficiary, setProtectedDataAddress, clearPlan, getProtectorPayload, submitPlan],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
