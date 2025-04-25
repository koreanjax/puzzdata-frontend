import { fetchCard, fetchSkill } from './api/api.ts'
import { useState, useEffect } from 'react'
import './Card.css'
import { CardOrganized, emptyCardOrganized, CardApiToOrganized } from './models/card-organized-interface.ts'
import { SkillOrganized, emptySkillOrganized, SkillApiToOrganized } from './models/skill-organized-interface.ts'
import { CardHeader } from './components/CardHeader.tsx'
import { Icon } from './components/Icon.tsx'
import { Stat } from './components/Stat.tsx'
import { Plusses } from './components/Plusses.tsx'
import { Type } from './components/Types.tsx'
import { Awakening, SuperAwakening, SyncAwakening } from './components/Awakenings.tsx'
import { Skills } from './components/Skills.tsx'
import { Keywords } from './components/Keywords.tsx'
import { calcStats, checkLevel } from './helper/stat-helper.ts'

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

  const [hpPlus, setHpPlus] = useState(0)
  const [atkPlus, setAtkPlus] = useState(0)
  const [rcvPlus, setRcvPlus] = useState(0)
  
  // Initial card fetch when Card is rendered
  useEffect(() => {
    fetchCard(id).then(result => {
      setCard(CardApiToOrganized(result))
    })
  },[id])
  
  // Once card is fetched from the DB, update values
  useEffect(() => {
    setLevel(card.maxLevel)
    setHpPlus(0)
    setAtkPlus(0)
    setRcvPlus(0)
    setStats()
    fetchSkill(card.active).then(result => {
      setActive(SkillApiToOrganized(result))
    })
    fetchSkill(card.leader).then(result => {
      setLeader(SkillApiToOrganized(result))
    })
  },[card])

  // Every change to those dependencies will cause stat changes
  useEffect(() => {
    if(level > 0) {
      setStats()
    }
  },[level, hpPlus, atkPlus, rcvPlus])

  // Stat helper
  const setStats = () => {
    setHp(calcStats(level, card.maxLevel, card.limitPercent, card.hpVals, 10)+(hpPlus*10))
    setAtk(calcStats(level, card.maxLevel, card.limitPercent, card.atkVals, 5)+(atkPlus*5))
    setRcv(calcStats(level, card.maxLevel, card.limitPercent, card.rcvVals, 5)+(rcvPlus*3))
  }

  return (
  <div className="card">
      <div key={card.id}>
        <div>
          <CardHeader id={card.id} name={card.name} />
          <div className="icon-row">
            <Icon id={card.id} />
            <Stat hp={hp} atk={atk} rcv={rcv} />
            <Plusses hp={hpPlus} atk={atkPlus} rcv={rcvPlus} setHpPlus={setHpPlus} setAtkPlus={setAtkPlus} setRcvPlus={setRcvPlus} />
            <div className="level-input">
              Level: 
              <input className="level" value={level} onChange={e => setLevel(checkLevel(e.target.value, card.maxLevel, card.limitPercent))} />
            </div>
          </div>
        </div>
        <div>
          <Type types={card.types}/>
          <Awakening awkns={card.awkns} />
          <SuperAwakening awkns={card.sAwkns} />
          <SyncAwakening awkn={card.syncAwkn} />
          <Skills activeName={active.name} activeText={active.text} leaderName={leader.name} leaderText={leader.text} />
          <Keywords keywords={card.keywords} />
        </div>
      </div>
  </div>
  )
}
