import './Skills.css'
import { removeSkillColor } from '../helper/general-helper.ts'
import { SkillTextWithIcon } from './SkillTextWithIcon.tsx'
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2"

const CD_BASE: string = "Turn(s): "
const ACTIVE_SKILL: string = "Skill"

interface ISkillsProps {
  skillType: string
  skillName: string
  skillText: string
  skillLoop: boolean
  skillInitCd: number
  skillMaxLevel: number
}
export const Skills: React.FC<ISkillsProps> = (props) => {
  const {skillType, skillName, skillText, skillLoop, skillInitCd, skillMaxLevel} = props
  let maxLevelCd: number = 0
  if(skillInitCd !== undefined && skillMaxLevel !== undefined) {
    if (skillMaxLevel > 0) {
      maxLevelCd = skillInitCd - (skillMaxLevel-1)
    }
  }

  let cdString: string = ""
  if (skillType === "Skill")  {
    if (maxLevelCd > 0 && skillInitCd !== maxLevelCd) {
      cdString = CD_BASE + skillInitCd.toString() + " -> " + maxLevelCd.toString()
    } else if (maxLevelCd > 0) {
      cdString = CD_BASE + skillInitCd.toString()
    }
  }

  const skillNameClass = "skill-header "

  return(
    <div className="skill">
      <div className={skillType === ACTIVE_SKILL ?
          skillNameClass + "active-skill" :
          skillNameClass + "leader-skill"}>
        <div className="skill-name">
          {skillType}: {skillName}
        </div>
        <div className="skill-details">
          <div className="skill-cd">
            {cdString}
          </div>
          {skillLoop && 
            <HiOutlineArrowPathRoundedSquare className="skill-loop" size={24} />
          }
        </div>
      </div>
      <div className="skill-text">
        <SkillTextWithIcon skill={removeSkillColor(skillText)} />
      </div>
    </div>
  )
}

export const FilterSkill = () => {
  return(null)
}