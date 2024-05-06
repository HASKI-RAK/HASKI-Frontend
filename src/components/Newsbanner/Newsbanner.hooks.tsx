import log from 'loglevel'
import { useMemo } from 'react'
import { useStore } from "@store"

export type NewsbannerHookReturn = {
    //readonly handleClose:()=> void
    readonly checkForNews:()=>Promise<boolean>
    readonly receiveContent:()=>Promise<string>
}

export const useNewsbanner = ():NewsbannerHookReturn=> {
    const getNews = useStore((state)=>state.getNews)

    //** Logic **/
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
            console.log(`Newscontent ${JSON.stringify(news.news[0].news_content)}`)
            return JSON.stringify(news.news[0].news_content)
        })
        .catch((reason)=>{
            log.error(reason)
            return ""
        })
    }

    return useMemo(
        () =>({checkForNews, receiveContent}),
        [checkForNews, receiveContent]
    )
}