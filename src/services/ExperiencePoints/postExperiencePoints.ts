import type { ExperiencePoints, ExperiencePointsReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const postExperiencePoints = async (studentId: number, data: ExperiencePoints) => {
  return await fetchData(`${getConfig().BACKEND}/student/${studentId}/xp`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}
