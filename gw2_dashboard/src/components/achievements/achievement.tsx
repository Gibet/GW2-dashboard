import type React from "react";
import type { AchievementType } from "../../utils/types/achievements";
import type { AccountAchievementType } from "../../utils/types/account";
import { Check } from "lucide-react";

type AchievementProps = {
  achievement: AchievementType;
  status?: AccountAchievementType | undefined;
};

const Achievement: React.FC<AchievementProps> = ({
  achievement,
  status,
}) => {
  return (
    <div className="achievement-container gap-2 relative">
      {(status?.max) && <progress value={((status.current || 0) / status.max)} className="w-full h-full absolute top-0 left-0"/>}
      <div className="achievement-header text-sm">
        {achievement.icon && (
          <img src={achievement.icon} alt={achievement.name}></img>
        )}
        <h6>{achievement.name}</h6>
      </div>
      <div className="achievement-body flex flex-col text-xs text-left gap-3">
        <p>{achievement.description && <span dangerouslySetInnerHTML={{__html: achievement.description}}/>}</p>
        <p>{achievement.requirement}</p>
        {achievement.bits && <div className="w-full">
          {achievement.bits.map((bit, index) => (
            <div key={`${bit.id}-bit-${index}`} className="grid grid-cols-12 gap-3">
              <span className="col-span-1">{(bit && status?.bits?.includes(index) || status?.done) && <Check size={16} color="green"/>}</span>
              <span className="col-span-11">{bit.text}</span>
            </div>
          ))}
        </div>}
        <div className="w-full">
          {achievement.tiers.map((tier, index) => (
            <div key={`${achievement.name}-tier-${index}`} className="grid grid-cols-12 gap-3">
              <span className="col-span-1">{status?.current && tier.count <= status?.current && <Check size={16} color="green"/>} </span>
              <span className="col-span-2">tier {index+1}</span>
              <span className="col-span-1 text-right">{tier.points} <span className="sprite-achievement-icon"></span></span>
              <span className="col-span-8">{`${tier.count} Objective${(tier.count > 1) ? 's' : ''} Completed`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievement;
