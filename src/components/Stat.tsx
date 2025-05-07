import './Stat.css'

const formatStat = (stat: number): string => {
  return(stat.toLocaleString('en-US'))
}

export const Stat = ({hp, atk, rcv}) => {
  const hpString: string = formatStat(hp)
  const atkString: string = formatStat(atk)
  const rcvString: string = formatStat(rcv)
  return (
    <div className="stats">
      <div className="stat">HP: {hpString}</div>
      <div className="stat">ATK: {atkString}</div>
      <div className="stat">RCV: {rcvString}</div>
    </div>
  )
}