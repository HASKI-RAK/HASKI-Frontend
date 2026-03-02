import { GamificationSettings, GamificationSettingsPostResponse, GamificationSettingsPostReturn } from "@core"
import { getConfig } from "@shared"
import { fetchData } from "../RequestResponse"


export const postGamificationSettings: GamificationSettingsPostReturn = async (
  studentId: number,
  outputData: GamificationSettings
): Promise<GamificationSettingsPostResponse> => {
  return fetchData<GamificationSettingsPostResponse>(`${getConfig().BACKEND}/student/${studentId}/gamificationSettings`, {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(outputData)
  })
}