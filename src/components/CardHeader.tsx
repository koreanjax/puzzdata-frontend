import './CardHeader.css'
import { CiSquareRemove, CiStar } from "react-icons/ci";

interface ICardHeaderProps {
  id: number
  name: string
  rarity: number
  setSelected: React.Dispatch<React.SetStateAction<number>>
}

export const CardHeader: React.FC<ICardHeaderProps> = (props) => {
  const {id, name, rarity, setSelected} = props
  const realId: number = (id > 9899) ? id-100 : id

  const numberAndRarity = []

  numberAndRarity.push(<div key={0} className="card-id">No.{realId}</div>)

  for (let i = 0; i < rarity; i++) {
    numberAndRarity.push(<CiStar key={i+1} size={20}/>)
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
        <CiSquareRemove className="card-close-icon" onClick={handleClose} size={30}/>
      </div>
    </div>
  )
}
