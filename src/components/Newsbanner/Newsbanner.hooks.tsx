import log from 'loglevel'
import { useCallback, useMemo, useState, useContext } from 'react'
import { UniversityCheck as _UniversityCheck, UniversityCheck, UniversityCheckReturn } from '@common/utils'
import { SnackbarContext } from '@services'
import { useStore } from '@store'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

export type NewsbannerHookReturn = {
  readonly checkForNews: () => Promise<string>
  readonly hasItem:()=>boolean
}

export const useNewsbanner = (): NewsbannerHookReturn => {
  const {t}=useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const getNews = useStore((state) => state.getNews)
  const { checkUniversity } = UniversityCheck()
  const [lang, setLang]=useState(localStorage.getItem('i18nextLng')?.toLowerCase())
  const [newsItem, setNewsItem] = useState(false)
  

  i18next.on('languageChanged', (lng: string) => {
    setLang(lng)
  })
  //** Logic **/
  const checkLanguage = () => {
    return lang
  }

  const hasItem =()=>{
    return newsItem
  }

  //returns combined string of all the news
  //and the amount of messages
  const checkForNews = async () => {
    return checkUniversity()
      .then((university) => {
        return getNews(checkLanguage(), university)
          .then((news) => {
            setNewsItem(news.news.length!=0)
            const contentA = news.news.map(({ news_content }) => news_content).join(', ')
            //console.log('news:', news, 'lang', checkLanguage(), 'university:', university)
            return JSON.stringify(contentA)
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.getNews') + error,
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error('error.getNews', 'Error: '+ error)
            return ''
          })
      })
      .catch((error) => {
        addSnackbar({
          message: t('error.getUniversity') + error,
          severity: 'error',
          autoHideDuration: 3000
        })
        log.error('error.getUniversity', 'Error: '+ error)
        return ''
      })
  }

  return useMemo(() => ({ checkForNews, checkLanguage, hasItem, newsItem }), [checkForNews, checkLanguage, hasItem, newsItem])
}
