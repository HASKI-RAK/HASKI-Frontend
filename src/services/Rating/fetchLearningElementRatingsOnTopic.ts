import { LearningElementRatingResponse, LearningElementRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * # fetchLearningElementRatingsOnTopic service
 *
 * Fetches all learning element ratings associated with the learning element and topic from the backend.
 *
 * @param learningElementId - The id of a learning element
 * @param topicId - The id of a topic
 *
 * @remarks
 * Returns an empty array, if there are no ratings present.
 * Throws an error if either learningElementId or topicId is empty.
 */
export const fetchLearningElementRatingsOnTopic: LearningElementRatingReturn = async (
  learningElementId?: number,
  topicId?: number
) => {
  if (!learningElementId || !topicId) {
    throw new Error('learningElementId and topicId are required')
  }

  return fetchData<LearningElementRatingResponse>(
    getConfig().BACKEND + `/topic/${topicId}/learningElement/${learningElementId}/rating`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
