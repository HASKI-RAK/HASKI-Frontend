import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setupXAPI, XAPI } from 'react-xapi-wrapper'
import log from 'loglevel'
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

  // Current browser language.
  const currentLanguage = localStorage.getItem('i18nextLng') ?? ''

  // Get the user from the store.
  const getUser = usePersistedStore((state) => state.getUser)

  // Translate.
  const { t } = useTranslation()

  useEffect(() => {
    // Set the current user.
    getUser()
      .then((user) => {
        setLmsUserID(user.lms_user_id.toString())
      })
      .catch((error) => {
        log.error(t('error.getUser') + ' ' + error)
      })

    // Setup the xAPI object.
    setXAPI(
      setupXAPI({
        currentLanguage: currentLanguage,
        onError: (error: string) => log.error(t('error.sendStatement') + ' ' + error),
        projectURL: getConfig().FRONTEND_GITHUB ?? '',
        projectVersion: getConfig().FRONTEND_VERSION ?? '',
        repositories: {
          component: `${getConfig().WIKI ?? ''}/functions/common.`,
          page: `${getConfig().WIKI ?? ''}/functions/pages.`,
          verb: `${getConfig().WIKI ?? ''}/variables/services.`
        },
        userID: lmsUserID,
        xAPI: {
          auth: {
            username: getConfig().LRS_AUTH_USERNAME ?? '',
            password: getConfig().LRS_AUTH_PASSWORD ?? ''
          },
          endpoint: getConfig().LRS ?? '',
          version: '1.0.3'
        }
      })
    )
  }, [getUser, lmsUserID, setLmsUserID, currentLanguage, getConfig, setXAPI])

  return useMemo(() => ({ xAPI }), [xAPI])
}
