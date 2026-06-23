import API from "../api"
import type { BackstoryAnswerType, QuestType } from "../types/story"

export const getBackstoryAnswers = async (ids: string[]): Promise<BackstoryAnswerType[]> => {
  const query = await API.get<BackstoryAnswerType[]>("backstory/answers", {
    params: { ids: ids.join(',')}
  })
  return query.data
}

export const getQuests = async (ids: number[]): Promise<QuestType[]> => {
  const query = await API.get<QuestType[]>("quests", {
    params: { ids: ids.join(',')}
  })
  return query.data
}