export interface SkillOrganized {
  id: number;
  name: string;
  text: string;
  skillType: number;
  skillMaxLevel: number;
  skillInitCd: number;
  unknown1: string;
  parameters: number[];
}

export const emptySkillOrganized = () => ({
  id: 0,
  name: '',
  text: '',
  skillType: -1,
  skillMaxLevel: -1,
  skillInitCd: -1,
  unknown1: '',
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
    id: result.id,
    name: result.name,
    text: result.text,
    skillType: result.skill_type,
    skillMaxLevel: result.skill_max_level,
    skillInitCd: result.skill_init_cd,
    unknown1: result.unknown_1,
    parameters: checkStringAndSplitToNum(result.parameters, '|'),
  }
  return(organized)
}
