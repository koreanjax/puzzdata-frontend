import { SkillResult } from './data-interface.ts'

export interface SkillOrganized {
  skillId: number;
  name: string;
  text: string;
  skillType: number;
  skillMaxLevel: number;
  skillInitCd: number;
  unknown1: string;
  multiSkills: string;
  parameters: number[];
}

export const emptySkillOrganized = () => ({
  skillId: 0,
  name: '',
  text: 'None',
  skillType: -1,
  skillMaxLevel: 0,
  skillInitCd: 0,
  unknown1: '',
  multiSkills: '',
  parameters: []
})

const checkStringAndSplitToNum = (str: string, delimiter: string): number[] => {
  if(!str) {
    return([])
  } else {
    return str.split(delimiter).map(Number)
  }
}

export const SkillApiToOrganized = (result: SkillResult): SkillOrganized => {
  let organized: SkillOrganized = {
    skillId: result.skill_id,
    name: result.name,
    text: result.text,
    skillType: result.skill_type,
    skillMaxLevel: result.skill_max_level,
    skillInitCd: result.skill_init_cd,
    unknown1: result.unknown1,
    multiSkills: result.multiSkills,
    parameters: checkStringAndSplitToNum(result.parameters, '|'),
  }
  return(organized)
}
