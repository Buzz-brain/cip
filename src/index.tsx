import { StrictMode } from "react";
// Web3Modal initialization
import { initWeb3Modal } from "./lib/wallet/web3modalConfig";
// Initialize Web3Modal once at app startup
initWeb3Modal();
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PlanProvider } from "./context/PlanContext";
import { ToastProvider } from "./components/ui/toast-context";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import OwnerDashboardLayout from "./screens/Owner/OwnerDashboardFlow/OwnerDashboardLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./screens/Home";
import { Pricing } from "./screens/Pricing";
import { ViewPlanHistory } from "./screens/Owner/ViewPlanHistory";
import { AssetRegistry } from "./screens/Owner/AssetRegistry";
import { StepOne } from "./screens/OnboardingFlow/StepOne";
import { StepTwo } from "./screens/OnboardingFlow/StepTwo";
import { ConnectWallet } from "./screens/ConnectWallet";
import { ProfileSetupForm } from "./screens/ProfileSetupForm";
import { WalletRecovery } from "./screens/WalletRecovery";
import { RecoveryProgress } from "./screens/RecoveryProgress";
import { GuardianApproval } from "./screens/GuardianApproval";
import { SelectAssets } from "./screens/Owner/PlanCreationFlow/SelectAssets";
import { AddBeneficiaries } from "./screens/Owner/PlanCreationFlow/AddBeneficiaries";
import { ChoosePlanType } from "./screens/Owner/PlanCreationFlow/ChoosePlanType";
import { StaggeredDistribution } from "./screens/Owner/PlanCreationFlow/StaggeredDistribution/StaggeredDistribution.tsx";
import { PhilanthropyPlan } from "./screens/Owner/PlanCreationFlow/Philantrophy/PhilantrophyPlan.tsx";
import { ReviewPlan } from "./screens/Owner/PlanCreationFlow/ReviewPlan";
import { PlanActivatedSuccess } from "./screens/Owner/PlanCreationFlow/PlanActivatedSuccess";
import { SetTimeLock } from "./screens/Owner/PlanCreationFlow/TimeLock/SetTimeLock.tsx";
import { ReviewTimeLock } from "./screens/Owner/PlanCreationFlow/TimeLock/ReviewTimeLock.tsx";
import { BeneficiaryDetails } from "./screens/Beneficiary/BeneficiaryDetails.tsx";
import { BeneficiaryDashboard } from "./screens/Beneficiary/BeneficiaryDashboard.tsx";
import BeneficiaryActivityLogs from "./screens/Beneficiary/BeneficiaryActivityLogs";
import { DisputePlanExecution } from "./screens/DisputeResolutionFlow/DisputePlanExecution";
import { OwnerDashboard } from "./screens/Owner/OwnerDashboardFlow/Dashboard/OwnerDashboard";
import { EscrowStateVisualization } from "./screens/DisputeResolutionFlow/EscrowStateVisualization"; 
import { MPCSelected } from "./screens/Owner/PlanCreationFlow/MPCSelected/MPCSelected.tsx"; 


import { SetInactivityPeriod } from "./screens/Owner/PlanCreationFlow/InactivityOracle/SetInactivityPeriod.tsx";
import { SetInactivityGracePeriod } from "./screens/Owner/PlanCreationFlow/InactivityOracle/SetInactivityGracePeriod.tsx";
import { ReviewInactivityOraclePlan } from "./screens/Owner/PlanCreationFlow/InactivityOracle/ReviewInactivityOraclePlan.tsx";
import { ConfirmInactivityOraclePlan } from "./screens/Owner/PlanCreationFlow/InactivityOracle/ConfirmInactivityOraclePlan.tsx";


import { ChooseProofOfLifeMethod } from "./screens/Owner/PlanCreationFlow/InactivityOracle/ChooseProofOfLifeMethod.tsx";
import { BillingAndPayment } from "./screens/Owner/BillingAndSubscription/BillingAndPayment";
import { SecureCheckout } from "./screens/Owner/BillingAndSubscription/SecureCheckout";
import { SubscriptionRenewal } from "./screens/Owner/BillingAndSubscription/SubscriptionRenewal";
import { BillingHistory } from "./screens/Owner/BillingAndSubscription/BillingHistory";
import { GracePeriodActive } from "./screens/Owner/BillingAndSubscription/GracePeriodActive";
import { ChildrensTrustAccount } from "./screens/Owner/OwnerDashboardFlow/ChildrensTrustAccount"; 
import { ComplianceSummary } from "./screens/Owner/OwnerDashboardFlow/ComplianceSummary"; 
import { OwnerDisputePlanExecution } from "./screens/Owner/OwnerDashboardFlow/OwnerDisputePlanExecution.tsx"; 
import { LegalComplianceCheck } from "./screens/Owner/OwnerDashboardFlow/LegalComplianceCheck.tsx"; 
import { MainEstateFund } from "./screens/Owner/OwnerDashboardFlow/MainEstateFund"; 
import { MarketVolatilityAlert } from "./screens/Owner/OwnerDashboardFlow/MarketVolatilityAlert"; 
import { Notifications } from "./screens/Owner/OwnerDashboardFlow/Notifications"; 
import { RealTimeVolatility } from "./screens/Owner/OwnerDashboardFlow/RealTimeVolatility";
import { SecureStorage } from "./screens/Owner/OwnerDashboardFlow/SecureStorage"; 
import { UploadSignedDoc } from "./screens/Owner/OwnerDashboardFlow/UploadSignedDoc"; 
import { ProofOfLifeConfig } from "./screens/Owner/OwnerDashboardFlow/Dashboard/ProofOfLifeConfig";
import OwnerActivityLogs from "./screens/Owner/OwnerDashboardFlow/OwnerActivityLogs";

import { EnterpriseLogin } from "./screens/EnterpriseFlow/EnterpriseLogin";
import { EnterpriseDashboard } from "./screens/EnterpriseFlow/EnterpriseDashboard";
import { ClientManagement } from "./screens/EnterpriseFlow/ClientManagement";
import { InheritancePlans } from "./screens/EnterpriseFlow/InheritancePlans";
import { AccessControl } from "./screens/EnterpriseFlow/AccessControl";
import { AuditLogs } from "./screens/EnterpriseFlow/AuditLogs";
import { ApiDevTools } from "./screens/EnterpriseFlow/ApiDevTools";
import { SupportCenter } from "./screens/EnterpriseFlow/SupportCenter";

import { MediatorLogin } from "./screens/MediatorFlow/MediatorLogin";
import { MediatorForgotPwd } from "./screens/MediatorFlow/MediatorForgotPwd";
import { MediatorSetNewPwd } from "./screens/MediatorFlow/MediatorSetNewPwd";
import { PwdResetComplete } from "./screens/MediatorFlow/PwdResetComplete";
import { DisputeCasesOverview } from "./screens/MediatorFlow/DisputeCasesOverview";
import { AllCases } from "./screens/MediatorFlow/AllCases";
import { DisputeQueue } from "./screens/MediatorFlow/DisputeQueue";

import { AssignHealthOracleExec } from "./screens/Owner/PlanCreationFlow/HealthOracle/AssignHealthOracleExec.tsx";
import { ReviewHealthOraclePlan } from "./screens/Owner/PlanCreationFlow/HealthOracle/ReviewHealthOraclePlan.tsx";
import { ConfirmHealthOraclePlan } from "./screens/Owner/PlanCreationFlow/HealthOracle/ConfirmHealthOraclePlan.tsx";

import { ExecutorLogin } from "./screens/Executor/ExecutorLogin.tsx";
import { ExecutorForgotPwd } from "./screens/Executor/ExecutorForgotPwd.tsx";
import { ExecutorSetNewPwd } from "./screens/Executor/ExecutorSetNewPwd.tsx";
import { ExecPwdResetComplete } from "./screens/Executor/ExecPwdResetComplete.tsx";
import { ExecutorDashboard } from "./screens/Executor/ExecutorDashboard.tsx";
import ExecutorActivityLogs from "./screens/Executor/ExecutorActivityLogs";
import { ExecutorDisputePlan } from "./screens/Executor/ExecutorDisputePlan.tsx";
import { ExecutorAuditLog } from "./screens/Executor/ExecutorAuditLog.tsx";
import { ExecuteInheritancePlan } from "./screens/Executor/ExecuteInheritancePlan.tsx";
import { DocumentVerification } from "./screens/Executor/DocumentVerification.tsx";
import { Compliance } from "./screens/Executor/Compliance.tsx";
import { CommunicationCenter } from "./screens/Executor/CommunicationCenter.tsx";
import { BeneficiaryCoordination } from "./screens/Executor/BeneficiaryCoordination.tsx";
import { MPCShareManagement } from "./screens/Executor/MPCShareManagement.tsx";
import { ExecutorPlanXp } from "./screens/Executor/ExecutorPlanXp.tsx";
import { SettingsAndSecurity } from "./screens/Executor/SettingsAndSecurity.tsx";
import { ExecutorSecureStorage } from "./screens/Executor/ExecutorSecureStorage.tsx";
import ExecutorLayout from "./screens/Executor/ExecutorLayout.tsx";


import { AdministrativeLogin } from "./screens/AdministrativeFlow/AdministrativeLogin";
import { AdministrativeForgotPwd } from "./screens/AdministrativeFlow/AdministrativeForgotPwd";
import { AdministrativeSetNewPwd } from "./screens/AdministrativeFlow/AdministrativeSetNewPwd";
import { AdminPwdResetComplete } from "./screens/AdministrativeFlow/AdminPwdResetComplete";
import { AdministrativeDashboard } from "./screens/AdministrativeFlow/AdministrativeDashboard";
import { ManageExecutors } from "./screens/AdministrativeFlow/ManageExecutors";
import { RoleAccessControl } from "./screens/AdministrativeFlow/RoleAccessControl";

import { Login } from "./screens/Login";


createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
      <PlanProvider>
        <BrowserRouter>
          <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Home />} /> ✅
        <Route path="/pricing" element={<Pricing />} /> ✅

        <Route path="/login" element={<Login />} /> ✅

        {/* User Onboarding Flow */} ✅
        <Route path="/onboarding/step-one" element={<StepOne />} /> ✅
        <Route path="/onboarding/step-two" element={<StepTwo />} /> ✅
        <Route path="/connect-wallet" element={<ConnectWallet />} /> ✅
        <Route path="/profile-setup" element={<ProfileSetupForm />} /> ✅

        {/* Recovery Flow */}
        <Route path="/wallet-recovery" element={<WalletRecovery />} /> ✅
        <Route path="/recovery-progress" element={<RecoveryProgress />} /> ✅
        <Route path="/guardian-approval" element={<GuardianApproval />} /> ✅

        {/* Legacy plan/creation/time/inactivity/health routes redirect into dashboard layout */}
        <Route path="/select-assets" element={<Navigate to="/owner-dashboard/select-assets" replace />} />
        <Route path="/beneficiaries" element={<Navigate to="/owner-dashboard/beneficiaries" replace />} />
        <Route path="/choose-plan-type" element={<Navigate to="/owner-dashboard/choose-plan-type" replace />} />
        <Route path="/staggered-distribution" element={<Navigate to="/owner-dashboard/staggered-distribution" replace />} />
        <Route path="/philanthropy-plan" element={<Navigate to="/owner-dashboard/philanthropy-plan" replace />} />
        <Route path="/review-plan" element={<Navigate to="/owner-dashboard/review-plan" replace />} />
        <Route path="/plan-activated" element={<Navigate to="/owner-dashboard/plan-activated" replace />} />

        <Route path="/set-time-lock" element={<Navigate to="/owner-dashboard/set-time-lock" replace />} />
        <Route path="/review-time-lock" element={<Navigate to="/owner-dashboard/review-time-lock" replace />} />

        <Route path="/set-inactivity-period" element={<Navigate to="/owner-dashboard/set-inactivity-period" replace />} />
        <Route path="/choose-proof-of-life" element={<Navigate to="/owner-dashboard/choose-proof-of-life" replace />} />
        <Route path="/set-inactivity-grace-period" element={<Navigate to="/owner-dashboard/set-inactivity-grace-period" replace />} />
        <Route path="/review-inactivity-oracle-plan" element={<Navigate to="/owner-dashboard/review-inactivity-oracle-plan" replace />} />
        <Route path="/confirm-inactivity-oracle-plan" element={<Navigate to="/owner-dashboard/confirm-inactivity-oracle-plan" replace />} />

        <Route path="/assign-health-oracle-exec" element={<Navigate to="/owner-dashboard/assign-health-oracle-exec" replace />} />
        <Route path="/review-health-oracle-plan" element={<Navigate to="/owner-dashboard/review-health-oracle-plan" replace />} />
        <Route path="/confirm-health-oracle-plan" element={<Navigate to="/owner-dashboard/confirm-health-oracle-plan" replace />} />

        <Route path="/mpc-selected" element={<Navigate to="/owner-dashboard/mpc-selected" replace />} />

        {/* Owner Dashboard Flow - protected layout with nested routes */}
        <Route path="/owner-dashboard" element={<ProtectedRoute><OwnerDashboardLayout /></ProtectedRoute>}>
          <Route index element={<OwnerDashboard />} />
          <Route path="activity-logs" element={<OwnerActivityLogs />} />
          <Route path="view-plan-history" element={<ViewPlanHistory />} />
          <Route path="childrens-trust-account" element={<ChildrensTrustAccount />} />
          <Route path="market-volatility-alert" element={<MarketVolatilityAlert />} />
          <Route path="real-time-volatility" element={<RealTimeVolatility />} />
          <Route path="main-estate-fund" element={<MainEstateFund />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="owner-dispute-plan-execution" element={<OwnerDisputePlanExecution />} />
          <Route path="compliance-summary" element={<ComplianceSummary />} />
          <Route path="legal-compliance-check" element={<LegalComplianceCheck />} />
          <Route path="upload-signed-doc" element={<UploadSignedDoc />} />
          <Route path="secure-storage" element={<SecureStorage />} />
          {/* Plan Creation Flow as dashboard children */}
          <Route path="select-assets" element={<SelectAssets />} />
          <Route path="beneficiaries" element={<AddBeneficiaries />} />
          <Route path="choose-plan-type" element={<ChoosePlanType />} />
          <Route path="staggered-distribution" element={<StaggeredDistribution />} />
          <Route path="philanthropy-plan" element={<PhilanthropyPlan />} />
          <Route path="review-plan" element={<ReviewPlan />} />
          <Route path="plan-activated" element={<PlanActivatedSuccess />} />

          {/* TimeLock */}
          <Route path="set-time-lock" element={<SetTimeLock />} />
          <Route path="review-time-lock" element={<ReviewTimeLock />} />

          {/* Inactivity Oracle */}
          <Route path="set-inactivity-period" element={<SetInactivityPeriod />} />
          <Route path="choose-proof-of-life" element={<ChooseProofOfLifeMethod />} />
          <Route path="set-inactivity-grace-period" element={<SetInactivityGracePeriod />} />
          <Route path="review-inactivity-oracle-plan" element={<ReviewInactivityOraclePlan />} />
          <Route path="confirm-inactivity-oracle-plan" element={<ConfirmInactivityOraclePlan />} />

          {/* Health/Death Oracle */}
          <Route path="assign-health-oracle-exec" element={<AssignHealthOracleExec />} />
          <Route path="review-health-oracle-plan" element={<ReviewHealthOraclePlan />} />
          <Route path="confirm-health-oracle-plan" element={<ConfirmHealthOraclePlan />} />

          {/* If MPC Selected */}
          <Route path="mpc-selected" element={<MPCSelected />} />

          {/* Billing and Subscription inside Owner Dashboard layout */}
          <Route path="billing-and-payment" element={<BillingAndPayment />} />
          <Route path="secure-checkout" element={<SecureCheckout />} />
          <Route path="subscription-renewal" element={<SubscriptionRenewal />} />
          <Route path="billing-history" element={<BillingHistory />} />
          <Route path="grace-period-active" element={<GracePeriodActive />} />
        </Route>

        {/* Legacy top-level owner routes redirect to the new nested paths for backward compatibility */}
        <Route path="/view-plan-history" element={<Navigate to="/owner-dashboard/view-plan-history" replace />} />
        <Route path="/childrens-trust-account" element={<Navigate to="/owner-dashboard/childrens-trust-account" replace />} />
        <Route path="/market-volatility-alert" element={<Navigate to="/owner-dashboard/market-volatility-alert" replace />} />
        <Route path="/real-time-volatility" element={<Navigate to="/owner-dashboard/real-time-volatility" replace />} />
        <Route path="/main-estate-fund" element={<Navigate to="/owner-dashboard/main-estate-fund" replace />} />
        <Route path="/notifications" element={<Navigate to="/owner-dashboard/notifications" replace />} />
        <Route path="/owner-dispute-plan-execution" element={<Navigate to="/owner-dashboard/owner-dispute-plan-execution" replace />} />
        <Route path="/select-jurisdiction" element={<Navigate to="/owner-dashboard/select-jurisdiction" replace />} />
        <Route path="/compliance-summary" element={<Navigate to="/owner-dashboard/compliance-summary" replace />} />
        <Route path="/legal-compliance-check" element={<Navigate to="/owner-dashboard/legal-compliance-check" replace />} />
        <Route path="/upload-signed-doc" element={<Navigate to="/owner-dashboard/upload-signed-doc" replace />} />
        <Route path="/secure-storage" element={<Navigate to="/owner-dashboard/secure-storage" replace />} />

        {/* Beneficiary Dashboard Flow */}
        <Route path="/beneficiary-dashboard" element={<BeneficiaryDashboard />} /> 
        <Route path="/beneficiary-details" element={<BeneficiaryDetails />} />
        <Route path="/beneficiary-dashboard/activity-logs" element={<BeneficiaryActivityLogs />} />

        {/* Dispute Resolution Flow */}
        <Route path="/dispute-plan-execution" element={<DisputePlanExecution />} /> ✅
        <Route path="/escrow-state-visualization" element={<EscrowStateVisualization />} /> ✅

        {/* Enterprise Flow */}
        <Route path="/enterprise-login" element={<EnterpriseLogin />} />
        <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="/inheritance-plans" element={<InheritancePlans />} />
        <Route path="/access-control" element={<AccessControl />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/api-dev-tools" element={<ApiDevTools />} />
        <Route path="/support-center" element={<SupportCenter />} />

        {/* Proof of Life Configuration  */}
        <Route path="/proof-of-life-config" element={<ProofOfLifeConfig />} /> ✅
        {/* proof-of-life flows are modal-driven from the Owner Dashboard */}

        {/* Billing and Subscription Flow (moved under /owner-dashboard) */}

        {/* Mediator Flow */}
        <Route path="/mediator-login" element={<MediatorLogin />} /> ✅
        <Route path="/mediator-forgot-password" element={<MediatorForgotPwd />} /> ✅
        <Route path="/mediator-set-new-password" element={<MediatorSetNewPwd />} /> ✅
        <Route path="/mediator-password-reset-complete" element={<PwdResetComplete />} /> ✅
        <Route path="/mediator-dispute-cases-overview" element={<DisputeCasesOverview />} /> ✅
        <Route path="/mediator-all-cases" element={<AllCases />} /> ✅
        <Route path="/mediator-dispute-queue" element={<DisputeQueue />} /> ✅
        
        {/* Executor Flow: auth routes remain top-level, dashboard and tools nested under protected layout */}
        <Route path="/executor-login" element={<ExecutorLogin />} /> ✅
        <Route path="/executor-forgot-password" element={<ExecutorForgotPwd />} /> ✅
        <Route path="/executor-set-new-password" element={<ExecutorSetNewPwd />} /> ✅
        <Route path="/executor-password-reset-complete" element={<ExecPwdResetComplete />} /> ✅

        <Route path="/executor-dashboard" element={<ProtectedRoute><ExecutorLayout /></ProtectedRoute>}>
          <Route index element={<ExecutorDashboard />} />
          <Route path="activity-logs" element={<ExecutorActivityLogs />} />
          <Route path="plan-xp" element={<ExecutorPlanXp />} />
          <Route path="document-verification" element={<DocumentVerification />} />
          <Route path="mpc-share-management" element={<MPCShareManagement />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="beneficiary-coordination" element={<BeneficiaryCoordination />} />
          <Route path="communication-center" element={<CommunicationCenter />} />
          <Route path="executor-inheritance-plan" element={<ExecuteInheritancePlan />} />
          <Route path="executor-audit-log" element={<ExecutorAuditLog />} />
          <Route path="settings-and-security" element={<SettingsAndSecurity />} />
          <Route path="executor-dispute-plan" element={<ExecutorDisputePlan />} />
          <Route path="executor-secure-storage" element={<ExecutorSecureStorage />} />
        </Route>

        {/* Administrative Flows - 7 of 15 */} ❌
        <Route path="/administrative-login" element={<AdministrativeLogin />} /> ✅
        <Route path="/administrative-forgot-password" element={<AdministrativeForgotPwd />} /> ✅
        <Route path="/administrative-set-new-password" element={<AdministrativeSetNewPwd />} /> ✅
        <Route path="/administrative-password-reset-complete" element={<AdminPwdResetComplete />} /> ✅
        <Route path="/administrative-dashboard" element={<AdministrativeDashboard />} />
        <Route path="/manage-executors" element={<ManageExecutors />} />
        <Route path="/role-access-control" element={<RoleAccessControl />} />





        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/asset-registry" element={<AssetRegistry />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
      </PlanProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
