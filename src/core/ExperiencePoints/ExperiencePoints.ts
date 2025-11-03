type ExperiencePoints = {
  student_id: number
  experience_points: number
}

type ExPointLeaderboardResponse = ExperiencePoints[]

type ExPointLeaderboardReturn = (studentId: number) => Promise<ExPointLeaderboardResponse>

type ExperiencePointsReturn = (studentId: number) => Promise<ExperiencePoints>

export type { ExperiencePoints, ExperiencePointsReturn, ExPointLeaderboardResponse, ExPointLeaderboardReturn }
