import './Rarity.css'
import { SetStateAction } from 'react'

const RARITY: string = 'Rarity'
const MAX_RARITY: number = 10 

interface IRarityProps {
  rarityActive: boolean[]
  setRarityActive: React.Dispatch<SetStateAction<boolean[]>>
}
export const Rarity: React.FC<IRarityProps> = (props) => {
  const {rarityActive, setRarityActive} = props
  const handleRarity = (index: number) => {
    const tempRarityActive = [...rarityActive]
    tempRarityActive[index] = !tempRarityActive[index]
    setRarityActive(tempRarityActive)
  }

  const RarityGrid = () => {
    const grid = []

    const classes:string = "rarity-button "

  	for (let index: number = 0; index < MAX_RARITY; index++) {
      const numRarity: string = (index+1).toString()
  	  grid.push(
  	  	<div key={index}
          className={rarityActive[index] ? classes + "rarity-button-active" : classes + "rarity-button-inactive"}
          onClick={() => handleRarity(index)}
        >
  	  	  {numRarity}
  	  	</div>
  	  	)
  	}
    return(grid)
  }

  return (
    <div className="rarity">
      {RARITY}
      <div className="rarity-grid">
        <RarityGrid />
      </div>
    </div>
  )
}