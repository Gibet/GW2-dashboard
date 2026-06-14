import { useEffect, useState } from "react";
import { getAccountCharacters } from "../utils/services/characters";
import { useQuery } from '@tanstack/react-query'
import CharacterTab from "./characterTab";

const Characters = () => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [name, setName] = useState<string>()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['Characters'],
    queryFn: getAccountCharacters
  })

  useEffect(() => {
    data && setCharacters(data)
  }, [data]);

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1 flex flex-col gap-1 border-r py-4">
        {isPending && <div>Loading</div>}
        {isError && <div className="text-red-500">Error: {error?.message}</div>}
        {characters?.map((character) => (
          <button key={character} onClick={() => {setName(character)}} className="w-full text-left">
            {character}
          </button>
        ))}
      </div>
      <div className="col-span-5">
        {name && <CharacterTab name={name} />}
      </div>
    </div>
  );
};

export default Characters;
