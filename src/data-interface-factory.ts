import { CardResult, SearchResult, SkillResult }  from './models/data-interface.ts'

export const emptySearchResult = (): SearchResult => ({
  monster_id: -1,
  name: ''
})

export const emptyCardResult = (): CardResult => ({
  monster_id: -1,
  name: '',
  attrs: '1|-1|-1',
  types: '1',
  rarity: -1,
  cost: -1,
  ult_evo: -1,
  max_level: 1,
  fuse_exp: -1,
  coin_value: -1,
  official: -1,
  hp_vals: '0|0|0',
  atk_vals: '0|0|0',
  rcv_vals: '0|0|0',
  exp_vals: '0|0',
  active: 0,
  leader: 0,
  from: 0,
  mats: '',
  dmats: '',
  awkns: '',
  super_awkns: '',
  assist: 0,
  expand: 0,
  base: 0,
  group: 0,
  mp: 0,
  collab: 0,
  keywords: '',
  limit_break: 0,
  orb_bgm_id: 0,
  sync_awkn: 0,
  sync_mats: '',
})

export const emptySkillResult = (): SkillResult => ({
  skill_id: 0,
  name: '',
  text: '',
  skill_type: -1,
  skill_max_level: 0,
  skill_init_cd: 0,
  unknown1: '',
  multiSkills: '',
  parameters: ''
})
