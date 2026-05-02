import React from 'react';
import ActivityLogs from '../../components/ActivityLogs/ActivityLogs';
import { useAuth } from '../../context/useAuth';

const ExecutorActivityLogs: React.FC = () => {
  const { user } = useAuth();
  return <ActivityLogs userToken={user?.token ?? null} title="Executor Activity Logs" />;
};

export default ExecutorActivityLogs;
