const skillsImgPrefix = import.meta.env.VITE_SKILL

interface ISkillTextWithIconProps {
  skill: string
}
export const SkillTextWithIcon: React.FC<ISkillTextWithIconProps> = (props) => {
  const {skill} = props
  if(skill.length === 0) {
    return null
  }
  const skillText = skill.split(/\{.*?\}/g)
  const skillIcon = skill.match(/\{.*?\}/g) as RegExpMatchArray

  const skillParts = []
  const textToIcon = (text: string): string => {
    const curlyRemoved = text.replace(/\{(.*?)\}/, "$1")
    const leftBracketReplaced = curlyRemoved.replace("[", "%5B")
    const rightBracketReplaced = leftBracketReplaced.replace("]", "%5D")
    const spaceReplaced = rightBracketReplaced.replace(/ /g, "+")
    const pngAdded = spaceReplaced + ".png"
    return(skillsImgPrefix + pngAdded)
  }

  const skillTextLength = skillText === null ? 0 : skillText.length
  const skillIconLength = skillIcon === null ? 0 : skillIcon.length

  const longerLength = skillTextLength > skillIconLength ? skillTextLength : skillIconLength
  for (let i = 0; i < longerLength; i++) {
    if(i < skillTextLength && skillText[i].length > 0) {
      skillParts.push(<span key={skillParts.length} className="skill-text-test">{skillText[i]}</span>)
    }
    if(i < skillIconLength) {
      skillParts.push(<span key={skillParts.length} className="skill-icon-span"><img className="skill-icon" src={textToIcon(skillIcon[i])}/></span>)
    }
  }

  return (
    <>
      {skillParts}
    </>
  )
}