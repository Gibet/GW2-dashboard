import API from "../api"

export const getAccountCharacters = async (): Promise<string[]> => {
  const query = await API.get<string[]>("characters")
  return query.data
}