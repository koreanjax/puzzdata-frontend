export interface Input {
  input: string;
}

export interface SearchResult {
  monster_id: number;
  name: string;
}

export interface CardResult {
  monster_id: number;
  name: string;
  attrs: string;
  types: string;
  rarity: number;
  cost: number;
  ult_evo: number;
  max_level: number;
  fuse_exp: number;
  coin_value: number;
  official: number;
  hp_vals: string;
  atk_vals: string;
  rcv_vals: string;
  exp_vals: string;
  active: number;
  leader: number;
  from: number;
  mats: string;
  dmats: string;
  awkns: string;
  super_awkns: string;
  assist: number;
  expand: number;
  base: number;
  group: number;
  mp: number;
  collab: number;
  keywords: string;
  limit_break: number;
  orb_bgm_id: number;
  sync_awkn: number;
  sync_mats: string;
}

export interface SkillResult {
  skil_id: number;
  name: string;
  text: string;
  skill_type: number;
  skill_max_level: number;
  skill_init_cd: number;
  unknown_1: string;
  parameters: string;
}
