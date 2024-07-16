import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * 
 */

//
export interface bufferContent {
    created_at: string
    logMessage: string
}



export const postBufferContent = async (bufferBody?: bufferContent): Promise<Response> => {
  return fetchData<Response>(`${getConfig().BACKEND}/logs`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bufferBody)
  })
}
