import { postContactFormInputs, FormDataType } from '@services'
export type ContactHookReturn = {
  onSubmitHandler: () => void
}

export const useContact = (): ContactHookReturn => {
  const onSubmitHandler = () => {
    const potBody: FormDataType = { reporttype: 'tes', reporttopic: 'Test', description: '0' }

    postContactFormInputs(potBody).then((response) => {
      if (response.status === 200) {
        console.log('Success')
      }

      //TODO catch and🍿 snackbar
    })
  }

  return {
    onSubmitHandler
  } as const
}
