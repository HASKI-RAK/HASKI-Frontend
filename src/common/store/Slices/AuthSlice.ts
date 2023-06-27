import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'

export default interface AuthSlice {
  expire: number // Unix timestamp
  setExpire: (timestamp: number) => void // Unix timestamp
}

export const createAuthSlice: StateCreator<PersistedStoreState, [], [], AuthSlice> = (set) => ({
  expire: 0,
  setExpire: (timestamp: number) => {
    set({ expire: timestamp })
  }
})
