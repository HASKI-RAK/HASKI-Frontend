import { Topic } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * @props courseId - course id
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
 * @param courseId - course id
 * @param outputJson - output json
 *
 * @remarks
 * Posts a topic for a course.
 * Throws an error if courseId is not provided.
 *
 * @returns - returns a promise with the Topic.
 *
 * @category Services
 */

export const postTopic = async ({ courseId, outputJson }: PostTopicProps): Promise<Topic> => {
  return fetchData<Topic>(`${getConfig().BACKEND}/lms/course/${courseId}/topic`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })
}
