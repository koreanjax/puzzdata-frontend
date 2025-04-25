import './Skills.css'

export const Skills = ({activeName, activeText, leaderName, leaderText}) => {
  return(
    <div className="skills">
      <div className="skill-header">
        <div className="skill-name">Skill: {activeName} </div>
        <div className="skill-text">{activeText} </div>
      </div>
      <div className="skill-header">
        <div className="skill-name">Leader Skill: {leaderName} </div>
        <div className="skill-text">{leaderText} </div>
      </div>
    </div>
  )
}