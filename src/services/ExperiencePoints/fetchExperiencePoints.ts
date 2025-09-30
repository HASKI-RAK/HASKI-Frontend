import type { ExperiencePoints, ExperiencePointsReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * fetchExperiencePoints function.
 *
 * @param studentId - The student's id
 *
 * @remarks
 * Fetches the experience points for the given student
 *
 * @returns - object containing the student's id and experience points
 *
 * @category Services
 */

export const fetchExperiencePoints: ExperiencePointsReturn = async (studentId: number): Promise<ExperiencePoints> => {
  return fetchData<ExperiencePoints>(getConfig().BACKEND + `/student/${studentId}/xp`, {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
  })
}
