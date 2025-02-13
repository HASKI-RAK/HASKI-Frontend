import { Topic } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * @props studentId - student id
 * @props outputJson - output json
 * @interface
 */
type PostLearningPathAlgorithmProps = {
  userId: number
  lmsUserId: number
  topicId: number
  outputJson: string
}

/*
 * postLearningPathAlgorithm function.
 *
 * @param studentId - student id
 * @param outputJson - output json
 *
 * @remarks
 * Posts the ListK for a student
 * Throws an error if studentId or outputJson are not provided.
 *
 * @returns - returns a promise with the ListK.
 *
 * @category Services
 */

export const postLearningPathAlgorithm = async ({
  userId,
  lmsUserId,
  topicId,
  outputJson
}: PostLearningPathAlgorithmProps): Promise<Topic> => {
  return fetchData<Topic>(`${getConfig().BACKEND}/user/${userId}/${lmsUserId}/topic/${topicId}/teacherAlgorithm`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })
}
