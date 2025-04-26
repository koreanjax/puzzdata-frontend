import './Filter.css'
import * as CI from 'react-icons/ci'
import { useState } from 'React'
import { fetchAwakeningBase } from './api/api.ts'
import { FilterAwakening, FilterAwakenings } from './components/Awakenings.tsx'

const maxStage: number = 10

export const Filter = ({showFilter, setShowFilter, setResults }) => {
  const [awknStage, setAwknStage] = useState({})

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
      tempStage[newAwkn]+=1
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
    const tempList = []
    Object.keys(awknStage).map((awkn, index) => {
      tempList.push([(parseInt(awkn)+1).toString(), awknStage[awkn].toString()])
    })
    const tempString = tempList.join("|")
    fetchAwakeningBase(tempString).then(results => {
      setResults(results)
      setShowFilter(!showFilter)
    })
  }

  return(showFilter ? (
    <div className="filter">
    	<div className="filter-title">Filtering Options</div>
      <div className="filter-menu">
        <div className="filter-non-awkn">
          <label>Card Information</label>
        </div>
        <div className="filter-awkn">
          <div className="awkn-header">
            <label>Awakenings</label>
            <button className="clear-icon" onClick={handleClear} >
              <CI.CiEraser size={14}/>
            </button>
          </div>
          <div className="filter-awkn-settings">
            <div className="awkn-stage">
              {Object.keys(awknStage).map((awkn, index) => (
                <div key={index} className="awkn-staged" onClick={() => handleAwakeningRemove(awkn)}>
                  <FilterAwakening index={awkn} />
                  <label>x{awknStage[awkn]}</label>
                </div>
              ))}
            </div>
            <div className="awkn-settings">
              <FilterAwakenings onClick={handleAwakening}/>
            </div>
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

