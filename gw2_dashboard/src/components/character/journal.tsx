import { useQuery } from "@tanstack/react-query";
import { useCharacter } from "../../contexts/characterContext";
import { getBackstoryAnswers, getQuests } from "../../utils/services/story";
import { Accordion } from "../generic/accordion/accordion";
import { AccordionContent } from "../generic/accordion/accordionContent";
import { AccordionItem } from "../generic/accordion/accordionItem";
import { AccordionTrigger } from "../generic/accordion/accordionTrigger";
import { useMemo } from "react";
import { getCharacterQuests } from "../../utils/services/characters";
import useAccountData from "../../hooks/useAccountData";

const Journal = () => {
  const character = useCharacter();
  const biographyIds = useMemo(() => {
    if (!character?.data?.backstory) return [];
    const sortedIds = character.data.backstory.sort((a, b) => {
      const aFirst = Number(a.split("-")[0]);
      const bFirst = Number(b.split("-")[0]);
      return aFirst - bFirst;
    });
    return sortedIds;
  }, [character?.data?.backstory]);

  const {
    data: answers,
    isLoading: loadingAnswers,
    isError: isErrorAnswers,
    error: errorAnswers,
  } = useQuery({
    queryKey: ["Answers", character?.data?.backstory.join(",")],
    queryFn: () => getBackstoryAnswers(biographyIds),
    enabled: biographyIds?.length > 0,
  });
  
  const {
    data: characterQuests,
    isLoading: loadingChrctrQuests,
    isError: isErrorChrctrQuests,
    error: errorChrctrQuests,
  } = useAccountData({
    queryKey: ["CharacterQuests", character?.data?.name!],
    queryFn: () => getCharacterQuests(character?.data?.name!),
    enabled: !!character,
    demoData: []
  });
  
  const {
    data: quests,
    isLoading: loadingQuests,
    isError: isErrorQuests,
    error: errorQuests,
  } = useQuery({
    queryKey: ["Answers", characterQuests?.join(",")],
    queryFn: () => getQuests(characterQuests!),
    enabled: characterQuests && characterQuests?.length > 0
  });

  return (
    <div className="w-full">
      <Accordion>
        <AccordionItem id={0}>
          <AccordionTrigger>Biography</AccordionTrigger>
          <AccordionContent>
            {loadingAnswers && <div>Loading...</div>}
            {isErrorAnswers && (
              <div className="text-red-500">Error: {errorAnswers?.message}</div>
            )}
            {answers && (
              <div className="flex flex-col text-left">
                {answers.map((answer) => (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: answer.journal.replace(/<br>/, ""),
                    }}
                  />
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        {loadingChrctrQuests || loadingQuests && <div>Loading...</div>}
        {isErrorChrctrQuests && (
          <div className="text-red-500">Error: {errorChrctrQuests?.message}</div>
        )}
        {isErrorQuests && (
          <div className="text-red-500">Error: {errorQuests?.message}</div>
        )}
      </Accordion>
    </div>
  );
};

export default Journal;
