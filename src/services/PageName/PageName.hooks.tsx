import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

// TODO: doku
type PageNameHookReturn = {
  pageName: string
}

// TODO: doku
export const usePageName = (): PageNameHookReturn => {
  // Get the page name from the URL.
  const location = useLocation()

  // Translate to english.
  const { i18n } = useTranslation()
  const en = i18n.getFixedT('en')

  // Get the page name from the URL.
  const pageName = useMemo(() => {
    const locationArray = location.pathname.split('/')
    const page = locationArray.pop()

    const rawPageName  = page?.match(/\d+/) != null ? locationArray[locationArray.length - 1] : page
    const translatedPageName = en(`pages.${rawPageName}`)

    return translatedPageName
  }, [location.pathname])

  return {pageName}
}
