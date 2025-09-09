import { StateCreator } from 'zustand'
import { FavoriteElement, FavoriteElementReturn } from '@core'
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
    getFavoriteElement: async (learningElementId?: number) => {
      if (!learningElementId) {
        throw new Error('learningElementId is required')
      }

      const isCached = get().favorited.includes(learningElementId)

      if (isCached) {
        // Optionally fetch or return dummy value
        return fetchFavorite(learningElementId) // still fetch fresh if needed
      }

      // Fetch and store
      const favorite = await fetchFavorite(learningElementId)

      set({
        favorited: [...get().favorited, learningElementId]
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
