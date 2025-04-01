import { DefaultLearningPath } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * @props studentId - student id
 * @props outputJson - output json
 * @interface
 */
type PostDefaultLearningPathProps = {
  userId: number
  userLmsId: number
  outputJson: string
}

/*
 * postDefaultLearningPath function.
 *
 * @param userId - user id
 * @param userLmsId - user lms id
 * @param outputJson - output json
 *
 * @remarks
 * Posts the default learning path for a university, will affect all students of this university
 * Throws an error if userId, userLmsId or outputJson are not provided.
 *
 * @returns - returns a promise with the DefaultLearningPath.
 *
 * @category Services
 */

export const postDefaultLearningPath = async ({
  userId,
  userLmsId,
  outputJson
}: PostDefaultLearningPathProps): Promise<DefaultLearningPath> => {
  return fetchData<DefaultLearningPath>(`${getConfig().BACKEND}/user/${userId}/${userLmsId}/defaultLearningPath`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })
}
