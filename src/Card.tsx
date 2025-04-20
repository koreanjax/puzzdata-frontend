import { fetchCard } from './api.ts'
import { useState, useEffect } from 'react'
import './Card.css'
import img from './assets/07170.webp'
import { emptyCardResult } from './data-interface-factory.ts'
import { CardOrganized, emptyCardOrganized, CardApiToOrganized } from './card-organized-interface.ts'


export default function Card({id}: { id: number }) {

  const [card, setCard] = useState<CardOrganized>(emptyCardOrganized)
  const [level, setLevel] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [hp, setHp] = useState(0)
  const [atk, setAtk] = useState(0)
  const [rcv, setRcv] = useState(0)
  
  const awknsImg = Object.values(import.meta.glob('./assets/awakenings/*.webp', { eager: true, as: 'url' }))

  useEffect(() => {
    fetchCard(id).then(result => {
      setCard(CardApiToOrganized(result))
    })
  },[id])
  
  useEffect(() => {
    console.log(card)
    setLevel(card.maxLevel)
    setStats()
  },[card])

  useEffect(() => {
    if(id <= 0) {
      setLoaded(false)
    } else {
      setLoaded(true)
    }
  },[id])

  useEffect(() => {
    if(level > 0) {
      setStats()
    }
  },[level])

  // Should put these in a helper file since not really needed here
  const calcStats = (vals: number[], statFlag: number): number => {
    if (level < 100) {
      let growth: nubmer = (card.maxLevel > 1) ? (level - 1) / (card.maxLevel - 1) : 1
      let diff: number = vals[1] - vals[0]
      let finalStat: number = vals[0] + diff * Math.pow(growth, vals[2]/10)
      return(Math.round(finalStat))
    } else if (level < 111 && level > 99){
      let limitBreakStat: number = vals[1]*((card.limitPercent/100)+1)
      let statPerLimitLevel: number = (limitBreakStat - vals[1])/11
      let finalStat: number = (level - 99)*statPerLimitLevel+vals[1]
      return(Math.round(finalStat))
    } else if (level > 110) {
      let initStat: number = vals[1]*((card.limitPercent/100)+1)
      let statPerSuperLimitLevel: number = (vals[1]*(statFlag/100)/10)
      let finalStat: number = (level - 110)*statPerSuperLimitLevel+initStat
      return(Math.round(finalStat))
    }
  }

  const setStats = () => {
    setHp(calcStats(card.hpVals, 10))
    setAtk(calcStats(card.atkVals, 5))
    setRcv(calcStats(card.rcvVals, 5))
  }

  // This can probably be put into helper as well, have it just return a valid level for case
  const checkLevel = (newLevel) => {
    if(newLevel > 120 && card.limitPercent > 0) {
      setLevel(120)
    } else if (newLevel > card.maxLevel && card.limitPercent === 0) {
      setLevel(card.maxLevel)
    } else {
      setLevel(newLevel)
    }
  }

  if(!loaded) {
   return(<div/>)
  }

  const Awakening = ({awkns}) => {
    return (
      <div className="awakenings">
        {card.awkns.map((index, key) => (
          <img key={key} className="awakening" src={awknsImg[index]} />
        ))}
      </div>
    )
  }

  const SuperAwakening = ({awkns}) => {
    if(awkns.length === 0) {
      return(null)
    }
    return (
      <div className="awakenings">
        <img key={-1} className="awakening" src={awknsImg[0]} />
        {card.sAwkns.map((index, key) => (
          <img key={index} className="awakening" src={awknsImg[index]} />
        ))}
      </div>
    )
  }

  const SyncAwakening = ({awkn}) => {
    if(awkn === 0) {
      return(null)
    }
    return (
      <div className="awakenings">
        <img key={awkn} className="awakening" src={awknsImg[awkn]} />
      </div>
    )
  }

  return (
  <div className="card">
    <div>
      {
        <div key={card.id} className="card">
          <div className="card-main">
            <img className="card-icon" src={img} />
            <div>
              <div className="card-id">{card.id}</div>
              <div className="card-name">{card.name}</div>
            </div>
          </div>
          <div>
            <Awakening awkns={card.awkns} />
            <SuperAwakening awkns={card.sAwkns} />
            <SyncAwakening awkn={card.syncAwkn} />
            <div className="level-input">
              Level: 
              <input value={level} onChange={e => checkLevel(e.target.value)} />
            </div>
            <div className="stats">
              <div>HP: {hp}</div>
              <div>ATK: {atk}</div>
              <div>RCV: {rcv}</div>
            </div>
          </div>
        </div>
      }
    </div>
  </div>
  )
}
