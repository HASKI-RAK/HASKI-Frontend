import { FavoriteElement, FavoriteResponse } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * fetchFavorite
 *
 * @remarks
 * Gets the learningElements for a user
 * that have an is_favorite = true status.
 *
 * @param student_id - The user's ID for which is being fetched
 * @returns a Promise resolving to an array of learningElement IDs
 */

export const fetchFavorite = async (student_id?: number): Promise<FavoriteElement> => {
  const response = await fetchData<FavoriteResponse>(getConfig().BACKEND + `/lms/student/${student_id}/favorites`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.favorites
}
