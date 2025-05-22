import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

/**
 * AuthSlice
 *
 * This slice is used to store the expire timestamp of the JWT token.
 */
export default interface AuthSlice {
  expire: number // Unix timestamp
  setExpire: (timestamp: number) => void // Unix timestamp
}

export const createAuthSlice: StateCreator<PersistedStoreState, [], [], AuthSlice> = (set) => {
  resetters.push(() => set({ expire: 0 }))
  return {
    expire: 0,
    setExpire: (timestamp: number) => {
      set({ expire: timestamp })
    }
  }
}
