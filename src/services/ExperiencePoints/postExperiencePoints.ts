import type { ExperiencePointsPostData, ExperiencePointsPostReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const postExperiencePoints: ExperiencePointsPostReturn = async (
  studentId: number,
  data: ExperiencePointsPostData
) => {
  return await fetchData(`${getConfig().BACKEND}/student/${studentId}/calculate_xp`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
