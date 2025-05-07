const QUERY_ATTR_BASE: string = 'attrs='
const QUERY_TYPE_BASE: string = 'types='
const QUERY_RARITY_BASE: string = 'rarity='
const QUERY_COST_BASE: string = 'cost='
const QUERY_AWKN_BASE: string = 'awkns='
const QUERY_SKILL_BASE: string = 'skill='

export const addFilters = (activeFilters) => {
  if(arrayAllEqual(activeFilters)) {
    return('-1')
  } else {
    const filters: string = []  
    activeFilters.map((active, index) => {
      const filter: string = active ? index.toString() : '-1'
      filters.push(filter)
    })
    return(filters.join(','))
  }
}

const addTypeFilter = (activeFilters) => {
  if(arrayAllEqual(activeFilters)) {
    return('-1')
  } else {
    const filters: string = []  
    activeFilters.map((active, index) => {
      if(active) {
        filters.push(index)
      }
    })
    return(filters.join(','))
  }
}

const arrayAllEqual = (booleanArray) => {
  return (new Set(booleanArray).size === 1)
}

export const queryAttributes = (main, sub, third) => {
  const attrs: string[] = []
  attrs.push(addFilters(main))
  attrs.push(addFilters(sub))
  attrs.push(addFilters(third))
  return(QUERY_ATTR_BASE+attrs.join('|'))
}

export const queryTypes = (type) => {
  const types: string[] = []
  return(QUERY_TYPE_BASE+(addTypeFilter(type)))
}

export const queryRarity = (rarity) => {
  const rarities: string[] = []
  rarities.push(addFilters(rarity))
  return(QUERY_RARITY_BASE+rarities.join('|'))
}

export const queryAwakenings = (awkns) : string => {
  const tempList: string[] = []
  Object.keys(awkns).map((awkn, index) => {
    tempList.push([(parseInt(awkn)+1).toString(), awkns[awkn].toString()])
  })
  const awknQuery = tempList.length > 0 ? tempList.join("|") : "-1"
  return (QUERY_AWKN_BASE+awknQuery)
}

const skillToQuery = {
  'orbconvert': '9|20|154',
  'orbboard': '71',
  'orbcreate': '141|208',
  'orbline': '127|128',
  'orbshape': '176',
  'orblock': '152',
  'orbunlock': '172',
  'orbcombo': '190',
  'orbnail': '262',
  'orbsticky': '251',
  'orbenhance': '52|91',
  'orbrefresh': '10',
  'orbspinner': '207',
  'orbspecificspinner': '249',
  'cap': '241,246,247',
  'capslot': '258',
  'capattribute': '263',
  'attack': '50-*,<5,*|88|90-*,<5,<5,*|92|156-*,*,*,*,2,*|168',
  'attackslot': '230',
  'rcv': '50',
  'mass': '51',
  'shieldpercent': '3|156,*,*,*,*,=3,*',
  'shieldattribute': '21',
  'hpchange': '237',
  'bind': '117->0,*,*,*,*|179-*,*,*,>0,*',
  'awokenbind': '117-*,*,*,*,>0|179-*,*,*,*,>0',
  'unmatcahble': '196',
  'healflat': '117-*,>0,*,*,*',
  'healrcv': '117-*,*,>0,*,*',
  'healpercent': '179',
  'healteamrcv': '145',
  'delay': '18',
  'charge': '146',
  'reducecharge': '218',
  'attribute': '173-*,>0,*,*',
  'damage': '173-*,*,*,>0',
  'combo': '173-*,*,>0,*',
  'void': '191',
  'defense': '19',
  'shield': '259',
  'ctw': '5|246|247',
  'moveflat': '132-*,>0,*',
  'movepercent': '132-*,*,>0',
  'attributesingle': '2|59|84|115|143-*,*,=1,*',
  'attributemass': '0|1|58|85|143-*,*,=0,*',
  'fixedsingle': '55|86|188',
  'fixedmass': '56',
  'poison': 'P4',
  'noskyfall': '184',
  'skyfall': '126',
  'enhance': '180',
  'locked': '205' ,
  'nail': '226',
  'barbed': '242',
  'foresight': '253',
  'attributeself': '142',
  'attributeenemy': '153|224',
  'swapself': '93',
  'swaprightmost': '227',
  'unable': '214',
  'hpclause': '225',
  'batteclause': '234',
  'orbclause': '255',
  'count': '268',
  'regularmass': '6',
  'regularsingle': '261',
  'truemass': '161',
  'boardsize': '244',
  'boardcloud': '238',
  'boardtape': '239',
  'counterattack': '60|110',
  'random': '118',
  'transform': '202|236',
  'evolve': '232',
  'evolveloop': '233',
  'delayed': '248'
}

export const querySkill = (skill): string => {
  const tempList: string[] = []

  skill.map(skillName => {
    console.log(skillName)
    tempList.push(skillToQuery[skillName])
  })

  const skillQuery = tempList.length > 0 ? tempList.join(".") : "-1"
  return (QUERY_SKILL_BASE+skillQuery)
}