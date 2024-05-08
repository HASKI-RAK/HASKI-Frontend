import log from 'loglevel'
import { useCallback, useMemo, useState } from 'react'
import { useStore } from '@store'

export type NewsbannerHookReturn = {
  readonly checkForNews: () => Promise<boolean>
  readonly receiveContent: () => Promise<string>
  readonly currentNewsLength: 0
}

export const useNewsbanner = (): NewsbannerHookReturn => {
  const getNews = useStore((state) => state.getNews)

  //stores the character length of the news
  const [newsLength, setNewsLength] = useState(0)

  //** Logic **/
  const checkLanguage = () => {
    const lang = localStorage.getItem('i18nextLng')?.toLowerCase()
    return lang
  }

  //check if there are any news
  const checkForNews = async () => {
    return getNews()
      .then((news) => {
        return news.news.length != 0
      })
      .catch((reason) => {
        log.error(reason)
        return false
      })
  }

  //returns combined string of all the news
  const receiveContent = async () => {
    return getNews()
      .then((news) => {
        const contentA = news.news.map(({ news_content }) => news_content).join(', ')
        setNewsLength(contentA.length)
        return JSON.stringify(contentA)
      })
      .catch((reason) => {
        log.error(reason)
        return ''
      })
  }

  return useMemo(
    () => ({ checkForNews, receiveContent, checkLanguage, newsLength }),
    [checkForNews, receiveContent, checkLanguage, newsLength]
  )
}
