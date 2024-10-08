import { ListK, Topic } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * @props studentId - student id
 * @props outputJson - output json
 * @interface
 */
type PostTopicProps = {
  courseId: string
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

export const postTopic = async ({ courseId, outputJson }: PostTopicProps): Promise<Topic> => {
  return fetchData<Topic>(`${getConfig().BACKEND}/v2/lms/course/${courseId}/topic`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })
}
