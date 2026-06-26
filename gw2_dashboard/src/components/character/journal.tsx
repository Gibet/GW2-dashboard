import { useQuery } from "@tanstack/react-query";
import { useCharacter } from "../../contexts/characterContext";
import {
  getBackstoryAnswers,
  getQuests,
  getSeasons,
  getStories,
} from "../../utils/services/story";
import { Accordion } from "../generic/accordion/accordion";
import { AccordionContent } from "../generic/accordion/accordionContent";
import { AccordionItem } from "../generic/accordion/accordionItem";
import { AccordionTrigger } from "../generic/accordion/accordionTrigger";
import { useMemo } from "react";
import { getCharacterQuests } from "../../utils/services/characters";
import useAccountData from "../../hooks/useAccountData";
import type { QuestType, SeasonType, StoryType } from "../../utils/types/story";
import Backstory from "../story/backtory";
import { demoStory } from "../../utils/demo/demoStory";

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
    demoData: demoStory,
  });

  const {
    data: quests,
    isLoading: loadingQuests,
    isError: isErrorQuests,
    error: errorQuests,
  } = useQuery({
    queryKey: ["Quests", characterQuests?.join(",")],
    queryFn: () => getQuests(characterQuests!),
    enabled: characterQuests && characterQuests?.length > 0,
  });

  const {
    data: stories,
    isLoading: loadingStories,
    isError: isErrorStories,
    error: errorStories,
  } = useQuery({
    queryKey: ["Stories"],
    queryFn: getStories,
  });

  const {
    data: seasons,
    isLoading: loadingSeasons,
    isError: isErrorSeasons,
    error: errorSeasons,
  } = useQuery({
    queryKey: ["Seasons"],
    queryFn: getSeasons,
  });

  const orderedSeasons = useMemo(() => {
    return seasons?.sort((a, b) => {
      return a.order - b.order;
    });
  }, [seasons]);

  const sortedQuestByStoryandSeason = useMemo(() => {
    if (!quests || !stories || !orderedSeasons) return {};

    const storiesById = Object.fromEntries(
      stories.map((story) => [story.id, story]),
    ) as Record<number, StoryType>;

    const seasonById = Object.fromEntries(
      orderedSeasons.map((season) => [season.id, season]),
    ) as Record<string, SeasonType>;

    const questTostory = new Map<
      number,
      {
        seasonId: string;
        storyId: number;
      }
    >();

    orderedSeasons.forEach((season) => {
      season.stories.forEach((storyId) => {
        const story = storiesById[storyId];
        story.quests = quests.filter((quest) => quest.story === story.id);

        story?.quests?.forEach((quest) => {
          questTostory.set(quest.id, {
            seasonId: season.id,
            storyId: story.id,
          });
        });
      });
    });

    const result: QuestByStoryAndGroup = {};

    quests.forEach((quest) => {
      const mapping = questTostory.get(quest.id);
      if (!mapping) return;

      if (!result[mapping.seasonId]) {
        result[mapping.seasonId] = {
          season: seasonById[mapping.seasonId],
          stories: {},
        };
      }

      if (!result[mapping.seasonId].stories[mapping.storyId]) {
        result[mapping.seasonId].stories[mapping.storyId] = {
          story: storiesById[mapping.storyId],
          quests: [],
        };
      }

      result[mapping.seasonId].stories[mapping.storyId].quests.push(quest);
    });

    return result;
  }, [orderedSeasons, stories, quests]);

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
              <div className="flex flex-col text-left py-3 Cagliostro">
                <span>My name is {character?.data?.name}.</span>
                {answers.map((answer) => (
                  <Backstory key={answer.title} answer={answer} />
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        {(loadingChrctrQuests ||
          loadingQuests ||
          loadingStories ||
          loadingSeasons) && <div>Loading...</div>}
        {isErrorChrctrQuests && (
          <div className="text-red-500">
            Error: {errorChrctrQuests?.message}
          </div>
        )}
        {isErrorQuests && (
          <div className="text-red-500">Error: {errorQuests?.message}</div>
        )}
        {isErrorStories && (
          <div className="text-red-500">Error: {errorStories?.message}</div>
        )}
        {isErrorSeasons && (
          <div className="text-red-500">Error: {errorSeasons?.message}</div>
        )}
        {Object.entries(sortedQuestByStoryandSeason)
          .sort((a, b) => {
            return a[1].season.order - b[1].season.order;
          })
          .map((season, index) => (
            <AccordionItem key={season[1].season.id} id={index + 1}>
              <AccordionTrigger>{season[1].season.name}</AccordionTrigger>
              <AccordionContent>
                <div className="py-1 pl-2">
                  <Accordion>
                    {Object.entries(season[1].stories)
                      .sort((a, b) => {
                        return a[1].story.order - b[1].story.order;
                      })
                      .map((story) => (
                        <AccordionItem
                          key={story[1].story.name}
                          id={story[1].story.id}
                        >
                          <AccordionTrigger>
                            <div className="flex justify-between w-full pr-2">
                              <span>{story[1].story.name}</span>
                              <span>{story[1].story.timeline}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="py-1 pl-2">
                              {story[1].quests
                                .toSorted((a, b) => {
                                  return a.level - b.level;
                                })
                                .map((quest) => (
                                  <div
                                    key={quest.name}
                                    className="text-sm text-left flex flex-col"
                                  >
                                    <div className="py-2 flex flex-col gap-1">
                                      <h2 className="font-extrabold PT_Serif">
                                        {quest.name}
                                      </h2>
                                      <div>
                                        {quest.goals.map((goal) => (
                                          <p className="Cagliostro" key={goal.active}>
                                            {goal.complete}
                                          </p>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

type QuestByStoryAndGroup = Record<
  string,
  {
    season: SeasonType;
    stories: Record<
      number,
      {
        story: StoryType;
        quests: QuestType[];
      }
    >;
  }
>;

export default Journal;
