import log from 'loglevel'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { UniversityCheck as _UniversityCheck, UniversityCheck, UniversityCheckReturn } from '@common/utils'
import { useStore } from '@store'
import i18next from 'i18next'

export type NewsbannerHookReturn = {
  readonly checkForNews: () => Promise<string>
  readonly hasItem:()=>boolean
}

export const useNewsbanner = (): NewsbannerHookReturn => {
  const getNews = useStore((state) => state.getNews)
  const { checkUniversity } = UniversityCheck()
  const [lang, setLang]=useState(localStorage.getItem('i18nextLng')?.toLowerCase())
  const [newsItem, setNewsItem] = useState(false)
  const [toggle, setToggle] = useState(false)

  i18next.on('languageChanged', (lng: string) => {
    console.log('Language changed to:', lng);
    setLang(lng)
    // Translate and log the new language
    console.log(i18next.t('key'));
  })
  //** Logic **/
  const checkLanguage = () => {
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
