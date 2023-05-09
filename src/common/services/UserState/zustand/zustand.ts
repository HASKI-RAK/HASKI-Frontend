import create from 'zustand'
import { UserState } from '../UserState'

/**
 * Zustand Store of User
 */
const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  setUser: (newUser) =>
    set(() => ({
      user: newUser
    })),
  increaseUserId: () =>
    set((state) => ({
      user: {
        ...state.user,
        id: state.user?.id == undefined ? 0 : state.user?.id + 1
      }
    }))
}))

export { useUserStore }
