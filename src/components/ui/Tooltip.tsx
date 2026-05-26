import React from 'react';

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

// Lightweight CSS-only tooltip component used across the app for consistent hints.
export const Tooltip: React.FC<Props> = ({ children, content, placement = 'top' }) => {
  const posClass = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  }[placement];

  return (
    <div className="relative inline-block group">
      {children}
      <div className={`pointer-events-none absolute ${posClass} opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50`}> 
        <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
