import type { ExperiencePointsPostData, ExperiencePointsPostReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const postExperiencePoints: ExperiencePointsPostReturn = async (
  studentId: number,
  data: ExperiencePointsPostData
) => {
  return await fetchData(`${getConfig().BACKEND}/student/${studentId}/xp`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}
