import { LearningElementRatingResponse, LearningElementRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

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
