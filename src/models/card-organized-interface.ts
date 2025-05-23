import { CardResult } from './data-interface.ts'

export interface CardOrganized {
  monsterId: number;
  name: string;
  attrs: number[];
  types: number[];
  rarity: number;
  cost: number;
  ultEvo: number;
  maxLevel: number;
  fuseExp: number;
  coinValue: number;
  hpVals: number[];
  atkVals: number[];
  rcvVals: number[];
  limitPercent: number;
  expVals: number[];
  active: number;
  leader: number;
  from: number;
  mats: number[];
  awkns: number[];
  sAwkns: number[];
  assist: number;
  expand: number;
  base: number;
  group: number;
  mp: number;
  collab: number;
  keywords: string[];
  orbBgmId: number;
  syncAwkn: number;
  syncMats: string[];
}

export const emptyCardOrganized = () => ({
  monsterId: -1,
  name: '',
  attrs: [],
  types: [],
  rarity: 0,
  cost: -1,
  ultEvo: -1,
  maxLevel: -1,
  fuseExp: -1,
  coinValue: -1,
  hpVals: [0,0,0],
  atkVals: [0,0,0],
  rcvVals: [0,0,0],
  limitPercent: -1,
  expVals: [0,0],
  active: 0,
  leader: 0,
  from: -1,
  mats: [],
  awkns: [],
  sAwkns: [],
  assist: -1,
  expand: -1,
  base: -1,
  group: -1,
  mp: -1,
  collab: -1,
  keywords: [],
  orbBgmId: -1,
  syncAwkn: -1,
  syncMats: []
})


const checkStringAndSplitToStr = (str: string, delimiter: string): string[] => {
  if(!str) {
    return([])
  } else {
    return str.split(delimiter).map(s => s.trim());
  }
}

const checkStringAndSplitToNum = (str: string, delimiter: string): number[] => {
  if(!str) {
    return([])
  } else {
    return str.split(delimiter).map(Number)
  }
}

export const CardApiToOrganized = (result: CardResult): CardOrganized => {
  let organized: CardOrganized = {
    monsterId: result.monster_id,
    name: result.name,
    attrs: checkStringAndSplitToNum(result.attrs, '|'),
    types: checkStringAndSplitToNum(result.types, '|'),
    rarity: result.rarity,
    cost: result.cost,
    ultEvo: result.ult_evo,
    maxLevel: result.max_level,
    fuseExp: result.fuse_exp,
    coinValue: result.coin_value,
    hpVals: checkStringAndSplitToNum(result.hp_vals, '|'),
    atkVals: checkStringAndSplitToNum(result.atk_vals, '|'),
    rcvVals: checkStringAndSplitToNum(result.rcv_vals, '|'),
    limitPercent: result.limit_break,
    expVals: checkStringAndSplitToNum(result.exp_vals, '|'),
    active: result.active,
    leader: result.leader,
    from: result.from,
    mats: checkStringAndSplitToNum(result.mats, '|'),
    awkns: checkStringAndSplitToNum(result.awkns, '|'),
    sAwkns: checkStringAndSplitToNum(result.super_awkns, '|'),
    assist: result.assist,
    expand: result.expand,
    base: result.base,
    group: result.group,
    mp: result.mp,
    collab: result.collab,
    keywords: checkStringAndSplitToStr(result.keywords, '|'),
    orbBgmId: result.orb_bgm_id,
    syncAwkn: result.sync_awkn,
    syncMats: checkStringAndSplitToStr(result.sync_mats, '|')
  }
  return(organized)
}
