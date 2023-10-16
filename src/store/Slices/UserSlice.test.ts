import '@testing-library/jest-dom'
//Tests fail with shortened Path
import { usePersistedStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'

const user = { id: 1, name: 'John Doe' }

describe('UserSlice', () => {
  mockServices.getUser = jest.fn().mockResolvedValueOnce(user)

  it('should fetch user from server and cache it', async () => {
    const { fetchUser } = usePersistedStore.getState()
    mockServices.getUser = jest.fn().mockResolvedValueOnce(user)

    const result = await fetchUser()

    expect(result).toEqual(user)
    expect(fetchUser).toBeDefined()
    expect(fetchUser).toBeInstanceOf(Function)
    expect(fetchUser).not.toThrow()
    expect(mockServices.getUser).toHaveBeenCalledTimes(1)
    expect(usePersistedStore.getState()._user).toEqual(user)
  })

  it('should return cached user if available', async () => {
    const { fetchUser } = usePersistedStore.getState()

    mockServices.getUser = jest.fn().mockResolvedValueOnce(user)

    await fetchUser()

    expect(usePersistedStore.getState()._user).toEqual(user)

    const cached = await fetchUser()

    expect(mockServices.getUser).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(user)
  })
})
