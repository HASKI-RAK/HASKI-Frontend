import log from 'loglevel'
import { useMemo } from 'react'
import { usePersistedStore } from "@store"

export type NewsbannerHookReturn = {
    //readonly handleClose:()=> void
    readonly checkNews:()=>Promise<string>
}

export const useNewsbanner = ():NewsbannerHookReturn=> {
    const getNews = usePersistedStore((state)=>state.getNews)

    //** Logic **/
    //get the content of the news
    const checkNews = async()=>{
        return getNews()
        .then((news)=>{
            return news.news_content
        })
        .catch((reason)=>{
            log.error(reason)
            return ''
        })
    }
    return useMemo(
        () =>({checkNews}),
        [checkNews]
    )
}