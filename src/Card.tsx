import { fetchCard, fetchSkill } from './api/api.ts'
import { useState, MutableRefObject, useEffect, useRef } from 'react'
import './Card.css'
import { HiOutlineArrowDown } from "react-icons/hi"
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
  const [activeEvo, setActiveEvo] = useState<SkillOrganized[]>([])
  const [isEvo, setIsEvo] = useState<boolean>(false)
  const [isLoop, setIsLoop] = useState<boolean>(false)
  const [leader, setLeader] = useState<SkillOrganized>(emptySkillOrganized)
  const [activeString, setActiveString] = useState<string>('')
  const [leaderString, setLeaderString] = useState<string>('')

  const [hp, setHp] = useState<number>(0)
  const [atk, setAtk] = useState<number>(0)
  const [rcv, setRcv] = useState<number>(0)

  const [hpPlus, setHpPlus] = useState<number>(99)
  const [atkPlus, setAtkPlus] = useState<number>(99)
  const [rcvPlus, setRcvPlus] = useState<number>(99)

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
    let mounted: boolean = true
    fetchCard(id).then(result => {
      if (mounted) {
        setCard(CardApiToOrganized(result))
        setLevel(result.max_level)
      }
    })
    return () => {
      mounted = false
    }
  },[])
  
  // Once card is fetched from the DB, update values
  useEffect(() => {
    let cardFetched: boolean = true
    fetchSkill(card.active).then(result => {
      if (cardFetched) {
        if(Array.isArray(result)) {
          setActiveEvo(result)
          setIsEvo(true)
          if (result[0].skill_type === 233) {
            setIsLoop(true)
          }
        } else {
          setActive(result)
        }
      }
    })
    fetchSkill(card.leader).then(result => {
      if (cardFetched){
        setLeader(SkillApiToOrganized(result))
      }   
    })
    return () => {
      cardFetched = false
    }
  },[card])

  // Every change to those dependencies will cause stat changes
  useEffect(() => {
    setStats()
  },[level, hpPlus, atkPlus, rcvPlus])

  // Stat helper
  const setStats = () => {
    setHp(calcStats(level, card.maxLevel, card.limitPercent, card.hpVals, 10)+(hpPlus*10))
    setAtk(calcStats(level, card.maxLevel, card.limitPercent, card.atkVals, 5)+(atkPlus*5))
    setRcv(calcStats(level, card.maxLevel, card.limitPercent, card.rcvVals, 5)+(rcvPlus*3))
  }

  const activeSkills = []
  if (isEvo) {
    activeEvo.map((skill, index) => {
      if (index > 0) {
        activeSkills.push(
          <Skills
            key={index}
            skillType={"Skill"}
            skillName={skill.name}
            skillText={skill.text}
            skillLoop={isLoop}
            skillInitCd={skill.skill_init_cd}
            skillMaxLevel={skill.skill_max_level}
          />)
        if (index + 1 < activeEvo.length) {
          activeSkills.push(<HiOutlineArrowDown key={index*10}className="skill-evolve-icon" size={20} />)
        }
      }
    })
  } else {
    activeSkills.push(
      <Skills
        key={0}
        skillType={"Skill"}
        skillName={active.name}
        skillText={active.text}
        skillLoop={isLoop}
        skillInitCd={active.skill_init_cd}
        skillMaxLevel={active.skill_max_level}
      />)
  }

  return (card.monsterId > 0 &&
  <div className="card" ref={wrapperRef}>
    <CardHeader id={card.monsterId} name={card.name} setSelected={setSelected} rarity={card.rarity}/>
    <div className="icon-row">
      <Icon id={card.monsterId} />
      <Stat hp={hp} atk={atk} rcv={rcv} />
      <Plusses hp={hpPlus} atk={atkPlus} rcv={rcvPlus} setHpPlus={setHpPlus} setAtkPlus={setAtkPlus} setRcvPlus={setRcvPlus} />
      <div className="level">
        <label htmlFor="level">Level: </label>
        <input id="level"
          className="level-input"
          autoComplete="off"
          value={level}
          onChange={e => setLevel(checkLevel(e.target.value, card.maxLevel, card.limitPercent))}
          type="text"
          inputMode="numeric"
        />  
      </div>
    </div>
    <div>
      <Type types={card.types}/>
      <Awakening awkns={card.awkns} />
      <SuperAwakening awkns={card.sAwkns} />
      <SyncAwakening awkn={card.syncAwkn} />
      {activeSkills}
      <Skills skillType={"Leader Skill"} skillName={leader.name} skillText={leader.text} />
      <Keywords keywords={card.keywords} />
    </div>
  </div>
  )
}
