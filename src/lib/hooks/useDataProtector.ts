import { useCallback } from "react";
import { useAuth } from "../../context/useAuth";
import * as dataProtectorApi from "../api/dataProtector";
import type { InheritancePlanData } from "../api/dataProtector";

export const useDataProtector = () => {
  const { user } = useAuth();

  const protectInheritancePlan = useCallback(
    async (plan: InheritancePlanData, name: string, provider?: any) => {
      if (!user?.publicKey) {
        throw new Error("Wallet must be connected before protecting data.");
      }
      return dataProtectorApi.protectInheritancePlan(plan, name, provider);
    },
    [user?.publicKey],
  );

  const grantAccessToIApp = useCallback(
    async (
      protectedDataAddress: string,
      numberOfAccess = 1000,
      provider?: any,
    ) => {
      if (!user?.publicKey) {
        throw new Error("Wallet must be connected before granting access.");
      }
      return dataProtectorApi.grantIAppAccess(
        protectedDataAddress,
        user.publicKey,
        numberOfAccess,
        provider,
      );
    },
    [user?.publicKey],
  );

  const revokeAccess = useCallback(
    async (protectedDataAddress: string, provider?: any) => {
      if (!user?.publicKey) {
        throw new Error("Wallet must be connected before revoking access.");
      }
      return dataProtectorApi.revokeIAppAccess(protectedDataAddress, provider);
    },
    [user?.publicKey],
  );

  const getProtectedData = useCallback(
    async (protectedDataAddress: string, provider?: any) => {
      return dataProtectorApi.getProtectedDataDetails(protectedDataAddress, provider);
    },
    [],
  );

  const getGrantedAccess = useCallback(
    async (protectedDataAddress: string, provider?: any) => {
      return dataProtectorApi.getGrantedAccess(protectedDataAddress, provider);
    },
    [],
  );

  return {
    protectInheritancePlan,
    grantAccessToIApp,
    revokeAccess,
    getProtectedData,
    getGrantedAccess,
    IAPP_ADDRESS: dataProtectorApi.IAPP_ADDRESS,
  };
};