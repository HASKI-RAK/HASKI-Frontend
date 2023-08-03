import { getData } from '../RequestResponse'
export interface FormDataType {
  //muss mit backend variablen übereinstimmen
  report_type: string
  report_topic: string
  report_description: string
}

export type PostContactFormParams = {
  responseBody?: FormDataType
  userId?: any
  lmsUserId?: any
}
/**
 * Send the input of the contact form to the backend with the userid.
 * @returns either no response or an error
 */
export const postContactForm = async (
  responseBody?: FormDataType,
  userId?: any,
  lmsUserId?: any
): Promise<Response> => {
  const response = await fetch(process.env.BACKEND + `/user/${userId}/${lmsUserId}/contactform`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(responseBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return getData<Response>(response)
}
