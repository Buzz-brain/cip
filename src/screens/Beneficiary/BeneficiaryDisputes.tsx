import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { DisputeList } from '@components/ui/DisputeList';
import { useViewAllDisputes } from '../../lib/hooks/useViewDispute';
import { SkeletonCard } from '@components/ui/skeleton-card';

export const BeneficiaryDisputes = (): JSX.Element => {
  const navigate = useNavigate();
  const { disputes, loading, refetch } = useViewAllDisputes();

  const onSelect = (id: number) => {
    navigate(`/beneficiary-dashboard/disputes/view/${id}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Disputes</h1>
        <div className="flex gap-2">
          <Button onClick={() => refetch()} className="bg-[#29382E]">Refresh</Button>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1,2,3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <DisputeList disputes={disputes} onSelectDispute={onSelect} />
        )}
      </div>
    </div>
  );
};

export default BeneficiaryDisputes;
