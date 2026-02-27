import { League } from '@core'

type BadgeLeaderboardEntry = {
  rank: number
  student_id: number
  badge_count: number
}

type BadgeLeaderboardResponse = {
  league: League
  total_participants: number
  leaderboard: BadgeLeaderboardEntry[]
}

type BadgeLeaderboardReturn = (studentId: number) => Promise<BadgeLeaderboardResponse>

export type { BadgeLeaderboardEntry, BadgeLeaderboardResponse, BadgeLeaderboardReturn }
