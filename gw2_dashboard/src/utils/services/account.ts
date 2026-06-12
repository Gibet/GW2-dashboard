import API from "../api";
import type { AccountProps } from "../types";

export const getAccount = async (): Promise<AccountProps> => {
  const query = await API.get<AccountProps>("account")
  return query.data
}