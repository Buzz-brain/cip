import React from "react";

type SkeletonCardProps = {
  className?: string;
};

export const SkeletonCard = ({ className = "" }: SkeletonCardProps) => {
  return (
    <div className={`bg-[#181511] border border-[#392f28] rounded-xl p-6 animate-pulse ${className}`} aria-busy="true">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-[#27221c] rounded-lg" />
          <div className="flex-1">
            <div className="h-4 bg-[#27221c] rounded w-1/2 mb-2" />
            <div className="h-3 bg-[#27221c] rounded w-1/3" />
          </div>
        </div>
        <div className="h-6 w-24 bg-[#27221c] rounded" />
      </div>

      <div className="grid grid-cols-2 gap-6 py-4 border-y border-[#392f28]">
        <div>
          <div className="h-3 bg-[#27221c] rounded w-2/3 mb-2" />
          <div className="h-4 bg-[#27221c] rounded w-1/2" />
        </div>
        <div>
          <div className="h-3 bg-[#27221c] rounded w-2/3 mb-2" />
          <div className="h-4 bg-[#27221c] rounded w-1/3" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="h-3 bg-[#27221c] rounded w-1/4" />
        <div className="h-8 w-20 bg-[#27221c] rounded" />
      </div>
    </div>
  );
};

export default SkeletonCard;
