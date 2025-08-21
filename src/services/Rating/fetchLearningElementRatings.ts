import { LearningElementRatingResponse, LearningElementRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * Sends a GET request to fetch all learning element ratings from the backend.
 *
 * This service function sends an HTTP request to retrieve all learning element ratings from the database using the backend API.
 * Returns an empty array if no ratings are present.
 *
 * @category Services
 *
 * @example
 * ```ts
 * const learningElementRatings = await fetchLearningElementRatings()
 * ```
 */
export const fetchLearningElementRatings: LearningElementRatingReturn = async () => {
  return fetchData<LearningElementRatingResponse>(getConfig().BACKEND + `/learningElement/rating`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
