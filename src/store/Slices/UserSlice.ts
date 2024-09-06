import { StateCreator } from 'zustand'
import { User } from '@core'
import {fetchLearningPathElementStatus, fetchUser} from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface UserSlice {
  _user: User | undefined
  getUser: (user?: User) => Promise<User>
  updateUser: (
      user_id: number,
      lms_user_id: number,
      theme: string
  ) => void
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
    },

    // Rework or specialization needed.
    // Rework if: More potential use cases than just theme updating (most user types not accepted)
    // Specialization if: only theme will ever be written to storage (updated data accepts too many values/types)
    updateUser: async (user_id: number, lms_user_id: number, theme: string) => {

      const user = get()._user

      if (user) {

        const updatedTheme = theme

        const updatedData: User = {
          ...user,
          settings: {
            ...user.settings,
            theme: updatedTheme
          }
        }

        set({ _user: updatedData })

      }
    }
  }
}