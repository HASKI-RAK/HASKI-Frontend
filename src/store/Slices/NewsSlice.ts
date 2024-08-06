import { StateCreator } from 'zustand'
import { NewsResponse, NewsReturn } from '@core'
import { fetchNews } from '@services'
import { PersistedSessionStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface NewsSlice {
  _news: Record<string, NewsResponse>
  getNews: NewsReturn
  isBannerOpen: boolean
  setIsBannerOpen: (open?: boolean) => void
}

export const createNewsSlice: StateCreator<PersistedSessionStoreState, [], [], NewsSlice> = (set, get) => {
  resetters.push(() => set({ _news: {}, isBannerOpen: true }))
  return {
    _news: {},
    isBannerOpen: true,
    setIsBannerOpen: (open?: boolean) => {
      set({ isBannerOpen: open })
    },
    getNews: async (...arg) => {
      const [languageId, university] = arg

      const cached = get()._news[`${languageId}-${university}`]

      if (!cached) {
        const news = await fetchNews(languageId, university)
        set({
          _news: {
            ...get()._news,
            [`${languageId}-${university}`]: news
          }
        })
        return news
      } else return cached
    }
  }
}
