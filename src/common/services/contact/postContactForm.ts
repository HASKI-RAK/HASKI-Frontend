export interface FormDataType {
  //muss mit backend variablen übereinstimmen
  report_type: string
  report_topic: string
  report_description: string
}

export type PostContactFormResponse = {
  status: number
  message: string
}
export type PostContactFormParams = {
  nonce?: string
  responseBody?: FormDataType
  userId?: any
}
/**
 * Send the input of the contact form to the backend.
 * @returns PostContactFormResponse
 */
export const postContactForm = async (responseBody?: FormDataType, userId?: any): Promise<PostContactFormResponse> => {
  //nur zum testen
  const user_id = userId
  const lms_user_id = userId
  return fetch(process.env.BACKEND + `/user/${user_id}/${lms_user_id}/contactform`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(responseBody),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return {
      status: response.status,
      message: response.statusText
    }
  })
}
