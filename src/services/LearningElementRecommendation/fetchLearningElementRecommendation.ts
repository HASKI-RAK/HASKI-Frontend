import { LearningElementRecommendationResponse, LearningElementRecommendationReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * Sends a GET request to fetch learning element recommendations from the backend.
 *
 * This service function sends an HTTP request to calculate and retrieve learning element recommendations using the backend API.
 * Returns an empty array if no recommendations are present.
 *
 * @param userId - The ID of the user.
 * @param courseId - The ID of the course.
 * @param topicId - The ID of the topic.
 *
 * @category Services
 *
 * @example
 * ```ts
 * const recommendations = await fetchLearningElementRecommendation(1, '1', '1')
 * ```
 */
export const fetchLearningElementRecommendation: LearningElementRecommendationReturn = async (
  userId: number,
  courseId: string,
  topicId: string
) => {
  return fetchData<LearningElementRecommendationResponse>(
    getConfig().BACKEND + `/user/${userId}/course/${courseId}/topic/${topicId}/recommendation`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
