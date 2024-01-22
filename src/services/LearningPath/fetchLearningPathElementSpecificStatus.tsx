import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/*
  * Fetches the status of a specific learning element for a student for a course
  * @param {string} course_id - course id
  * @param {string} studentId - student id
  * @param {string} learningElementId - learning element id
  * @returns {Promise<LearningPathElementStatus[]>} - returns a promise with the status
  * of the learning element
  * @throws {Error} - throws an error if course_id, studentId or learningElementId are not provided
  * @category Services
 */

export const fetchLearningPathElementSpecificStatus: LearningPathElementStatusReturn = async (
  course_id,
  studentId,
  learningElementId
) => {
  if (!course_id || !studentId || !learningElementId) {
    throw new Error('course_id, studentId and learningElementId are required')
  }
  return fetchData<LearningPathElementStatus[]>(
    getConfig().BACKEND +
      `/lms/course/${course_id}/student/${studentId}/learningElementId/${learningElementId}/activitystatus`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
