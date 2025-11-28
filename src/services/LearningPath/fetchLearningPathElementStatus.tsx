import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * fetchLearningPathElementStatus function.
 *
 * @param courseId - The course's id
 * @param lmsUserId - The lmsUserId
 *
 * @remarks
 * Fetches the status of all learning elements for a student for a course.
 * Throws an error if courseId or lmsUserId are not provided.
 *
 * @returns - returns a promise with all learning element statuses
 *
 * @category Services
 */

export const fetchLearningPathElementStatus: LearningPathElementStatusReturn = async (courseId, lmsUserId) => {
  return fetchData<LearningPathElementStatus[]>(
    getConfig().BACKEND + `/lms/course/${courseId}/student/${lmsUserId}/activitystatus`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
