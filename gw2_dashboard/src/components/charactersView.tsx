import { useEffect, useState } from "react";
import { getAccountCharacters } from "../utils/services/characters";
import { useQuery, useQueryClient } from '@tanstack/react-query'

const Characters = () => {
  const queryClient = useQueryClient()
  const [characters, setCharacters] = useState<string[]>([]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['Characters'],
    queryFn: getAccountCharacters
  })

  useEffect(() => {
    data && setCharacters(data)
  }, [data]);

  return (
    <div className="grid grid-cols-6 p-4">
      <div className="col-span-1 flex flex-col gap-1">
        {isPending && <div>Loading</div>}
        {isError && <div className="text-red-500">Error: {error?.message}</div>}
        {characters?.map((character) => (
          <button key={character} onClick={() => {}} className="w-full text-left">
            {character}
          </button>
        ))}
      </div>
      <div className="col-end-5">
        
      </div>
    </div>
  );
};

export default Characters;
