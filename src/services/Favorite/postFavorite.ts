import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * postFavorite
 *
 * @remarks
 * Posts a learningElement with the favorite status
 *
 * @param favorite - The favorite status to set
 * @param userId - The user's ID
 * @param learningElementId - The learning element's ID
 * @returns A Promise resolving to the fetch Response
 */

export const postFavorite = async (
  is_favorite?: boolean,
  userId?: number,
  learningElementId?: number
): Promise<Response> => {
  return fetchData<Response>(getConfig().BACKEND + `/user/${userId}/learningElement/${learningElementId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(is_favorite)
  })
}
