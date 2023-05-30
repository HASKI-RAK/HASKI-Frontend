import { postContactForm, FormDataType, SnackbarContext } from '@services'
import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'

export type ContactHookProps = {
  setIsLoading: (isLoading: boolean) => void
}

export type ContactHookReturn = {
  onSubmitHandler: (postBody: FormDataType) => void
}

export const useContact = ({ setIsLoading }: ContactHookProps): ContactHookReturn => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const onSubmitHandler = useCallback(
    (postBody: FormDataType) => {
      setIsLoading(true)
      postContactForm(postBody)
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false)
            addSnackbar({
              message: t('pages.Contact.success'),
              severity: 'success'
            })
          } else {
            setIsLoading(false)
            addSnackbar({
              message: t('pages.Contact.error'),
              severity: 'error'
            })
          }
        })
        .catch((error) => {
          setIsLoading(false)
          addSnackbar({
            message: t('pages.Contact.error'),
            severity: 'error'
          })
        })
    },
    [t, addSnackbar, setIsLoading]
  )

  return {
    onSubmitHandler
  } as const
}
