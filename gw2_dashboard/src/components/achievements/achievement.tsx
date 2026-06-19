import type React from "react";
import type { AchievementType } from "../../utils/types/achievements";
import type { AccountAchievementType } from "../../utils/types/account";

type AchievementProps = {
  achievement: AchievementType;
  status?: AccountAchievementType | undefined;
};

const Achievement: React.FC<AchievementProps> = ({
  achievement,
  status,
}) => {
  return (
    <div className="achievement-container">
      <div className="achievement-header">
        {achievement.icon && (
          <img src={achievement.icon} alt={achievement.name}></img>
        )}
        <h6>{achievement.name}</h6>
      </div>
      <div className="achievement-body">
        <p>{achievement.description && <i>{achievement.description}</i>}</p>
        <p>{achievement.requirement}</p>
        {(status?.max) && <progress value={((status.current || 0) / status.max)} className="w-full"/>}
      </div>
    </div>
  );
};

export default Achievement;
