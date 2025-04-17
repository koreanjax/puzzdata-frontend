import { useState, useEffect } from 'react'
import * as CI from 'react-icons/ci'
import './App.css'
import { Input, SearchResult, CardResult } from './data-interface.ts'
import { fetchSearch, fetchCard } from './api.ts'
import img from './assets/07170.webp'

// Rename to Search and refactor className into diff file
function App() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)

  // Easier to use rather than onSubmit with a button?
  // TODO: Figure out what to default for initial search and use useEffect maybe?
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchSearch(search).then(results => {
      setResults(results)
    })
  }

  const handleClick = (id) => {
    fetchCard(id).then(card => {
      console.log(card)
    })
  }

  return (
  <>
    <div className="">
      <div className="search">
        <CI.CiSearch size={24}/>
        <form className="search-form" onSubmit={handleSubmit}>
          <input className="search-input" value={search} placeholder="Search Monsters.." onChange={e => setSearch(e.target.value)} />
        </form>
      </div>
      <div className="search-table">
        {results.map(result => (
          <div key={result.id} className="search-row" onClick={() => handleClick(result.id)}>
            <img className="table-cell search-icon" src={img} />
            <div className="table-cell search-name text-sm">{result.name}</div>
            <div className="table-cell search-id text-sm">{result.id}</div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}

export default App
