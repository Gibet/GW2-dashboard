import { useCharacter } from "../contexts/characterContext"
import { useQuery } from "@tanstack/react-query"
import { getCharacter } from "../utils/services/characters"
import { useEffect, useState } from "react"
import { SecToHours } from "../utils/functions"
import Inventory from "./inventory"

const characterTabs = ["main", "inventory", "build", "backstory"]
type CharacterTabProps = {
  name: string
}

const CharacterTab: React.FC<CharacterTabProps> = ({ name }) => {

  const character = useCharacter()
  const [tab, setTab] = useState<string>(('main'))

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['character', name],
    queryFn: () => getCharacter(name),
    enabled: !!name
  })

  useEffect(() => {
    data && character?.setData(data)
  })

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 p-4">
        {characterTabs.map((tab) => (
          <button key={tab} onClick={() => setTab(tab)}>{tab}</button>
        ))}
      </div>
      <hr />
      {isPending && <div>Loading...</div>}
      {isError && <div className="text-red-500">Error: {error?.message}</div>}
      {character?.data  && <div>
        {(tab === 'main') && <div className="w-full flex flex-col col-span-4 text-left p-4">
          <span>Name: {character.data.name}</span>
          <span>Race: {character?.data?.race}</span>
          <span>Profession: {character?.data?.profession}</span>
          <span>Level: {character?.data?.level}</span>
          <span>Playtime: {SecToHours(character?.data?.age)}</span>
          <span>Created: {new Date(character.data.created).toLocaleString()}</span>
        </div>}
        {(tab === 'inventory') && <Inventory bags={character.data.bags} />}
      </div>}
    </div>
  )
}

export default CharacterTab