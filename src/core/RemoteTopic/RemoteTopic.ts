import RemoteLearningElement from '../RemoteLearningElement/RemoteLearningElement'

type RemoteTopicReturn = (courseId?: string) => Promise<RemoteTopic[]>

type RemoteTopic = {
  topic_lms_id: number
  topic_lms_name: string
  lms_learning_elements: [RemoteLearningElement]
}

export default RemoteTopic
export type { RemoteTopicReturn }
