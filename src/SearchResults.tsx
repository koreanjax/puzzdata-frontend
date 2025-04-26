import './SearchResults.css'
import img from './assets/07170.webp'

export const SearchResults = ({results, setSelected}) => {
  
  const realId = (id: number): number => {
    const realId: number = (id > 9899) ? id - 100 : id
    return realId
  }

  const imgUrl = (id: number): string => {
    const fileName: string = realId(id).toString().padStart(5, "0")
    const imgSrc: string = "https://dohzi9dodqiuu.cloudfront.net/icons/" + fileName + ".png"
    return imgSrc
  }

  const handleClick = (id) => {
    setSelected(id)
  }

  return(
    <div className="search-table">
      {results.map(result => (
        <button key={result.id} className="search-row" onClick={() => handleClick(result.id)}>
          <img className="table-cell search-icon" src={imgUrl(result.id)} />
          <div className="table-cell search-name text-sm">{result.name}</div>
          <div className="table-cell search-id text-sm">{realId(result.id)}</div>
        </button>
      ))}
    </div>
  )
}