import { PostContactFormInputs, FormDataType } from '@services'
export type ContactHookReturn = {
  onSubmitHandler: () => void
}
export const onSubmitHandler = () => {
  const postBody: FormDataType = { reportType: 'tes', reportTopic: 'Test', description: '0' }

  PostContactFormInputs(postBody).then((response) => {
    if (response.status === 200) {
      console.log('Success')
    }

    //TODO catch and🍿 snackbar
  })
}
export const useContact = (): ContactHookReturn => {
  onSubmitHandler()

  return {
    onSubmitHandler
  } as const
}
