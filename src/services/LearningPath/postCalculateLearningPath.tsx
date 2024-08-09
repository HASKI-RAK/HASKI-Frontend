import { LearningPathBasedOn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * @props studentId - student id
 * @props outputJson - output json
 * @interface
 */
type PostCalculateLearningPathProps = {
  userId: number
  courseId: string
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

export const postCalculateLearningPath = async ({
  userId,
  courseId,
  topicId,
  outputJson
}: PostCalculateLearningPathProps): Promise<LearningPathBasedOn> => {
  return fetchData<LearningPathBasedOn>(
    `${getConfig().BACKEND}/v2/user/${userId}/course/${courseId}/topic/${topicId}/learningPath`,
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
