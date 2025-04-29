import './Filter.css'
import * as CI from 'react-icons/ci'
import { useState } from 'React'
import { fetchFilter } from './api/api.ts'
import { Attributes } from './components/Attributes.tsx'
import { Types } from './components/Types.tsx'
import { Rarity } from './components/Rarity.tsx'
import { FilterAwakening, FilterAwakenings } from './components/Awakenings.tsx'

const maxStage: number = 10

const MAIN_ATTRIBUTE: string = 'Main Attribute'
const SUB_ATTRIBUTE: string = 'Sub Attribute'
const THIRD_ATTRIBUTE: string = 'Third Attribute'
const TYPE: string = 'Type'
const SETTINGS: string = 'settings?'
const QUERY_ATTR_BASE: string = 'attrs='
const QUERY_TYPE_BASE: string = 'types='
const QUERY_RARITY_BASE: string = 'rarity='
const QUERY_COST_BASE: string = 'cost='
const QUERY_AWKN_BASE: string = 'awkns='

export const Filter = ({showFilter, setShowFilter, setResults }) => {
  const [awknStage, setAwknStage] = useState({})
  const [attrMainActive, setAttrMainActive] = useState<boolean[]>(Array(6).fill(false))
  const [attrSubActive, setAttrSubActive] = useState<boolean[]>(Array(6).fill(false))
  const [attrThirdActive, setAttrThirdActive] = useState<boolean[]>(Array(6).fill(false))
  const [typeActive, setTypeActive] = useState<boolean[]>(Array(12).fill(false))
  const [rarityActive, setRarityActive] = useState<boolean[]>(Array(10).fill(false))

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

  const arrayAllEqual = (booleanArray) => {
    return (new Set(booleanArray).size === 1)
  }

  const addFilters = (activeFilters) => {
    if(arrayAllEqual(activeFilters)) {
      return('-1')
    } else {
      const filters: string = []  
      activeFilters.map((active, index) => {
        const filter: string = active ? index.toString() : '-1'
        filters.push(filter)
      })
      return(filters.join(','))
    }
  }

  const queryAttributes = () => {
    const attrs: string[] = []
    attrs.push(addFilters(attrMainActive))
    attrs.push(addFilters(attrSubActive))
    attrs.push(addFilters(attrThirdActive))
    return(QUERY_ATTR_BASE+attrs.join('|'))
  }

  const queryTypes = () => {
    const types: string[] = []
    types.push(addFilters(typeActive))
    return(QUERY_TYPE_BASE+types.join('|'))
  }

  const queryRarity = () => {
    const rarities: string[] = []
    rarities.push(addFilters(rarityActive))
    console.log(rarities)
    return(QUERY_RARITY_BASE+rarities.join('|'))
  }

  const queryAwakenings = () : string => {
    const tempList: string[] = []
    Object.keys(awknStage).map((awkn, index) => {
      tempList.push([(parseInt(awkn)+1).toString(), awknStage[awkn].toString()])
    })
    const awknQuery = tempList.length > 0 ? tempList.join("|") : "-1"
    return (QUERY_AWKN_BASE+awknQuery)
  }

  const handleSearch = () => {
    const queryItems = []
    queryItems.push(queryAttributes())
    queryItems.push(queryTypes())
    queryItems.push(queryRarity())
    queryItems.push(queryAwakenings())
    
    const filterQuery = SETTINGS + queryItems.join('&')
    fetchFilter(filterQuery).then(results => {
      console.log(filterQuery)
      setResults(results)
      setShowFilter(!showFilter)
    })
  }

  return(showFilter ? (
    <div className="filter">
    	<div className="filter-title">Filtering Options</div>
      <div className="filter-menu">
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
            <button className="clear-icon" onClick={handleClear} >
              <CI.CiEraser size={14}/>
            </button>
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
      <div className="filter-search">
        <button className="filter-search-icon" onClick={handleSearch} >
          <CI.CiSearch size={30}/>
        </button>
      </div>
    </div>
    ) : (
      null
    )
  )
}

