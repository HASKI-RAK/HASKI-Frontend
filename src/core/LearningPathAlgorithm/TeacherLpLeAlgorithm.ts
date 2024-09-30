type TeacherLpLeAlgorithmReturn = (topicId?: number) => Promise<TeacherLpLeAlgorithm>

type TeacherLpLeAlgorithm = {
  algorithm_id: number
  short_name: string
  topic_id: number
}

export default TeacherLpLeAlgorithm
export type { TeacherLpLeAlgorithmReturn, TeacherLpLeAlgorithm }
