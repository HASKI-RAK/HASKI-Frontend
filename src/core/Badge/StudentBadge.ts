type StudentBadge = {
  id: number
  badge_id: number
  student_id: number
}

type StudentBadgeResponse = StudentBadge[]

type StudentBadgeReturn = (studentId: string) => Promise<StudentBadgeResponse>

type StudentBadgePostInput = {
  course_id: number
  topic_id: number
  lms_user_id: string
  timestamp: number
  active: boolean
  classification: string
}

type StudentBadgePostReturn = (studentId: number, data: StudentBadgePostInput) => Promise<StudentBadgeResponse>

export default StudentBadge
export type { StudentBadgePostInput, StudentBadgePostReturn, StudentBadgeResponse, StudentBadgeReturn }
