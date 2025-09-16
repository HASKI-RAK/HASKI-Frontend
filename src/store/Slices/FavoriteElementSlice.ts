import { StateCreator } from 'zustand'
import { FavoriteElementReturn } from '@core'
import { fetchFavorite } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

//Should return the learningElementids of the Elements that are favorited by the user

export type FavoriteElementSlice = {
  getFavoriteElement: FavoriteElementReturn
  setFavoriteElement: (learningElementId?: number) => void
  favorited: number[]
  hasLoadedFavorites: boolean
}

export const createFavoriteElementSlice: StateCreator<PersistedStoreState, [], [], FavoriteElementSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ favorited: [], hasLoadedFavorites: false }))
  return {
    favorited: [],
    hasLoadedFavorites: false,
    getFavoriteElement: async (...arg) => {
      const [studentId] = arg
      const hasLoadedFavorites = get().hasLoadedFavorites
      if (hasLoadedFavorites) {
        return get().favorited
      }

      // Fetch and store
      const favorite = await fetchFavorite(studentId)

      set({
        favorited: [favorite].flat(),
        hasLoadedFavorites: true
      })
      return get().favorited
    },
    setFavoriteElement: async (...arg) => {
      const [learningElementId] = arg
      const cached = get().favorited.find((learningElement) => learningElement === learningElementId)
      if (cached) {
        set({ favorited: get().favorited.filter((learningElement) => learningElement !== learningElementId) })
      } else {
        set({ favorited: [...get().favorited, learningElementId as number] })
      }
    }
  }
}
