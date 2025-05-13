import './Plusses.css'
import { checkPlus } from '../helper/stat-helper.ts'
import { SetStateAction } from 'react'

interface IPlussesProps {
  hp: number
  atk: number
  rcv: number
  setHpPlus: React.Dispatch<SetStateAction<number>>
  setAtkPlus: React.Dispatch<SetStateAction<number>>
  setRcvPlus: React.Dispatch<SetStateAction<number>>
}
export const Plusses: React.FC<IPlussesProps> = (props) => {
  const {hp, atk, rcv, setHpPlus, setAtkPlus, setRcvPlus} = props
  // Break down each plus into a component and reuse?
  return(
  	<div className="plusses">
      <div className="plus">
        <label htmlFor="hp">+</label>
        <input id="hp"
          className="plus-input"
          autoComplete="off"
          value={hp}
          onChange={e => setHpPlus(checkPlus(e.target.value))}
          type="text"
          inputMode="numeric"
        />
      </div>
      <div className="plus">
        <label htmlFor="atk">+</label>
        <input id="atk"
          className="plus-input"
          autoComplete="off"
          value={atk}
          onChange={e => setAtkPlus(checkPlus(e.target.value))}
          type="text"
          inputMode="numeric"
        />
      </div>
      <div className="plus">
        <label htmlFor="rcv">+</label>
        <input id="rcv"
          className="plus-input"
          autoComplete="off"
          value={rcv}
          onChange={e => setRcvPlus(checkPlus(e.target.value))} 
          type="text"
          inputMode="numeric"
        />
      </div>
    </div>
  )
}