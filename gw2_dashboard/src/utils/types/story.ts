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