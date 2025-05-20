import { RemoteTopics, RemoteTopicsReturn } from '@core'
import { fetchRemoteTopics } from '@services'
import { StoreState } from '@store'
import { StateCreator } from 'zustand'

import { resetters } from '../Zustand/Store'

export default interface RemoteTopicsSlice {
  _cache_remoteTopics_record: Record<string, RemoteTopics[] | undefined>
  getRemoteTopics: RemoteTopicsReturn
}

export const createRemoteTopicsSlice: StateCreator<StoreState, [], [], RemoteTopicsSlice> = (set, get) => {
  resetters.push(() => set({ _cache_remoteTopics_record: {} }))
  return {
    _cache_remoteTopics_record: {},
    getRemoteTopics: async (...arg) => {
      const [courseId] = arg

      const cached = get()._cache_remoteTopics_record[`${courseId}`]

      if (!cached) {
        const remoteTopic_response = await fetchRemoteTopics(courseId)
        set({
          _cache_remoteTopics_record: {
            ...get()._cache_remoteTopics_record,
            [`${courseId}`]: remoteTopic_response
          }
        })
        return remoteTopic_response
      } else return cached
    }
  }
}
