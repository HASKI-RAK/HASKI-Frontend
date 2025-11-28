import { LearningPathLearningElementAlgorithm } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * @prop userId - user id
 * @prop lmsUserId - lms user id
 * @prop topicId - topic id
 * @prop outputJson - output json
 * @interface
 */
type PostLearningPathAlgorithmProps = {
  userId: number
  lmsUserId: number
  topicId: number
  outputJson: string
}

/**
 * postLearningPathAlgorithm function.
 *
 * @param userId - user id
 * @param lmsUserId - lms user id
 * @param topicId - topic id
 * @param outputJson - output json
 *
 * @remarks
 * Posts the learning path algorithm for a specific topic.
 * It does so for the whole topic, if the user is a course creator, otherwise just for themselves.
 *
 * @returns - returns a promise with the changed data entry.
 *
 * @category Services
 */

export const postLearningPathAlgorithm = async ({
  userId,
  lmsUserId,
  topicId,
  outputJson
}: PostLearningPathAlgorithmProps): Promise<LearningPathLearningElementAlgorithm> => {
  return fetchData<LearningPathLearningElementAlgorithm>(
    `${getConfig().BACKEND}/user/${userId}/${lmsUserId}/topic/${topicId}/teacherAlgorithm`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: outputJson
    }
  )
}
