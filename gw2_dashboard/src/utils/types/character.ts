import type { BagType, ItemType } from "./items"

export interface CharacterType {
  name: string
  race: string
  gender: string
  flags: string[]
  profession: string
  level: number
  guild: string
  age: number
  created: string
  deaths: number
  crafting: CraftingType[]
  title: number
  backstory: string[]
  wvw_abilities: WvWAbilityType[]
  equipment: EquipmentType[]
  equipment_pvp: EquipmentPVPType
  recipes: number[]
  training: TrainingType | []
  bags: BagType[]
  specializations: CharacterSpecializationsType
  skills: CharacterSkillsType
}

export interface CraftingType {
  discipline: string
  rating: number
  active: boolean
}

export interface WvWAbilityType {
  id: number
  rank: number
}

export interface EquipmentType {
  id: number
  slot: string
  upgrades?: number[]
  infusions?: number[]
  skin?: number
  stats?: StatType
  binding: string
  bound_to?: string
  dyes?: (number | null)[]
}

export interface EquipmentPVPType {
  amulet: number
  rune: number
  sigils: number[]
}

export interface StatType {
  id: number
  attributes: AttributeType
}

export interface AttributeType {
  Power?: number
  Precision?: number
  Toughness?: number
  Vitality?: number
  CritDamage?: number
  HealingPower?: number
  Healing?: number
  ConditionDamage?: number
  ConditionDuration?: number
  Concentration?: number
  BoonDuration?: number
}

export interface TrainingType {
  id: number
  spent: number
  done: boolean
}

export interface CharacterSpecializationsType {
  pve: CharacterSpecializationType[]
  pvp: CharacterSpecializationType[]
  wvw: CharacterSpecializationType[]
}

export interface CharacterSpecializationType {
  id: number
  traits: number[]
}

export interface CharacterSkillsType {
  pve: SkillBarType
  pvp: SkillBarType
  wvw: SkillBarType
}

export interface SkillBarType {
  heal: number
  utilities: number[]
  elite: number
}

export interface GearType {
  gear: EquipmentType,
  item: ItemType
}

export interface GearSetType {
  HelmAquatic?: GearType
  Backpack?: GearType
  Coat?: GearType
  Boots?: GearType
  Gloves?: GearType
  Helm?: GearType
  Leggings?: GearType
  Shoulders?: GearType
  Accessory1?: GearType
  Accessory2?: GearType
  Ring1?: GearType
  Ring2?: GearType
  Amulet?: GearType
  WeaponAquaticA?: GearType
  WeaponAquaticB?: GearType
  WeaponA1?: GearType
  WeaponA2?: GearType
  WeaponB1?: GearType
  WeaponB2?: GearType
  Sickle?: GearType
  Axe?: GearType
  Pick?: GearType
  FishingRod?: GearType
  FishingLure?: GearType
  PowerCore?: GearType
  SensoryArray?: GearType
  Relic?: GearType
}

