import React from 'react';
export const ExecutorHeader: React.FC = () => {
  return (
    <div className="flex-1 sticky top-0 z-50">
      <header className="border-b border-[#3a3430] bg-[#1a1410]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-[#B9B09D]">
            <span className="text-sm">
              Protocol
            </span>
            <span>&gt;</span>
            <span className="text-white text-sm">
              Executor Dashboard
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default ExecutorHeader;
