import './Skills.css'
import { removeSkillColor } from '../helper/general-helper.ts'
import { SkillTextWithIcon } from './SkillTextWithIcon.tsx'

const skillsImg = Object.values(import.meta.glob('../assets/skill/*.png', { eager: true, as: 'url' }))

export const Skills = ({activeName, activeText, leaderName, leaderText}) => {
  return(
    <div className="skills">
      <div className="skill-header">
        <div className="skill-name">Skill: {activeName} </div>
        <div className="skill-text">
          <SkillTextWithIcon skill={removeSkillColor(activeText)} />
        </div>
      </div>
      <div className="skill-header">
        <div className="skill-name">Leader Skill: {leaderName} </div>
        <div className="skill-text">
          <SkillTextWithIcon skill={removeSkillColor(leaderText)} />
        </div>
      </div>
    </div>
  )
}