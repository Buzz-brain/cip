import React, { createContext, useState, useCallback, ReactNode } from 'react';

interface ConnectWalletContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ConnectWalletContext = createContext<ConnectWalletContextType | undefined>(undefined);

interface ConnectWalletProviderProps {
  children: ReactNode;
}

export const ConnectWalletProvider: React.FC<ConnectWalletProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ConnectWalletContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ConnectWalletContext.Provider>
  );
};

export const useConnectWallet = () => {
  const context = React.useContext(ConnectWalletContext);
  if (!context) {
    throw new Error('useConnectWallet must be used within ConnectWalletProvider');
  }
  return context;
};
