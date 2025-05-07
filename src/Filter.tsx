import './Filter.css'
import { CiEraser, CiSearch, CiSquarePlus } from "react-icons/ci";
import { useState } from 'React'
import { fetchFilter } from './api/api.ts'
import { Attributes } from './components/Attributes.tsx'
import { Types } from './components/Types.tsx'
import { Rarity } from './components/Rarity.tsx'
import { FilterAwakening, FilterAwakenings } from './components/Awakenings.tsx'
import { SkillCategoryList, SkillList, Skill, skillCollection } from './components/SkillSelection.tsx'
import { queryAttributes, queryTypes, queryRarity, queryAwakenings, querySkill } from './helper/query-helper.ts'
const maxStage: number = 10

const MAIN_ATTRIBUTE: string = 'Main Attribute'
const SUB_ATTRIBUTE: string = 'Sub Attribute'
const THIRD_ATTRIBUTE: string = 'Third Attribute'
const TYPE: string = 'Type'
const SETTINGS: string = 'settings?'

export const Filter = ({showFilter, setShowFilter, setResults, setSelected }) => {
  const [cardFilter, setCardFilter] = useState<boolean>(true)
  const [skillFilter, setSkillFilter] = useState<boolean>(false)
  const [skillFilterAdd, setSkillFilterAdd] = useState<boolean>(false)
  const [awknStage, setAwknStage] = useState({})
  const [attrMainActive, setAttrMainActive] = useState<boolean[]>(Array(6).fill(false))
  const [attrSubActive, setAttrSubActive] = useState<boolean[]>(Array(6).fill(false))
  const [attrThirdActive, setAttrThirdActive] = useState<boolean[]>(Array(6).fill(false))
  const [typeActive, setTypeActive] = useState<boolean[]>(Array(12).fill(false))
  const [rarityActive, setRarityActive] = useState<boolean[]>(Array(10).fill(false))

  const [selectedCategory, setSelectedCategory] = useState('orb')
  const [selectedSkill, setSelectedSkill] = useState('orbconvert')
  const [skillList ,setSkillList] = useState<string[]>([])

  const isStageFull = (newAwkn: number) : boolean => {
    if (Object.keys(awknStage).length >= maxStage) {
      if (awknStage[newAwkn] === undefined) {
        return(true)
      }
    }
    return(false)
  }

  const handleAwakening = (newAwkn: number) => {
    if (isStageFull(newAwkn)) {
      return
    }

    // Create a copy so that state gets updated for rerendering
    const tempStage = {...awknStage}
    if (tempStage[newAwkn] !== undefined) {
      tempStage[newAwkn] += 1
    } else {
      tempStage[newAwkn] = 1
    }
    setAwknStage(tempStage)
  }

  const handleAwakeningRemove = (delAwkn: number) => {
    // Create a copy so that state gets updated for rerendering
    const tempStage = {...awknStage}
    tempStage[delAwkn]-=1
    if (tempStage[delAwkn] < 1) {
      delete tempStage[delAwkn]
    }
    setAwknStage(tempStage)
  }

  const handleClear = () => {
    // Clear Stage
    setAwknStage({})
  }

  const handleSearch = () => {
    const queryItems = []
    queryItems.push(queryAttributes(attrMainActive, attrSubActive, attrThirdActive))
    queryItems.push(queryTypes(typeActive))
    queryItems.push(queryRarity(rarityActive))
    queryItems.push(queryAwakenings(awknStage))
    queryItems.push(querySkill(skillList))
    
    const filterQuery = SETTINGS + queryItems.join('&')
    fetchFilter(filterQuery).then(results => {
      setResults(results)
      setShowFilter(!showFilter)
      setSelected(0)
    })
    console.log(filterQuery)
  }

  const handleToggle = (onToggle, offToggle) => {
    onToggle(true)
    offToggle(false)
    setSkillFilterAdd(false)
  }

  const handleAdd = () => {
    setSkillFilterAdd(true)
    setCardFilter(false)
    setSkillFilter(false)
    setSelectedCategory('orb')
    setSelectedSkill(skillCollection['orb'][0].value)
  }

  const handleAddToList = () => {
    setSkillFilterAdd(false)
    setSkillFilter(true)
    const temp = [...skillList]
    temp.push(selectedSkill)
    setSkillList(temp)
  }

  const removeFromList = (removeIndex) => {
    const temp = [...skillList]
    temp.splice(removeIndex, 1)
    setSkillList(temp)
  }

  const setBothLists = (category) => {
    setSelectedCategory(category)
    setSelectedSkill(skillCollection[category][0].value)
  }

  return(showFilter ? (
    <div className="filter">
    	<div className="filter-title">
        Filtering Options
        <div className="filter-category-selection">
          <div className="filter-catergory" onClick={() => handleToggle(setCardFilter, setSkillFilter)}>
            Card
          </div>
          <div className="filter-catergory" onClick={() => handleToggle(setSkillFilter, setCardFilter)}>
            Skill
          </div>
        </div>
      </div>
      {cardFilter &&
      <div className="filter-menu-card">
        <div className="filter-page">
          <div className="filter-column">
            <div className="filter-info-header">
              Card Information
            </div>
            <Attributes headerText={MAIN_ATTRIBUTE} attrActive={attrMainActive} setAttrActive={setAttrMainActive} />
            <Attributes headerText={SUB_ATTRIBUTE} attrActive={attrSubActive} setAttrActive={setAttrSubActive} />
            <Attributes headerText={THIRD_ATTRIBUTE} attrActive={attrThirdActive} setAttrActive={setAttrThirdActive} />
            <Types headerText={TYPE} typeActive={typeActive} setTypeActive={setTypeActive} />
            <Rarity rarityActive={rarityActive} setRarityActive={setRarityActive} />
          </div>
          <div className="filter-column">
            <div className="awkn-header">
              Awakenings
              <div className="clear-icon" onClick={handleClear} >
                <CiEraser size={14}/>
              </div>
            </div>
            <div className="filter-awkn-settings">
              <div className="awkn-stage">
                {Object.keys(awknStage).map((awkn, index) => (
                  <div key={index} className="awkn-staged" onClick={() => handleAwakeningRemove(awkn)}>
                    <FilterAwakening index={awkn} />
                    x{awknStage[awkn]}
                  </div>
                ))}
              </div>
              <FilterAwakenings onClick={handleAwakening}/>
            </div>
          </div>
        </div>
      </div>
      }
      {skillFilter &&
      <div className="filter-menu-skill">
        <div className="filter-page">
          <div className="filter-column">
            <div className="skill-stage-test">
              {skillList.map((skill, index) => (
                <Skill key={index} skillName={skill} handleRemove={removeFromList} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      }
      {skillFilterAdd &&
      <div className="filter-menu-skill">
        <div className="filter-skill-selection">
          <div className="filter-skill-header">
            Select Skill Category
            <SkillCategoryList selected={selectedCategory} setLists={setBothLists}/>
          </div>
          <div className="filter-skill-list">
            <SkillList skillList={skillCollection[selectedCategory]} setSelectedSkill={setSelectedSkill} />
            <div className="filter-add-list-icon" onClick={e => handleAddToList()}>
              Add to List
            </div>
          </div>
        </div>
      </div>
      }
      <div className="filter-search">
        {skillFilter && 
        <div className="filter-add-icon" onClick={handleAdd}>
          <CiSquarePlus size={30} />
        </div>
        }
        <div className="filter-search-icon" onClick={handleSearch} >
          <CiSearch size={30}/>
        </div>
      </div>
    </div>
    ) : (
      null
    )
  )
}

