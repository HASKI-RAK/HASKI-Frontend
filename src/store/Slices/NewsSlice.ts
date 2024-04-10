import { StateCreator } from 'zustand'
import { News } from '@core'
import { fetchNews } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface NewsSlice {
  _news: News | undefined
  getNews: (news?: News) => Promise<News>
}

export const createNewsSlice: StateCreator<PersistedStoreState, [], [], NewsSlice> = (set, get) => {
  resetters.push(() => set({ _news: undefined }))
  return {
    _news: undefined,
    getNews: async (news?: News) => {
      if (news) {
        set({ _news: news })
        return news
      }

      const cached = get()._news

      if (!cached) {
        const news = await fetchNews()
        set({ _news: news })
        return news
      } else return cached
    }
  }
}
