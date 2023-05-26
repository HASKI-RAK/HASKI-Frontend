import { postContactForm, FormDataType } from '@services'
export type ContactHookReturn = {
  onSubmitHandler: (content: FormDataType) => void
}
/**
 * Hook for the Contact page logic which handles the sending of the responsebody to the backend.
 * @returns {ContactFormHookReturn} - The form logic.
 * @function onSubmitHandler - Function for collecting the postBody from the responsebody and sending it to the backend.
 * PostContactFormInputs is a function from the services folder which sends the postBody to the backend.
 */
export const onSubmitHandler = (content: FormDataType) => {
  const postBody = content
  postContactForm(postBody)
    .then((response) => {
      if (response.status === 200) {
        console.log('ok')
      }
    })
    .catch((error) => {
      console.log('Error')
    })
}
export const useContact = (): ContactHookReturn => {
  return {
    onSubmitHandler
  } as const
}
