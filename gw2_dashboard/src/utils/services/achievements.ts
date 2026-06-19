import API from "../api"
import { chunk } from "../functions"
import type { AchievementCategoryType, AchievementGroupType, AchievementType } from "../types/achievements"

export const getAchievements = async (ids: number[]): Promise<AchievementType[]> => {
  const query = await API.get<AchievementType[]>("achievements", {
    params: { ids: ids.join(",") }
  })
  return query.data
}

export const getAchievementGroupsIds = async (): Promise<number[]> => {
  const query = await API.get<number[]>("achievements/groups")
  return query.data
}

export const getAchievementGroups = async (): Promise<AchievementGroupType[]> => {
  const ids = await getAchievementGroupsIds()
  const query = await API.get<AchievementGroupType[]>("achievements/groups", {
    params: { ids: ids.join(",") }
  })
  return query.data
}

export const getAchievementCategoryIds = async (): Promise<number[]> => {
  const query = await API.get<number[]>("achievements/categories")
  return query.data
}
export const getAchievementCategories = async (): Promise<AchievementCategoryType[]> => {
  const ids = await getAchievementCategoryIds()
  const batches = chunk(ids, 200)

  const responses = await Promise.all(
    batches.map(batch =>
      API.get<AchievementCategoryType[]>("achievements/categories", { params: { ids: batch.join(",") } })
    )
  )

  return responses.flatMap(r => r.data)
}