import './Plusses.css'

export const Plusses = ({hp, atk, rcv, setHpPlus, setAtkPlus, setRcvPlus}) => {
  const checkPlus = (newPlus: string): number => {
    const filtered = newPlus.replace(/[e\+\-]/gi, "")
    setHpPlus(filtered)
    if(filtered > 99) {
      return(99)
    } else {
      return(filtered)
    }
  }

  const handlePlus = ({value, setPlus}) => {
    console.log(value)
    const plusFilter: number = parseInt(value.replace(/[e\+\-]/gi, ""))
    setHpPlus(plusFilter)
  }

  return(
  	<div>
      <div className="plusses">
        <label htmlFor="hp">+</label>
        <input id="hp"
          className="plus"
          value={hp}
          onChange={e => setHpPlus(checkPlus(e.target.value))}
          type="number"
          inputmode="numeric"
        />
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