import { StateCreator } from 'zustand'
import { User } from '@core'
import { fetchUser } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface UserSlice {
  _user: User | undefined
  getUser: (user?: User) => Promise<User>
}

export const createUserSlice: StateCreator<PersistedStoreState, [], [], UserSlice> = (set, get) => {
  resetters.push(() => set({ _user: undefined }))
  return {
    _user: undefined,
    getUser: async (user?: User) => {
      if (user) {
        set({ _user: user })
        return user
      }

      const cached = get()._user

      if (!cached) {
        const user = await fetchUser()
        set({ _user: user })
        return user
      } else return cached
    }
  }
}
