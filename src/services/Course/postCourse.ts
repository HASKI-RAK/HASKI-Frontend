import { Course } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * Parameters for {@link postCourse}.
 */
type PostCourseProps = {
  /**
   * JSON string representing the course to be created.
   */
  outputJson: string
}

/**
 * Sends a POST request to create a new course in the backend LMS.
 *
 * @remarks
 * This service function posts a course to the LMS using the backend API.
 * The `outputJson` parameter should be a JSON string representing the new course data.
 *
 * The request uses `credentials: include` to support authenticated endpoints.
 *
 * @param props - See {@link PostCourseProps}
 * @returns A promise resolving to the created {@link Course} object as returned by the backend.
 *
 * @throws {Error} If the backend returns an error or network request fails.
 *
 * @category Services
 *
 * @example
 * ```ts
 * const courseJson = JSON.stringify({ name: "New Course", description: "..." });
 * const createdCourse = await postCourse({ outputJson: courseJson });
 * ```
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
