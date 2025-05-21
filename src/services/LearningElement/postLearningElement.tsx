import { LearningElement } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'


/*
 * @props studentId - student id
 * @props outputJson - output json
 * @interface
 */
type PostLearningElementProps = {
  topicId: number
  outputJson: string
}

/*
 * postTopic function.
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

export const postLearningElement = async ({
  topicId,
  outputJson
}: PostLearningElementProps): Promise<LearningElement> => {
  return fetchData<LearningElement>(`${getConfig().BACKEND}/lms/topic/${topicId}/learningElement`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })
}
