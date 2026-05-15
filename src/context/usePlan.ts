import { useContext } from "react";
import { PlanContext, PlanContextType } from "./PlanContext";

const noop = (): any => {
  // [sanitized] console.warn removed
};

export const usePlan = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (!context) {
    // [sanitized] console.warn removed
    return {
      plan: { beneficiaries: [] } as any,
      setPlanField: (_: any, __: any) => noop(),
      setPlanType: (_: any) => noop(),
      setOwnerInfo: (_: any, __: any) => noop(),
      setAssets: (_: any, __: any) => noop(),
      setBeneficiaries: (_: any) => noop(),
      addBeneficiary: (_: any) => noop(),
      updateBeneficiary: (_: any, __: any) => noop(),
      removeBeneficiary: (_: any) => noop(),
      setProtectedDataAddress: (_: any) => noop(),
      clearPlan: () => noop(),
      getProtectorPayload: () => ({}),
      submitPlan: async () => { throw new Error('submitPlan called outside PlanProvider'); },
    } as PlanContextType;
  }
  return context;
};