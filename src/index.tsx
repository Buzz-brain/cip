import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Pricing } from "./screens/Pricing";
import { Dashboard } from "./screens/Dashboard";
import { CreatePlan } from "./screens/CreatePlan";
import { AssetRegistry } from "./screens/AssetRegistry";
import { StepOne } from "./screens/OnboardingFlow/StepOne";
import { StepTwo } from "./screens/OnboardingFlow/StepTwo";
import { ConnectWallet } from "./screens/ConnectWallet";
import { ProfileSetupForm } from "./screens/ProfileSetupForm";
import { WalletRecovery } from "./screens/WalletRecovery";
import { RecoveryProgress } from "./screens/RecoveryProgress";
import { GuardianApproval } from "./screens/GuardianApproval";
import { SelectAssets } from "./screens/PlanCreationFlow/SelectAssets";
import { AddBeneficiaries } from "./screens/PlanCreationFlow/AddBeneficiaries";
import { ChoosePlanType } from "./screens/PlanCreationFlow/ChoosePlanType";
import { StaggeredDistribution } from "./screens/PlanCreationFlow/StaggeredDistribution";
import { PhilanthropyPlan } from "./screens/PlanCreationFlow/PhilantrophyPlan";
import { ReviewPlan } from "./screens/PlanCreationFlow/ReviewPlan";
import { PlanActivatedSuccess } from "./screens/PlanCreationFlow/PlanActivatedSuccess";
import { SetTimeLock } from "./screens/PlanCreationFlow/SetTimeLock";
import { ReviewTimeLock } from "./screens/PlanCreationFlow/ReviewTimeLock";
import { BeneficiaryDetails } from "./screens/BeneficiaryFlow/BeneficiaryDetails";
import { BeneficiaryDashboard } from "./screens/BeneficiaryFlow/BeneficiaryDashboard";
import { DisputePlanExecution } from "./screens/DisputeResoqlutionFlow/DisputePlanExecution";
import { EscrowStateVisualization } from "./screens/DisputeResoqlutionFlow/EscrowStateVisualization"; 
import { SetInactivityPeriod } from "./screens/PlanCreationFlow/SetInactivityPeriod";
import { ChooseProofOfLifeMethod } from "./screens/PlanCreationFlow/ChooseProofOfLifeMethod";
import { BillingAndPayment } from "./screens/BillingAndSubscription/BillingAndPayment";
import { SecureCheckout } from "./screens/BillingAndSubscription/SecureCheckout";
import { SubscriptionRenewal } from "./screens/BillingAndSubscription/SubscriptionRenewal";
import { BillingHistory } from "./screens/BillingAndSubscription/BillingHistory";
import { GracePeriodActive } from "./screens/BillingAndSubscription/GracePeriodActive";



createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-plan" element={<CreatePlan />} />
        <Route path="/asset-registry" element={<AssetRegistry />} />
        <Route path="/onboarding/step-one" element={<StepOne />} />
        <Route path="/onboarding/step-two" element={<StepTwo />} />
        <Route path="/connect-wallet" element={<ConnectWallet />} />
        <Route path="/profile-setup" element={<ProfileSetupForm />} />
        <Route path="/wallet-recovery" element={<WalletRecovery />} />
        <Route path="/recovery-progress" element={<RecoveryProgress />} />
        <Route path="/guardian-approval" element={<GuardianApproval />} />
        <Route path="/select-assets" element={<SelectAssets />} />
        <Route path="/beneficiaries" element={<AddBeneficiaries />} />
        <Route path="/choose-plan-type" element={<ChoosePlanType />} />
        <Route path="/staggered-distribution" element={<StaggeredDistribution />} />
        <Route path="/philanthropy-plan" element={<PhilanthropyPlan />} />
        <Route path="/review-plan" element={<ReviewPlan />} />
        <Route path="/plan-activated" element={<PlanActivatedSuccess />} />
        <Route path="/set-time-lock" element={<SetTimeLock />} />
        <Route path="/review-time-lock" element={<ReviewTimeLock />} />
        <Route path="/beneficiary-dashboard" element={<BeneficiaryDashboard />} />
        <Route path="/beneficiary-details" element={<BeneficiaryDetails />} />
        <Route path="/dispute-plan-execution" element={<DisputePlanExecution />} />
        <Route path="/escrow-state-visualization" element={<EscrowStateVisualization />} />
        <Route path="/set-inactivity-period" element={<SetInactivityPeriod />} />
        <Route path="/choose-proof-of-life" element={<ChooseProofOfLifeMethod />} />
        <Route path="/billing-and-payment" element={<BillingAndPayment />} />
        <Route path="/secure-checkout" element={<SecureCheckout />} />
        <Route path="/subscription-renewal" element={<SubscriptionRenewal />} />
        <Route path="/billing-history" element={<BillingHistory />} />
        <Route path="/grace-period-active" element={<GracePeriodActive />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>
);
