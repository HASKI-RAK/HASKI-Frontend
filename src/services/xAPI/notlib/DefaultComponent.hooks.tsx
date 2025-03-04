import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"


type DefaultComponentHookReturn = {
    pageName: string
}


export const useDefaultComponent = (): DefaultComponentHookReturn => {
  // Get the page name from the URL.
  const [pageName, setPageName] = useState<string>('')
  const location = useLocation()

  // Translate to english.
  const { i18n } = useTranslation()
  const en = i18n.getFixedT('en')

    useEffect(() => {
      // Set the page name.
      const locationArray = location.pathname.split('/')
      const page = locationArray.pop()
      const newPageName = page?.match(/\d+/) != null ? locationArray[locationArray.length - 1] : page ?? ''
      setPageName(en(`pages.${newPageName}`))
    }, [location.pathname])

    
    return useMemo(() => ({
        pageName}), [pageName])
}


export const getPageName = () => {}