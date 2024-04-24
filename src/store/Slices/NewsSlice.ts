import { StateCreator } from 'zustand'
import { NewsList } from '@core'
import { fetchNews } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface NewsSlice {
  _news: NewsList | undefined
  getNews: (news?: NewsList) => Promise<NewsList>
}

export const createNewsSlice: StateCreator<PersistedStoreState, [], [], NewsSlice> = (set, get) => {
  resetters.push(() => set({ _news: undefined }))
  return {
    _news: undefined,
    getNews: async (news?: NewsList) => {
      if (news) {
        set({ _news: news })
        return news
      }

      const cached = get()._news

      if (!cached) {
        const news = await fetchNews('eng')
        set({ _news: news })
        return news
      } else return cached
    }
  }
}
