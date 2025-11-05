type StudentRating = {
  student_id: number
  topic_id: number
  rating_value: number
  rating_deviation: number
  timestamp: Date
}

type StudentRatingReturn = (userId: number, studentId: number) => Promise<StudentRating[]>

export default StudentRating
export type { StudentRatingReturn }
