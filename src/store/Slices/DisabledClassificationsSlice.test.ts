import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { usePersistedStore } from '../Zustand/Store'

describe('DisabledClassificationsSlice', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch disabled Classifications from server and cache them', async () => {
    const { getDisabledClassifications } = usePersistedStore.getState()
    const disabledClassifications = ['KÜ', 'EK']

    const university = 'HS-KE'

    const result = await getDisabledClassifications(university)

    expect(result).toEqual(disabledClassifications)
    expect(getDisabledClassifications).toBeDefined()
    expect(getDisabledClassifications).toBeInstanceOf(Function)
    expect(mockServices.fetchDisabledClassifications).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchDisabledClassifications).toHaveBeenCalledWith('HS-KE')
    expect(usePersistedStore.getState()._disabledClassifications[`${university}`]).toEqual(disabledClassifications)
    expect(getDisabledClassifications).not.toThrow()
  })

  it('should return cached disabledClassifications if available', async () => {
    const { getDisabledClassifications } = usePersistedStore.getState()
    const disabledClassifications = ['KÜ', 'EK']
    mockServices.fetchDisabledClassifications = jest.fn().mockResolvedValueOnce(disabledClassifications)

    const university = 'HS-KE'

    await getDisabledClassifications(university)

    expect(usePersistedStore.getState()._disabledClassifications[`${university}`]).toEqual(disabledClassifications)

    const cached = await getDisabledClassifications('HS-KE')

    expect(mockServices.fetchDisabledClassifications).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(disabledClassifications)
  })

  it('should trigger a reload even if cache is available', async () => {
    const { getDisabledClassifications } = usePersistedStore.getState()
    const disabledClassifications = ['KÜ', 'EK']
    mockServices.fetchDisabledClassifications = jest.fn().mockResolvedValueOnce(disabledClassifications)

    const university = 'HS-KE'

    await getDisabledClassifications(university)

    expect(usePersistedStore.getState()._disabledClassifications[`${university}`]).toEqual(disabledClassifications)
    const cached = await getDisabledClassifications('HS-KE')
    expect(mockServices.fetchDisabledClassifications).toHaveBeenCalledTimes(1)
    expect(cached).toEqual(disabledClassifications)

    const { clearDisabledClassificationsCache } = usePersistedStore.getState()
    clearDisabledClassificationsCache()
    await getDisabledClassifications('HS-KE')
    expect(mockServices.fetchDisabledClassifications).toHaveBeenCalledTimes(2)
  })
})
