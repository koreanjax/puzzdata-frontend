const awknsImg: string[] = Object.values(import.meta.glob('../assets/awakenings/*.png', { eager: true, as: 'url' }))
const filterAwknsImg: string[] = Object.values(import.meta.glob('../assets/filter/awakenings/*.png', { eager: true, as: 'url' }))

interface IFilterAwakeningsProps {
  onClick: (delAwkn: number) => void
}
// Lay out the table of awakenings to choose from
// in the filter menu
export const FilterAwakenings: React.FC<IFilterAwakeningsProps> = (props) => {
  const {onClick} = props
  return (
    <div className="awkn-table">
      {filterAwknsImg.map((awkn, index) => (
        <img key={index} className="awkn-filter" onClick={() => onClick(index)} src={awkn.toString()} />
      ))}
    </div>
  )
}

// Display unique awakenings on the filter stage
export const FilterAwakening = ({index}: {index: number}) => {
  return(
    <img className="stage-awkn" src={filterAwknsImg[index]} />
  )
}

interface IAwakeningProps {
  awkns: number[]
}
// Display card awakenings on card selection
export const Awakening: React.FC<IAwakeningProps> = (props) => {
  const {awkns} = props
  if (awkns.length === 0) {
    return(null)
  }
  return (
    <div className="awakenings">
      {awkns.map((awkn: number, key: number) => (
        <img key={key} className="awakening" src={awknsImg[awkn]} />
      ))}
    </div>
  )
}

interface ISuperAwakeningProps {
  awkns: number[]
}
// Display card awakenings on card selection
// Super Awakenings always have the ? Awakening to denote selectability
export const SuperAwakening: React.FC<ISuperAwakeningProps> = (props) => {
  const { awkns } = props
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

interface ISyncAwakeningProps {
  awkn: number
}
// Display card awakenings on card selection
// There is only one Sync Awakening
export const SyncAwakening: React.FC<ISyncAwakeningProps> = (props) => {
  const { awkn } = props
  if(awkn === 0) {
    return(null)
  }
  return (
    <div className="awakenings">
      <img key={awkn} className="awakening" src={awknsImg[awkn]} />
    </div>
  )
}