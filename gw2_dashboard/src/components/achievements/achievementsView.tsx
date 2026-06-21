import React from "react";
import { getAchievements } from "../../utils/services/achievements";
import { useQuery } from "@tanstack/react-query";
import Achievement from "./achievement";
import type { AccountAchievementType } from "../../utils/types/account";

type AchievementsProps = {
  ids: number[];
  accountAchievement?: AccountAchievementType[] 
};

const AchievementsView: React.FC<AchievementsProps> = ({ ids, accountAchievement }) => {

  const {
    data: achievements,
    isLoading: loadingAchmnts,
    isError: isErrorAchmnts,
    error: errorAchmnts,
  } = useQuery({
    queryKey: ["Achievements", ids.join(",")],
    queryFn: () => getAchievements(ids),
  });

  return (
    <>
      {loadingAchmnts && <div>Loading...</div>}
        {isErrorAchmnts && (
          <div className="text-red-500">Error: {errorAchmnts?.message}</div>
        )}
        {achievements?.map((achievement) => (
          <div key={achievement.name}>
            <Achievement achievement={achievement} status={accountAchievement?.find(
              (achiev) => achievement.id === achiev.id)
            }/>
          </div>
        ))}
    </>
  )
};

export default AchievementsView