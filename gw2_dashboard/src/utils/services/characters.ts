import API from "../api"

export const getAccountCharacters = async (): Promise<string[]> => {
  const query = await API.get<string[]>("characters")
  return query.data
}

export const getCharacter = async (name: string) => {
  const query = await API.get(`characters/${name}`)
  return query.data
}