export interface CharacterType {
  name: string;
  race: string;
  gender: string;
  flags: string[];
  profession: string;
  level: number;
  guild: string;
  age: number;
  created: string;
  deaths: number;
  crafting: CraftingType[]
  title: number;
  backstory: string[];
  wvw_ability: WvWAbilityType[]
  equipment: EquipmentType[]
  equipement_pvp: EquipmentPVPType;
  recipes: number[];
  training: TrainingType;
  bags: BagType[]
  specializations: SpecializationsType;
  skills: SkillsType;
}

export interface CraftingType {
  discipline: string;
  rating: number;
  active: boolean;
}

export interface WvWAbilityType {
  id: number;
  rank: number;
}

export interface EquipmentType {
  id: number;
  slot: string;
  upgrades?: number[];
  infusions?: number[];
  skin?: number;
  stats?: StatType;
  binding: string[];
  bound_to?: string;
  dyes?: number[];
}

export interface EquipmentPVPType {
  amulet: number;
  rune: number;
  sigils: number[];
}

export interface StatType {
  id: number;
  attributes: AttributeType;
}

export interface AttributeType {
  Power?: number;
  Precision?: number;
  Toughness?: number;
  Vitality?: number;
  CritDamage?: number;
  HealingPower?: number;
  Healing?: number;
  ConditionDamage?: number;
  ConditionDuration?: number;
  Concentration?: number;
  BoonDuration?: number;
}

export interface TrainingType {
  id: number;
  spent: number;
  done: boolean;
}

export interface SpecializationsType {
  pve: SpecializationType;
  pvp: SpecializationType;
  wvw: SpecializationType;
}

export interface SpecializationType {
  id: number;
  traits: number[]
}

export interface SkillsType {
  pve: SkillBarType;
  pvp: SkillBarType;
  wvw: SkillBarType;
}

export interface SkillBarType {
  heal: number;
  utilities: number[];
  elite: number;
}

export interface BagType {
  id: number;
  size: number;
  inventory: (InventoryItemType | null)[];
}

export interface InventoryItemType {
  id: number;
  count: number;
  binding?: string;
  bound_to?: string;
}