import API from "../api"
import type { ItemType } from "../types/items"

export const getItems = async (ids: number[]): Promise<ItemType[]> => {
  const query = await API.get<ItemType[]>("items", {
    params: { ids: ids.join(",") }
  })
  return query.data
}