import './Filter.css'
import * as CI from 'react-icons/ci'
import { useState } from 'React'
import { fetchFilter } from './api/api.ts'
import FilterCard from './FilterCard.tsx'

export const Filter = ({showFilter, setShowFilter, setResults }) => {
  const [filterCardQuery, setFilterCardQuery] = useState<string>("")

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
      <FilterCard setFilterCardQuery={setFilterCardQuery} />
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

