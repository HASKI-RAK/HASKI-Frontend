import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * @props timestamp - time of the error message
 * @props content - error message
 * @interface
 */

export type BufferContent = {
  timestamp: string
  content: [string,string][]
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

export const postBufferContent = async (bufferBody?: BufferContent, userId?: number): Promise<Response> => {
  return fetchData<Response>(getConfig().BACKEND + `/user/${userId}/logbuffer`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bufferBody)
  })
}
