import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

export const fetchLearningPathElementSpecificStatus: LearningPathElementStatusReturn = async (
  course_id,
  studentId,
  learningElementId
) => {
  if (!course_id) {
    throw new Error('course_id are required')
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
