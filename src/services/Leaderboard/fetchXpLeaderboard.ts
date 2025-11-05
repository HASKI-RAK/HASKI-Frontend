import { ExPointLeaderboardResponse, ExPointLeaderboardReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchXpLeaderboard: ExPointLeaderboardReturn = async (
  student_id: number
): Promise<ExPointLeaderboardResponse> => {
  return fetchData<ExPointLeaderboardResponse>(`${getConfig().BACKEND}/student/${student_id}/leaderboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}
