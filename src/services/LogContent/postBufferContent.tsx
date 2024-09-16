import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * 
 */

//
export interface bufferContent {
    timestamp: string
    content: string
}



export const postBufferContent = async (
  bufferBody?: bufferContent, 
  userId?: number
): Promise<Response> => {
  return fetchData<Response>(getConfig().BACKEND +`/user/${userId}/logbuffer`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bufferBody)
  })
}
