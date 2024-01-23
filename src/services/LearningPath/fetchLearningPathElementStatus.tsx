import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/*
  * fetchLearningPathElementStatus function.
  *
  * @param course_id - The course's id
  * @param studentId - The student's id
  *
  * @remarks
  * Fetches the status of all learning elements for a student for a course.
  * Throws an error if course_id or studentId are not provided.
  *
  * @returns - returns a promise with all learning element statuses
  * 
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
