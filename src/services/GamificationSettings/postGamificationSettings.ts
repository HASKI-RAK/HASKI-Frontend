import { GamificationSettings, GamificationSettingsPostReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const postGamificationSettings: GamificationSettingsPostReturn = async (
  studentId: number,
  outputData: GamificationSettings
): Promise<GamificationSettings> => {
  return fetchData<GamificationSettings>(`${getConfig().BACKEND}/student/${studentId}/gamificationSettings`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(outputData)
  })
}
