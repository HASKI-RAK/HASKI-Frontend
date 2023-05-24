import { postContactForm, FormDataType } from '@services'
export type ContactHookReturn = {
  onSubmitHandler: () => void
}
/**
 * Hook for the Contact page logic which handles the sending of the responsebody to the backend.
 * @returns {ContactFormHookReturn} - The form logic.
 * @function onSubmitHandler - Function for collecting the postBody from the responsebody and sending it to the backend.
 * PostContactFormInputs is a function from the services folder which sends the postBody to the backend.
 */
export const onSubmitHandler = () => {
  const postBody: FormDataType = { reportType: 'tes', reportTopic: 'Test', description: '0' }

  postContactForm(postBody).then((response) => {
    if (response.status === 200) {
      console.log('Success')
    }
  })
}
export const useContact = (): ContactHookReturn => {
  onSubmitHandler()

  return {
    onSubmitHandler
  } as const
}
