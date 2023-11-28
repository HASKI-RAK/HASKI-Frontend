import '@testing-library/jest-dom'
//Tests fail with shortened Path
import { usePersistedStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'

const user = { id: 1, name: 'John Doe' }

describe('UserSlice', () => {
  mockServices.fetchUser = jest.fn().mockResolvedValueOnce(user)

  it('should fetch user from server and cache it', async () => {
    const { getUser } = usePersistedStore.getState()
    mockServices.fetchUser = jest.fn().mockResolvedValueOnce(user)

    const result = await getUser()

    expect(result).toEqual(user)
    expect(getUser).toBeDefined()
    expect(getUser).toBeInstanceOf(Function)
    expect(getUser).not.toThrow()
    expect(mockServices.fetchUser).toHaveBeenCalledTimes(1)
    expect(usePersistedStore.getState()._user).toEqual(user)
  })

  it('should return cached user if available', async () => {
    const { getUser } = usePersistedStore.getState()

    mockServices.fetchUser = jest.fn().mockResolvedValueOnce(user)

    await getUser()

    expect(usePersistedStore.getState()._user).toEqual(user)

    const cached = await getUser()

    expect(mockServices.fetchUser).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(user)
  })
})
