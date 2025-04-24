export interface CardOrganized {
  id: number;
  name: string;
  attrs: number[];
  types: number[];
  cost: number;
  ultEvo: number;
  maxLevel: number;
  fuseExp: number;
  coinValue: number;
  hpVals: number[];
  atkVals: numbers[];
  rcvVals: numbers[];
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
  id: -1,
  name: '',
  atrs: [],
  types: [],
  cost: -1,
  ultEvo: -1,
  maxLevel: -1,
  fuesExp: -1,
  coinValue: -1,
  hpVals: [],
  atkVals: [],
  rcvVals: [],
  limitPercent: -1,
  maxExp: -1,
  expGrowth: -1,
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


const splitAndTrim = (str: string, delimiter: string): string[] => {
  return str.split(/[{delimiter}]/).map(s => s.trim());
}

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
    id: result.id,
    name: result.name,
    attrs: checkStringAndSplitToNum(result.attrs, '|'),
    types: checkStringAndSplitToNum(result.types, '|'),
    cost: result.cost,
    ultEvo: result.ult_evo,
    maxLevel: result.max_level,
    coinValue: result.coin_value,
    hpVals: checkStringAndSplitToNum(result.hp_vals, '|'),
    atkVals: checkStringAndSplitToNum(result.atk_vals, '|'),
    rcvVals: checkStringAndSplitToNum(result.rcv_vals, '|'),
    limitPercent: result.limit_break,
    expVals: checkStringAndSplitToNum(result.exp_vals, '|'),
    active: result.active,
    leader: result.leader,
    from: result.from,
    mats: checkStringAndSplitToNum(result.evolve_mats, '|'),
    awkns: checkStringAndSplitToNum(result.awkns, '|'),
    sAwkns: checkStringAndSplitToNum(result.super_awkns, '|'),
    assist: result.assist,
    expand: result.expand,
    base: result.base,
    group: result.number,
    mp: result.mp,
    collab: result.collab,
    keywords: checkStringAndSplitToStr(result.keywords, '|'),
    orbBgmId: result.orb_bgm_id,
    syncAwkn: result.sync_awkn,
    syncMats: checkStringAndSplitToStr(result.sync_mats, '|')
  }
  return(organized)
}
