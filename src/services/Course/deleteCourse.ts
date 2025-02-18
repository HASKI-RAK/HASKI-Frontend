import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

type DeleteCourseResponse = {
  message: string
}

/*
 * postCourse function.
 *
 * @param outputJson - output json
 *
 * @returns - The created course
 *
 * @category Services
 */

export const deleteCourse = async (courseId: number, lmsCourseId: number): Promise<DeleteCourseResponse> => {
  return fetchData<DeleteCourseResponse>(getConfig().BACKEND + `/lms/course/${courseId}/${lmsCourseId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
