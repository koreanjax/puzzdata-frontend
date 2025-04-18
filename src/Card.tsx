import { fetchCard } from './api.ts'
import { useState, useEffect } from 'react'
import './Card.css'
import img from './assets/07170.webp'
import { emptyCardResult } from './data-interface-factory.ts'
import { CardOrganized, emptyCardOrganized, CardApiToOrganized } from './card-organized-interface.ts'

export default function Card({id}: { id: number }) {
  const [card, setCard] = useState<CardOrganized>(emptyCardOrganized)
  const [level, setLevel] = useState(0)
  const [hp, setHp] = useState(0)
  const [atk, setAtk] = useState(0)
  const [rcv, setRcv] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (id > 0) {
      fetchCard(id).then(result => {
        setCard(CardApiToOrganized(result))
        setLevel(card.maxLevel)
        setStats()
        setLoaded(true)
      })
    }
  },[id])

  useEffect(() => {
    if(level > 0) {
      setStats()
    }
  },[id,level])

  const calcStats = (vals: number[]): number => {
    let growth: nubmer = (card.maxLevel > 1) ? (level - 1) / (card.maxLevel - 1) : 1
    let diff: number = vals[1] - vals[0]
    let value: number = vals[0] + diff * Math.pow(growth, vals[2]/10)
    return(Math.round(value))
  }

  const setStats = () => {
    setHp(calcStats(card.hpVals))
    setAtk(calcStats(card.atkVals))
    setRcv(calcStats(card.rcvVals))
  }

  const checkLevel = (newLevel) => {
    if(newLevel > card.maxLevel) {
      setLevel(card.maxLevel)
    } else {
      setLevel(newLevel)
    }
  }

  if(!loaded) {
   return(<div/>)
  }

  return (
  <div className="card">
    <div>
      {
        <div key={card.id}>
          <div className="card-main">
            <img className="card-icon" src={img} />
            <div>
              <div className="card-id">{card.id}</div>
              <div className="card-name">{card.name}</div>
            </div>
          </div>
          <div>
            <div className="awakenings">
              {card.awkns.map((awkn, index) => (
                <div key={index} className="awakening">{awkn}</div>
              ))}
            </div>
            <div className="awakenings">
              {card.sAwkns.map((sAwkn, index) => (
                <div key={index} className="awakeings">{sAwkn}</div>
              ))}
            </div>
            <div className="level-input">
              Level: 
              <input value={level} onChange={e => checkLevel(e.target.value)}/>
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
