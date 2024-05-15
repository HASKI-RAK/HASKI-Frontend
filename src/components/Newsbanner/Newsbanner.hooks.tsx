import log from 'loglevel'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { UniversityCheck as _UniversityCheck, UniversityCheck, UniversityCheckReturn } from '@common/utils'
import { useStore } from '@store'

export type NewsbannerHookReturn = {
  readonly checkForNews: () => Promise<string>
  readonly hasItem:()=>boolean
}

export const useNewsbanner = (): NewsbannerHookReturn => {
  const getNews = useStore((state) => state.getNews)
  const { checkUniversity } = UniversityCheck()
  const [newsItem, setNewsItem] = useState(false)
  const [toggle, setToggle] = useState(false)

  //** Logic **/
  const checkLanguage = () => {
    const lang = localStorage.getItem('i18nextLng')?.toLowerCase()
    return lang
  }

  const hasItem =()=>{
    return newsItem
  }

  //returns combined string of all the news
  const checkForNews = async () => {
    return checkUniversity()
      .then((university) => {
        return getNews(checkLanguage(), university)
          .then((news) => {
            setNewsItem(news.news.length!=0)
            const contentA = news.news.map(({ news_content }) => news_content).join(', ')
            console.log('news:', news, 'lang', checkLanguage(), 'university:', university)
            return JSON.stringify(contentA)
          })
          .catch((reason) => {
            log.error(reason)
            return ''
          })
      })
      .catch((reason) => {
        log.error(reason)
        return ''
      })
  }

  return useMemo(() => ({ checkForNews, checkLanguage, hasItem, newsItem }), [checkForNews, checkLanguage, hasItem, newsItem])
}
