import type { AttributeType } from './character';
export interface ItemType {
  name: string
  description: string
  type: string
  level: number
  rarity: string
  vendor_value: number
  game_types: string[]
  flags: string[]
  restrictions: []
  id: number
  chat_link: string
  icon: string
  details: DetailsType
}

export interface DetailsType {
  // all
  type?: string
  // armor ( back item & trinket: same as armor minus weight_class and defense)
  weight_class?: string
  defense?: number
  infusion_slots?: InfusionType[]
  attribute_adjustment?: number
  infix_upgrade?: InfixType
  suffix_item_id?: number
  secondary_suffix_item_id?: string
  stat_choices?: number[]
  // weapon
  damage_type?: string
  min_power?: number
  max_power?: number
  // bag
  size?: number
  no_sell_or_sort?: boolean
  // consumable
  description?: string
  duration?: number
  unlock_type?: string
  color_id?: number
  recipe_id?: number
  extra_recipe_ids?: number[]
  guild_upgrade_id?: number
  apply_count?: number
  name?: string
  icon?: string
  skins?: number[]
  // gizmo
  vendor_ids?: number[]
  // minipet
  minipet_id?: number
  // salvage kit
  charges?: number
  //upgrade component
  flags?: string[]
  infusion_upgrade_flags?: string[]
  suffix?: string
  bonuses?: string[]
}

export interface BagType {
  id?: number
  size?: number
  inventory: (InventoryItemType | null)[];
}

export interface InventoryItemType {
  id: number;
  count: number
  binding?: string
  bound_to?: string
  upgrades?: unknown[]
  upgrade_slot_indices?: number[]
  stats?: {
    id: number
    attributes: AttributeType
  }
  infusions?: number[]
  charges?: number
  dyes?: (number | null)[]
  skin?: number
}

export interface InventorySlotType {
  info: InventoryItemType
  item: ItemType
}

export interface InfusionType {
  flags: string[]
  item_id?: number
}

export interface InfixType {
  id: number
  attributes: InfixAttributeType[]
  buff?: InfixBuffType
}

export interface InfixAttributeType {
  attribute: string
  modifier: number
}

export interface InfixBuffType {
  skill_id: number
  description?: string
}