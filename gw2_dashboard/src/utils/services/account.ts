import API from "../api";
import type { AccountType } from "../types/account";

export const getAccount = async (): Promise<AccountType> => {
  const query = await API.get<AccountType>("account")
  return query.data
}