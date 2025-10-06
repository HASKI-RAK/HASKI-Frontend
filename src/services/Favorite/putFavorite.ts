import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * putFavorite
 *
 * @remarks
 * Puts the is_favorite status of a learningElement for a user.
 *
 * @param is_favorite - The favorite status to set
 * @param student_id - The user's ID
 * @param learning_element_id - The learning element's ID
 * @returns A Promise resolving to the fetch Response
 */

export const putFavorite = async (
  is_favorite?: boolean,
  student_id?: number,
  learning_element_id?: number
): Promise<Response> => {
  return fetchData<Response>(
    getConfig().BACKEND + `/lms/student/${student_id}/learningElement/${learning_element_id}`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ is_favorite })
    }
  )
}
