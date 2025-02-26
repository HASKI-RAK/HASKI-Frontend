import log from 'loglevel'
import { ComponentType, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '@services'
import { usePersistedStore } from '@store'
import { withXAPI } from '../library/withXAPI'

export const xAPIWrapper = <P extends object>(
  componentType: string,
  componentFilePath: string,
  WrappedComponent: ComponentType<P>
) => {
  const XAPIWrapperComponent = (props: P) => {
    // Get the xAPI object from the store.
    const getXAPI = usePersistedStore((state) => state.getXAPI)

    // Get the user from the store.
    const getUser = usePersistedStore((state) => state.getUser)
    const [lmsUserID, setLmsUserID] = useState<string | undefined>(undefined)

    // Get the page name from the URL.
    const [pageName, setPageName] = useState<string>('')
    const location = useLocation()

    // Translate to english.
    const { i18n, t } = useTranslation()
    const en = i18n.getFixedT('en')

    // Check user authentication status.
    const { isAuth } = useContext(AuthContext)

    useEffect(() => {
      // Set the current user.
      getUser()
        .then((user) => {
          if (user) {
            setLmsUserID(user.lms_user_id.toString())
          }
        })
        .catch((error) => {
          log.error(error)
        })

      // Set the page name.
      const locationArray = location.pathname.split('/')
      const page = locationArray.pop()
      if (page?.match(/\d+/) != null) {
        setPageName(locationArray[locationArray.length - 1])
      } else {
        setPageName(page ?? '')
      }
    }, [location.pathname, getUser, lmsUserID, setPageName, setLmsUserID])

    // Wrap the component with the xAPI wrapper.
    const EnhancedComponent = withXAPI(
      WrappedComponent,
      {
      componentType: componentType,
      componentFilePath: componentFilePath,
      onError: (error) => log.error(t('error.sendStatement') + ' ' + error), // TODO: Translation file
      pageName: en(`pages.${pageName}`),
      userAuthenticated: isAuth,
      userID: lmsUserID,
      xAPIConfig: getXAPI()
      }
    )
    return <EnhancedComponent {...props} />
  }

  return XAPIWrapperComponent
}