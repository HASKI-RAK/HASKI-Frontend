import { User } from '@core'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { getUser } from '@services'

export default interface UserSlice {
  _user: User | undefined
  fetchUser: () => Promise<User>
}

export const createUserSlice: StateCreator<PersistedStoreState, [], [], UserSlice> = (set, get) => ({
  _user: undefined,
  fetchUser: async () => {
    const cached = get()._user

    if (!cached) {
      const user = await getUser()
      set({ _user: user })
    }
    return get()._user!
  }
})
