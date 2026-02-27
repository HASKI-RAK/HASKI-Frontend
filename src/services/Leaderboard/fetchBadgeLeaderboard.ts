import { BadgeLeaderboardResponse, BadgeLeaderboardReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchBadgeLeaderboard: BadgeLeaderboardReturn = async (
  studentId: number
): Promise<BadgeLeaderboardResponse> => {
  return fetchData<BadgeLeaderboardResponse>(`${getConfig().BACKEND}/student/${studentId}/badge_leaderboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}
