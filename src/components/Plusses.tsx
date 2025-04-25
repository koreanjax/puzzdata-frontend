import { checkPlus } from '../helper/stat-helper.ts'
import './Plusses.css'

export const Plusses = ({hp, atk, rcv, setHpPlus, setAtkPlus, setRcvPlus}) => {
  return(
  	<div>
      <div className="plusses">
        <label>+</label>
        <input className="plus" value={hp} onChange={e => setHpPlus(checkPlus(e.target.value))} />
      </div>
      <div className="plusses">
        <label>+</label>
        <input className="plus" value={atk} onChange={e => setAtkPlus(checkPlus(e.target.value))} />
      </div>
      <div className="plusses">
        <label>+</label>
        <input className="plus" value={rcv} onChange={e => setRcvPlus(checkPlus(e.target.value))} />
      </div>
    </div>
  )
}