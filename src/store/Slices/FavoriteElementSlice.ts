import { StateCreator } from 'zustand'
import { FavoriteElement, FavoriteElementReturn } from '@core'
import { fetchFavorite } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

//Should return the learningElementids of the Elements that are favorited by the user
type FavoriteElementCache = {
  value?: FavoriteElement
  promise?: Promise<FavoriteElement>
}

export type FavoriteElementSlice = {
  _favorite: Record<string, FavoriteElementCache>
  getFavoriteElement: FavoriteElementReturn
}

export const createFavoriteElementSlice: StateCreator<PersistedStoreState, [], [], FavoriteElementSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ _favorite: {} }))
  return {
    _favorite: {},
    getFavoriteElement: async (...arg) => {
      const [studentId] = arg
      const key = `${studentId}`

      const cached = get()._favorite[key]

      if (cached?.value) {
        return cached.value
      }

      // If there's an in-flight promise, return it.
      if (cached?.promise) {
        return cached.promise
      }

      // Otherwise, initiate a new fetch and cache its promise.
      const fetchPromise = fetchFavorite(studentId).then((favorite: FavoriteElement) => {
        set({
          _favorite: {
            ...get()._favorite,
            [key]: { value: favorite }
          }
        })
        return favorite
      })

      // Cache the in-flight promise.
      set({
        _favorite: {
          ...get()._favorite,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    }
  }
}
