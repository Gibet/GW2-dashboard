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
import CustomButton from "../components/generic/button";
import useAccountData from "../hooks/useAccountData";
import { demoAchievements } from "../utils/demo/demoAchievements";

const Achievements = () => {
  const account = useAccount();
  const [currentGroup, setCurrentGroup] = useState<
    AchievementGroupType | undefined
  >(undefined);
  const [currentCategory, setCurrentCategory] = useState<
    AchievementCategoryType | undefined
  >(undefined);

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
  } = useAccountData({
    queryKey: ["AccountAchievements"],
    queryFn: () => getAccountAchievements(),
    enabled: !!account?.token,
    demoData: demoAchievements,
  });

  const sortedCategories = useMemo(() => {
    if (!categories || !groups) return {};

    return groups.reduce<Record<number, AchievementCategoryType[]>>(
      (acc, group) => {
        acc[group.id] = group.categories
          .map((categoryId) =>
            categories.find((category) => category.id === categoryId),
          )
          .filter((category): category is AchievementCategoryType =>
            Boolean(category),
          );
        acc[group.id] = acc[group.id].toSorted((a, b) => {
          return a.order - b.order;
        });
        return acc;
      },
      {},
    );
  }, [groups, categories]);

  const orderedGroups = useMemo(() => {
    return groups?.sort((a, b) => {
      return a.order - b.order;
    });
  }, [groups]);

  const sortedAccountAchievementsById = useMemo(() => {
    if (!orderedGroups || !categories || !accountAchmnts) return {};

    const categoriesById = Object.fromEntries(
      categories.map((category) => [category.id, category]),
    ) as Record<number, AchievementCategoryType>;

    const groupById = Object.fromEntries(
      orderedGroups.map((group) => [group.id, group]),
    ) as Record<number, AchievementGroupType>;

    const achievementToCategory = new Map<
      number,
      {
        groupId: number;
        categoryId: number;
      }
    >();

    orderedGroups.forEach((group) => {
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
  }, [orderedGroups, categories, accountAchmnts]);

  /* function isNumberArray(a: number[] | CategoryAchievementType[]): a is number[] {
    return a.length === 0 || typeof a[0] === 'number'
  } */

  return (
    <div className="page_content h-full">
      <div className="grid grid-cols-4 w-full">
        <div className="col-span-1 w-full flex flex-col gap-1 border-r py-4 px-3 text-sm text-left h-full overflow-auto Lato">
          {(loadingGrps || loadingAccAchmnts) && <div>Loading...</div>}
          {(isErrorGrps || isErrorAccAchmnts) && (
            <>
              <div className="text-red-500">Error: {errorGrps?.message}</div>
              <div className="text-red-500">
                Error: {errorAccAchmnts?.message}
              </div>
            </>
          )}
          <Accordion>
            {groups?.map((group) => (
              <AccordionItem id={group.id} key={group.id}>
                <AccordionTrigger onClick={() => setCurrentGroup(group)}>
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
                    <CustomButton
                      active={category.name === currentCategory?.name}
                      key={category.name}
                      onClick={() => setCurrentCategory(category)}
                      className="flex items-center text-xs gap-2 text-left"
                    >
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="w-6 h-6"
                      />
                      <span>{category.name}</span>
                    </CustomButton>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="col-span-3 w-full flex flex-col gap-2 px-4 overflow-auto">
          {currentGroup && currentCategory && (
            <AchievementsView
              ids={currentCategory.achievements}
              accountAchievement={
                sortedAccountAchievementsById[currentGroup.id]?.categories[
                  currentCategory.id
                ]?.achievements
              }
            />
          )}
        </div>
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
