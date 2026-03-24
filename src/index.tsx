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
import { OwnerDashboard } from "./screens/OwnerDashboardFlow/OwnerDashboard";
import { EscrowStateVisualization } from "./screens/DisputeResoqlutionFlow/EscrowStateVisualization"; 


import { SetInactivityPeriod } from "./screens/PlanCreationFlow/SetInactivityPeriod";
import { SetInactivityGracePeriod } from "./screens/PlanCreationFlow/SetInactivityGracePeriod";
import { ReviewInactivityOraclePlan } from "./screens/PlanCreationFlow/ReviewInactivityOraclePlan";
import { ConfirmInactivityOraclePlan } from "./screens/PlanCreationFlow/ConfirmInactivityOraclePlan";


import { ChooseProofOfLifeMethod } from "./screens/PlanCreationFlow/ChooseProofOfLifeMethod";
import { BillingAndPayment } from "./screens/BillingAndSubscription/BillingAndPayment";
import { SecureCheckout } from "./screens/BillingAndSubscription/SecureCheckout";
import { SubscriptionRenewal } from "./screens/BillingAndSubscription/SubscriptionRenewal";
import { BillingHistory } from "./screens/BillingAndSubscription/BillingHistory";
import { GracePeriodActive } from "./screens/BillingAndSubscription/GracePeriodActive";
import { ChildrensTrustAccount } from "./screens/OwnerDashboardFlow/ChildrensTrustAccount"; 
import { ComplianceSummary } from "./screens/OwnerDashboardFlow/ComplianceSummary"; 
import { OwnerDisputePlanExecution } from "./screens/OwnerDashboardFlow/OwnerDisputePlanExecution"; 
import { LegalComplianceCheck } from "./screens/OwnerDashboardFlow/LegalComplianceCheck"; 
import { MainEstateFund } from "./screens/OwnerDashboardFlow/MainEstateFund"; 
import { MarketVolatilityAlert } from "./screens/OwnerDashboardFlow/MarketVolatilityAlert"; 
import { Notifications } from "./screens/OwnerDashboardFlow/Notifications"; 
import { PlanHistory } from "./screens/OwnerDashboardFlow/PlanHistory"; 
import { RealTimeVolatility } from "./screens/OwnerDashboardFlow/RealTimeVolatility";
import { SecureStorage } from "./screens/OwnerDashboardFlow/SecureStorage"; 
import { SelectJurisdiction } from "./screens/OwnerDashboardFlow/SelectJurisdiction"; 
import { UploadSignedDoc } from "./screens/OwnerDashboardFlow/UploadSignedDoc"; 
import { ProofOfLifeConfig } from "./screens/ProofOfLifeConfig/ProofOfLifeConfig";
import { ProofOfLifeCheck } from "./screens/ProofOfLifeConfig/ProofOfLifeCheck";
import { ProofOfLifeCheckMissed } from "./screens/ProofOfLifeConfig/ProofOfLifeCheckMissed";
import { CriticalAlert } from "./screens/ProofOfLifeConfig/CriticalAlert";

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

import { AssignHealthOracleExec } from "./screens/HealthOracle/AssignHealthOracleExec";
import { SelectAcceptedDocs } from "./screens/HealthOracle/SelectAcceptedDocs";
import { HealthOracleJurisdiction } from "./screens/HealthOracle/HealthOracleJurisdiction";
import { ReviewHealthOraclePlan } from "./screens/HealthOracle/ReviewHealthOraclePlan";
import { ConfirmHealthOraclePlan } from "./screens/HealthOracle/ConfirmHealthOraclePlan";

import { ExecutorLogin } from "./screens/ExecutorDashboardFlow/ExecutorLogin";
import { ExecutorForgotPwd } from "./screens/ExecutorDashboardFlow/ExecutorForgotPwd";
import { ExecutorSetNewPwd } from "./screens/ExecutorDashboardFlow/ExecutorSetNewPwd";
import { ExecPwdResetComplete } from "./screens/ExecutorDashboardFlow/ExecPwdResetComplete";
import { ExecutorDashboard } from "./screens/ExecutorDashboardFlow/ExecutorDashboard";
import { ExecutorDisputePlan } from "./screens/ExecutorDashboardFlow/ExecutorDisputePlan";
import { ExecutorAuditLog } from "./screens/ExecutorDashboardFlow/ExecutorAuditLog";
import { ExecuteInheritancePlan } from "./screens/ExecutorDashboardFlow/ExecuteInheritancePlan";
import { DocumentVerification } from "./screens/ExecutorDashboardFlow/DocumentVerification";
import { Compliance } from "./screens/ExecutorDashboardFlow/Compliance";
import { CommunicationCenter } from "./screens/ExecutorDashboardFlow/CommunicationCenter";
import { BeneficiaryCoordination } from "./screens/ExecutorDashboardFlow/BeneficiaryCoordination";
import { MPCShareManagement } from "./screens/ExecutorDashboardFlow/MPCShareManagement";
import { ExecutorPlanXp } from "./screens/ExecutorDashboardFlow/ExecutorPlanXp";
import { SettingsAndSecurity } from "./screens/ExecutorDashboardFlow/SettingsAndSecurity";
import { ExecutorSecureStorage } from "./screens/ExecutorDashboardFlow/ExecutorSecureStorage";


import { AdministrativeLogin } from "./screens/AdministrativeFlow/AdministrativeLogin";
import { AdministrativeForgotPwd } from "./screens/AdministrativeFlow/AdministrativeForgotPwd";
import { AdministrativeSetNewPwd } from "./screens/AdministrativeFlow/AdministrativeSetNewPwd";
import { AdminPwdResetComplete } from "./screens/AdministrativeFlow/AdminPwdResetComplete";
import { AdministrativeDashboard } from "./screens/AdministrativeFlow/AdministrativeDashboard";
import { ManageExecutors } from "./screens/AdministrativeFlow/ManageExecutors";
import { RoleAccessControl } from "./screens/AdministrativeFlow/RoleAccessControl";


createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Home />} /> ✅
        <Route path="/pricing" element={<Pricing />} /> ✅

        {/* User Onboarding Flow */} ✅
        <Route path="/onboarding/step-one" element={<StepOne />} /> ✅
        <Route path="/onboarding/step-two" element={<StepTwo />} /> ✅
        <Route path="/connect-wallet" element={<ConnectWallet />} /> ✅
        <Route path="/profile-setup" element={<ProfileSetupForm />} /> ✅

        {/* Recovery Flow */}
        <Route path="/wallet-recovery" element={<WalletRecovery />} /> ✅
        <Route path="/recovery-progress" element={<RecoveryProgress />} /> ✅
        <Route path="/guardian-approval" element={<GuardianApproval />} /> ✅

        {/* Plan Creation Flow */}
        <Route path="/select-assets" element={<SelectAssets />} /> ✅
        <Route path="/beneficiaries" element={<AddBeneficiaries />} /> ✅
        <Route path="/choose-plan-type" element={<ChoosePlanType />} /> ✅
        <Route path="/staggered-distribution" element={<StaggeredDistribution />} /> ✅
        <Route path="/philanthropy-plan" element={<PhilanthropyPlan />} /> ✅
        <Route path="/review-plan" element={<ReviewPlan />} /> ✅
        <Route path="/plan-activated" element={<PlanActivatedSuccess />} /> ✅

        {/* TimeLock */}
        <Route path="/set-time-lock" element={<SetTimeLock />} /> ✅
        <Route path="/review-time-lock" element={<ReviewTimeLock />} /> ✅

        {/* Inactivity Oracle */}
        <Route path="/set-inactivity-period" element={<SetInactivityPeriod />} /> ✅
        <Route path="/choose-proof-of-life" element={<ChooseProofOfLifeMethod />} />
        <Route path="/set-inactivity-grace-period" element={<SetInactivityGracePeriod />} />
        <Route path="/review-inactivity-oracle-plan" element={<ReviewInactivityOraclePlan />} />
        <Route path="/confirm-inactivity-oracle-plan" element={<ConfirmInactivityOraclePlan />} />

        {/* Health/Death Oracle */}
        <Route path="/assign-health-oracle-exec" element={<AssignHealthOracleExec />} />
        <Route path="/select-accepted-docs" element={<SelectAcceptedDocs />} />
        <Route path="/health-oracle-jurisdiction" element={<HealthOracleJurisdiction />} />
        <Route path="/review-health-oracle-plan" element={<ReviewHealthOraclePlan />} />
        <Route path="/confirm-health-oracle-plan" element={<ConfirmHealthOraclePlan />} />

        {/* Owner Dashboard Flow */}
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/plan-history" element={<PlanHistory />} />
        <Route path="/childrens-trust-account" element={<ChildrensTrustAccount />} />
        <Route path="/market-volatility-alert" element={<MarketVolatilityAlert />} />
        <Route path="/real-time-volatility" element={<RealTimeVolatility />} />
        <Route path="/main-estate-fund" element={<MainEstateFund />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/owner-dispute-plan-execution" element={<OwnerDisputePlanExecution />} />
        <Route path="/select-jurisdiction" element={<SelectJurisdiction />} />
        <Route path="/compliance-summary" element={<ComplianceSummary />} />
        <Route path="/legal-compliance-check" element={<LegalComplianceCheck />} />
        <Route path="/upload-signed-doc" element={<UploadSignedDoc />} />
        <Route path="/secure-storage" element={<SecureStorage />} />

        {/* Beneficiary Dashboard Flow */}
        <Route path="/beneficiary-dashboard" element={<BeneficiaryDashboard />} />
        <Route path="/beneficiary-details" element={<BeneficiaryDetails />} />

        {/* Dispute Resolution Flow */}
        <Route path="/dispute-plan-execution" element={<DisputePlanExecution />} />
        <Route path="/escrow-state-visualization" element={<EscrowStateVisualization />} />

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
        <Route path="/proof-of-life-config" element={<ProofOfLifeConfig />} />
        <Route path="/proof-of-life-check" element={<ProofOfLifeCheck />} />
        <Route path="/proof-of-life-check-missed" element={<ProofOfLifeCheckMissed />} />
        <Route path="/critical-alert" element={<CriticalAlert />} />

        {/* Billing and Subscription Flow */}
        <Route path="/billing-and-payment" element={<BillingAndPayment />} />
        <Route path="/secure-checkout" element={<SecureCheckout />} />
        <Route path="/subscription-renewal" element={<SubscriptionRenewal />} />
        <Route path="/billing-history" element={<BillingHistory />} />
        <Route path="/grace-period-active" element={<GracePeriodActive />} />

        {/* Mediator Flow */}
        <Route path="/mediator-login" element={<MediatorLogin />} />
        <Route path="/mediator-forgot-password" element={<MediatorForgotPwd />} />
        <Route path="/mediator-set-new-password" element={<MediatorSetNewPwd />} />
        <Route path="/mediator-password-reset-complete" element={<PwdResetComplete />} />
        <Route path="/mediator-dispute-cases-overview" element={<DisputeCasesOverview />} />
        <Route path="/mediator-all-cases" element={<AllCases />} />
        <Route path="/mediator-dispute-queue" element={<DisputeQueue />} />
        
        {/* Executor Dashboard Flow */}
        <Route path="/executor-login" element={<ExecutorLogin />} />
        <Route path="/executor-forgot-password" element={<ExecutorForgotPwd />} />
        <Route path="/executor-set-new-password" element={<ExecutorSetNewPwd />} />
        <Route path="/executor-password-reset-complete" element={<ExecPwdResetComplete />} />
        <Route path="/executor-dashboard" element={<ExecutorDashboard />} />
        <Route path="/plan-xp" element={<ExecutorPlanXp />} />
        <Route path="/document-verification" element={<DocumentVerification />} />
        <Route path="/mpc-share-management" element={<MPCShareManagement />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/beneficiary-coordination" element={<BeneficiaryCoordination />} />
        <Route path="/communication-center" element={<CommunicationCenter />} />
        <Route path="/executor-inheritance-plan" element={<ExecuteInheritancePlan />} />
        <Route path="/executor-audit-log" element={<ExecutorAuditLog />} />
        <Route path="/settings-and-security" element={<SettingsAndSecurity />} />
        <Route path="/executor-dispute-plan" element={<ExecutorDisputePlan />} />
        <Route path="/executor-secure-storage" element={<ExecutorSecureStorage />} />

        {/* Administrative Flows - 7 of 15 */} ❌
        <Route path="/administrative-login" element={<AdministrativeLogin />} />
        <Route path="/administrative-forgot-password" element={<AdministrativeForgotPwd />} />
        <Route path="/administrative-set-new-password" element={<AdministrativeSetNewPwd />} />
        <Route path="/administrative-password-reset-complete" element={<AdminPwdResetComplete />} />
        <Route path="/administrative-dashboard" element={<AdministrativeDashboard />} />
        <Route path="/manage-executors" element={<ManageExecutors />} />
        <Route path="/role-access-control" element={<RoleAccessControl />} />





        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/asset-registry" element={<AssetRegistry />} />
        <Route path="/create-plan" element={<CreatePlan />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>     
);
