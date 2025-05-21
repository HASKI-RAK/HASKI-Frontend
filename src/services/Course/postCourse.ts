import { Course } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'


type PostCourseProps = {
  outputJson: string
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

export const postCourse = async ({ outputJson }: PostCourseProps): Promise<Course> => {
  return fetchData<Course>(getConfig().BACKEND + `/lms/course`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })
}
