import '@testing-library/jest-dom'
import { useStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'

const listk = {
  att: 1,
  characteristic_id: 1,
  cogn_str: 1,
  con: 1,
  crit_rev: 1,
  eff: 1,
  elab: 1,
  ext_res_mng_str: 1,
  goal_plan: 1,
  id: 1,
  int_res_mng_str: 1,
  lit_res: 1,
  lrn_env: 1,
  lrn_w_cls: 1,
  metacogn_str: 1,
  org: 1,
  reg: 1,
  rep: 1,
  time: 1
}

describe('ListKSlice', () => {
  mockServices.getListK = jest.fn().mockResolvedValueOnce(listk)

  it('should return cached listk if available', async () => {
    const { fetchListK } = useStore.getState()

    mockServices.getListK = jest.fn().mockResolvedValueOnce(listk)

    await fetchListK(1, 1, 1)

    expect(mockServices.getListK).toHaveBeenCalledTimes(1)
    expect(useStore.getState()._cache_listk_record).toEqual({ '1-1-1': listk })

    const cached = await fetchListK(1, 1, 1)
    expect(cached).toEqual(listk)
  })

  it('should fetch listk from server and cache it', async () => {
    const { fetchListK } = useStore.getState()
    mockServices.getListK = jest.fn().mockResolvedValueOnce(listk)

    const result = await fetchListK(1, 1, 1)

    expect(mockServices.getListK).toHaveBeenCalledTimes(1)
    expect(result).toEqual(listk)
    expect(fetchListK).toBeDefined()
    expect(fetchListK).toBeInstanceOf(Function)
    expect(fetchListK).not.toThrow()
    expect(useStore.getState()._cache_listk_record).toEqual({ '1-1-1': listk })
  })
})
