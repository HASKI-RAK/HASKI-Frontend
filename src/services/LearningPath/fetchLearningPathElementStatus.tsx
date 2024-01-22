import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/*
  * Fetches the status of all learning elements for a student for a course
  * @param {string} course_id - course id
  * @param {string} studentId - student id
  * @returns {Promise<LearningPathElementStatus[]>} - returns a promise with all
  * learning element statuses
  * @throws {Error} - throws an error if course_id or studentId are not provided
  * @category Services
 */

export const fetchLearningPathElementStatus: LearningPathElementStatusReturn = async (course_id, studentId) => {
  if (!course_id || !studentId) {
    throw new Error('course_id and student_id are required')
  }
  return fetchData<LearningPathElementStatus[]>(
    getConfig().BACKEND + `/lms/course/${course_id}/student/${studentId}/activitystatus`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
