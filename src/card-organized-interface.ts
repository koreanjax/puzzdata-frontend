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
  maxExp: number;
  expGrowth: number;
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
  active: -1,
  leader: -1,
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
  keywords: '',
  orbBgmId: -1
})

const splitAndTrim = (str: string, delimiter: string): string[] => {
  return str.split(/[|]/).map(s => s.trim());
}

export const CardApiToOrganized = (result: CardResult): CardOrganized => {
  let tempAttrs: number[] = [result.attr_1, result.attr_2, result.attr_3]
  let tempTypes: number[] = [result.type_1, result.type_2, result.type_3]
  let tempAwkns: number[] = [result.awkn_1, result.awkn_2, result.awkn_3, result.awkn_4, result.awkn_5, result.awkn_6, result.awkn_7, result.awkn_8, result.awkn_9]
  let tempSAwkns: number[] = [result.s_awkn_1, result.s_awkn_2, result.s_awkn_3, result.s_awkn_4, result.s_awkn_5, result.s_awkn_6, result.s_awkn_7, result.s_awkn_8, result.s_awkn_9, result.s_awkn_10]
  let tempKeywords: string[] = splitAndTrim(result.keywords, "|")

  tempAttrs = tempAttrs.filter(function(val) {
    return val >= 0;
  })
  tempTypes = tempTypes.filter(function(val) {
    return val >= 0;
  })
  tempAwkns = tempAwkns.filter(function(val) {
    return val !== 0;
  })
  tempSAwkns = tempSAwkns.filter(function(val) {
    return val !== 0;
  })

  let organized: CardOrganized = {
    id: result.id,
    name: result.name,
    attrs: tempAttrs,
    types: tempTypes,
    cost: result.cost,
    ultEvo: result.ult_evo,
    maxLevel: result.max_level,
    coinValue: result.coin_value,
    hpVals: [result.hp_init, result.hp_max, result.hp_growth],
    atkVals: [result.atk_init, result.atk_max, result.atk_growth],
    rcvVals: [result.rcv_init, result.rcv_max, result.rcv_growth],
    limitPercent: result.limit_break,
    maxExp: result.max_exp,
    expGrowth: result.exp_growth,
    active: result.active,
    leader: result.leader,
    from: result.from,
    mats: [result.mat_1, result.mat_2, result.mat_3, result.mat_4, result.mat_5],
    awkns: tempAwkns,
    sAwkns: tempSAwkns,
    assist: result.assist,
    expand: result.expand,
    base: result.base,
    group: result.number,
    mp: result.mp,
    collab: result.collab,
    keywords: tempKeywords,
    orbBgmId: result.orb_bgm_id
  }
  return(organized)
}
