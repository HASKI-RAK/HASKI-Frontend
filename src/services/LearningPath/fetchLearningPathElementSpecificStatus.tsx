import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'

/*
 * fetchLearningPathElementSpecificStatus function.
 *
 * @param courseId - course id
 * @param studentId - student id
 * @param learningElementId - learning element id
 *
 *@remarks
 * Fetches the status of a specific learning element for a student for a course.
 * Throws an error if courseId, studentId or learningElementId are not provided
 *
 * @returns - returns a promise with the status of the learning element
 *
 * @category Services
 */

export const fetchLearningPathElementSpecificStatus: LearningPathElementStatusReturn = async (
  courseId,
  studentId,
  learningElementId
) => {
  if (!courseId || !studentId || !learningElementId) {
    throw new Error('courseId, studentId and learningElementId are required')
  }
  return fetchData<LearningPathElementStatus[]>(
    getConfig().BACKEND +
      `/lms/course/${courseId}/student/${studentId}/learningElementId/${learningElementId}/activitystatus`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
