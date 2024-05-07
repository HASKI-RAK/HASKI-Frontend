import log from 'loglevel'
import { useCallback, useMemo } from 'react'
import { useStore } from "@store"

export type NewsbannerHookReturn = {
    readonly checkForNews:()=>Promise<boolean>
    readonly receiveContent:()=>Promise<string>
    readonly checkLanguage:()=>void
}

export const useNewsbanner = ():NewsbannerHookReturn=> {
    const getNews = useStore((state)=>state.getNews)

    //** Logic **/
    const checkLanguage=()=>{
        const lang=localStorage.getItem('i18nextLng')?.toLowerCase()
        return lang
    }
    
    //get the content of the news
    const checkForNews = async()=>{
        return getNews()
        .then((news)=>{
            console.log(`New count ${news.news.length}`)
            return news.news.length != 0
        })
        .catch((reason)=>{
            log.error(reason)
            return false
        })
    }

    const receiveContent = async()=>{
        return getNews()
        .then((news)=>{
            const contentA=news.news.map(({news_content})=>({news_content}))
            console.log(contentA)
            const joined=contentA.concat()
            /*console.log(JSON.stringify(joined))
            news.news.forEach(element => {
                //console.log(element.news_content)
                JSON.stringify(element.news_content)
            });*/
            return JSON.stringify(joined)
        })
        .catch((reason)=>{
            log.error(reason)
            return ""
        })
    }

    return useMemo(
        () =>({checkForNews, receiveContent, checkLanguage}),
        [checkForNews, receiveContent, checkLanguage]
    )
}