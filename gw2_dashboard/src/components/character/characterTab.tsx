import { useCharacter } from "../../contexts/characterContext";
import { useQueryClient } from "@tanstack/react-query";
import { getCharacter } from "../../utils/services/characters";
import { useEffect, useState } from "react";
import { SecToHours } from "../../utils/functions";
import Inventory from "../items/inventoryView";
import Build from "../build/buildView";
import Equipment from "./equipment";
import Journal from "./journal";
import CustomButton from "../generic/button";
import useAccountData from "../../hooks/useAccountData";
import { demoCharacter } from "../../utils/demo/demoCharacter";

const characterTabs = ["Main", "Equipment", "Inventory", "Build", "Journal"];
type CharacterTabProps = {
  name: string;
};

const CharacterTab: React.FC<CharacterTabProps> = ({ name }) => {
  const character = useCharacter();
  const [tab, setTab] = useState<string>("main");

  const { data, isLoading, isError, error } = useAccountData({
    queryKey: ["character", name],
    queryFn: () => getCharacter(name),
    enabled: !!name,
    demoData: demoCharacter
  });

  useEffect(() => {
    data && character?.setData(data);
  }, [data]);

  useEffect(() => {
    setTab("Main");
  }, [name]);

  return (
    <div className="flex flex-col h-full overflow-hidden text-sm">
      <div className="flex gap-3 p-4">
        {characterTabs.map((tabName) => (
          <CustomButton
            className="flex justify-center items-end gap-1"
            active={tabName === tab}
            key={tabName}
            onClick={() => setTab(tabName)}
          >
            <span
              className={`sprite-${tabName === "Main" ? character?.data?.race : tabName.toLocaleLowerCase()}`}
            ></span>
            {tabName === "Main" ? name : tabName}
          </CustomButton>
        ))}
      </div>
      <hr />
      {isLoading && <div className="p-4">Loading Character...</div>}
      {isError && <div className="p-4 text-red-500">Error: {error?.message}</div>}
      {character?.data && !isLoading && (
        <div className="flex flex-col items-center p-4 h-full overflow-auto">
          {tab === "Main" && (
            <div
              className={`w-full flex flex-col col-span-4 text-sm text-left h-full ${character.data.race}`}
            >
              <span>Name: {character.data.name}</span>
              <span>
                Race: {character?.data?.race} - {character.data.gender}
              </span>
              <span>Profession: {character?.data?.profession}</span>
              <span>Level: {character?.data?.level}</span>
              <span>Created: {new Date(character?.data?.created).toLocaleDateString()}</span>
              <span>Playtime: {SecToHours(character?.data?.age)}</span>
              <ul>
                Crafting:{" "}
                {character?.data.crafting.map((training) => (
                  <li key={training.discipline} className="px-4">
                    <span className={`sprite-${training.discipline}`}></span>
                    {training.discipline} - {training.rating}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === "Equipment" && <Equipment />}
          {tab === "Inventory" && <Inventory bags={character.data.bags} />}
          {tab === "Build" && (
            <Build
              specializations={character.data.specializations}
              skills={character.data.skills}
            />
          )}
          {tab === "Journal" && <Journal />}
        </div>
      )}
    </div>
  );
};

export default CharacterTab;
