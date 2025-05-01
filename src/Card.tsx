import { fetchCard, fetchSkill } from './api/api.ts'
import { useState, MutableRefObject, useEffect, useRef } from 'react'
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

export const Card = ({id, setSelected}) => {
  const [card, setCard] = useState<CardOrganized>(emptyCardOrganized)
  const [level, setLevel] = useState(0)
  
  const [active, setActive] = useState<SkillOrganized>(emptySkillOrganized)
  const [leader, setLeader] = useState<SkillOrganized>(emptySkillOrganized)
  const [activeString, setActiveString] = useState<string>('')
  const [leaderString, setLeaderString] = useState<string>('')

  const [hp, setHp] = useState<number>(0)
  const [atk, setAtk] = useState<number>(0)
  const [rcv, setRcv] = useState<number>(0)

  const [hpPlus, setHpPlus] = useState<number>(0)
  const [atkPlus, setAtkPlus] = useState<number>(0)
  const [rcvPlus, setRcvPlus] = useState<number>(0)

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside, false)
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside, false)
  //   }
  // }, [])

  // const handleClickOutside = event => {
  //   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //     setSelected(0)
  //   }
  // }
  
  // Initial card fetch when Card is rendered
  useEffect(() => {
    setHp(0)
    setAtk(0)
    setRcv(0)
    fetchCard(id).then(result => {
      setCard(CardApiToOrganized(result))
      setLevel(result.max_level)
      setHpPlus(99)
      setAtkPlus(99)
      setRcvPlus(99)
    })
  },[id])
  
  // Once card is fetched from the DB, update values
  useEffect(() => {
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

  return (card.monsterId > 0 &&
  <div className="card" ref={wrapperRef}>
      <div key={card.monsterId}>
        <div>
          <div>
            <CardHeader id={card.monsterId} name={card.name} setSelected={setSelected} rarity={card.rarity}/>
          </div>
          <div className="icon-row">
            <Icon id={card.monsterId} />
            <Stat hp={hp} atk={atk} rcv={rcv} />
            <Plusses hp={hpPlus} atk={atkPlus} rcv={rcvPlus} setHpPlus={setHpPlus} setAtkPlus={setAtkPlus} setRcvPlus={setRcvPlus} />
            <div className="level">
              <label htmlFor="level">Level: </label>
              <input id="level"
                className="level-input"
                value={level}
                onChange={e => setLevel(checkLevel(e.target.value, card.maxLevel, card.limitPercent))}
                type="text"
                inputMode="numeric"
              />
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
