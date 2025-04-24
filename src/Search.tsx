import { useState, useEffect } from 'react'
import * as CI from 'react-icons/ci'
import { fetchSearch, fetchCard } from './api.ts'
import './Search.css'

export const Search = ({setSearched, setResults}) => {
  const [search, setSearch] = useState('')
  
  // Easier to use rather than onSubmit with a button?
  // TODO: Figure out what to default for initial search and use useEffect maybe?
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchSearch(search).then(results => {
      setResults(results)
    })
  }

  return(
    <div className="search">
      <CI.CiSearch size={24}/>
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="search-input" value={search} placeholder="Search Monsters.." onChange={e => setSearch(e.target.value)} />
      </form>
    </div>
  )
}