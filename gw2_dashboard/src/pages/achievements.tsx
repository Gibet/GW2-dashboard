import { useQuery } from "@tanstack/react-query";
import { getAchievementCategory, getAchievementGroupData } from "../utils/services/achievements";
import { Accordion } from "../components/generic/accordion/accordion";
import { AccordionItem } from "../components/generic/accordion/accordionItem";
import { AccordionTrigger } from "../components/generic/accordion/accordionTrigger";
import { AccordionContent } from "../components/generic/accordion/accordionContent";
import { useState } from "react";
import { type AchievementGroupType } from "../utils/types/achievements";

const Achievements = () => {
  const [group, setGroup] = useState<AchievementGroupType | undefined>(undefined)
  const {
    data: groups,
    isLoading: loadingGrps,
    isError: isErrorGrps,
    error: errorGrps,
  } = useQuery({
    queryKey: ["Groups"],
    queryFn: getAchievementGroupData,
  });

  const {
    data: categories,
    isLoading: loadingCtgrs,
    isError: isErrorCtgrs,
    error: errorCtgrs,
  } = useQuery({
    queryKey: ["Categories", group?.categories.join(",")],
    queryFn: () => getAchievementCategory(group!.categories),
    enabled: group && group.categories.length > 0
  });

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-2 flex flex-col gap-1 border-r p-4 text-left">
        {loadingGrps && <div>Loading...</div>}
        {isErrorGrps && (
          <div className="text-red-500">Error: {errorGrps?.message}</div>
        )}
        <Accordion>
          {groups &&
            groups.map((group, index) => (
              <AccordionItem id={index} key={group.name}>
                <AccordionTrigger onClick={() => setGroup(group)}>{group.name}</AccordionTrigger>
                <AccordionContent>
                  {loadingCtgrs && <div>Loading...</div>}
                  {isErrorCtgrs && (
                    <div className="text-red-500">Error: {errorCtgrs?.message}</div>
                  )}
                  {categories && categories.map(category => (
                    <div key={category.name} className="flex items-center gap-2">
                      <img src={category.icon} alt={category.name} className="w-6 h-6" />
                      <span>{category.name}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
      <div className="col-span-5"></div>
    </div>
  );
};

export default Achievements;
