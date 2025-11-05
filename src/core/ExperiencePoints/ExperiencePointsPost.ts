type ExperiencePointsPostResponse = {
  total_xp: number
  gained_xp: number
  base_xp: number
  rating_points: number
  score_modifier: number
  attempt_xp: number
  success_modifier: number
  wait_bonus: number
  successful_attempts: number
  new_attempt: boolean
}

type ExperiencePointsPostData = {
  course_id: number
  learning_element_id: number
  topic_id: number
  user_lms_id: string
  classification: string
  start_time: number
}

type ExperiencePointsPostReturn = (
  studentId: number,
  data: ExperiencePointsPostData
) => Promise<ExperiencePointsPostResponse>

export type { ExperiencePointsPostData, ExperiencePointsPostResponse, ExperiencePointsPostReturn }
