import API from "../api"
import type { CharacterType } from "../types/character"

export const getAccountCharacters = async (): Promise<string[]> => {
  const query = await API.get<string[]>("characters")
  return query.data
}

export const getCharacter = async (name: string): Promise<CharacterType> => {
  const query = await API.get<CharacterType>(`characters/${name}`)
  return query.data
}

export const getCharacterQuests = async (name: string): Promise<number[]> => {
  const query = await API.get<number[]>(`characters/${name}/quests`)
  return query.data
}