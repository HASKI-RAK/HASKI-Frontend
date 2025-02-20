import log from 'loglevel'
import { ComponentType, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '@services'
//TODO: LiBRARY IMPORT OR DEFAULT?
import { usePersistedStore } from '@store'
import { withXAPI } from '../library/withXAPI'

const useXAPIWrapper = <P extends object>(
  componentName: string,
  filePath: string,
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
    const { i18n } = useTranslation()
    const en = i18n.getFixedT('en')

    // Check user authentication status.
    const { isAuth } = useContext(AuthContext)

    useEffect(() => {
      // GEt user
      getUser()
        .then((user) => {
          if (user) {
            setLmsUserID(user.lms_user_id.toString())
          }
        })
        .catch((error) => {
          log.error(error)
        })

      const locationArray = location.pathname.split('/')
      const page = locationArray.pop()
      if (page?.match(/\d+/) != null) {
        setPageName(locationArray[locationArray.length - 1])
      } else {
        setPageName(page ?? '')
      }
    }, [location.pathname, getUser, lmsUserID, setPageName, setLmsUserID])

    // Add user to params
    const EnhancedComponent = withXAPI(
      WrappedComponent,
      componentName,
      filePath,
      en(`pages.${pageName}`),
      isAuth,
      lmsUserID,
      getXAPI()
    )
    return <EnhancedComponent {...props} />
  }

  return XAPIWrapperComponent
}

export default useXAPIWrapper
