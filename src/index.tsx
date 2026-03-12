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

// import { StepThree } from "./screens/OnboardingFlow/StepThree";
// import { StepFour } from "./screens/OnboardingFlow/StepFour";

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
        {/* <Route path="/onboarding/step-three" element={<StepThree />} />
        <Route path="/onboarding/step-four" element={<StepFour />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
