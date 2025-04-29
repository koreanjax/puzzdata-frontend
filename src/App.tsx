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
    if(selected > 0) {
      window.scrollTo(0, 0)
    }
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
      <Filter className="filter" showFilter={showFilter} setShowFilter={setShowFilter} setResults={setResults} />
      {selected > 0 && (
        <Card className="card" id={selected} setSelected={setSelected} />
      )}
      {results.length > 0 && (
      <div className="search-results">
        <SearchResults  results={results} setSelected={setSelected} />
      </div>
      )}
  </div>
  )
}

export default App