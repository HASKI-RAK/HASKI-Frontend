import RemoteLearningElement from '../RemoteLearningElement/RemoteLearningElement'

type RemoteTopic = {
  topic_id: number
  topic_name: string
  learning_elements: [RemoteLearningElement]
}

export default RemoteTopic
