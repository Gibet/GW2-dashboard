import { useCharacter } from "../../contexts/characterContext"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCharacter } from "../../utils/services/characters"
import { useEffect, useState } from "react"
import { SecToHours } from "../../utils/functions"
import Inventory from "../items/inventoryView"
import Build from "../build/buildView"
import Equipment from "./equipment"

const characterTabs = ["Main", "Equipment", "Inventory", "Build", "Backstory"]
type CharacterTabProps = {
  name: string
}

const CharacterTab: React.FC<CharacterTabProps> = ({ name }) => {

  const queryClient = useQueryClient()
  const character = useCharacter()
  const [tab, setTab] = useState<string>(('main'))

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['character', name],
    queryFn: () => getCharacter(name),
    enabled: !!name
  })

  useEffect(() => {
    data && character?.setData(data)
  }, [data])

  useEffect(() => {
    setTab("Main")
}, [name])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex gap-3 p-4">
        {characterTabs.map((tab) => (
          <button key={tab} onClick={() => setTab(tab)}>{(tab === "Main") ? name : tab}</button>
        ))}
      </div>
      <hr />
      {isLoading && <div>Loading...</div>}
      {isError && <div className="text-red-500">Error: {error?.message}</div>}
      {(character?.data && !isLoading)  && <div className="flex flex-col items-center p-4 h-full overflow-auto">
        {(tab === 'Main') && <div className={`w-full flex flex-col col-span-4 text-left h-full ${character.data.race}`}>
          <span>Name: {character.data.name}</span>
          <span>Race: {character?.data?.race} - {character.data.gender}</span>
          <span>Profession: {character?.data?.profession}</span>
          <span>Level: {character?.data?.level}</span>
          <span>Playtime: {SecToHours(character?.data?.age)}</span>
          <ul>Crafting: {character?.data.crafting.map((training) => (<li key={training.discipline} className="px-4">{training.discipline} - level {training.rating}</li>))}</ul>
        </div>}
        {(tab === 'Equipment') && <Equipment />}
        {(tab === 'Inventory') && <Inventory bags={character.data.bags} />}
        {(tab === 'Build') && <Build specializations={character.data.specializations} skills={character.data.skills} />}
      </div>}
    </div>
  )
}

export default CharacterTab