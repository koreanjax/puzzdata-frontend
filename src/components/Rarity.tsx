import * as CI from 'react-icons/ci'
import './Rarity.css'
import { useState } from 'React'

const RARITY: string = 'Rarity'
const MAX_RARITY: nubmer = 10 

export const Rarity = ({rarityActive, setRarityActive}) => {
  const handleRarity = (index: number) => {
    const tempRarityActive = [...rarityActive]
    tempRarityActive[index] = !tempRarityActive[index]
    setRarityActive(tempRarityActive)
  }

  const RarityGrid = () => {
    const grid = []

    const classes:string = "rarity-button "

  	for (let index: nubmer = 0; index < MAX_RARITY; index++) {
      const numRarity: string = 'x' + (index+1).toString()
  	  grid.push(
  	  	<button key={index}
          className={rarityActive[index] ? classes + "rarity-button-active" : classes + "rarity-button-inactive"}
          onClick={() => handleRarity(index)}
        >
          <CI.CiStar size={24} />
  	  	  {numRarity}
  	  	</button>
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