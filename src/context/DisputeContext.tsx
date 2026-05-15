import React, { createContext, useContext, useState } from 'react';

export interface Dispute {
  id: number;
  plan_id: number;
  raised_by: string;
  reason: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

interface DisputeContextType {
  selectedDispute: Dispute | null;
  setSelectedDispute: (dispute: Dispute | null) => void;
  disputeFilter: string;
  setDisputeFilter: (filter: string) => void;
}

const DisputeContext = createContext<DisputeContextType | undefined>(undefined);

export const DisputeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [disputeFilter, setDisputeFilter] = useState<string>('all');

  return (
    <DisputeContext.Provider value={{ selectedDispute, setSelectedDispute, disputeFilter, setDisputeFilter }}>
      {children}
    </DisputeContext.Provider>
  );
};

export const useDispute = () => {
  const context = useContext(DisputeContext);
  if (!context) {
    throw new Error('useDispute must be used within DisputeProvider');
  }
  return context;
};
