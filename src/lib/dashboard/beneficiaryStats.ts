// Aggregates stats for the beneficiary dashboard from the /beneficiary/view-inheritances endpoint
// Usage: const stats = getBeneficiaryStats(apiResponse)

export interface BeneficiaryPlan {
  amount: number | null;
  is_funded: boolean;
  is_released: boolean;
  plan_type: string;
  id: number;
  [key: string]: any;
}

export interface BeneficiaryDashboardStats {
  totalInheritedValue: number;
  totalInheritedValueUsd: string;
  percentChange: string;
  pendingApprovals: number;
  taxSummary: string;
}

// Placeholder: ETH to USD conversion (should be replaced with live price)
const ETH_TO_USD = 4000;

export function getBeneficiaryStats(apiData: any): BeneficiaryDashboardStats {
  const plans: BeneficiaryPlan[] = Array.isArray(apiData?.data?.plans) ? apiData.data.plans : [];

  // Total inherited value: sum of funded plan amounts (ETH only for now)
  let totalEth = 0;
  plans.forEach(plan => {
    if (plan.is_funded && typeof plan.amount === 'number') {
      totalEth += plan.amount;
    }
  });
  const totalInheritedValue = totalEth;
  const totalInheritedValueUsd = `$${(totalEth * ETH_TO_USD).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  // Pending approvals: plans that are funded but not released
  const pendingApprovals = plans.filter(plan => plan.is_funded && !plan.is_released).length;

  // Tax summary: placeholder
  const taxSummary = '~0% average';

  // Percent change: placeholder
  const percentChange = '+5.2%';

  return {
    totalInheritedValue,
    totalInheritedValueUsd,
    percentChange,
    pendingApprovals,
    taxSummary,
  };
}
