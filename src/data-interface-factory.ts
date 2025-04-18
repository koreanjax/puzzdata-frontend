import { SearchResult, CardResult }  from './data-interface.ts'

export const emptySearchResult = (): SearchResult => ({
  id: -1,
  name: ''
})

export const emptyCardResult = (): CardResult => ({
  id: -1,
  name: '',
  attr1: -1,
  attr2: -1,
  attr3: -1,
  type1: -1,
  type2: -1,
  type3: -1,
  rarity: -1,
  cost: -1,
  ultEvo: -1,
  maxLevel: -1,
  fuseExp: -1,
  coinValue: -1,
  hpInit: -1,
  hpMax: -1,
  hpGrowth: -1,
  atkInit: -1,
  atkMax: -1,
  atkGrowth: -1,
  rcvInit: -1,
  rcvMax: -1,
  rcvGrowth: -1,
  maxExp: -1,
  expGrowth: -1,
  activeSkill: -1,
  leaderSkill: -1,
  evolvedFrom: -1,
  eMat1: -1,
  eMat2: -1,
  eMat3: -1,
  eMat4: -1,
  eMat5: -1,
  deMat1: -1,
  deMat2: -1,
  deMat3: -1,
  deMat4: -1,
  deMat5: -1,
  awkns: -1,
  awkn1: -1,
  awkn2: -1,
  awkn3: -1,
  awkn4: -1,
  awkn5: -1,
  awkn6: -1,
  awkn7: -1,
  awkn8: -1,
  awkn9: -1,
  sAwkns: -1,
  sAwkn1: -1,
  sAwkn2: -1,
  sAwkn3: -1,
  sAwkn4: -1,
  sAwkn5: -1,
  sAwkn6: -1,
  sAwkn7: -1,
  sAwkn8: -1,
  sAwkn9: -1,
  sAwkn10: -1,
  assist: -1,
  expand: -1,
  base: -1,
  group: -1,
  mp: -1,
  collab: -1,
  keywords: '',
  limitPercent: -1,
  orbBgmId: -1
})
