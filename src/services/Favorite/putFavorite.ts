import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'
/*
 * putFavorite
 *
 *
 *
 * @remarks
 * Puts favorite
 *
 * @returns - returns a promise with the Response
 */

export const putFavorite = async (
  favorite?: boolean,
  userId?: number,
  learningElementId?: number
): Promise<Response> => {
  return fetchData<Response>(getConfig().BACKEND + `/user/${userId}/learningElement/${learningElementId}/logbuffer`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(favorite)
  })
}
