import API from "../api";
import type { AccountType } from "../types/account";
import type { BagType, InventoryItemType } from "../types/items";

export const getAccount = async (): Promise<AccountType> => {
  const query = await API.get<AccountType>("account")
  return query.data
}

export const getAccountBank = async (): Promise<(InventoryItemType | null)[]>  => {
  const query = await API.get<(InventoryItemType | null)[]>("account/bank")
  return query.data
}

export const getSharedInventory = async (): Promise<(InventoryItemType | null)[]> => {
  const query = await API.get<(InventoryItemType | null)[]>("account/inventory")
  return query.data
}