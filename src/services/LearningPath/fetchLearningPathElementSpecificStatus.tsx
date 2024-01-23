import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/*
  * fetchLearningPathElementSpecificStatus function.
  *
  * @param course_id - course id
  * @param studentId - student id
  * @param learningElementId - learning element id
  *
  *@remarks
  * Fetches the status of a specific learning element for a student for a course.
  * Throws an error if course_id, studentId or learningElementId are not provided
  *
  * @returns - returns a promise with the status of the learning element
  *
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
