import React from 'react';
import { useAuth } from '../../context/useAuth';

export const ExecutorHeader: React.FC = () => {
  const { user } = useAuth();
  
  const displayName = user?.name ?? user?.email ?? (user?.userInfo?.wallet ? `${user.userInfo.wallet.slice(0,6)}...${user.userInfo.wallet.slice(-4)}` : (user?.publicKey ? `${user.publicKey.slice(0,6)}...${user.publicKey.slice(-4)}` : 'User'));
  
  return (
      <div className="flex-1 sticky top-0 z-50">
        <header className="border-b border-[#3a3430] bg-[#1a1410]">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Welcome to CIP Protocol</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-gray-400 text-xs bg-[#2a2420] px-3 py-1 rounded">
                Hi, {displayName}
              </button>
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </header>
      </div>
  );
};

export default ExecutorHeader;
