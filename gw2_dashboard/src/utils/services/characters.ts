import API from "../api"

export const getAccountCharacters = async () => {
  try {
    const query = await API.get("characters")
    return query.data
  } catch {}
}