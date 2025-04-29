import './SearchResults.css'
import { memo } from 'React'
import { realId } from './helper/general-helper.ts'
import { urlIcon } from './helper/icon-helper.ts'

const SearchResults = ({results, setSelected}) => {
  const handleClick = (id) => {
    setSelected(id)
  }

  const ResultsTable = () => {
    return(
      results.map(result => (
        <ResultsRow key={result.monster_id} result={result}/>
      ))
    )
  }

  const ResultsRow = ({result}) => {
    return(
        <button className="search-row" onClick={() => handleClick(result.monster_id)}>
          <img className="table-cell search-icon" src={urlIcon(result.monster_id)} />
          <div className="table-cell search-name text-sm">{result.name}</div>
          <div className="table-cell search-id text-sm">{realId(result.monster_id)}</div>
        </button>
    )
  }

  return(
    <div className="search-results-table">
      <ResultsTable />
    </div>
  )
}

export default memo(SearchResults)