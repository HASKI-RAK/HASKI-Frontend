import { GamificationSettings, GamificationSettingsReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchGamificationSettings: GamificationSettingsReturn = async (
  studentId: number
): Promise<GamificationSettings> => {
  return fetchData<GamificationSettings>(`${getConfig().BACKEND}/student/${studentId}/gamificationSettings`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
