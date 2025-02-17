import { useContext, useEffect, useState } from 'react'
import { getConfig } from '@shared'
import { usePersistedStore } from '@store'
import { setupXAPI} from 'src/services/xAPI/library/setupXAPI'
import { useTranslation } from 'react-i18next'
//import { useLocation } from 'react-router-dom'
import { AuthContext } from '@services'
import log from 'loglevel'

type AppHookReturn = {
  isXAPIConfigured: boolean
}

export const useApp = (): AppHookReturn => {
  // xAPI functionality.
  const setXAPI = usePersistedStore().setXAPI
  const getXAPI = usePersistedStore().getXAPI
  const getUser = usePersistedStore((state) => state.getUser)
  const [lmsUserID, setLmsUserID] = useState<string | undefined>(undefined)
  
  const { i18n } = useTranslation()
  const en = i18n.getFixedT('en')
  // const location = useLocation()
  const { isAuth } = useContext(AuthContext)

  const xAPI = setupXAPI({
    projectURL: getConfig().FRONTEND_GITHUB ?? '',
    projectVersion: getConfig().FRONTEND_VERSION ?? '',
    repositories: {
      component: (getConfig().WIKI ?? '').concat('/functions/common.'),
      page: (getConfig().WIKI ?? '').concat('/functions/pages.'),
      verb: (getConfig().WIKI ?? '').concat('/variables/services.')
    },
    translateToEN: (key: string) => en('pages.'.concat(key)),
    userAuthenticated: true, //isAuth,
    userID: lmsUserID ?? '-1',
    userLocation: new URL(window.location.href).pathname.toString(), //location.pathname,
    xAPI: {
      auth: {
        username:getConfig().LRS_AUTH_USERNAME ?? '',
        password: getConfig().LRS_AUTH_PASSWORD ?? ''
      },
      endpoint: getConfig().LRS ?? '',
      version: '1.0.3'
    }
  })

  useEffect(() => {
    isAuth &&
      getUser()
        .then((user) => {
          setLmsUserID(user.lms_user_id.toString())
        })
        .catch((error: string) => {
          log.error(error)
          return undefined
        })
        
    setXAPI(xAPI)
  }, [getUser, isAuth, setXAPI, setLmsUserID])

  return { isXAPIConfigured: !!getXAPI() }
}