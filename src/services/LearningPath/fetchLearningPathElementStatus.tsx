import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

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
