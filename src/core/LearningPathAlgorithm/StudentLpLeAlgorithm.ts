type StudentLpLeAlgorithmReturn = (userId?: number, topicId?: number) => Promise<StudentLpLeAlgorithm>

type StudentLpLeAlgorithm = {
  short_name: string
  student_id: number
  topic_id: number
}

export default StudentLpLeAlgorithm
export type { StudentLpLeAlgorithm, StudentLpLeAlgorithmReturn }
