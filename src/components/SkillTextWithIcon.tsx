const skillsImg = Object.values(import.meta.glob('../assets/skill/*.png', { eager: true, as: 'url' }))

export const SkillTextWithIcon = ({skill}) => {
  if(skill.length === 0) {
    return null
  }
  const skillText = skill.split(/\{.*?\}/g)
  const skillIcon = skill.match(/\{.*?\}/g)
  const skillParts = []
  const textToIcon = (text: string) => {
    const curlyRemoved = text.replace(/\{(.*?)\}/, "$1")
    const leftBracketReplaced = curlyRemoved.replace("[", "%5B")
    const rightBracketReplaced = leftBracketReplaced.replace("]", "%5D")
    const spaceReplaced = rightBracketReplaced.replaceAll(" ", "%20")
    const pngAdded = spaceReplaced + ".png"
    for (const [i, value] of skillsImg.entries()) {

      if(value.includes(pngAdded)) {
        return(value)
      }
    }
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