import API from "../api"
import { chunk } from "../functions"
import type { BackstoryAnswerType, QuestType, SeasonType, StoryType } from "../types/story"

export const getBackstoryAnswers = async (ids: string[]): Promise<BackstoryAnswerType[]> => {
  const query = await API.get<BackstoryAnswerType[]>("backstory/answers", {
    params: { ids: ids.join(',') }
  })
  return query.data
}

export const getQuests = async (ids: number[]): Promise<QuestType[]> => {
  const batches = chunk(ids, 200)
  const queries = await Promise.all(
    batches.map(batch => API.get<QuestType[]>("quests", { params: { ids: batch.join(',') } }))
  )
  return queries.flatMap(r => r.data)
}

const getStoriesIds = async (): Promise<number[]> => {
  const query = await API.get<number[]>("stories")
  return query.data
}

const getSeasonIds = async (): Promise<number[]> => {
  const query = await API.get<number[]>("stories/seasons")
  return query.data
}

export const getStories = async (): Promise<StoryType[]> => {
  const ids = await getStoriesIds()
  const query = await API.get<StoryType[]>("stories", {
    params: { ids: ids.join(",") }
  })
  return query.data
}

export const getSeasons = async (): Promise<SeasonType[]> => {
  const ids = await getSeasonIds()
  const query = await API.get<SeasonType[]>("stories/seasons", {
    params: { ids: ids.join(",") }
  })
  return query.data
}