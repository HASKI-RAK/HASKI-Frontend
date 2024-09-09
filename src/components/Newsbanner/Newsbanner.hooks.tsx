import log from 'loglevel'
import { useMemo, useState, useContext, useEffect } from 'react'
import { SnackbarContext } from '@services'
import { useSessionStore } from '@store'
import { useTranslation } from 'react-i18next'
import { useUniversity } from '@common/hooks'
import i18next from 'i18next'

/**
 * @prop  sets the newsItem if there is atleast one news
 * and returns a string of all news
 * @prop hasItem - check if there are any news
 * @category Hooks
 * @interface
 */

export type NewsbannerHookReturn = {
  readonly isNewsAvailable: boolean
  readonly newsText: string
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
  const getNews = useSessionStore((state) => state.getNews)
  const { university } = useUniversity()
  const [isNewsAvailable, setIsNewsAvailable] = useState(false)
  const [newsText, setNewsText] = useState('')

  //** Logic **/
  //returns combined string of all the news
  //and checks if there are news
  useEffect(() => {
    getNews(i18n.language, university)
      .then((response) => {
        setIsNewsAvailable(response.news.length != 0)
        setNewsText(response.news.map(({ news_content }) => news_content).join(', '))
      })
      .catch((error) => {
        addSnackbar({
          message: t('error.getNews'),
          severity: 'error',
          autoHideDuration: 3000
        })
        log.error(t('error.getNews') + ' ' + error)
        setNewsText('')
      })
  }, [i18next.language])

  return useMemo(() => ({ isNewsAvailable, newsText }), [isNewsAvailable, newsText])
}
