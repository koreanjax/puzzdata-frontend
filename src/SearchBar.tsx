import { useState, useEffect } from 'react'
import { CiFilter,CiSearch } from "react-icons/ci";
import { fetchSearch, fetchCard } from './api/api.ts'
import './SearchBar.css'

const SEARCH_PLACEHOLDER: string = 'Search Monsters..'

export const SearchBar = ({setSearched, setResults, setSelected, showFilter, setShowFilter}) => {
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
        <CiSearch size={24}/>
        <form className="search-form" onSubmit={handleSubmit}>
          <input id="search"
            className="search-input"
            value={search}
            autoComplete="off"
            placeholder={SEARCH_PLACEHOLDER}
            onChange={e => setSearch(e.target.value)} />
        </form>
      </div>
      <div className="filter-icon" onClick={handleClick} >
        <CiFilter size={24}/>
      </div>
    </div>
  )
}