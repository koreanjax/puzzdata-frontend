const awknsImg = Object.values(import.meta.glob('../assets/awakenings/*.webp', { eager: true, as: 'url' }))
const filterAwknsImg = Object.values(import.meta.glob('../assets/filter/*.webp', { eager: true, as: 'url' }))

export const FilterAwakenings = ({onClick}) => {
  return (
    <div className="awkn-table">
      {filterAwknsImg.map((awkn, index) => (
        <img key={index} className="awkn-filter" onClick={() => onClick(index)} src={awkn} />
      ))}
    </div>
  )
}

export const FilterAwakening = ({index}: {index: number}) => {
  return(
    <img className="stage-awkn" src={filterAwknsImg[index]} />
  )
}

export const Awakening = ({awkns}) => {
  return (
    <div className="awakenings">
      {awkns.map((awkn, key) => (
        <img key={key} className="awakening" src={awknsImg[awkn]} />
      ))}
    </div>
  )
}

// Super Awakenings always have the ? Awakening to denote selectability
export const SuperAwakening = ({awkns}) => {
  if(awkns.length === 0) {
    return(null)
  }
  return (
    <div className="awakenings">
      <img key={-1} className="awakening" src={awknsImg[0]} />
      {awkns.map((awkn, key) => (
        <img key={key} className="awakening" src={awknsImg[awkn]} />
      ))}
    </div>
  )
}

// There is only one Sync Awakening
export const SyncAwakening = ({awkn}) => {
  if(awkn === 0) {
    return(null)
  }
  return (
    <div className="awakenings">
      <img key={awkn} className="awakening" src={awknsImg[awkn]} />
    </div>
  )
}