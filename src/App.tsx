import { useState, useEffect } from 'react'
import { SearchResult } from './models/data-interface.ts'
import './App.css'
import padgeLogo from './assets/Padge.png'
import loadingAnimation from './assets/Loading.gif'
import { SearchBar } from './SearchBar.tsx'
import SearchResults from './SearchResults.tsx'
import { Card } from './Card.tsx'
import { Filter } from './Filter.tsx'

// Rename to Search and refactor className into diff file
function App() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState<number>(0)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyPressed = (event: KeyboardEvent) => {
      if(selected > 0 && event.key === 'Escape') {
        setSelected(0)
      }
    }
    window.addEventListener("keydown", handleKeyPressed)

    return () => window.removeEventListener("keydown", handleKeyPressed)
  },[selected])

  useEffect(() => {
    setShowFilter(false)
  }, [results])

  const showInfo: boolean = (results.length == 0) && !showFilter

  return (
  <div className="App">
      {loading && (
      <img src={loadingAnimation} className="loading"/>
      )}
      <SearchBar loading={loading} setLoading={setLoading} setResults={setResults} setSelected={setSelected} showFilter={showFilter} setShowFilter={setShowFilter}/>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} loading={loading} setLoading={setLoading} setResults={setResults} setSelected={setSelected}/>
      {selected > 0 && (
        <Card id={selected} setSelected={setSelected} />
      )}
      {showInfo && (
        <div className="information">
          <div className="logo">
            <img src={padgeLogo} className="logo-icon"/>
          </div>
          <h2>Features in Development</h2>
          <li>Skill Filtering Parameters</li>
          <h2>Issues</h2>
          <li>Stackable materials are not meant to be plus-able</li>
          <li>Evolving Skills search assuming all parts of the skills to be a single skill.</li>
          <li>Awakening filtering will assume Super Awakenings or Sync Awakenings to be included for now.</li>
          <li>A generic filter will have a long loading time.</li>
          <li>On Mobile Safari (iOS), the page may refresh if you leave the window for an extended period of time.</li>
          <li>Please send me a direct message regarding issues on whatever platform you can.</li>
        </div>
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