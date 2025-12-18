import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { User } from '@core'
//Tests fail with shortened Path
import { usePersistedStore } from '../Zustand/Store'

const user = { id: 1, name: 'John Doe' }

describe('UserSlice', () => {
  mockServices.fetchUser = jest.fn().mockResolvedValueOnce(user)

  it('[HASKI-REQ-0028] should fetch user from server and cache it', async () => {
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

  it('[HASKI-REQ-0028] should return cached user if available', async () => {
    const { getUser } = usePersistedStore.getState()

    mockServices.fetchUser = jest.fn().mockResolvedValueOnce(user)

    await getUser()

    expect(usePersistedStore.getState()._user).toEqual(user)

    const cached = await getUser()

    expect(mockServices.fetchUser).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(user)
  })

  it('[HASKI-REQ-0028] should set and return the provided user without fetching', async () => {
    // Define a sample user object
    const sampleUser: User = {
      id: 1,
      lms_user_id: 1,
      name: 'Alice',
      role: 'student',
      role_id: 2,
      settings: {
        id: 1,
        pswd: 'hello',
        theme: 'dark',
        user_id: 1
      },
      university: 'HS-KE'
    }

    // Get the getUser function from the store
    const { getUser } = usePersistedStore.getState()

    // Call getUser with the sample user
    const returnedUser = await getUser(sampleUser)

    // Assert that the returned user is the same as the one provided.
    expect(returnedUser).toEqual(sampleUser)

    // Additionally, check that the store now has _user set to sampleUser.
    expect(usePersistedStore.getState()._user).toEqual(sampleUser)

    // Optionally, verify that fetchUser was NOT called since the user was provided.
    expect(mockServices.fetchUser).not.toHaveBeenCalled()
  })
})
