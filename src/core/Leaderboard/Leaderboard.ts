type Leaderboard = {
  [key: string]: number | string
}

type XpLeaderboardEntry = {
  rank: number
  student_id: number
  experience_points: number
}

type GenericLeaderboardEntry = {
  student_id: number
  metric: number
  rank: number
}

type GenericLeaderboard = GenericLeaderboardEntry[]

type League = 'first' | 'second' | 'third' | 'none'

type ExPointLeaderboardResponse = {
  total_participants: number
  league: League
  leaderboard: XpLeaderboardEntry[]
}

type ExPointLeaderboardReturn = (studentId: number) => Promise<ExPointLeaderboardResponse>

type LeaderboardReturn = (course_id: string, student_id: string) => Promise<Leaderboard>

export default Leaderboard
export type {
  ExPointLeaderboardResponse,
  ExPointLeaderboardReturn,
  GenericLeaderboard,
  GenericLeaderboardEntry,
  LeaderboardReturn,
  League,
  XpLeaderboardEntry
}
