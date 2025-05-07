import './Skills.css'
import { removeSkillColor } from '../helper/general-helper.ts'
import { SkillTextWithIcon } from './SkillTextWithIcon.tsx'
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2"

const skillsImg = Object.values(import.meta.glob('../assets/skill/*.png', { eager: true, as: 'url' }))

const CD_BASE: string = "Turn(s): "
const ACTIVE_SKILL: string = "Skill"

export const Skills = ({skillType, skillName, skillText, skillLoop, skillInitCd, skillMaxLevel}) => {
  let maxLevelCd: number = 0
  if(skillInitCd !== undefined && skillMaxLevel !== undefined) {
    maxLevelCd = skillInitCd - (skillMaxLevel-1)
  }

  let cdString: string = ""

  if (maxLevelCd > 0 && skillInitCd !== maxLevelCd) {
    cdString = CD_BASE + skillInitCd.toString() + " -> " + maxLevelCd.toString()
  } else if (maxLevelCd > 0) {
    cdString = CD_BASE + skillInitCd.toString()
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