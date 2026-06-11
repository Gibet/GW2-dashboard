import API from "../api";

export const getAccount = async () => {
  try {
    const query = await API.get("account")
    return query.data
  } catch {}
}