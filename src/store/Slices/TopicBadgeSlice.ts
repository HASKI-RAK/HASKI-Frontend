import { StateCreator } from 'zustand'
import { BadgeResponse } from '@core'
import { fetchTopicBadges } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type TopicBadgesCache = {
  value?: BadgeResponse
  promise?: Promise<BadgeResponse>
}

export type TopicBadgeSlice = {
  _topicBadges: Record<string, TopicBadgesCache>
  getTopicBadges: (topicId: number, refetch: boolean) => Promise<BadgeResponse>
  clearTopicBadgesCache: () => void
}

export const createTopicBadgeSlice: StateCreator<StoreState, [], [], TopicBadgeSlice> = (set, get) => {
  resetters.push(() => set({ _topicBadges: {} }))
  return {
    _topicBadges: {},
    getTopicBadges: async (topicId, refetch) => {
      const key = `${topicId}`
      const cached = get()._topicBadges[key]

      if (cached?.value && !refetch) return cached.value

      if (cached?.promise && !refetch) return cached.promise

      const badgePromise = fetchTopicBadges(topicId.toString()).then((response: BadgeResponse) => {
        set({
          _topicBadges: {
            [key]: { value: response }
          }
        })
        return response
      })

      set({
        _topicBadges: {
          [key]: { promise: badgePromise }
        }
      })

      return badgePromise
    },
    clearTopicBadgesCache: () => set({ _topicBadges: {} })
  }
}
