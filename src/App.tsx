import { useState, useEffect } from 'react'
import { SearchResult } from './data-interface.ts'
import './App.css'
import { Search } from './Search.tsx'
import { SearchResults } from './SearchResults.tsx'
import { Card } from './Card.tsx'

// Rename to Search and refactor className into diff file
function App() {
  
  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState(0)

  return (
  <div className="App">
      <Search setResults={setResults} />
      {selected > 0 ? (
        <Card id={selected} />) : (
        null
      )}
      {results.length > 0 ? (
        <SearchResults results={results} setSelected={setSelected} />
      ) : (
        null
      )}
  </div>
  )
}

export default App