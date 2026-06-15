export interface ItemType {
  name: string,
  description: string,
  type: string,
  level: number,
  rarity: string,
  vendor_value: number,
  game_types: string[],
  flags: string[],
  restrictions: [],
  id: number,
  chat_link: string,
  icon: string,
  details: DetailsType,
}

export interface DetailsType {
  type: string
}

export interface BagType {
  id?: number;
  size?: number;
  inventory: (InventoryItemType | null)[];
}

export interface InventoryItemType {
  id: number;
  count: number;
  binding?: string;
  bound_to?: string;
}

export interface InventorySlotType {
  info: InventoryItemType,
  item: ItemType
}
