import { StateCreator } from 'zustand'
import { LearningPathElementReturn, RemoteTopic } from '@core'
import { StoreState } from '@store'
import { RemoteTopicReturn } from '../../core/RemoteTopic/RemoteTopic'
import { fetchRemoteTopics } from '../../services/RemoteTopics/fetchRemoteTopics'
import { resetters } from '../Zustand/Store'

export default interface RemoteTopicSlice {
  _cache_remoteTopic_record: Record<number, RemoteTopic[] | undefined>
  getRemoteTopic: RemoteTopicReturn
}

export const createRemoteTopicSlice: StateCreator<StoreState, [], [], RemoteTopicSlice> = (set, get) => {
  resetters.push(() => set({ _cache_remoteTopic_record: {} }))
  return {
    _cache_remoteTopic_record: {},
    getRemoteTopic: async (...arg) => {
      const [courseId] = arg

      const cached = get()._cache_remoteTopic_record[`${courseId}`]

      if (!cached) {
        const remoteTopic_response = await fetchRemoteTopics(courseId)
        set({
          _cache_remoteTopic_record: {
            ...get()._cache_remoteTopic_record,
            [`${courseId}`]: remoteTopic_response
          }
        })
        return remoteTopic_response
      } else return cached
    }
  }
}
