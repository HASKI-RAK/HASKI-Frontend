import { User } from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'

export default interface UserSlice {
  user: User
  setUser: (user: User) => void
}

export const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (set) => ({
  user: {} as User,
  setUser: (user: User) => set({ user })
})
