export interface AchievementType {
  id: number
  icon?: string
  name: string
  description: string
  requirement: string
  locked_text: string
  type: string
  flags: string[]
  tiers: TierType[]
  prerequisites?: number[]
  rewards?: RewardType[]
  bits?: BitsType[]
  point_cap?: number
}

export interface TierType {
  count: number
  points: number
}

export interface RewardType {
  type: string
  id?: number
  count?: number
  region?: string
}

export interface BitsType {
  type: string
  id?: number
  text?: string
}

export interface AchievementGroupType {
  id: number
  name: string
  description: string
  order: number
  categories: number[]
}

export interface AchievementCategoryType {
  id: number
  name: string
  description: string
  order: number
  icon: string
  achievements: number[] /* | CategoryAchievementType[] */
  tommorow?: CategoryAchievementType[]
}

export interface CategoryAchievementType {
  id: number
  required_access?: RequiredAccessType
  flags?: string[]
  level?: number
}

export interface RequiredAccessType {
  product: string
  condition: string
}