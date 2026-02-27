type GroupLeaderboardEntry = {
  rank: number
  group_id: number
  member_count: number
  member_student_ids: number[]
  score: number
}

type GroupLeaderboardResponse = {
  total_participants: number
  leaderboard: GroupLeaderboardEntry[]
}

type GroupLeaderboardReturn = (student_id: number, timeStamp?: number) => Promise<GroupLeaderboardResponse>

export type { GroupLeaderboardEntry, GroupLeaderboardResponse, GroupLeaderboardReturn }
