import './SearchResults.css'
import img from './assets/07170.webp'

export const SearchResults = ({results, setSelected}) => {

  const handleClick = (id) => {
    setSelected(id)
  }

  return(
    <div className="search-table">
      {results.map(result => (
        <div key={result.id} className="search-row" onClick={() => handleClick(result.id)}>
          <img className="table-cell search-icon" src={img} />
          <div className="table-cell search-name text-sm">{result.name}</div>
          <div className="table-cell search-id text-sm">{result.id}</div>
        </div>
      ))}
    </div>
  )
}