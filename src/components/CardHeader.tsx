import './CardHeader.css'
import * as CI from 'react-icons/ci'

export const CardHeader = ({id, name, rarity, setSelected}) => {
  const realId: number = (id > 9899) ? id-100 : id
  const fileName: string = realId.toString().padStart(5, "0")
  const imgSrc: string = "https://dohzi9dodqiuu.cloudfront.net/icons/" + fileName + ".png"

  const numberAndRarity = []

  numberAndRarity.push(<div key={0} className="card-id">No.{realId}</div>)

  for (let i = 0; i < rarity; i++) {
    numberAndRarity.push(<CI.CiStar key={i+1} size={20}/>)
  }
  numberAndRarity.push(<div key={rarity+2}> / {rarity}</div>)

  const handleClose = () => {
    setSelected(0)
  }

  return(
    <div className="card-header">
      <div className="card-id-name">
        <div className="card-id-rarity">
          {numberAndRarity}
        </div>
        <div className="card-name">{name}</div>
      </div>
      <div className="card-close">
        <CI.CiSquareRemove onClick={handleClose} size={30}/>
      </div>
    </div>
  )
}
