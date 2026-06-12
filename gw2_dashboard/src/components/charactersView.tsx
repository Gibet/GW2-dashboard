import { useEffect, useState } from "react";
import { getAccountCharacters } from "../utils/services/characters";

const Characters = () => {
  const [characters, setCharacters] = useState<string[]>([]);

  useEffect(() => {
    getAccountCharacters().then((data) => {
      setCharacters(data);
    });
  }, []);

  return (
    <div className="grid grid-cols-6 p-4">
      <div className="col-span-1 flex flex-col gap-1">
        {characters?.map((character) => (
          <button key={character} onClick={() => {}} className="w-full text-left">
            {character}
          </button>
        ))}
      </div>
      <div className="col-end-5"></div>
    </div>
  );
};

export default Characters;
