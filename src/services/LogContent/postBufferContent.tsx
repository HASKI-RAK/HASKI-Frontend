import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * @props timestamp - time of the error message
 * @props content - error message
 * @interface
 */

export interface bufferContent {
  timestamp: string
  content: string
}

/*
 * postBufferContent 
 *
 * @props timestamp - time of the error message
 * @props content - error message
 * @props userId - user id
 *
 * @remarks
 * Posts the buffer content.
 *
 * @returns - returns a promise with the Response
 */

export const postBufferContent = async (bufferBody?: bufferContent, userId?: number): Promise<Response> => {
  return fetchData<Response>(getConfig().BACKEND + `/user/${userId}/logbuffer`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bufferBody)
  })
}
