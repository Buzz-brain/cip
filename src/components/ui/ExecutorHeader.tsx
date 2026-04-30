import React from 'react';
import { Activity } from "lucide-react";

export const ExecutorHeader: React.FC = () => {
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
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Ask CIP AI
              </button>
              <button className="w-8 h-8 bg-[#2a2420] rounded-lg flex items-center justify-center">
                <span className="text-orange-500">🔔</span>
              </button>
              <button className="text-gray-400 text-xs bg-[#2a2420] px-3 py-1 rounded">
                Hi, Jamie
              </button>
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </header>
      </div>
  );
};

export default ExecutorHeader;
