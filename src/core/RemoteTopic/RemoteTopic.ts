import LearningPathTopic from '../LearningPathTopic/LearningPathTopic'
import RemoteLearningElement from '../RemoteLearningElement/RemoteLearningElement'

type RemoteTopicReturn = (courseId: number) => Promise<RemoteTopic[]>

type RemoteTopic = {
  topic_id: number
  topic_name: string
  learning_elements: [RemoteLearningElement]
}

export default RemoteTopic
export type { RemoteTopicReturn }
