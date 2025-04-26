import { checkPlus } from '../helper/stat-helper.ts'
import './Plusses.css'

export const Plusses = ({hp, atk, rcv, setHpPlus, setAtkPlus, setRcvPlus}) => {
  return(
  	<div>
      <div className="plusses">
        <label htmlFor="hp">+</label>
        <input id="hp" className="plus" value={hp} onChange={e => setHpPlus(checkPlus(e.target.value))} />
      </div>
      <div className="plusses">
        <label htmlFor="atk">+</label>
        <input id="atk" className="plus" value={atk} onChange={e => setAtkPlus(checkPlus(e.target.value))} />
      </div>
      <div className="plusses">
        <label htmlFor="rcv">+</label>
        <input id="rcv" className="plus" value={rcv} onChange={e => setRcvPlus(checkPlus(e.target.value))} />
      </div>
    </div>
  )
}