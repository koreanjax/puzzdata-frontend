import { useState, useEffect } from 'react'
import * as CI from 'react-icons/ci'
import { fetchSearch, fetchCard } from './api/api.ts'
import './Search.css'

export const Search = ({setSearched, setResults, setSelected, showFilter, setShowFilter}) => {
  const [search, setSearch] = useState('')
  
  // Easier to use rather than onSubmit with a button?
  // TODO: Figure out what to default for initial search and use useEffect maybe?
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchSearch(search).then(results => {
      setSelected(0)
      setResults(results)
    })
  }

  const handleClick = (e) => {
    setShowFilter(!showFilter)
  }

  return(
    <div className="search-bar">
      <div className="search">
        <CI.CiSearch size={24}/>
        <form className="search-form" onSubmit={handleSubmit}>
          <input id="search" className="search-input" value={search} placeholder="Search Monsters.." onChange={e => setSearch(e.target.value)} />
        </form>
      </div>
      <button className="filter-icon" onClick={handleClick} >
        <CI.CiFilter size={24}/>
      </button>
    </div>
  )
}