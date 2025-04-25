import { useState, useEffect, useRef } from 'react'
import { SearchResult } from './data-interface.ts'
import './App.css'
import { Search } from './Search.tsx'
import { SearchResults } from './SearchResults.tsx'
import { Card } from './Card.tsx'

// Rename to Search and refactor className into diff file
function App() {

  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState(0)

  const inputRef = useRef()

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
      <Search setResults={setResults} />
      {selected > 0 ? (
        <Card className="card" id={selected} />) : (
        null
      )}
      {results.length > 0 ? (
        <SearchResults className="search" results={results} setSelected={setSelected}  />
      ) : (
        null
      )}
  </div>
  )
}

export default App