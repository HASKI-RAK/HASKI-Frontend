type CourseReturn = (userId?: number, lmsUserId?: number, studentId?: number) => Promise<CourseResponse>

type CourseResponse = {
  courses: Course[]
}

type Course = {
  id: number
  lms_id: number
  name: string
  university: string
  created_at: string
  created_by: string
  last_updated: string
}

export default Course
export type { CourseReturn, CourseResponse }
