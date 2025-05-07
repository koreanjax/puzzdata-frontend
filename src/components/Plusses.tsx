import './Plusses.css'
import { checkPlus } from '../helper/stat-helper.ts'

export const Plusses = ({hp, atk, rcv, setHpPlus, setAtkPlus, setRcvPlus}) => {
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