import { useEffect, useState } from "react";
import { getAccountCharacters } from "../../utils/services/characters";
import CharacterTab from "../character/characterTab";
import CustomButton from "../generic/button";
import useAccountData from "../../hooks/useAccountData";
import { demoCharacters } from "../../utils/demo/demoCharacters";

const Characters = () => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [name, setName] = useState<string>();

  const { data, isLoading, isError, error } = useAccountData({
    queryKey: ["Characters"],
    queryFn: getAccountCharacters,
    demoData: demoCharacters
  });

  useEffect(() => {
    data && setCharacters(data);
  }, [data]);

  return (
    <div className="grid grid-cols-6 h-full overflow-hidden text-sm">
      <div className="col-span-1 text-sm flex flex-col gap-1 border-r py-4 h-full overflow-auto Cagliostro">
        {isLoading && <div>Loading</div>}
        {isError && <div className="text-red-500">Error: {error?.message}</div>}
        {characters?.map((character) => (
          <CustomButton
            active={character === name}
            key={character}
            onClick={() => {
              setName(character);
            }}
            className="w-full text-left"
          >
            {character}
          </CustomButton>
        ))}
      </div>
      <div className="col-span-5 h-full overflow-hidden">
        {name && <CharacterTab name={name} />}
      </div>
    </div>
  );
};

export default Characters;
