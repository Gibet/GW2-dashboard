import API from "../api";
import type { AccountAchievementType, AccountType, CurrencyType, WalletType } from "../types/account";
import type { InventoryItemType } from "../types/items";

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

export const getAccountWallet = async (): Promise<WalletType[]> => {
  const query = await API.get<WalletType[]>("account/wallet")
  return query.data
}
export const getCurrencies = async (ids: number[]): Promise<CurrencyType[]> => {
  const query = await API.get<CurrencyType[]>("currencies", {
    params: {ids: ids.join(",")}
  })
  return query.data
}

export const getAccountAchievements = async (): Promise<AccountAchievementType[]> => {
  const query = await API.get<AccountAchievementType[]>("account/achievements")
  return query.data
}