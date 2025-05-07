import { useState, useEffect, useRef } from 'react'
import { SearchResult } from './data-interface.ts'
import './App.css'
import { SearchBar } from './SearchBar.tsx'
import SearchResults from './SearchResults.tsx'
import { Card } from './Card.tsx'
import { Filter } from './Filter.tsx'

// Rename to Search and refactor className into diff file
function App() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState(0)
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    const handleKeyPressed = (event) => {
      if(selected > 0 && event.key === 'Escape') {
        setSelected(0)
      }
    }
    window.addEventListener("keydown", handleKeyPressed)

    return () => window.removeEventListener("keydown", handleKeyPressed)
  },[selected])

  return (
  <div className="App">
      <SearchBar setResults={setResults} setSelected={setSelected} showFilter={showFilter} setShowFilter={setShowFilter}/>
      <Filter className="filter" showFilter={showFilter} setShowFilter={setShowFilter} setResults={setResults} setSelected={setSelected}/>
      {selected > 0 && (
        <Card className="card" id={selected} setSelected={setSelected} />
      )}
      <div className="search-results">
        {results.length > 0 && (
        <SearchResults results={results} setSelected={setSelected} />
        )}
      </div>
      <div className="rights">© Gungho Online Entertainment. Inc. All Rights Reserved.</div>
  </div>
  )
}

export default App