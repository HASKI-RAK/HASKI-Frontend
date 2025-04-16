import RemoteLearningElement from '../RemoteLearningElement/RemoteLearningElement'

type RemoteTopicsReturn = (courseId?: string) => Promise<RemoteTopics[]>

type RemoteTopics = {
  topic_lms_id: number
  topic_lms_name: string
  lms_learning_elements: RemoteLearningElement[]
}

export default RemoteTopics
export type { RemoteTopicsReturn }
