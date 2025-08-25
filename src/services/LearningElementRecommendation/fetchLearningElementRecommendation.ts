import { LearningElementRecommendationResponse, LearningElementRecommendationReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchLearningElementRecommendation: LearningElementRecommendationReturn = async (
  userId: number,
  courseId: number,
  topicId: number
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
