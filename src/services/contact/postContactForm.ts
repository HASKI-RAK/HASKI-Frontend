import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'

/**
 * The data that is sent to the backend.
 * The properties have to be named like the backend expects them.
 */
export interface FormDataType {
  report_type: string
  report_topic: string
  report_description: string
}

/**
 * Send the input of the contact form to the backend with the userid.
 * @returns Either no response or an error
 */
export const postContactForm = async (
  responseBody?: FormDataType,
  userId?: number,
  lmsUserId?: number
): Promise<Response> => {
  return fetchData<Response>(getConfig().BACKEND + `/user/${userId}/${lmsUserId}/contactform`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(responseBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
