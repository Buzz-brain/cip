import { Stethoscope, Heart, Clock, PauseCircle, Users, LifeBuoy } from 'lucide-react';

export const planTypeIcon = (planType?: string, isChildTrust?: boolean) => {
  if (isChildTrust) {
    return (
      <span title="Child trust" aria-label="Child trust" role="img">
        <Users className="w-4 h-4 text-[#d1c3b4]" aria-hidden={true} />
      </span>
    );
  }

  const t = (planType || '').toLowerCase();
  switch (t) {
    case 'health_oracle':
      return (
        <span title="Health oracle" aria-label="Health oracle" role="img">
          <Stethoscope className="w-4 h-4 text-[#d1c3b4]" aria-hidden={true} />
        </span>
      );
    case 'timelock':
      return (
        <span title="Timelock" aria-label="Timelock" role="img">
          <Clock className="w-4 h-4 text-[#d1c3b4]" aria-hidden={true} />
        </span>
      );
    case 'inactivity':
      return (
        <span title="Inactivity" aria-label="Inactivity" role="img">
          <PauseCircle className="w-4 h-4 text-[#d1c3b4]" aria-hidden={true} />
        </span>
      );
    case 'proof_of_life':
      return (
        <span title="Proof of life" aria-label="Proof of life" role="img">
          <LifeBuoy className="w-4 h-4 text-[#d1c3b4]" aria-hidden={true} />
        </span>
      );
    default:
      return (
        <span title="Plan" aria-label="Plan" role="img">
          <Heart className="w-4 h-4 text-[#d1c3b4]" aria-hidden={true} />
        </span>
      );
  }
};

export default planTypeIcon;
