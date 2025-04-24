import { fetchCard, fetchSkill } from './api.ts'
import { useState, useEffect } from 'react'
import './Card.css'
import img from './assets/07170.webp'
import { emptyCardResult } from './data-interface-factory.ts'
import { CardOrganized, emptyCardOrganized, CardApiToOrganized } from './card-organized-interface.ts'
import { SkillOrganized, emptySkillOrganized, SkillApiToOrganized } from './skill-organized-interface.ts'
import { Type } from './Types.tsx'
import { Awakening, SuperAwakening, SyncAwakening } from './Awakenings.tsx'
import { calcStats, checkLevel } from './stat-helper.ts'

export const Card = ({id}) => {
  const [card, setCard] = useState<CardOrganized>(emptyCardOrganized)
  const [level, setLevel] = useState(0)
  
  const [active, setActive] = useState<SkillOrganized>(emptySkillOrganized)
  const [leader, setLeader] = useState<SkillOrganized>(emptySkillOrganized)
  const [activeString, setActiveString] = useState('')
  const [leaderString, setLeaderString] = useState('')

  const [hp, setHp] = useState(0)
  const [atk, setAtk] = useState(0)
  const [rcv, setRcv] = useState(0)
  
  
  useEffect(() => {
    fetchCard(id).then(result => {
      setCard(CardApiToOrganized(result))
    })
  },[id])
  
  useEffect(() => {
    setLevel(card.maxLevel)
    setStats()
    fetchSkill(card.active).then(result => {
      setActive(SkillApiToOrganized(result))
    })
    fetchSkill(card.leader).then(result => {
      setLeader(SkillApiToOrganized(result))
    })
  },[card])

  useEffect(() => {
    if(level > 0) {
      setStats()
    }
  },[level])

  // Should put these in a helper file since not really needed here
  

  const setStats = () => {
    setHp(calcStats(level, card.maxLevel, card.limitPercent, card.hpVals, 10))
    setAtk(calcStats(level, card.maxLevel, card.limitPercent, card.atkVals, 5))
    setRcv(calcStats(level, card.maxLevel, card.limitPercent, card.rcvVals, 5))
  }

  // This can probably be put into helper as well, have it just return a valid level for case

  const Keywords = ({keywords}) => {
    if(keywords.length === 0) {
      return(null)
    }
    return (
      <div className="keywords">
        {keywords.map((keyword, key) => (
          <div>{keyword}</div>
        ))}
      </div>
    )
  }

  return (
  <div className="card">
    <div>
        <div key={card.id} className="card">
          <div className="card-main">
            <img className="card-icon" src={img} />
            <div>
              <div className="card-id">{card.id}</div>
              <div className="card-name">{card.name}</div>
            </div>
          </div>
          <div>
            <Type types={card.types}/>
            <Awakening awkns={card.awkns} />
            <SuperAwakening awkns={card.sAwkns} />
            <SyncAwakening awkn={card.syncAwkn} />
            <div className="level-input">
              Level: 
              <input value={level} onChange={e => setLevel(checkLevel(e.target.value, card.maxLevel, card.limitPercent))} />
            </div>
            <div className="stats">
              <div>HP: {hp}</div>
              <div>ATK: {atk}</div>
              <div>RCV: {rcv}</div>
            </div>
            <div className="skills">
              <div>{active.name}: {active.text}</div>
              <div>{leader.name}: {leader.text}</div>
            </div>
            <Keywords keywords={card.keywords} />
          </div>
        </div>
    </div>
  </div>
  )
}
