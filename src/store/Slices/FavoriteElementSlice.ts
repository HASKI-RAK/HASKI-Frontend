import { StateCreator } from 'zustand'
import { FavoriteElementReturn } from '@core'
import { fetchFavorite } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

/*
 * getFavoriteElement
 * @param studentId The student id
 * @returns An array of learning element ids
 *
 * setFavoriteElement
 * @param learningElementId The learning element id
 * @returns Nothing but the void
 *
 * @interface
 */

export type FavoriteElementSlice = {
  getFavoriteElement: FavoriteElementReturn
  setFavoriteElement: (learningElementId: number) => void
  favorited?: number[]
}

/*
 * getFavoriteElement - Fetch by the user favorited learning elements
 *
 * setFavoriteElement - Set the currently favorited learning elements
 */

export const createFavoriteElementSlice: StateCreator<PersistedStoreState, [], [], FavoriteElementSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ favorited: undefined }))
  return {
    favorited: undefined,
    getFavoriteElement: async (studentId: number) => {
      const current = get().favorited

      if (!current) {
        try {
          const fetchedFavorites = await fetchFavorite(studentId)

          // Ensure it's an array and store it
          set({
            favorited: Array.isArray(fetchedFavorites) ? fetchedFavorites : []
          })
        } catch (_) {
          set({ favorited: [] }) // fallback to empty
        }
      }

      return get().favorited
    },
    setFavoriteElement: async (learningElementId: number) => {
      const cached = get().favorited?.find((learningElement) => learningElement === learningElementId)
      if (cached) {
        set({ favorited: get().favorited?.filter((learningElement) => learningElement !== learningElementId) })
      } else {
        set({ favorited: [...(get().favorited || []), learningElementId as number] })
      }
    }
  }
}
