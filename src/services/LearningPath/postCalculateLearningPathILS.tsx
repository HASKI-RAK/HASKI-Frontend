import { LearningPathBasedOn } from '@core'
import { getConfig } from '@shared'

import learningPathBasedOn from '../../core/CalculateLearningPath/LearningPathBasedOn'
import { fetchData } from '../RequestResponse'

/*
  * postCalculateLearningPathILS function.
  *
  
  * @param userId - user id
  * @param lmsUserId - lms user id
  * @param studentId - student id
  *
  * @remarks
  * Sends a request to the backend to calculate the learning path for a student for a course.
  * Throws an error if userId or lmsUserId is not provided.
  *
  * @returns - returns a promise with the learning path
  *
  * @category Services
 */
export const postCalculateLearningPathILS = async (
  userId?: number,
  lmsUserId?: number
): Promise<LearningPathBasedOn[]> => {
  return fetchData<learningPathBasedOn[]>(getConfig().BACKEND + `/user/${userId}/${lmsUserId}/learningPath`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
}
