import '@testing-library/jest-dom'
import { useStore } from '@store'
import { mockServices } from 'jest.setup'

const ils = {
  characteristic_id: 1,
  id: 1,
  input_dimension: 'test',
  input_value: 1,
  perception_dimension: 'test',
  perception_value: 1,
  processing_dimension: 'test',
  processing_value: 1,
  understanding_dimension: 'test',
  understanding_value: 1
}

describe('ILSSlice', () => {
  mockServices.getILS = jest.fn().mockResolvedValueOnce(ils)

  it('should return cached ils if available', async () => {
    const { fetchILS } = useStore.getState()

    mockServices.getILS = jest.fn().mockResolvedValueOnce(ils)

    await fetchILS(1, 1, 1)

    expect(mockServices.getILS).toHaveBeenCalledTimes(1)
    expect(useStore.getState()._cache_ils_record).toEqual({ '1-1-1': ils })

    const cached = await fetchILS(1, 1, 1)
    expect(cached).toEqual(ils)
  })

  it('should fetch ils from server and cache it', async () => {
    const { fetchILS } = useStore.getState()
    mockServices.getILS = jest.fn().mockResolvedValueOnce(ils)

    const result = await fetchILS(1, 1, 1)

    expect(mockServices.getILS).toHaveBeenCalledTimes(1)
    expect(result).toEqual(ils)
    expect(fetchILS).toBeDefined()
    expect(fetchILS).toBeInstanceOf(Function)
    expect(fetchILS).not.toThrow()
    expect(useStore.getState()._cache_ils_record).toEqual({ '1-1-1': ils })
  })
})
