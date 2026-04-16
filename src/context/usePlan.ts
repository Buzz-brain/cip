import { useContext } from "react";
import { PlanContext, PlanContextType } from "./PlanContext";

export const usePlan = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};