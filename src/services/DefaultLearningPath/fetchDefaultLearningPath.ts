import { DefaultLearningPathResponse } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * fetchDefaultLearningPath function.
 *
 * @param university - The user's university
 *
 * @remarks
 * Fetches the disabled classifications for the default learning path for the given user.
 *
 * @returns - A string list of classifications that are disabled.
 *
 * @category Services
 */

export const fetchDefaultLearningPath = async (
  userId: number,
  lmsUserId: number
): Promise<DefaultLearningPathResponse[]> => {
  return fetchData<DefaultLearningPathResponse[]>(
    `${getConfig().BACKEND}/user/${userId}/${lmsUserId}/defaultLearningPath`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
