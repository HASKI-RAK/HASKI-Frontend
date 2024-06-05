import { StateCreator } from 'zustand'
import { NewsList, NewsReturn } from '@core'
import { fetchNews } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface NewsSlice {
  _news: Record<string, NewsList>
  getNews: NewsReturn
  setNewsCloseState(closeState: boolean): boolean
  closeState: boolean
}

export const createNewsSlice: StateCreator<StoreState, [], [], NewsSlice> = (set, get) => {
  resetters.push(() => set({ _news: {} })), set({ closeState: {} as boolean })
  return {
    closeState: {} as boolean,
    setNewsCloseState: (closeState) => {
      set({ closeState })
      return closeState
    },
    _news: {},
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
