import { ComponentType, ForwardedRef, forwardRef, PropsWithoutRef, Ref, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { withXAPI } from '../library/withXAPI'

// TODO fix import

// TODO: PROP TYPING?

// TODO: Documentation
export const withXAPIWrapper = <P extends object>(
  componentType: string,
  componentFilePath: string,
  WrappedComponent: ComponentType<P>,
) => {

  // Create a new component that wraps the given component injecting the page name.
  const XAPIEnhancedComponent = forwardRef((props: P, ref: Ref<HTMLDivElement>) => {
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
      setPageName(newPageName)
    }, [location.pathname])

    // Wrap the component with the xAPI wrapper.
    const ComponentWithXAPI = withXAPI(WrappedComponent, {
      componentType: componentType,
      componentFilePath: componentFilePath,
      pageName: en(`pages.${pageName}`)
    })

    return <div ref={ref}><ComponentWithXAPI {...props} /></div>
  })

  XAPIEnhancedComponent.displayName = `withXAPIWrapper`
  return XAPIEnhancedComponent
}