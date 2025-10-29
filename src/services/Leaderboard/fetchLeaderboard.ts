import { Leaderboard, LeaderboardReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchLeaderboard: LeaderboardReturn = async (
    course_id: string,
    student_id: string
): Promise<Leaderboard> => {
  return fetchData<Leaderboard>(`${getConfig().BACKEND}/course/${course_id}/student/${student_id}/leaderboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}
