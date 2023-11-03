import { SnackbarContext } from '@services'
import { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CookiesProvider, useCookies } from 'react-cookie'

/**
 * @prop privacyPolicyCookie - The currently set cookie
 * @prop handleAccept - sets the cookie and displays a Snackbar
 * @category Hooks
 * @interface
 */

export type PrivacyModalHookReturn = {
  readonly privacyPolicyCookie: CookiesProvider
  readonly handleAccept: (isAccepted: boolean) => void
}

/**
 * usePrivacyModal hook.
 * @remarks
 * Hook for the PrivacyModal logic.
 * Provides function for setting the cookie and a prop that returns the cookie.
 *
 * @returns - cookie and handleAccept function.
 *
 * @category Hooks
 */

export const usePrivacyModal = (): PrivacyModalHookReturn => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const [cookies, setCookie] = useCookies(['privacy_accept_token'])
  const privacyPolicyCookie = cookies['privacy_accept_token']

  //**Logic **//
  const handleAccept = useCallback(
    (isAccepted: boolean) => {
      if (isAccepted) {
        setCookie('privacy_accept_token', true, { path: '/' })
        addSnackbar({
          message: t('components.PrivacyModal.accepted'),
          severity: 'success'
        })
      } else {
        //if decline should set a cookie with expiration uncomment
        //const tomorrow = new Date()
        //tomorrow.setDate(tomorrow.getDate() + 1)
        //setCookie('privacy_accept_token', false, { path: '/', expires: tomorrow })
        addSnackbar({
          message: t('components.PrivacyModal.declined'),
          severity: 'warning'
        })
      }
    },
    [addSnackbar, setCookie]
  )
  return useMemo(
    () => ({
      privacyPolicyCookie,
      handleAccept
    }),
    [privacyPolicyCookie, handleAccept]
  )
}
