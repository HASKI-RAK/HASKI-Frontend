import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { usePersistedStore } from '../Zustand/Store'

describe('DefaultLearningPathSlice', () => {
  const defaultLearningPath = [
    {
      classification: 'EK',
      position: 1,
      id: 1,
      disabled: false,
      university: 'HS-KE'
    },
    {
      classification: 'ÜB',
      position: 2,
      id: 2,
      disabled: true,
      university: 'HS-KE'
    }
  ]

  it('[HASKI-REQ-0026] should fetch defaultLearningPath from server and cache them', async () => {
    mockServices.fetchDefaultLearningPath = jest.fn().mockResolvedValue(defaultLearningPath)
    const { getDefaultLearningPath } = usePersistedStore.getState()

    const userId = 1
    const lmsUserId = 2

    const result = await getDefaultLearningPath(userId, lmsUserId)

    expect(result).toEqual(defaultLearningPath)
    expect(getDefaultLearningPath).toBeDefined()
    expect(getDefaultLearningPath).toBeInstanceOf(Function)
    expect(mockServices.fetchDefaultLearningPath).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchDefaultLearningPath).toHaveBeenCalledWith(userId, lmsUserId)
    expect(usePersistedStore.getState()._defaultLearningPath[`${userId}-${lmsUserId}`]).toEqual({
      value: [
        {
          classification: 'EK',
          position: 1,
          id: 1,
          disabled: false,
          university: 'HS-KE'
        },
        {
          classification: 'ÜB',
          position: 2,
          id: 2,
          disabled: true,
          university: 'HS-KE'
        }
      ]
    })
    expect(getDefaultLearningPath).not.toThrow() // counts as function call (getCourses), here it would be Called 2 times instead of 1
  })

  it('[HASKI-REQ-0026] should return cached defaultLearningPath if available', async () => {
    const { getDefaultLearningPath } = usePersistedStore.getState()
    mockServices.fetchDefaultLearningPath = jest.fn().mockResolvedValue(defaultLearningPath)

    const userId = 1
    const lmsUserId = 2

    await getDefaultLearningPath(userId, lmsUserId)

    expect(usePersistedStore.getState()._defaultLearningPath[`${userId}-${lmsUserId}`]).toEqual({
      value: [
        {
          classification: 'EK',
          position: 1,
          id: 1,
          disabled: false,
          university: 'HS-KE'
        },
        {
          classification: 'ÜB',
          position: 2,
          id: 2,
          disabled: true,
          university: 'HS-KE'
        }
      ]
    })

    const cached = await getDefaultLearningPath(userId, lmsUserId)

    expect(mockServices.fetchDefaultLearningPath).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(defaultLearningPath)
  })

  it('[HASKI-REQ-0026] should trigger a reload even if cache is available', async () => {
    const { getDefaultLearningPath } = usePersistedStore.getState()
    mockServices.fetchDefaultLearningPath = jest.fn().mockResolvedValue(defaultLearningPath)

    const userId = 1
    const lmsUserId = 2

    await getDefaultLearningPath(userId, lmsUserId)

    expect(usePersistedStore.getState()._defaultLearningPath[`${userId}-${lmsUserId}`]).toEqual({
      value: [
        {
          classification: 'EK',
          position: 1,
          id: 1,
          disabled: false,
          university: 'HS-KE'
        },
        {
          classification: 'ÜB',
          position: 2,
          id: 2,
          disabled: true,
          university: 'HS-KE'
        }
      ]
    })
    const cached = await getDefaultLearningPath(userId, lmsUserId)
    expect(mockServices.fetchDefaultLearningPath).toHaveBeenCalledTimes(1)
    expect(cached).toEqual(defaultLearningPath)

    const { clearDefaultLearningPathCache } = usePersistedStore.getState()
    clearDefaultLearningPathCache()
    await getDefaultLearningPath(userId, lmsUserId)
    expect(mockServices.fetchDefaultLearningPath).toHaveBeenCalledTimes(2)
  })
})
