import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CharacterType } from "../utils/types/character";

type CharacterContextValue = {
  data?: CharacterType;
  setData: React.Dispatch<React.SetStateAction<CharacterType | undefined>>; 
  build?: any; // to be specified
  setBuild: React.Dispatch<React.SetStateAction<any | undefined>>;
}

const CharacterContext = createContext<CharacterContextValue | undefined>(undefined)

export const CharacterProvider:  React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<CharacterType>()
  const [build, setBuild] = useState<any>()

  const value = useMemo(() => ({data, setData, build, setBuild}), 
  [data, setData, build, setBuild])

  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>
}

export const useCharacter = () => useContext(CharacterContext)