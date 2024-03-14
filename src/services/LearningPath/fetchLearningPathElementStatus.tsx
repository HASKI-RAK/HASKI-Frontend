import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * fetchLearningPathElementStatus function.
 *
 * @param courseId - The course's id
 * @param studentId - The student's id
 *
 * @remarks
 * Fetches the status of all learning elements for a student for a course.
 * Throws an error if courseId or studentId are not provided.
 *
 * @returns - returns a promise with all learning element statuses
 *
 * @category Services
 */

export const fetchLearningPathElementStatus: LearningPathElementStatusReturn = async (courseId, studentId) => {
  if (!courseId || !studentId) {
    throw new Error('courseId and student_id are required')
  }
  return fetchData<LearningPathElementStatus[]>(
    getConfig().BACKEND + `/lms/course/${courseId}/student/${studentId}/activitystatus`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
