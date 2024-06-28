import log from 'loglevel'
import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FormDataType, SnackbarContext, postContactForm } from '@services'
import { usePersistedStore } from '@store'

export type ContactHookProps = {
  setIsLoading: (isLoading: boolean) => void
}

export type ContactHookReturn = {
  /** handles the submission of the values, that were inserted in the Contactform. */
  onSubmitHandler: (postBody: FormDataType) => void
}
/**
 * Hook for the Contact logic. Handles reporttype, reporttopic and description state which sets the input for the textfields and
 * provides function to submit the form. Should usually override the submit function in the ContactForm.hooks
 *
 * @param props - {@link ContactHookProps}
 * @returns - {@link ContactHookReturn.onSubmitHandler} - Handles the submission of the values, that were inserted in the Contactform.
 * @remarks
 * Prior to sending with the postContactForm function the userid is getting fetched so that it can be sent with the postbody to the backend.
 * It posts the content thats supposed to be sent with the {@link FormDataType | postBody} with the postContactForm Function (can be found {@link postContactForm | here})
 * Upon recieving a response the submission was either successful, successful but still failed oder threw an error.
 * Supports usage of the Snackbar.
 *
 * The {@link FormDataType | postBody} is the object that will be sent to the backend.
 */

export const useContact = ({ setIsLoading }: ContactHookProps): ContactHookReturn => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const onSubmitHandler = useCallback(
    (postBody: FormDataType) => {
      setIsLoading(true)
      getUser()
        .then((user) => {
          postContactForm(postBody, user.settings.user_id, user.lms_user_id)
            .then(() => {
              setIsLoading(false)
              addSnackbar({
                message: t('pages.contact.success'),
                severity: 'success'
              })
            })
            .catch((error) => {
              setIsLoading(false)
              addSnackbar({
                message: t('pages.contact.error'),
                severity: 'error',
                autoHideDuration: 3000
              })
              log.error(t('pages.contact.error') + ' ' + error)
            })
        })
        .catch((error) => {
          setIsLoading(false)
          addSnackbar({
            message: t('pages.contact.error'),
            severity: 'error',
            autoHideDuration: 3000
          })
          log.error(t('pages.contact.error') + ' ' + error)
        })
    },
    [t, addSnackbar, setIsLoading]
  )

  return {
    onSubmitHandler
  } as const
}
