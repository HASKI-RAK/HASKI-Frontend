import { LearningElementRatingResponse, LearningElementRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * Sends a GET request to fetch all learning element ratings corresponding to a specific learning element and topic from the backend.
 *
 * This service function sends an HTTP request to retrieve all learning element ratings associated
 * with a specific learning element ID and topic ID from the database using the backend API.
 * Returns an empty array if no ratings are present.
 *
 * @param learningElementId - The id of the learning element.
 * @param topicId - The id of the topic.
 *
 * @category Services
 *
 * @throws If either learningElementId or topicId is not provided.
 *
 * @example
 * ```ts
 * const learningElementRatings = await fetchLearningElementRatingsOnTopic(learningElementId, topicId)
 * ```
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
