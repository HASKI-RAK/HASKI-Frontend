type Leaderboard = {
  [key: string]: number
}

type LeaderboardReturn = (course_id: string, student_id: string) => Promise<Leaderboard>

export default Leaderboard
export type { LeaderboardReturn }
