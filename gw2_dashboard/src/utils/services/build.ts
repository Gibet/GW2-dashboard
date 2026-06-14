import API from "../api";
import type { SkillType, SpecializationType, TraitType } from "../types/build";

export const getSpecializations = async (ids: number[]): Promise<SpecializationType[]> => {
  const query = await API.get<SpecializationType[]>("specializations", {
    params: {ids : ids.join(",")}
  })
  return query.data
}

export const getTraits = async (ids: number[]): Promise<TraitType[]> => {
  const query = await API.get<TraitType[]>("traits", {
    params: {ids : ids.join(",")}
  })
  return query.data
}

export const getSkills = async (ids: number[]): Promise<SkillType[]> => {
  const query = await API.get<SkillType[]>("skills", {
    params: { ids: ids.join(",")}
  })
  return query.data
}