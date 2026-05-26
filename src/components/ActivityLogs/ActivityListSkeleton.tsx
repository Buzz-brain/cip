import React from 'react';

type Props = {
  count?: number;
  className?: string;
};

const ActivityListSkeleton: React.FC<Props> = ({ count = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 bg-[#241C16] rounded-lg border border-[#392f28]">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-[#2c231a] rounded-md" />
              <div className="flex-1">
                <div className="h-4 bg-[#2c231a] rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-3 bg-[#2c231a] rounded w-1/2 animate-pulse" />
              </div>
            </div>
            <div className="w-20 h-4 bg-[#2c231a] rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityListSkeleton;
