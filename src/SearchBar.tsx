import { useState } from 'react'
import { CiFilter,CiSearch } from "react-icons/ci";
import { fetchSearch } from './api/api.ts'
import { SearchResult } from './models/data-interface.ts'
import './SearchBar.css'

const SEARCH_PLACEHOLDER: string = 'Search Monsters..'

interface ISearchBarProps {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>
  setSelected: React.Dispatch<React.SetStateAction<number>>
  showFilter: boolean
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const { loading, setLoading, setResults, setSelected, showFilter, setShowFilter } = props
  const [search, setSearch] = useState('')
  // Easier to use rather than onSubmit with a button?
  // TODO: Figure out what to default for initial search and use useEffect maybe?
  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    if (loading) {
      return
    }
    setLoading(true)
    fetchSearch(search).then((results: SearchResult[]) => {
      setLoading(false)
      setSelected(0)
      setResults(results)
    })
  }

  const handleClick = () => {
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