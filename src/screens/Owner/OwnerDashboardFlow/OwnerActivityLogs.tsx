import React from 'react';
import { useAuth } from '../../../context/useAuth';
import ActivityLogs from '../../../components/ActivityLogs/ActivityLogs';

const OwnerActivityLogs: React.FC = () => {
  const { user } = useAuth();
  return <ActivityLogs userToken={user?.token ?? null} title="Owner Activity Logs" useOrange={true} />;
};

export default OwnerActivityLogs;
