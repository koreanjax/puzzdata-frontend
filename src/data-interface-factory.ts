import { SearchResult, CardResult }  from './data-interface.ts'

export const emptySearchResult = (): SearchResult => ({
  id: -1,
  name: ''
})

export const emptyCardResult = (): CardResult => ({
  id: -1,
  name: '',
  attrs: '',
  types: '',
  rarity: -1,
  cost: -1,
  ultEvo: -1,
  maxLevel: -1,
  fuseExp: -1,
  coinValue: -1,
  hpVals: '',
  atkVals: '',
  rcvVals: '',
  expVals: '',
  activeSkill: -1,
  leaderSkill: -1,
  evolvedFrom: -1,
  mats: '',
  dMats: '',
  awkns: '',
  sAwkns: '',
  assist: -1,
  expand: -1,
  base: -1,
  group: -1,
  mp: -1,
  collab: -1,
  keywords: '',
  limitPercent: -1,
  orbBgmId: -1,
  syncAwkn: -1,
  syncMats: ''
})
