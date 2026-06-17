import API from "../api"

export const getAchievements = async (ids: number[]) => {
  const query = await API.get("achievments", {
    params: { ids: ids.join(",")}
  })
  return query.data
}

export const getAchievementGroups = async () => {
  const query = await API.get("achievments")
  return query.data
}