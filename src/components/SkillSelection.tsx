import './SkillSelection.css'

const skillCategory = [
  { value: 'orb', label: 'Orb Related' },
  { value: 'enhance', label: 'Enhance / Effects' },
  { value: 'hp', label: 'HP / Shield' },
  { value: 'recovery', label: 'Recovery' },
  { value: 'turn', label: 'Turn Related' },
  { value: 'defense', label: 'Enemy Defense' },
  { value: 'move', label: 'Orb Move' },
  { value: 'attack', label: 'Inflict Damage' },
  { value: 'skyfall', label: 'Skyfall' },
  { value: 'attribute', label: 'Attribute Change' },
  { value: 'gravity', label: 'Gravity' },
  { value: 'swap', label: 'Lead Swap' },
  { value: 'skill', label: 'Skill Use' },
  { value: 'board', label: 'Board' },
  { value: 'etc', label: 'Etc.'}
]

export const orbSkills = [
  { value: 'orbconvert', label: 'Convert Orbs' },
  { value: 'orbboard', label: 'Full Board' },
  { value: 'orbcreate', label: 'Create Orbs' },
  { value: 'orbline', label: 'Row / Column' },
  { value: 'orbshape', label: 'Shape' },
  { value: 'orblock', label: 'Lock Orbs' },
  { value: 'orbunlock', label: 'Unlock Orbs' },
  { value: 'orbcombo', label: 'Create Combo Orbs' },
  { value: 'orbnail', label: 'Create Nail Orbs' },
  { value: 'orbsticky', label: 'Create Sticky Blind Orbs' },
  { value: 'orbenhance', label: 'Enhance Orbs' },
  { value: 'orbrefresh', label: 'Orb Refresh' },
  { value: 'orbspinner', label: 'Regular Spinner' },
  { value: 'orbspecificspinner', label: 'Specific Spinner' }
]

export const enhanceSkills = [
  { value: 'cap', label: 'Self Damage Cap Change' },
  { value: 'jojotheworld', label: 'Jojo\'s The World'},
  { value: 'capslot', label: 'Slot Specific Damage Cap Change' },
  { value: 'capattribute', label: 'Attribute Specific Damage Cap Change' },
  { value: 'attack', label: 'Attack Modifier' },
  { value: 'attackslot', label: 'Slot Specific Attack Modifier' },
  { value: 'rcv', label: 'Recovery Modifier' },
  { value: 'mass', label: 'Attacks become Mass Attack' }
]

export const hpSkills = [
  { value: 'shieldpercent', label: 'Shield by Percent' },
  { value: 'shieldattribute', label: 'Shield by Attribute' },
  { value: 'hpchange', label: 'HP Modifier' }
]

export const recoverySkills = [
  { value: 'bind', label: 'Recover Bind' },
  { value: 'awokenbind', label: 'Recover Awoken Bind' },
  { value: 'unmatcahble', label: 'Recover Unmatchable' },
  { value: 'healflat', label: 'Recover HP by Amount' },
  { value: 'healrcv', label: 'Recover HP by RCV Percent' },
  { value: 'healpercent', label: 'Recover HP by Team HP Percent' },
  { value: 'healteamrcv', label: 'Recover HP by Overall Team RCV' }
]

export const turnSkills = [
  { value: 'delay', label: 'Delay Enemy Attack' },
  { value: 'charge', label: 'Charge Skills' },
  { value: 'reducecharge', label: 'Reduce Skills' }
]

export const defenseSkills = [
  { value: 'attribute', label: 'Void Attribute Absorption' },
  { value: 'damage', label: 'Void Damage Absorption' },
  { value: 'combo', label: 'Void Combo Absorption' },
  { value: 'void', label: 'Pierce Damage Void' },
  { value: 'defense', label: 'Reduce Enemy Defense' },
  { value: 'shield', label: 'Reduce Enemy Shield' }
]

export const moveSkills = [
  { value: 'ctw', label: 'Change the World' },
  { value: 'moveflat', label: 'Change Orb Move Time by Amount' },
  { value: 'movepercent', label: 'Change Orb Move Time by Percent' },
]

export const attackSkills = [
  { value: 'attributesingle', label: 'Single Target Attribute Damage' },
  { value: 'attributemass', label: 'Mass Target Attribute Damage' },
  { value: 'fixedsingle', label: 'Single Target Fixed Damage' },
  { value: 'fixedmass', label: 'Mass Target Fixed Damage' },
  { value: 'poison', label: 'Poison Enemies' }
]

export const skyfallSkills = [
  { value: 'noskyfall', label: 'No Skyfall' } ,
  { value: 'skyfall', label: 'Increased Skyfall for Orb' },
  { value: 'enhance', label: 'Increased Skyfall for Enhanced Orb' },
  { value: 'locked', label: 'Increased Skyfall for Locked Orb'  },
  { value: 'nail', label: 'Increased Skyfall for Nail Orb' },
  { value: 'barbed', label: 'Increased Skyfall for Barbed Orb' },
  { value: 'foresight', label: 'Skyfall Foresight' }
]

export const attributeSkills = [
  { value: 'attributeself', label: 'Change Attribute for Self' },
  { value: 'attributeenemy', label: 'Change Attribute for Enemy' }
]

export const swapSkills = [
  { value: 'swapself', label: 'Swap Self with Leader' },
  { value: 'swaprightmost', label: 'Swap Rightmost Sub with Leader' }
]

export const skillSkills = [
  { value: 'unable', label: 'Unable to Use Skills' },
  { value: 'hpclause', label: 'HP Clause to Use Skill' },
  { value: 'batteclause', label: 'Battle Number Clause to Use Skill' },
  { value: 'orbclause', label: 'Orbs on Board to Use Skill' },
  { value: 'count', label: 'Usage Count Limited' }
]

export const gravitySkills = [
  { value: 'regularmass', label: 'Mass Target Reduce Remaining HP%' },
  { value: 'regularsingle', label: 'Single Target Reduce Remaining HP%' },
  { value: 'truemass', label: 'Mass Target Reduce HP%'}
]

export const boardSkills = [
  { value: 'boardsize', label: 'Change Board Dimension' },
  { value: 'boardcloud', label: 'Create Cloud on Board' },
  { value: 'boardtape', label: 'Create Tape on Board' }
]

export const etcSkills = [
  { value: 'counterattack', label: 'Counter Attack' },
  { value: 'random', label: 'Random Skill Usage' },
  { value: 'transform', label: 'Transform' },
  { value: 'evolve', label: 'Skill Evolve (Non-Loop)' },
  { value: 'evolveloop', label: 'Skill Evolve (Loop)' },
  { value: 'delayed', label: 'Effect in X turns' }
]

export const skillCollection = {
  'orb': orbSkills, 'enhance': enhanceSkills, 'hp': hpSkills,
  'recovery': recoverySkills, 'turn': turnSkills, 'defense': defenseSkills,
  'move': moveSkills, 'attack': attackSkills, 'skyfall': skyfallSkills,
  'attribute': attributeSkills, 'gravity': gravitySkills, 'swap': swapSkills,
  'skill': skillSkills, 'board': boardSkills, 'etc': etcSkills
}

interface ISkillCategoryListProps {
  skillActive: Record<string, boolean>
  setSkillActive: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}
export const SkillCategoryList: React.FC<ISkillCategoryListProps> = (props) => {
  const {skillActive, setSkillActive} = props
  const handleSkillSelect = (skillValue: string) => {
    const tempDictionary = {...skillActive}
    if (tempDictionary[skillValue] === undefined) {
      tempDictionary[skillValue] = true
    } else {
      delete tempDictionary[skillValue]
    }
    setSkillActive(tempDictionary)
  }
  const skillClassName = "skill-list-skill "
  return(
    <div className="filter-skill-select">
      {skillCategory.map((category, index) => (
        <div key={index} className="skill-list-category">
          <div className="skill-list-header">
            {category.label}
          </div>
          <div className="skill-list-skill-container">
            {skillCollection[category.value as keyof typeof skillCollection].map((skill, skillIndex) => (
              <div key={skillIndex} className={skillActive[skill.value] ? skillClassName + "skill-list-skill-active" : skillClassName} onClick={() => handleSkillSelect(skill.value)}>
                {skill.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface ISkillProps {
  skillName: string
  handleRemove: (removeIndex: number) => void
  index: number
}
export const Skill: React.FC<ISkillProps> = (props) => {
  const {skillName, handleRemove, index} = props
  const extractSkillText = (skillToExtract: string): string => {
    for (let category in skillCollection) {
      for (let i = 0; i < skillCollection[category as keyof typeof skillCollection].length; i++) {
        if (skillToExtract === skillCollection[category as keyof typeof skillCollection][i].value) {
          return(skillCollection[category as keyof typeof skillCollection][i].label)
        }
      }
    }
    return("")
  }
  const label: string = extractSkillText(skillName)

  return(
    <div className="skill-selection-skill" onClick={() => handleRemove(index)}>
      {label}
    </div>
  )
}