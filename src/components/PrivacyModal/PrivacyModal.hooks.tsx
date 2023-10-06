import { SnackbarContext } from '@services'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useCookies } from 'react-cookie'

export type PrivacyModalHookReturn = {
  readonly privacyPolicyCookieSet: boolean
  readonly onAcceptHandler: (isAccepted: boolean) => void
}
export const usePrivacyModal = (): PrivacyModalHookReturn => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const [cookies, setCookie] = useCookies(['privacy_accept_token'])
  const onAcceptHandler = (isAccepted: boolean) => {
    if (isAccepted) {
      setCookie('privacy_accept_token', true, { path: '/' })
      addSnackbar({
        message: t('components.PrivacyModal.accepted'),
        severity: 'success'
      })
    } else {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setCookie('privacy_accept_token', false, { path: '/', expires: tomorrow })
      addSnackbar({
        message: t('components.PrivacyModal.declined'),
        severity: 'success'
      })
    }
  }
  const privacyPolicyCookieSet = cookies['privacy_accept_token'] != null
  return {
    privacyPolicyCookieSet,
    onAcceptHandler
  } as const
}
