import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setupXAPI, XAPI } from 'react-xapi-wrapper'
import log from 'loglevel'
import { AuthContext } from '@services'
import { getConfig } from '@shared'
import { usePersistedStore } from '@store'

/**
 * @prop xAPI - The xAPI object.
 * @category Hooks
 * @interface
 */
type AppHookReturn = {
  readonly xAPI: XAPI | null
}

/**
 * useApp hook.
 *
 * @remarks
 * Hook for the App logic.
 * Provides the xAPI object to send statements to the LRS.
 *
 * @returns - Logic to send xAPI statements to the LRS.
 *
 * @category Hooks
 */
export const useApp = (): AppHookReturn => {
  // States.
  const [lmsUserID, setLmsUserID] = useState<string | undefined>(undefined)
  const [xAPI, setXAPI] = useState<XAPI | null>(null)

  // Get the user from the store.
  const getUser = usePersistedStore((state) => state.getUser)

  // Translate.
  const { t, i18n } = useTranslation()

  // Current language.
  const currentLanguage = i18n.language

  // Get the authentication context.
  const { isAuth } = useContext(AuthContext)

  // Get the configuration.
  const config = useMemo(() => getConfig(), [])

  useEffect(() => {
    if (!isAuth) {
      setLmsUserID(undefined)
      setXAPI(null)
      return
    }

    if (!lmsUserID) {
      // Set the current user.
      getUser()
        .then((user) => setLmsUserID(String(user.lms_user_id)))
        .catch((error) => log.error(t('error.getUser') + ' ' + error))
      return
    }

    // Setup the xAPI object.
    setXAPI(
      setupXAPI({
        currentLanguage: currentLanguage,
        onError: (error: string) => log.error(t('error.sendStatement') + ' ' + error),
        projectURL: config.FRONTEND_GITHUB ?? '',
        projectVersion: config.FRONTEND_VERSION ?? '',
        repositories: {
          component: `${config.WIKI ?? ''}/functions/common.`,
          page: `${config.WIKI ?? ''}/functions/pages.`,
          verb: `${config.WIKI ?? ''}/variables/services.`
        },
        userID: lmsUserID,
        xAPI: {
          auth: {
            username: config.LRS_AUTH_USERNAME ?? '',
            password: config.LRS_AUTH_PASSWORD ?? ''
          },
          endpoint: config.LRS ?? '',
          version: '1.0.3'
        }
      })
    )
  }, [isAuth, getUser, lmsUserID, currentLanguage, config])

  return useMemo(() => ({ xAPI }), [xAPI])
}
