import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'
import { FavoriteElement } from '@core'

/*
 * fetchFavorite
 *
 * @remarks
 * Posts a learningElement with the favorite status
 *
 * @param favorite - The favorite status to set
 * @param userId - The user's ID
 * @param learningElementId - The learning element's ID
 * @returns A Promise resolving to the fetch Response
 */

export const fetchFavorite = async (student_id?: number): Promise<FavoriteElement> => {
  return fetchData<FavoriteElement>(getConfig().BACKEND + `/lms/student/${student_id}/favorites`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
