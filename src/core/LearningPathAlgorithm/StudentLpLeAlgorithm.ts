type StudentLpLeAlgorithmReturn = (userId?: number, topicId?: number) => Promise<StudentLpLeAlgorithm>


type StudentLpLeAlgorithm = {
  algorithm_id: number
  id: number
  short_name: string
  student_id: number
  topic_id: number
}

export default StudentLpLeAlgorithm
export type { StudentLpLeAlgorithmReturn, StudentLpLeAlgorithm }
