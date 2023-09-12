import { SnackbarContext } from '@services'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useCookies } from 'react-cookie'
//cookie hier reinschmeißen
export type PrivacyModalHookProps = {
  setIsLoading: (isLoading: boolean) => void
}
export type PrivacyModalHookReturn = {
  readonly onAcceptHandler: (isAccepted: boolean) => void
}
export const usePrivacyModal = ({ setIsLoading }: PrivacyModalHookProps): PrivacyModalHookReturn => {
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
    } else if (!isAccepted) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setCookie('privacy_accept_token', false, { path: '/', expires: tomorrow })
      addSnackbar({
        message: t('components.PrivacyModal.declined'),
        severity: 'success'
      })
    } else {
      addSnackbar({
        message: t('pages.Contact.error'),
        severity: 'error'
      })
    }
  }
  return {
    onAcceptHandler
  } as const
}
