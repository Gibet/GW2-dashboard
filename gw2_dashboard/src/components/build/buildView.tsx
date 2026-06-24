import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import type { CharacterSpecializationsType, CharacterSkillsType } from "../../utils/types/character";
import { getSkills, getSpecializations, getTraits } from "../../utils/services/build";
import SkillBar from "./skillBar";
import TraitLine from "./traitLine";
import CustomButton from "../generic/button";
import type { SpecializationType } from "../../utils/types/build";

type Tab = keyof CharacterSpecializationsType & keyof CharacterSkillsType;
type BuildProps = {
  specializations: CharacterSpecializationsType;
  skills: CharacterSkillsType;
}

const Build: React.FC<BuildProps> = ({ specializations, skills }) => {
  const [tab, setTab] = useState<Tab>("pve")

  const specsIds = useMemo(() => [...new Set(
    Array.from(specializations[tab].flatMap((spec) => spec.id))
  )], [specializations, tab])

  const skillsIds = useMemo(() => 
    [skills[tab].heal, ...skills[tab].utilities, skills[tab].elite]
  , [skills, tab])

  const { data: specs, isLoading: loadingSpecs, isError: isErrorSpecs, error: errorSpecs } = useQuery({
    queryKey: ['specializations', tab, specsIds.join(',')],
    queryFn: () => getSpecializations(specsIds)
  })

  const { data: skillsData, isLoading: loadingSkills, isError: isErrorSkills, error: errorSkills } = useQuery({
    queryKey: ['skiils', tab, skillsIds.join(',')],
    queryFn: () => getSkills(skillsIds),
    enabled: skillsIds.length > 0
  })


  const traitsIds = useMemo(() => 
    specs ? specs.flatMap((spec) => [...spec.minor_traits, ...spec.major_traits, ...(spec.weapon_trait ? [spec.weapon_trait]: []) ]) : []
  , [specs])

  const { data: traits, isLoading: loadingTraits, isError: isErrorTraits, error: errorTraits } = useQuery({
    queryKey: ['traits', tab, traitsIds.join(',')],
    queryFn: () => getTraits(traitsIds),
    enabled: traitsIds.length > 0
  })

  const sortedTraits = useMemo(() => {
    if (!specs || !traits) return [];
    const traitMap = new Map(traits.map(trait => [trait.id, trait]));

    return specs.map(spec => ({
      minorTraits: spec.minor_traits.map(id => traitMap.get(id)).filter(Boolean),
      majorTraits: spec.major_traits.map(id => traitMap.get(id)).filter(Boolean),
      weaponTrait: spec.weapon_trait ? traitMap.get(spec.weapon_trait) : undefined,
    }));
  }, [traits, specs])
  
  return (
    <div className="flex flex-col w-full items-start gap-4 h-full overflow-auto text-sm">
      <div className="flex gap-3 mb-3">
        <CustomButton active={tab === "pve"} onClick={() => setTab('pve')}>PvE</CustomButton>
        <CustomButton active={tab === "pvp"} onClick={() => setTab('pvp')}>PvP</CustomButton>
        <CustomButton active={tab === "wvw"} onClick={() => setTab('wvw')}>WvW</CustomButton>
      </div>
      <div className="w-full">
        {loadingSkills && <div>Loading Skills...</div>}
        {isErrorSkills && <div className="text-red-500">Error: {errorSkills?.message}</div>}
        {skillsData && ( <div className="flex flex-col justify-start items-center text-left">
            <span>Skills</span>
            <SkillBar skills={skillsData} />
          </div>
        )}
      </div>
      <div className="w-full">
        {(loadingSpecs || loadingTraits) && <div>Loading Specializations...</div>}
        {(isErrorSpecs || isErrorTraits) && <div className="text-red-500">
          <span>Error Specializations: {errorSpecs?.message}</span>
          <span>Error Traits: {errorTraits?.message}</span>
        </div>}
        {(specs && traits) && ( <div className="flex flex-col w-full items-center text-left">
            <span>Specializations</span>
            {specs.map((spec, index) => (
              <TraitLine key={spec.name} specialization={spec} traits={sortedTraits[index]} charaSpec={specializations[tab][index]} />
            ))}
          </div>
          )}
      </div>
    </div>
  )
}

export default Build