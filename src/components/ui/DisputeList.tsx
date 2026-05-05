import React from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';
import getReasonDisplay from '../../lib/data/getDisputeReasonDisplay';
import { SkeletonCard } from './skeleton-card';

interface DisputeListItem {
  id: number;
  plan_id: number;
  raised_by: string | number;
  reason: string;
  status: string;
  created_at: string;
}

interface DisputeListProps {
  disputes: DisputeListItem[];
  loading?: boolean;
  onSelectDispute: (disputeId: number) => void;
  filter?: string;
  useOrange?: boolean;
}

export const DisputeList: React.FC<DisputeListProps> = ({
  disputes,
  loading = false,
  onSelectDispute,
  filter = 'all',
  useOrange = false,
}) => {
  const filteredDisputes = filter === 'all' 
    ? disputes 
    : disputes.filter((d) => d.status && d.status.toLowerCase() === filter.toLowerCase());

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (filteredDisputes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#AFA89C] mb-4">No disputes found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredDisputes.map((dispute) => (
        <Card
          key={dispute.id}
          className={`${useOrange ? 'bg-[#191012] border border-[#2a2018]' : 'bg-[#1C2620] border border-[#2a2420]'} ${useOrange ? 'hover:border-[#F97316]' : 'hover:border-[#2ccd2c]'} transition`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#241b15] flex items-center justify-center text-white font-semibold">
                      D
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        Dispute #{dispute.id}
                      </h3>
                      <p className="text-[#8b7664] text-xs">
                        Plan #{dispute.plan_id} ·{" "}
                        {new Date(dispute.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      dispute.status === "resolved"
                        ? "bg-green-500/20 text-green-400"
                        : dispute.status === "pending" ||
                          dispute.status === "initiated"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : dispute.status === "in_progress" ||
                          dispute.status === "in_progess"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {dispute.status?.toUpperCase()}
                  </span>
                </div>

                <p className="text-white text-sm mb-1">
                  {getReasonDisplay(dispute.reason).title}
                </p>
                {getReasonDisplay(dispute.reason).description && (
                  <p className="text-[#AFA89C] text-xs mb-1">
                    {getReasonDisplay(dispute.reason).description}
                  </p>
                )}
              </div>

              <Button
                onClick={() => onSelectDispute(dispute.id)}
                className={`${useOrange ? 'bg-[#F97316]' : 'bg-[#2ccd2c]'} ml-4`}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DisputeList;
