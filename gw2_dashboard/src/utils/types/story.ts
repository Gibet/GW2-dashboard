export interface BackstoryAnswerType {
  id: number
  title: string
  description: string
  journal: string
  question: number
  professions: string[]
  races: string[] 
}

export interface QuestType {
  id: number
  name: string
  level: number
  story: number
  goals: GoalType[]
}

export interface GoalType {
  active: string
  complete: string
}

export interface SeasonType {
  id: string
  name: string
  order: number
  stories: number[]
}

export interface StoryType {
  id: number
  season: string
  name: string
  description: string
  timeline: string
  level: string
  order: number
  chapters: ChapterType[]
  races?: string[]
  flags?: string[]
  quests?: QuestType[]
}

export interface ChapterType {
  name: string
}