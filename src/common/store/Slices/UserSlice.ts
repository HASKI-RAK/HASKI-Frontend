import { User } from '@core'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { getUser } from '@services'
import { resetters } from '../Zustand/Store'

export default interface UserSlice {
  _user: User | undefined
  fetchUser: () => Promise<User>
}

export const createUserSlice: StateCreator<PersistedStoreState, [], [], UserSlice> = (set, get) => {
  resetters.push(() => set({ _user: undefined }))
  return {
    _user: undefined,
    fetchUser: async () => {
      const cached = get()._user

      if (!cached) {
        const user = await getUser()
        set({ _user: user })
        return user
      } else
        return cached
    }
  }
}
