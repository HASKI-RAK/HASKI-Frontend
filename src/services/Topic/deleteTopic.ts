import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

type DeleteTopicResponse = {
  message: string
}

/*
 * deleteTopic function.
 *
 * @returns - message: string
 *
 * @category Services
 */

export const deleteTopic = async (topicId: number, lmsTopicId: number): Promise<DeleteTopicResponse> => {
  return fetchData<DeleteTopicResponse>(getConfig().BACKEND + `/lms/topic/${topicId}/${lmsTopicId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
