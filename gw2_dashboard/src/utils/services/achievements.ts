import API from "../api"
import type { AchievementCategoryType, AchievementGroupType, AchievementType } from "../types/achievements"

export const getAchievements = async (ids: number[]): Promise<AchievementType[]> => {
  const query = await API.get<AchievementType[]>("achievements", {
    params: { ids: ids.join(",") }
  })
  return query.data
}

export const getAchievementGroups = async (): Promise<number[]> => {
  const query = await API.get<number[]>("achievements/groups")
  return query.data
}

export const getAchievementGroupData = async (ids: number[]): Promise<AchievementGroupType[]> => {
  const query = await API.get<AchievementGroupType[]>("achievements/groups")
  return query.data
}

export const getAchievementCategory = async (ids: number[]): Promise<AchievementCategoryType[]> => {
  const query = await API.get<AchievementCategoryType[]>("achievements/categories")
  return query.data
}