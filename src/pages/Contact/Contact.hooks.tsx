import { postContactForm, FormDataType, SnackbarContext } from '@services'
import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'

export type ContactHookProps = {
  setIsLoading: (isLoading: boolean) => void
}

export type ContactHookReturn = {
  onSubmitHandler: () => void
}

export const useContact = ({ setIsLoading }: ContactHookProps): ContactHookReturn => {

  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const onSubmitHandler = useCallback(() => {
    setIsLoading(true)
    const postBody: FormDataType = { reportType: 'tes', reportTopic: 'Test', description: '0' }

    postContactForm(postBody)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false)
          addSnackbar({
            message: t('pages.Contact.success'),
            severity: 'success'
          })
        }
      })
      .catch((error) => {
        if (error) {
          setIsLoading(false)
          addSnackbar({
            message: t('pages.Contact.error'),
            severity: 'error'
          })
        }
      })
  }, [t])

  return {
    onSubmitHandler
  } as const
}
