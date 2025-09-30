type ExperiencePoints = {
  student_id: number
  experience_points: number
}

type ExperiencePointsReturn = (studentId: number) => Promise<ExperiencePoints>

export type { ExperiencePoints, ExperiencePointsReturn }
