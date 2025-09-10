import { StateCreator } from 'zustand'
import { FavoriteElementReturn } from '@core'
import { fetchFavorite } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

//Should return the learningElementids of the Elements that are favorited by the user

export type FavoriteElementSlice = {
  getFavoriteElement: FavoriteElementReturn
  setFavoriteElement: (studentId?: number, learningElementId?: number) => void
  favorited: number[]
}

export const createFavoriteElementSlice: StateCreator<PersistedStoreState, [], [], FavoriteElementSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ favorited: [] }))
  return {
    favorited: [],
    hasLoadedFavorites: false,
    getFavoriteElement: async (studentId: number) => {
      if (!studentId) {
        throw new Error('learningElementId is required')
      }

      const isCached = get().favorited.includes(studentId)

      if (isCached) {
        return fetchFavorite(studentId)
      }

      // Fetch and store
      const favorite = await fetchFavorite(studentId)

      set({
        favorited: [...get().favorited, studentId]
      })

      return favorite
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
