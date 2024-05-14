import log from 'loglevel'
import { useCallback, useMemo, useState } from 'react'
import { UniversityCheck as _UniversityCheck, UniversityCheck, UniversityCheckReturn } from '@common/utils'
import { useStore } from '@store'

export type NewsbannerHookReturn = {
  readonly checkForNews: () => Promise<boolean>
  readonly receiveContent: () => Promise<string>
  readonly receiveUni:()=>void
}

export const useNewsbanner = (): NewsbannerHookReturn => {
  const getNews = useStore((state) => state.getNews)
    const {checkUniversity} = UniversityCheck()
  //stores the character length of the news
  const [newsLength, setNewsLength] = useState(0)
  const [uni, setUni] = useState("")

  //** Logic **/
  const checkLanguage = () => {
    const lang = localStorage.getItem('i18nextLng')?.toLowerCase()
    return lang
  }

  const receiveUni = () => {
    return checkUniversity().then((university) => {
        setUni(university)
        console.log("university:", uni)
    })
    .catch((reason) =>{
        log.error(reason)
        return ''
    })
  }

  //check if there are any news
  const checkForNews = async () => {
    return getNews(checkLanguage(), uni)
      .then((news) => {
        console.log("news:",news, "lang", checkLanguage())
        return news.news.length != 0
      })
      .catch((reason) => {
        log.error(reason)
        return false
      })
  }

  //returns combined string of all the news
  const receiveContent = async () => {
    return getNews(checkLanguage(), uni)
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
    () => ({ checkForNews, receiveContent, checkLanguage, receiveUni }),
    [checkForNews, receiveContent, checkLanguage, receiveUni]
  )
}
