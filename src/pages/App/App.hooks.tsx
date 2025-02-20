import { setupXAPI } from 'src/services/xAPI/library/setupXAPI'
import { useEffect } from 'react'
import { getConfig } from '@shared'
import { usePersistedStore } from '@store'

// import { AuthContext } from '@services'

type AppHookReturn = {
  isXAPIConfigured: boolean
}

export const useApp = (): AppHookReturn => {
  // xAPI functionality.
  const setXAPI = usePersistedStore().setXAPI
  const getXAPI = usePersistedStore().getXAPI

  // Current browser language.
  const currentLanguage = localStorage.getItem('i18nextLng') ?? ''

  // Create the xAPI object.
  const xAPI = setupXAPI({
    currentLanguage: currentLanguage,
    projectURL: getConfig().FRONTEND_GITHUB ?? '',
    projectVersion: getConfig().FRONTEND_VERSION ?? '',
    repositories: {
      component: (getConfig().WIKI ?? '').concat('/functions/common.'),
      page: (getConfig().WIKI ?? '').concat('/functions/pages.'),
      verb: (getConfig().WIKI ?? '').concat('/variables/services.')
    },
    xAPI: {
      auth: {
        username: getConfig().LRS_AUTH_USERNAME ?? '',
        password: getConfig().LRS_AUTH_PASSWORD ?? ''
      },
      endpoint: getConfig().LRS ?? '',
      version: '1.0.3'
    }
  })

  // Set the xAPI object in the slice.
  useEffect(() => {
    setXAPI(xAPI)
  }, [setXAPI]) //xAPI,

  return { isXAPIConfigured: !!getXAPI() }
}
