import { StateCreator } from 'zustand'
import { RemoteTopics, RemoteTopicsReturn } from '@core'
import { fetchRemoteTopics } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type RemoteTopicsCache = {
  value?: RemoteTopics[]
  promise?: Promise<RemoteTopics[]>
}

export type RemoteTopicsSlice = {
  _cache_remoteTopics_record: Record<string, RemoteTopicsCache>
  getRemoteTopics: RemoteTopicsReturn
}

export const createRemoteTopicsSlice: StateCreator<StoreState, [], [], RemoteTopicsSlice> = (set, get) => {
  resetters.push(() => set({ _cache_remoteTopics_record: {} }))
  return {
    _cache_remoteTopics_record: {},
    getRemoteTopics: async (...arg) => {
      const [courseId] = arg
      const key = `${courseId}`

      const cached = get()._cache_remoteTopics_record[key]

      if (cached?.value) {
        return cached.value
      }

      // If there's an in-flight promise, return it.
      if (cached?.promise) {
        return cached.promise
      }

      const fetchPromise = fetchRemoteTopics(courseId).then((response: RemoteTopics[]) => {
        set({
          _cache_remoteTopics_record: {
            ...get()._cache_remoteTopics_record,
            [key]: { value: response }
          }
        })
        return response
      })

      // Cache the in-flight promise.
      set({
        _cache_remoteTopics_record: {
          ...get()._cache_remoteTopics_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    }
  }
}
