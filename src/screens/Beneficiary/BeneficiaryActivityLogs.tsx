import React from 'react';
import ActivityLogs from '../../components/ActivityLogs/ActivityLogs';
import { useAuth } from '../../context/useAuth';

const BeneficiaryActivityLogs: React.FC = () => {
  const { user } = useAuth();
  return <ActivityLogs userToken={user?.token ?? null} title="Beneficiary Activity Logs" />;
};

export default BeneficiaryActivityLogs;
