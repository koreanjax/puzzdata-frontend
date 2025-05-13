import './SearchResults.css'
import { memo, useEffect, useRef } from 'react'
import { realId } from './helper/general-helper.ts'
import { urlIcon } from './helper/icon-helper.ts'
import { SearchResult } from './models/data-interface.ts'

interface ISearchResultsProps {
 results: SearchResult[]
 setSelected: React.Dispatch<React.SetStateAction<number>>
}

const SearchResults: React.FC<ISearchResultsProps> = (props) => {
  const { results, setSelected } = props
  const scrollRef = useRef<HTMLDivElement>(null)

  // useRef cannot be set to custom components
  useEffect(() => {
    if (scrollRef.current != null) {
      scrollRef.current.scrollTo(0,0);
    }
  }, [results])

  const handleClick = (id: number) => {
    setSelected(id)
  }

  const ResultsRows = () => {
    return(
      results.map((result: SearchResult) => (
        <ResultsRow key={result.monster_id} result={result}/>
      ))
    )
  }

  const ResultsRow = ({result}: {result: SearchResult}) => {
    return(
        <div className="search-row" onClick={() => handleClick(result.monster_id)}>
          <img className="table-cell search-icon" src={urlIcon(result.monster_id)} />
          <div className="table-cell search-name text-sm">{result.name}</div>
          <div className="table-cell search-id text-sm">{realId(result.monster_id)}</div>
        </div>
    )
  }

  return(
    <div ref={scrollRef} className="search-results-table">
      <ResultsRows />
    </div>
  )
}

export default memo(SearchResults)