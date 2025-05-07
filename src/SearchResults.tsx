import './SearchResults.css'
import { memo, useEffect, useRef } from 'React'
import { realId } from './helper/general-helper.ts'
import { urlIcon } from './helper/icon-helper.ts'

const SearchResults = ({results, setSelected}) => {
  const scrollRef = useRef(null)

  // useRef cannot be set to custom components
  useEffect(() => {
    scrollRef.current.scrollTo(0,0);
  }, [results])

  const handleClick = (id) => {
    setSelected(id)
  }

  const ResultsRows = () => {
    return(
      results.map(result => (
        <ResultsRow key={result.monster_id} result={result}/>
      ))
    )
  }

  const ResultsRow = ({result}) => {
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