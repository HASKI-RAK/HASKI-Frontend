type TeacherLpLeAlgorithmReturn = (userId?: number, topicId?: number) => Promise<TeacherLpLeAlgorithmResponse>

type TeacherLpLeAlgorithmResponse = {
  algorithms: TeacherLpLeAlgorithm[]
}

type TeacherLpLeAlgorithm = {
  algorithm_id: number
  short_name: string
  topic_id: number
}

export default TeacherLpLeAlgorithm
export type { TeacherLpLeAlgorithmReturn, TeacherLpLeAlgorithmResponse }
