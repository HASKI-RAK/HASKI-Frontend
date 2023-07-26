import { postContactForm, FormDataType, SnackbarContext } from '@services'
import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'

export type ContactHookProps = {
  setIsLoading: (isLoading: boolean) => void
}

export type ContactHookReturn = {
  onSubmitHandler: (postBody: FormDataType) => void
}
/**
 * Hook for the Contact logic. Handles reporttype, reporttopic and description state which sets the input for the textfields and
 * provides function to submit the form. Should usually override the submit function in the ContactForm.hooks
 *
 * @returns {ContactFormReturn} - Logic
 * @function onSubmitHandler - handles the submission of the values, that were inserted in the Contactform.
 * It posts the content thats supposed to be sent with the postBody with the postContactForm Function(can be found @services)
 * Upon recieving a response the submission was either successful, successful but still failed oder threw an error.
 * Supports usage of the Snackbar.
 *
 * The postBody is the object that will be sent to the backend.
 */

export const useContact = ({ setIsLoading }: ContactHookProps): ContactHookReturn => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const onSubmitHandler = useCallback(
    (postBody: FormDataType) => {
      setIsLoading(true)
      postContactForm(postBody)
        .then((response) => {
          if (response.status === 201) {
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
            message: t('pages.Contact.error') + error,
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
