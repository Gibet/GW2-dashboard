import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import type { CharacterSpecializationsType, SkillBarType, CharacterSkillsType } from "../utils/types/character";
import { getSkills, getSpecializations, getTraits } from "../utils/services/build";
import SkillBar from "./skillBar";
import TraitLine from "./traitLine";

type Tab = keyof CharacterSpecializationsType & keyof CharacterSkillsType;
type BuildProps = {
  specializations: CharacterSpecializationsType;
  skills: CharacterSkillsType;
}

const Build: React.FC<BuildProps> = ({ specializations, skills }) => {
  const queryClient = useQueryClient()
  const [tab, setTab] = useState<Tab>("pve")

  const specsIds = useMemo(() => [...new Set(
    Array.from(specializations[tab].flatMap((spec) => spec.id))
  )], [specializations, tab])

  const skillsIds = useMemo(() => 
    [skills[tab].heal, ...skills[tab].utilities, skills[tab].elite]
  , [skills, tab])

  const { data: specs, isLoading: loadingSpecs, isError: isErrorSpecs, error: errorSpecs } = useQuery({
    queryKey: ['specializations', tab],
    queryFn: () => getSpecializations(specsIds)
  })

  const { data: skillsData, isLoading: loadingSkills, isError: isErrorSkills, error: errorSkills } = useQuery({
    queryKey: ['skiils', tab],
    queryFn: () => getSkills(skillsIds),
    enabled: skillsIds.length > 0
  })


  const traitsIds = useMemo(() => 
    specs ? specs.flatMap((spec) => [...spec.minor_traits, ...spec.major_traits]) : []
  , [specs])

  const { data: traits, isLoading: loadingTraits, isError: isErrorTraits, error: errorTraits } = useQuery({
    queryKey: ['traits', tab],
    queryFn: () => getTraits(traitsIds),
    enabled: traitsIds.length > 0
  })

  useEffect(() => {
    
  }, [tab])
  
  return (
    <div className="flex flex-col items-start p-4 gap-4">
      <div className="flex gap-3 mb-3">
        <button onClick={() => setTab('pve')}>PVE</button>
        <button onClick={() => setTab('pvp')}>PVP</button>
        <button onClick={() => setTab('wvw')}>WVW</button>
      </div>
      <div className="w-full">
        {loadingSkills && <div>Loading...</div>}
        {isErrorSkills && <div className="text-red-500">Error: {errorSkills?.message}</div>}
        {skillsData && ( <div className="flex flex-col justify-start items-center text-left">
            <span>Skills</span>
            <SkillBar skills={skillsData} />
          </div>
        )}
      </div>
      <div className="w-full">
        {(loadingSpecs && loadingTraits) && <div>Loading...</div>}
        {(isErrorSpecs && isErrorTraits) && <div className="text-red-500">
          <span>Error Specializations: {errorSpecs?.message}</span>
          <span>Error Traits: {errorTraits?.message}</span>
        </div>}
        {(specs && traits) && ( <div className="flex flex-col w-full items-center text-left">
            <span>Specializations</span>
            {specs.map((spec) => (
              <TraitLine specialization={spec} />
            ))}
          </div>
          )}
      </div>
    </div>
  )
}

export default Build