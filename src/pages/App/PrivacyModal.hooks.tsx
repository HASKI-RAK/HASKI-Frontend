import { SnackbarContext } from '@services'
import { useContext, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
//cookie hier reinschmeißen
export type PrivacyModalHookProps = {
  setIsLoading: (isLoading: boolean) => void
}
export type PrivacyModalHookReturn = {
  readonly onAcceptHandler: () => void
}
export const usePrivacyModal = ({ setIsLoading }: PrivacyModalHookProps): PrivacyModalHookReturn => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const onAcceptHandler = () => {
    addSnackbar({
      message: t('pages.Contact.error'),
      severity: 'error'
    })
  }
  return {
    onAcceptHandler
  } as const
}
