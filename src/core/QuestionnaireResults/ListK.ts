type ListKReturn = (userId?: number, lmsUserId?: number, studentId?: number) => Promise<ListK | undefined>

type ListK = {
  att: number
  characteristic_id: number
  cogn_str: number
  con: number
  crit_rev: number
  eff: number
  elab: number
  ext_res_mng_str: number
  goal_plan: number
  id: number
  int_res_mng_str: number
  lit_res: number
  lrn_env: number
  lrn_w_cls: number
  metacogn_str: number
  org: number
  reg: number
  rep: number
  time: number
}

export default ListK
export type { ListKReturn }
