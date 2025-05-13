import './Filter.css'
import { CiEraser, CiSearch, CiSquarePlus } from "react-icons/ci";
import { useEffect, useState } from 'react'
import { fetchFilter } from './api/api.ts'
import { SearchResult } from './models/data-interface.ts'
import { Attributes } from './components/Attributes.tsx'
import { Types } from './components/Types.tsx'
import { Rarity } from './components/Rarity.tsx'
import { FilterAwakening, FilterAwakenings } from './components/Awakenings.tsx'
import { SkillCategoryList, Skill } from './components/SkillSelection.tsx'
import { queryAttributes, queryTypes, queryRarity, queryAwakenings, querySkill } from './helper/query-helper.ts'
const maxStage: number = 10

const MAIN_ATTRIBUTE: string = 'Main Attribute'
const SUB_ATTRIBUTE: string = 'Sub Attribute'
const THIRD_ATTRIBUTE: string = 'Third Attribute'
const TYPE: string = 'Type'
const SETTINGS: string = 'settings?'

interface IFilterProps {
  showFilter: boolean
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>
  setSelected: React.Dispatch<React.SetStateAction<number>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Filter: React.FC<IFilterProps> = (props) => {
  const [cardFilter, setCardFilter] = useState<boolean>(true)
  const [skillFilter, setSkillFilter] = useState<boolean>(false)
  const [skillFilterAdd, setSkillFilterAdd] = useState<boolean>(false)
  const [awknStage, setAwknStage] = useState<Record<number, number>>({})
  const [attrMainActive, setAttrMainActive] = useState<boolean[]>(Array(6).fill(false))
  const [attrSubActive, setAttrSubActive] = useState<boolean[]>(Array(6).fill(false))
  const [attrThirdActive, setAttrThirdActive] = useState<boolean[]>(Array(6).fill(false))
  const [typeActive, setTypeActive] = useState<boolean[]>(Array(12).fill(false))
  const [rarityActive, setRarityActive] = useState<boolean[]>(Array(10).fill(false))

  // const [selectedCategory, setSelectedCategory] = useState('orb')
  // const [selectedSkill, setSelectedSkill] = useState('orbconvert')
  const [skillList ,setSkillList] = useState<string[]>([])
  const [skillActive, setSkillActive] = useState<Record<string, boolean>>({})

  const {showFilter, setShowFilter, loading, setLoading, setResults, setSelected } = props

  useEffect(() => {
    const handleKeyPressed = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (skillFilterAdd) {
          setSkillFilterAdd(false)
          setSkillFilter(true)
        }

        if (showFilter && !skillFilterAdd) {
          setShowFilter(false)
        }
      }
    }
    window.addEventListener("keydown", handleKeyPressed)

    return () => window.removeEventListener("keydown", handleKeyPressed)
  },[skillFilterAdd, showFilter])

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
    if (loading) {
      return
    }
    setLoading(true)
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
      setLoading(false)
    })
  }

  const handleToggle = (
  onToggle: React.Dispatch<React.SetStateAction<boolean>>,
  offToggle: React.Dispatch<React.SetStateAction<boolean>>) => {
    onToggle(true)
    offToggle(false)
    setSkillFilterAdd(false)
  }

  const handleAdd = () => {
    setSkillFilterAdd(true)
    setCardFilter(false)
    setSkillFilter(false)
  }

  const handleAddToList = () => {
    setSkillFilterAdd(false)
    setSkillFilter(true)
    setSkillActive({})
    const temp = [...skillList]
    for (let skill in skillActive) {
      if (!temp.includes(skill)) {
        temp.push(skill)
      }
    }
    setSkillList(temp)
  }

  const removeFromList = (removeIndex: number) => {
    const temp = [...skillList]
    temp.splice(removeIndex, 1)
    setSkillList(temp)
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
                  <div key={index} className="awkn-staged" onClick={() => handleAwakeningRemove(parseInt(awkn))}>
                    <FilterAwakening index={parseInt(awkn)} />
                    x{awknStage[parseInt(awkn)]}
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
            <div className="skill-stage">
              {skillList.map((skill, index) => (
                <Skill key={index} skillName={skill} handleRemove={removeFromList} index={index} />
              ))}
            </div>
            <div className="filter-add-skill" onClick={handleAdd}>
              Add Skill(s)
            </div>
          </div>
        </div>
      </div>
      }
      {skillFilterAdd &&
      <div className="filter-menu-skill">
        <div className="filter-skill-selection">
          <div className="filter-skill-header">
            <SkillCategoryList skillActive={skillActive} setSkillActive={setSkillActive} />
          </div>
        </div>
      </div>
      }
      <div className="filter-bottom-bar">
        {skillFilterAdd ? (
          <div className="filter-bottom-icon" onClick={handleAddToList} >
            <CiSquarePlus size={30}/>
          </div>
        ) : (
          <div className="filter-bottom-icon" onClick={handleSearch} >
            <CiSearch size={30}/>
          </div>
        )}
      </div>
    </div>
    ) : (
      null
    )
  )
}

