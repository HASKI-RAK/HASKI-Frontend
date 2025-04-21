import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

/**
 * @prop pageName - The name of the current page translate to english.
 * @category Services
 * @category Hooks
 * @interface
 */
type PageNameHookReturn = {
  readonly pageName: string
}

/**
 * usePageName hook.
 *
 * @remarks
 * usePageName presents a hook for the english name of the current page.
 * It can be used to inject the page name into a component.
 *
 * @returns - The english name of the current page.
 *
 * @category Services
 * @category Hooks
 */
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

    const rawPageName = page?.match(/\d+/) != null ? locationArray[locationArray.length - 1] : page
    const translatedPageName = en(`pages.${rawPageName}`)

    return translatedPageName
  }, [location.pathname])

  return { pageName }
}
