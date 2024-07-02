import log from 'loglevel'
import { useMemo, useState, useContext } from 'react'
import { UniversityCheck as _UniversityCheck, UniversityCheck } from '@common/utils'
import { SnackbarContext } from '@services'
import { useStore } from '@store'
import { useTranslation } from 'react-i18next'

/**
 * @prop checkForNews - sets the newsItem if there is atleast one news
 * and returns a string of all news
 * @prop hasItem - check if there are any news
 * @category Hooks
 * @interface
 */

export type NewsbannerHookReturn = {
  readonly checkForNews: () => Promise<string>
  readonly hasItem: () => boolean
}

/**
 * useNewsbanner hook.
 * @remarks
 * Hook for the Newsbanner logic.
 * first checks if there are any news and then returns a string with all news items.
 * also changes news if the language gets changed
 *
 * @returns - hasItem and all news as a string
 *
 * @category Hooks
 */

export const useNewsbanner = (): NewsbannerHookReturn => {
  const { t, i18n } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const getNews = useStore((state) => state.getNews)
  const { checkUniversity } = UniversityCheck()
  const [newsItem, setNewsItem] = useState(false)

  //** Logic **/
  const checkLanguage = () => {
    return i18n.language
  }

  const hasItem = () => {
    return newsItem
  }

  //returns combined string of all the news
  //and checks if there are news
  const checkForNews = async () => {
    return checkUniversity().then((university) => {
      return getNews(checkLanguage(), university)
        .then((news) => {
          setNewsItem(news.news.length != 0)
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
          log.error('error.getNews', 'Error: ' + error)
          return ''
        })
    })
  }

  return useMemo(
    () => ({ checkForNews, checkLanguage, hasItem, newsItem }),
    [checkForNews, checkLanguage, hasItem, newsItem]
  )
}
