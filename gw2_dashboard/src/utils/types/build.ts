export interface SpecializationType {
   id: number
   name: string
   profession: string
   elite: boolean
   minor_traits: number[]
   major_traits: number[]
   icon: string
   background: string
   weapon_trait?: number
}

export interface TraitType {
   id: number
   name: string
   icon: string
   description: string
   specialization: number
   tier: number
   order: number
   slot: string
   facts: FactType[]
   traited_facts: TraitFactType[]
   skills: TraitSkillType[]
}

export interface SkillType {
   id: number
   name: string
   description: string
   icon: string
   facts: FactType[]
   traited_facts: TraitFactType[]
   categories?: string[]
   chat_link?: string
   slot?: string
   professions?: string[]
   specialization?: number
   weapon_type?: string
}

export interface TraitSkillType {
   id: number
   name: string
   description: string
   icon: string
   facts: FactType[]
   traited_facts: TraitFactType[]
}

export interface FactType {
   text: string
   icon: string
   type: string
   description?: string
   target?: string
   value?: number
   dmg_multiplier?: number
   hit_count?: number
   apply_count?: number
   duration?: number
   percent?: number
   field_type?: string
   distance?: number
}

export interface TraitFactType {
   required_trait: number
   overrides: number
}