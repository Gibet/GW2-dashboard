import { useQuery } from "@tanstack/react-query";
import {
  getAchievementCategories,
  getAchievementGroups,
} from "../utils/services/achievements";
import { Accordion } from "../components/generic/accordion/accordion";
import { AccordionItem } from "../components/generic/accordion/accordionItem";
import { AccordionTrigger } from "../components/generic/accordion/accordionTrigger";
import { AccordionContent } from "../components/generic/accordion/accordionContent";
import { useMemo, useState } from "react";
import type {
  AchievementCategoryType,
  AchievementGroupType,
} from "../utils/types/achievements";
import AchievementsView from "../components/achievements/achievementsView";
import { getAccountAchievements } from "../utils/services/account";
import { useAccount } from "../contexts/accountContext";
import type { AccountAchievementType } from "../utils/types/account";

const Achievements = () => {
  const account = useAccount();
  const [group, setGroup] = useState<AchievementGroupType | undefined>(
    undefined,
  );
  const [category, setCategory] = useState<AchievementCategoryType | undefined>(
    undefined,
  );

  const {
    data: groups,
    isLoading: loadingGrps,
    isError: isErrorGrps,
    error: errorGrps,
  } = useQuery({
    queryKey: ["Groups"],
    queryFn: getAchievementGroups,
  });

  const {
    data: categories,
    isLoading: loadingCtgrs,
    isError: isErrorCtgrs,
    error: errorCtgrs,
  } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => getAchievementCategories(),
  });

  const {
    data: accountAchmnts,
    isLoading: loadingAccAchmnts,
    isError: isErrorAccAchmnts,
    error: errorAccAchmnts,
  } = useQuery({
    queryKey: ["AccountAchievements"],
    queryFn: () => getAccountAchievements(),
    enabled: !!account?.token,
  });

  const sortedCategories = useMemo(() => {
    if (!categories || !groups) return {};

    return groups.reduce<Record<number, AchievementCategoryType[]>>(
      (acc, group) => {
        acc[group.id] = group.categories
          .map((categoryId) =>
            categories.find((category) => category.id === categoryId),
          )
          .filter((category): category is AchievementCategoryType => Boolean(category));

        return acc;
      }, {},
    );
  }, [groups, categories]);

  const sortedAccountAchievementsById = useMemo(() => {
    if (!groups || !categories || !accountAchmnts) return {};

    const categoriesById = Object.fromEntries(
      categories.map((category) => [category.id, category]),
    ) as Record<number, AchievementCategoryType>;

    const groupById = Object.fromEntries(
      groups.map((group) => [group.id, group]),
    ) as Record<number, AchievementGroupType>;

    const achievementToCategory = new Map<
      number,
      {
        groupId: number;
        categoryId: number;
      }
    >();

    groups.forEach((group) => {
      group.categories.forEach((categoryId) => {
        const category = categoriesById[categoryId];
        category?.achievements.forEach((achievementId) => {
          achievementToCategory.set(achievementId, {
            groupId: group.id,
            categoryId: category.id,
          });
        });
      });
    });

    const result: AccountAchievementsByGroup = {};

    accountAchmnts.forEach((accountAch) => {
      const mapping = achievementToCategory.get(accountAch.id);
      if (!mapping) return;

      if (!result[mapping.groupId]) {
        result[mapping.groupId] = {
          group: groupById[mapping.groupId],
          categories: {},
        };
      }

      if (!result[mapping.groupId].categories[mapping.categoryId]) {
        result[mapping.groupId].categories[mapping.categoryId] = {
          category: categoriesById[mapping.categoryId],
          achievements: [],
        };
      }

      result[mapping.groupId].categories[mapping.categoryId].achievements.push(
        accountAch,
      );
    });

    return result;
  }, [groups, categories, accountAchmnts]);

  /* function isNumberArray(a: number[] | CategoryAchievementType[]): a is number[] {
    return a.length === 0 || typeof a[0] === 'number'
  } */

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 flex flex-col gap-1 border-r py-4 px-3 text-left">
        {loadingGrps && <div>Loading...</div>}
        {isErrorGrps && (
          <div className="text-red-500">Error: {errorGrps?.message}</div>
        )}
        <Accordion>
          {groups?.map((group) => (
            <AccordionItem id={group.id} key={group.id}>
              <AccordionTrigger onClick={() => setGroup(group)}>
                {group.name}
              </AccordionTrigger>
              <AccordionContent>
                {loadingCtgrs && <div>Loading...</div>}
                {isErrorCtgrs && (
                  <div className="text-red-500">
                    Error: {errorCtgrs?.message}
                  </div>
                )}
                {sortedCategories[group.id]?.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setCategory(category)}
                    className="flex items-center gap-2 text-left"
                  >
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-6 h-6"
                    />
                    <span>{category.name}</span>
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="col-span-3">
        {(group && category) && (
          <AchievementsView
            ids={category.achievements}
            accountAchievement={  sortedAccountAchievementsById[group.id]?.categories[category.id] &&
              sortedAccountAchievementsById[group.id].categories[category.id].achievements
            }
          />
        )}
      </div>
    </div>
  );
};

type AccountAchievementsByGroup = Record<
  number,
  {
    group: AchievementGroupType;
    categories: Record<
      number,
      {
        category: AchievementCategoryType;
        achievements: AccountAchievementType[];
      }
    >;
  }
>;

export default Achievements;
