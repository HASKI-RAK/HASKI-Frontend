import { StateCreator } from 'zustand'
import { NewsResponse, NewsReturn } from '@core'
import { fetchNews } from '@services'
import { SessionStoreState } from '@store'
import { resetters } from '../Zustand/Store'

type NewsCache = {
  value?: NewsResponse
  promise?: Promise<NewsResponse>
}

export type NewsSlice = {
  _news: Record<string, NewsCache>
  getNews: NewsReturn
  isBannerOpen: boolean
  setIsBannerOpen: (open?: boolean) => void
}

export const createNewsSlice: StateCreator<SessionStoreState, [], [], NewsSlice> = (set, get) => {
  resetters.push(() => set({ _news: {}, isBannerOpen: true }))
  return {
    _news: {},
    isBannerOpen: true,
    setIsBannerOpen: (open?: boolean) => {
      set({ isBannerOpen: open })
    },
    getNews: async (...arg) => {
      const [languageId, university] = arg
      const key = `${languageId}-${university}`

      const cached = get()._news[key]

      if (cached?.value) {
        return cached.value
      }

      // If there's an in-flight promise, return it.
      if (cached?.promise) {
        return cached.promise
      }

      // Otherwise, initiate a new fetch and cache its promise.
      const fetchPromise = fetchNews(languageId, university).then((news: NewsResponse) => {
        set({
          _news: {
            ...get()._news,
            [key]: { value: news }
          }
        })
        return news
      })

      // Cache the in-flight promise.
      set({
        _news: {
          ...get()._news,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    }
  }
}
